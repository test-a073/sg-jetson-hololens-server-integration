# finetune_moondream_with_lora_and_adam8bit_optimization.py
# without 4bit

import os 
import torch 
import math
import wandb
from tqdm import tqdm
from einops import rearrange
from torch.utils.data import Dataset, DataLoader
from datasets import load_dataset 
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import LoraConfig, get_peft_model, get_peft_model_state_dict
import torch.optim as optim
import time

start_time = time.time()
# Environment settings
os.environ["WANDB_SILENT"] = "false"
os.environ["HF_HUB_ENABLE_HF_TRANSFER"] = "1"

class ChessDataset(Dataset):
    def __init__(self, split="train"):
        self.data = load_dataset(
            "Trelis/chess_pieces", 
            split=split
        )

    def __len__(self):
        return len(self.data) 
    
    def __getitem__(self, idx):
        sample = self.data[idx]
        return {
            "image": sample["image"],
            "qa": [
                {
                    "question": "What do you see?", 
                    "answer": sample["caption"]
                }
            ]
        }

# Training Configuration
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
DTYPE = torch.float32
MD_REVISION = "2024-04-02"

use_lora = True
set_other_trainable = True

EPOCHS = 10
BATCH_SIZE = 4
GRAD_ACCUM_STEPS = 1
BASE_LR = 3e-5
WARMUP_STEPS = 100
MAX_GRAD_NORM = 1.0
SAVE_STEPS = 500
USE_WANDB = True
CHECKPOINT_DIR = "checkpoints"
IMG_TOKENS = 729
ANSWER_EOS = "<|endoftext|>"

print(f"Using device: {DEVICE}")

# Create checkpoint directory
os.makedirs(CHECKPOINT_DIR, exist_ok=True)

# Quantization configuration
quantization_config = None


# Initialize tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(
    "vikhyatk/moondream2",
    revision=MD_REVISION,
    trust_remote_code=True,
    torch_dtype=DTYPE,
    cache_dir="./checkpoints/",
    device_map={"": DEVICE},
)

moondream = AutoModelForCausalLM.from_pretrained(
    "vikhyatk/moondream2",
    revision=MD_REVISION,
    trust_remote_code=True,
    attn_implementation=None,
    torch_dtype=DTYPE,
    cache_dir="./checkpoints/",
    device_map={"": DEVICE},
    quantization_config=quantization_config
)


# LoRA Configuration
if use_lora:
    lora_config = LoraConfig(
        r=64,
        lora_alpha=32,
        target_modules=[
            # Text Encoder 
            # 'Wqkv',
            # 'out_proj',
            'fc1',
            'fc2',

            # # Vision Encoder
            # 'qkv',
            # 'proj',
            # 'fc1',
            # 'fc2'

            # Can I use the class name instead of the class attribute as the string for lora (no it doesn't work)
            
            # ValueError: Target module MLP(
            # (fc1): Linear(in_features=1152, out_features=4304, bias=True)
            # (act): GELU(approximate='tanh')
            # (fc2): Linear(in_features=4304, out_features=1152, bias=True)
            # ) is not supported. Currently, only the following modules are supported: `torch.nn.Linear`, `torch.nn.Embedding`, `torch.nn.Conv2d`, `torch.nn.Conv3d`, `transformers.pytorch_utils.Conv1D`.

        ],
        lora_dropout=0.1,
        bias="lora_only",
        task_type="CAUSAL_LM"
    )
    moondream = get_peft_model(moondream, lora_config)
    moondream.print_trainable_parameters()

# Initialize datasets and dataloaders
datasets = {
    "train": ChessDataset("train"),
    "test": ChessDataset("test")
}

def collate_fn(batch):
    images = [sample['image'] for sample in batch]
    images = torch.stack(moondream.vision_encoder.preprocess(images))
    images = rearrange(images,
                      "b c (h p1) (w p2) -> b (h w) (c p1 p2)",
                      p1=14,
                      p2=14)
    
    labels_acc = []
    tokens_acc = []

    for sample in batch:
        toks = [tokenizer.bos_token_id]
        labs = [-100] * (IMG_TOKENS + 1)

        for qa in sample['qa']:
            q_t = tokenizer(
                f"\n\nQuestion: {qa['question']}\n\nAnswer:",
                add_special_tokens=False
            ).input_ids
            toks.extend(q_t)
            labs.extend([-100] * len(q_t))

            a_t = tokenizer(
                f" {qa['answer']}{ANSWER_EOS}",
                add_special_tokens=False
            ).input_ids
            toks.extend(a_t)
            labs.extend(a_t)

        tokens_acc.append(toks)
        labels_acc.append(labs)

    max_len = max(len(labels) for labels in labels_acc)
    attn_mask_acc = []

    for i in range(len(batch)):
        len_i = len(labels_acc[i])
        pad_i = max_len - len_i

        labels_acc[i].extend([-100] * pad_i)
        tokens_acc[i].extend([tokenizer.eos_token_id] * pad_i)
        attn_mask_acc.append([1] * len_i + [0] * pad_i)

    return (
        images,
        torch.stack([torch.tensor(t, dtype=torch.long) for t in tokens_acc]),
        torch.stack([torch.tensor(l, dtype=torch.long) for l in labels_acc]),
        torch.stack([torch.tensor(a, dtype=torch.bool) for a in attn_mask_acc]),
    )

dataloaders = {
    "train": DataLoader(
        datasets["train"],
        batch_size=BATCH_SIZE,
        shuffle=True,
        collate_fn=collate_fn,
    ),
    "test": DataLoader(
        datasets["test"],
        batch_size=BATCH_SIZE,
        shuffle=False,
        collate_fn=collate_fn,
    )
}

def compute_loss(batch):
    images, tokens, labels, attn_mask = batch

    images = images.to(DEVICE)
    tokens = tokens.to(DEVICE)
    labels = labels.to(DEVICE)
    attn_mask = attn_mask.to(DEVICE)

    # Remove the with torch.no_grad() context since we need gradients
    img_embs = moondream.vision_encoder.encoder(images)
    img_embs = moondream.vision_encoder.projection(img_embs)

    tok_embs = moondream.text_model.get_input_embeddings()(tokens)
    inputs_embeds = torch.cat((tok_embs[:, 0:1, :], img_embs, tok_embs[:, 1:, :]), dim=1)

    outputs = moondream.text_model(
        inputs_embeds=inputs_embeds,
        labels=labels,
        attention_mask=attn_mask,
    )

    # Ensure the loss requires gradients
    return outputs.loss.requires_grad_(True)


def lr_schedule(step, max_steps):
    if step < WARMUP_STEPS:
        return step / WARMUP_STEPS
    
    progress = (step - WARMUP_STEPS) / (max_steps - WARMUP_STEPS)
    return 0.5 * (1.0 + math.cos(math.pi * progress))

# LR = 1.5e-5 
# def lr_schedule(step, max_steps):
    
#     x = step / max_steps
#     if x < 0.1:
#         return 0.1 * LR + 0.9 * LR * x / 0.1
#     else:
#         return 0.1 * LR + 0.9 * LR * (1 + math.cos(math.pi * (x - 0.1))) / 2

# Initialize training
moondream.train()
moondream.text_model.transformer.gradient_checkpointing_enable(
    gradient_checkpointing_kwargs={"use_reentrant": True}
)

total_steps = EPOCHS * len(dataloaders["train"]) // GRAD_ACCUM_STEPS
eval_freq = 0.25
eval_steps = total_steps * eval_freq 

# Initialize LoRA parameters and optimizer
lora_params = []
for name, module in moondream.named_modules():
    if "lora" in name:
        for p in module.parameters():
            p.requires_grad = True
        lora_params.extend([p for p in module.parameters() if p.requires_grad])

# Add this after model initialization
if use_lora:
    moondream.requires_grad_(False)  # Freeze base model weights
    for name, param in moondream.named_parameters():
        if "lora" in name:
            param.requires_grad = True

# Add this before training loop
moondream.train()  # Set model to training mode
moondream.vision_encoder.train()  # Ensure vision encoder is also in training mode
if use_lora:
    LR_scaling = lora_config.lora_alpha / (lora_config.r ** 0.5)
else:
    LR_scaling = 1.0

optimizer = optim.Adam(
    [{"params": lora_params}],
    lr=BASE_LR,
    betas=(0.9, 0.95),
    eps=1e-6
)

# Initialize wandb
if USE_WANDB:
    wandb.init(
        # Add a description to the run 
        notes="Fine-tuning Moondream with ALL params LoRA std Adam Optim workstation",
        project="moondream-ft-lora",
        config={
            "EPOCHS": EPOCHS,
            "BATCH_SIZE": BATCH_SIZE,
            "GRAD_ACCUM_STEPS": GRAD_ACCUM_STEPS,
            "BASE_LR": BASE_LR,
            "WARMUP_STEPS": WARMUP_STEPS,
            "MAX_GRAD_NORM": MAX_GRAD_NORM,
            "use_4bit": None,
            "use_lora": use_lora,
            "lora_config": lora_config.__dict__ if use_lora else None,
        }
    )

# Training loop
global_step = 0
best_val_loss = float('inf')

for epoch in range(EPOCHS):
    moondream.train()
    
    for batch_idx, batch in enumerate(tqdm(dataloaders["train"], desc=f"Epoch {epoch + 1}/{EPOCHS}")):
        loss = compute_loss(batch)
        loss = loss / GRAD_ACCUM_STEPS
        loss.backward()
        
        if (batch_idx + 1) % GRAD_ACCUM_STEPS == 0:
            # Gradient clipping
            torch.nn.utils.clip_grad_norm_(lora_params, MAX_GRAD_NORM)
            
            # Update weights
            optimizer.step()
            optimizer.zero_grad()
            
            # Update learning rate
            lr = BASE_LR * lr_schedule(global_step, total_steps) * LR_scaling
            for param_group in optimizer.param_groups:
                param_group['lr'] = lr
            
            global_step += 1
            
            # Log training metrics
            if USE_WANDB:
                wandb.log({
                    "loss/train": loss.item() * GRAD_ACCUM_STEPS,
                    "lr": lr,
                    "epoch": epoch,
                    "global_step": global_step,
                })
            
            # Evaluation
            if global_step % eval_steps == 0 and USE_WANDB:
                moondream.eval()
                val_loss = 0
                with torch.no_grad():
                    for val_batch in tqdm(dataloaders["test"], desc="Validation"):
                        val_loss += compute_loss(val_batch).item()
                val_loss /= len(dataloaders["test"])
                print(f"Validation Loss at step {global_step}: {val_loss}")

                
                if USE_WANDB:
                    wandb.log({
                        "loss/val": val_loss,
                        "global_step": global_step,
                    })
                
                # Save best model
                if val_loss < best_val_loss:
                    best_val_loss = val_loss
                    peft_model_state_dict = get_peft_model_state_dict(moondream)
                    torch.save(
                        peft_model_state_dict,
                        os.path.join(CHECKPOINT_DIR, "best_model.pt")
                    )
                
                # Regular checkpoint saving
                if global_step % SAVE_STEPS == 0:
                    peft_model_state_dict = get_peft_model_state_dict(moondream)
                    torch.save(
                        peft_model_state_dict,
                        os.path.join(CHECKPOINT_DIR, f"checkpoint-{global_step}.pt")
                    )
                
                moondream.train()

# Save final model
peft_model_state_dict = get_peft_model_state_dict(moondream)
torch.save(
    peft_model_state_dict,
    os.path.join(CHECKPOINT_DIR, "final_model.pt")
)

if USE_WANDB:
    wandb.finish()

print(f"Training took {time.time() - start_time:.4f} seconds")
# NOTE: for the moment we are using moondream 1.8B params model. Later we will use 0.5B params model.
model_type = "1.8B" # 0.5B or 2B

import os
os.chdir("/home/Desktop/integration/inference_code/")
print("Current Working Directory:", os.getcwd())


# TODO: Inference moondream model 
import json

# Specify the JSON file path
input_file = "sasika_stream/queries.json"

try:
    # Load the JSON file into the dictionary
    with open(input_file, "r") as json_file:
        queries = json.load(json_file)
    print("Data successfully loaded into 'queries':", queries)
except FileNotFoundError:
    print(f"File {input_file} not found.")
except json.JSONDecodeError as e:
    print(f"Error decoding JSON: {e}")


image_path = queries["image"]
query_text = queries["text"]
timestamp = queries["timestamp"]


# Initialize moondream. Change DEVICE to 'mps' if you're on an M1 Mac, or 'cpu' if you don't have a
# GPU. Note that fine-tuning on CPU will be very slow.

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

if model_type == "1.8B":

    DEVICE = "cuda"
    DTYPE = torch.float32 if DEVICE == "cpu" else torch.float16 # CPU doesn't support float16
    MD_REVISION = "2024-07-23"

    tokenizer = AutoTokenizer.from_pretrained("vikhyatk/moondream2", revision=MD_REVISION)
    moondream = AutoModelForCausalLM.from_pretrained(
        "vikhyatk/moondream2", revision=MD_REVISION, trust_remote_code=True,
        attn_implementation="flash_attention_2" if DEVICE == "cuda" else None,
        torch_dtype=DTYPE, device_map={"": DEVICE}
    )
elif model_type == "0.5B":
    # TODO: Load 0.5B model
    pass 

moondream.text_model.eval()
moondream.vision_encoder.eval();

from PIL import Image

def load_PIL_image(image_path):
    # Load the image using PIL
    image = Image.open(image_path)
    return image

moondream_response = moondream.answer_question(
    moondream.encode_image(
        load_PIL_image(queries['image'])),
    queries['text'],
    tokenizer=tokenizer,
)

import sys 

if moondream_response is not None:
    print(f"Response: {moondream_response}")

# TODO: Inference Llama model
# inference on the workstation 
import time
import requests

server_url = "http://172.17.0.2:5000/query" # Docker container internal ip address
image_path = image_path 
query_text = query_text

try:
    start_time = time.time()

    # Prepare the request payload
    with open(image_path, 'rb') as img_file:
        files = {'image': img_file}
        data = {'query': query_text}

        # Send the POST request
        response = requests.post(server_url, files=files, data=data)

    # Measure processing time
    end_time = time.time()
    processing_time = end_time - start_time

    # Handle the response
    if response.status_code == 200:
        print("Response:", response.json().get('response', "No response field"))
        groundtruth = dict(response.json())['response']['message']
        print("Groundtruth:", groundtruth)
    else:
        print("Error:", response.json())

    print(f"Processing Time: {processing_time:.2f} seconds")
except Exception as e:
    print(f"An error occurred: {e}")

# DATA SAMPLE 
data_sample = {"image_path":image_path , 
              "image": load_PIL_image(image_path),
              "qa":[{"question":query_text, "answer":groundtruth}],
              "prediction": moondream_response}

# TODO: Finetune the model 
# Number of times to repeat the training dataset. Increasing this may cause the model to overfit or
# lose generalization due to catastrophic forgetting. Decreasing it may cause the model to underfit.
EPOCHS = 1

# Number of samples to process in each batch. Set this to the highest value that doesn't cause an
# out-of-memory error. Decrease it if you're running out of memory.
BATCH_SIZE = 1

# Number of batches to process before updating the model. You can use this to simulate a higher batch
# size than your GPU can handle. Set this to 1 to disable gradient accumulation.
GRAD_ACCUM_STEPS = 1

# Learning rate for the Adam optimizer. Needs to be tuned on a case-by-case basis. As a general rule
# of thumb, increase it by 1.4 times each time you double the effective batch size.
#
# Source: https://www.cs.princeton.edu/~smalladi/blog/2024/01/22/SDEs-ScalingRules/
#
# Note that we linearly warm the learning rate up from 0.1 * LR to LR over the first 10% of the
# training run, and then decay it back to 0.1 * LR over the last 90% of the training run using a
# cosine schedule.
LR = 1e-5

# Whether to use Weights and Biases for logging training metrics.
USE_WANDB = True

# MAX Data samples
MAX_SAMPLES = 1

from torch.utils.data import DataLoader
from bitsandbytes.optim import Adam8bit
import math
from einops import rearrange
from tqdm import tqdm

ANSWER_EOS = "<|endoftext|>"

# Number of tokens used to represent each image.
IMG_TOKENS = 729

def collate_fn(batch):
    images = [sample['image'] for sample in batch]
    images = [moondream.vision_encoder.preprocess(image) for image in images]

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

    max_len = -1
    for labels in labels_acc:
        max_len = max(max_len, len(labels))

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

def compute_loss(batch):
    images, tokens, labels, attn_mask = batch

    tokens = tokens.to(DEVICE)
    labels = labels.to(DEVICE)
    attn_mask = attn_mask.to(DEVICE)

    with torch.no_grad():
        img_embs = moondream.vision_encoder(images)

    tok_embs = moondream.text_model.get_input_embeddings()(tokens)
    inputs_embeds = torch.cat((tok_embs[:, 0:1, :], img_embs, tok_embs[:, 1:, :]), dim=1)

    outputs = moondream.text_model(
        inputs_embeds=inputs_embeds,
        labels=labels,
        attention_mask=attn_mask,
    )

    return outputs.loss

from torch.utils.data import Dataset

# Custom dataset
class HololensDataset(Dataset):
    """Data Collected from the Hololens"""
    def __init__(self, data_sample):
        self.data = data_sample
        

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        sample = self.data[idx]
        return {
            "image": sample["image"], # Should be a PIL image
            "qa": [
                {
                    "question": sample["qa"][0]["question"],
                    "answer": sample["qa"][0]["answer"],
                }
            ]
        }
    
datasets = {
    "train": HololensDataset([data_sample]),
    "test": HololensDataset([data_sample]),
}

# Create the dataloader
dataloaders = {
    "train": DataLoader(
        datasets["train"],
        batch_size=BATCH_SIZE,
        shuffle=True,
        collate_fn=collate_fn,
    ),
    "test" : DataLoader(
        datasets["test"],
        batch_size=BATCH_SIZE,
        shuffle=True,
        collate_fn=collate_fn,
    )
    
}

moondream.text_model.train()
moondream.text_model.transformer.gradient_checkpointing_enable()

total_steps = EPOCHS * len(dataloaders["train"]) // GRAD_ACCUM_STEPS
optimizer = Adam8bit(
    [
        {"params": moondream.text_model.parameters()},
    ],
    lr=LR * 0.1,
    betas=(0.9, 0.95),
    eps=1e-6
)


if USE_WANDB:
    import wandb
    wandb.init(
        project="moondream-ft-sgSMU",
        config={
            "EPOCHS": EPOCHS,
            "BATCH_SIZE": BATCH_SIZE,
            "GRAD_ACCUM_STEPS": GRAD_ACCUM_STEPS,
            "LR": LR,
        }
    )

i = 0

def lr_schedule(step, max_steps):
    x = step / max_steps
    if x < 0.1:
        return 0.1 * LR + 0.9 * LR * x / 0.1
    else:
        return 0.1 * LR + 0.9 * LR * (1 + math.cos(math.pi * (x - 0.1))) / 2


# Limit the number of data sample to 10
for epoch in range(EPOCHS):
    for batch in tqdm(dataloaders["train"], desc=f"Epoch {epoch + 1}/{EPOCHS}"):
        i += 1

        loss = compute_loss(batch)
        loss.backward()

        if i % GRAD_ACCUM_STEPS == 0:
            optimizer.step()
            optimizer.zero_grad()

            lr = lr_schedule(i / GRAD_ACCUM_STEPS, total_steps)
            for param_group in optimizer.param_groups:
                param_group['lr'] = lr

        if USE_WANDB:
            wandb.log({
                "loss/train": loss.item(),
                "lr": optimizer.param_groups[0]['lr']
            })

if USE_WANDB:
    wandb.finish()

# TODO: Save the model 
# Save the model
moondream.save_pretrained("checkpoints/moondream-ft-sgSMU")

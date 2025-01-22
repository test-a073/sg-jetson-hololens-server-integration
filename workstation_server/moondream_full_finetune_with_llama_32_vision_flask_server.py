## Flask server for Moondream full fine-tuning with Llama3.2-vision
# saves the incoming data as a dataset  


import os
import sys
from pathlib import Path
import json
import time
import requests
from PIL import Image
from torch.utils.data import Dataset, DataLoader
from transformers import AutoTokenizer, AutoModelForCausalLM
from torch.optim import Adam
import torch
import math
from einops import rearrange
from tqdm import tqdm
import wandb
from flask import Flask, request, jsonify
import logging
import ollama

# Get the absolute path of the script
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(SCRIPT_DIR)

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Global Configurations
MODEL_TYPE = "1.8B"
DEVICE = "cuda" if torch.cuda.is_available() and MODEL_TYPE == "1.8B" else "cpu"
DTYPE = torch.float32 if DEVICE == "cpu" else torch.float16
MD_REVISION = "2024-07-23"
USE_WANDB = True
EPOCHS = 1
BATCH_SIZE = 1
GRAD_ACCUM_STEPS = 1
LR = 1e-5
MAX_SAMPLES = 1
ANSWER_EOS = "<|endoftext|>"
IMG_TOKENS = 729

# Create necessary directories
UPLOAD_FOLDER = os.path.join(SCRIPT_DIR, 'tmp')
SAVE_FOLDER = os.path.join(SCRIPT_DIR, 'saved_dataset')
CHECKPOINT_FOLDER = os.path.join(SCRIPT_DIR, 'checkpoints')
CACHE_FOLDER = os.path.join(SCRIPT_DIR, 'cache')

for folder in [UPLOAD_FOLDER, SAVE_FOLDER, CHECKPOINT_FOLDER, CACHE_FOLDER]:
    os.makedirs(folder, exist_ok=True)

class HololensDataset(Dataset):
    """Data Collected from the Hololens"""
    def __init__(self, data_sample):
        self.data = data_sample

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        sample = self.data[idx]
        return {
            "image": sample["image"],
            "qa": [
                {
                    "question": sample["qa"][0]["question"],
                    "answer": sample["qa"][0]["answer"],
                }
            ]
        }

def lr_schedule(step, max_steps):
    x = step / max_steps
    if x < 0.1:
        return 0.1 * LR + 0.9 * LR * x / 0.1
    else:
        return 0.1 * LR + 0.9 * LR * (1 + math.cos(math.pi * (x - 0.1))) / 2

def initialize_model():
    logger.info("Initializing model...")
    tokenizer = AutoTokenizer.from_pretrained(
        "vikhyatk/moondream2", 
        revision=MD_REVISION,
        cache_dir=CACHE_FOLDER
        )
    moondream = AutoModelForCausalLM.from_pretrained(
        "vikhyatk/moondream2",
        revision=MD_REVISION,
        trust_remote_code=True,
        attn_implementation="flash_attention_2" if DEVICE == "cuda" else None,
        torch_dtype=DTYPE,
        device_map={"": DEVICE},
        cache_dir=CACHE_FOLDER
    )
    moondream.text_model.eval()
    moondream.vision_encoder.eval()
    return tokenizer, moondream

def collate_fn(batch):
    images = [sample['image'] for sample in batch]
    images = [moondream.vision_encoder.preprocess(image) for image in images]

    labels_acc, tokens_acc = [], []

    for sample in batch:
        toks, labs = [tokenizer.bos_token_id], [-100] * (IMG_TOKENS + 1)

        for qa in sample['qa']:
            q_t = tokenizer(f"\n\nQuestion: {qa['question']}\n\nAnswer:", add_special_tokens=False).input_ids
            toks.extend(q_t)
            labs.extend([-100] * len(q_t))

            a_t = tokenizer(f" {qa['answer']}{ANSWER_EOS}", add_special_tokens=False).input_ids
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

def compute_loss(batch):
    images, tokens, labels, attn_mask = batch
    tokens, labels, attn_mask = tokens.to(DEVICE), labels.to(DEVICE), attn_mask.to(DEVICE)

    with torch.no_grad():
        img_embs = moondream.vision_encoder(images)

    tok_embs = moondream.text_model.get_input_embeddings()(tokens)
    inputs_embeds = torch.cat((tok_embs[:, :1, :], img_embs, tok_embs[:, 1:, :]), dim=1)

    outputs = moondream.text_model(
        inputs_embeds=inputs_embeds,
        labels=labels,
        attention_mask=attn_mask,
    )
    return outputs.loss

def query_moondream(model, tokenizer, queries):
    try:
        image = queries['image']
        return model.answer_question(
            model.encode_image(image),
            queries['text'],
            tokenizer=tokenizer
        )
    except Exception as e:
        logger.error(f"Error in query_moondream: {str(e)}")
        raise

def convert_response_to_dict(response):
    try:
        response_dict = dict(response)
        logger.debug(f"Full response: {response_dict}")
        message_content = dict(response_dict['message'])['content']
        return {
            "model": response_dict['model'],
            "message": message_content,
        }
    except Exception as e:
        logger.error(f"Error in convert_response_to_dict: {str(e)}")
        raise

# Initialize Flask app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def get_connection_instructions():
    return """To restart the server, please run these commands:
1. docker start sasika_torch
2. docker exec -d sasika_torch ollama serve
3. docker exec sasika_torch python ollama/workstation_server/flask_server_app_LARGE.py"""

@app.route('/query', methods=['POST'])
def query():
    try:
        logger.debug(f"Received request: {request.form}")
        logger.debug(f"Files in request: {request.files}")

        if 'query' not in request.form or 'image' not in request.files:
            return jsonify({'error': 'Missing query or image',
                          'instructions': get_connection_instructions()}), 400

        query_text = request.form['query']
        image = request.files['image']
        
        if image.filename == '':
            return jsonify({'error': 'No selected image file',
                          'instructions': get_connection_instructions()}), 400

        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        image.save(image_path)

        # Process with ollama
        try:
            response = ollama.chat(
                model='llama3.2-vision',
                messages=[{
                    'role': 'user',
                    'content': query_text,
                    'images': [image_path]
                }]
            )
            groundtruth = convert_response_to_dict(response)['message']
        except Exception as e:
            logger.error(f"Ollama chat error: {str(e)}")
            return jsonify({'error': str(e),
                          'instructions': get_connection_instructions()}), 500

        # Process with Moondream
        now_time = time.strftime("%Y%m%d-%H%M%S")
        pil_image = Image.open(image_path)
        
        queries = {
            "time": now_time,
            "text": query_text,
            "image": pil_image,
            "image_name": f"{image.filename}_{now_time}",
            "qa": [{
                "question": query_text,
                "answer": groundtruth
            }]
        }
       
        moondream_response = query_moondream(moondream, tokenizer, queries)
        
        queries['moondream'] = moondream_response
        queries['llama-vision'] = groundtruth
        print()
        print(queries)
        # Save results
        pil_image.save(os.path.join(SAVE_FOLDER, f"{queries['image_name']}.jpg"))
        
        with open(os.path.join(SAVE_FOLDER, "collected_queries.json"), "a") as f:
            save_data = queries.copy()
            save_data["image"] = None  # Don't save PIL image to JSON
            save_data["llama-vision"] = groundtruth
            save_data["moondream"] = moondream_response
            json.dump(save_data, f)
            f.write("\n")

        # Fine-tune the model
        dataset = HololensDataset([queries])
        train_loader = DataLoader(
            dataset,
            batch_size=BATCH_SIZE,
            shuffle=True,
            collate_fn=collate_fn
        )
        
        moondream.text_model.train()
        moondream.text_model.transformer.gradient_checkpointing_enable()

        total_steps = EPOCHS * len(train_loader) // GRAD_ACCUM_STEPS
        step = 0

        print("\n start finetuning the model")
        for epoch in range(EPOCHS):
            for batch in train_loader:
                step += 1
                loss = compute_loss(batch)
                loss.backward()
                
                if step % GRAD_ACCUM_STEPS == 0:
                    optimizer.step()
                    optimizer.zero_grad()

                    lr = lr_schedule(step / GRAD_ACCUM_STEPS, total_steps)
                    for param_group in optimizer.param_groups:
                        param_group['lr'] = lr
                    
                if USE_WANDB:
                    wandb.log({
                        "loss/train": loss.item(),
                        "lr": optimizer.param_groups[0]['lr']
                    })


        #
        # Save the model
        moondream.save_pretrained(os.path.join(CHECKPOINT_FOLDER, "moondream-ft-sgSMU"))

        # Cleanup and return response
        os.remove(image_path)

        print("Cleaning up...")
        return jsonify({'response': {'model': 'llama3.2-vision', 'message': groundtruth}}), 200

    except Exception as e:
        logger.error(f"Error in query endpoint: {str(e)}", exc_info=True)
        return jsonify({'error': str(e),
                       'instructions': get_connection_instructions()}), 500

if __name__ == "__main__":
    logger.info(f"Current Working Directory: {os.getcwd()}")
    
    # Initialize wandb
    if USE_WANDB:
        try:
            wandb.init(
                project="moondream-ft-sgSMU",
                config={
                    "EPOCHS": EPOCHS,
                    "BATCH_SIZE": BATCH_SIZE,
                    "GRAD_ACCUM_STEPS": GRAD_ACCUM_STEPS,
                    "LR": LR,
                }
            )
        except Exception as e:
            logger.error(f"Failed to initialize wandb: {e}")
            USE_WANDB = False

    try:
        # Initialize model and tokenizer
        tokenizer, moondream = initialize_model()
        
        # Initialize optimizer
        optimizer = Adam(
            [{"params": moondream.text_model.parameters()}],
            lr=LR * 0.1,
            betas=(0.9, 0.95),
            eps=1e-6
        )

        # Run Flask app
        app.run(
            host='0.0.0.0',
            port=5000,
            debug=False  # Disabled debug mode to avoid reloader issues
        )
    except Exception as e:
        logger.error(f"Failed to start server: {e}")
        if USE_WANDB:
            wandb.finish()
        sys.exit(1)
    finally:
        if USE_WANDB:
            wandb.finish()
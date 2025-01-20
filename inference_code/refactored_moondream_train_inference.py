import os
import json
import sys
import time
import requests
from PIL import Image
from torch.utils.data import Dataset, DataLoader
from transformers import AutoTokenizer, AutoModelForCausalLM
from bitsandbytes.optim import Adam8bit
import torch
import math
from einops import rearrange
from tqdm import tqdm

# Global Configurations
MODEL_TYPE = "1.8B"  # Change to "0.5B" for the smaller model
DEVICE = "cuda" if MODEL_TYPE == "1.8B" else "cpu"
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

# Change to the working directory
os.chdir("/home/integration/inference_code/")
print("Current Working Directory:", os.getcwd())

# Load Queries
def load_queries(input_file):
    try:
        with open(input_file, "r") as json_file:
            return json.load(json_file)
    except FileNotFoundError:
        print(f"File {input_file} not found.")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        sys.exit(1)

# Initialize Model
def initialize_model():
    tokenizer = AutoTokenizer.from_pretrained("vikhyatk/moondream2", revision=MD_REVISION)
    moondream = AutoModelForCausalLM.from_pretrained(
        "vikhyatk/moondream2",
        revision=MD_REVISION,
        trust_remote_code=True,
        attn_implementation="flash_attention_2" if DEVICE == "cuda" else None,
        torch_dtype=DTYPE,
        device_map={"": DEVICE}
    )
    moondream.text_model.eval()
    moondream.vision_encoder.eval()
    return tokenizer, moondream

# Load Image
def load_pil_image(image_path):
    try:
        return Image.open(image_path)
    except Exception as e:
        print(f"Error loading image: {e}")
        sys.exit(1)

# Query Moondream Model
def query_moondream(moondream, tokenizer, queries):
    image = load_pil_image(queries['image'])
    return moondream.answer_question(
        moondream.encode_image(image),
        queries['text'],
        tokenizer=tokenizer
    )

# Query Llama Model
def query_llama(server_url, image_path, query_text):
    try:
        with open(image_path, 'rb') as img_file:
            files = {'image': img_file}
            data = {'query': query_text}
            start_time = time.time()
            response = requests.post(server_url, files=files, data=data)
            processing_time = time.time() - start_time

            if response.status_code == 200:
                response_data = response.json().get('response', {})
                print("Response:", response_data)
                return response_data, processing_time
            else:
                print("Error:", response.json())
                sys.exit(1)
    except Exception as e:
        print(f"An error occurred: {e}")
        sys.exit(1)

# Collate Function
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

# Compute Loss
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

# Main Execution
if __name__ == "__main__":
    input_file = "sasika_stream/queries.json"
    queries = load_queries(input_file)

    tokenizer, moondream = initialize_model()

    moondream_response = query_moondream(moondream, tokenizer, queries)
    print(f"Moondream Response: {moondream_response}")

    server_url = "http://172.17.0.3:5000/query"
    llama_response, llama_time = query_llama(server_url, queries['image'], queries['text'])

    print(f"Llama Response: {llama_response}")
    print(f"Llama Processing Time: {llama_time:.2f} seconds")

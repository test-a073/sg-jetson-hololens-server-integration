from transformers import AutoModelForCausalLM, AutoTokenizer
from PIL import Image

import torch 

DEVICE  = "cuda" if torch.cuda.is_available() else "cpu"

model_id = "vikhyatk/moondream2"
MD_REVISION = "2025-01-09"
DTYPE = torch.float32

print(f"Using device: {DEVICE}")

model = AutoModelForCausalLM.from_pretrained(
    model_id, 
    trust_remote_code=True, 
    revision=MD_REVISION,
    torch_dtype=DTYPE,
    cache_dir="./checkpoints/",
    device_map = {"": DEVICE}
)

# Initialize tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(
    "vikhyatk/moondream2",
    revision=MD_REVISION,
    trust_remote_code=True,
    torch_dtype=DTYPE,
    cache_dir="./checkpoints/",
    device_map={"": DEVICE},
)



image = Image.open('image_4.png')
enc_image = model.encode_image(image)
print(model.answer_question(enc_image, "Describe this image.", tokenizer))
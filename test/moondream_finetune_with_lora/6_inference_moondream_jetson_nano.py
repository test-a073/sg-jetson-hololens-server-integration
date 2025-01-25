import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM

# Load configuration
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
DTYPE = torch.float32
MODEL_NAME = "vikhyatk/moondream2"
MD_REVISION = "2024-04-02"


# Load tokenizer and base model
tokenizer = AutoTokenizer.from_pretrained(
    MODEL_NAME,
    revision=MD_REVISION,
    trust_remote_code=True,
    torch_dtype=DTYPE,
    cache_dir="./checkpoints/"
)

moondream = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    revision=MD_REVISION,
    trust_remote_code=True,
    torch_dtype=DTYPE,
    cache_dir="./checkpoints/"
)

moondream.to(DEVICE)
moondream.eval()

# Replace with actual image and question
from PIL import Image

example_image = Image.open("image_4.png")  # Load your image
example_question = "What do you see in the image?"


# Preprocess image using vision encoder
with torch.no_grad():
    img_tensor = moondream.vision_encoder.preprocess(image).to(DEVICE)
    img_embs = moondream.vision_encoder.encoder(img_tensor)
    img_embs = moondream.vision_encoder.projection(img_embs)

    # Prepare input tokens
    input_text = f"\n\nQuestion: {question}\n\nAnswer:"
    input_ids = tokenizer(input_text, return_tensors="pt").input_ids.to(DEVICE)

    tok_embs = moondream.text_model.get_input_embeddings()(input_ids)
    inputs_embeds = torch.cat((tok_embs[:, 0:1, :], img_embs, tok_embs[:, 1:, :]), dim=1)

    # Generate response
    outputs = moondream.text_model.generate(
        inputs_embeds=inputs_embeds,
        max_length=100,
        do_sample=True,
        top_k=50,
        top_p=0.95,
        temperature=0.7,
        eos_token_id=tokenizer.eos_token_id
    )

    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
return response

response = generate_response(example_image, example_question)
print(f"Response: {response}")

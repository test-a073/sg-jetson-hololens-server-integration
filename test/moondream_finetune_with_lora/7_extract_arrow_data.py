import os
from datasets import load_dataset
from PIL import Image
import matplotlib.pyplot as plt

# Load the dataset
dataset = load_dataset("Trelis/chess_pieces", split="train")



# Directory to save images
save_dir = "data/chess_images"
os.makedirs(save_dir, exist_ok=True)

# Loop through the dataset and save images
for i, sample in enumerate(dataset):
    image = sample["image"]
    if isinstance(image, str):
        image = Image.open(image)
    image_path = os.path.join(save_dir, f"image_{i}.png")
    image.save(image_path)
    print(f"Saved image {i} to {image_path}")

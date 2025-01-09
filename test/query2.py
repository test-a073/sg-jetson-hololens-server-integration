import ollama
import argparse

# Set up argument parser to get image path from terminal
parser = argparse.ArgumentParser(description='Process an image path.')
parser.add_argument('img', type=str, help='Path to the image file')

# Parse the command-line argument
args = parser.parse_args()

# Get the image path from the argument
image_path = args.img

# Make a request to the ollama model
response = ollama.chat(
    model='llama3.2-vision',
    messages=[{
        'role': 'user',
        'content': 'What is in this image?',
        'images': [image_path]
    }]
)

# Process the response
response_dict = dict(response)
message_content = dict(response_dict['message'])['content']

# Print the response content
print(message_content)

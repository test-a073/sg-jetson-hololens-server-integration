import ollama
           
response = ollama.chat(
        model='llama3.2-vision',
        messages=[{
            'role': 'user',
            'content': "what can you observe in this image?",
            'images': ["samplehololensimage.jpg"]
        }]
    )

print(response)
print(dict(response))


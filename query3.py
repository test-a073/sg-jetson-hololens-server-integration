import ollama
from time import time

queries = ["What can you observe in this image?",
           "can you tell me where the trash bin is?",
           "where is the plug?",
           "where is the blue chair",
           "wher is the sanitizer",
           "wher is the small fan"
           ]


for i, query_i in enumerate(queries):
    start_time = time()  

    response = ollama.chat(
        model='llama3.2-vision',
        messages=[{
            'role': 'user',
            'content': query_i,
            'images': ["samplehololensimage.jpg"]
        }]
    )

    print("\n>>> " + query_i)
    print()
    print(response)
    print("\n\nProcessing time: " + str(time() - start_time) + "s")  


import requests

server_url = "http://10.4.16.46:5000/query"

# Path to the image file
image_path = "new.jpg"
query_text = "What can you observe in this image?"

# Prepare the request payload
files = {'image': open(image_path, 'rb')}
data = {'query': query_text}

# Send the POST request
response = requests.post(server_url, files=files, data=data)

# Handle the response
if response.status_code == 200:
    print("Response:", response.json()['response'])
else:
    print("Error:", response.json())

from flask import Flask, request, jsonify
import ollama
import os

app = Flask(__name__)

# Directory to temporarily save uploaded images
UPLOAD_FOLDER = '/tmp'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Function to convert the response into a serializable format
def convert_response_to_dict(response):
    # Assuming the response has a 'message' and 'status' attribute
    # Modify this based on the actual structure of the response object
    return {
        "message": response.get('message', ''),
        "status": response.get('status', '200'),
        # Add other relevant attributes here as necessary
    }

@app.route('/query', methods=['POST'])
def query():
    try:
        # Check if the request contains the required data
        if 'query' not in request.form or 'image' not in request.files:
            return jsonify({'error': 'Invalid request, query or image is missing'}), 400

        # Get the query and the image from the request
        query = request.form['query']
        image = request.files['image']

        # Save the image temporarily
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        image.save(image_path)

        print(image_path)

        # Process the query with ollama.chat
        response = ollama.chat(
            model='llama3.2-vision',
            messages=[{
                'role': 'user',
                'content': query,
                'images': [image_path]
            }]
        )

        # print(type(response))
        # print()
        # print(response)

        # Convert the response to a dictionary
        response_dict = convert_response_to_dict(response)
        # print(response_dict)

        print(response_dict)
        # Clean up the temporary image file
        # os.remove(image_path)

        # Return the response
        return jsonify({'response': response_dict}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

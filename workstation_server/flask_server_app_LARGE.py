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
    response_dict = dict(response)

    print(response_dict)
    message_content = dict(response_dict['message'])['content']
    return {
        "model": response_dict['model'],
        "message": message_content,
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


        # Convert the response to a dictionary
        response_dict = convert_response_to_dict(response)

        # Remove the temporary image file
        os.remove(image_path)

        # DEBUG : Uncomment the line below to see the response dictionary
        # print(response_dict)
        

        # Return the response
        return jsonify({'response': response_dict}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

from flask import Flask, request, jsonify
import ollama
import os
import logging

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Directory to temporarily save uploaded images
UPLOAD_FOLDER = '/tmp'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def get_connection_instructions():
    return """To restart the server, please run these commands:
1. docker start sasika_torch
2. docker exec -d sasika_torch ollama serve
3. docker exec sasika_torch python ollama/workstation_server/flask_server_app_LARGE.py
Then press 'ctrl+c' to stop any existing server instances."""

def convert_response_to_dict(response):
    try:
        response_dict = dict(response)
        logger.debug(f"Full response: {response_dict}")
        message_content = dict(response_dict['message'])['content']
        return {
            "model": response_dict['model'],
            "message": message_content,
        }
    except Exception as e:
        logger.error(f"Error in convert_response_to_dict: {str(e)}")
        raise

@app.route('/query', methods=['POST'])
def query():
    try:
        # Log incoming request
        logger.debug(f"Received request: {request.form}")
        logger.debug(f"Files in request: {request.files}")

        # Check if the request contains the required data
        if 'query' not in request.form:
            logger.error("Query missing from request")
            return jsonify({
                'error': 'Query is missing',
                'instructions': get_connection_instructions()
            }), 400
        if 'image' not in request.files:
            logger.error("Image missing from request")
            return jsonify({
                'error': 'Image is missing',
                'instructions': get_connection_instructions()
            }), 400

        # Get the query and the image
        query = request.form['query']
        image = request.files['image']
        
        # Validate image
        if image.filename == '':
            logger.error("No selected image file")
            return jsonify({
                'error': 'No selected image file',
                'instructions': get_connection_instructions()
            }), 400

        # Create upload folder if it doesn't exist
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        # Save the image temporarily
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
        logger.debug(f"Saving image to: {image_path}")
        image.save(image_path)

        # Verify file was saved
        if not os.path.exists(image_path):
            logger.error(f"Failed to save image at {image_path}")
            return jsonify({
                'error': 'Failed to save image',
                'instructions': get_connection_instructions()
            }), 500

        # Process with ollama
        logger.debug(f"Sending query to ollama: {query}")
        try:
            response = ollama.chat(
                model='llama3.2-vision',
                messages=[{
                    'role': 'user',
                    'content': query,
                    'images': [image_path]
                }]
            )
        except Exception as e:
            logger.error(f"Ollama chat error: {str(e)}")
            return jsonify({
                'error': str(e),
                'instructions': get_connection_instructions()
            }), 500

        # Convert response
        response_dict = convert_response_to_dict(response)
        logger.debug(f"Processed response: {response_dict}")

        # Cleanup
        try:
            os.remove(image_path)
            logger.debug(f"Removed temporary file: {image_path}")
        except Exception as e:
            logger.warning(f"Failed to remove temporary file: {str(e)}")

        return jsonify({'response': response_dict}), 200

    except Exception as e:
        logger.error(f"Error processing request: {str(e)}", exc_info=True)
        return jsonify({
            'error': str(e),
            'instructions': get_connection_instructions()
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
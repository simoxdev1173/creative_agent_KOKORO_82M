from flask import Flask, request, jsonify
from kokoro import KPipeline

from flask_cors import CORS  # Import CORS
import soundfile as sf
import io
import base64
import sys
#micheal male voice .... 
app = Flask(__name__)
CORS(app)  # Enable CORS

# Initialize Kokoro pipeline once (global to avoid reloading)
try:
    print("Initializing Kokoro pipeline...")
    pipeline = KPipeline(lang_code='a')  # American English
    print("Pipeline initialized successfully.")
except Exception as e:
    print(f"Failed to initialize pipeline: {e}")
    sys.exit(1)

@app.route('/tts', methods=['POST'])
def generate_tts():
    try:
        # Get text from the React frontend
        data = request.get_json()
        text = data.get('text', 'Default text')
        voice = data.get('voice', 'af_heart')  # Default voice
        speed = float(data.get('speed', 1.0))  # Default speed

        # Generate audio
        generator = pipeline(text, voice=voice, speed=speed, split_pattern=r'\n+')

        # Take the first audio chunk (simplify for now)
        for i, (graphemes, phonemes, audio) in enumerate(generator):
            # Convert audio to base64
            buffer = io.BytesIO()
            sf.write(buffer, audio, 24000, format='wav')
            audio_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
            break  # Only return first chunk for simplicity

        return jsonify({
            'status': 'success',
            'audio': audio_base64,
            'graphemes': graphemes,
            'phonemes': phonemes
        })

    except FileNotFoundError as e:
        return jsonify({'status': 'error', 'message': f"Voice file '{voice}.pt' not found: {e}"}), 400
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
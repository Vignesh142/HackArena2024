import os
import requests
import subprocess
import shutil
import time
import tempfile
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set your Deepgram API Key and desired voice model
DG_API_KEY = os.getenv("DEEPGRAM_API_KEY")
MODEL_NAME = "alpha-stella-en-v2"  # Ensure this is an available model

def is_installed(lib_name: str) -> bool:
    lib = shutil.which(lib_name)
    return lib is not None

def play_stream_from_file(audio_file):
    if not is_installed("ffplay"):
        raise ValueError("ffplay not found, necessary to stream audio.")

    # Play the saved audio file
    player_command = ["ffplay", "-autoexit", "-nodisp", audio_file]
    subprocess.run(player_command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

def send_tts_request(text):
    DEEPGRAM_URL = "https://api.deepgram.com/v1/speak"
    
    headers = {
        "Authorization": f"Token {DG_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Ensure the payload contains only the 'text' field
    payload = {
        "text": text  # Only this field should be used
    }
    
    start_time = time.time()  # Record the time before sending the request
    first_byte_time = None  # Initialize a variable to store the time when the first byte is received
    
    with requests.post(DEEPGRAM_URL, stream=True, headers=headers, json=payload) as r:
        # Check the status code for the response
        if r.status_code != 200:
            print(f"Error: Unable to get audio. Status code {r.status_code} - {r.text}")
            return

        # Specify a directory for the audio file (e.g., current directory)
        output_directory = os.getcwd()  # Current working directory
        output_file = os.path.join(output_directory, "output_audio.wav")

        with open(output_file, 'wb') as temp_file:
            for chunk in r.iter_content(chunk_size=1024):
                if chunk:
                    if first_byte_time is None:  # Check if this is the first chunk received
                        first_byte_time = time.time()  # Record the time when the first byte is received
                        ttfb = int((first_byte_time - start_time) * 1000)  # Calculate the time to first byte
                        print(f"Time to First Byte (TTFB): {ttfb}ms")
                    temp_file.write(chunk)  # Write the audio chunk to the file
            
            print(f"Audio saved to {output_file}")
            play_stream_from_file(output_file)  # Play the audio from the saved file

# Example usage
text = "The returns for performance are superlinear."
send_tts_request(text)

# app.py
from flask import Flask, request, jsonify, render_template
import os
import json
import csv
import uuid
from bot import answer_customer_query, classify_and_log_query, summarize_and_log_query, sentiment_analysis
from flask_cors import CORS
from groq import Groq
from chatbot.QuickAgent import LanguageModelProcessor, TextToSpeech, get_transcript
import asyncio
import threading


GROQ_API = "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"

# Initialize global instances
llm_processor = LanguageModelProcessor()
tts = TextToSpeech()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

def get_bad_reviews():
    """
    This endpoint fetches data from feedback.csv, sends it to Groq for classification,
    and returns only the bad reviews.
    """
    import os
    import csv
    from flask import jsonify

    file_path = "../data/feedback.csv"

    # Check if the file exists
    if not os.path.exists(file_path):
        return jsonify({"error": f"File not found at: {file_path}"}), 404

    try:
        # Read data from the CSV file
        reviews = []
        with open(file_path, "r", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            print("Headers:", reader.fieldnames)  # Debug header info
            for row in reader:
                reviews.append(row)

        # If no reviews were found
        if not reviews:
            return jsonify({"error": "No data found in feedback.csv"}), 400

        # Prepare data for classification
        bad_reviews = []
        client = Groq(api_key="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")
        for review in reviews:
            query = review.get("answer", "").strip()
            if query:  # Ensure the review text is not empty
                # Send query to Groq for sentiment classification
                instruction = (
                    "Classify this review as 'Positive', 'Neutral', or 'Negative'. "
                    "Only respond with the classification."
                )
                response = client.chat.completions.create(
                    model="llama-3.1-8b-instant",
                    messages=[
                        {"role": "system", "content": instruction},
                        {"role": "user", "content": query},
                    ],
                )
                classification = response.choices[0].message.content.strip()

                # If classified as Negative, add to bad_reviews
                if classification.lower() == "negative":
                    bad_reviews.append({"review": query, "classification": classification})

        return jsonify({"bad_reviews": bad_reviews}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/faq", methods=["POST"])
def query():
    try:
        # Get the customer query from the request
        data = request.json
        query = data.get("query")
        api_key = data.get("groq_api_key")
        
        if not query:
            return jsonify({"error": "Query is required."}), 400
        
        # Get the response from the FAQ bot
        response = answer_customer_query(query, api_key=api_key)
        return jsonify({"response": response})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/classify", methods=["POST"])
def classify():
    try:
        # Get the customer query from the request
        data = request.json
        query = data.get("query")
        api_key = data.get("groq_api_key")
        
        if not query:
            return jsonify({"error": "Query is required."}), 400
        
        if not api_key:
            return jsonify({"error": "API key is required for classification."}), 400
        
        # Classify the query and save it to the log file
        category = classify_and_log_query(query, api_key)

        return jsonify({"category": category})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        # Get the customer query from the request
        data = request.json
        query = data.get("query")
        api_key = data.get("groq_api_key")
        
        if not query:
            return jsonify({"error": "Query is required."}), 400
        
        if not api_key:
            return jsonify({"error": "API key is required for summarization."}), 400
        
        # Summarize the query and save it to the log file
        summary = summarize_and_log_query(query, api_key)

        return jsonify({"query": query, "summary": summary})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/sentiment", methods=["POST"])
def sentiment():
    try:
        # Get the text input from the request
        data = request.json
        text = data.get("query")
        api_key = data.get("groq_api_key")
        
        if not text:
            return jsonify({"error": "Text is required."}), 400
        if not api_key:
            return jsonify({"error": "API key is required for sentiment analysis."}), 400
        
        sentiment_result = sentiment_analysis(text, api_key)
        
        return jsonify({"sentiment": sentiment_result})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# Callback function to handle transcription result
def transcription_callback(transcript):
    """
    This callback handles the transcription results.
    You can modify it to handle the results in different ways.
    In this case, it simply prints the transcript.
    """
    print(f"Received Transcription: {transcript}")
    # You can process the transcript further here (e.g., store it in a database)

# API to handle transcription
@app.route("/api/transcribe", methods=["POST"])
def transcribe():
    """
    Endpoint to handle transcription requests.
    Assumes microphone input to Deepgram API for live transcription.
    Starts transcription in a separate thread.
    """
    def transcription_thread():
        # Pass the transcription_callback to get_transcript to handle the response
        asyncio.run(get_transcript(transcription_callback))

    # Run transcription in a separate thread (non-blocking)
    thread = threading.Thread(target=transcription_thread)
    thread.start()

    return jsonify({"message": "Transcription started"}), 200


# API to handle LLM response
@app.route("/api/respond", methods=["POST"])
def respond():
    """
    Endpoint to process user input via LLM.
    Input: JSON { "text": "<user message>" }
    Output: JSON { "response": "<LLM response>" }
    """
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Invalid request"}), 400

    user_message = data["text"]
    llm_response = llm_processor.process(user_message)
    return jsonify({"response": llm_response})


# API to handle TTS response
@app.route("/api/tts", methods=["POST"])
def tts_speak():
    """
    Endpoint to convert text to speech and play audio.
    Input: JSON { "text": "<text to speak>" }
    Output: JSON { "message": "Audio generated and played" }
    """
    data = request.get_json()
    if not data or "text" not in data:
        return jsonify({"error": "Invalid request"}), 400

    text_to_speak = data["text"]
    try:
        tts.speak(text_to_speak)
        return jsonify({"message": "Audio generated and played"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Quiz Page Code
PORT = 8000
form_data_store = {}

@app.route('/api/generateForm', methods=['POST'])
def generate_form():
    try:
        form_id = str(uuid.uuid4())  # Generate a unique form ID
        form_data_store[form_id] = {
            'responses': [],
            'completed': False 
        }

        unique_url = f'http://127.0.0.1:{PORT}/form/{form_id}'
        print(f'Generated form URL: {unique_url}')
        print(form_data_store)
        return jsonify({'url': unique_url})
    except Exception as e:
        return jsonify({'error': 'Unable to generate form', 'err': str(e)}), 500


@app.route('/api/questions', methods=['GET'])
def get_questions():
    questions_path = os.path.join('data', 'questions.json')
    try:
        with open(questions_path, 'r', encoding='utf-8') as file:
            questions = json.load(file)
            return jsonify(questions)
    except Exception as e:
        print(f'Error reading questions file: {e}')
        return jsonify({'error': 'Unable to load questions'}), 500


@app.route('/api/feedback', methods=['POST'])
def save_feedback():
    data = request.get_json()
    responses = data.get('responses', [])
    final_feedback = data.get('finalFeedback', '')
    questions_path = os.path.join('data', 'questions.json')
    with open(questions_path, 'r', encoding='utf-8') as file:
        questions = json.load(file)
        
    # Prepare data to be saved with questions as indexes
    feedback_data = [{'question': questions[i]["question"], 'answer': response} for i, response in enumerate(responses) if i < len(questions)]
    feedback_data.append({'question': 'Final Feedback', 'answer': final_feedback})

    # Define the path to the CSV file
    file_path = os.path.join('data', 'feedback.csv')

    # Check if the CSV file exists, create headers if it doesn't
    file_exists = os.path.isfile(file_path)

    try:
        with open(file_path, 'a', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile, quoting=csv.QUOTE_ALL)

            # Write header if file doesn't exist
            if not file_exists or os.stat(file_path).st_size == 0:
                headers = [item['question'] for item in feedback_data]
                writer.writerow(headers)

            # Write the data row (flattened answers)
            data_row = [item['answer'] for item in feedback_data]
            writer.writerow(data_row)
            form_data_store[data.get('formId')]['completed'] = True

        return jsonify({'message': 'Feedback submitted successfully!'})
    except Exception as e:
        print(f'Error writing to CSV: {e}')
        return jsonify({'error': 'Unable to save feedback'}), 500
    
# Get Faq Data
@app.route('/api/getfaq', methods=['GET'])
def get_faq():
    faq_path = os.path.join('data', 'faq_data.csv')
    try:
        faq_data = []
        with open(faq_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                faq_data.append(row)
        return jsonify(faq_data)
    except Exception as e:
        print(f'Error reading FAQ data file: {e}')
        return jsonify({'error': 'Unable to load FAQ data'}), 500
    

# Save Query Data
@app.route('/api/savequery', methods=['POST'])
def save_query():
    # Get JSON data from the request
    data = request.get_json()
    api_key = GROQ_API

    # Extract required fields with defaults if not provided
    username = data.get('username', '')
    mobile_no = data.get('mobileNo', '')
    query = data.get('query', '')
    answer = ''
    query_id = str(uuid.uuid4())  # Generate a unique ID for the query

    try:
        category_result = classify_and_log_query(query, api_key)
        summary_result = summarize_and_log_query(query, api_key)
    except Exception as e:
        print(f'Error processing query: {e}')
        category_result = ''
        summary_result = ''
        answer = ''

    # Define the path to the CSV file
    file_path = os.path.join('data', 'queries.csv')

    # Check if the file exists
    file_exists = os.path.isfile(file_path)

    try:
        # Open the CSV file for appending
        with open(file_path, mode='a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)

            # Write headers if the file doesn't exist
            if not file_exists or os.stat(file_path).st_size == 0:
                writer.writerow(['ID', 'Username', 'Mobile Number', 'Query', 'Category', 'Summary', 'Answer'])

            # Write the data row
            writer.writerow([query_id, username, mobile_no, query, category_result, summary_result, answer])

        return jsonify({'message': 'Query saved successfully!', 'id': query_id}), 200
    except Exception as e:
        print(f'Error saving query to CSV: {e}')
        return jsonify({'error': 'Unable to save query'}), 500

# Fetch all queries API
@app.route('/api/getqueries', methods=['GET'])
def get_queries():
    # Define the path to the CSV file
    file_path = os.path.join('data', 'queries.csv')

    try:
        # Open the CSV file for reading
        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            queries = []

            for row in reader:
                # Handle NoneType values by replacing them with an empty string or a default value
                cleaned_row = {key: (value if value is not None else '') for key, value in row.items()}
                queries.append(cleaned_row)

        return jsonify(queries)
    except Exception as e:
        print(f'Error reading queries from CSV: {e}')
        return jsonify({'error': 'Unable to load queries'}), 500

# Update query answer API
@app.route('/api/updateanswer', methods=['POST'])
def update_answer():
    # Get JSON data from the request
    data = request.get_json()
    query_id = data.get('id', '')
    new_answer = data.get('answer', '')

    file_path = os.path.join('data', 'queries.csv')
    temp_file_path = os.path.join('data', 'queries_temp.csv')

    try:
        updated = False

        with open(file_path, mode='r', encoding='utf-8') as infile, open(temp_file_path, mode='w', newline='', encoding='utf-8') as outfile:
            reader = csv.DictReader(infile)
            writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames)

            writer.writeheader()
            for row in reader:
                if row['ID'] == query_id:
                    row['Answer'] = new_answer
                    updated = True
                writer.writerow(row)

        # Replace the original file with the updated file
        os.replace(temp_file_path, file_path)

        if updated:
            return jsonify({'message': 'Answer updated successfully!'}), 200
        else:
            return jsonify({'error': 'Query ID not found'}), 404
    except Exception as e:
        print(f'Error updating answer: {e}')
        return jsonify({'error': 'Unable to update answer'}), 500
    
@app.route('/form/<form_id>')
def serve_form(form_id):
    print(form_data_store)
    if form_id in form_data_store:
        print(f'Serving form with ID: {form_id}')
        if not form_data_store[form_id]['completed']:
            return render_template('index.html')
        else:
            return render_template('form_submitted.html')
    else:
        return jsonify({'error': 'Invalid form ID'}), 404
    
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        # Get the user prompt from the request data
        data = request.json
        user_prompt = data.get("user_prompt")
        client = Groq(api_key="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")

        if not user_prompt:
            return jsonify({"error": "No user prompt provided!"}), 400

        # Define the instruction to restrict answers to the vehicle domain
        instruction = (
            "Give me my query answers only from the vehicle domain. "
            "Do not go out of context and do not answer any query unrelated to vehicles. "
            "If the query is not related to vehicles, return: 'I don't know. I was not trained on it!!'."
        )

        # Prepare messages for the model
        messages = [
            {"role": "system", "content": instruction},
            {"role": "user", "content": user_prompt}
        ]

        # Send the messages to the LLM'
       
        
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # Replace with the desired model
            messages=messages
        )

        assistant_response = response.choices[0].message.content

        # Return the assistant's response as JSON
        return jsonify({"response": assistant_response}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/second-column', methods=['GET'])
def get_second_column():
    """
    Endpoint to retrieve the second column values from the CSV file.
    """
    file_path = "./data/feedback.csv"
    if not os.path.exists(file_path):
        return jsonify({"error": "File feedback.csv not found"}), 404
    second_column_values = []
    with open(file_path, 'r') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip the header row
        for row in reader:
            if len(row) > 1:
                second_column_values.append(row[1].strip())
    return second_column_values
    
def get_second_column_values(file_path):
    """
    Reads the CSV file and extracts values from the second column of each row.
    """
    try:
        second_column_values = []
        with open(file_path, 'r') as csvfile:
            reader = csv.reader(csvfile)
            next(reader)  # Skip the header row
            for row in reader:
                if len(row) > 1:
                    second_column_values.append(row[1].strip())
        return second_column_values
    except Exception as e:
        return {"error": str(e)}

@app.route('/')
def home():
    return "Hello!!, Flask Server Running..."

if __name__ == "__main__":
    app.run(debug=True, port=8000)

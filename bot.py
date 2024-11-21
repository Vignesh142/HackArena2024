# bot.py
import pandas as pd
from sentence_transformers import SentenceTransformer
from utils.faiss_utils import load_faiss_index, load_faq_data, search_similar_faq
from utils.llm_utils import get_llm_response, save_query_and_category, classify_query, get_summarization_response, save_summary_log, get_sentiment_analysis

def answer_customer_query(query, faq_data_path="data/faq_data.csv", faq_index_path="data/faq_index.bin", api_key=None):
    """Handles the customer query: finds a similar FAQ and enhances the answer using the LLM."""
    
    # Load FAQ data and FAISS index
    faq_df = load_faq_data(faq_data_path)
    index = load_faiss_index(faq_index_path)
    
    # Initialize the Sentence Transformer model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    # Step 1: Find the most similar FAQ
    faq_answer, similarity_score = search_similar_faq(query, index, faq_df, model)
    if faq_answer is None:
        return "I'm sorry, I couldn't find an answer to your question."
    
    # Step 2: If similarity is low, return a default message
    if similarity_score >= 0.8:
        return "I'm sorry, I couldn't find an answer to your question."
    
    # Step 3: Use LLM to enhance the FAQ answer (optional)
    if api_key:
        enhanced_answer = get_llm_response(faq_answer, query, api_key)
        return enhanced_answer
    else:
        return faq_answer

def classify_and_log_query(query, api_key, log_file_path="query_classification_log.csv"):
    """Classifies the query, logs it to a CSV file, and returns the classification."""
    # Categories for classification
    categories = [
        "Technical Issues & Troubleshooting",
        "Maintenance & Servicing",
        "Vehicle Features & Upgrades",
        "Financial & Insurance Services",
        "Sales & Post-Purchase Services",
        "Environmental & Safety Concerns",
        "Miscellaneous"
    ]

    # Classify the query using the Groq API
    category = classify_query(query, categories, api_key)
    # print(category)
    try:
        # Save the query and its category to the CSV file
        save_query_and_category(query, category, log_file_path)
    except Exception as e:
        print(f"Error saving query and category: {e}")

    return category

def summarize_and_log_query(query, api_key, log_file_path="query_summary_log.csv"):
    """Summarizes the query, logs it, and returns the summary."""
    # Summarize the query using the Groq API
    summary = get_summarization_response(query, api_key)
    # print(summary)
    try:
        # Log the query and its summary to the CSV file
        save_summary_log(query, summary, log_file_path)
    except Exception as e:
        print(f"Error saving query and summary: {e}")
    return summary

def sentiment_analysis(text, api_key):
    """Analyzes the sentiment of the text using the Groq API."""
    # Call the sentiment analysis API
    sentiment_result = get_sentiment_analysis(text, api_key)
    return sentiment_result


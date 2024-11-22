import React, { useState } from "react";
import axios from "axios";

function FormPage() {
  const [loading, setLoading] = useState(false);
  const [formUrl, setFormUrl] = useState("");
  const [error, setError] = useState("");

  const generateForm = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/generateForm");
      if (response.status === 200 && response.data.url) {
        setFormUrl(response.data.url);
      } else {
        setError("Error generating the form.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 p-6 text-white">
      <div className="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Feedback Form Generator
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Click the button below to generate a custom feedback form in seconds!
        </p>
        <button
          className={`w-full py-3 rounded-lg font-semibold text-white transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={generateForm}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Feedback Form"}
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4 animate-bounce">{error}</p>
        )}

        {formUrl && (
          <div className="mt-6 text-center">
            <p className="text-gray-700 mb-2">
              🎉 Your feedback form is ready:
            </p>
            <a
              href={formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold underline hover:text-blue-800 transition duration-200"
            >
              Click here to access your form
            </a>
          </div>
        )}
      </div>
      <footer className="mt-8 text-sm text-white/80">
        Made with ❤️ for better user engagement.
      </footer>
    </div>
  );
}

export default FormPage;

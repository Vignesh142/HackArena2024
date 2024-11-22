import React, { useState } from "react";
import axios from "axios";

const GenerateFormButton = () => {
  const [formUrl, setFormUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to call the backend API to generate the form URL
  const generateForm = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/generateForm");

      if (response.status === 200) {
        const uniqueUrl = response.data.url;
        setFormUrl(uniqueUrl);
        // Redirect the user to the generated URL
        window.location.href = uniqueUrl; // This will redirect to the form URL
      } else {
        console.error("Failed to generate form:", response.status);
      }
    } catch (error) {
      console.error("Error generating form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={generateForm}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Generating Form..." : "Generate Form"}
      </button>

      {formUrl && (
        <div className="mt-4">
          <p>Form URL generated: </p>
          <a href={formUrl} target="_blank" rel="noopener noreferrer">
            {formUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default GenerateFormButton;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header.js"

const SubmitTicket = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsername] = useState(''); // State to store username
  const [mobileNo, setMobileNo] = useState(''); // State to store mobile number
  const [query, setQuery] = useState(''); // State to store query
  const [error, setError] = useState(''); // State to handle any errors
  const [loading, setLoading] = useState(false); // State to handle loading status

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true);
    setError(''); // Reset any previous errors

    // Prepare the data to be sent to the API
    const data = {
      username,
      mobileNo,
      query, // Include the query field
    };

    try {
      // Make the API request using axios
      const response = await axios.post('http://localhost:8000/api/savequery', data); // Replace with your API endpoint
      if (response.status === 200) {
        // Success: alert and redirect
        alert('Ticket submitted successfully');
        setUsername('');
        setMobileNo('');
        setQuery('');
        navigate('/ticket-form'); // Navigate to ticket form after successful submission
      } else {
        setError('There was an issue submitting the ticket. Please try again.');
        alert('Error: ' + response.data.error);
      }
    } catch (err) {
      setError('Error: ' + err.message);
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Submit a Ticket
        </h2>
        <section>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-gray-700 text-base font-medium mb-4">
              Can't find what you're looking for? Submit a support ticket, and we'll get back to you as soon as possible.
            </p>
            
            {/* Form inputs for username, mobile number, and query */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  id="mobileNo"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="query" className="block text-sm font-medium text-gray-700">Your Query</label>
                <textarea
                  id="query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit a Ticket'}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
};

export default SubmitTicket;

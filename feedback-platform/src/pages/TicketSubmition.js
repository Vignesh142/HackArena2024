import React, { useState } from 'react';
import axios from 'axios'; // Axios for API calls
import Header from '../components/Header';

const TicketSubmission = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', query: '' });

  // Regex for validating Indian phone numbers
  const phoneRegex = /^[6-9]\d{9}$/;

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const { name, phone, query } = formData;
    if (!name || !phone || !query) {
      alert('Please fill out all fields.');
      return false;
    }
    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid 10-digit Indian mobile number.');
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:5000/submit-ticket', formData);
      if (response.status === 200) {
        alert('Data sent successfully!');
      }
    } catch (error) {
      alert('Failed to send data. Please try again.');
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Submit Ticket
          </h2>
          <div className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                placeholder="Enter your 10-digit mobile number..."
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Query Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Query
              </label>
              <textarea
                placeholder="Enter your query..."
                value={formData.query}
                onChange={(e) => handleInputChange('query', e.target.value)}
                className="w-full border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              onClick={submitForm}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            >
              Submit Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSubmission;

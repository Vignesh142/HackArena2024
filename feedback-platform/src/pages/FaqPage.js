import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // Adjust the path based on your folder structure.

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [error, setError] = useState(null); // Error handling

  // Fetch FAQs from the backend
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getfaq'); // Replace with your backend URL
        setFaqs(response.data);
        setFilteredFaqs(response.data); // Initially show all FAQs
      } catch (error) {
        setError('Error fetching FAQs. Please try again later.');
        console.error('Error fetching FAQs:', error);
      }
    };
    fetchFaqs();
  }, []);

  // Filter FAQs based on search query and category
  useEffect(() => {
    const filterFaqs = () => {
      let filtered = faqs;
      if (searchQuery.trim()) {
        filtered = filtered.filter((faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by active category if it's set
      if (activeCategory) {
        filtered = filtered.filter((faq) => faq.category === activeCategory);
      }

      setFilteredFaqs(filtered);
    };

    filterFaqs();
  }, [searchQuery, activeCategory, faqs]);

  // Toggle category selection
  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto p-6 flex gap-6">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">FAQ Categories</h2>
          <div className="flex flex-col gap-3">
            {[{ id: 'general', label: 'General' }, { id: 'account', label: 'Account' }].map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-left w-full text-sm font-medium transition ${
                  activeCategory === category.id
                    ? 'bg-blue-100 text-blue-600 shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-50 hover:shadow-sm'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="flex-1 flex flex-col bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Error Handling */}
          {error && <p className="text-red-500">{error}</p>}

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                  <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No FAQs found.</p>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Announcements</h2>
          <p className="text-gray-600">
            Stay updated with the latest updates and announcements about our platform. Check back here for more
            information.
          </p>
          <ul className="mt-4 space-y-3">
            <li className="p-3 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition">
              <h4 className="font-medium">Feature Update</h4>
              <p className="text-sm text-gray-600">We’ve added new features to enhance your experience!</p>
            </li>
            <li className="p-3 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition">
              <h4 className="font-medium">Scheduled Maintenance</h4>
              <p className="text-sm text-gray-600">Maintenance is scheduled for Sunday, 12:00 AM to 2:00 AM.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;

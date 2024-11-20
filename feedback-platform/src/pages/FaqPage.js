import React, { useState } from 'react';
import Header from '../components/Header'; // Adjust the path based on your folder structure.

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Demo FAQs for each category
  const faqs = {
    gettingStarted: [
      { question: 'How do I create an account?', answer: 'Go to the signup page and fill in your details.' },
      { question: 'What is the first step to use the app?', answer: 'Start by completing your profile.' },
    ],
    troubleshooting: [
      { question: 'Why can’t I log in?', answer: 'Ensure your email and password are correct.' },
      { question: 'How do I reset my password?', answer: 'Click on "Forgot Password" on the login page.' },
    ],
    usingDevice: [
      { question: 'How do I connect my device?', answer: 'Go to settings and click "Connect Device".' },
      { question: 'What are the supported devices?', answer: 'Check the compatibility list on our website.' },
    ],
    accessibility: [
      { question: 'What accessibility features are available?', answer: 'Text-to-speech, screen reader support, and more.' },
      { question: 'How can I enable dark mode?', answer: 'Go to settings and toggle dark mode.' },
    ],
    account: [
      { question: 'How do I update my account information?', answer: 'Navigate to the "Account Settings" page.' },
      { question: 'Can I delete my account?', answer: 'Yes, go to settings and select "Delete Account".' },
    ],
    popular: [
      { question: 'How do I create an account?', answer: 'Go to the signup page and fill in your details.' },
      { question: 'Why can’t I log in?', answer: 'Ensure your email and password are correct.' },
      { question: 'What are the supported devices?', answer: 'Check the compatibility list on our website.' },
    ],
  };

  // Toggle category selection
  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { type: 'user', text: inputValue }]);
      setInputValue('');
    }
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
            {[
              { id: 'gettingStarted', label: 'Getting Started' },
              { id: 'troubleshooting', label: 'Troubleshooting' },
              { id: 'usingDevice', label: 'Using Your Device' },
              { id: 'accessibility', label: 'Accessibility' },
              { id: 'account', label: 'Account' },
            ].map((category) => (
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {activeCategory ? `FAQs: ${activeCategory.replace(/([A-Z])/g, ' $1')}` : 'Popular FAQs'}
          </h2>
          <div className="space-y-4">
            {(activeCategory ? faqs[activeCategory] : faqs.popular).map((faq, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chatbot Interface */}
        <div className="w-1/3 bg-gray-100 flex flex-col p-6 rounded-lg shadow-md h-[90vh]">
          <h2 className="text-xl font-bold text-gray-800 mb-4">FaqBot Assistance</h2>
          <p className="text-gray-600 mb-4">
            Need help? Our FaqBot can answer questions and assist with common issues.
          </p>
          <div className="flex-1 overflow-y-auto bg-white p-4 rounded-lg shadow-inner">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg ${
                  message.type === 'user' ? 'bg-blue-100 self-end text-right' : 'bg-gray-200 self-start'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="text-gray-500 hover:text-blue-500">
              <i className="fas fa-paperclip"></i>
            </button>
            <button className="text-gray-500 hover:text-blue-500">
              <i className="fas fa-microphone"></i>
            </button>
            <button
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;

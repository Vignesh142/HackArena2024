import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import aiChatbotImage from '../assets/aichatbotimg.png';
import feedbackImage from '../assets/feedbackimg.png';
import voiceQueriesImage from '../assets/micimg.png';
import faqs from '../assets/faq-1.png';

const features = [
  {
    title: "AI Chatbot Assistance",
    description: "Use our AI chatbot to assist you in providing real-time feedback to your customers.",
    image: aiChatbotImage,
    link: "/chatbot", // Link to the Chatbot page
  },
  {
    title: "Submit Feedback Effortlessly",
    description: "Easily submit feedback to help you improve your customer experience.",
    image: feedbackImage,
    action: "submit_feedback", // Custom action to trigger feedback URL generation
    link: "/form", // Link to the Feedback form page
  },
  {
    title: "Voice Your Queries",
    description: "Ask questions and get answers from our team of experts.",
    image: voiceQueriesImage,
  },
  {
    title: "FAQ Assistance",
    description: "Browse frequently asked questions to get instant answers and support.",
    image: faqs,
    link: "/faq", // Link to the FAQ page
  },
];

const FeaturesSection = () => {
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Handle the feature click action
  const handleFeatureClick = async (action) => {
    if (action === 'submit_feedback') {
      setLoading(true);
      setError('');

      try {
        // API call to generate the form URL
        const response = await fetch('http://127.0.0.1:8000/api/generateForm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          // Extract the formId from the URL and navigate to the form page
          const formId = data.url.split('/').pop();
          // navigate(/form/${formId}); // Use navigate to redirect to the form page
          navigate(`/form/${formId}`); // Correct syntax

        } else {
          setError('Error generating the form URL.');
        }
      } catch (err) {
        setError('Failed to generate form URL.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div id="featureSection" className="py-10 bg-gray-50">
    <>
      <h2 className="text-[#0d151c] text-[24px] sm:text-[28px] font-semibold leading-tight tracking-[-0.015em] px-4 pb-3">
      Powerful Features
      </h2>
      <h4 className="text-[#0d151c] text-[17px] leading-tight tracking-[-0.015em] px-6 pb-5">
        Engage provides all the tools you need to collect, analyze, and respond to customer feedback in real time.
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 border-2 border-gray-200 rounded-lg p-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={() => feature.action && handleFeatureClick(feature.action)} // Trigger action if defined
          >
            {/* Image */}
            {feature.link ? (
              <a href={feature.link}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg mb-4 cursor-pointer"
                  style={{ width: '280px', height: '280px', objectFit: 'cover' }}
                />
              </a>
            ) : (
              <img
                src={feature.image}
                alt={feature.title}
                className="rounded-lg mb-4"
                style={{ width: '280px', height: '280px', objectFit: 'cover' }}
              />
            )}
            <h3 className="font-bold text-lg text-center">{feature.title}</h3>
            <p className="text-sm text-gray-600 text-center">{feature.description}</p>
            {/* Show loading spinner if loading */}
            {loading && <p>Loading...</p>}
            {/* Show error message if error occurs */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        ))}
      </div>
    </>
    </div>
  );
};

export default FeaturesSection;
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import aiChatbotImage from '../assets/aichatbotimg.png'; // Update the path to match your folder structure
import feedbackImage from '../assets/feedbackimg.png';
import voiceQueriesImage from '../assets/micimg.png';
import insightsImage from '../assets/graphimg.png';

const features = [
  {
    title: "AI Chatbot Assistance",
    description: "Use our AI chatbot to assist you in providing real-time feedback to your customers.",
    image: aiChatbotImage,
    link: "/faq", // Add the link to the FAQ page
  },
  {
    title: "Submit Feedback Effortlessly",
    description: "Easily submit feedback to help you improve your customer experience.",
    image: feedbackImage,
  },
  {
    title: "Voice Your Queries",
    description: "Ask questions and get answers from our team of experts.",
    image: voiceQueriesImage,
  },
  {
    title: "Insights at Your Fingertips",
    description: "Get insights into your feedback and how it impacts your business.",
    image: insightsImage,
  },
];

const FeaturesSection = () => {
  return (
    <>
      <h2 className="text-[#0d151c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-7 pb-4">
        Powerful Features
      </h2>
      <h4 className="text-[#0d151c] text-[17px] leading-tight tracking-[-0.015em] px-4 pb-5">
        Engage provides all the tools you need to collect, analyze, and respond to customer feedback in real time.
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 border-2 border-gray-200 rounded-lg p-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {/* Image */}
            {feature.link ? (
              <Link to={feature.link}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-lg mb-4 cursor-pointer"
                  style={{ width: '280px', height: '280px', objectFit: 'cover' }}
                />
              </Link>
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
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturesSection;

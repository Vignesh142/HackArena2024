import React from 'react';

const features = [
  {
    title: "AI Chatbot Assistance",
    description: "Use our AI chatbot to assist you in providing real-time feedback to your customers.",
    image: "https://cdn.usegalileo.ai/sdxl10/535cfd70-2267-46e3-b0f9-8cf41704037d.png"
  },
  {
    title: "Submit Feedback Effortlessly",
    description: "Easily submit feedback to help you improve your customer experience.",
    image: "https://cdn.usegalileo.ai/sdxl10/a49139f8-d7d7-4e02-8064-6bc320a0ff75.png"
  },
  {
    title: "Voice Your Queries",
    description: "Ask questions and get answers from our team of experts.",
    image: "https://cdn.usegalileo.ai/sdxl10/97e603c7-e8d8-43df-a7c2-1215b538cc61.png"
  },
  {
    title: "Insights at Your Fingertips",
    description: "Get insights into your feedback and how it impacts your business.",
    image: "https://cdn.usegalileo.ai/sdxl10/28e2540f-27f0-4838-84fa-ead7d5c7b42e.png"
  },
];

const FeaturesSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-3 border-2 border-gray-200 rounded-lg p-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-lg" // Added hover effect and transition
        >
          {/* Image with reduced size */}
          <img
            src={feature.image}
            alt={feature.title}
            className="rounded-lg mb-4"
            style={{ width: '280px', height: '280px', objectFit: 'cover' }} // Control size directly
          />
          <h3 className="font-bold text-lg text-center">{feature.title}</h3>
          <p className="text-sm text-gray-600 text-center">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;

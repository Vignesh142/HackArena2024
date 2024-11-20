import React from 'react';
import faq1 from '../assets/faq-1.png';
import faq2 from '../assets/faq-2.png';
import faq3 from '../assets/faq-3.png';

// List of FAQs with titles and associated images
const faqs = [
  { title: 'What can I do on your platform?', image: faq1 },
  { title: 'How do I sign up for an account?', image: faq2 },
  { title: 'How do I reset my password?', image: faq3 },
];

const FAQs = () => {
  return (
    <>
      {/* Section title */}
      <h2 className="text-[#0d151c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-2">
        FAQs
      </h2>

      {/* Flexbox layout for a single row */}
      <div className="flex gap-12 px-12 pb-10 overflow-x-auto">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-5 border-2 border-gray-200 rounded-lg p-3 min-w-[160px] transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            {/* FAQ Image */}
            <img
              src={item.image}
              alt={`FAQ ${index + 1}`}
              className="w-72 h-72 rounded-md object-cover"
            />
            {/* FAQ Title */}
            <p className="text-[#0d151c] text-sm font-medium leading-normal text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQs;

import React from 'react';

// List of Solutions with titles and associated images
const solutions = [
  { title: 'Guides', image: 'https://cdn.usegalileo.ai/sdxl10/fb5f5c28-7a41-47fc-9b24-adaf687e8326.png' },
  { title: 'Community', image: 'https://cdn.usegalileo.ai/sdxl10/6027ba40-8499-4fbf-84b5-576de14bdbee.png' },
  { title: 'Blog', image: 'https://cdn.usegalileo.ai/stability/64d0d70c-7d57-4972-8053-0c76d469a0f3.png' },
];

const Solutions = () => {
  return (
    <>
      {/* Section Title */}
      <h2 className="text-[#0d151c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-5">
        Solutions
      </h2>

      {/* Flexbox layout for a horizontal row with gap between boxes */}
      <div className="flex gap-12 px-12 pb-10 overflow-x-auto">
        {solutions.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 border-2 border-gray-200 rounded-lg p-4 min-w-[160px] transition-transform duration-300 transform hover:scale-105 hover:shadow-lg" // Added hover effect
          >
            {/* Solution Image */}
            <img
              src={item.image}
              alt={`Solution ${index + 1}`}
              className="w-72 h-72 rounded-md object-cover mb-3"
            />
            {/* Solution Title */}
            <p className="text-[#0d151c] text-sm font-medium leading-normal text-center">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Solutions;

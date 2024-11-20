import React from 'react';

const HeroSection = () => {
  return (
    <div className="flex flex-col px-10 py-10 bg-gray-100">
      <h1 className="text-4xl font-black text-[#111418] mb-4">Engage with your customers</h1>
      <p className="text-sm text-[#111418] max-w-lg">
        Understand your customer feedback and respond in real-time with Engage. Improve your customer experience and drive business outcomes.
      </p>
      <button className="mt-6 bg-[#0b6fda] text-white px-4 py-2 rounded-lg font-bold">Get Started</button>
    </div>
  );
};

export default HeroSection;

import React from 'react';
import HeroImage from '../assets/hero-image.png'; // Adjust the image path accordingly

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-6 py-10 bg-gray-100">
      {/* Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={HeroImage}
          alt="Customer Service Illustration"
          className="rounded-lg shadow-md max-w-xs md:max-w-lg h-auto" // Responsive image adjustments
          loading="lazy" // Lazy load for better performance
        />
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 mt-4 md:mt-0 text-center md:text-left md:pl-8">
        <h1 className="text-4xl md:text-5xl font-black text-[#111418] mb-4 leading-tight">
          Engage with your customers
        </h1>
        <p className="text-sm md:text-base text-[#111418] max-w-md mx-auto md:mx-0 mb-6">
          Understand your customer feedback and respond in real-time with
          Engage. Improve your customer experience and drive business
          outcomes.
        </p>
        <button
          className="bg-[#0b6fda] text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition duration-300"
          aria-label="Get Started"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

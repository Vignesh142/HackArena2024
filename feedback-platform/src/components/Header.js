import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Header = () => {
  return (
    <header className="flex items-center justify-between px-10 py-3 border-b border-[#f0f2f5] bg-white">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <div className="w-6 h-6 text-[#111418]">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
          Engage
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-8">
        <Link
          className="text-[#111418] text-sm font-medium hover:text-blue-600 transition duration-300"
          to="/" // Navigate to the home route
        >
          Home
        </Link>
        <a
          className="text-[#111418] text-sm font-medium hover:text-blue-600 transition duration-300"
          href="#"
        >
          Features
        </a>
        <a
          className="text-[#111418] text-sm font-medium hover:text-blue-600 transition duration-300"
          href="#"
        >
          Customers
        </a>
        <a
          className="text-[#111418] text-sm font-medium hover:text-blue-600 transition duration-300"
          href="#"
        >
          Pricing
        </a>
        <a
          className="text-[#111418] text-sm font-medium hover:text-blue-600 transition duration-300"
          href="#"
        >
          Resources
        </a>
      </nav>

      {/* Button Section */}
      <div className="flex items-center gap-4">
        <button className="h-10 px-6 bg-[#0b6fda] text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition duration-300">
          Log in
        </button>
        <button className="h-10 px-6 bg-[#f0f2f5] text-[#111418] text-sm font-bold rounded-lg hover:bg-gray-200 transition duration-300">
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Header;

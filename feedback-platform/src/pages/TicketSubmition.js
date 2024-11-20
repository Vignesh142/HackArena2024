import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing the hook for navigation

// Reusable Navigation Button Component
const NavButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-3 py-2 text-sm font-medium leading-normal ${
      isActive ? 'bg-[#e7eef4] text-[#0d151c]' : 'text-[#0d151c]'
    }`}
  >
    {label}
  </button>
);

const TicketSubmition = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate(); // Hook for navigation

  const sections = {
    overview: 'Overview content goes here...',
    settings: 'Settings content goes here...',
    fields: 'Fields content goes here...',
  };

  // Handler for "Submit Ticket" button
  const handleSubmitTicket = () => {
    navigate('/submit-ticket'); // Navigates to the "/submit-ticket" route
  };

  return (
    <div className="relative flex min-h-screen bg-slate-50 overflow-x-hidden">
      <div className="flex flex-row w-full">
        {/* Sidebar on the left */}
        <div className="w-1/4 bg-slate-100 p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {/* Navigation Buttons */}
              {['overview', 'settings', 'fields'].map((section) => (
                <NavButton
                  key={section}
                  label={section.charAt(0).toUpperCase() + section.slice(1)}
                  isActive={activeSection === section}
                  onClick={() => setActiveSection(section)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex flex-wrap justify-between gap-3 p-4">
            <p className="text-[#0d151c] tracking-light text-[32px] font-bold leading-tight min-w-72">
              Submit ticket form
            </p>
          </div>

          {/* Conditional Rendering Based on Active Section */}
          <div className="p-4">{sections[activeSection]}</div>

          <div className="flex items-center gap-4 bg-slate-50 px-4 min-h-14 justify-between">
            <p className="text-[#0d151c] text-base font-normal leading-normal flex-1 truncate">
              Require authentication
            </p>
            <div className="shrink-0">
              <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#e7eef4] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-[#2094f3]">
                <div className="h-full w-[27px] rounded-full bg-white"></div>
                <input type="checkbox" className="invisible absolute" />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          {['Name', 'Email', 'Phone'].map((field) => (
            <div key={field} className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0d151c] text-base font-medium leading-normal pb-2">{field}</p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d151c] focus:outline-0 focus:ring-0 border-none bg-[#e7eef4] focus:border-none h-14 placeholder:text-[#49779c] p-4 text-base font-normal leading-normal"
                  value=""
                />
              </label>
            </div>
          ))}

          {/* Submit Button that Navigates to /submit-ticket */}
          <div className="flex justify-center py-4">
            <button
              onClick={handleSubmitTicket} // Trigger navigation on button click
              className="bg-blue-500 text-white px-6 py-2 rounded-full"
            >
              Submit Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSubmition;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitTicket = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmitTicketClick = () => {
    // Navigate to the page or section where the ticket form is located
    navigate('/ticket-form'); // Update with your desired route or section ID
  };

  return (
    <>
    <div id="ticketSection" className="py-10 bg-gray-50">
      <h2 className="text-[#0d151c] text-[24px] sm:text-[28px] font-semibold leading-tight tracking-[-0.015em] px-4 pb-3">
        Submit a Ticket
      </h2>
      <section className="p-4">
        <div className="flex flex-1 flex-col items-start justify-between gap-6 rounded-xl border border-[#cedde8] bg-slate-50 p-10">
          <div className="flex flex-col gap-2">
            <p className="text-[#0d151c] text-[16px] sm:text-[18px] font-semibold leading-tight">
              Can't find what you're looking for?
            </p>
            <p className="text-[#49779c] text-[14px] sm:text-[16px] font-medium leading-normal">
              Submit a support ticket, and we'll get back to you as soon as possible.
            </p>
          </div>
          <button
            onClick={handleSubmitTicketClick} // Handle navigation on click
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#2094f3] text-slate-50 text-[16px] sm:text-[18px] font-medium leading-normal shadow-md hover:bg-[#1878c2] transition duration-300"
          >
            Submit a Ticket
          </button>
        </div>
      </section>
      </div>
    </>
  );
};

export default SubmitTicket;

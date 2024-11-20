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
      <h2 className="text-[#0d151c] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-2">
        Submit a ticket
      </h2>
      <section className="p-4">
        <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-[#cedde8] bg-slate-50 p-10">
          <div className="flex flex-col gap-1">
            <p className="text-[#0d151c] text-base font-bold leading-tight">
              Can't find what you're looking for?
            </p>
            <p className="text-[#49779c] text-base font-normal leading-normal">
              Submit a support ticket, and we'll get back to you as soon as possible.
            </p>
          </div>
          <button
            onClick={handleSubmitTicketClick} // Handle navigation on click
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#2094f3] text-slate-50 text-sm font-medium leading-normal"
          >
            Submit a ticket
          </button>
        </div>
      </section>
    </>
  );
};

export default SubmitTicket;

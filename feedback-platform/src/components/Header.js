import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f5] px-10 py-3">
      <div className="flex items-center gap-4 text-[#111418]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">Engage</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Home</a>
          <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Features</a>
          <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Customers</a>
          <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Pricing</a>
          <a className="text-[#111418] text-sm font-medium leading-normal" href="#">Resources</a>
        </div>
        <div className="button-container">
          <button className="flex min-w-[84px] h-10 px-4 bg-[#0b6fda] text-white text-sm font-bold rounded-xl">Log in</button>
          <button className="flex min-w-[84px] h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold rounded-xl">Sign up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
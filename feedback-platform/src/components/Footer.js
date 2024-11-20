import React from 'react';

const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-10 py-4 border-t border-solid border-[#f0f2f5]">
      <div className="text-sm text-[#111418]">
        <p>Email: support@engage.com | Phone: +123-456-7890</p>
      </div>
      <div className="flex gap-4">
        <a href="#" className="text-[#111418] text-sm">Privacy Policy</a>
        <a href="#" className="text-[#111418] text-sm">Terms of Use</a>
        <a href="#" className="text-[#111418] text-sm">FAQ</a>
      </div>
      <div className="flex gap-3">
        <a href="#" className="text-[#111418]">Facebook</a>
        <a href="#" className="text-[#111418]">Twitter</a>
        <a href="#" className="text-[#111418]">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;

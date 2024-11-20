import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';  // Correct way to import icons


const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] border-t border-solid border-[#e0e0e0] py-6">
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Contact Info */}
          <div className="text-center md:text-left mb-4 md:mb-0 text-sm text-[#333]">
            <p>Email: <a href="mailto:support@engage.com" className="font-semibold text-[#0b6fda]">support@engage.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="font-semibold text-[#0b6fda]">+123-456-7890</a></p>
          </div>

          {/* Privacy, Terms, FAQ Links */}
          <div className="flex flex-col md:flex-row gap-4 text-center md:text-left mb-4 md:mb-0">
            <a href="#" className="text-[#333] text-sm hover:text-[#0b6fda] transition duration-300">Privacy Policy</a>
            <a href="#" className="text-[#333] text-sm hover:text-[#0b6fda] transition duration-300">Terms of Use</a>
            <a href="#" className="text-[#333] text-sm hover:text-[#0b6fda] transition duration-300">FAQ</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 justify-center md:justify-start">
            <a href="#" className="text-[#333] text-2xl hover:text-[#0b6fda] transition duration-300">
              <FaFacebook />
            </a>
            <a href="#" className="text-[#333] text-2xl hover:text-[#0b6fda] transition duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-[#333] text-2xl hover:text-[#0b6fda] transition duration-300">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Footer bottom text */}
        <div className="text-center text-sm text-[#aaa] mt-4">
          <p>&copy; 2024 Engage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

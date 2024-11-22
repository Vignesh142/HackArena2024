// import React from 'react';
// import { useNavigate } from 'react-router-dom'; // For navigation
// import faq1 from '../assets/faq-1.png'; // Replace with your image path

// const FAQCard = () => {
//   const navigate = useNavigate(); // Navigation hook

//   // Function to handle redirection
//   const handleCardClick = () => {
//     navigate('/faq-details'); // Replace with your desired route
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 px-4">
//       <div
//         onClick={handleCardClick}
//         className="flex flex-col items-center gap-4 p-6 max-w-[300px] border-2 border-indigo-300 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
//       >
//         {/* FAQ Image */}
//         <img
//           src={faq1}
//           alt="FAQ Example"
//           className="w-full h-48 rounded-md object-cover"
//         />
//         {/* FAQ Title */}
//         <h3 className="text-xl font-semibold text-indigo-800 text-center">
//           What can I do on your platform?
//         </h3>
//         {/* Description */}
//         <p className="text-sm text-gray-600 text-center">
//           Discover the features and tools available to enhance your experience on our platform.
//         </p>
//         {/* Button */}
//         <button className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
//           Learn More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FAQCard;

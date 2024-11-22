import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header'; // Adjust the path based on your folder structure.

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState(null); // Track the selected category
  const [searchQuery, setSearchQuery] = useState(''); // Track the search input
  const [faqs, setFaqs] = useState([]); // Store the FAQs fetched from backend
  const [filteredFaqs, setFilteredFaqs] = useState([]); // Store filtered FAQs based on search and category
  const [error, setError] = useState(null); // Handle errors

  // Define the new categories array
  const categories = [
    "Technical Issues & Troubleshooting",
    "Maintenance & Servicing",
    "Vehicle Features & Upgrades",
    "Financial & Insurance Services",
    "Sales & Post-Purchase Services",
    "Environmental & Safety Concerns",
    "Miscellaneous"
  ];

  // Simulate detailed data for each category
  const categoryContent = {
    "Technical Issues & Troubleshooting": [
      "How to fix engine overheating? - Check coolant levels, ensure radiator is clean, and inspect thermostat.",
      "What should I do if my car doesn't start? - Inspect the battery, alternator, and starter motor.",
      "How do I troubleshoot electrical issues? - Check the fuse box and ensure all connections are tight.",
      "My vehicle is making a strange noise, what could it be? - It could be related to the engine, exhaust, or suspension. A mechanic should inspect it.",
      "Steps to solve transmission issues: - Check fluid levels, look for leaks, and visit a mechanic for a diagnostic check."
    ],
    "Maintenance & Servicing": [
      "How often should I change the oil? - Typically every 3,000 to 5,000 miles depending on the car model.",
      "When is the right time to replace the brake pads? - Generally after 25,000 to 70,000 miles, depending on driving habits.",
      "How do I check the tire pressure? - Use a tire pressure gauge to check the pressure when the tires are cold.",
      "When should I replace the battery? - Replace the battery every 3 to 5 years or when it shows signs of weakness.",
      "How to clean the air filters? - Remove the filter, shake out any loose dirt, and use compressed air to clean it thoroughly."
    ],
    "Vehicle Features & Upgrades": [
      "How do I upgrade my vehicle's stereo system? - Replace the head unit, speakers, and amplifier for enhanced sound.",
      "What are the latest safety features available? - Blind-spot detection, adaptive cruise control, lane-keeping assist, and automatic emergency braking.",
      "How can I add GPS navigation to my car? - You can install an aftermarket GPS unit or connect your smartphone with carplay.",
      "What is the process to upgrade my car’s infotainment system? - Visit a dealer or buy compatible aftermarket parts.",
      "Can I add advanced driver-assistance systems (ADAS)? - Some ADAS systems can be retrofitted into older vehicles, but professional installation is required."
    ],
    "Financial & Insurance Services": [
      "How do I apply for vehicle insurance? - You can apply online through insurance companies or visit an insurance agent.",
      "What factors influence car insurance premiums? - Driving record, age, type of car, location, and coverage levels.",
      "How to claim insurance for vehicle damages? - Contact your insurance company, file a claim, and provide necessary documentation.",
      "Can I finance my car purchase? - Yes, most dealers offer financing options or you can get a loan from a bank.",
      "What types of warranties are available for my car? - New car warranty, extended warranty, and powertrain warranty are common."
    ],
    "Sales & Post-Purchase Services": [
      "How do I request a test drive? - Contact your local dealership to schedule a test drive based on availability.",
      "Can I return a vehicle after purchase? - Some dealerships offer a return period, but it's important to check the terms and conditions.",
      "What is the warranty period after purchase? - Most cars come with a 3-5 year warranty, but this varies by manufacturer.",
      "How to schedule an appointment for post-purchase service? - Contact your dealer or use the manufacturer’s service portal.",
      "How do I transfer vehicle ownership? - Visit your local DMV with the necessary paperwork to transfer ownership."
    ],
    "Environmental & Safety Concerns": [
      "What are the environmental impacts of electric vehicles? - Electric vehicles have lower emissions, reducing greenhouse gases and air pollution.",
      "How can I reduce my car’s carbon footprint? - Drive efficiently, keep your car well-maintained, and consider an electric or hybrid vehicle.",
      "How do I dispose of car batteries safely? - Take used batteries to a recycling facility or a car parts store that accepts them.",
      "What are the safety standards for child seats? - Ensure the seat meets federal safety standards and is properly installed in your car.",
      "How to check if my vehicle meets emission standards? - Check the emissions label or have your vehicle tested at an authorized facility."
    ],
    "Miscellaneous": [
      "How do I contact customer support? - You can contact customer support via phone, email, or live chat on our website.",
      "What are the operating hours of the service center? - Service centers are typically open Monday to Saturday from 9 AM to 6 PM.",
      "Where can I find the nearest dealership? - Use our website’s dealership locator tool or contact customer support.",
      "How can I provide feedback on my vehicle? - We welcome feedback through our website’s contact form or by visiting a local dealership.",
      "How do I sign up for vehicle recalls? - You can sign up for recall notifications via the manufacturer’s website or contact customer service."
    ]
  };

  // Fetch FAQs from the backend (simulate for now)
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/getfaq'); // Replace with your backend URL
        console.log(response); // Log to check the response data
        setFaqs(response.data); // Store the fetched FAQs
        setFilteredFaqs(response.data); // Initially show all FAQs
      } catch (error) {
        setError('Error fetching FAQs. Please try again later.');
        console.error('Error fetching FAQs:', error);
      }
    };

    fetchFaqs();
  }, []);

  // Filter FAQs based on search query and category
  useEffect(() => {
    const filterFaqs = () => {
      let filtered = faqs;

      // Filter based on search query
      if (searchQuery.trim()) {
        filtered = filtered.filter((faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter by active category if it's set
      if (activeCategory) {
        filtered = filtered.filter((faq) => faq.category === activeCategory);
      }

      setFilteredFaqs(filtered); // Update the filtered FAQs
    };

    filterFaqs(); // Re-filter when searchQuery or activeCategory changes
  }, [searchQuery, activeCategory, faqs]);

  // Toggle category selection
  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Lexend, Noto Sans, sans-serif' }}>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto p-6 flex gap-6">
        {/* Sidebar - Category Filter */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">FAQ Categories</h2>
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-4 py-2 rounded-lg text-left w-full text-sm font-medium transition ${
                  activeCategory === category
                    ? 'bg-blue-100 text-blue-600 shadow-md'
                    : 'bg-gray-100 text-gray-800 hover:bg-blue-50 hover:shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Render content for the selected category */}
          {activeCategory && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{activeCategory}</h3>
              <ul className="list-disc pl-6 text-gray-600">
                {categoryContent[activeCategory].map((item, index) => (
                  <li key={index} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* FAQ Content (Middle and Right parts stay unchanged) */}
        <div className="flex-1 flex flex-col bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Error Handling */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Display filtered FAQs */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold text-gray-800">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Announcements */}
        {/* Right Panel - Announcements */}
<div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
  <h2 className="text-lg font-bold text-gray-800 mb-4">Announcements</h2>
  <p className="text-gray-600 mb-4">
    Stay updated with the latest updates, feature releases, and important information related to our platform and FAQs.
  </p>
  
  <ul className="mt-4 space-y-6">
    {/* Announcement 1 */}
    <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition">
      <h4 className="font-medium text-gray-800">New FAQ Categories Added</h4>
      <p className="text-sm text-gray-600">
        We have recently added new FAQ categories to help you find answers faster. Check out the updated FAQ sections:
        <ul className="list-disc pl-6">
          <li>Technical Issues & Troubleshooting</li>
          <li>Maintenance & Servicing</li>
          <li>Vehicle Features & Upgrades</li>
          <li>Financial & Insurance Services</li>
          <li>Sales & Post-Purchase Services</li>
          <li>Environmental & Safety Concerns</li>
          <li>Miscellaneous</li>
        </ul>
      </p>
    </li>
    
    {/* Announcement 2 */}
    <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition">
      <h4 className="font-medium text-gray-800">Upcoming Maintenance Schedule</h4>
      <p className="text-sm text-gray-600">
        We have scheduled routine maintenance for the platform on Sunday, 12:00 AM to 2:00 AM. During this time, our 
        services may experience brief downtimes. Please plan accordingly.
      </p>
    </li>
    
    {/* Announcement 3 */}
    <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition">
      <h4 className="font-medium text-gray-800">Popular FAQ: Troubleshooting Vehicle Starting Issues</h4>
      <p className="text-sm text-gray-600">
        A common question we've received: "What should I do if my vehicle won't start?" Here are a few troubleshooting tips:
        <ul className="list-disc pl-6">
          <li>Check the battery connections and ensure the terminals are clean and secure.</li>
          <li>Make sure there is enough fuel in the tank.</li>
          <li>Check if the fuses are working, especially those related to the starting system.</li>
          <li>If you're still having issues, visit your nearest service center for assistance.</li>
        </ul>
      </p>
    </li>

    {/* Announcement 4 */}
    <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition">
      <h4 className="font-medium text-gray-800">Insurance and Financing FAQ Update</h4>
      <p className="text-sm text-gray-600">
        We've updated our FAQ section regarding Financial & Insurance Services. Find answers to the most common questions:
        <ul className="list-disc pl-6">
          <li>How to apply for vehicle insurance?</li>
          <li>What factors affect my car insurance premium?</li>
          <li>How to finance your car purchase?</li>
          <li>What warranty options are available after purchasing a vehicle?</li>
        </ul>
      </p>
    </li>
    
    {/* Announcement 5 */}
    <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition">
      <h4 className="font-medium text-gray-800">Environmental Impact of Electric Vehicles</h4>
      <p className="text-sm text-gray-600">
        Our Environmental & Safety Concerns FAQ now includes a detailed section on the environmental benefits of electric 
        vehicles. Learn more about how EVs are reducing carbon footprints and contributing to a cleaner, greener future.
      </p>
    </li>
    
    {/* Announcement 6 */}
    <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition">
      <h4 className="font-medium text-gray-800">New FAQ Feature: Search and Filter</h4>
      <p className="text-sm text-gray-600">
        We've introduced a new FAQ search and filter feature to help you find answers quickly. You can now search by keywords 
        and filter FAQs by category. Explore the new feature to get the answers you need more efficiently.
      </p>
    </li>

    {/* Announcement 7 */}
    <li className="p-4 bg-blue-50 rounded-lg shadow-sm hover:bg-blue-100 transition">
      <h4 className="font-medium text-gray-800">Scheduled System Downtime for Update</h4>
      <p className="text-sm text-gray-600">
        Please be aware that our systems will undergo a scheduled update on Friday, 11:00 PM to 2:00 AM. During this 
        time, some FAQ content may not be available. We apologize for any inconvenience this may cause.
      </p>
    </li>
  </ul>
</div>

      </div>
    </div>
  );
};

export default FaqPage;

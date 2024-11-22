import React, { useState } from "react";
import CDashboard from "../clientComponents/ClientDashboard";
import CTickets from "../clientComponents/ClientTickets";
import CFeedBack from "../clientComponents/ClientFeedBack";

const ClientHomePage = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard"); // Default active component

  const menuItems = [
    { name: "Dashboard", id: "Dashboard", icon: "📊" },
    { name: "Tickets", id: "Tickets", icon: "🎫" },
    { name: "FeedBack", id: "FeedBack", icon: "💬" },
  ];

  // Components to render based on selection
  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <CDashboard />;
      case "Tickets":
        return <CTickets />;
      case "FeedBack":
        return <CFeedBack />;
      default:
        return <CDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Navigation */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6 flex flex-col justify-between">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold mb-8 tracking-wide">Engage</h2>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`mb-3 flex items-center gap-3 p-3 cursor-pointer rounded transition-all duration-300 ${
                  activeComponent === item.name
                    ? "bg-blue-700 shadow-lg scale-105"
                    : "hover:bg-blue-500"
                }`}
                onClick={() => setActiveComponent(item.name)}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-300">
          <p>&copy; 2024 Engage Inc.</p>
          <p>All rights reserved.</p>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {activeComponent}
          </h1>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
            Profile
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default ClientHomePage;

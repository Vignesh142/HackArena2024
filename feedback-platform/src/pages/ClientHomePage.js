import React, { useState } from 'react';
import CDashboard from '../clientComponents/ClientDashboard';
import CTickets from '../clientComponents/ClientTickets';
import CFeedBack from '../clientComponents/ClientFeedBack';

const ClientHomePage = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard'); // Default active component

  const menuItems = [
    { name: 'Dashboard', id: 'Dashboard' },
    { name: 'Tickets', id: 'Tickets' },
    // { name: 'FeedBack', id: 'FeedBack' },
  ];

  // Components to render based on selection
  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <CDashboard />;
      case 'Tickets':
        return <CTickets />;
      // case 'FeedBack':
      //   return <CFeedBack />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Navigation */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-xl font-bold mb-4">Engage</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`mb-3 p-2 cursor-pointer rounded ${
                activeComponent === item.name ? 'bg-blue-700' : 'hover:bg-blue-500'
              }`}
              onClick={() => setActiveComponent(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ClientHomePage;

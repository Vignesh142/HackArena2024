import React, { useState } from 'react';

// Utility function to format date in dd-mm-yyyy format
const formatDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, '0');
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const year = newDate.getFullYear();
  return `${day}-${month}-${year}`;
};

const TicketPage = () => {
  // Sample data for tickets
  const initialTickets = [
    { id: 1, name: "Login Issue", type: "Technical", raisedBy: "user1@example.com", raisedDate: "2024-11-15", status: "Open" },
    { id: 2, name: "Account Billing", type: "Financial", raisedBy: "user2@example.com", raisedDate: "2024-11-14", status: "Close" },
    { id: 3, name: "Feature Request", type: "General", raisedBy: "user3@example.com", raisedDate: "2024-11-13", status: "In Progress" },
    { id: 4, name: "Bug Report", type: "Technical", raisedBy: "user4@example.com", raisedDate: "2024-11-12", status: "Open" },
  ];

  const [tickets, setTickets] = useState(initialTickets);
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Filter tickets based on search inputs
  const filteredTickets = tickets.filter((ticket) => {
    const matchesType = searchType ? ticket.type.toLowerCase().includes(searchType.toLowerCase()) : true;
    const matchesStatus = searchStatus ? ticket.status.toLowerCase().includes(searchStatus.toLowerCase()) : true;
    const matchesDate = searchDate ? ticket.raisedDate.includes(searchDate) : true;
    return matchesType && matchesStatus && matchesDate;
  });

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Ticket Queries</h1>

      {/* Search Inputs */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Search by Type */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by type..."
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          />
        </div>

        {/* Search by Status */}
        <div className="flex-1">
          <select
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
          >
            <option value="">Filter by status...</option>
            <option value="Open">Open</option>
            <option value="Close">Close</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>

        {/* Search by Date */}
        <div className="flex-1">
          <input
            type="date"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
      </div>

      {/* Table Structure */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Raised By (Email)</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Raised Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition"
                >
                  <td className="border border-gray-300 px-4 py-2">{ticket.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{ticket.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{ticket.raisedBy}</td>
                  <td className="border border-gray-300 px-4 py-2">{formatDate(ticket.raisedDate)}</td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      ticket.status === "Open"
                        ? "text-green-600"
                        : ticket.status === "Close"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}
                  >
                    {ticket.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border border-gray-300 px-4 py-2 text-center">
                  No matching tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketPage;

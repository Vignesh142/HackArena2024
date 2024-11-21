import React, { useState } from "react";

// Utility function to format date in dd-mm-yyyy format
const formatDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
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
  const [selectedTicket, setSelectedTicket] = useState(null); // Store selected ticket for popup
  const [answer, setAnswer] = useState(""); // Store answer for the ticket

  // Search states
  const [searchDate, setSearchDate] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  // Handle ticket answer submission
  const handleSubmitAnswer = () => {
    if (answer.trim()) {
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === selectedTicket.id ? { ...ticket, status: "Close" } : ticket
        )
      );
      setSelectedTicket(null); // Close the modal
      setAnswer(""); // Reset answer input
    }
  };

  // Filter tickets based on search criteria
  const filteredTickets = tickets.filter((ticket) => {
    const dateMatch = searchDate ? formatDate(ticket.raisedDate).includes(searchDate) : true;
    const typeMatch = searchType ? ticket.type.toLowerCase().includes(searchType.toLowerCase()) : true;
    const statusMatch = searchStatus ? ticket.status.toLowerCase().includes(searchStatus.toLowerCase()) : true;
    return dateMatch && typeMatch && statusMatch;
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-xl font-bold mb-4">Client Navigation</h2>
        <ul>
          <li className="mb-3 p-2 cursor-pointer rounded hover:bg-blue-500">Dashboard</li>
          <li className="mb-3 p-2 cursor-pointer rounded bg-blue-700">Tickets</li>
          <li className="mb-3 p-2 cursor-pointer rounded hover:bg-blue-500">Settings</li>
          <li className="mb-3 p-2 cursor-pointer rounded hover:bg-blue-500">Support</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 relative">
        <h1 className="text-2xl font-bold mb-6">Ticket Queries</h1>

        {/* Search Filters */}
        <div className="mb-6 flex gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-semibold">Date (dd-mm-yyyy)</label>
            <input
              id="date"
              type="text"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Search by Date"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-semibold">Type</label>
            <input
              id="type"
              type="text"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Search by Type"
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-semibold">Status</label>
            <input
              id="status"
              type="text"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
              className="p-2 border rounded w-full"
              placeholder="Search by Status"
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
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 cursor-pointer transition"
                  onClick={() => setSelectedTicket(ticket)} // Open modal with selected ticket
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Popup */}
        {selectedTicket && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-1/3">
              <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
              <p className="mb-2">
                <strong>Type:</strong> {selectedTicket.type}
              </p>
              <p className="mb-4">
                <strong>Question:</strong> {selectedTicket.name}
              </p>
              <textarea
                className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
                rows="4"
                placeholder="Enter your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              ></textarea>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  onClick={() => setSelectedTicket(null)} // Close the modal
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 text-white rounded ${
                    answer.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketPage;

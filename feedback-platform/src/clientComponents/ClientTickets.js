import React, { useState, useEffect } from "react";

// Utility function to format date in dd-mm-yyyy format
const formatDate = (date) => {
  const newDate = new Date(date);
  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = newDate.getFullYear();
  return `${day}-${month}-${year}`;
};

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // Store selected ticket for popup
  const [answer, setAnswer] = useState(""); // Store answer for the ticket

  // Search states
  const [searchCategory, setSearchCategory] = useState(""); // State for category search

  // Fetch tickets from API
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/getqueries");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTickets();
  }, []);

  // Handle ticket answer submission
  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert("Answer cannot be empty.");
      return;
    }

    try {
      // Prepare the payload
      const payload = {
        id: selectedTicket.ID, // Use the correct property for ID
        answer: answer.trim(),
      };

      // Send POST request to the backend
      const response = await fetch("http://localhost:8000/api/updateanswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the ticket locally after successful update
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.ID === selectedTicket.ID
            ? { ...ticket, Answer: answer, Status: "Closed" }
            : ticket
        )
      );

      // Reset states and close modal
      setSelectedTicket(null);
      setAnswer("");

      alert("Answer submitted successfully!");
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit the answer. Please try again.");
    }
  };

  // Filter tickets based on category search
  const filteredTickets = tickets
    .filter((ticket) => {
      const categoryMatch = searchCategory
        ? ticket.Category.toLowerCase().includes(searchCategory.toLowerCase())
        : true;
      return categoryMatch;
    })
    .sort((a, b) => formatDate(a.raisedDate) - formatDate(b.raisedDate)); // Sorting by date

  return (
    <div className="flex h-screen">
      {/* Main Content (no sidebar) */}
      <div className="flex-1 p-6 bg-gray-100 relative">
        <h1 className="text-2xl font-bold mb-6">Ticket Queries</h1>

        {/* Search Filters (Category only) */}
        <div className="mb-6 flex gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-semibold">
              Category
            </label>
            <input
              id="category"
              type="text"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)} // Handle category input
              className="p-2 border rounded w-full"
              placeholder="Search by Category"
            />
          </div>
        </div>

        {/* Table Structure */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Username
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Mobile Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 cursor-pointer transition"
                  onClick={() => setSelectedTicket(ticket)} // Open modal with selected ticket
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {ticket.Category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {ticket.Username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {ticket["Mobile Number"]}
                  </td>
                  <td
                    className={`border border-gray-300 px-4 py-2 font-semibold ${
                      !ticket.Answer ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {ticket.Answer ? "Closed" : "Open"}
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
                <strong>Query:</strong> {selectedTicket.Query}
              </p>
              <p className="mb-4">
                <strong>Summary:</strong> {selectedTicket.Summary}
              </p>
              <p className="mb-4">
                <strong>Username:</strong> {selectedTicket.Username}
              </p>

              {/* Conditional rendering based on Answer status */}
              {!selectedTicket.Answer ? (
                // Open ticket: Show text field for answering
                <>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Write your answer here..."
                    rows="4"
                    className="w-full p-2 border rounded mb-4"
                  />
                  <button
                    onClick={handleSubmitAnswer}
                    className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                  >
                    Submit Answer
                  </button>
                </>
              ) : (
                // Closed ticket: Show existing answer and allow editing
                <>
                  <p className="mb-4">
                    <strong>Answer:</strong> {selectedTicket.Answer}
                  </p>
                  <textarea
                    value={answer || selectedTicket.Answer} // Populate existing answer
                    onChange={(e) => setAnswer(e.target.value)}
                    rows="4"
                    className="w-full p-2 border rounded mb-4"
                  />
                  <button
                    onClick={handleSubmitAnswer}
                    className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
                  >
                    Update Answer
                  </button>
                </>
              )}

              {/* Close Modal Button */}
              <button
                onClick={() => setSelectedTicket(null)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketPage;

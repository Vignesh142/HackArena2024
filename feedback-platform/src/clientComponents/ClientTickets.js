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
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [answer, setAnswer] = useState("");

  // Search states
  const [searchCategory, setSearchCategory] = useState("");

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

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert("Answer cannot be empty.");
      return;
    }

    try {
      const payload = {
        id: selectedTicket.ID,
        answer: answer.trim(),
      };

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

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.ID === selectedTicket.ID
            ? { ...ticket, Answer: answer, Status: "Closed" }
            : ticket
        )
      );

      setSelectedTicket(null);
      setAnswer("");

      alert("Answer submitted successfully!");
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit the answer. Please try again.");
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const categoryMatch = searchCategory
      ? ticket.Category.toLowerCase().includes(searchCategory.toLowerCase())
      : true;
    return categoryMatch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
        <h1 className="text-3xl font-bold">Ticket Queries</h1>
        <p className="text-sm mt-2">Manage and resolve customer queries efficiently</p>
      </header>

      <main className="flex-1 p-6">
        {/* Search Filters */}
        <div className="mb-6">
          <input
            type="text"
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            placeholder="Search by category..."
            className="w-full max-w-md p-2 border rounded shadow focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white rounded shadow">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Category</th>
                <th className="p-4">Username</th>
                <th className="p-4">Mobile Number</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-100 transition cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <td className="p-4">{ticket.Category}</td>
                  <td className="p-4">{ticket.Username}</td>
                  <td className="p-4">{ticket["Mobile Number"]}</td>
                  <td
                    className={`p-4 font-semibold ${
                      ticket.Answer ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {ticket.Answer ? "Closed" : "Open"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform scale-100 transition duration-300">
            <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
            <p className="mb-2">
              <strong>Query:</strong> {selectedTicket.Query}
            </p>
            <p className="mb-2">
              <strong>Summary:</strong> {selectedTicket.Summary}
            </p>
            <p className="mb-2">
              <strong>Username:</strong> {selectedTicket.Username}
            </p>

            {!selectedTicket.Answer ? (
              <>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write your answer..."
                  className="w-full p-2 border rounded mb-4"
                ></textarea>
                <button
                  onClick={handleSubmitAnswer}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Submit Answer
                </button>
              </>
            ) : (
              <>
                <p className="mb-4">
                  <strong>Answer:</strong> {selectedTicket.Answer}
                </p>
                <textarea
                  value={answer || selectedTicket.Answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                ></textarea>
                <button
                  onClick={handleSubmitAnswer}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Update Answer
                </button>
              </>
            )}

            <button
              onClick={() => setSelectedTicket(null)}
              className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketPage;

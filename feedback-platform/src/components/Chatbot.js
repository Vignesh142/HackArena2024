import React, { useState } from "react";
import { FiMessageCircle, FiSend, FiMic, FiPaperclip, FiX } from "react-icons/fi";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (input.trim()) {
      // Add user message to the chat
      const userMessage = { type: "user", text: input };
      setMessages([...messages, userMessage]);
      setInput("");

      // Set loading state
      setIsLoading(true);

      try {
        // Send the user message to the backend API
        const response = await axios.post("http://127.0.0.1:8000/api/chat", {
          user_prompt: input,
        });

        // Add the bot response to the chat
        const botMessage = { type: "bot", text: response.data.response };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error fetching response:", error);
        const errorMessage = {
          type: "bot",
          text: "Oops! Something went wrong. Please try again later.",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg flex items-center justify-center text-white text-xl hover:scale-105 transition-transform"
        onClick={toggleChatbot}
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[60%] bg-white shadow-xl rounded-lg flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <h2 className="text-lg font-semibold">Chatbot</h2>
            <button onClick={toggleChatbot}>
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg text-sm shadow ${
                    msg.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-lg text-sm shadow bg-gray-200 text-gray-800">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="flex items-center gap-2 p-4 border-t bg-white">
            <button className="text-gray-500 hover:text-blue-500">
              <FiPaperclip />
            </button>
            <button className="text-gray-500 hover:text-blue-500">
              <FiMic />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              disabled={isLoading}
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;

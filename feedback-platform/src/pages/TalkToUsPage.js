import React, { useState } from 'react';
import Header from '../components/Header'; // Import your existing Header component

const TalkToUsPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [chat, setChat] = useState([]); // To hold both user and bot messages
  const [isProcessing, setIsProcessing] = useState(false); // To show when bot is processing the input

  // Function to simulate voice recording start/stop
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate the recording process for demo purposes
    if (!isRecording) {
      setTranscript('');
      setChat((prevChat) => [
        ...prevChat,
        { speaker: 'user', message: 'This is a simulated voice input!' },
      ]);
      setTimeout(() => handleBotResponse('This is the bot’s response!'), 1500); // Simulate bot's reply
    }
  };

  // Function to simulate bot's response after processing the user's input
  const handleBotResponse = (message) => {
    setIsProcessing(false);
    setChat((prevChat) => [
      ...prevChat,
      { speaker: 'bot', message },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f0f9ff] to-[#c4e0f3]">
      {/* Header */}
      <Header />

      <div className="flex-1 flex justify-center items-center py-5 px-4">
        <div className="w-full max-w-3xl flex flex-col items-center">
          {/* Main Heading */}
          <h1 className="text-4xl font-bold text-[#111418] text-center py-6">
            Talk to Us!
          </h1>

          {/* Sub Heading */}
          <p className="text-base font-normal text-[#111418] text-center pb-3">
            Ask a question or give feedback
          </p>

          {/* Voice Interaction Panel */}
          <div className="flex flex-col items-center w-full">
            {/* Record Button */}
            <button
              className={`w-20 h-20 flex items-center justify-center rounded-full text-white text-2xl font-bold transition-all duration-200 ease-in-out transform hover:scale-105 ${
                isRecording ? 'bg-red-500' : 'bg-[#1980e6]'
              }`}
              onClick={toggleRecording}
            >
              {/* Change to a more appealing microphone icon */}
              {isRecording ? (
                <span className="font-bold">●</span> // Red circle indicating recording
              ) : (
                <i className="fa fa-microphone-alt text-3xl"></i> // Microphone icon when idle
              )}
            </button>

            {/* Real-time Transcript */}
            <div className="mt-6 w-full max-w-md space-y-4 text-center">
              <div className="w-full flex flex-col space-y-2">
                {chat.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.speaker === 'user' ? 'justify-start' : 'justify-end'} p-2`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.speaker === 'user'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {message.message}
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-end p-2">
                    <div className="max-w-xs px-4 py-2 rounded-lg bg-gray-200 text-gray-800">
                      Bot is typing...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalkToUsPage;

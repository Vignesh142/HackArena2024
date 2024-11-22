import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing all page components
import HomePage from "./pages/HomePage"; // Customer Home Page Component
import FaqPage from "./pages/FaqPage"; // FAQ Page Component
import SubmitTicket from "./pages/TicketSubmition"; // Ticket Submission Page Component
import AuthPage from "./pages/AuthPage"; // Authentication Page Component
import LoginPage from "./pages/LoginPage"; // Login Page Component
import ClientHomePage from "./pages/ClientHomePage"; // Client Home Page Component
import FormPage from "./components/FormPage";
import TalkToUsPage from "./pages/TalkToUsPage";


// Importing reusable components
import Header from "./components/Header"; // Reusable Header Component
import Chatbot from "./components/Chatbot"; // Floating Chatbot Component

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Global Header - Uncomment this line to use the header across all pages */}
        {/* <Header /> */}

        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          <Routes>
            {/* Define application routes */}
            <Route path="/" element={<AuthPage />} /> {/* Authentication Page */}
            <Route path="/customer-home" element={<HomePage />} /> {/* Customer Home Page */}
            <Route path="/client-home" element={<ClientHomePage />} /> {/* Client Home Page */}
            <Route path="/faq" element={<FaqPage />} /> {/* FAQ Page */}
            <Route path="/ticket-form" element={<SubmitTicket />} /> {/* Ticket Submission Page */}
            <Route path="/login" element={<LoginPage />} /> {/* Login Page */}
            <Route path="/chatbot" element={<Chatbot />} />  {/* Full chatbot UI route */}
            <Route path="/form" element={<FormPage />} />
            <Route path="/talkto-us" element={<TalkToUsPage />} />
          </Routes>
        </div>

        {/* Floating Chatbot Component */}
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;

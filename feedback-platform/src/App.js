import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Home Page Component
import FaqPage from './pages/FaqPage'; // FAQ Page Component
import SubmitTicket from './pages/TicketSubmition'; // Ticket Submission Page Component
import LoginPage from './pages/LoginPage'; // Login Page Component
import Header from './components/Header'; // Reusable Header Component

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">

        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          <Routes>
            {/* Route for Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Route for FAQ Page */}
            <Route path="/faq" element={<FaqPage />} />

            {/* Route for Ticket Submission Page */}
            <Route path="/ticket-form" element={<SubmitTicket />} />

            {/* Route for Login Page */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

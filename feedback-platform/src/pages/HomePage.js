import React from 'react';
import Header from '../components/Header';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SubmitTicket from '../components/SubmitTicket';

const HomePage = () => {
  return (
    <div id="home" className="bg-gray-50">
      <div
        className="relative flex min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
        style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
      >
        <div className="layout-container flex h-full flex-col">
          {/* Header */}
          <Header />

          <main className="flex-grow">
            {/* Hero Section */}
            <Hero />

            {/* Features Section */}
            <FeaturesSection />

            {/* Submit Ticket Section */}
            <SubmitTicket />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

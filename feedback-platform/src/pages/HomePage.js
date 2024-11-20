import React from 'react';
import Header from '../components/Header';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import HeroImage from '../assets/hero-image.png'; // Make sure the path is correct
import Solutions from '../components/Solutions';
import FAQs from '../components/FAQs';
import SubmitTicket from '../components/SubmitTicket';
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full flex-col gap-"> {/* Added gap between sections */}

        {/* Header */}
        <Header />

        <main className="flex-grow">

          {/* Hero Section */}
          <Hero />

          {/* Features Section */}
          <FeaturesSection />

          {/* Additional Sections */}
          <Solutions />
          <SubmitTicket />

          <FAQs />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;

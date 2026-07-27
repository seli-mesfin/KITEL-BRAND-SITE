import React from 'react';

// Layout & Sections
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import HeroSection from './components/Sections/HeroSection';
import AboutSection from './components/Sections/AboutSection';
import ServicesSection from './components/Sections/ServicesSection';
import PortfolioSection from './components/Sections/PortfolioSection';
import WhyKitelSection from './components/Sections/WhyKitelSection';
import ContactSection from './components/Sections/ContactSection';

// Chatbot
import AIChatbot from './components/Chat/AIChatbot';

function App() {
  return (
    <>
      <Navigation />

      <main className="main-content">
        {/* Tier 1: Hero + Tier 2: Features + Tier 3: Pro Banner */}
        <HeroSection />

        {/* Content Sections */}
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
        <WhyKitelSection />
        <ContactSection />
        <Footer />
      </main>

      {/* Global Components */}
      <AIChatbot />
    </>
  );
}

export default App;
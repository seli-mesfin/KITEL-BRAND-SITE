import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';

// Hooks
import useScrollProgress from './hooks/useScrollProgress';
import useMouseParallax from './hooks/useMouseParallax';

// 3D Scene
import Scene from './components/Three/Scene';

// Layout & Sections
import Navigation from './components/Layout/Navigation';
import HeroSection from './components/Sections/HeroSection';
import AboutSection from './components/Sections/AboutSection';
import ServicesSection from './components/Sections/ServicesSection';
import MerchandiseShowroom from './components/Sections/MerchandiseShowroom';
import WhyKitelSection from './components/Sections/WhyKitelSection';
import ContactSection from './components/Sections/ContactSection';

// Chatbot
import AIChatbot from './components/Chat/AIChatbot';

function App() {
  const { progress } = useScrollProgress(8); // Increased to 8 to account for ServicesSection
  const mouse = useMouseParallax();
  const [activeService, setActiveService] = useState(null);

  return (
    <>
      <Navigation scrollProgress={progress} />

      {/* 3D Background Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#ffffff']} />
          <Scene 
            scrollProgress={progress} 
            mouse={mouse} 
            activeService={activeService}
          />
        </Canvas>
      </div>

      {/* Scrollable HTML Content Overlays */}
      <main className="html-overlay" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        
        {/* Add large gaps to allow the 3D transitions to play out between sections */}
        <div style={{ height: '40vh' }} />
        <AboutSection />
        
        <div style={{ height: '40vh' }} />
        <ServicesSection onServiceHover={setActiveService} />
        
        <div style={{ height: '40vh' }} />
        <WhyKitelSection />
        
        <div style={{ height: '40vh' }} />
        <ContactSection />
      </main>

      {/* Global Components */}
      <AIChatbot />
    </>
  );
}

export default App;
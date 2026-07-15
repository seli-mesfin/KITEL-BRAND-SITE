import React, { useEffect, useState } from 'react';
import useInView from '../../hooks/useInView';

export default function HeroSection() {
  const { ref, isInView } = useInView({ threshold: 0.2, once: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section ref={ref} className="section html-overlay" style={{ height: '100vh', padding: 0 }}>
      <div 
        className="section-inner" 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          textAlign: 'center',
          height: '100%',
          padding: '0 20px'
        }}
      >
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <h1 
            className={`hero-title ${mounted ? 'animate-fade-in-up' : ''}`}
            style={{ 
              animationName: mounted ? 'fadeInUp' : 'none',
              animationDuration: '1.2s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'both',
              marginBottom: '1rem',
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)'
            }}
          >
            Growing Digital Futures
          </h1>
          
          <p 
            className={`hero-tagline delay-2 ${mounted ? 'animate-fade-in-up' : ''}`} 
            style={{ 
              margin: '0 auto 1.5rem auto',
              letterSpacing: '0.15em'
            }}
          >
            Simply Connected
          </p>

          <p 
            className={`delay-3 ${mounted ? 'animate-fade-in-up' : ''}`} 
            style={{ 
              margin: '0 auto 3rem auto',
              fontSize: '1.1rem',
              color: 'var(--kitel-text-muted)',
              maxWidth: '550px'
            }}
          >
            Technology simplified. Systems integrated. Businesses empowered.
          </p>
          
          <div 
            className={`delay-4 ${mounted ? 'animate-fade-in-up' : ''}`} 
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <a href="#contact" className="btn-primary">
              <span>Start Your Project &rarr;</span>
            </a>
            <a href="#services" className="btn-secondary">
              Explore Our Work
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`delay-6 ${mounted ? 'animate-fade-in' : ''}`}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 0.5
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--kitel-text-muted)' }}>Scroll to Explore</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--kitel-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </section>
  );
}

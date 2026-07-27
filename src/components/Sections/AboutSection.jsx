import React from 'react';
import useInView from '../../hooks/useInView';

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="section">
      <div className="section-inner" ref={ref}>
        <div className="grid-2" style={{ alignItems: 'center', marginBottom: '4rem' }}>
          {/* Left column — Image */}
          <div className={`${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0 }}>
            <img 
              src="/about-bg.jpg" 
              alt="Kitel nature-powered technology workspace" 
              style={{ 
                width: '100%', 
                borderRadius: 'var(--radius-lg)', 
                boxShadow: '0 20px 60px rgba(67, 106, 50, 0.15)',
                objectFit: 'cover',
                maxHeight: '450px'
              }} 
            />
          </div>

          {/* Right column — Text */}
          <div>
            <div className={`section-label ${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0 }}>
              01 &mdash; About
            </div>
            
            <h2 className={`h2 ${isInView ? 'animate-fade-in-up delay-1' : ''}`} style={{ opacity: 0, marginBottom: '2rem' }}>
              Growing Digital Futures
            </h2>
            
            <div className={`${isInView ? 'animate-fade-in-up delay-2' : ''}`} style={{ opacity: 0 }}>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                The name <strong style={{ color: 'var(--kitel-primary)' }}>Kitel</strong>, derived from the Amharic word meaning "leaf", symbolizes growth, innovation, adaptability, and continuous evolution.
              </p>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                Just as leaves are essential for sustaining life and enabling growth, Kitel develops intelligent digital solutions that empower organizations to thrive in an increasingly connected world.
              </p>
              <p style={{ fontSize: '1.1rem' }}>
                We bridge the gap between businesses and technology, making digital transformation accessible, effective, and seamless.
              </p>
            </div>
          </div>
        </div>

        <div className={`grid-3 ${isInView ? 'animate-fade-in-up delay-3' : ''}`} style={{ opacity: 0 }}>
          {/* Brand Purpose Card */}
          <div className="glass-card" style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>
            <img 
              src="/purpose.jpg" 
              alt="Brand Purpose" 
              style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '1.75rem' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--kitel-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Brand Purpose
              </div>
              <h3 className="h3" style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Simplifying Operations</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--kitel-text-muted)', lineHeight: 1.6 }}>
                To bridge the gap between businesses and technology by creating intelligent digital solutions that simplify operations and unlock growth opportunities.
              </p>
            </div>
          </div>
          
          {/* Mission Card */}
          <div className="glass-card" style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>
            <img 
              src="/mission.jpg" 
              alt="Mission" 
              style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '1.75rem' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--kitel-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Mission
              </div>
              <h3 className="h3" style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Cutting-Edge Execution</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--kitel-text-muted)', lineHeight: 1.6 }}>
                To deliver cutting-edge digital solutions that combine creativity, technology, and strategy. We help businesses embrace digital transformation and achieve sustainable growth.
              </p>
            </div>
          </div>
          
          {/* Vision Card */}
          <div className="glass-card" style={{ overflow: 'hidden', padding: 0, display: 'flex', flexDirection: 'column' }}>
            <img 
              src="/vision.jpg" 
              alt="Vision" 
              style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '1.75rem' }}>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--kitel-primary)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Vision
              </div>
              <h3 className="h3" style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>Global Innovation</h3>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--kitel-text-muted)', lineHeight: 1.6 }}>
                To become a leading force in shaping the digital future of businesses by blending local identity with global innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


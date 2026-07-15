import React from 'react';
import useInView from '../../hooks/useInView';

export default function AboutSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="section html-overlay">
      <div className="section-inner" ref={ref}>
        <div style={{ maxWidth: '600px', marginBottom: '4rem' }}>
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

        <div className={`grid-3 ${isInView ? 'animate-fade-in-up delay-3' : ''}`} style={{ opacity: 0 }}>
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="h3 text-gradient" style={{ marginBottom: '1rem' }}>Brand Purpose</h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--kitel-text-primary)' }}>
              To bridge the gap between businesses and technology by creating intelligent digital solutions that simplify operations and unlock growth opportunities.
            </p>
          </div>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="h3 text-gradient" style={{ marginBottom: '1rem' }}>Mission</h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--kitel-text-primary)' }}>
              To deliver cutting-edge digital solutions that combine creativity, technology, and strategy. We help businesses embrace digital transformation and achieve sustainable growth.
            </p>
          </div>
          
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 className="h3 text-gradient" style={{ marginBottom: '1rem' }}>Vision</h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--kitel-text-primary)' }}>
              To become a leading force in shaping the digital future of businesses by blending local identity with global innovation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

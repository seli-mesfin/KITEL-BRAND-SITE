import React from 'react';
import useInView from '../../hooks/useInView';

export default function WhyKitelSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const values = [
    { title: "Reliability", icon: "◆", desc: "Systems that never let you down." },
    { title: "Expertise", icon: "◇", desc: "Deep knowledge across the technology stack." },
    { title: "Innovation", icon: "✦", desc: "Pushing boundaries with modern solutions." },
    { title: "Security", icon: "◈", desc: "Enterprise-grade protection built in." },
    { title: "Scalability", icon: "△", desc: "Architecture that grows with your business." },
    { title: "Partnership", icon: "○", desc: "Long-term collaboration, not just projects." }
  ];

  return (
    <section id="whykitel" className="section html-overlay">
      <div className="section-inner" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className={`section-label ${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0, justifyContent: 'center' }}>
            05 &mdash; Why Kitel
          </div>
          
          <h2 className={`h2 ${isInView ? 'animate-fade-in-up delay-1' : ''}`} style={{ opacity: 0 }}>
            Built for Growth
          </h2>
        </div>

        <div className="grid-3">
          {values.map((val, index) => (
            <div 
              key={index}
              className={`glass-card ${isInView ? `animate-fade-in-up delay-${Math.min(index + 2, 6)}` : ''}`}
              style={{ opacity: 0, textAlign: 'center', padding: '2rem 1.5rem' }}
            >
              <div style={{ 
                fontSize: '2rem', 
                color: 'var(--kitel-secondary)', 
                marginBottom: '1rem',
                textShadow: '0 0 20px var(--kitel-secondary-50)'
              }}>
                {val.icon}
              </div>
              <h3 className="h3" style={{ marginBottom: '1rem', color: 'var(--kitel-text-primary)' }}>
                {val.title}
              </h3>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

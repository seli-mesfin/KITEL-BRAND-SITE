import React from 'react';
import useInView from '../../hooks/useInView';

export default function PortfolioSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const projects = [
    {
      title: "Enterprise Resource Platform",
      description: "A custom ERP system streamlining operations and logistics for a regional distributor.",
      tags: ["React", "Node.js", "PostgreSQL"]
    },
    {
      title: "Smart Access Gateway",
      description: "Biometric and RFID-based access control system integrated with cloud monitoring.",
      tags: ["IoT", "Cloud", "Security"]
    },
    {
      title: "E-Commerce Ecosystem",
      description: "High-performance full-stack commerce platform with unified inventory management.",
      tags: ["Next.js", "Stripe", "AWS"]
    },
    {
      title: "Government Digital Portal",
      description: "Secure public service platform designed for scale and stringent accessibility standards.",
      tags: ["Accessibility", "Scale", "Security"]
    }
  ];

  return (
    <section id="portfolio" className="section html-overlay">
      <div className="section-inner" ref={ref}>
        <div style={{ marginBottom: '4rem' }}>
          <div className={`section-label ${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0 }}>
            03 &mdash; Portfolio
          </div>
          
          <h2 className={`h2 ${isInView ? 'animate-fade-in-up delay-1' : ''}`} style={{ opacity: 0 }}>
            Selected Work
          </h2>
        </div>

        <div className="grid-2">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`glass-card ${isInView ? `animate-fade-in-up delay-${index + 2}` : ''}`}
              style={{ opacity: 0, padding: '2.5rem' }}
            >
              <div style={{ color: 'var(--kitel-primary-50)', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                0{index + 1}
              </div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>
                {project.title}
              </h3>
              <p style={{ marginBottom: '1.5rem' }}>
                {project.description}
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ 
                    fontSize: '0.75rem', 
                    padding: '4px 12px', 
                    background: 'var(--kitel-primary-25)',
                    color: 'var(--kitel-text-primary)',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <a href="#" className="btn-secondary" style={{ padding: '10px 24px', fontSize: '0.8rem' }}>
                View Case Study &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

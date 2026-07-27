import React from 'react';
import useInView from '../../hooks/useInView';

export default function PortfolioSection() {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  const projects = [
    {
      title: 'Enterprise Resource Platform',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      description: 'A comprehensive custom ERP system designed to streamline manufacturing operations and supply chain management.'
    },
    {
      title: 'Smart Access Gateway',
      tags: ['IoT', 'Cloud', 'Security'],
      description: 'Biometric access control integrated with cloud-based monitoring for enterprise campus security.'
    },
    {
      title: 'E-Commerce Ecosystem',
      tags: ['Next.js', 'Stripe', 'AWS'],
      description: 'A high-performance online retail platform handling thousands of concurrent users with sub-second load times.'
    },
    {
      title: 'Government Digital Portal',
      tags: ['Accessibility', 'Scale', 'Security'],
      description: 'A secure public service platform built to strict accessibility standards and enterprise-grade security protocols.'
    }
  ];

  return (
    <section id="portfolio" className="section">
      <div className="section-inner" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className={`section-label ${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0, justifyContent: 'center' }}>
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
              className={`glass-card ${isInView ? `animate-fade-in-up delay-${Math.min(index + 2, 6)}` : ''}`}
              style={{ opacity: 0, padding: '2.5rem', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: '0.8rem', 
                color: 'var(--kitel-secondary)',
                letterSpacing: '0.1em',
                marginBottom: '1rem'
              }}>
                PROJECT 0{index + 1}
              </div>
              <h3 className="h3" style={{ marginBottom: '1rem' }}>
                {project.title}
              </h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem', flexGrow: 1 }}>
                {project.description}
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{ 
                    padding: '4px 12px', 
                    background: 'var(--kitel-primary-05)',
                    border: '1px solid var(--kitel-primary-25)',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    color: 'var(--kitel-text-secondary)',
                    fontWeight: 600
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <a href="#contact" className="text-gradient" style={{ 
                textDecoration: 'none', 
                fontWeight: 600, 
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: 'auto'
              }}>
                View Case Study &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

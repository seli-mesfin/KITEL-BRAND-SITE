import React from 'react';
import useInView from '../../hooks/useInView';

export default function WhyKitelSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const values = [
    { 
      title: "Reliability", 
      icon: "◆", 
      desc: "Systems that never let you down.",
      image: "/pillar-reliability.jpg"
    },
    { 
      title: "Expertise", 
      icon: "◇", 
      desc: "Deep knowledge across the technology stack.",
      image: "/pillar-expertise.jpg"
    },
    { 
      title: "Innovation", 
      icon: "✦", 
      desc: "Pushing boundaries with modern solutions.",
      image: "/pillar-innovation.jpg"
    },
    { 
      title: "Security", 
      icon: "◈", 
      desc: "Enterprise-grade protection built in.",
      image: "/pillar-security.jpg"
    },
    { 
      title: "Scalability", 
      icon: "△", 
      desc: "Architecture that grows with your business.",
      image: "/pillar-scalability.jpg"
    },
    { 
      title: "Partnership", 
      icon: "○", 
      desc: "Long-term collaboration, not just projects.",
      image: "/pillar-partnership.jpg"
    }
  ];

  return (
    <section id="whykitel" className="section" style={{ background: '#f7f9f5', padding: '5rem 2rem' }}>
      <div className="section-inner" ref={ref} style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className={`section-label ${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: isInView ? 1 : 0, justifyContent: 'center' }}>
            05 &mdash; Why Kitel
          </div>
          
          <h2 className={`h2 ${isInView ? 'animate-fade-in-up delay-1' : ''}`} style={{ opacity: isInView ? 1 : 0, color: '#1a2e12', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Built for <span style={{ color: 'var(--kitel-primary)' }}>Growth</span>
          </h2>
          <p className={`${isInView ? 'animate-fade-in-up delay-2' : ''}`} style={{ opacity: isInView ? 1 : 0, margin: '1rem auto 0', color: 'rgba(26, 46, 18, 0.75)', maxWidth: '560px' }}>
            Our core foundation is engineered to deliver reliable, secure, and scalable digital transformation for every client.
          </p>
        </div>

        {/* 6 Pillars Grid with Images */}
        <div className="grid-3" style={{ gap: '2rem' }}>
          {values.map((val, index) => (
            <div 
              key={index}
              className={`glass-card ${isInView ? `animate-fade-in-up delay-${Math.min(index + 2, 6)}` : ''}`}
              style={{ 
                opacity: isInView ? 1 : 0, 
                padding: '0',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid rgba(67, 106, 50, 0.12)',
                boxShadow: '0 4px 20px rgba(67, 106, 50, 0.06)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(67, 106, 50, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(67, 106, 50, 0.06)';
              }}
            >
              {/* Pillar Visual Image */}
              <div style={{ width: '100%', height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={val.image} 
                  alt={val.title} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }} 
                  onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                />
                
                {/* Icon Badge Overlay */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid var(--kitel-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--kitel-primary)',
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                }}>
                  {val.icon}
                </div>
              </div>

              {/* Pillar Text */}
              <div style={{ padding: '1.5rem 1.5rem 1.75rem' }}>
                <h3 className="h3" style={{ marginBottom: '0.5rem', color: '#1a2e12', fontSize: '1.25rem' }}>
                  {val.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.925rem', color: 'rgba(26, 46, 18, 0.75)', lineHeight: 1.6 }}>
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

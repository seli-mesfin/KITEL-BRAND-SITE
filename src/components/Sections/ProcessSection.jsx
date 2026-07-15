import React from 'react';
import useInView from '../../hooks/useInView';

export default function ProcessSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const steps = [
    { title: "Discovery", desc: "Understanding your vision, goals, and challenges" },
    { title: "Strategy", desc: "Crafting the roadmap for digital transformation" },
    { title: "Design", desc: "Creating intuitive, beautiful user experiences" },
    { title: "Development", desc: "Building robust, scalable solutions" },
    { title: "Implementation", desc: "Seamless deployment and integration" },
    { title: "Support", desc: "Continuous evolution and optimization" }
  ];

  return (
    <section id="process" className="section html-overlay">
      <div className="section-inner" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className={`section-label ${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0, justifyContent: 'center' }}>
            04 &mdash; Process
          </div>
          
          <h2 className={`h2 ${isInView ? 'animate-fade-in-up delay-1' : ''}`} style={{ opacity: 0 }}>
            How We Work
          </h2>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical connecting line */}
          <div style={{
            position: 'absolute',
            left: '30px',
            top: '40px',
            bottom: '40px',
            width: '2px',
            background: 'linear-gradient(to bottom, var(--kitel-primary-25), var(--kitel-secondary-50), var(--kitel-primary-25))',
            zIndex: -1,
            opacity: isInView ? 1 : 0,
            transition: 'opacity 1s ease-in'
          }} />

          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`process-step ${isInView ? `animate-fade-in-up delay-${Math.min(index + 2, 6)}` : ''}`}
              style={{ opacity: 0 }}
            >
              <div className="process-number">0{index + 1}</div>
              <div style={{ paddingTop: '0.5rem' }}>
                <h3 className="h3" style={{ marginBottom: '0.5rem', color: 'var(--kitel-text-primary)' }}>
                  {step.title}
                </h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import useInView from '../../hooks/useInView';

export default function ServicesSection({ onServiceHover }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  const services = [
    {
      title: "Web Development",
      icon: "🌐",
      description: "Modern, scalable web applications and responsive corporate websites built with cutting-edge technologies."
    },
    {
      title: "Custom System Development",
      icon: "⚙️",
      description: "Tailored software solutions designed specifically to address your unique business challenges and workflows."
    },
    {
      title: "Access Control Solutions",
      icon: "🔐",
      description: "Smart, secure access control solutions and biometric systems for enterprise security."
    },
    {
      title: "Integrated IT Services",
      icon: "🔗",
      description: "Integrated infrastructure, ongoing support, and seamless digital transformation consulting."
    }
  ];

  return (
    <section id="services" className="section html-overlay">
      <div className="section-inner" ref={ref}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className={`section-label ${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0, justifyContent: 'center' }}>
            02 &mdash; Services
          </div>
          
          <h2 className={`h2 ${isInView ? 'animate-fade-in-up delay-1' : ''}`} style={{ opacity: 0 }}>
            What We Build
          </h2>
        </div>

        <div className="grid-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`glass-card ${isInView ? `animate-fade-in-up delay-${index + 2}` : ''}`}
              style={{ opacity: 0, display: 'flex', flexDirection: 'column' }}
              onMouseEnter={() => onServiceHover?.(index)}
              onMouseLeave={() => onServiceHover?.(null)}
            >
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="h3" style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
                {service.title}
              </h3>
              <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1 }}>
                {service.description}
              </p>
              <a href="#contact" className="text-gradient" style={{ 
                textDecoration: 'none', 
                fontWeight: 600, 
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: 'auto'
              }}>
                Learn More &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

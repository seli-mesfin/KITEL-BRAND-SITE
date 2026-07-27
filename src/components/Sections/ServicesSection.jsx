import React from 'react';
import useInView from '../../hooks/useInView';

export default function ServicesSection({ onServiceHover }) {
  const { ref, isInView } = useInView({ threshold: 0.15 });

  const services = [
    {
      title: "Web Development",
      icon: "🌐",
      image: "/service1.jpg",
      description: "Modern, scalable web applications and responsive corporate websites built with cutting-edge technologies."
    },
    {
      title: "Custom System Development",
      icon: "⚙️",
      image: "/service2.jpg",
      description: "Tailored software solutions designed specifically to address your unique business challenges and workflows."
    },
    {
      title: "Access Control Solutions",
      icon: "🔐",
      image: "/service3.jpg",
      description: "Smart, secure access control solutions and biometric systems for enterprise security."
    },
    {
      title: "Integrated IT Services",
      icon: "🔗",
      image: "/service4.jpg",
      description: "Integrated infrastructure, ongoing support, and seamless digital transformation consulting."
    }
  ];

  return (
    <section id="services" className="section">
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
              style={{ opacity: 0, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={() => onServiceHover?.(index)}
              onMouseLeave={() => onServiceHover?.(null)}
            >
              {/* Service Image Banner */}
              <div style={{ position: 'relative', width: '100%', height: '160px', overflow: 'hidden' }}>
                <img 
                  src={service.image} 
                  alt={service.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '10px', 
                  left: '10px', 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  borderRadius: '50%', 
                  width: '40px', 
                  height: '40px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '1.2rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}>
                  {service.icon}
                </div>
              </div>

              {/* Service Details */}
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 className="h3" style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--kitel-text-muted)', marginBottom: '1.5rem', flexGrow: 1, lineHeight: 1.6 }}>
                  {service.description}
                </p>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  style={{ 
                    color: 'var(--kitel-primary)', 
                    textDecoration: 'none', 
                    fontWeight: 600, 
                    fontSize: '0.9rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    marginTop: 'auto'
                  }}
                >
                  Learn More &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

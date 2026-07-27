import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* ═══ TIER 1: HERO — Clean White Theme ═══ */}
      <section id="home" className="t-hero">
        <div className="t-hero-inner">
          <div className={`t-hero-text ${isVisible ? 'animate-fade-in-up' : ''}`} style={{ opacity: isVisible ? 1 : 0 }}>
            
            <h1 style={{ color: 'var(--kitel-primary)', marginBottom: '1.25rem' }}>
              Growing Digital<br />
              <span style={{ color: 'var(--kitel-primary)' }}>Futures.</span>
            </h1>

            <p style={{ color: 'rgba(26, 46, 18, 0.78)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '520px', marginBottom: '2rem' }}>
              Derived from the Amharic word for <em>leaf</em>, Kitel connects Ethiopian innovation with global digital networks — creating intelligent, scalable software solutions.
            </p>

            <div className="t-hero-buttons">
              <button 
                className="t-btn-fill" 
                style={{ background: 'var(--kitel-primary)', color: '#ffffff' }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
              >
                Start Your Project
              </button>
              <button 
                className="t-btn-outline" 
                style={{ color: 'var(--kitel-primary)', borderColor: 'var(--kitel-primary)' }}
                onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIER 2: FEATURES — Clean Band ═══ */}
      <section className="t-features">
        <div className="t-features-inner">
          <h2 className="t-features-heading">
            We provide an outstanding digital experience
          </h2>

          <div className="t-features-grid">
            {/* Card 1 */}
            <div className="t-feature-card">
              <div className="t-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>What We Do</h3>
              <p>We design and build modern web applications, custom enterprise software, and integrated IT infrastructure that drives real business results.</p>
              <button className="t-btn-card" onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}>
                Read More
              </button>
            </div>

            {/* Card 2 */}
            <div className="t-feature-card">
              <div className="t-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <h3>Our Services</h3>
              <p>From web development and access control to custom system design and IT consulting — end-to-end digital transformation solutions.</p>
              <button className="t-btn-card" onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}>
                Read More
              </button>
            </div>

            {/* Card 3 */}
            <div className="t-feature-card">
              <div className="t-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3>Our Advantages</h3>
              <p>Ethiopian roots with global vision. We blend local market knowledge with cutting-edge technology to deliver solutions that truly fit.</p>
              <button className="t-btn-card" onClick={() => document.getElementById('whykitel')?.scrollIntoView({behavior: 'smooth'})}>
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TIER 3: PROFESSIONAL BANNER ═══ */}
      <section className="t-pro-banner">
        <div className="t-pro-inner">
          <div className="t-pro-text">
            <h2>We Are Professionals</h2>
            <p>With years of experience delivering enterprise-grade solutions across Ethiopia and beyond, Kitel combines creative design with robust engineering to turn your digital vision into reality.</p>
            <p>Our team is committed to quality, transparency, and measurable results. We build lasting partnerships, not just software.</p>
          </div>
          <div className="t-pro-cta">
            <button className="t-btn-fill" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

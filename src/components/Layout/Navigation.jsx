import React, { useState } from 'react';

export default function Navigation({ scrollProgress = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Add glassmorphic background when scrolled slightly
  const isScrolled = scrollProgress > 0.02;

  // Determine active section based on scroll progress
  // Hero (0), About (0.25), Services (0.5), Why Kitel (0.75), Contact (1.0)
  const getActiveSection = () => {
    if (scrollProgress < 0.12) return 'home';
    if (scrollProgress < 0.37) return 'about';
    if (scrollProgress < 0.62) return 'services';
    if (scrollProgress < 0.87) return 'whykitel';
    return 'contact';
  };

  const activeSection = getActiveSection();

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // Smooth scroll is tricky with the custom scroll setup, 
    // so we approximate it by calculating the target progress and scrolling window
    const targets = {
      'home': 0,
      'about': 0.25,
      'services': 0.50,
      'whykitel': 0.75,
      'contact': 1.0
    };
    
    const targetProgress = targets[targetId];
    if (targetProgress !== undefined) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: docHeight * targetProgress,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'whykitel', label: 'Why Kitel' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
        <a 
          href="#home" 
          className="nav-logo"
          onClick={(e) => handleNavClick(e, 'home')}
          style={{ display: 'flex', alignItems: 'center', padding: '0.2rem 0' }}
        >
          <img src="/logo.png" alt="Kitel" style={{ height: '72px', margin: '-8px 0', filter: 'drop-shadow(0 4px 12px rgba(67, 106, 50, 0.15))' }} />
        </a>
        
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'nav-link--active' : ''}`}
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button 
          className="nav-hamburger"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'active' : ''}`}>
        <button 
          style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'var(--kitel-text-primary)', fontSize: '2rem', cursor: 'pointer' }}
          onClick={() => setMobileMenuOpen(false)}
        >
          &times;
        </button>
        
        {navLinks.map(link => (
          <a 
            key={`mobile-${link.id}`}
            href={`#${link.id}`}
            className="nav-link"
            onClick={(e) => handleNavClick(e, link.id)}
            style={{ color: activeSection === link.id ? 'var(--kitel-secondary)' : 'var(--kitel-text-primary)' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}

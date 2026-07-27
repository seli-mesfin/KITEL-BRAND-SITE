import React, { useState, useEffect } from 'react';
import TransparentLogo from './TransparentLogo';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'services', 'portfolio', 'whykitel', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
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
          style={{ display: 'flex', alignItems: 'center', padding: '0.4rem 0' }}
        >
          <TransparentLogo 
            height="85px" 
            lightMode={false}
            style={{ 
              filter: 'drop-shadow(0 4px 12px rgba(67, 106, 50, 0.15))',
              transition: 'transform 0.3s ease' 
            }} 
          />
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
          style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'var(--kitel-primary)', fontSize: '2rem', cursor: 'pointer' }}
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
            style={{ color: activeSection === link.id ? 'var(--kitel-secondary)' : 'var(--kitel-primary)' }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}

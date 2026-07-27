import React from 'react';
import TransparentLogo from './TransparentLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    'Web Development',
    'Custom System Development',
    'Access Control Solutions',
    'Integrated IT Services',
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const id = targetId.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer style={{
      backgroundColor: '#f7f9f5',
      borderTop: '1px solid rgba(67, 106, 50, 0.12)',
      padding: '4rem 2rem 2rem 2rem',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '3rem',
      }} className="footer-grid">
        
        {/* Column 1 — Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
            <TransparentLogo 
              height="52px" 
              lightMode={false}
              style={{ filter: 'drop-shadow(0 2px 8px rgba(67, 106, 50, 0.1))' }} 
            />
          </div>
          <p style={{ 
            fontSize: '0.95rem', 
            color: 'rgba(26, 46, 18, 0.75)', 
            lineHeight: 1.7,
            margin: '0 0 1.25rem 0'
          }}>
            Bridging the gap between businesses and technology by creating intelligent digital solutions.
          </p>
          <p style={{ 
            fontFamily: 'var(--font-subtitle)',
            color: 'var(--kitel-primary)', 
            fontSize: '1rem',
            letterSpacing: '0.12em',
            fontWeight: 700,
            margin: 0 
          }}>
            #SimplyConnected
          </p>
        </div>

        {/* Column 2 — Quick Links */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--kitel-primary)',
            marginBottom: '1.25rem',
          }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {quickLinks.map(link => (
              <li key={link.label} style={{ marginBottom: '0.6rem' }}>
                <a 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    color: 'rgba(26, 46, 18, 0.8)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--kitel-primary)'}
                  onMouseLeave={(e) => e.target.style.color = 'rgba(26, 46, 18, 0.8)'}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Services */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--kitel-primary)',
            marginBottom: '1.25rem',
          }}>Services</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {services.map(service => (
              <li key={service} style={{ marginBottom: '0.6rem' }}>
                <span style={{ color: 'rgba(26, 46, 18, 0.8)', fontSize: '0.95rem' }}>
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact Info */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.95rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--kitel-primary)',
            marginBottom: '1.25rem',
          }}>Contact</h4>
          
          <div style={{ marginBottom: '0.8rem' }}>
            <p style={{ 
              fontSize: '0.8rem', 
              color: 'var(--kitel-primary)', 
              fontWeight: 700, 
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              margin: '0 0 0.15rem 0' 
            }}>Email</p>
            <a href="mailto:hello@kitel.com" style={{ 
              color: '#1a2e12', 
              textDecoration: 'none', 
              fontSize: '0.95rem',
              fontWeight: 500,
            }}>
              hello@kitel.com
            </a>
          </div>
          
          <div style={{ marginBottom: '0.8rem' }}>
            <p style={{ 
              fontSize: '0.8rem', 
              color: 'var(--kitel-primary)', 
              fontWeight: 700, 
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              margin: '0 0 0.15rem 0' 
            }}>Phone</p>
            <a href="tel:+251989840600" style={{ 
              color: '#1a2e12', 
              textDecoration: 'none', 
              fontSize: '0.95rem',
              fontWeight: 500,
            }}>
              +251 989 840 600
            </a>
          </div>
          
          <div>
            <p style={{ 
              fontSize: '0.8rem', 
              color: 'var(--kitel-primary)', 
              fontWeight: 700, 
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              margin: '0 0 0.15rem 0' 
            }}>Location</p>
            <p style={{ 
              color: 'rgba(26, 46, 18, 0.8)', 
              fontSize: '0.95rem',
              margin: 0,
              lineHeight: 1.6
            }}>
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </div>

      {/* Divider & Copyright */}
      <div style={{
        maxWidth: '1200px',
        margin: '2.5rem auto 0',
        paddingTop: '1.25rem',
        borderTop: '1px solid rgba(67, 106, 50, 0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{ 
          margin: 0, 
          fontSize: '0.85rem', 
          color: 'rgba(26, 46, 18, 0.65)' 
        }}>
          &copy; {currentYear} Kitel. All rights reserved.
        </p>
        <p style={{ 
          margin: 0, 
          fontSize: '0.85rem', 
          color: 'var(--kitel-primary)',
          fontFamily: 'var(--font-subtitle)',
          fontWeight: 700,
          letterSpacing: '0.1em'
        }}>
          Simply Connected
        </p>
      </div>
    </footer>
  );
}

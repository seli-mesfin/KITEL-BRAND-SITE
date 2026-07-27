import React, { useState } from 'react';
import useInView from '../../hooks/useInView';

export default function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const text = await response.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (parseErr) {
        // Response wasn't valid JSON
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form. Please try again.');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', projectType: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="section-inner" ref={ref}>
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <div className={`section-label ${isInView ? 'animate-fade-in-up' : ''}`} style={{ opacity: 0, justifyContent: 'center' }}>
            06 &mdash; Contact
          </div>
          
          <h2 className={`h2 ${isInView ? 'animate-fade-in-up delay-1' : ''}`} style={{ opacity: 0, marginBottom: '1rem' }}>
            Simply Connected
          </h2>
          
          <p className={`${isInView ? 'animate-fade-in-up delay-2' : ''}`} style={{ opacity: 0, margin: '0 auto', fontSize: '1.1rem' }}>
            Ready to transform your business? Let's build something extraordinary together.
          </p>
        </div>

        <div className={`grid-2 ${isInView ? 'animate-fade-in-up delay-3' : ''}`} style={{ opacity: 0, alignItems: 'start' }}>
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input" 
                  placeholder="Your Name" 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input" 
                  placeholder="your@email.com" 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Project Type</label>
                <input 
                  type="text" 
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="e.g. Web Development, Custom System" 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea" 
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              {status === 'success' && (
                <div style={{ padding: '1rem', background: '#d4edda', color: '#155724', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #c3e6cb' }}>
                  Thank you! Your message has been sent successfully. We will be in touch shortly.
                </div>
              )}
              
              {status === 'error' && (
                <div style={{ padding: '1rem', background: '#f8d7da', color: '#721c24', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #f5c6cb' }}>
                  {errorMessage}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={status === 'submitting'}
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem', opacity: status === 'submitting' ? 0.7 : 1 }}
              >
                <span>{status === 'submitting' ? 'Sending...' : 'Start the Conversation \u2192'}</span>
              </button>
            </form>
          </div>
          
          <div style={{ padding: '2rem' }}>
            <h3 className="h3" style={{ marginBottom: '2rem', color: 'var(--kitel-text-primary)' }}>
              Get in Touch
            </h3>
            
            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ color: 'var(--kitel-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Email</h4>
              <a href="mailto:hello@kitel.com" style={{ color: 'var(--kitel-text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500 }}>
                hello@kitel.com
              </a>
            </div>
            
            <div style={{ marginBottom: '3rem' }}>
              <h4 style={{ color: 'var(--kitel-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Phone</h4>
              <a href="tel:+251989840600" style={{ color: 'var(--kitel-text-primary)', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 500 }}>
                +251 989840600
              </a>
            </div>
            
            <div style={{ padding: '2rem', background: 'var(--kitel-primary-25)', borderRadius: 'var(--radius-md)', border: '1px solid var(--kitel-primary-50)' }}>
              <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--kitel-text-secondary)', fontSize: '0.95rem' }}>
                "Kitel has consistently delivered outstanding technology solutions that empower our operations."
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}

import React, { useEffect, useState, useRef } from 'react';
import useInView from '../../hooks/useInView';

const brandStoryCards = [
  {
    _id: '1',
    name: 'Brand Anchor',
    description: 'The logo remains a stable visual anchor across the experience.',
    category: 'Identity',
  },
  {
    _id: '2',
    name: 'Purposeful Palette',
    description: 'Every surface is kept within dark green, light green, and white.',
    category: 'Visual language',
  },
  {
    _id: '3',
    name: 'Measured Motion',
    description: 'The 3D motion feels deliberate, calm, and resolved.',
    category: 'Experience',
  },
];

export default function MerchandiseShowroom() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setProducts(brandStoryCards);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section id="merchandise" className="section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--kitel-primary)', fontSize: '1.5rem' }}>Loading Showroom...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="merchandise" className="section" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'var(--kitel-primary)' }}>Error: {error}</div>
      </section>
    );
  }

  return (
    <section
      id="merchandise"
      ref={sectionRef}
      className="section"
      style={{ padding: '6rem 20px', background: 'linear-gradient(180deg, var(--kitel-bg) 0%, var(--kitel-bg-alt) 100%)' }}
    >
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2
            className={`section-title ${isInView ? 'animate-fade-in-up' : ''}`}
            style={{ color: 'var(--kitel-secondary)', opacity: 0 }}
          >
            Kitel Brand Showroom
          </h2>
          <p
            className={`delay-2 ${isInView ? 'animate-fade-in-up' : ''}`}
            style={{ color: 'var(--kitel-text-secondary)', maxWidth: '680px', margin: '0 auto', opacity: 0 }}
          >
            A polished brand-first presentation built around the official logo and a restrained green-and-white visual language.
          </p>
        </div>

        <div className="merchandise-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {products.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, isInView }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const delayClass = `delay-${Math.min(index + 2, 8)}`;

  return (
    <div
      className={`merchandise-card ${isInView ? 'animate-fade-in-up' : ''} ${delayClass}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid var(--kitel-border)',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.16)',
        transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease',
        opacity: 0,
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          height: '250px',
          width: '100%',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(144, 238, 144, 0.15) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '24px',
          borderBottom: '1px solid var(--kitel-border)',
        }}
      >
        <div
          style={{
            width: '92px',
            height: '92px',
            borderRadius: '50%',
            border: '2px solid var(--kitel-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--kitel-secondary)',
            fontSize: '2rem',
            fontWeight: '700',
            transform: 'translateZ(24px)',
            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.16)',
          }}
        >
          K
        </div>
      </div>
      <div style={{ padding: '1.4rem 1.5rem 1.6rem', transform: 'translateZ(20px)' }}>
        <span style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          color: 'var(--kitel-secondary)',
          letterSpacing: '0.08em',
          fontWeight: '700',
        }}>
          {product.category}
        </span>
        <h3 style={{ margin: '0.6rem 0', color: 'var(--kitel-text-primary)', fontSize: '1.2rem' }}>
          {product.name}
        </h3>
        <p style={{ color: 'var(--kitel-text-muted)', fontSize: '0.92rem', lineHeight: '1.55' }}>
          {product.description}
        </p>
      </div>
    </div>
  );
}

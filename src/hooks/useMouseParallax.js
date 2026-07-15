import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Track mouse position normalized to [-1, 1] for parallax effects.
 * Returns { x, y } with smooth lerp interpolation.
 */
export default function useMouseParallax(smoothing = 0.08) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  const handleMouseMove = useCallback((e) => {
    target.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * smoothing;
      current.current.y += (target.current.y - current.current.y) * smoothing;
      setMouse({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [handleMouseMove, smoothing]);

  return mouse;
}

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for IntersectionObserver-based reveal animations.
 * When the referenced element enters the viewport, `isInView` becomes true.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.15] - Visibility threshold to trigger
 * @param {string} [options.rootMargin='0px'] - Root margin for observer
 * @param {boolean} [options.once=true] - If true, only triggers once
 * @returns {{ ref: React.RefObject, isInView: boolean }}
 */
export default function useInView({
  threshold = 0.15,
  rootMargin = '0px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}

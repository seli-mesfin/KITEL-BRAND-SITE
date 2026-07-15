import { useState, useEffect, useCallback } from 'react';

/**
 * Track scroll progress across the page.
 * Returns:
 *  - progress: 0-1 normalized scroll position
 *  - section: current section index (0-based)
 *  - sectionProgress: 0-1 progress within current section
 */
export default function useScrollProgress(totalSections = 7) {
  const [state, setState] = useState({
    progress: 0,
    section: 0,
    sectionProgress: 0,
    scrollY: 0,
  });

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0;

    const sectionFloat = progress * totalSections;
    const section = Math.min(Math.floor(sectionFloat), totalSections - 1);
    const sectionProgress = sectionFloat - section;

    setState({ progress, section, sectionProgress, scrollY });
  }, [totalSections]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return state;
}

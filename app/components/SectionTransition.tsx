'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  fallbackHeight?: string;
}

export default function SectionTransition({ children, fallbackHeight = '100vh' }: SectionTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Once loaded, keep it loaded (don't unmount when scrolling away)
            setHasLoaded(true);
          }
        });
      },
      {
        // Start loading when section is 200px away from viewport
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasLoaded]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        minHeight: !hasLoaded ? fallbackHeight : 'auto',
        background: !hasLoaded ? 'linear-gradient(135deg, #F8F9FA 0%, #E8F2FF 50%, #DBEAFE 100%)' : 'transparent',
        position: 'relative',
        transition: 'background 0.3s ease'
      }}
    >
      {isVisible && children}
    </div>
  );
}

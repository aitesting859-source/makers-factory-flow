import { useEffect, useRef, useState } from 'react';

const ShowreelHeroText = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const viewportHeight = window.innerHeight;
        // Extended animation over 5-6 scrolls for smoother, slower transition
        const startAnimation = viewportHeight * 0.5;
        const endAnimation = viewportHeight * 6;
        
        if (scrolled < startAnimation) {
          setScrollProgress(0);
        } else if (scrolled > endAnimation) {
          setScrollProgress(1);
        } else {
          const progress = (scrolled - startAnimation) / (endAnimation - startAnimation);
          setScrollProgress(progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ultra-smooth gradual animations
  const translateY = scrollProgress * -800; // Slower vertical movement
  const opacity = 1 - scrollProgress; // Very gradual fade
  const rotation = scrollProgress * 60; // Gentler rotation
  const letterSpacing = scrollProgress * 8; // Subtle spacing increase

  return (
    <section 
      ref={heroRef}
      className="relative h-[60vh] flex items-center justify-center px-4 py-12"
    >
      <h2 
        className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight"
        style={{
          transform: `translateY(${translateY}px) rotateX(${rotation}deg)`,
          opacity: opacity,
          transformStyle: 'preserve-3d',
          perspective: '2000px',
          letterSpacing: `${letterSpacing}px`,
          transition: 'all 0.3s ease-out', // Smooth transition between frames
        }}
      >
        <span 
          className="text-primary"
          style={{
            display: scrollProgress > 0.4 ? 'block' : 'inline-block',
            marginBottom: scrollProgress > 0.4 ? '0.75rem' : '0',
            transition: 'all 0.8s ease-out', // Slow transition for line break
          }}
        >
          THE MAKERS
        </span>
        {scrollProgress <= 0.4 && ' '}
        <span 
          className="text-accent"
          style={{
            display: scrollProgress > 0.4 ? 'block' : 'inline-block',
            transition: 'all 0.8s ease-out', // Slow transition for line break
          }}
        >
          FACTORY
        </span>
      </h2>
    </section>
  );
};

export default ShowreelHeroText;

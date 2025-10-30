import { useEffect, useRef, useState } from 'react';

const ShowreelHeroText = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const viewportHeight = window.innerHeight;
        // Start fading after first scroll, complete after 3 scrolls
        const startAnimation = viewportHeight * 0.3;
        const endAnimation = viewportHeight * 3;
        
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

  // Smooth animations over 3 scrolls
  const translateY = scrollProgress * -600; // Move up significantly
  const opacity = 1 - scrollProgress; // Complete fade out
  const rotation = scrollProgress * 90; // Rotate as it moves up
  const letterSpacing = scrollProgress * 12; // Increase letter spacing

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
          perspective: '1500px',
          letterSpacing: `${letterSpacing}px`,
          transition: 'all 0.05s linear',
        }}
      >
        <span 
          className="text-primary transition-all duration-500 ease-out"
          style={{
            display: scrollProgress > 0.2 ? 'block' : 'inline-block',
            marginBottom: scrollProgress > 0.2 ? '0.75rem' : '0',
          }}
        >
          THE MAKERS
        </span>
        {scrollProgress <= 0.2 && ' '}
        <span 
          className="text-accent transition-all duration-500 ease-out"
          style={{
            display: scrollProgress > 0.2 ? 'block' : 'inline-block',
          }}
        >
          FACTORY
        </span>
      </h2>
    </section>
  );
};

export default ShowreelHeroText;

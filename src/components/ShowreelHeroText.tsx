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

  // Ultra-smooth gradual animations - moving upward
  const translateY = -scrollProgress * 400; // Move upward as user scrolls
  const opacity = Math.max(0.3, 1 - scrollProgress * 0.7); // Keep slightly visible

  return (
    <section 
      ref={heroRef}
      className="relative h-[60vh] flex items-center justify-center px-4 py-12"
    >
      <div 
        className="text-center space-y-2"
        style={{
          transform: `translateY(${translateY}px)`,
          opacity: opacity,
          transition: 'all 0.3s ease-out',
        }}
      >
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-primary tracking-tighter">
          THE
        </h2>
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-accent tracking-tighter">
          MAKERS FACTORY
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-primary/60 tracking-wider uppercase pt-4">
          (Indie - Video Creators)
        </p>
      </div>
    </section>
  );
};

export default ShowreelHeroText;

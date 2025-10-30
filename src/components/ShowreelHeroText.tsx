import { useEffect, useRef, useState } from 'react';

const ShowreelHeroText = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const startAnimation = window.innerHeight * 0.5;
        const endAnimation = window.innerHeight * 2.5;
        
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

  const rotation = scrollProgress * 90;
  const translateY = scrollProgress * -200;
  const opacity = Math.max(0.7, 1 - scrollProgress * 0.3);
  const letterSpacing = scrollProgress * 8;

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[30vh] flex items-center justify-center px-4 py-16"
    >
      <h2 
        className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight"
        style={{
          transform: `translateY(${translateY}px) rotateX(${rotation}deg)`,
          opacity: opacity,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          letterSpacing: `${letterSpacing}px`,
        }}
      >
        <span 
          className="inline-block text-primary transition-all duration-300"
          style={{
            display: scrollProgress > 0.3 ? 'block' : 'inline-block',
            marginBottom: scrollProgress > 0.3 ? '0.5rem' : '0',
          }}
        >
          THE MAKERS
        </span>
        {scrollProgress <= 0.3 && ' '}
        <span 
          className="inline-block text-accent transition-all duration-300"
          style={{
            display: scrollProgress > 0.3 ? 'block' : 'inline-block',
          }}
        >
          FACTORY
        </span>
      </h2>
    </section>
  );
};

export default ShowreelHeroText;

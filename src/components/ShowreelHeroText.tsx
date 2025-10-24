import { useEffect, useRef, useState } from 'react';

const ShowreelHeroText = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        const startFade = window.innerHeight * 0.8;
        const endFade = window.innerHeight * 1.5;
        
        if (scrolled < startFade) {
          setScrollOpacity(1);
        } else if (scrolled > endFade) {
          setScrollOpacity(0);
        } else {
          const progress = (scrolled - startFade) / (endFade - startFade);
          setScrollOpacity(1 - progress);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[60vh] flex items-center justify-center px-4 py-20"
      style={{ opacity: scrollOpacity }}
    >
      <h2 className="text-center">
        <div className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
          <span className="block text-primary">THE MAKERS</span>
          <span className="block text-accent mt-2">FACTORY</span>
        </div>
      </h2>
    </section>
  );
};

export default ShowreelHeroText;

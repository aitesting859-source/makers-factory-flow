import { useEffect, useRef, useState } from 'react';

const HeroText = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const scrollProgress = Math.min(Math.max((window.scrollY - 500) / 500, 0), 1);
        setScrollY(scrollProgress * 100);
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true);
        }
      }
    };

    setTimeout(() => setIsVisible(true), 500);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-32"
      style={{ transform: `translateY(-${scrollY}px)` }}
    >
      {/* Main Hero Text */}
      <h1
        className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
          <span className="block text-primary">THE MAKERS</span>
          <span className="block text-accent mt-2">FACTORY</span>
        </div>
      </h1>

      {/* Subhero Text */}
      <div
        className={`mt-12 text-center transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="text-2xl md:text-4xl font-bold text-primary/70 tracking-wider">
          indie video creators
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-1 h-32 bg-gradient-to-b from-accent to-transparent opacity-50" />
        <div className="absolute bottom-1/4 right-10 w-1 h-32 bg-gradient-to-t from-accent to-transparent opacity-50" />
      </div>
    </section>
  );
};

export default HeroText;

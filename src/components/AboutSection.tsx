import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import aboutCorner1 from '@/assets/about-corner-1.jpg';
import aboutCorner2 from '@/assets/about-corner-2.jpg';
import aboutCorner3 from '@/assets/about-corner-3.jpg';
import aboutCorner4 from '@/assets/about-corner-4.jpg';

const AboutSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurAmount, setBlurAmount] = useState(10);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    const handleScroll = () => {
      const section = document.getElementById('about');
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight * 0.5)));
          setBlurAmount(10 * (1 - progress));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="about" 
      className={`relative min-h-screen bg-background border-t border-border/10 blur-load ${isLoaded ? 'loaded' : ''}`}
      style={{ filter: `blur(${blurAmount}px)`, transition: 'filter 0.3s ease-out' }}
    >
      {/* Title Section - Above Everything */}
      <div className="relative z-20 text-center space-y-4 pt-24 pb-12 px-4">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary tracking-tighter">
          THE
        </h2>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-accent tracking-tighter">
          MAKERS FACTORY
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-primary/60 tracking-wider uppercase">
          (Indie - Video Creators)
        </p>
        
        <div className="space-y-3 pt-6 max-w-3xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg text-primary/80 leading-relaxed font-light">
            We are a collective of indie creators pushing the boundaries of visual storytelling.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-primary/80 leading-relaxed font-light">
            Our work spans media production, commercial advertising, fashion editorial, and wedding cinematography.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-primary/80 leading-relaxed font-light">
            Each project is an opportunity to create something extraordinary.
          </p>
        </div>
      </div>

      {/* Four Corner Images Layout */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Top Left Corner Image - Random offset */}
        <div className="absolute top-4 sm:top-8 md:top-12 left-4 sm:left-6 md:left-10 w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 overflow-hidden transform rotate-2 opacity-60">
          <img 
            src={aboutCorner1} 
            alt="Visual storytelling" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right Corner Image - Random offset */}
        <div className="absolute top-8 sm:top-12 md:top-16 right-2 sm:right-4 md:right-8 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 overflow-hidden transform -rotate-3 opacity-60">
          <img 
            src={aboutCorner2} 
            alt="Creative process" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Left Corner Image - Random offset */}
        <div className="absolute bottom-6 sm:bottom-10 md:bottom-14 left-2 sm:left-4 md:left-6 w-40 h-32 sm:w-48 sm:h-40 md:w-56 md:h-48 lg:w-64 lg:h-56 overflow-hidden transform -rotate-1 opacity-60">
          <img 
            src={aboutCorner3} 
            alt="Behind the scenes" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Right Corner Image - Random offset */}
        <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 right-4 sm:right-8 md:right-12 w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 overflow-hidden transform rotate-3 opacity-60">
          <img 
            src={aboutCorner4} 
            alt="Final moments" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Empty center space for visual balance */}
        <div className="relative z-10"></div>
      </div>
      
      {/* Stats Section - Animated on Scroll */}
      <div ref={statsRef} className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
          <motion.div 
            className="text-center p-6 sm:p-8 bg-gradient-to-br from-muted/50 to-background rounded-lg border border-primary/20 transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ 
              scale: 1.05,
              borderColor: "hsl(var(--accent))",
              backgroundColor: "hsl(var(--accent) / 0.1)"
            }}
          >
            <h4 className="text-4xl sm:text-5xl md:text-6xl font-black text-accent mb-3">50+</h4>
            <p className="text-xs sm:text-sm text-primary/60 uppercase tracking-wider">Projects Completed</p>
          </motion.div>
          <motion.div 
            className="text-center p-6 sm:p-8 bg-gradient-to-br from-muted/50 to-background rounded-lg border border-primary/20 transition-colors duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ 
              scale: 1.05,
              borderColor: "hsl(var(--accent))",
              backgroundColor: "hsl(var(--accent) / 0.1)"
            }}
          >
            <h4 className="text-4xl sm:text-5xl md:text-6xl font-black text-accent mb-3">10+</h4>
            <p className="text-xs sm:text-sm text-primary/60 uppercase tracking-wider">Years Experience</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ShowreelHeroText = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Fade out when scrolling down, fade in when scrolling up
  const opacity = useTransform(scrollY, [0, 400, 800], [1, 0.5, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -150]);

  return (
    <motion.section 
      ref={heroRef}
      className="relative min-h-[70vh] flex items-center justify-center px-4 py-12"
      style={{ opacity, y }}
    >
      <motion.div 
        className="text-center space-y-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
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
        
        <div className="space-y-4 pt-8">
          <p className="text-base sm:text-lg md:text-xl text-primary/80 leading-relaxed font-light">
            We are a collective of indie creators pushing the boundaries of visual storytelling.
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-primary/80 leading-relaxed font-light">
            Our work spans media production, commercial advertising, fashion editorial, and wedding cinematography.
          </p>
          
          <p className="text-base sm:text-lg md:text-xl text-primary/80 leading-relaxed font-light">
            Each project is an opportunity to create something extraordinary.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default ShowreelHeroText;

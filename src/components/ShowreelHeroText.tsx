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
      className="relative h-[60vh] flex items-center justify-center px-4 py-12"
      style={{ opacity, y }}
    >
      <motion.div 
        className="text-center space-y-2"
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
      </motion.div>
    </motion.section>
  );
};

export default ShowreelHeroText;

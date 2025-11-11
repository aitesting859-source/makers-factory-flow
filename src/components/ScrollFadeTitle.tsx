import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollFadeTitle = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Fade out immediately on first scroll
  const opacity = useTransform(scrollY, [0, 150], [1, 0]);
  const y = useTransform(scrollY, [0, 150], [0, -30]);

  return (
    <motion.div 
      ref={titleRef}
      className="relative -mt-20 py-4 flex items-center justify-center"
      style={{ opacity, y }}
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary tracking-tight">
        THE MAKERS FACTORY
      </h2>
    </motion.div>
  );
};

export default ScrollFadeTitle;

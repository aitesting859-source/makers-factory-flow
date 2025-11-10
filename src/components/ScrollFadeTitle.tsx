import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollFadeTitle = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Fade out when scrolling down
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <motion.div 
      ref={titleRef}
      className="relative py-8 flex items-center justify-center"
      style={{ opacity, y }}
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-primary tracking-tight">
        THE MAKERS FACTORY
      </h2>
    </motion.div>
  );
};

export default ScrollFadeTitle;

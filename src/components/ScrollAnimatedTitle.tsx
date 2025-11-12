import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollAnimatedTitle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const words = ["THE", "MAKERS", "FACTORY"];
  
  return (
    <div ref={containerRef} className="relative min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4 px-4">
        {/* Animated Title */}
        <div className="space-y-2">
          {words.map((word, index) => {
            const start = index / words.length;
            const end = (index + 1) / words.length;
            
            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [0, 1, 1, 1]
            );
            
            const y = useTransform(
              scrollYProgress,
              [start, start + 0.2, end],
              [50, 0, 0]
            );
            
            const scale = useTransform(
              scrollYProgress,
              [start, start + 0.2, end],
              [0.8, 1, 1]
            );

            return (
              <motion.h2
                key={word}
                style={{ opacity, y, scale }}
                className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter ${
                  index === 0 ? 'text-primary' : 'text-accent'
                }`}
              >
                {word}
              </motion.h2>
            );
          })}
        </div>
        
        {/* Subtitle */}
        <motion.p
          style={{
            opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 1]),
            y: useTransform(scrollYProgress, [0.6, 0.8], [20, 0])
          }}
          className="text-xs sm:text-sm md:text-base text-primary/60 tracking-wider uppercase"
        >
          (Indie - Video Creators)
        </motion.p>
        
        {/* Description */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]),
            y: useTransform(scrollYProgress, [0.7, 0.9], [20, 0])
          }}
          className="space-y-3 pt-6 max-w-3xl mx-auto"
        >
          <p className="text-sm sm:text-base md:text-lg text-primary/80 leading-relaxed font-light">
            We are a collective of indie creators pushing the boundaries of visual storytelling.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-primary/80 leading-relaxed font-light">
            Our work spans media production, commercial advertising, fashion editorial, and wedding cinematography.
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-primary/80 leading-relaxed font-light">
            Each project is an opportunity to create something extraordinary.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollAnimatedTitle;

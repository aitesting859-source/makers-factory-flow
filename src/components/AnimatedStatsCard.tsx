import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedStatsCardProps {
  value: string;
  label: string;
  delay?: number;
}

const AnimatedStatsCard = ({ value, label, delay = 0 }: AnimatedStatsCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 sm:p-8 bg-gradient-to-br from-muted/50 to-background rounded-lg border border-primary/20 transition-colors duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: 1.05,
        borderColor: "hsl(var(--accent))",
        backgroundColor: "hsl(var(--accent) / 0.1)"
      }}
    >
      <motion.h4 
        className="text-4xl sm:text-5xl md:text-6xl font-black text-accent mb-3"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ 
          duration: 0.6, 
          delay: delay + 0.2,
          ease: "easeOut"
        }}
      >
        {value}
      </motion.h4>
      <motion.p 
        className="text-xs sm:text-sm text-primary/60 uppercase tracking-wider"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: delay + 0.4 
        }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedStatsCard;

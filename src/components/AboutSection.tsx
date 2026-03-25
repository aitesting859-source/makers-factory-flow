import { useEffect, useState } from 'react';
import AnimatedStatsCard from './AnimatedStatsCard';

interface AboutSectionProps {
  corner1?: string;
  corner2?: string;
  corner3?: string;
  corner4?: string;
  aboutTitle?: string;
  aboutDesc?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
}

const AboutSection = ({
  corner1 = '',
  corner2 = '',
  corner3 = '',
  corner4 = '',
  aboutTitle,
  aboutDesc,
  stat1Value = '50+',
  stat1Label = 'Projects Completed',
  stat2Value = '10+',
  stat2Label = 'Years Experience',
}: AboutSectionProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [blurAmount, setBlurAmount] = useState(10);

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

      {/* ── Corner Images anchored to section ── */}

      {/* Top Left */}
      {corner1 && (
        <div className="absolute top-8 left-8 w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 overflow-hidden transform rotate-2 opacity-60 z-10">
          <img src={corner1} alt="Visual storytelling" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Top Right */}
      {corner2 && (
        <div className="absolute top-8 right-8 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 overflow-hidden transform -rotate-3 opacity-60 z-10">
          <img src={corner2} alt="Creative process" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Bottom Left */}
      {corner3 && (
        <div className="absolute bottom-8 left-8 w-40 h-32 sm:w-48 sm:h-40 md:w-56 md:h-48 lg:w-64 lg:h-56 overflow-hidden transform -rotate-1 opacity-60 z-10">
          <img src={corner3} alt="Behind the scenes" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Bottom Right */}
      {corner4 && (
        <div className="absolute bottom-8 right-8 w-32 h-40 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 overflow-hidden transform rotate-3 opacity-60 z-10">
          <img src={corner4} alt="Final moments" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Center Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12">
        <div className="relative z-10 w-full">
        
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
          <AnimatedStatsCard value={stat1Value} label={stat1Label} delay={0} />
          <AnimatedStatsCard value={stat2Value} label={stat2Label} delay={0.15} />
        </div>
      </div>

    </section>
  );
};

export default AboutSection;
import { useEffect, useState } from 'react';
import aboutCorner1 from '@/assets/about-corner-1.jpg';
import aboutCorner2 from '@/assets/about-corner-2.jpg';
import aboutCorner3 from '@/assets/about-corner-3.jpg';
import aboutCorner4 from '@/assets/about-corner-4.jpg';

const AboutSection = () => {
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
      {/* Four Corner Images Layout */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-32">
        {/* Top Left Corner Image */}
        <div className="absolute top-8 left-8 w-64 h-64 md:w-80 md:h-80 overflow-hidden">
          <img 
            src={aboutCorner1} 
            alt="Visual storytelling" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Top Right Corner Image */}
        <div className="absolute top-8 right-8 w-64 h-64 md:w-80 md:h-80 overflow-hidden">
          <img 
            src={aboutCorner2} 
            alt="Creative process" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Left Corner Image */}
        <div className="absolute bottom-8 left-8 w-64 h-64 md:w-80 md:h-80 overflow-hidden">
          <img 
            src={aboutCorner3} 
            alt="Behind the scenes" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Right Corner Image */}
        <div className="absolute bottom-8 right-8 w-64 h-64 md:w-80 md:h-80 overflow-hidden">
          <img 
            src={aboutCorner4} 
            alt="Final moments" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-12">
          <div className="h-px w-24 bg-accent mx-auto" />
          
          <p className="text-2xl md:text-3xl text-primary/80 leading-relaxed font-light">
            We are a collective of indie creators pushing the boundaries of visual storytelling.
          </p>
          
          <p className="text-2xl md:text-3xl text-primary/80 leading-relaxed font-light">
            Our work spans media production, commercial advertising, fashion editorial, and fine art wedding cinematography.
          </p>
          
          <p className="text-2xl md:text-3xl text-primary/80 leading-relaxed font-light">
            Each project is an opportunity to create something extraordinary.
          </p>
          
          <div className="h-px w-24 bg-accent mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

import { useEffect, useState } from 'react';

const AboutSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative min-h-screen px-4 py-32 blur-load ${isLoaded ? 'loaded' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-primary mb-12 tracking-tight">
            CRAFTING VISUAL
            <br />
            <span className="text-accent">STORIES</span>
          </h2>
          
          <div className="max-w-2xl space-y-6 text-primary/80 text-lg leading-relaxed">
            <p>
              We are a collective of indie creators pushing the boundaries of visual storytelling.
              From cinematic productions to intimate editorial work, we bring passion and precision
              to every frame.
            </p>
            <p>
              Our work spans media production, commercial advertising, fashion editorial, and fine art
              wedding cinematography. Each project is an opportunity to create something extraordinary.
            </p>
          </div>
        </div>

        {/* Corner Photos */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-muted/50 to-transparent rounded-br-3xl overflow-hidden">
            <div className="w-full h-full bg-muted/30" />
          </div>

          {/* Top Right */}
          <div className="absolute top-20 right-0 w-48 h-72 bg-gradient-to-bl from-muted/50 to-transparent rounded-bl-3xl overflow-hidden">
            <div className="w-full h-full bg-muted/30" />
          </div>

          {/* Bottom Left */}
          <div className="absolute bottom-20 left-10 w-56 h-56 bg-gradient-to-tr from-muted/50 to-transparent rounded-tr-3xl overflow-hidden">
            <div className="w-full h-full bg-muted/30" />
          </div>

          {/* Bottom Right */}
          <div className="absolute bottom-0 right-20 w-72 h-48 bg-gradient-to-tl from-muted/50 to-transparent rounded-tl-3xl overflow-hidden">
            <div className="w-full h-full bg-muted/30" />
          </div>
        </div>

        {/* Decorative Accent Lines */}
        <div className="absolute top-1/2 left-0 w-24 h-px bg-gradient-to-r from-accent to-transparent" />
        <div className="absolute top-1/2 right-0 w-24 h-px bg-gradient-to-l from-accent to-transparent" />
      </div>
    </section>
  );
};

export default AboutSection;

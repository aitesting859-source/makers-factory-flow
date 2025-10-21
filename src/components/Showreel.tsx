import { useEffect, useRef, useState } from 'react';

const Showreel = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-32">
      {/* Showreel Container with 35mm Film Ratio (2.39:1) */}
      <div
        ref={videoRef}
        className={`relative w-full max-w-6xl aspect-[2.39/1] bg-muted rounded-sm overflow-hidden blur-load ${
          isLoaded ? 'loaded' : ''
        }`}
      >
        {/* Placeholder for showreel video */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-background">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto border-4 border-primary/30 border-t-accent rounded-full animate-spin" />
            <p className="text-primary/50 text-sm tracking-wider">SHOWREEL LOADING</p>
          </div>
        </div>
        
        {/* Film Grain Overlay */}
        <div className="absolute inset-0 grain-overlay pointer-events-none" />
        
        {/* Subtle Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60 pointer-events-none" />
      </div>

      {/* Film Frame Markers */}
      <div className="absolute top-32 left-0 right-0 flex justify-between px-4 max-w-6xl mx-auto opacity-20">
        <div className="flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-8 bg-primary rounded-sm" />
          ))}
        </div>
        <div className="flex gap-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-2 h-8 bg-primary rounded-sm" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showreel;

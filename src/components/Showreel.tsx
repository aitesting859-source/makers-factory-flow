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
      {/* Grain Background Animation */}
      <div className="absolute inset-0 grain-overlay opacity-30" />
      
      {/* Showreel Container with 35mm Film Ratio (2.39:1) */}
      <div
        ref={videoRef}
        className={`relative w-full max-w-6xl aspect-[2.39/1] bg-muted rounded-sm overflow-hidden blur-load ${
          isLoaded ? 'loaded' : ''
        }`}
      >
        {/* Showreel Video */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src="/showreel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
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

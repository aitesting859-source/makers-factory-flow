import { useEffect, useRef, useState } from 'react';
import VideoControls from './VideoControls';

const Showreel = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleScroll = () => {
      if (sectionRef.current) {
        const scrolled = window.scrollY;
        const fadePoint = window.innerHeight * 3;
        const opacity = Math.max(0, 1 - scrolled / fadePoint);
        setScrollOpacity(opacity);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleMute = () => {
    if (videoElementRef.current) {
      videoElementRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleToggleFullscreen = async () => {
    if (!videoRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await videoRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 py-32"
    >
      {/* Full Background Video */}
      <div className="fixed inset-0 w-full h-full -z-10" style={{ opacity: scrollOpacity }}>
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/showreel.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/40" />
      </div>
      
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
          ref={videoElementRef}
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
        
        {/* Video Controls */}
        <VideoControls
          isMuted={isMuted}
          isFullscreen={isFullscreen}
          onToggleMute={handleToggleMute}
          onToggleFullscreen={handleToggleFullscreen}
        />
        
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

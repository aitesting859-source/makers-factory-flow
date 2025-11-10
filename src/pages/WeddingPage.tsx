import { useEffect, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import InteractiveHoverText from '@/components/InteractiveHoverText';

const WeddingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <FloatingNav />
      
      <main className={`relative z-10 blur-load ${isLoaded ? 'loaded' : ''}`}>
        {/* Hero Section with Overlay Text */}
        <div className="relative h-screen">
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-background">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-primary/20 text-sm tracking-wider">HERO IMAGE</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
              <InteractiveHoverText 
                text="Wedding by TMF" 
                primaryColor="text-accent"
                hoverColor="text-primary"
              />
            </h1>
            <p className="text-xl md:text-3xl max-w-3xl font-light tracking-wide">
              <InteractiveHoverText 
                text="Stories of Love & Joy of Weddings" 
                primaryColor="text-primary"
                hoverColor="text-accent"
              />
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="px-4 py-32 max-w-5xl mx-auto text-center">
          <p className="text-lg md:text-xl text-primary/80 leading-relaxed mb-8">
            At The Makers Factory, we don't just capture weddings, we celebrate love in its most beautiful, raw, and unforgettable moments. Your love story deserves to be told with artistry and emotion.
          </p>
          <p className="text-base md:text-lg text-primary/60 leading-relaxed">
            We create cinematic wedding films that capture the emotions, the chaos, and the magic that make your love story one of a kind.
          </p>
        </div>

        {/* Beautiful Weddings Section */}
        <div className="px-4 pb-32">
          <h2 className="text-4xl md:text-6xl font-black text-center text-primary mb-16 tracking-tight">
            Beautiful Weddings, <span className="italic font-light text-accent">Breathtaking Films</span>
          </h2>
          
          {/* Video Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((video) => (
              <div key={video} className="group relative aspect-[9/16] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 hover:border-accent/50 transition-all duration-500 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-primary/30 text-sm tracking-wider">WEDDING FILM {video}</span>
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-accent hover:text-white transition-colors">
                    Watch Film
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WeddingPage;

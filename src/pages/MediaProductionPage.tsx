import { useEffect, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import InteractiveHoverText from '@/components/InteractiveHoverText';

const MediaProductionPage = () => {
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
      
      <main className={`relative z-10 px-4 py-32 min-h-screen blur-load ${isLoaded ? 'loaded' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight transition-transform duration-300 hover:scale-105">
              <InteractiveHoverText 
                text="Media Production" 
                primaryColor="text-primary"
                hoverColor="text-accent"
              />
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl tracking-wide transition-transform duration-300 hover:scale-105">
              <InteractiveHoverText 
                text="Cinematic storytelling for brands and artists" 
                primaryColor="text-primary/70"
                hoverColor="text-accent"
              />
            </p>
          </div>

          {/* Content */}
          <div className="space-y-16">
            <p className="text-lg text-primary/80 max-w-3xl leading-relaxed transition-transform duration-300 hover:scale-105">
              We create compelling visual narratives that capture attention and inspire action. Our media production services blend artistic vision with technical excellence.
            </p>

            {/* Project Section */}
            <div className="mt-32 space-y-16">
              {/* Project Title */}
              <h2 className="text-4xl md:text-6xl font-black text-center text-accent mb-16 tracking-tight">
                PROJECT SHOWCASE
              </h2>

              {/* Stills - Horizontal Auto-scroll */}
              <div className="relative overflow-hidden py-8">
                <div className="stills-scroll flex gap-6 group">
                  {[1, 2, 3, 4, 5, 6].map((still) => (
                    <div
                      key={still}
                      className="relative flex-shrink-0 w-[400px] h-[250px] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden transition-all duration-500 hover:scale-125 hover:z-10 hover:shadow-2xl group-hover:[&:not(:hover)]:blur-sm group-hover:[&:not(:hover)]:scale-90"
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-primary/30 text-sm tracking-wider">STILL {still}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Graded Picture */}
              <div className="mt-16">
                <h3 className="text-2xl md:text-4xl font-bold text-center text-primary mb-8 tracking-tight">
                  COLOR GRADED
                </h3>
                <div className="aspect-[21/9] bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg border border-accent/30 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/40 text-lg tracking-wider">COLOR GRADED IMAGE</span>
                  </div>
                </div>
              </div>

              {/* Final Trailer Video */}
              <div className="mt-16">
                <h3 className="text-2xl md:text-4xl font-bold text-center text-primary mb-8 tracking-tight">
                  FINAL OUTPUT
                </h3>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-background rounded-lg border border-primary/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/40 text-lg tracking-wider">TRAILER VIDEO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MediaProductionPage;

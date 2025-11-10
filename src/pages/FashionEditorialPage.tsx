import { useEffect, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import InteractiveHoverText from '@/components/InteractiveHoverText';

const FashionEditorialPage = () => {
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
        {/* Hero Mosaic Section */}
        <div className="min-h-screen px-4 py-32 flex items-center justify-center">
          <div className="max-w-7xl w-full">
            {/* Image Grid around Title */}
            <div className="grid grid-cols-12 gap-4 mb-8">
              {/* Top Left Image */}
              <div className="col-span-5 aspect-[4/3] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 1</span>
                </div>
              </div>
              
              {/* Top Center Small */}
              <div className="col-span-3 aspect-[3/4] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 2</span>
                </div>
              </div>
              
              {/* Top Right Image */}
              <div className="col-span-4 aspect-square bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 3</span>
                </div>
              </div>
            </div>

            {/* Center Title */}
            <div className="text-center py-16">
              <h1 className="text-6xl md:text-8xl font-serif mb-4 tracking-tight">
                <InteractiveHoverText 
                  text="Fashion Editorial" 
                  primaryColor="text-primary"
                  hoverColor="text-accent"
                />
              </h1>
              <p className="text-xl md:text-2xl font-light tracking-wide italic mb-6">
                <InteractiveHoverText 
                  text="stories told through style" 
                  primaryColor="text-primary/60"
                  hoverColor="text-accent"
                />
              </p>
              <div className="flex items-center justify-center gap-4 text-sm uppercase tracking-wider">
                <span className="text-accent">CATEGORY</span>
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <span className="text-primary/60">PHOTOGRAPHY</span>
              </div>
            </div>

            {/* Bottom Row Images */}
            <div className="grid grid-cols-12 gap-4">
              {/* Bottom Left */}
              <div className="col-span-4 aspect-[4/3] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 4</span>
                </div>
              </div>
              
              {/* Bottom Right */}
              <div className="col-span-8 aspect-[16/9] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 5</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Brief */}
        <div className="px-4 py-32 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 tracking-tight">
            Project Brief
          </h2>
          <p className="text-lg md:text-xl text-primary/70 leading-relaxed">
            Sophisticated fashion photography and videography that showcases style, beauty, and artistic expression. Our editorial work captures the essence of fashion through carefully composed frames that balance artistic vision with commercial appeal. Each shoot tells a unique story, blending style, emotion, and technical excellence.
          </p>
        </div>

        {/* SHOWCASE Section */}
        <div className="px-4 pb-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16 tracking-tight uppercase">
            Showcase
          </h2>
          
          {/* Stacked Full-Width Images */}
          <div className="max-w-7xl mx-auto space-y-8">
            {[1, 2, 3, 4, 5, 6].map((img) => (
              <div key={img} className="aspect-[16/9] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden hover:border-accent/50 transition-all duration-500">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-primary/30 text-lg tracking-wider">SHOWCASE IMAGE {img}</span>
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

export default FashionEditorialPage;

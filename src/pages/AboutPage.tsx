import { useEffect, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import aboutCorner1 from '@/assets/about-corner-1.jpg';
import aboutCorner3 from '@/assets/about-corner-3.jpg';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grain-overlay bg-background text-foreground min-h-screen">
      <FloatingNav />
      
      <section 
        className={`relative min-h-screen bg-background border-t border-border/10 blur-load ${isLoaded ? 'loaded' : ''}`}
      >
        {/* Hero Title */}
        <div className="relative h-screen flex items-center justify-center px-4">
          <div className="text-center space-y-8 max-w-6xl mx-auto">
            <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-primary leading-none tracking-tighter">
              THE
            </h1>
            <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-accent leading-none tracking-tighter -mt-12">
              MAKERS
            </h1>
            <h1 className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-primary leading-none tracking-tighter -mt-12">
              FACTORY
            </h1>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
            <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
          {/* Large Image + Text Block */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative h-[600px] overflow-hidden">
              <img 
                src={aboutCorner1} 
                alt="Visual storytelling" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            
            <div className="space-y-8">
              <h2 className="text-6xl md:text-7xl font-black text-primary tracking-tight leading-tight">
                CRAFTING
                <br />
                VISUAL
                <br />
                <span className="text-accent">STORIES</span>
              </h2>
              
              <div className="space-y-6 text-xl text-primary/70 leading-relaxed">
                <p>
                  We are a collective of indie creators pushing the boundaries of visual storytelling.
                </p>
                <p>
                  From cinematic productions to intimate editorial work, we bring passion and precision to every frame.
                </p>
              </div>
            </div>
          </div>

          {/* Centered Text Block */}
          <div className="max-w-4xl mx-auto text-center mb-32 space-y-12">
            <div className="h-px w-24 bg-accent mx-auto" />
            
            <p className="text-2xl md:text-3xl text-primary/80 leading-relaxed font-light">
              Our work spans media production, commercial advertising, fashion editorial, and fine art wedding cinematography.
            </p>
            
            <p className="text-2xl md:text-3xl text-primary/80 leading-relaxed font-light">
              Each project is an opportunity to create something extraordinary.
            </p>
            
            <div className="h-px w-24 bg-accent mx-auto" />
          </div>

          {/* Bottom Image */}
          <div className="relative h-[700px] overflow-hidden">
            <img 
              src={aboutCorner3} 
              alt="Behind the scenes" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-12 left-12 right-12">
              <h3 className="text-5xl md:text-7xl font-black text-primary tracking-tight">
                EVERY FRAME
                <br />
                <span className="text-accent">MATTERS</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

import { useEffect, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';

const AdCommercialsPage = () => {
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
          {/* Large Centered Title */}
          <div className="text-center mb-32">
            <h1 className="text-7xl md:text-9xl font-black text-primary tracking-tighter">
              AD COMMERCIALS
            </h1>
          </div>

          {/* Project List */}
          <div className="space-y-8">
            {[
              { title: 'LUXURY BRAND CAMPAIGN', client: 'PREMIUM BRANDS', duration: '90"', ratio: '16:9' },
              { title: 'TECH PRODUCT LAUNCH', client: 'INNOVATION CO', duration: '60"', ratio: '2.39:1' },
              { title: 'FASHION COLLECTION', client: 'HAUTE COUTURE', duration: '45"', ratio: '4:3' },
              { title: 'AUTOMOTIVE SHOWCASE', client: 'LUXURY MOTORS', duration: '120"', ratio: '16:9' },
              { title: 'LIFESTYLE BRAND', client: 'MODERN LIVING', duration: '30"', ratio: '1:1' },
              { title: 'CORPORATE IDENTITY', client: 'GLOBAL ENTERPRISE', duration: '75"', ratio: '16:9' },
            ].map((project, idx) => (
              <div key={idx} className="group">
                {/* Project Metadata Row */}
                <div className="grid grid-cols-4 gap-4 text-primary/60 text-sm uppercase tracking-wider mb-4 px-4">
                  <div className="col-span-2">{project.title}</div>
                  <div>{project.client}</div>
                  <div className="flex justify-between">
                    <span>{project.duration}</span>
                    <span>{project.ratio}</span>
                  </div>
                </div>
                
                {/* Project Thumbnail */}
                <div className="aspect-[21/9] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 hover:border-accent/50 transition-all duration-500 overflow-hidden group-hover:scale-[1.02]">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/30 text-lg tracking-wider">PROJECT PREVIEW</span>
                  </div>
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

export default AdCommercialsPage;

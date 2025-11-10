import { useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Showreel from '@/components/Showreel';
import ShowreelHeroText from '@/components/ShowreelHeroText';
import ScrollFadeTitle from '@/components/ScrollFadeTitle';
import AboutSection from '@/components/AboutSection';
import WorksSection from '@/components/WorksSection';
import PortfolioAbout from '@/components/PortfolioAbout';
import { VelocityScroll } from '@/components/VelocityScroll';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);

  if (showPreloader) {
    return <Preloader onLoadComplete={() => setShowPreloader(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Floating Navigation */}
      <FloatingNav />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Showreel Section */}
        <Showreel />
        
        {/* Title Below Showreel */}
        <ScrollFadeTitle />
        
        {/* Showreel Hero Text */}
        <ShowreelHeroText />
        
        {/* About Section with Four Corner Images */}
        <AboutSection />
        
        {/* Works Section */}
        <WorksSection />
        
        {/* Portfolio About Us Section */}
        <PortfolioAbout />
        
        {/* Velocity Scroll Animation */}
        <VelocityScroll 
          text="THE MAKERS FACTORY" 
          default_velocity={5} 
          className="text-6xl font-black text-primary/20"
        />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

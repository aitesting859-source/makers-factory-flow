import FloatingNav from '@/components/FloatingNav';
import Showreel from '@/components/Showreel';
import ShowreelHeroText from '@/components/ShowreelHeroText';
import AboutSection from '@/components/AboutSection';
import WorksSection from '@/components/WorksSection';
import { VelocityScroll } from '@/components/VelocityScroll';
import Footer from '@/components/Footer';

const Index = () => {
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
        
        {/* Showreel Hero Text */}
        <ShowreelHeroText />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Works Section */}
        <WorksSection />
        
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

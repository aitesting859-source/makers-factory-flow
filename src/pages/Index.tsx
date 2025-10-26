import FloatingNav from '@/components/FloatingNav';
import Showreel from '@/components/Showreel';
import ShowreelHeroText from '@/components/ShowreelHeroText';
import HeroText from '@/components/HeroText';
import AboutSection from '@/components/AboutSection';
import WorksSection from '@/components/WorksSection';
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
        
        {/* Hero Text Section */}
        <HeroText />
        
        {/* About Section */}
        <AboutSection />
        
        {/* Works Section */}
        <WorksSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;

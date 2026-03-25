import { useState } from "react";
import FloatingNav from "@/components/FloatingNav";
import Showreel from "@/components/Showreel";
import WorksSection from "@/components/WorksSection";
import PortfolioAbout from "@/components/PortfolioAbout";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { usePageContent } from "@/hooks/usePageContent";

const Index = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const { sections, loading } = usePageContent("homepage");

  const getMedia = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.media_url || "";

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || "";

  if (showPreloader || loading) {
    return <Preloader onLoadComplete={() => setShowPreloader(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <FloatingNav />
      <main className="relative z-10">

        {/* Showreel handles everything: video + title animation + about section */}
        <Showreel
          media={getMedia("showreel")}
          corner1={getMedia("about-corner-1")}
          corner2={getMedia("about-corner-2")}
          corner3={getMedia("about-corner-3")}
          corner4={getMedia("about-corner-4")}
          aboutTitle={getText("about-heading")}
          aboutDesc={getText("about-description")}
        />

        <WorksSection />
        <PortfolioAbout />

      </main>
      <Footer />
    </div>
  );
};

export default Index;
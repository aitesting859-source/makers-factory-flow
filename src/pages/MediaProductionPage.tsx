import { useEffect, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import InteractiveHoverText from '@/components/InteractiveHoverText';
import { usePageContent } from '@/hooks/usePageContent';

const MediaProductionPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { sections, loading } = usePageContent('media-production');

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  const getMedia = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.media_url || '';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Collect all still-N images from DB
  const stillImages = sections
    ?.filter((s: any) => s.section_id?.startsWith('still-') && s.media_url)
    .map((s: any) => s.media_url) || [];

  const colorGradedSection = sections?.find((s: any) => s.section_id === 'color-graded');
  const finalTrailerSection = sections?.find((s: any) => s.section_id === 'final-trailer');
  const showcaseSection = sections?.find((s: any) => s.section_id === 'project-showcase');

  const renderVideoSection = (section: any) => {
    if (!section) return null;
    if (section.content_type === 'video' && section.media_url) {
      return <video src={section.media_url} className="w-full h-full object-cover" controls />;
    }
    if (section.content_type === 'vimeo_url' && section.text_value) {
      return (
        <iframe
          src={section.text_value}
          className="w-full h-full"
          style={{ border: 0 }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={section.label}
        />
      );
    }
    return null;
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <FloatingNav />

      <main className={`relative z-10 px-4 py-32 min-h-screen blur-load ${isLoaded ? 'loaded' : ''}`}>
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight transition-transform duration-300 hover:scale-105">
              <InteractiveHoverText
                text={getText('page-title') || 'Media Production'}
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

          {/* DESCRIPTION */}
          <p className="text-lg text-primary/80 max-w-3xl leading-relaxed transition-transform duration-300 hover:scale-105">
            {getText('description') || 'We create compelling visual narratives that capture attention and inspire action.'}
          </p>

          {loading && (
            <div className="text-center py-10 animate-pulse text-primary/50">Loading content...</div>
          )}

          <div className="mt-32 space-y-16">

            {/* PROJECT TITLE */}
            <h2 className="text-4xl md:text-6xl font-black text-center text-accent mb-16 tracking-tight">
              PROJECT SHOWCASE
            </h2>

            {/* PROJECT SHOWCASE VIDEO */}
            {showcaseSection && renderVideoSection(showcaseSection) && (
              <div className="w-full aspect-video bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden mb-8">
                {renderVideoSection(showcaseSection)}
              </div>
            )}

            {/* STILLS — infinite marquee from still-1, still-2, still-3, still-4 */}
            <div className="relative overflow-hidden py-8">
              {stillImages.length > 0 ? (
                <div
                  className="flex gap-6"
                  style={{
                    width: 'max-content',
                    animation: 'marquee 20s linear infinite',
                  }}
                >
                  {[...stillImages, ...stillImages].map((url: string, i: number) => (
                    <div
                      key={i}
                      className="relative flex-shrink-0 w-[400px] h-[250px] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden transition-all duration-500 hover:scale-125 hover:z-10 hover:shadow-2xl"
                    >
                      <img src={url} alt={`Still ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative flex-shrink-0 w-[400px] h-[250px] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden flex items-center justify-center">
                      <span className="text-primary/30 text-sm tracking-wider">STILL {i}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COLOR GRADED — section_id: color-graded */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-4xl font-bold text-center text-primary mb-8 tracking-tight">
                COLOR GRADED
              </h3>
              <div className="aspect-[21/9] bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg border border-accent/30 overflow-hidden">
                {colorGradedSection?.media_url ? (
                  <img
                    src={colorGradedSection.media_url}
                    alt="Color graded"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/40 text-lg tracking-wider">COLOR GRADED IMAGE</span>
                  </div>
                )}
              </div>
            </div>

            {/* FINAL TRAILER — section_id: final-trailer */}
            <div className="mt-16">
              <h3 className="text-2xl md:text-4xl font-bold text-center text-primary mb-8 tracking-tight">
                FINAL OUTPUT
              </h3>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-background rounded-lg border border-primary/20 overflow-hidden">
                {finalTrailerSection ? (
                  renderVideoSection(finalTrailerSection) || (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-primary/40 text-lg tracking-wider">TRAILER VIDEO</span>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/40 text-lg tracking-wider">TRAILER VIDEO</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default MediaProductionPage;
import { useEffect, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import InteractiveHoverText from '@/components/InteractiveHoverText';
import { usePageContent } from '@/hooks/usePageContent';

const AdCommercialsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { sections, loading } = usePageContent('ad-commercials');

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // ✅ All project sections — any section that is NOT page-title
  const projects = sections?.filter((s: any) => s.section_id !== 'page-title') || [];

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <FloatingNav />

      <main className={`relative z-10 px-4 py-32 min-h-screen blur-load ${isLoaded ? 'loaded' : ''}`}>
        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <div className="text-center mb-32">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
              <InteractiveHoverText
                text={getText('page-title') || 'AD COMMERCIALS'}
                primaryColor="text-primary"
                hoverColor="text-accent"
              />
            </h1>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center text-xl font-bold py-20">Loading...</div>
          )}

          {/* PROJECTS */}
          {!loading && (
            <div className="space-y-8">
              {projects.map((section: any, idx: number) => (
                <div key={section.id} className="group">

                  {/* Metadata */}
                  <div className="grid grid-cols-4 gap-4 text-primary/60 text-sm uppercase tracking-wider mb-4 px-4">
                    <div className="col-span-2">{section.label || 'Untitled'}</div>
                    <div>{section.section_id}</div>
                    <div></div>
                  </div>

                  {/* Media */}
                  <div className="aspect-[21/9] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 hover:border-accent/50 transition-all duration-500 overflow-hidden group-hover:scale-[1.02]">
                    {section.content_type === 'vimeo_url' && section.text_value ? (
                      <iframe
                        src={section.text_value}
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={section.label}
                      />
                    ) : section.content_type === 'video' && section.media_url ? (
                      <video
                        src={section.media_url}
                        className="w-full h-full object-cover"
                        controls
                      />
                    ) : section.media_url ? (
                      <img
                        src={section.media_url}
                        alt={section.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-primary/30 text-lg tracking-wider">
                          PROJECT PREVIEW
                        </span>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdCommercialsPage;
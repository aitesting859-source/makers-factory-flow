import { useEffect, useState } from 'react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import InteractiveHoverText from '@/components/InteractiveHoverText';
import { usePageContent } from '@/hooks/usePageContent';

const FashionEditorialPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { sections, loading } = usePageContent('fashion-editorial');

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  const getMedia = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.media_url || '';

  const getGallery = (id: string): string[] =>
    sections?.find((s: any) => s.section_id === id)?.media_urls?.filter(Boolean) || [];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Match exact DB section IDs
  const editorial1 = getMedia('editorial-1');
  const editorial2 = getMedia('editorial-2');
  const editorial3 = getMedia('editorial-3');
  const editorial4 = getMedia('editorial-4');
  const editorial5 = getMedia('editorial-5');
  const showcaseImages = getGallery('showcase-images');
  const pageTitle = getText('page-title') || 'Fashion Editorial';
  const projectBrief = getText('project-brief') || 'Sophisticated fashion photography and videography.';

  const renderEditorialSlot = (url: string, label: string, className: string) => (
    <div className={`${className} bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden`}>
      {url ? (
        <img src={url} alt={label} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-primary/30 text-sm tracking-wider">EDITORIAL</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <FloatingNav />

      <main className={`relative z-10 blur-load ${isLoaded ? 'loaded' : ''}`}>

        {/* HERO MOSAIC SECTION */}
        <div className="min-h-screen px-4 py-32 flex items-center justify-center">
          <div className="max-w-7xl w-full">

            {/* TOP ROW — editorial-1, editorial-2, editorial-3 */}
            <div className="grid grid-cols-12 gap-4 mb-8">
              {renderEditorialSlot(editorial1, 'Editorial 1', 'col-span-5 aspect-[4/3]')}
              {renderEditorialSlot(editorial2, 'Editorial 2', 'col-span-3 aspect-[3/4]')}
              {renderEditorialSlot(editorial3, 'Editorial 3', 'col-span-4 aspect-square')}
            </div>

            {/* CENTER TITLE */}
            <div className="text-center py-16">
              <h1 className="text-6xl md:text-8xl font-serif mb-4 tracking-tight">
                <InteractiveHoverText
                  text={pageTitle}
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

            {/* BOTTOM ROW — editorial-4, editorial-5 */}
            <div className="grid grid-cols-12 gap-4">
              {renderEditorialSlot(editorial4, 'Editorial 4', 'col-span-4 aspect-[4/3]')}
              {renderEditorialSlot(editorial5, 'Editorial 5', 'col-span-8 aspect-[16/9]')}
            </div>

          </div>
        </div>

        {/* PROJECT BRIEF */}
        <div className="px-4 py-32 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 tracking-tight">
            Project Brief
          </h2>
          <p className="text-lg md:text-xl text-primary/70 leading-relaxed">
            {projectBrief}
          </p>
        </div>

        {loading && (
          <div className="text-center py-10 animate-pulse text-primary/50">
            Loading content...
          </div>
        )}

        {/* SHOWCASE SECTION — showcase-images gallery */}
        <div className="max-w-7xl mx-auto px-4 space-y-8 pb-32">
          {showcaseImages.length > 0 ? (
            <>
              <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-widest">
                Showcase
              </h2>
              {showcaseImages.map((url: string, i: number) => (
                <div
                  key={i}
                  className="aspect-[16/9] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden hover:border-accent/50 transition-all duration-500"
                >
                  <img src={url} alt={`Showcase ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </>
          ) : null}
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default FashionEditorialPage;
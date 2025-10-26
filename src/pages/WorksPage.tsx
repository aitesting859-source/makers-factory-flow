import { useParams } from 'react-router-dom';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';

const worksContent = {
  'media-production': {
    title: 'Media Production',
    description: 'Cinematic storytelling for brands and artists',
    content: 'We create compelling visual narratives that capture attention and inspire action. Our media production services blend artistic vision with technical excellence.',
  },
  'ad-commercials': {
    title: 'Ad Commercials',
    description: 'High-impact advertising content',
    content: 'Transform your brand message into memorable visual experiences. Our commercial work drives results through creative storytelling and strategic execution.',
  },
  'fashion-editorial': {
    title: 'Fashion Editorial',
    description: 'Elegant visual narratives',
    content: 'Sophisticated fashion photography and videography that showcases style, beauty, and artistic expression. Each frame tells a story of elegance and innovation.',
  },
  'fine-art-weddings': {
    title: 'Fine Art Weddings',
    description: 'Timeless moments captured beautifully',
    content: 'Your love story deserves to be told with artistry and emotion. We create cinematic wedding films that capture the essence of your special day.',
  },
};

const WorksPage = () => {
  const { category } = useParams<{ category: string }>();
  const [isLoaded, setIsLoaded] = useState(false);
  const work = category ? worksContent[category as keyof typeof worksContent] : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (!work) {
    return <div className="min-h-screen flex items-center justify-center">Work not found</div>;
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="grain-overlay" />
      <FloatingNav />
      
      <main className={`relative z-10 px-4 py-32 min-h-screen blur-load ${isLoaded ? 'loaded' : ''}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-6 tracking-tight transition-transform duration-300 hover:scale-105">
              {work.title.split(' ').map((word, i) => (
                <span key={i} className={i === work.title.split(' ').length - 1 ? 'text-accent' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-xl md:text-2xl text-primary/70 max-w-2xl tracking-wide transition-transform duration-300 hover:scale-105">
              {work.description}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-16">
            <p className="text-lg text-primary/80 max-w-3xl leading-relaxed transition-transform duration-300 hover:scale-105">
              {work.content}
            </p>

            {/* Project Section - Special layout for media-production */}
            {category === 'media-production' ? (
              <div className="mt-32 space-y-16">
                {/* Project Title */}
                <h2 className="text-4xl md:text-6xl font-black text-center text-accent mb-16 tracking-tight">
                  PROJECT SHOWCASE
                </h2>

                {/* Stills - Horizontal Auto-scroll */}
                <div className="relative overflow-hidden py-8">
                  <div className="stills-scroll flex gap-6 group">
                    {[1, 2, 3, 4, 5, 6].map((still) => (
                      <div
                        key={still}
                        className="relative flex-shrink-0 w-[400px] h-[250px] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden transition-all duration-500 hover:scale-125 hover:z-10 hover:shadow-2xl group-hover:[&:not(:hover)]:blur-sm group-hover:[&:not(:hover)]:scale-90"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-primary/30 text-sm tracking-wider">STILL {still}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Graded Picture */}
                <div className="mt-16">
                  <h3 className="text-2xl md:text-4xl font-bold text-center text-primary mb-8 tracking-tight">
                    COLOR GRADED
                  </h3>
                  <div className="aspect-[21/9] bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg border border-accent/30 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-primary/40 text-lg tracking-wider">COLOR GRADED IMAGE</span>
                    </div>
                  </div>
                </div>

                {/* Final Trailer Video */}
                <div className="mt-16">
                  <h3 className="text-2xl md:text-4xl font-bold text-center text-primary mb-8 tracking-tight">
                    FINAL OUTPUT
                  </h3>
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-background rounded-lg border border-primary/20 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-primary/40 text-lg tracking-wider">TRAILER VIDEO</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Portfolio Grid for other categories */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="aspect-[16/10] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 hover:border-accent/50 transition-all duration-500"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-primary/30 text-sm tracking-wider">PROJECT {item}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WorksPage;

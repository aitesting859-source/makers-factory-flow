import { useParams } from 'react-router-dom';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import FashionGallery from '@/components/FashionGallery';
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
  'wedding-by-tmf': {
    title: 'Wedding by TMF',
    description: 'Stories of Love & Joy of Weddings',
    content: 'At The Makers Factory, we don\'t just capture weddings, we celebrate love in its most beautiful, raw, and unforgettable moments. Your love story deserves to be told with artistry and emotion.',
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

  // Fashion Editorial - Event Photography style (TheBH)
  if (category === 'fashion-editorial') {
    return (
      <div className="relative min-h-screen bg-background">
        <div className="grain-overlay" />
        <FloatingNav />
        
        <main className={`relative z-10 blur-load ${isLoaded ? 'loaded' : ''}`}>
          {/* Hero Mosaic Section */}
          <div className="min-h-screen px-4 py-32 flex items-center justify-center">
            <div className="max-w-7xl w-full">
              {/* Image Grid around Title */}
              <div className="grid grid-cols-12 gap-4 mb-8">
                {/* Top Left Image */}
                <div className="col-span-5 aspect-[4/3] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 1</span>
                  </div>
                </div>
                
                {/* Top Center Small */}
                <div className="col-span-3 aspect-[3/4] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 2</span>
                  </div>
                </div>
                
                {/* Top Right Image */}
                <div className="col-span-4 aspect-square bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 3</span>
                  </div>
                </div>
              </div>

              {/* Center Title */}
              <div className="text-center py-16">
                <h1 className="text-6xl md:text-8xl font-serif text-primary mb-4 tracking-tight">
                  Fashion Editorial
                </h1>
                <p className="text-xl md:text-2xl text-primary/60 font-light tracking-wide italic mb-6">
                  stories told through style
                </p>
                <div className="flex items-center justify-center gap-4 text-sm uppercase tracking-wider">
                  <span className="text-accent">CATEGORY</span>
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  <span className="text-primary/60">PHOTOGRAPHY</span>
                </div>
              </div>

              {/* Bottom Row Images */}
              <div className="grid grid-cols-12 gap-4">
                {/* Bottom Left */}
                <div className="col-span-4 aspect-[4/3] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 4</span>
                  </div>
                </div>
                
                {/* Bottom Right */}
                <div className="col-span-8 aspect-[16/9] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/30 text-sm tracking-wider">EDITORIAL 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Brief */}
          <div className="px-4 py-32 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 tracking-tight">
              Project Brief
            </h2>
            <p className="text-lg md:text-xl text-primary/70 leading-relaxed">
              {work.content} Our editorial work captures the essence of fashion through carefully composed frames that balance artistic vision with commercial appeal. Each shoot tells a unique story, blending style, emotion, and technical excellence.
            </p>
          </div>

          {/* SHOWCASE Section */}
          <div className="px-4 pb-32">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16 tracking-tight uppercase">
              Showcase
            </h2>
            
            {/* Stacked Full-Width Images */}
            <div className="max-w-7xl mx-auto space-y-8">
              {[1, 2, 3, 4, 5, 6].map((img) => (
                <div key={img} className="aspect-[16/9] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden hover:border-accent/50 transition-all duration-500">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/30 text-lg tracking-wider">SHOWCASE IMAGE {img}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Ad Commercials - Documentary style (Chew Productions)
  if (category === 'ad-commercials') {
    return (
      <div className="relative min-h-screen bg-background">
        <div className="grain-overlay" />
        <FloatingNav />
        
        <main className={`relative z-10 px-4 py-32 min-h-screen blur-load ${isLoaded ? 'loaded' : ''}`}>
          <div className="max-w-7xl mx-auto">
            {/* Large Centered Title */}
            <div className="text-center mb-32">
              <h1 className="text-7xl md:text-9xl font-black text-primary tracking-tighter">
                {work.title.toUpperCase()}
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
  }

  // Wedding by TMF - Hero overlay style (KnotsbyAMP)
  if (category === 'wedding-by-tmf') {
    return (
      <div className="relative min-h-screen bg-background">
        <div className="grain-overlay" />
        <FloatingNav />
        
        <main className={`relative z-10 blur-load ${isLoaded ? 'loaded' : ''}`}>
          {/* Hero Section with Overlay Text */}
          <div className="relative h-screen">
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-background">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-primary/20 text-sm tracking-wider">HERO IMAGE</span>
              </div>
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tight">
                Wedding by TMF
              </h1>
              <p className="text-xl md:text-3xl text-white/90 max-w-3xl font-light tracking-wide">
                Stories of Love & Joy of Weddings
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="px-4 py-32 max-w-5xl mx-auto text-center">
            <p className="text-lg md:text-xl text-primary/80 leading-relaxed mb-8">
              {work.content}
            </p>
            <p className="text-base md:text-lg text-primary/60 leading-relaxed">
              We create cinematic wedding films that capture the emotions, the chaos, and the magic that make your love story one of a kind.
            </p>
          </div>

          {/* Beautiful Weddings Section */}
          <div className="px-4 pb-32">
            <h2 className="text-4xl md:text-6xl font-black text-center text-primary mb-16 tracking-tight">
              Beautiful Weddings, <span className="italic font-light text-accent">Breathtaking Films</span>
            </h2>
            
            {/* Video Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((video) => (
                <div key={video} className="group relative aspect-[9/16] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 hover:border-accent/50 transition-all duration-500 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-primary/30 text-sm tracking-wider">WEDDING FILM {video}</span>
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="px-6 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-accent hover:text-white transition-colors">
                      Watch Film
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // Default layout for other categories
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

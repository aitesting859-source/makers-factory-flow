import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import mediaProductionImg from '@/assets/work-media-production.jpg';
import adCommercialsImg from '@/assets/work-ad-commercials.jpg';
import fashionEditorialImg from '@/assets/work-fashion-editorial.jpg';
import fineArtWeddingsImg from '@/assets/work-fine-art-weddings.jpg';

const works = [
  {
    title: 'Media Production',
    path: '/works/media-production',
    description: 'Cinematic storytelling for brands and artists',
    image: mediaProductionImg,
  },
  {
    title: 'Ad Commercials',
    path: '/works/ad-commercials',
    description: 'High-impact advertising content',
    image: adCommercialsImg,
  },
  {
    title: 'Fashion Editorial',
    path: '/works/fashion-editorial',
    description: 'Elegant visual narratives',
    image: fashionEditorialImg,
  },
  {
    title: 'Fine Art Weddings',
    path: '/works/fine-art-weddings',
    description: 'Timeless moments captured beautifully',
    image: fineArtWeddingsImg,
  },
];

const WorksSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative min-h-screen px-4 py-32 border-t border-border/20 blur-load ${isLoaded ? 'loaded' : ''}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black text-primary mb-20 tracking-tight text-center">
          OUR <span className="text-accent">WORKS</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {works.map((work, index) => (
            <Link
              key={work.path}
              to={work.path}
              className="group relative overflow-hidden rounded-lg border border-primary/20 hover:border-accent/50 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[16/10] bg-gradient-to-br from-muted to-background overflow-hidden">
                {/* Background Image */}
                <img 
                  src={work.image} 
                  alt={work.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Content */}
                <div className="relative z-10 h-full p-12 flex flex-col justify-end">
                  <div className="space-y-3">
                    <h3 className="text-3xl md:text-4xl font-black text-primary group-hover:text-accent transition-colors tracking-tight">
                      {work.title}
                    </h3>
                    <p className="text-primary/60 text-sm tracking-wider">
                      {work.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Decorative Element */}
                <div className="absolute top-8 right-8 w-16 h-16 border-2 border-primary/20 group-hover:border-accent/50 rounded-full transition-colors duration-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;

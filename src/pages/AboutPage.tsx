import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import { VelocityScroll } from '@/components/VelocityScroll';
import InteractiveHoverText from '@/components/InteractiveHoverText';
import { usePageContent } from '@/hooks/usePageContent';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500, 1000], [1, 0.5, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);

  const { sections, loading } = usePageContent('about');

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  const getGallery = (id: string): string[] =>
    sections?.find((s: any) => s.section_id === id)?.media_urls?.filter(Boolean) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  // ✅ Match your exact DB section IDs
  const heroTitle = [
    getText('hero-title-1'),
    getText('hero-title-2'),
    getText('hero-title-3')
  ].filter(Boolean).join(' ') || 'THE MAKERS FACTORY';

  const aboutImages = getGallery('about-images');
  const visionTitle = getText('vision-title') || 'CRAFTING VISUAL STORIES';
  const visionDesc = getText('vision-description') || 'We create cinematic stories with precision and passion.';
  const philTitle = getText('philosophy-title') || 'CRAFT OVER CONTENT';
  const philDesc = getText('philosophy-description') || 'In a world saturated with content, we focus on craft.';

  return (
    <div className="grain-overlay bg-background text-foreground min-h-screen">
      <FloatingNav />

      {/* HERO */}
      <section className={`relative min-h-screen ${isLoaded ? 'loaded' : ''}`}>
        <motion.div
          className="h-screen flex items-center justify-center"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="text-center">
            <h1 className="text-[6rem] md:text-[10rem] font-black">
              <InteractiveHoverText
                text={heroTitle}
                primaryColor="text-primary"
                hoverColor="text-accent"
              />
            </h1>
          </div>
        </motion.div>
      </section>

      {/* IMAGE + TEXT BLOCK */}
      <section className="max-w-7xl mx-auto px-4 py-32 grid md:grid-cols-2 gap-16 items-center">

        {/* About images from gallery */}
        <div className="w-full h-[600px] overflow-hidden">
          {aboutImages.length > 0 ? (
            <motion.img
              src={aboutImages[0]}
              alt="About"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          ) : (
            <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
              <span className="text-primary/20 text-sm tracking-widest">NO IMAGE</span>
            </div>
          )}
        </div>

        <motion.div initial="hidden" whileInView="visible" variants={containerVariants}>
          <motion.h2 className="text-6xl font-black" variants={itemVariants}>
            {visionTitle}
          </motion.h2>
          <motion.p className="text-xl text-primary/70 mt-6" variants={itemVariants}>
            {visionDesc}
          </motion.p>
        </motion.div>
      </section>

      {/* PHILOSOPHY BLOCK */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <motion.div
          className="p-16 border border-border/10 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-5xl font-black mb-8 text-accent">{philTitle}</h3>
          <p className="text-xl text-primary/70 max-w-3xl mx-auto leading-relaxed">{philDesc}</p>
        </motion.div>
      </section>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-10 animate-pulse text-primary/50">
          Loading content...
        </div>
      )}

      <VelocityScroll text="THE MAKERS FACTORY" default_velocity={5} />

      <Footer />
    </div>
  );
};

export default AboutPage;
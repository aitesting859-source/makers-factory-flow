import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { usePageContent } from '@/hooks/usePageContent';

const WeddingLanding = () => {
  const { sections } = usePageContent('wedding-landing');

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  const getMedia = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.media_url || '';

  const getGallery = (id: string): string[] =>
    sections?.find((s: any) => s.section_id === id)?.media_urls?.filter(Boolean) || [];

  const heroVideo = getMedia('showreel') || '/showreel.mp4';
  const heroTitle = getText('hero-title') || 'Capturing Timeless Love Stories';
  const heroSubtitle = getText('hero-subtitle') || 'We create photographs and films that transcend time, preserving your most precious moments in cinematic artistry.';
  const aboutText = getText('about-text') || 'For almost a decade, Wedding by TMF has been creating photographs and films which are timeless and have been etched in the memories of thousands of people forever.';
  const aboutImage1 = getMedia('about-1');
  const aboutImage2 = getMedia('about-2');
  const statsWeddings = getText('stats-weddings') || '500+';
  const statsExperience = getText('stats-experience') || '10+';
  const featuredStories = getGallery('featured-stories');
  const filmsShowreelUrl = getMedia('films-showreel');
  const vimeo1 = getText('vimeo-1');
  const vimeo2 = getText('vimeo-2');
  const vimeo3 = getText('vimeo-3');
  const vimeo4 = getText('vimeo-4');
  const vimeoVideos = [vimeo1, vimeo2, vimeo3, vimeo4].filter(Boolean);

  const fallbackGallery = [
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800",
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800",
    "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
  ];

  const galleryImages = featuredStories.length > 0 ? featuredStories : fallbackGallery;
  const fallbackAbout1 = "https://images.unsplash.com/photo-1519741497674-611481863552?w=600";
  const fallbackAbout2 = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600";

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8] via-[#f5f0e8] to-[#ebe5db]" />

        <motion.div
          className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#d4a574]/10"
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-48 h-48 rounded-full bg-[#d4a574]/5"
          animate={{ y: [0, 20, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span
                className="text-[#d4a574] text-sm uppercase tracking-[0.3em] font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Wedding by TMF
              </motion.span>
              <motion.h1
                className="text-5xl md:text-7xl font-light text-[#1a1a1a] leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                {heroTitle.split(' ').slice(0, 1)}
                <br />
                <span className="italic font-serif text-[#d4a574]">
                  {heroTitle.split(' ').slice(1, 2)}
                </span>
                <br />
                {heroTitle.split(' ').slice(2).join(' ')}
              </motion.h1>
            </div>

            <motion.p
              className="text-[#1a1a1a]/60 text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {heroSubtitle}
            </motion.p>

            <motion.div
              className="flex gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <Link
                to="/works/wedding-by-tmf/photos"
                className="px-8 py-4 bg-[#1a1a1a] text-[#f5f0e8] text-sm uppercase tracking-wider hover:bg-[#d4a574] transition-colors duration-300"
              >
                View Photos
              </Link>
              <Link
                to="/works/wedding-by-tmf/films"
                className="px-8 py-4 border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-[#f5f0e8] transition-colors duration-300"
              >
                Watch Films
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Video Blob */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            <div className="relative w-full aspect-[4/5]">
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 85%, 75% 100%, 0% 100%, 0% 15%)" }}
                animate={{
                  clipPath: [
                    "polygon(25% 0%, 100% 0%, 100% 85%, 75% 100%, 0% 100%, 0% 15%)",
                    "polygon(20% 5%, 95% 0%, 100% 80%, 80% 100%, 5% 95%, 0% 20%)",
                    "polygon(25% 0%, 100% 0%, 100% 85%, 75% 100%, 0% 100%, 0% 15%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src={heroVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/30 to-transparent" />
              </motion.div>

              <motion.div
                className="absolute -inset-4 border-2 border-[#d4a574]/30"
                style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 85%, 75% 100%, 0% 100%, 0% 15%)" }}
                animate={{
                  clipPath: [
                    "polygon(25% 0%, 100% 0%, 100% 85%, 75% 100%, 0% 100%, 0% 15%)",
                    "polygon(20% 5%, 95% 0%, 100% 80%, 80% 100%, 5% 95%, 0% 20%)",
                    "polygon(25% 0%, 100% 0%, 100% 85%, 75% 100%, 0% 100%, 0% 15%)",
                  ],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              />

              <motion.div
                className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#d4a574]"
                style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[#1a1a1a]/40 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#1a1a1a]/40 to-transparent" />
        </motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section className="py-32 px-8 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <span className="text-[#d4a574] text-sm uppercase tracking-[0.3em]">About Us</span>
              <h2 className="text-4xl md:text-5xl font-light text-[#f5f0e8] leading-tight">
                Considered to be the epitome of
                <span className="text-[#d4a574] italic"> Modern Photography </span>
                and Filmmaking
              </h2>
              <p className="text-[#f5f0e8]/60 text-lg leading-relaxed">{aboutText}</p>
              <div className="flex gap-8 pt-4">
                <div>
                  <span className="text-4xl font-light text-[#d4a574]">{statsWeddings}</span>
                  <p className="text-[#f5f0e8]/60 text-sm uppercase tracking-wider mt-2">Weddings Captured</p>
                </div>
                <div>
                  <span className="text-4xl font-light text-[#d4a574]">{statsExperience}</span>
                  <p className="text-[#f5f0e8]/60 text-sm uppercase tracking-wider mt-2">Years Experience</p>
                </div>
              </div>
            </div>

            <div className="relative h-[500px]">
              <motion.img
                src={aboutImage1 || fallbackAbout1}
                alt="Wedding"
                className="absolute top-0 right-0 w-3/4 h-[300px] object-cover shadow-2xl"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              />
              <motion.img
                src={aboutImage2 || fallbackAbout2}
                alt="Wedding"
                className="absolute bottom-0 left-0 w-3/4 h-[300px] object-cover shadow-2xl border-4 border-[#1a1a1a]"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED STORIES ── */}
      <section className="py-32 px-8 bg-[#f5f0e8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#d4a574] text-sm uppercase tracking-[0.3em]">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mt-4">Featured Stories</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img: string, index: number) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden group ${index === 0 || index === 5 ? 'row-span-2' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    index === 0 || index === 5 ? 'h-full min-h-[400px]' : 'h-[250px]'
                  }`}
                />
                <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/40 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              to="/works/wedding-by-tmf/photos"
              className="inline-block px-12 py-4 border-2 border-[#1a1a1a] text-[#1a1a1a] text-sm uppercase tracking-wider hover:bg-[#1a1a1a] hover:text-[#f5f0e8] transition-colors duration-300"
            >
              View All Stories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CINEMATIC FILMS ── */}
      <section className="py-32 px-8 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src={filmsShowreelUrl || '/showreel.mp4'} type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="text-[#d4a574] text-sm uppercase tracking-[0.3em]">Cinematic Films</span>
            <h2 className="text-4xl md:text-6xl font-light text-[#f5f0e8] leading-tight">
              Stories that move you,
              <br />
              <span className="italic text-[#d4a574]">frame by frame</span>
            </h2>
            <p className="text-[#f5f0e8]/60 text-lg max-w-2xl mx-auto">
              Our wedding films are crafted with the same passion and attention to detail as our photography, creating cinematic memories that will last forever.
            </p>
            <Link
              to="/works/wedding-by-tmf/films"
              className="inline-block px-12 py-4 bg-[#d4a574] text-[#1a1a1a] text-sm uppercase tracking-wider hover:bg-[#f5f0e8] transition-colors duration-300"
            >
              Watch Our Films
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── VIMEO FILMS ── */}
      {vimeoVideos.length > 0 && (
        <section className="py-32 px-8 bg-[#1a1a1a]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-light text-[#f5f0e8] text-center mb-16 italic">Inspired by Cinema</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {vimeoVideos.map((url: string, i: number) => (
                <div key={i} className="aspect-video overflow-hidden rounded-lg">
                  <iframe
                    src={url}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={`Film ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CONTACT CTA ── */}
      <section className="py-32 px-8 bg-[#f5f0e8]">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#d4a574] text-sm uppercase tracking-[0.3em]">Get in Touch</span>
          <h2 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mt-4 mb-8">
            Let's create something beautiful together
          </h2>
          <p className="text-[#1a1a1a]/60 text-lg mb-12 max-w-2xl mx-auto">
            Every love story deserves to be told in its own unique way. Reach out to discuss how we can capture yours.
          </p>
          <Link
            to="/about"
            className="inline-block px-12 py-4 bg-[#1a1a1a] text-[#f5f0e8] text-sm uppercase tracking-wider hover:bg-[#d4a574] transition-colors duration-300"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default WeddingLanding;
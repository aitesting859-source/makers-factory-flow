import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePageContent } from '@/hooks/usePageContent';

const WeddingPhotos = () => {
  const { sections, loading } = usePageContent('wedding-photos');

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  const getGallery = (id: string): string[] =>
    sections?.find((s: any) => s.section_id === id)?.media_urls?.filter(Boolean) || [];

  const heroTitle = getText('hero-title') || 'Wedding Photography';
  const heroSubtitle = getText('hero-subtitle') || 'Every love story is unique.';
  const galleryImages = getGallery('gallery');

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">Loading...</div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 px-8 font-['Montserrat']">

      {/* HERO */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-8xl font-light text-[#1a1a1a] mb-6 tracking-tight">
          {heroTitle.split(' ').map((word: string, idx: number) =>
            word === 'Photography' ? (
              <span key={idx} className="italic text-[#d4a574]">{word} </span>
            ) : (
              word + ' '
            )
          )}
        </h1>
        <p className="text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto leading-relaxed">
          {heroSubtitle}
        </p>
      </motion.div>

      {/* GALLERY GRID */}
      {galleryImages.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((url: string, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={url}
                  alt={`Wedding photo ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center text-[#1a1a1a]/40 py-20">
          No photos added yet — upload images to the gallery section in Admin Panel
        </div>
      )}

    </div>
  );
};

export default WeddingPhotos;
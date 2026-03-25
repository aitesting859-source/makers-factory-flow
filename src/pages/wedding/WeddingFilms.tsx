import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const WeddingFilms = () => {
  const { sections, loading } = usePageContent('wedding-films');

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  const getGallery = (id: string): string[] =>
    sections?.find((s: any) => s.section_id === id)?.media_urls?.filter(Boolean) || [];

  // ✅ Match exact DB section IDs
  const heroTitle = getText('hero-title') || 'Wedding Films';
  const heroSubtitle = getText('hero-subtitle') || 'Inspired by Cinema.';
  const filmsGallery = getGallery('films-gallery');

  // All sections that are individual films (not hero text or gallery)
  const filmSections = sections?.filter((s: any) =>
    s.section_id !== 'hero-title' &&
    s.section_id !== 'hero-subtitle' &&
    s.section_id !== 'films-gallery'
  ) || [];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">Loading...</div>
  );

  return (
    <div className="min-h-screen font-['Montserrat']">

      {/* HERO */}
      <div className="relative h-[60vh] bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 to-[#1a1a1a]" />
        <motion.div className="relative z-10 text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-light italic text-[#f5f0e8] tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {heroSubtitle}
          </motion.h1>
          {heroTitle && (
            <motion.p
              className="text-[#d4a574] uppercase tracking-widest text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {heroTitle}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* FILMS GRID */}
      <div className="bg-[#f5f0e8] py-16 px-8">
        <div className="max-w-7xl mx-auto">

          {/* Films gallery — thumbnails from gallery section */}
          {filmsGallery.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filmsGallery.map((url: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative aspect-video overflow-hidden mb-4">
                    <img
                      src={url}
                      alt={`Film ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#1a1a1a]/30 group-hover:bg-[#1a1a1a]/50 transition-colors duration-300 flex items-center justify-center">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-[#d4a574] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Play className="w-6 h-6 text-white ml-1" />
                      </motion.div>
                    </div>
                  </div>
                  <p className="text-sm text-[#1a1a1a]/60 text-center">Film {index + 1}</p>
                </motion.div>
              ))}
            </div>

          ) : filmSections.length > 0 ? (
            /* Individual film sections */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filmSections.map((film: any, index: number) => (
                <motion.div
                  key={film.section_id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link to={`/works/wedding-by-tmf/films/${film.section_id}`}>
                    <div className="relative aspect-video overflow-hidden mb-4">
                      {film.media_url ? (
                        <img
                          src={film.media_url}
                          alt={film.label}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] flex items-center justify-center">
                          <span className="text-white/20 text-sm tracking-wider">NO THUMBNAIL</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-[#1a1a1a]/30 group-hover:bg-[#1a1a1a]/50 transition-colors duration-300 flex items-center justify-center">
                        <motion.div
                          className="w-16 h-16 rounded-full bg-[#d4a574] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Play className="w-6 h-6 text-white ml-1" />
                        </motion.div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-light text-[#1a1a1a] group-hover:text-[#d4a574] transition-colors">
                        {film.label || 'Untitled Film'}
                      </h3>
                      {film.text_value && (
                        <p className="text-sm text-[#1a1a1a]/60 line-clamp-2">{film.text_value}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          ) : (
            <div className="text-center text-[#1a1a1a]/40 py-20">
              No films added yet — upload thumbnails to the films-gallery section in Admin Panel
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default WeddingFilms;
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const WeddingFilmDetail = () => {
  const { filmId } = useParams();

  // Each film detail is its own page using filmId as page_id
  const { sections, loading } = usePageContent(`film-${filmId}`);

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  const getMedia = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.media_url || '';

  const videoSection = sections?.find((s: any) => s.section_id === 'film-video');
  const behindTheScenes = getText('behind-the-scenes');

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">Loading...</div>
  );

  if (!sections || sections.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
      <div className="text-center">
        <h1 className="text-4xl font-light text-[#1a1a1a] mb-4">Film Not Found</h1>
        <Link to="/works/wedding-by-tmf/films" className="text-[#d4a574] hover:underline">
          ← Back to Films
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* VIDEO HERO */}
      <div className="relative bg-[#1a1a1a]">
        <div className="aspect-video max-w-6xl mx-auto">
          {videoSection?.content_type === 'vimeo_url' && videoSection?.text_value ? (
            <iframe
              src={videoSection.text_value}
              className="w-full h-full"
              style={{ border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Wedding Film"
            />
          ) : videoSection?.content_type === 'video' && videoSection?.media_url ? (
            <video
              src={videoSection.media_url}
              className="w-full h-full object-cover"
              controls
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white/20 text-lg tracking-wider">NO VIDEO</span>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-8 py-16">

        {/* BACK LINK */}
        <Link
          to="/works/wedding-by-tmf/films"
          className="inline-flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#d4a574] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Films
        </Link>

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#d4a574] uppercase tracking-wider text-sm">
            {getText('category') || 'Wedding Film'}
          </span>
          <h1 className="text-4xl md:text-6xl font-light text-[#1a1a1a] mt-2 mb-4">
            {getText('couple') || 'Couple Name'}
          </h1>
          <p className="text-xl text-[#1a1a1a]/60 italic">
            {getText('tagline') || ''}
          </p>
        </motion.div>

        {/* META INFO */}
        <motion.div
          className="flex flex-wrap gap-8 my-8 py-8 border-y border-[#1a1a1a]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{getText('date') || ''}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{getText('location') || ''}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{getText('duration') || ''}</span>
          </div>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-light text-[#1a1a1a] mb-6">About This Film</h2>
          {(getText('description') || '').split('\n\n').map((para: string, idx: number) => (
            <p key={idx} className="text-[#1a1a1a]/70 leading-relaxed mb-6">{para}</p>
          ))}
        </motion.div>

        {/* BEHIND THE SCENES */}
        {behindTheScenes && (
          <motion.div
            className="mt-12 p-8 bg-[#1a1a1a] rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-light text-[#f5f0e8] mb-6">Behind the Scenes</h3>
            {behindTheScenes.split('\n\n').map((para: string, idx: number) => (
              <p key={idx} className="text-[#f5f0e8]/70 leading-relaxed mb-4">{para}</p>
            ))}
          </motion.div>
        )}

        {/* MORE FILMS CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#1a1a1a]/60 mb-4">Want to see more of our work?</p>
          <Link
            to="/works/wedding-by-tmf/films"
            className="inline-block px-8 py-3 border-2 border-[#d4a574] text-[#d4a574] rounded-full hover:bg-[#d4a574] hover:text-white transition-colors"
          >
            View All Films
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default WeddingFilmDetail;
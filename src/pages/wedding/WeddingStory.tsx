import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Heart } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const WeddingStory = () => {
  const { storyId } = useParams<{ storyId: string }>();

  // Each story is its own page in DB using storyId as page_id
  const { sections, loading } = usePageContent(`story-${storyId}`);

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  const getMedia = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.media_url || '';

  const getGallery = (id: string): string[] =>
    sections?.find((s: any) => s.section_id === id)?.media_urls?.filter(Boolean) || [];

  const heroSection = sections?.find((s: any) => s.section_id === 'hero-media');
  const galleryImages = getGallery('gallery');
  const hasBlog = getText('has-blog') === 'true';

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">Loading...</div>
  );

  if (!sections || sections.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
      <div className="text-center">
        <h1 className="text-4xl font-light text-[#1a1a1a] mb-4">Story Not Found</h1>
        <Link to="/works/wedding-by-tmf" className="text-[#d4a574] hover:underline">
          ← Back to Photos
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* HERO — image or video */}
      <div className="relative h-[70vh]">
        {heroSection?.content_type === 'video' && heroSection?.media_url ? (
          <video
            src={heroSection.media_url}
            controls
            className="w-full h-full object-cover"
          />
        ) : heroSection?.content_type === 'vimeo_url' && heroSection?.text_value ? (
          <iframe
            src={heroSection.text_value}
            className="w-full h-full"
            style={{ border: 0 }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Story Hero"
          />
        ) : heroSection?.media_url ? (
          <img
            src={heroSection.media_url}
            alt={getText('couple')}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4a574] uppercase tracking-wider text-sm mb-4 block">
              {getText('category') || 'Wedding'}
            </span>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-4">
              {getText('couple') || 'Couple Name'}
            </h1>
            <p className="text-xl text-white/80 italic">
              {getText('tagline') || ''}
            </p>
          </motion.div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <Link
          to="/works/wedding-by-tmf"
          className="inline-flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#d4a574] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>

        {/* META INFO */}
        <motion.div
          className="flex flex-wrap gap-8 mb-12 pb-12 border-b border-[#1a1a1a]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
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
            <Heart className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{getText('category') || ''}</span>
          </div>
        </motion.div>

        {/* STORY DESCRIPTION */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {(getText('description') || '').split('\n\n').map((paragraph: string, index: number) => (
            <p key={index} className="text-[#1a1a1a]/70 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* BLOG LINK */}
        {hasBlog && (
          <motion.div
            className="mt-12 p-8 bg-[#1a1a1a] rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-light text-[#f5f0e8] mb-4">
              Read the Full Story
            </h3>
            <p className="text-[#f5f0e8]/60 mb-6">
              Dive deeper into {getText('couple')}'s wedding journey with our detailed blog post.
            </p>
            <Link
              to={`/works/wedding-by-tmf/blog/${storyId}`}
              className="inline-block px-8 py-3 bg-[#d4a574] text-white rounded-full hover:bg-[#c49464] transition-colors"
            >
              Read Blog Post →
            </Link>
          </motion.div>
        )}

        {/* GALLERY */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {galleryImages.map((img: string, idx: number) => (
            <div
              key={idx}
              className={`overflow-hidden rounded-lg ${idx === 0 ? 'md:row-span-2' : ''}`}
            >
              <img
                src={img}
                alt={`${getText('couple')} - ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default WeddingStory;
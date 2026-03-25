import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const WeddingBlog = () => {
  const { blogId } = useParams();

  // Each blog is its own page using blogId as page_id
  const { sections, loading } = usePageContent(`blog-${blogId}`);

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  const getMedia = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.media_url || '';

  const getGallery = (id: string): string[] =>
    sections?.find((s: any) => s.section_id === id)?.media_urls?.filter(Boolean) || [];

  // All content blocks ordered by sort_order
  const contentBlocks = sections?.filter((s: any) =>
    s.section_id?.startsWith('block-')
  ) || [];

  const tags = getText('tags').split(',').map((t: string) => t.trim()).filter(Boolean);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">Loading...</div>
  );

  if (!sections || sections.length === 0) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
      <div className="text-center">
        <h1 className="text-4xl font-light text-[#1a1a1a] mb-4">Blog Not Found</h1>
        <Link to="/works/wedding-by-tmf" className="text-[#d4a574] hover:underline">
          ← Back to Photos
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* HERO */}
      <div className="relative h-[60vh]">
        {getMedia('cover-image') ? (
          <img
            src={getMedia('cover-image')}
            alt={getText('title')}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4a574] uppercase tracking-wider text-sm">Wedding Blog</span>
            <h1 className="text-4xl md:text-5xl font-light text-white mt-4 mb-2">
              {getText('title') || 'Blog Title'}
            </h1>
            <p className="text-lg text-white/70 italic">{getText('subtitle') || ''}</p>
          </motion.div>
        </div>
      </div>

      {/* ARTICLE */}
      <article className="max-w-3xl mx-auto px-8 py-16">

        {/* BACK LINK */}
        <Link
          to={`/works/wedding-by-tmf/story/${blogId}`}
          className="inline-flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#d4a574] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Story
        </Link>

        {/* META */}
        <motion.div
          className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-[#1a1a1a]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm text-[#1a1a1a]/70">{getText('author') || 'TMF Studios'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm text-[#1a1a1a]/70">{getText('date') || ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm text-[#1a1a1a]/70">{getText('read-time') || ''}</span>
          </div>
          <button className="ml-auto flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#d4a574] transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </motion.div>

        {/* CONTENT BLOCKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {contentBlocks.map((block: any, index: number) => {
            if (block.content_type === 'text') {
              // Use label to distinguish paragraph vs heading vs quote
              if (block.label === 'heading') {
                return (
                  <h2 key={index} className="text-2xl font-light text-[#1a1a1a] mt-12 mb-6">
                    {block.text_value}
                  </h2>
                );
              }
              if (block.label === 'quote') {
                const [quoteText, quoteAuthor] = (block.text_value || '').split('||');
                return (
                  <blockquote key={index} className="my-10 pl-6 border-l-4 border-[#d4a574]">
                    <p className="text-xl italic text-[#1a1a1a]/80 mb-2">{quoteText}</p>
                    {quoteAuthor && (
                      <cite className="text-sm text-[#d4a574]">— {quoteAuthor.trim()}</cite>
                    )}
                  </blockquote>
                );
              }
              // Default: paragraph
              return (
                <p key={index} className="text-[#1a1a1a]/70 leading-relaxed mb-6 text-lg">
                  {block.text_value}
                </p>
              );
            }
            if (block.content_type === 'image' && block.media_url) {
              return (
                <figure key={index} className="my-10">
                  <img
                    src={block.media_url}
                    alt={block.label || ''}
                    className="w-full rounded-lg"
                  />
                  {block.label && (
                    <figcaption className="text-center text-sm text-[#1a1a1a]/50 mt-3 italic">
                      {block.label}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return null;
          })}
        </motion.div>

        {/* TAGS */}
        {tags.length > 0 && (
          <motion.div
            className="mt-12 pt-8 border-t border-[#1a1a1a]/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-sm text-[#1a1a1a]/50 uppercase tracking-wider">Tags:</span>
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-4 py-1 bg-[#1a1a1a]/5 text-[#1a1a1a]/70 text-sm rounded-full hover:bg-[#d4a574] hover:text-white transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* VIEW GALLERY CTA */}
        <motion.div
          className="mt-12 p-8 bg-[#1a1a1a] rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-light text-[#f5f0e8] mb-4">View the Full Gallery</h3>
          <p className="text-[#f5f0e8]/60 mb-6">
            See all the photos from this beautiful celebration.
          </p>
          <Link
            to={`/works/wedding-by-tmf/story/${blogId}`}
            className="inline-block px-8 py-3 bg-[#d4a574] text-white rounded-full hover:bg-[#c49464] transition-colors"
          >
            View Photo Gallery →
          </Link>
        </motion.div>

      </article>
    </div>
  );
};

export default WeddingBlog;
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';

const blogs = {
  'priya-arjun': {
    couple: 'Priya & Arjun',
    title: 'A Royal Wedding in the City of Lakes',
    subtitle: 'Three days of celebration, tradition, and endless love in Udaipur',
    author: 'The TMF Team',
    date: 'April 2, 2024',
    readTime: '8 min read',
    coverImage: 'https://images.unsplash.com/photo-1583089892943-c7ec8ee4f0b1?w=1600&h=900&fit=crop',
    content: [
      {
        type: 'paragraph',
        text: "When we first received the inquiry from Priya's mother about documenting her daughter's wedding, we knew this would be special. But nothing could have prepared us for the absolute magic that unfolded over those three incredible days in Udaipur.",
      },
      {
        type: 'heading',
        text: 'Day One: The Mehendi Ceremony',
      },
      {
        type: 'paragraph',
        text: "The celebrations began at the Oberoi Udaivilas, where the mehendi ceremony was held in the lush gardens overlooking Lake Pichola. Priya, dressed in a vibrant yellow lehenga, sat surrounded by her closest friends and family as intricate henna designs were applied to her hands.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&h=800&fit=crop',
        caption: 'The mehendi ceremony in the gardens of Oberoi Udaivilas',
      },
      {
        type: 'paragraph',
        text: "What struck us most was the laughter. Everywhere you looked, there were moments of pure joy—cousins dancing, aunties singing traditional songs, and Arjun sneaking in to catch a glimpse of his bride-to-be.",
      },
      {
        type: 'heading',
        text: 'Day Two: The Sangeet Night',
      },
      {
        type: 'paragraph',
        text: "If the mehendi was intimate, the sangeet was spectacular. Both families had been secretly choreographing performances for months, and the friendly competition was electric. The evening was held on a boat floating on Lake Pichola, with the City Palace illuminated in the background.",
      },
      {
        type: 'quote',
        text: "\"We wanted our wedding to be a celebration of both our families coming together. The sangeet was where that truly happened.\"",
        author: 'Priya',
      },
      {
        type: 'paragraph',
        text: "Arjun's brothers performed a Bollywood medley that had everyone on their feet, while Priya's surprise performance to her husband-to-be brought tears to many eyes. These are the moments we live for as photographers—the raw, unscripted emotions that tell the real story.",
      },
      {
        type: 'heading',
        text: 'Day Three: The Wedding',
      },
      {
        type: 'paragraph',
        text: "The main event took place at the City Palace, with permissions that took months to secure. Arjun arrived on a decorated white horse, his baraat a procession of music, dancing, and celebration that wound through the ancient streets of Udaipur.",
      },
      {
        type: 'image',
        src: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1200&h=800&fit=crop',
        caption: "Arjun's baraat procession through Udaipur's streets",
      },
      {
        type: 'paragraph',
        text: "The wedding ceremony itself was held at sunset, with the Aravalli hills turning gold behind the mandap. As Priya and Arjun took their pheras, you could feel the weight of the moment—two souls, two families, becoming one.",
      },
      {
        type: 'heading',
        text: 'Our Approach to the Coverage',
      },
      {
        type: 'paragraph',
        text: "For a wedding of this scale, we deployed a team of four photographers and two cinematographers. Our goal was to be everywhere while remaining invisible—to capture the grandeur of the celebrations while not missing the quiet, tender moments that happen in between.",
      },
      {
        type: 'paragraph',
        text: "We used a mix of equipment, from wide-angle lenses to capture the palace's architecture to long telephoto lenses that allowed us to photograph intimate moments from a respectful distance. Drone coverage was limited to specific times to avoid disrupting the ceremonies.",
      },
      {
        type: 'heading',
        text: 'Final Thoughts',
      },
      {
        type: 'paragraph',
        text: "Documenting Priya and Arjun's wedding was more than a professional assignment—it was a privilege. Their love for each other, their respect for their families, and their joy in every moment reminded us why we do what we do.",
      },
      {
        type: 'paragraph',
        text: "To the happy couple: thank you for trusting us with your story. May your journey together be as beautiful as your beginning.",
      },
    ],
    tags: ['Indian Wedding', 'Udaipur', 'Destination Wedding', 'Palace Wedding'],
  },
};

const WeddingBlog = () => {
  const { blogId } = useParams();
  const blog = blogs[blogId as keyof typeof blogs];

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <div className="text-center">
          <h1 className="text-4xl font-light text-[#1a1a1a] mb-4">Blog Not Found</h1>
          <Link to="/works/wedding-by-tmf" className="text-[#d4a574] hover:underline">
            ← Back to Photos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Hero */}
      <div className="relative h-[60vh]">
        <img 
          src={blog.coverImage} 
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4a574] uppercase tracking-wider text-sm">Wedding Blog</span>
            <h1 className="text-4xl md:text-5xl font-light text-white mt-4 mb-2">
              {blog.title}
            </h1>
            <p className="text-lg text-white/70 italic">{blog.subtitle}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-8 py-16">
        {/* Back Link */}
        <Link 
          to={`/works/wedding-by-tmf/story/${blogId}`}
          className="inline-flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#d4a574] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>

        {/* Meta */}
        <motion.div 
          className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-[#1a1a1a]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm text-[#1a1a1a]/70">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm text-[#1a1a1a]/70">{blog.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#d4a574]" />
            <span className="text-sm text-[#1a1a1a]/70">{blog.readTime}</span>
          </div>
          <button className="ml-auto flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#d4a574] transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {blog.content.map((block, index) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p key={index} className="text-[#1a1a1a]/70 leading-relaxed mb-6 text-lg">
                    {block.text}
                  </p>
                );
              case 'heading':
                return (
                  <h2 key={index} className="text-2xl font-light text-[#1a1a1a] mt-12 mb-6">
                    {block.text}
                  </h2>
                );
              case 'image':
                return (
                  <figure key={index} className="my-10">
                    <img 
                      src={block.src} 
                      alt={block.caption}
                      className="w-full rounded-lg"
                    />
                    <figcaption className="text-center text-sm text-[#1a1a1a]/50 mt-3 italic">
                      {block.caption}
                    </figcaption>
                  </figure>
                );
              case 'quote':
                return (
                  <blockquote key={index} className="my-10 pl-6 border-l-4 border-[#d4a574]">
                    <p className="text-xl italic text-[#1a1a1a]/80 mb-2">{block.text}</p>
                    <cite className="text-sm text-[#d4a574]">— {block.author}</cite>
                  </blockquote>
                );
              default:
                return null;
            }
          })}
        </motion.div>

        {/* Tags */}
        <motion.div 
          className="mt-12 pt-8 border-t border-[#1a1a1a]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-sm text-[#1a1a1a]/50 uppercase tracking-wider">Tags:</span>
          <div className="flex flex-wrap gap-2 mt-3">
            {blog.tags.map((tag) => (
              <span 
                key={tag}
                className="px-4 py-1 bg-[#1a1a1a]/5 text-[#1a1a1a]/70 text-sm rounded-full hover:bg-[#d4a574] hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* View Photo Gallery CTA */}
        <motion.div
          className="mt-12 p-8 bg-[#1a1a1a] rounded-lg text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-light text-[#f5f0e8] mb-4">View the Full Gallery</h3>
          <p className="text-[#f5f0e8]/60 mb-6">
            See all the photos from Priya & Arjun's beautiful celebration.
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

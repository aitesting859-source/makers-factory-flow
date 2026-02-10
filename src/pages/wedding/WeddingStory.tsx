import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Heart } from 'lucide-react';
import { useMediaConfig } from '@/lib/mediaConfig';

const stories = {
  'priya-arjun': {
    couple: 'Priya & Arjun',
    location: 'Udaipur, India',
    date: 'March 15-18, 2024',
    tagline: 'A Royal Celebration of Love',
    description: `When Priya and Arjun first met at a mutual friend's wedding, they never imagined they'd be planning their own royal celebration just two years later. Their love story began with shared laughter and grew into something extraordinary.

The City of Lakes provided the perfect backdrop for their three-day celebration. From the intimate Mehendi ceremony at the Oberoi Udaivilas to the grand reception at the City Palace, every moment was crafted with love and attention to detail.

We were honored to capture their journey—the nervous excitement of the morning rituals, the joyful chaos of the baraat, and the tender moments shared during the pheras. This wasn't just a wedding; it was a celebration of two families coming together, of traditions being honored, and of a love story beginning its next chapter.`,
    images: [
      'https://images.unsplash.com/photo-1583089892943-c7ec8ee4f0b1?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=900&fit=crop',
    ],
    category: 'Indian Wedding',
    hasBlog: true,
  },
  'sarah-michael': {
    couple: 'Sarah & Michael',
    location: 'Tuscany, Italy',
    date: 'February 20, 2024',
    tagline: 'Love Among the Vineyards',
    description: `Sarah and Michael's love for travel and fine wine led them to the rolling hills of Tuscany for their intimate destination wedding. With just 50 of their closest friends and family, they exchanged vows as the sun set over centuries-old olive groves.

The day began with Sarah getting ready in a restored 16th-century villa, her laughter echoing through ancient stone corridors. Michael waited at the ceremony site, surrounded by cypress trees and the sweet scent of Italian spring.

Their first look was pure magic—a moment of overwhelming emotion as Michael saw his bride for the first time. The ceremony, conducted in both English and Italian, was followed by a farm-to-table dinner under string lights, with local wines and heartfelt toasts lasting well into the night.`,
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop',
    ],
    category: 'Destination Wedding',
    hasBlog: false,
  },
};

const WeddingStory = () => {
  const { storyId } = useParams();
  const { resolveMediaUrl } = useMediaConfig();
  const story = stories[storyId as keyof typeof stories];

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <div className="text-center">
          <h1 className="text-4xl font-light text-[#1a1a1a] mb-4">Story Not Found</h1>
          <Link to="/works/wedding-by-tmf" className="text-[#d4a574] hover:underline">
            ← Back to Photos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Hero Image */}
      <div className="relative h-[70vh]">
        <img 
          src={resolveMediaUrl(story.images[0])} 
          alt={story.couple}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4a574] uppercase tracking-wider text-sm mb-4 block">
              {story.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-light text-white mb-4">
              {story.couple}
            </h1>
            <p className="text-xl text-white/80 italic">{story.tagline}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Back Link */}
        <Link 
          to="/works/wedding-by-tmf"
          className="inline-flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#d4a574] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Gallery
        </Link>

        {/* Meta Info */}
        <motion.div 
          className="flex flex-wrap gap-8 mb-12 pb-12 border-b border-[#1a1a1a]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{story.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{story.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{story.category}</span>
          </div>
        </motion.div>

        {/* Story Text */}
        <motion.div
          className="prose prose-lg max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {story.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-[#1a1a1a]/70 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Blog Link */}
        {story.hasBlog && (
          <motion.div
            className="mt-12 p-8 bg-[#1a1a1a] rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-2xl font-light text-[#f5f0e8] mb-4">Read the Full Story</h3>
            <p className="text-[#f5f0e8]/60 mb-6">
              Dive deeper into Priya & Arjun's wedding journey with our detailed blog post.
            </p>
            <Link 
              to={`/works/wedding-by-tmf/blog/${storyId}`}
              className="inline-block px-8 py-3 bg-[#d4a574] text-white rounded-full hover:bg-[#c49464] transition-colors"
            >
              Read Blog Post →
            </Link>
          </motion.div>
        )}

        {/* Image Gallery */}
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {story.images.slice(1).map((image, index) => (
            <div 
              key={index} 
              className={`overflow-hidden rounded-lg ${index === 0 ? 'md:row-span-2' : ''}`}
            >
              <img 
                src={resolveMediaUrl(image)} 
                alt={`${story.couple} - ${index + 1}`}
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

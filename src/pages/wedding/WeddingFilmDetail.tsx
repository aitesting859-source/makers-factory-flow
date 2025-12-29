import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Clock, Play } from 'lucide-react';

const films = {
  'priya-arjun-film': {
    couple: 'Priya & Arjun',
    location: 'Udaipur, India',
    date: 'March 2024',
    duration: '12:34',
    category: 'Classic Story Telling',
    tagline: 'A Royal Celebration of Love',
    videoUrl: 'https://player.vimeo.com/video/76979871',
    thumbnail: 'https://images.unsplash.com/photo-1583089892943-c7ec8ee4f0b1?w=1200&h=800&fit=crop',
    description: `This film captures the essence of a grand Indian wedding set against the majestic backdrop of Udaipur. From the colorful mehendi ceremony to the emotional vidaai, we documented every precious moment of Priya and Arjun's celebration.

Our approach was to blend documentary-style coverage with cinematic storytelling, creating a film that feels both authentic and artistically crafted. The result is a love letter to their union—a film they'll cherish for generations to come.`,
    behindTheScenes: `Working with Priya and Arjun was an absolute joy. Their energy was infectious, and their families welcomed us like we were part of the celebration. We used a combination of drone footage for the palace exteriors, gimbal work for the ceremonies, and intimate handheld shots for the quieter moments.

The film was color graded to enhance the warm, golden tones of the Rajasthani sunset, creating a cohesive visual narrative throughout.`,
  },
  'sarah-michael-film': {
    couple: 'Sarah & Michael',
    location: 'Tuscany, Italy',
    date: 'February 2024',
    duration: '15:20',
    category: 'New Age Modern',
    tagline: 'Love Among the Vineyards',
    videoUrl: 'https://player.vimeo.com/video/76979871',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
    description: `An artistic exploration of love in the Italian countryside, this film tells the story of Sarah and Michael's intimate destination wedding. We focused on capturing the quiet, tender moments that often go unnoticed—the nervous glances, the supportive hand squeezes, the joyful tears.

The Tuscan landscape became a character in itself, with rolling hills and golden light framing every scene. Set to a custom score, this film is as much a sensory experience as it is a documentation of their day.`,
    behindTheScenes: `We spent three days in Tuscany, arriving early to scout locations and capture b-roll of the stunning landscape. The couple was incredibly trusting, allowing us to document their most vulnerable moments. The first look scene, in particular, required patience and sensitivity—we positioned ourselves at a distance with long lenses to capture their genuine reactions.`,
  },
};

const WeddingFilmDetail = () => {
  const { filmId } = useParams();
  const film = films[filmId as keyof typeof films];

  if (!film) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8]">
        <div className="text-center">
          <h1 className="text-4xl font-light text-[#1a1a1a] mb-4">Film Not Found</h1>
          <Link to="/works/wedding-by-tmf/films" className="text-[#d4a574] hover:underline">
            ← Back to Films
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Video Hero */}
      <div className="relative bg-[#1a1a1a]">
        <div className="aspect-video max-w-6xl mx-auto">
          <iframe
            src={film.videoUrl}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Back Link */}
        <Link 
          to="/works/wedding-by-tmf/films"
          className="inline-flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#d4a574] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Films
        </Link>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#d4a574] uppercase tracking-wider text-sm">{film.category}</span>
          <h1 className="text-4xl md:text-6xl font-light text-[#1a1a1a] mt-2 mb-4">
            {film.couple}
          </h1>
          <p className="text-xl text-[#1a1a1a]/60 italic">{film.tagline}</p>
        </motion.div>

        {/* Meta Info */}
        <motion.div 
          className="flex flex-wrap gap-8 my-8 py-8 border-y border-[#1a1a1a]/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{film.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{film.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#d4a574]" />
            <span className="text-[#1a1a1a]/70">{film.duration}</span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-light text-[#1a1a1a] mb-6">About This Film</h2>
          {film.description.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-[#1a1a1a]/70 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Behind the Scenes */}
        <motion.div
          className="mt-12 p-8 bg-[#1a1a1a] rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-light text-[#f5f0e8] mb-6">Behind the Scenes</h3>
          {film.behindTheScenes.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-[#f5f0e8]/70 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* More Films CTA */}
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

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface FilmStory {
  id: string;
  couple: string;
  location: string;
  category: string;
  description: string;
  thumbnail: string;
  date: string;
  duration: string;
}

const filmStories: FilmStory[] = [
  {
    id: 'priya-arjun-film',
    couple: 'Priya & Arjun',
    location: 'Udaipur, India',
    category: 'Classic Story Telling',
    description: "A cinematic journey through three days of royal celebrations. From the intimate mehendi to the grand reception, every frame tells their love story.",
    thumbnail: 'https://images.unsplash.com/photo-1583089892943-c7ec8ee4f0b1?w=800&h=450&fit=crop',
    date: '3/15/24',
    duration: '12:34'
  },
  {
    id: 'sarah-michael-film',
    couple: 'Sarah & Michael',
    location: 'Tuscany, Italy',
    category: 'New Age Modern',
    description: "An artistic exploration of love in the Italian countryside. This film blends documentary style with cinematic storytelling.",
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop',
    date: '2/20/24',
    duration: '15:20'
  },
  {
    id: 'aisha-rahul-film',
    couple: 'Aisha & Rahul',
    location: 'Mumbai, India',
    category: 'Classic Story Telling',
    description: "Energy, colors, and pure joy. This wedding film captures the essence of a modern Indian celebration.",
    thumbnail: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=450&fit=crop',
    date: '1/10/24',
    duration: '18:45'
  },
  {
    id: 'emma-james-film',
    couple: 'Emma & James',
    location: 'Bali, Indonesia',
    category: 'Intimates',
    description: "Barefoot on the beach, vows at sunset. An intimate film that feels like a love letter to destination weddings.",
    thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=450&fit=crop',
    date: '12/5/23',
    duration: '8:15'
  },
];

const WeddingFilms = () => {

  return (
    <div className="min-h-screen font-['Montserrat']">
      {/* Hero Section with Video Background */}
      <div className="relative h-[60vh] bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a]/80 to-[#1a1a1a]" />
        <motion.h1 
          className="relative z-10 text-5xl md:text-7xl font-light italic text-[#f5f0e8] tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Inspired by Cinema.
        </motion.h1>
      </div>

      {/* Content Section */}
      <div className="bg-[#f5f0e8] py-16 px-8">
        {/* Films Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filmStories.map((film, index) => (
            <motion.div
              key={film.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/works/wedding-by-tmf/films/${film.id}`}>
                <div className="relative aspect-video overflow-hidden mb-4">
                  <img 
                    src={film.thumbnail} 
                    alt={film.couple}
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
                  <span className="absolute bottom-3 right-3 text-xs text-white/80 bg-[#1a1a1a]/60 px-2 py-1 rounded">
                    {film.duration}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#1a1a1a]/60">
                    <span className="uppercase tracking-wider">{film.category}</span>
                    <span>•</span>
                    <span>{film.date}</span>
                  </div>
                  <h3 className="text-lg font-light text-[#1a1a1a] group-hover:text-[#d4a574] transition-colors">
                    {film.couple}
                  </h3>
                  <p className="text-sm text-[#1a1a1a]/60 line-clamp-2">
                    {film.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingFilms;

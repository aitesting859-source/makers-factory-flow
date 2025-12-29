import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface PhotoStory {
  id: string;
  couple: string;
  location: string;
  category: string;
  description: string;
  image: string;
  date: string;
}

const photoStories: PhotoStory[] = [
  {
    id: 'priya-arjun',
    couple: 'Priya & Arjun',
    location: 'Udaipur, India',
    category: 'Indian',
    description: "A royal celebration of love at the City of Lakes. Three days of festivities, traditional ceremonies, and unforgettable moments captured in the most majestic settings.",
    image: 'https://images.unsplash.com/photo-1583089892943-c7ec8ee4f0b1?w=600&h=800&fit=crop',
    date: 'March 2024'
  },
  {
    id: 'sarah-michael',
    couple: 'Sarah & Michael',
    location: 'Tuscany, Italy',
    category: 'International',
    description: 'An intimate destination wedding in the heart of Italian wine country. Golden hour portraits among the vineyards and a sunset ceremony.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop',
    date: 'February 2024'
  },
  {
    id: 'aisha-rahul',
    couple: 'Aisha & Rahul',
    location: 'Mumbai, India',
    category: 'Indian',
    description: 'Two of the most vibrant souls coming together in a celebration that matched their energy. From mehendi to reception, every moment was pure magic.',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=800&fit=crop',
    date: 'January 2024'
  },
  {
    id: 'emma-james',
    couple: 'Emma & James',
    location: 'Bali, Indonesia',
    category: 'International',
    description: 'A tropical paradise wedding where love met the ocean. Cliff-top vows, barefoot dancing, and memories that will last forever.',
    image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=800&fit=crop',
    date: 'December 2023'
  },
  {
    id: 'neha-vikram',
    couple: 'Neha & Vikram',
    location: 'Jaipur, India',
    category: 'Indian',
    description: 'Pink city vibes and royal heritage. This wedding was a beautiful blend of tradition and contemporary style.',
    image: 'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=600&h=800&fit=crop',
    date: 'November 2023'
  },
  {
    id: 'julia-david',
    couple: 'Julia & David',
    location: 'Paris, France',
    category: 'International',
    description: 'Love in the city of lights. An elopement that was as romantic as it was spontaneous, with the Eiffel Tower as their witness.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=800&fit=crop',
    date: 'October 2023'
  },
];

const WeddingPhotos = () => {

  return (
    <div className="min-h-screen pt-24 pb-16 px-8 font-['Montserrat']">
      {/* Hero Section */}
      <motion.div 
        className="max-w-4xl mx-auto text-center mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-8xl font-light text-[#1a1a1a] mb-6 tracking-tight">
          Wedding <span className="italic text-[#d4a574]">Photography</span>
        </h1>
        <p className="text-lg text-[#1a1a1a]/60 max-w-2xl mx-auto leading-relaxed">
          Every love story is unique. We capture the emotions, the chaos, and the magic 
          that make your wedding day one of a kind.
        </p>
      </motion.div>

      {/* Photo Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {photoStories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/works/wedding-by-tmf/story/${story.id}`}>
              <div className="relative aspect-[3/4] overflow-hidden mb-4">
                <img 
                  src={story.image} 
                  alt={story.couple}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#d4a574]">{story.category}</span>
                <h3 className="text-xl font-light text-[#1a1a1a] group-hover:text-[#d4a574] transition-colors">
                  {story.couple}
                </h3>
                <p className="text-sm text-[#1a1a1a]/60 line-clamp-3">
                  {story.description}
                </p>
                <span className="inline-block text-sm text-[#d4a574] mt-2 group-hover:translate-x-2 transition-transform">
                  Read More →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeddingPhotos;

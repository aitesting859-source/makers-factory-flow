import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Film, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const WeddingLayout = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { path: '/works/wedding-by-tmf', label: 'Photos', icon: Camera, exact: true },
    { path: '/works/wedding-by-tmf/films', label: 'Films', icon: Film, exact: false },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Back to main site */}
      <Link 
        to="/" 
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-[#1a1a1a] hover:text-[#d4a574] transition-colors duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-medium tracking-wider uppercase">Back</span>
      </Link>

      {/* Right Side Navigation */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path 
            : location.pathname.startsWith(item.path);
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="group flex items-center gap-3"
            >
              <motion.div
                className={`p-3 rounded-full border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#d4a574] border-[#d4a574] text-white' 
                    : 'bg-transparent border-[#1a1a1a]/30 text-[#1a1a1a] hover:border-[#d4a574] hover:text-[#d4a574]'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-5 h-5" />
              </motion.div>
              <span className={`text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isActive ? 'text-[#d4a574]' : 'text-[#1a1a1a]'
              }`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen"
      >
        <Outlet />
      </motion.main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-[#f5f0e8] py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-light tracking-wider mb-2">Wedding by TMF</h3>
              <p className="text-[#f5f0e8]/60 text-sm">Capturing love stories, one frame at a time.</p>
            </div>
            <div className="flex gap-8">
              <Link to="/" className="text-[#f5f0e8]/60 hover:text-[#d4a574] transition-colors text-sm uppercase tracking-wider">
                Main Site
              </Link>
              <Link to="/about" className="text-[#f5f0e8]/60 hover:text-[#d4a574] transition-colors text-sm uppercase tracking-wider">
                About TMF
              </Link>
            </div>
          </div>
          <div className="border-t border-[#f5f0e8]/10 mt-12 pt-8 text-center">
            <p className="text-[#f5f0e8]/40 text-xs tracking-wider">
              © {new Date().getFullYear()} The Makers Factory. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WeddingLayout;

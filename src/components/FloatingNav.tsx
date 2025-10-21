import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const FloatingNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const workItems = [
    { name: 'Media Production', path: '/works/media-production' },
    { name: 'Ad Commercials', path: '/works/ad-commercials' },
    { name: 'Fashion Editorial', path: '/works/fashion-editorial' },
    { name: 'Fine Art Weddings', path: '/works/fine-art-weddings' },
  ];

  return (
    <nav
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}
    >
      <div className="bg-primary/10 backdrop-blur-md border border-primary/20 rounded-full px-8 py-3">
        <ul className="flex items-center gap-8 text-sm font-bold tracking-wider">
          <li>
            <Link
              to="/"
              className={`text-glow-hover transition-colors ${
                location.pathname === '/' ? 'text-accent' : 'text-primary'
              }`}
            >
              HOME
            </Link>
          </li>
          
          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-primary text-glow-hover transition-colors"
              onMouseEnter={() => setIsDropdownOpen(true)}
            >
              WORKS
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 bg-background/95 backdrop-blur-md border border-primary/20 rounded-lg overflow-hidden min-w-[200px] shadow-lg"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                {workItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-6 py-3 text-primary text-glow-hover hover:bg-primary/10 transition-colors text-sm"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FloatingNav;

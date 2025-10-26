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

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.works-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [lastScrollY]);

  const workItems = [
    { name: 'Media Production', path: '/works/media-production' },
    { name: 'Ad Commercials', path: '/works/ad-commercials' },
    { name: 'Fashion Editorial', path: '/works/fashion-editorial' },
    { name: 'Fine Art Weddings', path: '/works/fine-art-weddings' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
      }`}
    >
      <div className="bg-primary/40 backdrop-blur-sm border border-background/20 rounded-xl px-8 py-4 shadow-lg">
        <ul className="flex items-center gap-8 text-sm font-bold tracking-wider">
          <li>
            <Link
              to="/"
              className={`transition-colors hover:text-accent ${
                location.pathname === '/' ? 'text-accent' : 'text-background'
              }`}
            >
              HOME
            </Link>
          </li>
          
          <li className="relative works-dropdown">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="flex items-center gap-1 text-background hover:text-accent transition-colors"
            >
              WORKS
              <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-primary/95 backdrop-blur-md border border-background/20 rounded-sm overflow-hidden min-w-[200px] shadow-lg z-50">
                {workItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-6 py-3 text-background hover:text-accent hover:bg-background/10 transition-colors text-sm"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link
              to="/about"
              className={`transition-colors hover:text-accent ${
                location.pathname === '/about' ? 'text-accent' : 'text-background'
              }`}
            >
              ABOUT
            </Link>
          </li>

          <li>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-background hover:text-accent transition-colors"
            >
              CONTACT
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default FloatingNav;

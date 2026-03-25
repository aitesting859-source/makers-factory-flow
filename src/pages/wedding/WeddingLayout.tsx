import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Film, ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const WeddingLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/works/wedding-by-tmf', label: 'Home', icon: Home, exact: true },
    { path: '/works/wedding-by-tmf/photos', label: 'Photos', icon: Camera, exact: false },
    { path: '/works/wedding-by-tmf/films', label: 'Films', icon: Film, exact: false },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e8] font-['Montserrat']">

      {/* ── BACK BUTTON ── */}
      <Link
        to="/"
        className="fixed top-6 left-6 z-[200] flex items-center gap-2 bg-[#d4a574] border border-[#d4a574] text-white px-4 py-2 rounded-full hover:bg-[#f1631a] hover:border-[#f1631a] transition-all duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs font-medium tracking-wider uppercase">Back</span>
      </Link>

      {/* ── RIGHT NAV ── */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-[200] flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="group flex items-center justify-end gap-3"
            >
              <span className={`text-xs font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                isActive ? 'text-[#d4a574]' : 'text-white'
              }`}>
                {item.label}
              </span>

              <motion.div
                className={`p-3 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-[#f1631a] border-[#f1631a] text-white shadow-lg'
                    : 'bg-[#d4a574] border-[#d4a574] text-white hover:bg-[#f1631a] hover:border-[#f1631a]'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-4 h-4" />
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* ── MAIN CONTENT ── */}
      <main className="min-h-screen">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
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
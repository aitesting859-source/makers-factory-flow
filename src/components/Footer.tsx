const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-background border-t border-primary/20 py-12">
      {/* Continuous Marquee Animation */}
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="inline-block text-6xl md:text-8xl font-black text-primary/10 mx-8"
            >
              THE MAKERS FACTORY
            </span>
          ))}
        </div>
        
        {/* Duplicate for seamless loop */}
        <div className="absolute top-0 flex animate-marquee whitespace-nowrap" style={{ animationDelay: '10s' }}>
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="inline-block text-6xl md:text-8xl font-black text-primary/10 mx-8"
            >
              THE MAKERS FACTORY
            </span>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 mt-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-primary/60">
          <p className="tracking-wider">© 2025 THE MAKERS FACTORY. ALL RIGHTS RESERVED.</p>
          
          <div className="flex gap-8">
            <a href="#" className="text-glow-hover tracking-wider">
              INSTAGRAM
            </a>
            <a href="#" className="text-glow-hover tracking-wider">
              VIMEO
            </a>
            <a href="#" className="text-glow-hover tracking-wider">
              CONTACT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

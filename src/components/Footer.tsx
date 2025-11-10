import ContactForm from './ContactForm';

const Footer = () => {
  return (
    <footer id="contact" className="relative overflow-hidden bg-muted/30 backdrop-blur-sm border-t border-border/20 py-16">
      {/* Contact Form */}
      <ContactForm />

      {/* Continuous Marquee Animation */}
      <div className="relative mt-16" aria-hidden="true">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="inline-block text-6xl md:text-8xl font-black text-primary/15 mx-8"
            >
              THE MAKERS FACTORY
            </span>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="relative z-10 mt-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Write Us */}
          <div>
            <h3 className="text-xs text-primary/65 tracking-widest mb-4">WRITE US</h3>
            <a 
              href="mailto:hello@themakersfactory.com" 
              className="text-lg text-primary hover:text-accent transition-colors font-bold"
            >
              HELLO@THEMAKERSFACTORY.COM
            </a>
          </div>

          {/* Talk to Us */}
          <div>
            <h3 className="text-xs text-primary/65 tracking-widest mb-4">TALK TO US</h3>
            <a 
              href="tel:+1234567890" 
              className="text-lg text-primary hover:text-accent transition-colors font-bold"
            >
              +1 (234) 567 890
            </a>
          </div>

          {/* Find Us */}
          <div>
            <h3 className="text-xs text-primary/65 tracking-widest mb-4">FIND US</h3>
            <address className="text-lg text-primary not-italic font-bold">
              CREATIVE STUDIOS<br />
              123 MAKER STREET<br />
              NEW YORK, NY 10001
            </address>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="border-t border-primary/20 pt-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-primary/60 tracking-widest">© 2025 THE MAKERS FACTORY. ALL RIGHTS RESERVED.</p>
            
            <div className="flex gap-8 text-xs tracking-widest">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-accent transition-colors">
                INSTAGRAM
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-accent transition-colors">
                LINKEDIN
              </a>
              <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-accent transition-colors">
                VIMEO
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary/60 hover:text-accent transition-colors">
                X
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

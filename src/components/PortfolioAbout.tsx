import { useEffect, useState } from 'react';

const PortfolioAbout = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative min-h-screen px-4 py-32 border-t border-border/20 blur-load ${isLoaded ? 'loaded' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* About Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black text-primary mb-8 tracking-tight">
            ABOUT <span className="text-accent">US</span>
          </h2>
          <p className="text-xl md:text-2xl text-primary/60 max-w-3xl mx-auto leading-relaxed">
            We are indie video creators who believe in the power of authentic storytelling
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mb-32">
          <div className="text-center p-8 bg-gradient-to-br from-muted/50 to-background rounded-lg border border-primary/20">
            <h4 className="text-5xl md:text-6xl font-black text-accent mb-3">50+</h4>
            <p className="text-sm text-primary/60 uppercase tracking-wider">Projects Completed</p>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-muted/50 to-background rounded-lg border border-primary/20">
            <h4 className="text-5xl md:text-6xl font-black text-accent mb-3">10+</h4>
            <p className="text-sm text-primary/60 uppercase tracking-wider">Years Experience</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Left - Image */}
          <div className="relative aspect-[4/5] bg-gradient-to-br from-muted to-background rounded-lg border border-primary/20 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-primary/30 text-sm tracking-wider">TEAM IMAGE</span>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
                Our Story
              </h3>
              <p className="text-lg text-primary/70 leading-relaxed">
                The Makers Factory was born from a passion for visual storytelling. We're a collective of independent creators who came together with one vision: to create cinematic experiences that move people.
              </p>
              <p className="text-lg text-primary/70 leading-relaxed">
                From intimate wedding films to bold commercial campaigns, we approach every project with the same dedication to craft and authenticity.
              </p>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-32">
          <h3 className="text-4xl md:text-6xl font-black text-center text-primary mb-16 tracking-tight">
            What We Do
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Media Production',
                description: 'Cinematic content for brands and artists',
              },
              {
                title: 'Commercials',
                description: 'High-impact advertising that converts',
              },
              {
                title: 'Editorial',
                description: 'Fashion stories told through visuals',
              },
              {
                title: 'Weddings',
                description: 'Timeless love stories captured forever',
              },
            ].map((service, idx) => (
              <div key={idx} className="group p-8 bg-gradient-to-br from-muted/50 to-background rounded-lg border border-primary/20 hover:border-accent/50 transition-all duration-500">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                  <span className="text-2xl font-black text-accent">{idx + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-primary mb-3 tracking-tight">
                  {service.title}
                </h4>
                <p className="text-sm text-primary/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <div className="text-center max-w-4xl mx-auto mb-32">
          <h3 className="text-4xl md:text-6xl font-black text-primary mb-12 tracking-tight">
            Our Approach
          </h3>
          
          <div className="space-y-12">
            {[
              {
                number: '01',
                title: 'Listen',
                description: 'We start by understanding your vision, your story, and what makes your project unique.',
              },
              {
                number: '02',
                title: 'Create',
                description: 'We bring our creative expertise to craft visuals that resonate and inspire.',
              },
              {
                number: '03',
                title: 'Deliver',
                description: 'We deliver polished, cinematic content that exceeds expectations.',
              },
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-8 text-left">
                <span className="text-6xl font-black text-accent/20 flex-shrink-0">
                  {step.number}
                </span>
                <div className="pt-2">
                  <h4 className="text-2xl font-bold text-primary mb-2 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-lg text-primary/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight">
            Let's Create Together
          </h3>
          <p className="text-lg text-primary/60 mb-12 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear about it and explore how we can bring your vision to life.
          </p>
          <a href="#contact" className="inline-block px-12 py-4 bg-accent text-white rounded-full text-lg font-bold hover:bg-accent/90 transition-colors duration-300 hover:scale-105 transform">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioAbout;

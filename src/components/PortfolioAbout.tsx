import { useEffect, useState } from 'react';
import { usePageContent } from '@/hooks/usePageContent';

const PortfolioAbout = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const { sections } = usePageContent('homepage');

  const getText = (id: string): string =>
    sections?.find((s: any) => s.section_id === id)?.text_value || '';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      title: getText('service-1-title') || 'Media Production',
      description: getText('service-1-desc') || 'Cinematic content for brands and artists',
    },
    {
      title: getText('service-2-title') || 'Commercials',
      description: getText('service-2-desc') || 'High-impact advertising that converts',
    },
    {
      title: getText('service-3-title') || 'Editorial',
      description: getText('service-3-desc') || 'Fashion stories told through visuals',
    },
    {
      title: getText('service-4-title') || 'Weddings',
      description: getText('service-4-desc') || 'Timeless love stories captured forever',
    },
  ];

  const steps = [
    {
      number: '01',
      title: getText('step-1-title') || 'Listen',
      description: getText('step-1-desc') || 'We start by understanding your vision, your story, and what makes your project unique.',
    },
    {
      number: '02',
      title: getText('step-2-title') || 'Create',
      description: getText('step-2-desc') || 'We bring our creative expertise to craft visuals that resonate and inspire.',
    },
    {
      number: '03',
      title: getText('step-3-title') || 'Deliver',
      description: getText('step-3-desc') || 'We deliver polished, cinematic content that exceeds expectations.',
    },
  ];

  return (
    <section className={`relative min-h-screen px-4 py-32 border-t border-border/20 blur-load ${isLoaded ? 'loaded' : ''}`}>
      <div className="max-w-7xl mx-auto">

        {/* WHAT WE DO */}
        <div className="mb-32">
          <h3 className="text-4xl md:text-6xl font-black text-center text-primary mb-16 tracking-tight">
            {getText('what-we-do-title') || 'What We Do'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-muted/50 to-background rounded-lg border border-primary/20 hover:border-accent/50 transition-all duration-500"
              >
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

        {/* OUR APPROACH */}
        <div className="text-center max-w-4xl mx-auto mb-32">
          <h3 className="text-4xl md:text-6xl font-black text-primary mb-12 tracking-tight">
            {getText('approach-title') || 'Our Approach'}
          </h3>
          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-8 text-left">
                <span className="text-6xl font-black text-accent/40 flex-shrink-0" aria-hidden="true">
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
            {getText('cta-title') || "Let's Create Together"}
          </h3>
          <p className="text-lg text-primary/60 mb-12 max-w-2xl mx-auto">
            {getText('cta-description') || "Have a project in mind? We'd love to hear about it and explore how we can bring your vision to life."}
          </p>
          <a href="#contact" className="inline-block px-12 py-4 bg-accent text-white rounded-full text-lg font-bold hover:bg-accent/90 transition-colors duration-300 hover:scale-105 transform">
            {getText('cta-button') || 'Get In Touch'}
          </a>
        </div>

      </div>
    </section>
  );
};

export default PortfolioAbout;
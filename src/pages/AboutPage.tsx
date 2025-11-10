import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import { VelocityScroll } from '@/components/VelocityScroll';
import aboutCorner1 from '@/assets/about-corner-1.jpg';
import aboutCorner3 from '@/assets/about-corner-3.jpg';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Fade out hero text when scrolling down, fade in when scrolling up
  const heroOpacity = useTransform(scrollY, [0, 500, 1000], [1, 0.5, 0]);
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1
      }
    }
  };

  return (
    <div className="grain-overlay bg-background text-foreground min-h-screen">
      <FloatingNav />
      
      <section 
        className={`relative min-h-screen bg-background border-t border-border/10 blur-load ${isLoaded ? 'loaded' : ''}`}
      >
        {/* Hero Title */}
        <motion.div 
          className="relative h-screen flex items-center justify-center px-4"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.div 
            className="text-center space-y-8 max-w-6xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-primary leading-none tracking-tighter"
              variants={itemVariants}
            >
              THE
            </motion.h1>
            <motion.h1 
              className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-accent leading-none tracking-tighter -mt-12"
              variants={itemVariants}
            >
              MAKERS
            </motion.h1>
            <motion.h1 
              className="text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-primary leading-none tracking-tighter -mt-12"
              variants={itemVariants}
            >
              FACTORY
            </motion.h1>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          >
            <div className="w-px h-16 bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </motion.div>

        {/* Content Grid */}
        <div className={`max-w-7xl mx-auto px-4 md:px-8 pb-32 blur-load ${isLoaded ? 'loaded' : ''}`}>
          {/* Large Image + Text Block */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              className="relative h-[600px] overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageVariants}
            >
              <motion.img 
                src={aboutCorner1} 
                alt="Visual storytelling" 
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </motion.div>
            
            <motion.div 
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
            >
              <motion.h2 
                className="text-6xl md:text-7xl font-black text-primary tracking-tight leading-tight"
                variants={itemVariants}
              >
                CRAFTING
                <br />
                VISUAL
                <br />
                <span className="text-accent">STORIES</span>
              </motion.h2>
              
              <motion.div 
                className="space-y-6 text-xl text-primary/70 leading-relaxed"
                variants={itemVariants}
              >
                <motion.p variants={itemVariants}>
                  We are a collective of indie creators pushing the boundaries of visual storytelling.
                </motion.p>
                <motion.p variants={itemVariants}>
                  From cinematic productions to intimate editorial work, we bring passion and precision to every frame.
                </motion.p>
              </motion.div>
            </motion.div>
          </div>

          {/* Centered Text Block */}
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-32 space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              className="h-px w-24 bg-accent mx-auto"
              variants={itemVariants}
            />
            
            <motion.p 
              className="text-2xl md:text-3xl text-primary/80 leading-relaxed font-light"
              variants={itemVariants}
            >
              Our work spans media production, commercial advertising, fashion editorial, and fine art wedding cinematography.
            </motion.p>
            
            <motion.p 
              className="text-2xl md:text-3xl text-primary/80 leading-relaxed font-light"
              variants={itemVariants}
            >
              Each project is an opportunity to create something extraordinary.
            </motion.p>
            
            <motion.div 
              className="h-px w-24 bg-accent mx-auto"
              variants={itemVariants}
            />
          </motion.div>

          {/* Bottom Image */}
          <motion.div 
            className="relative h-[700px] overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={imageVariants}
          >
            <motion.img 
              src={aboutCorner3} 
              alt="Behind the scenes" 
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            <motion.div 
              className="absolute bottom-12 left-12 right-12"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h3 className="text-5xl md:text-7xl font-black text-primary tracking-tight">
                EVERY FRAME
                <br />
                <span className="text-accent">MATTERS</span>
              </h3>
            </motion.div>
          </motion.div>
        </div>

        {/* Portfolio About Section */}
        <div className="border-t border-border/10">
          {/* Vision Statement */}
          <motion.div 
            className={`max-w-7xl mx-auto px-4 md:px-8 py-32 blur-load ${isLoaded ? 'loaded' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div className="max-w-5xl mx-auto text-center space-y-12" variants={itemVariants}>
              <motion.div className="inline-block px-6 py-2 border border-accent/20 rounded-full" variants={itemVariants}>
                <span className="text-sm tracking-widest text-accent uppercase">Our Vision</span>
              </motion.div>
              
              <motion.h2 
                className="text-5xl md:text-7xl font-black text-primary leading-tight"
                variants={itemVariants}
              >
                Creating <span className="text-accent">Visual Experiences</span> That Resonate
              </motion.h2>
              
              <motion.p 
                className="text-xl md:text-2xl text-primary/70 leading-relaxed max-w-3xl mx-auto"
                variants={itemVariants}
              >
                We believe in the power of storytelling through motion and light. Every project is a canvas where creativity meets technical excellence, resulting in work that moves, inspires, and endures.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* What We Do */}
          <motion.div 
            className={`max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-border/10 blur-load ${isLoaded ? 'loaded' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h3 
              className="text-4xl md:text-6xl font-black text-primary mb-20 text-center"
              variants={itemVariants}
            >
              WHAT WE <span className="text-accent">CREATE</span>
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Media Production",
                  description: "Cinematic storytelling for brands, documentaries, and digital content that captures attention and drives engagement.",
                  number: "01"
                },
                {
                  title: "Ad Commercials",
                  description: "High-impact advertising content that converts viewers into customers through creative narrative and stunning visuals.",
                  number: "02"
                },
                {
                  title: "Fashion Editorial",
                  description: "Editorial photography and videography that showcases style, elegance, and the art of fashion in motion.",
                  number: "03"
                },
                {
                  title: "Weddings by TMF",
                  description: "Fine art wedding cinematography capturing authentic moments and emotions with a timeless, editorial approach.",
                  number: "04"
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="group relative p-8 md:p-12 bg-card/30 backdrop-blur-sm border border-border/10 hover:border-accent/30 transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                >
                  <div className="flex items-start gap-6">
                    <span className="text-6xl font-black text-accent/40 group-hover:text-accent/50 transition-colors" aria-hidden="true">
                      {service.number}
                    </span>
                    <div className="flex-1 space-y-4">
                      <h4 className="text-2xl md:text-3xl font-bold text-primary group-hover:text-accent transition-colors">
                        {service.title}
                      </h4>
                      <p className="text-primary/70 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Process */}
          <motion.div 
            className={`max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-border/10 blur-load ${isLoaded ? 'loaded' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.h3 
              className="text-4xl md:text-6xl font-black text-primary mb-20 text-center"
              variants={itemVariants}
            >
              HOW WE <span className="text-accent">WORK</span>
            </motion.h3>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discover", desc: "Understanding your vision, goals, and audience" },
                { step: "02", title: "Create", desc: "Crafting concepts and visual narratives" },
                { step: "03", title: "Produce", desc: "Bringing ideas to life with precision" },
                { step: "04", title: "Deliver", desc: "Final touches and seamless delivery" }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  className="text-center space-y-6 group"
                  variants={itemVariants}
                >
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-full border-2 border-accent/30 flex items-center justify-center text-2xl font-black text-accent group-hover:bg-accent group-hover:text-background transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {phase.step}
                  </motion.div>
                  <h4 className="text-2xl font-bold text-primary">{phase.title}</h4>
                  <p className="text-primary/70">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div 
            className={`max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-border/10 blur-load ${isLoaded ? 'loaded' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div className="space-y-8" variants={itemVariants}>
                <div className="inline-block px-6 py-2 border border-accent/20 rounded-full">
                  <span className="text-sm tracking-widest text-accent uppercase">Our Philosophy</span>
                </div>
                
                <h3 className="text-5xl md:text-6xl font-black text-primary leading-tight">
                  CRAFT OVER
                  <br />
                  <span className="text-accent">CONTENT</span>
                </h3>
                
                <div className="space-y-6 text-lg text-primary/70 leading-relaxed">
                  <p>
                    In a world saturated with content, we focus on craft. Each frame is intentional, each edit purposeful, each story authentic.
                  </p>
                  <p>
                    We are not just capturing moments—we are creating memories, building brands, and telling stories that stand the test of time.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="space-y-6"
                variants={itemVariants}
              >
                {[
                  { title: "Authenticity", desc: "Real stories, genuine emotions, honest narratives" },
                  { title: "Excellence", desc: "Uncompromising quality in every aspect of production" },
                  { title: "Innovation", desc: "Pushing boundaries with creative techniques and technology" },
                  { title: "Collaboration", desc: "Working closely with clients to bring their vision to life" }
                ].map((value, index) => (
                  <motion.div
                    key={index}
                    className="p-6 bg-card/20 backdrop-blur-sm border-l-4 border-accent/30 hover:border-accent transition-all duration-300"
                    whileHover={{ x: 8 }}
                  >
                    <h4 className="text-xl font-bold text-primary mb-2">{value.title}</h4>
                    <p className="text-primary/70">{value.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className={`max-w-7xl mx-auto px-4 md:px-8 py-32 border-t border-border/10 blur-load ${isLoaded ? 'loaded' : ''}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div 
              className="text-center space-y-12 max-w-4xl mx-auto"
              variants={itemVariants}
            >
              <h3 className="text-5xl md:text-7xl font-black text-primary leading-tight">
                LET&apos;S CREATE
                <br />
                <span className="text-accent">TOGETHER</span>
              </h3>
              
              <p className="text-xl md:text-2xl text-primary/70 leading-relaxed">
                Whether you have a clear vision or just a spark of an idea, we are here to help bring it to life.
              </p>
              
              <motion.button
                className="px-12 py-6 bg-accent text-background text-lg font-bold tracking-wider uppercase hover:bg-accent/90 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Velocity Scroll Animation */}
      <VelocityScroll 
        text="THE MAKERS FACTORY" 
        default_velocity={5} 
        className="text-6xl font-black text-primary/20"
      />

      <Footer />
    </div>
  );
};

export default AboutPage;

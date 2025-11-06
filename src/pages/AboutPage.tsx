import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import aboutCorner1 from '@/assets/about-corner-1.jpg';
import aboutCorner3 from '@/assets/about-corner-3.jpg';

const AboutPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

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
          style={{ opacity, scale }}
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
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
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
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

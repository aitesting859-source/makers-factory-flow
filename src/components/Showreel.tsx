import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VideoControls from './VideoControls';

interface ShowreelProps {
  media?: string;
  corner1?: string;
  corner2?: string;
  corner3?: string;
  corner4?: string;
  aboutTitle?: string;
  aboutDesc?: string;
}

const Showreel = ({
  media = "",
  corner1 = "",
  corner2 = "",
  corner3 = "",
  corner4 = "",
  aboutTitle = "(Indie · Video Creators)",
  aboutDesc = "We are a collective of indie creators pushing the boundaries of visual storytelling. From cinematic productions to intimate editorial work, we bring passion and precision to every frame.",
}: ShowreelProps) => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [videoError, setVideoError] = useState(false);
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  // ── Font + spacing calculations ──
  const fontPx = Math.min(Math.max(vw * 0.06, 24), 112);
  const lineH = fontPx * 0.6;
  const stackLift = Math.round(fontPx / 112 * 480);

  const theYfinal     = -(stackLift + lineH);
  const makersYfinal  = -(stackLift);
  const factoryYfinal = -(stackLift - lineH);
  const aboutYfinal   = factoryYfinal - lineH * 1.3;

  const theYf     = `${Math.round(theYfinal)}px`;
  const makersYf  = `${Math.round(makersYfinal)}px`;
  const factoryYf = `${Math.round(factoryYfinal)}px`;
  const aboutYf   = `${Math.round(aboutYfinal)}px`;
  const aboutYs   = `${Math.round(aboutYfinal + 20)}px`;

  // ── VIDEO ──
  const videoOp = useTransform(scrollYProgress, [0, 0.10, 0.20], [1, 0.3, 0]);

  // ── PANEL EXIT ──
  const panelY  = useTransform(scrollYProgress, [0.70, 0.88], ['0%', '-110%']);
  const panelOp = useTransform(scrollYProgress, [0.70, 0.86], [1, 0]);

  // ── WORDS ──
  const theX     = useTransform(scrollYProgress, [0, 0.20, 1], ['-26vw', '0vw', '0vw']);
  const theY     = useTransform(scrollYProgress, [0, 0.20, 1], ['0px', theYf, theYf]);
  const theScale = useTransform(scrollYProgress, [0, 0.20], [1, 0.5]);

  const makersX     = useTransform(scrollYProgress, [0, 0.20, 1], ['-5vw', '0vw', '0vw']);
  const makersY     = useTransform(scrollYProgress, [0, 0.15, 1], ['0px', makersYf, makersYf]);
  const makersScale = useTransform(scrollYProgress, [0, 0.20], [1, 0.5]);

  const factoryX     = useTransform(scrollYProgress, [0, 0.20, 1], ['25vw', '0vw', '0vw']);
  const factoryY     = useTransform(scrollYProgress, [0, 0.20, 1], ['0px', factoryYf, factoryYf]);
  const factoryScale = useTransform(scrollYProgress, [0, 0.20], [1, 0.5]);

  // ── ABOUT ──
  const aboutOp = useTransform(scrollYProgress, [0.22, 0.55], [0, 1]);
  const aboutY  = useTransform(
    scrollYProgress,
    [0, 0.20, 0.22, 0.50],
    ['0px', aboutYf, aboutYs, aboutYf]
  );

  // ── CORNER scroll opacity + slide ──
  const c1Op    = useTransform(scrollYProgress, [0.22, 0.48], [0, 1]);
  const c1Slide = useTransform(scrollYProgress, [0.22, 0.48], ['-20px', '0px']);
  const c2Op    = useTransform(scrollYProgress, [0.25, 0.51], [0, 1]);
  const c2Slide = useTransform(scrollYProgress, [0.25, 0.51], ['-20px', '0px']);
  const c3Op    = useTransform(scrollYProgress, [0.28, 0.54], [0, 1]);
  const c3Slide = useTransform(scrollYProgress, [0.28, 0.54], ['20px', '0px']);
  const c4Op    = useTransform(scrollYProgress, [0.31, 0.57], [0, 1]);
  const c4Slide = useTransform(scrollYProgress, [0.31, 0.57], ['20px', '0px']);

  const handleVideoError = () => { setVideoError(true); setIsLoaded(true); };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setScrollOpacity(Math.max(0, 1 - Math.max(0, -rect.top / (rect.height * 2))));
      }
    };
    const handleResize = () => setVw(window.innerWidth);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();
    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggleMute = () => {
    if (videoElementRef.current) {
      videoElementRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await videoElementRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) { console.error(e); }
  };

  const finalVideoSrc = media?.trim() ? media : '/showreel.mp4';

  const isMobile = vw < 768;
  const isTablet = vw >= 768 && vw < 1024;

  // Corner sizes based on viewport
  const sz = {
    sm: isMobile ? 120 : isTablet ? 160 : 220,
    md: isMobile ? 140 : isTablet ? 180 : 240,
    lg: isMobile ? 160 : isTablet ? 200 : 260,
  };

  // All corners flush to screen edges (top:0, left:0, right:0, bottom:0)
  // Slight rotation for organic feel — matching AboutSection
  const corners = [
    {
      img: corner1,
      op: c1Op,
      slide: c1Slide,
      style: {
        top: 0,
        left: 0,
        width: sz.md,
        height: sz.lg,
        transform: 'rotate(2deg)',
        transformOrigin: 'top left',
      },
    },
    {
      img: corner2,
      op: c2Op,
      slide: c2Slide,
      style: {
        top: 0,
        right: 0,
        width: sz.md,
        height: sz.md,
        transform: 'rotate(-3deg)',
        transformOrigin: 'top right',
      },
    },
    {
      img: corner3,
      op: c3Op,
      slide: c3Slide,
      style: {
        bottom: 0,
        left: 0,
        width: sz.lg,
        height: sz.sm,
        transform: 'rotate(-1deg)',
        transformOrigin: 'bottom left',
      },
    },
    {
      img: corner4,
      op: c4Op,
      slide: c4Slide,
      style: {
        bottom: 0,
        right: 0,
        width: sz.md,
        height: sz.lg,
        transform: 'rotate(3deg)',
        transformOrigin: 'bottom right',
      },
    },
  ];

  return (
    <div ref={sectionRef}>
      <div ref={scrollRef} className="relative" style={{ height: '450vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">

          {/* Grain background */}
          <div className="fixed inset-0 -z-10 pointer-events-none" style={{ opacity: scrollOpacity }}>
            <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
              <source src="/Grain.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-background/40" />
          </div>

          {/* ── 4 CORNER IMAGES — flush to screen edges ── */}
          {corners.map(({ img, op, slide, style }, i) => (
            <motion.div
              key={i}
              className="absolute overflow-hidden pointer-events-none z-10"
              style={{
                ...style,
                opacity: op,
                y: slide,
              }}
            >
              {img ? (
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.6 }}
                />
              ) : (
                <div
                  className="w-full h-full bg-muted/40 border border-primary/10"
                  style={{ opacity: 0.6 }}
                />
              )}
            </motion.div>
          ))}

          {/* ── MAIN PANEL ── */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-start pt-20"
            style={{ y: panelY, opacity: panelOp }}
          >
            {/* VIDEO */}
            <motion.div className="w-full px-4 flex-shrink-0" style={{ opacity: videoOp }}>
              <div
                ref={videoRef}
                className={`relative w-full max-w-6xl mx-auto aspect-[2.39/1] bg-muted rounded-sm overflow-hidden blur-load ${isLoaded ? 'loaded' : ''}`}
              >
                {!videoError ? (
                  <video
                    ref={videoElementRef}
                    className="w-full h-full object-cover"
                    autoPlay loop muted playsInline
                    onLoadedData={() => setIsLoaded(true)}
                    onError={handleVideoError}
                    key={finalVideoSrc}
                  >
                    <source src={finalVideoSrc} type="video/mp4" />
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <p className="text-primary/60 text-center px-8">Showreel unavailable.</p>
                  </div>
                )}
                <VideoControls
                  isMuted={isMuted}
                  isFullscreen={isFullscreen}
                  onToggleMute={handleToggleMute}
                  onToggleFullscreen={handleToggleFullscreen}
                />
                <div className="absolute inset-0 grain-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/60 pointer-events-none" />
              </div>
            </motion.div>

            {/* WORDS */}
            <div
              className="flex-shrink-0 w-full relative flex items-center justify-center mt-6"
              style={{ height: 'clamp(5rem, 14vw, 18rem)', overflow: 'visible' }}
            >
              <motion.span
                className="font-black text-primary select-none leading-none whitespace-nowrap absolute"
                style={{ fontSize: 'clamp(1.5rem, 6vw, 7rem)', x: theX, y: theY, scale: theScale, wordSpacing: '0.1em', letterSpacing: '-0.01em' }}
              >
                THE
              </motion.span>
              <motion.span
                className="font-black text-accent select-none leading-none whitespace-nowrap absolute"
                style={{ fontSize: 'clamp(1.5rem, 6vw, 7rem)', x: makersX, y: makersY, scale: makersScale, wordSpacing: '0.1em', letterSpacing: '-0.015em' }}
              >
                MAKERS
              </motion.span>
              <motion.span
                className="font-black text-primary select-none leading-none whitespace-nowrap absolute"
                style={{ fontSize: 'clamp(1.5rem, 6vw, 7rem)', x: factoryX, y: factoryY, scale: factoryScale, wordSpacing: '0.1em', letterSpacing: '-0.01em' }}
              >
                FACTORY
              </motion.span>
            </div>

            {/* ABOUT */}
            <motion.div
              className="w-full max-w-2xl mx-auto px-8"
              style={{ opacity: aboutOp, y: aboutY }}
            >
              <p className="text-xs md:text-base text-primary/60 text-center leading-relaxed">
                {aboutDesc}
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Showreel;
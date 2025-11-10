import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import tmfLogo from '@/assets/tmf-logo.png';

const Preloader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const greetings = [
    'Hello',      // English
    'Hola',       // Spanish
    'Bonjour',    // French
    'Ciao',       // Italian
    'Hallo',      // German
    'Olá',        // Portuguese
    'Привет',     // Russian
    'こんにちは',   // Japanese
    '안녕하세요',   // Korean
    'مرحبا',      // Arabic
    'Namaste',    // Hindi
    '你好',       // Chinese
    'Merhaba',    // Turkish
    'Sawubona',   // Zulu
    'Γεια σας',   // Greek
  ];

  useEffect(() => {
    // Cycle through languages
    const languageInterval = setInterval(() => {
      setCurrentLanguageIndex((prev) => (prev + 1) % greetings.length);
    }, 300);

    // Complete preloader after all languages shown
    const completeTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onLoadComplete();
      }, 800);
    }, greetings.length * 300 + 500);

    return () => {
      clearInterval(languageInterval);
      clearTimeout(completeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          {/* Animated Logo */}
          <motion.div
            animate={{
              opacity: [1, 0.3, 1],
              filter: [
                'brightness(1) hue-rotate(0deg)',
                'brightness(1.5) hue-rotate(180deg)',
                'brightness(1) hue-rotate(360deg)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-12"
          >
            <img 
              src={tmfLogo} 
              alt="TMF Logo" 
              className="w-48 h-48 object-contain"
            />
          </motion.div>

          {/* Greeting Text */}
          <motion.div
            key={currentLanguageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="text-4xl md:text-6xl font-black text-accent tracking-wider"
          >
            {greetings[currentLanguageIndex]}
          </motion.div>

          {/* Loading Progress */}
          <motion.div
            className="mt-8 w-64 h-1 bg-primary/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-accent"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: (greetings.length * 300 + 500) / 1000,
                ease: 'linear'
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;

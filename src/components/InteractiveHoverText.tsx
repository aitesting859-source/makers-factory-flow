import { useRef, useState, useEffect } from 'react';

interface InteractiveHoverTextProps {
  text: string;
  className?: string;
  primaryColor?: string;
  hoverColor?: string;
}

const InteractiveHoverText = ({ 
  text, 
  className = '',
  primaryColor = 'text-accent',
  hoverColor = 'text-primary'
}: InteractiveHoverTextProps) => {
  const words = text.split(' ');
  const [hoveredWords, setHoveredWords] = useState<Set<number>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const newHoveredWords = new Set<number>();
      
      wordRefs.current.forEach((wordElement, index) => {
        if (wordElement) {
          const rect = wordElement.getBoundingClientRect();
          
          // Check if mouse is within word bounds
          if (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
          ) {
            newHoveredWords.add(index);
          }
        }
      });
      
      setHoveredWords(newHoveredWords);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          className={`inline-block transition-colors duration-200 ${
            hoveredWords.has(index) ? hoverColor : primaryColor
          }`}
        >
          {word}
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
};

export default InteractiveHoverText;

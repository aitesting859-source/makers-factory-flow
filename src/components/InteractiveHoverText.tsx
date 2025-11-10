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

  const getWordStyle = (index: number, wordElement: HTMLSpanElement | null) => {
    if (!wordElement || !hoveredWords.has(index)) {
      return {};
    }

    const rect = wordElement.getBoundingClientRect();
    const wordCenterX = rect.left + rect.width / 2;
    const distanceFromCenter = Math.abs(mousePosition.x - wordCenterX);
    const maxDistance = rect.width / 2;
    
    // Calculate percentage of hover (0 = not hovered, 1 = fully hovered)
    const hoverPercentage = Math.max(0, 1 - (distanceFromCenter / maxDistance));
    
    return {
      background: hoverPercentage > 0.5 
        ? `linear-gradient(to right, hsl(var(--primary)) ${hoverPercentage * 100}%, hsl(var(--accent)) ${hoverPercentage * 100}%)`
        : `linear-gradient(to right, hsl(var(--accent)) ${(1 - hoverPercentage) * 100}%, hsl(var(--primary)) ${(1 - hoverPercentage) * 100}%)`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    };
  };

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          ref={(el) => (wordRefs.current[index] = el)}
          className={`inline-block transition-all duration-200 ${
            hoveredWords.has(index) ? '' : primaryColor
          }`}
          style={getWordStyle(index, wordRefs.current[index])}
        >
          {word}
          {index < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
};

export default InteractiveHoverText;

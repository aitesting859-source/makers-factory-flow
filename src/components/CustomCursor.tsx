import { useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { createRoot } from 'react-dom/client';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Create magnifying glass icon
    const magnifyIcon = document.createElement('div');
    magnifyIcon.className = 'magnify-icon';
    const iconRoot = createRoot(magnifyIcon);
    iconRoot.render(<Search size={16} color="hsl(20, 89%, 54%)" />);

    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON';
      
      const isText = target.tagName === 'H1' || 
        target.tagName === 'H2' || 
        target.tagName === 'H3' || 
        target.tagName === 'P' || 
        target.tagName === 'SPAN' ||
        target.closest('h1, h2, h3, p');
      
      dot.classList.toggle('pointer', isPointer);
      
      // Show magnifying glass on text, hide normal dot
      if (isText && !isPointer) {
        dot.style.opacity = '0';
        magnifyIcon.style.opacity = '1';
        magnifyIcon.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      } else {
        dot.style.opacity = '1';
        magnifyIcon.style.opacity = '0';
      }
    };

    // Animate cursor circle with smooth follow
    const animateCursor = () => {
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;
      
      // Faster easing - cursor follows more quickly
      cursorPos.current.x += dx * 0.25;
      cursorPos.current.y += dy * 0.25;
      
      cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      
      requestAnimationFrame(animateCursor);
    };

    document.body.appendChild(magnifyIcon);
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    animateCursor();
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeChild(magnifyIcon);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
};

export default CustomCursor;

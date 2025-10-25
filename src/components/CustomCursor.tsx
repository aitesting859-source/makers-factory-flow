import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    const updateMousePosition = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Update dot immediately
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON';
      
      dot.classList.toggle('pointer', isPointer);
    };

    // Animate cursor circle with smooth follow
    const animateCursor = () => {
      const dx = mousePos.current.x - cursorPos.current.x;
      const dy = mousePos.current.y - cursorPos.current.y;
      
      // Smooth easing - cursor follows with delay
      cursorPos.current.x += dx * 0.15;
      cursorPos.current.y += dy * 0.15;
      
      cursor.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    animateCursor();
    
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </>
  );
};

export default CustomCursor;

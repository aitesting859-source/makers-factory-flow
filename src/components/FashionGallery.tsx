import { useEffect, useRef, useState } from 'react';

interface MediaItem {
  id: number;
  type: 'image' | 'video';
  src: string;
  shootTitle: string;
  modelName: string;
  width: number;
  height: number;
  shape: 'square' | 'portrait' | 'landscape' | 'wide';
  x: number;
  y: number;
}

// Check if two rectangles overlap with small gap
const isOverlapping = (rect1: { x: number; y: number; width: number; height: number }, rect2: { x: number; y: number; width: number; height: number }) => {
  const gap = 20; // Small gap between photos
  return !(rect1.x + rect1.width + gap < rect2.x || 
           rect1.x > rect2.x + rect2.width + gap ||
           rect1.y + rect1.height + gap < rect2.y || 
           rect1.y > rect2.y + rect2.height + gap);
};

// Generate random position without overlap
const generatePosition = (width: number, height: number, existingItems: MediaItem[], containerWidth: number, yOffset: number) => {
  let attempts = 0;
  const maxAttempts = 100;
  
  while (attempts < maxAttempts) {
    const x = Math.random() * (containerWidth - width - 80) + 40;
    const y = yOffset + Math.random() * 300;
    
    const overlaps = existingItems.some(item =>
      isOverlapping({ x, y, width, height }, { x: item.x, y: item.y, width: item.width, height: item.height })
    );
    
    if (!overlaps) {
      return { x, y };
    }
    attempts++;
  }
  
  // Fallback: place in next available row
  return { x: 40 + Math.random() * 150, y: yOffset + 350 };
};

// Sample data - replace with your actual images/videos
const generateMediaItems = (): MediaItem[] => {
  const shapes = ['square', 'portrait', 'landscape', 'wide'] as const;
  const shoots = [
    { title: 'Spring Collection', models: ['Sofia M.', 'Elena K.', 'Maria L.'] },
    { title: 'Urban Noir', models: ['Alex R.', 'Nina P.', 'James D.'] },
    { title: 'Ethereal Dreams', models: ['Luna S.', 'Claire B.', 'Iris W.'] },
    { title: 'Minimalist Elegance', models: ['Anna T.', 'Zoe M.', 'Kate V.'] },
  ];

  const items: MediaItem[] = [];
  const containerWidth = 1400;
  
  for (let i = 0; i < 50; i++) {
    const shoot = shoots[Math.floor(Math.random() * shoots.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const isVideo = Math.random() < 0.15; // 15% videos
    
    let width = 300;
    let height = 300;
    
    switch (shape) {
      case 'portrait':
        width = 280;
        height = 400;
        break;
      case 'landscape':
        width = 400;
        height = 280;
        break;
      case 'wide':
        width = 500;
        height = 280;
        break;
    }

    const yOffset = Math.floor(i / 5) * 380;
    const position = generatePosition(width, height, items, containerWidth, yOffset);

    items.push({
      id: i,
      type: isVideo ? 'video' : 'image',
      src: isVideo ? '/showreel.mp4' : `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=${width}&h=${height}&fit=crop`,
      shootTitle: shoot.title,
      modelName: shoot.models[Math.floor(Math.random() * shoot.models.length)],
      width,
      height,
      shape,
      x: position.x,
      y: position.y,
    });
  }
  
  return items;
};

const FashionGallery = () => {
  const [items] = useState<MediaItem[]>(generateMediaItems());
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate total height for scrolling
  const totalHeight = Math.max(...items.map(item => item.y + item.height)) + 200;

  // Mouse handlers for horizontal drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(offsetX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - dragStart;
    setOffsetX(dragOffset + diff);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-background cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="relative mx-auto"
        style={{
          height: `${totalHeight}px`,
          width: '1400px',
          transform: `translateX(${offsetX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              width: `${item.width}px`,
              height: `${item.height}px`,
            }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl border-4 border-white group hover:scale-105 hover:z-50 transition-all duration-300">
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Suppress error and hide video element
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <img
                  src={item.src}
                  alt={`${item.shootTitle} - ${item.modelName}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              )}
              
              {/* Title overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg tracking-wide">{item.shootTitle}</h3>
                <p className="text-white/80 text-sm tracking-wider">{item.modelName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls info */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full text-white text-sm tracking-wider z-30 pointer-events-none">
        <span className="opacity-70">Scroll to move down • Drag to slide horizontally</span>
      </div>

      {/* Counter */}
      <div className="fixed top-8 right-8 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm tracking-wider z-30 pointer-events-none">
        <span>{items.length} photos</span>
      </div>
    </div>
  );
};

export default FashionGallery;

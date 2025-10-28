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
}

// Sample data - replace with your actual images/videos
const generateMediaItems = (): MediaItem[] => {
  const shapes = ['square', 'portrait', 'landscape', 'wide'] as const;
  const shoots = [
    { title: 'Spring Collection', models: ['Sofia M.', 'Elena K.', 'Maria L.'] },
    { title: 'Urban Noir', models: ['Alex R.', 'Nina P.', 'James D.'] },
    { title: 'Ethereal Dreams', models: ['Luna S.', 'Claire B.', 'Iris W.'] },
    { title: 'Minimalist Elegance', models: ['Anna T.', 'Zoe M.', 'Kate V.'] },
  ];

  return Array.from({ length: 50 }, (_, i) => {
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

    return {
      id: i,
      type: isVideo ? 'video' : 'image',
      src: isVideo ? '/showreel.mp4' : `https://images.unsplash.com/photo-${1500000000000 + i * 100000}?w=${width}&h=${height}&fit=crop`,
      shootTitle: shoot.title,
      modelName: shoot.models[Math.floor(Math.random() * shoot.models.length)],
      width,
      height,
      shape,
    };
  });
};

const FashionGallery = () => {
  const [items] = useState<MediaItem[]>(generateMediaItems());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide to next frame
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  // Mouse/Touch handlers for drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTransform((prev) => ({
      ...prev,
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Zoom handlers
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newScale = Math.min(Math.max(0.5, transform.scale + delta), 3);
    setTransform((prev) => ({ ...prev, scale: newScale }));
  };

  // Get visible items (current + nearby for smooth transitions)
  const getVisibleItems = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + items.length) % items.length;
      visible.push({ ...items[index], offset: i });
    }
    return visible;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden cursor-move bg-background"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        className="absolute inset-0 transition-transform duration-200"
        style={{
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
        }}
      >
        {getVisibleItems().map((item, idx) => {
          const offsetX = item.offset * 150;
          const offsetY = Math.sin(item.offset * 0.5) * 100;
          const rotation = item.offset * 5;
          const opacity = 1 - Math.abs(item.offset) * 0.2;

          return (
            <div
              key={`${item.id}-${idx}`}
              className="absolute transition-all duration-1000 ease-out"
              style={{
                left: '50%',
                top: '50%',
                width: `${item.width}px`,
                height: `${item.height}px`,
                transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rotation}deg)`,
                opacity: Math.abs(item.offset) > 1 ? 0 : opacity,
                zIndex: item.offset === 0 ? 20 : 10 - Math.abs(item.offset),
              }}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl border-4 border-white group">
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={`${item.shootTitle} - ${item.modelName}`}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white font-bold text-lg tracking-wide">{item.shootTitle}</h3>
                  <p className="text-white/80 text-sm tracking-wider">{item.modelName}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls info */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full text-white text-sm tracking-wider z-30">
        <span className="opacity-70">Drag to move • Scroll to zoom • Auto-slides every 4s</span>
      </div>

      {/* Counter */}
      <div className="absolute top-8 right-8 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm tracking-wider z-30">
        <span>{currentIndex + 1} / {items.length}</span>
      </div>
    </div>
  );
};

export default FashionGallery;

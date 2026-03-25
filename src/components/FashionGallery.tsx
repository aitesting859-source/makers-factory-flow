import { useEffect, useRef, useState } from 'react';
import { usePageContent } from '@/hooks/usePageContent';

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

const isOverlapping = (
  rect1: { x: number; y: number; width: number; height: number },
  rect2: { x: number; y: number; width: number; height: number }
) => {
  const gap = 20;
  return !(
    rect1.x + rect1.width + gap < rect2.x ||
    rect1.x > rect2.x + rect2.width + gap ||
    rect1.y + rect1.height + gap < rect2.y ||
    rect1.y > rect2.y + rect2.height + gap
  );
};

const generatePosition = (
  width: number,
  height: number,
  existingItems: MediaItem[],
  containerWidth: number,
  yOffset: number
) => {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const x = Math.random() * (containerWidth - width - 80) + 40;
    const y = yOffset + Math.random() * 300;

    const overlaps = existingItems.some((item) =>
      isOverlapping(
        { x, y, width, height },
        { x: item.x, y: item.y, width: item.width, height: item.height }
      )
    );

    if (!overlaps) return { x, y };
    attempts++;
  }

  return { x: 40 + Math.random() * 150, y: yOffset + 350 };
};

const shapes = ['square', 'portrait', 'landscape', 'wide'] as const;

const getDimensions = (shape: typeof shapes[number]) => {
  switch (shape) {
    case 'portrait':   return { width: 280, height: 400 };
    case 'landscape':  return { width: 400, height: 280 };
    case 'wide':       return { width: 500, height: 280 };
    default:           return { width: 300, height: 300 };
  }
};

const FashionGallery = () => {
  const { sections, loading } = usePageContent('fashion-editorial');
  const [items, setItems] = useState<MediaItem[]>([]);
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sections || sections.length === 0) return;

    // Collect all media from gallery sections and individual image/video sections
    const allMedia: { src: string; type: 'image' | 'video'; label: string }[] = [];

    sections.forEach((section: any) => {
      if (section.content_type === 'gallery' && section.media_urls) {
        section.media_urls.filter(Boolean).forEach((url: string) => {
          allMedia.push({
            src: url,
            type: 'image',
            label: section.label || 'Fashion',
          });
        });
      } else if (section.content_type === 'image' && section.media_url) {
        allMedia.push({
          src: section.media_url,
          type: 'image',
          label: section.label || 'Fashion',
        });
      } else if (section.content_type === 'video' && section.media_url) {
        allMedia.push({
          src: section.media_url,
          type: 'video',
          label: section.label || 'Fashion',
        });
      }
    });

    if (allMedia.length === 0) return;

    // Build positioned items from real media
    const containerWidth = 1400;
    const built: MediaItem[] = [];

    allMedia.forEach((media, i) => {
      const shape = shapes[i % shapes.length];
      const { width, height } = getDimensions(shape);
      const yOffset = Math.floor(i / 5) * 380;
      const position = generatePosition(width, height, built, containerWidth, yOffset);

      built.push({
        id: i,
        type: media.type,
        src: media.src,
        shootTitle: media.label,
        modelName: '',
        width,
        height,
        shape,
        x: position.x,
        y: position.y,
      });
    });

    setItems(built);
  }, [sections]);

  const totalHeight = items.length > 0
    ? Math.max(...items.map((item) => item.y + item.height)) + 200
    : 800;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(offsetX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffsetX(dragOffset + (e.clientX - dragStart));
  };

  const handleMouseUp = () => setIsDragging(false);

  if (loading) return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <span className="text-primary/40 tracking-widest">Loading gallery...</span>
    </div>
  );

  if (items.length === 0) return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      <span className="text-primary/40 tracking-widest">No gallery items yet</span>
    </div>
  );

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
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.shootTitle}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              )}

              {/* TITLE OVERLAY */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white font-bold text-lg tracking-wide">{item.shootTitle}</h3>
                {item.modelName && (
                  <p className="text-white/80 text-sm tracking-wider">{item.modelName}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CONTROLS INFO */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full text-white text-sm tracking-wider z-30 pointer-events-none">
        <span className="opacity-70">Scroll to move down • Drag to slide horizontally</span>
      </div>

      {/* COUNTER */}
      <div className="fixed top-8 right-8 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm tracking-wider z-30 pointer-events-none">
        <span>{items.length} photos</span>
      </div>
    </div>
  );
};

export default FashionGallery;
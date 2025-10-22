import { Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoControlsProps {
  isMuted: boolean;
  isFullscreen: boolean;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
}

const VideoControls = ({
  isMuted,
  isFullscreen,
  onToggleMute,
  onToggleFullscreen,
}: VideoControlsProps) => {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2 z-20">
      <Button
        variant="secondary"
        size="icon"
        onClick={onToggleMute}
        className="bg-background/80 backdrop-blur-sm hover:bg-background/90 border border-primary/20"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? (
          <VolumeX className="h-4 w-4" />
        ) : (
          <Volume2 className="h-4 w-4" />
        )}
      </Button>
      
      <Button
        variant="secondary"
        size="icon"
        onClick={onToggleFullscreen}
        className="bg-background/80 backdrop-blur-sm hover:bg-background/90 border border-primary/20"
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen ? (
          <Minimize className="h-4 w-4" />
        ) : (
          <Maximize className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default VideoControls;

import React from 'react';
import { Pause, Play } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function AudioPlayer({ audioUrl, isPlaying, onTogglePlay }: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onTogglePlay}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-emerald-600" />
        ) : (
          <Play className="h-5 w-5 text-emerald-600" />
        )}
      </button>
      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
}
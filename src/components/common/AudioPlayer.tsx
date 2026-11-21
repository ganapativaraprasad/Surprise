import { useEffect, useRef, useState } from 'react';
import { Music2, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { ChapterMusicConfig } from '../../data/music';

interface AudioPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTrack?: ChapterMusicConfig;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (vol: number) => void;
}

export function AudioPlayer({
  isPlaying,
  isMuted,
  volume,
  currentTrack,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
}: AudioPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !controlsRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, [isOpen]);

  return (
    <div
      className="sound-controls"
      ref={controlsRef}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          setIsOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <button type="button" className="story-icon-button sound-play" onClick={onTogglePlay} aria-label={isPlaying ? 'Pause music' : 'Play music'}>
        {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
      <button
        type="button"
        className="sound-toggle"
        ref={toggleRef}
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Sound settings"
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'sound-settings' : undefined}
      >
        <Music2 size={16} aria-hidden="true" />
        <span>Sound</span>
      </button>
      {isOpen && (
        <div id="sound-settings" className="sound-popover">
          <p>{currentTrack?.title ?? 'Chapter music'}</p>
          <div>
            <button type="button" className="story-icon-button" onClick={onToggleMute} aria-label={isMuted ? 'Unmute music' : 'Mute music'}>
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              aria-label="Music volume"
              onChange={(event) => onVolumeChange(event.currentTarget.valueAsNumber)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

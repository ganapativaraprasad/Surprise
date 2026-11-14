import React, { useState } from 'react';
import { Volume2, VolumeX, Pause, Play, Sliders } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  worldMode: 'memory' | 'universe';
  onTogglePlay: () => void;
  onToggleMute: () => void;
  onVolumeChange: (vol: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  isMuted,
  volume,
  worldMode,
  onTogglePlay,
  onToggleMute,
  onVolumeChange,
}) => {
  const [showSlider, setShowSlider] = useState(false);

  const isDark = worldMode === 'universe';

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-2">
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-md ${
          isDark
            ? 'bg-slate-900/70 border border-slate-700/60 text-slate-200'
            : 'bg-white/70 border border-pink-200/60 text-slate-700'
        }`}
      >
        {/* Play/Pause Button */}
        <button
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
            isPlaying
              ? isDark
                ? 'bg-violet-600/40 text-violet-200 border border-violet-400/40'
                : 'bg-pink-100 text-pink-700 border border-pink-300/50'
              : isDark
              ? 'hover:bg-slate-800 text-slate-300'
              : 'hover:bg-pink-50 text-slate-600'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Music Playing</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Play Melody</span>
            </>
          )}

          {/* Animated music wave bars when playing */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-current rounded-full animate-[pulse_0.7s_infinite_ease-in-out]" style={{ height: '70%' }} />
              <span className="w-0.5 bg-current rounded-full animate-[pulse_0.9s_infinite_ease-in-out_0.2s]" style={{ height: '100%' }} />
              <span className="w-0.5 bg-current rounded-full animate-[pulse_0.6s_infinite_ease-in-out_0.4s]" style={{ height: '50%' }} />
            </div>
          )}
        </button>

        {/* Mute/Unmute */}
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          className={`p-1.5 rounded-full transition-colors ${
            isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-pink-50 text-slate-600'
          }`}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Volume toggle slider */}
        <button
          onClick={() => setShowSlider(!showSlider)}
          aria-label="Volume settings"
          className={`p-1.5 rounded-full transition-colors hidden sm:block ${
            showSlider
              ? isDark ? 'bg-violet-900/50 text-violet-300' : 'bg-pink-100 text-pink-700'
              : isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-pink-50 text-slate-400'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>

        {/* Volume Slider Dropdown */}
        {showSlider && (
          <div className="flex items-center gap-1.5 pr-1 animate-fadeIn">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
              aria-label="Volume level"
            />
          </div>
        )}
      </div>
    </div>
  );
};

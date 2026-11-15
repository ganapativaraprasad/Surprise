import React, { useState, useEffect } from 'react';
import { BirthdayPhoto } from '../../data/photos';
import { Play, Pause, ChevronLeft, ChevronRight, ZoomIn, Sparkles } from 'lucide-react';

interface CoverflowCarouselProps {
  photos: BirthdayPhoto[];
  milestoneMessages: string[];
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  activeIndex: number;
  onActiveIndexChange: (index: number | ((prev: number) => number)) => void;
}

export const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({
  photos,
  milestoneMessages,
  onSelectPhoto,
  activeIndex,
  onActiveIndexChange,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const total = photos.length;

  // Auto-play timer: advances reliably every 3000ms (3 seconds)
  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = window.setInterval(() => {
      onActiveIndexChange((prev: number) => (prev + 1) % total);
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPlaying, total, onActiveIndexChange]);

  const handleNext = () => {
    onActiveIndexChange((prev: number) => (prev + 1) % total);
  };

  const handlePrev = () => {
    onActiveIndexChange((prev: number) => (prev - 1 + total) % total);
  };

  const activePhoto = photos[activeIndex] || photos[0];
  const activeMessage = milestoneMessages[activeIndex % milestoneMessages.length];

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Top Controls Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between px-4 mb-3 text-xs sm:text-sm">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 font-mono font-bold text-xs shadow-xs border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
          <span>Step {activeIndex + 1} of {total} • {activePhoto.tag}</span>
        </div>

        {/* Play/Pause & Arrow navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition-all shadow-xs ${
              isPlaying
                ? 'bg-blue-600 text-white border-blue-600 shadow-blue-200'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title={isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3 h-3 fill-current" />
                <span>Auto-Playing (3s)</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                <span>Paused</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 shadow-xs transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3s Smooth Auto-Play Progress Indicator Bar */}
      <div className="w-full max-w-4xl px-4 mb-4">
        <div className="w-full h-1 bg-slate-200/80 rounded-full overflow-hidden">
          {isPlaying && (
            <div
              key={activeIndex}
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-auto-progress"
            />
          )}
        </div>
      </div>

      {/* 3D COVERFLOW STAGE — CLEAN, PROPER SIZE, ZERO DISTORTION */}
      <div
        className="relative w-full max-w-4xl h-[420px] sm:h-[450px] flex items-center justify-center overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Soft backdrop ambient light */}
        <div className="absolute w-80 h-80 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />

        {/* Render visible cards around activeIndex */}
        {photos.map((photo, idx) => {
          // Circular offset calculation
          let offset = idx - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          // Only display 5 cards at a time: -2, -1, 0, 1, 2
          const isVisible = Math.abs(offset) <= 2;
          if (!isVisible) return null;

          const isCenter = offset === 0;

          // Smooth 3D transforms based on offset
          let translateX = 0;
          let scale = 1;
          let rotateY = 0;
          let zIndex = 20;
          let opacity = 1;

          if (isCenter) {
            translateX = 0;
            scale = 1;
            rotateY = 0;
            zIndex = 30;
            opacity = 1;
          } else if (offset === -1) {
            translateX = -180;
            scale = 0.84;
            rotateY = 28;
            zIndex = 20;
            opacity = 0.8;
          } else if (offset === 1) {
            translateX = 180;
            scale = 0.84;
            rotateY = -28;
            zIndex = 20;
            opacity = 0.8;
          } else if (offset === -2) {
            translateX = -320;
            scale = 0.70;
            rotateY = 40;
            zIndex = 10;
            opacity = 0.45;
          } else if (offset === 2) {
            translateX = 320;
            scale = 0.70;
            rotateY = -40;
            zIndex = 10;
            opacity = 0.45;
          }

          return (
            <div
              key={photo.id}
              onClick={() => {
                if (isCenter) {
                  onSelectPhoto(photo);
                } else {
                  onActiveIndexChange(idx);
                }
              }}
              className={`absolute w-[250px] sm:w-[280px] p-3 rounded-2xl bg-white shadow-xl border cursor-pointer transition-all duration-700 ease-out flex flex-col ${
                isCenter
                  ? 'border-blue-400 ring-4 ring-blue-200/80 shadow-2xl hover:scale-102'
                  : 'border-slate-200/90 hover:opacity-100'
              }`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
                zIndex,
                opacity,
              }}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between text-xs mb-2 px-1">
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider ${
                    isCenter ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Step {idx + 1}
                </span>
                <span className="font-semibold text-pink-600 text-[11px] truncate max-w-[120px]">
                  {photo.tag || 'Milestone'}
                </span>
              </div>

              {/* Photo Frame (Moderate size, aspect 3:4, object-cover object-top so heads are completely visible) */}
              <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shadow-inner group">
                {/* Ambient backdrop */}
                <img
                  src={photo.src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-top filter blur-md opacity-30 scale-110 pointer-events-none"
                />

                {/* Main photograph */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="relative z-10 w-full h-full object-cover object-top transition-transform duration-500 rounded-lg group-hover:scale-103"
                  loading="lazy"
                />

                {/* Hover zoom icon */}
                {isCenter && (
                  <div className="absolute inset-0 z-20 bg-slate-900/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[1px]">
                    <div className="p-2.5 rounded-full bg-white/20 backdrop-blur-md shadow-md">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="mt-2.5 px-1 text-center">
                <p className="font-serif text-xs sm:text-sm font-semibold text-slate-800 line-clamp-1 leading-snug">
                  "{photo.caption}"
                </p>
                {isCenter && (
                  <span className="mt-0.5 inline-block text-[10px] font-mono text-blue-600 font-semibold group-hover:underline">
                    Tap to zoom photo ➔
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE MILESTONE SPOTLIGHT DETAIL CARD */}
      <div className="w-full max-w-2xl mt-4 p-5 sm:p-6 bg-white/95 rounded-3xl border border-blue-100 shadow-lg text-center backdrop-blur-xs">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold uppercase mb-2">
          <span>Milestone {activeIndex + 1} of {total} • {activePhoto.tag}</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
          "{activeMessage}"
        </h3>

        <p className="font-sans text-xs sm:text-sm text-slate-500 italic mt-1.5 max-w-md mx-auto">
          {activePhoto.caption}
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            onClick={() => onSelectPhoto(activePhoto)}
            className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Zoom In Full Resolution</span>
          </button>

          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Auto-Play' : 'Play Auto-Play'}</span>
          </button>
        </div>
      </div>

      {/* MILESTONE SCRUBBER (1 TO 18 NUMBERED PILLS) */}
      <div className="w-full max-w-4xl mt-6 px-2">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            Jump to any milestone (Steps 1 – 18):
          </span>
          <span className="text-[11px] font-mono text-blue-600 font-semibold">
            {activePhoto.tag}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          {photos.map((photo, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={photo.id}
                onClick={() => onActiveIndexChange(idx)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shrink-0 flex items-center gap-1 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
                }`}
                title={`Step ${idx + 1}: ${photo.tag || photo.caption}`}
              >
                <span>{idx + 1}</span>
                {isSelected && <span className="text-[10px] hidden sm:inline">({photo.tag})</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

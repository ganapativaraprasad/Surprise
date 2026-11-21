import React, { useState } from 'react';
import { BirthdayPhoto } from '../../data/photos';
import { Sparkles } from 'lucide-react';

interface TimelinePhotoProps {
  photo: BirthdayPhoto;
  index: number;
  stageLabel?: string;
  onClick?: () => void;
}

export const TimelinePhoto: React.FC<TimelinePhotoProps> = ({
  photo,
  index,
  stageLabel,
  onClick,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group relative flex w-full min-w-0 flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-2 select-none"
    >
      {/* Node Marker & Milestone Badge */}
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 text-white shadow-md group-hover:scale-110 transition-transform">
          <Sparkles className="w-4 h-4" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 ring-2 ring-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-wider text-pink-600 uppercase">
            {stageLabel || `Stage ${index + 1}`}
          </span>
          <span className="text-[11px] text-slate-500 font-semibold">{photo.tag || 'Chapter'}</span>
        </div>
      </div>

      {/* Card Body with adaptive aspect ratio */}
      <div className="w-full h-full p-3 bg-white/95 rounded-2xl shadow-md border border-pink-100 hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="photo-mat relative aspect-[4/5] w-full rounded-lg">
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-pink-100/40 to-purple-100/40 animate-pulse flex items-center justify-center">
              <span className="text-xl">🌸</span>
            </div>
          )}

          <img
            src={photo.src}
            alt={photo.alt}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full photo-fit transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
        </div>

        <div className="mt-2.5 px-1 text-center">
          <p className="font-serif text-sm font-semibold text-slate-800">
            "{photo.caption}"
          </p>
        </div>
      </div>
    </div>
  );
};

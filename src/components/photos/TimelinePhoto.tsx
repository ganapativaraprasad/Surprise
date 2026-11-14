import React, { useState } from 'react';
import { BirthdayPhoto } from '../../data/photos';
import { Sparkles } from 'lucide-react';

interface TimelinePhotoProps {
  photo: BirthdayPhoto;
  index: number;
  age: number;
  onClick?: () => void;
}

export const TimelinePhoto: React.FC<TimelinePhotoProps> = ({
  photo,
  age,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(photo.src);

  const handleImageError = () => {
    if (photo.placeholderSrc && imgSrc !== photo.placeholderSrc) {
      setImgSrc(photo.placeholderSrc);
    }
  };

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
      className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:-translate-y-2 select-none"
    >
      {/* Node Marker & Age Badge */}
      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 text-white shadow-md group-hover:scale-110 transition-transform">
          <Sparkles className="w-4 h-4" />
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 ring-2 ring-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold tracking-wider text-pink-600 uppercase">
            Age {age}
          </span>
          <span className="text-xs text-slate-500 font-semibold">{photo.year}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="w-56 sm:w-64 p-3 bg-white/95 rounded-2xl shadow-md border border-pink-100 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-pink-50 shadow-inner">
          <img
            src={imgSrc}
            alt={photo.alt}
            onError={handleImageError}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />
          {photo.tag && (
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-white/90 text-purple-700 shadow-sm backdrop-blur-xs">
              {photo.tag}
            </span>
          )}
        </div>

        <div className="mt-2.5 px-1 text-center">
          <p className="font-serif text-sm font-semibold text-slate-800 line-clamp-2">
            {photo.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

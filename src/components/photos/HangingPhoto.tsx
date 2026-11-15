import React, { useState } from 'react';
import { BirthdayPhoto } from '../../data/photos';

interface HangingPhotoProps {
  photo: BirthdayPhoto;
  index: number;
  onClick?: () => void;
}

export const HangingPhoto: React.FC<HangingPhotoProps> = ({
  photo,
  index,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(photo.src);

  const handleImageError = () => {
    if (photo.placeholderSrc && imgSrc !== photo.placeholderSrc) {
      setImgSrc(photo.placeholderSrc);
    }
  };

  // Staggered swing delays
  const swingDelays = ['0s', '0.6s', '1.2s', '0.3s', '0.9s', '1.5s'];
  const delay = swingDelays[index % swingDelays.length];

  const isLandscape = photo.orientation === 'landscape';
  const isSquare = photo.orientation === 'square';

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
      className="group relative flex flex-col items-center cursor-pointer select-none"
      style={{
        animation: `hangingSwing 4.5s ease-in-out infinite alternate`,
        animationDelay: delay,
        transformOrigin: 'top center',
      }}
    >
      <style>{`
        @keyframes hangingSwing {
          0% { transform: rotate(-2.5deg); }
          100% { transform: rotate(2.5deg); }
        }
      `}</style>

      {/* Hanging string */}
      <div className="w-[1.5px] h-8 sm:h-12 bg-amber-700/40 shadow-xs" />

      {/* Wooden clothespin clip */}
      <div className="relative -mt-1 z-10 w-4 h-7 bg-amber-200 border border-amber-300 rounded-xs shadow-sm flex flex-col items-center justify-between py-0.5">
        <span className="w-2.5 h-[1.5px] bg-amber-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
      </div>

      {/* Polaroid Card with adaptive width & aspect ratio */}
      <div
        className={`-mt-2 p-3 pb-7 bg-white rounded-md shadow-lg border border-slate-100 group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300 ${
          isLandscape
            ? 'w-64 sm:w-72'
            : isSquare
            ? 'w-56 sm:w-60'
            : 'w-52 sm:w-56'
        }`}
      >
        <div
          className={`relative w-full rounded overflow-hidden bg-pink-50 ${
            isLandscape
              ? 'aspect-[4/3]'
              : isSquare
              ? 'aspect-square'
              : 'aspect-[3/4]'
          }`}
        >
          <img
            src={imgSrc}
            alt={photo.alt}
            onError={handleImageError}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        <div className="mt-3 text-center px-1">
          <p className="font-script text-xl text-slate-800 leading-tight group-hover:text-pink-600 transition-colors">
            {photo.caption}
          </p>
          {photo.tag && (
            <span className="inline-block mt-1 text-[10px] font-bold tracking-wider text-pink-600 uppercase">
              {photo.tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};


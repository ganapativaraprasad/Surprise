import React, { useState } from 'react';
import { BirthdayPhoto } from '../../data/photos';

interface PolaroidPhotoProps {
  photo: BirthdayPhoto;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'auto';
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({
  photo,
  onClick,
  className = '',
  size = 'md',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const rotation = photo.rotation || 0;

  // Adapt container width based on orientation and size
  const isLandscape = photo.orientation === 'landscape';

  const widthClasses = {
    sm: isLandscape ? 'w-64 sm:w-72' : 'w-48 sm:w-56',
    md: isLandscape ? 'w-72 sm:w-84 md:w-96' : 'w-60 sm:w-68 md:w-76',
    lg: isLandscape ? 'w-80 sm:w-96 md:w-[440px]' : 'w-72 sm:w-80 md:w-96',
    auto: 'w-full',
  }[size];

  // Dynamic aspect ratio container matching photograph's real orientation
  const aspectClass = isLandscape
    ? 'aspect-[4/3] sm:aspect-[16/11]'
    : photo.aspectRatio < 0.6
    ? 'aspect-[9/16]'
    : 'aspect-[3/4] sm:aspect-[4/5]';

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
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      className={`polaroid-frame group cursor-pointer transition-all duration-300 select-none ${widthClasses} ${className}`}
    >
      {/* Photo Frame Container adapting to photo orientation */}
      <div className={`photo-mat relative ${aspectClass} w-full rounded`}>
        {/* Loading shimmer */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100/40 via-purple-100/40 to-pink-100/40 animate-pulse flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
        )}

        <img
          src={photo.src}
          alt={photo.alt}
          onLoad={() => setIsLoaded(true)}
          className={`photo-fit h-full w-full transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />


        {/* Orientation Indicator & Year Badge */}
        {photo.year && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider bg-white/85 text-pink-700 shadow-sm backdrop-blur-xs">
            {photo.year}
          </span>
        )}
      </div>

      {/* Caption Section */}
      <div className="mt-3 px-1 text-center">
        <p className="font-script text-xl sm:text-2xl text-slate-700 leading-tight group-hover:text-pink-700 transition-colors">
          "{photo.caption}"
        </p>
        {photo.tag && (
          <span className="inline-block mt-0.5 text-[10px] uppercase tracking-widest font-semibold text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full">
            {photo.tag}
          </span>
        )}
      </div>
    </div>
  );
};

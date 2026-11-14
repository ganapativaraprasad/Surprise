import React, { useState } from 'react';
import { BirthdayPhoto } from '../../data/photos';

interface PolaroidPhotoProps {
  photo: BirthdayPhoto;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PolaroidPhoto: React.FC<PolaroidPhotoProps> = ({
  photo,
  onClick,
  className = '',
  size = 'md',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(photo.src);

  const rotation = photo.rotation || 0;

  const sizeClasses = {
    sm: 'w-48 sm:w-56',
    md: 'w-60 sm:w-68 md:w-72',
    lg: 'w-72 sm:w-80 md:w-96',
  }[size];

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
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      className={`polaroid-frame group cursor-pointer transition-all duration-300 select-none ${sizeClasses} ${className}`}
    >
      {/* Photo Frame Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-pink-50/50 shadow-inner">
        {/* Loading shimmer */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100/40 via-purple-100/40 to-pink-100/40 animate-pulse flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>
        )}

        <img
          src={imgSrc}
          alt={photo.alt}
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          className={`h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Vintage Vignette Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Year Badge */}
        {photo.year && (
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider bg-white/80 text-pink-700 shadow-sm backdrop-blur-xs">
            {photo.year}
          </span>
        )}
      </div>

      {/* Caption Section */}
      <div className="mt-3 px-1 text-center">
        <p className="font-script text-xl sm:text-2xl text-slate-700 leading-tight group-hover:text-pink-700 transition-colors">
          {photo.caption}
        </p>
        {photo.tag && (
          <span className="inline-block mt-0.5 text-[10px] uppercase tracking-widest font-semibold text-slate-600">
            {photo.tag}
          </span>
        )}
      </div>
    </div>
  );
};


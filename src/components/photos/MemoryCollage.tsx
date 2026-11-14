import React, { useState } from 'react';
import { BirthdayPhoto } from '../../data/photos';
import { Heart, Sparkles } from 'lucide-react';

interface MemoryCollageProps {
  photos: BirthdayPhoto[];
  onSelectPhoto: (photo: BirthdayPhoto) => void;
}

export const MemoryCollage: React.FC<MemoryCollageProps> = ({ photos, onSelectPhoto }) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-6">
      {/* Film Strip Display on Top */}
      <div className="relative mb-8 overflow-hidden rounded-xl bg-slate-900 p-4 sm:p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/60 text-slate-300">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="font-mono text-xs tracking-widest uppercase font-semibold">
              KODAK MEMORIES 2004-2026 • BEST FRIENDS ROLL
            </span>
          </div>
          <span className="font-mono text-xs text-amber-300/80">ISO 400 • 35MM</span>
        </div>

        {/* Film Strip frames */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {photos.map((photo, i) => (
            <FilmFrameItem key={photo.id} photo={photo} index={i} onClick={() => onSelectPhoto(photo)} />
          ))}
        </div>
      </div>

      {/* Floating Scrapbook Layout below */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {photos.slice(0, 3).map((photo, idx) => (
          <div
            key={`scrapbook-${photo.id}`}
            onClick={() => onSelectPhoto(photo)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectPhoto(photo);
              }
            }}
            className={`group relative p-4 bg-white/95 rounded-2xl shadow-lg border border-pink-100 hover:shadow-2xl transition-all duration-300 cursor-pointer ${
              idx === 1 ? 'md:-translate-y-4 md:rotate-1' : idx === 2 ? 'md:rotate-[-2deg]' : 'md:rotate-[1.5deg]'
            }`}
          >
            {/* Scrapbook Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-200/70 backdrop-blur-xs rounded-sm shadow-xs rotate-[-1deg]" />

            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-pink-50">
              <img
                src={photo.src}
                alt={photo.alt}
                onError={(e) => {
                  if (photo.placeholderSrc && e.currentTarget.src !== photo.placeholderSrc) {
                    e.currentTarget.src = photo.placeholderSrc;
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 text-rose-500 shadow-sm">
                <Heart className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>

            <div className="mt-3 px-1 text-center">
              <span className="text-xs font-bold text-pink-600 tracking-wider uppercase">
                {photo.tag || 'Special Memory'}
              </span>
              <p className="mt-1 font-serif text-sm font-semibold text-slate-800 leading-snug">
                "{photo.caption}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FilmFrameItem: React.FC<{ photo: BirthdayPhoto; index: number; onClick: () => void }> = ({
  photo,
  index,
  onClick,
}) => {
  const [imgSrc, setImgSrc] = useState(photo.src);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative cursor-pointer flex flex-col items-center bg-slate-950 p-2 rounded border border-slate-800 hover:border-amber-400/80 transition-all"
    >
      <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-slate-800">
        <img
          src={imgSrc}
          alt={photo.alt}
          onError={() => {
            if (photo.placeholderSrc && imgSrc !== photo.placeholderSrc) {
              setImgSrc(photo.placeholderSrc);
            }
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="w-full mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>0{index + 1}A</span>
        <span className="text-amber-400/90 font-semibold">{photo.year || '2026'}</span>
      </div>
    </div>
  );
};

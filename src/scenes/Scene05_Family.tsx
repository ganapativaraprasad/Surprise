import React from 'react';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { Home, Sparkles, Heart } from 'lucide-react';

interface Scene05Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene05_Family: React.FC<Scene05Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.family;
  const photos = birthdayPhotos.family;

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#FFF9F3] via-[#FFFDF5] to-[#FDF5F2] text-[#4A3E4D] overflow-hidden">
      {/* Warm Golden Glows */}
      <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-amber-100/50 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Home className="w-3.5 h-3.5" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-4 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-amber-600">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-semibold text-slate-600">
            Unconditional Love • 6 Keepsakes
          </span>
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Elegant Warm Family Photo Gallery */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {photos.map((photo: BirthdayPhoto, index: number) => {
            return (
              <div
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectPhoto(photo);
                  }
                }}
                className="group cursor-pointer bg-white/90 rounded-2xl p-4 shadow-md hover:shadow-2xl border border-amber-100/80 transition-all duration-300 hover:-translate-y-2 select-none"
              >
                {/* Gold accent border container */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-amber-50/60 p-1 border border-amber-200/50">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    onError={(e) => {
                      if (photo.placeholderSrc && e.currentTarget.src !== photo.placeholderSrc) {
                        e.currentTarget.src = photo.placeholderSrc;
                      }
                    }}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50" />
                  {photo.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-amber-900 shadow-sm backdrop-blur-xs">
                      {photo.tag}
                    </span>
                  )}
                </div>

                <div className="mt-4 text-center px-2">
                  <p className="font-serif text-base font-bold text-slate-800 leading-snug group-hover:text-amber-800 transition-colors">
                    "{photo.caption}"
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-amber-700/80 font-medium">
                    <Heart className="w-3 h-3 fill-current text-rose-400" />
                    <span>Family Memory #{index + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Chapter Prompt */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <button
            onClick={onNextChapter}
            className="group px-7 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Step Into Chapter 04: Friends & Celebrations →
          </button>
        </div>
      </div>
    </div>
  );
};

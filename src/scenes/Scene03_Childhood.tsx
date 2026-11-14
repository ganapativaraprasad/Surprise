import React from 'react';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { PolaroidPhoto } from '../components/photos/PolaroidPhoto';
import { Sparkles, Heart } from 'lucide-react';

interface Scene03Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene03_Childhood: React.FC<Scene03Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.childhood;
  const photos = birthdayPhotos.childhood;

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#FFFDF9] via-[#FFF5F8] to-[#FBF4FC] text-[#4A3E4D] overflow-hidden">
      {/* Background Soft Blurs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-4 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-pink-400">
          <Heart className="w-4 h-4 fill-current" />
          <span className="text-xs uppercase tracking-widest font-semibold text-slate-500">
            6 Precious Childhood Memories
          </span>
          <Heart className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* Scrapbook Staggered Layout (Not a generic rigid grid) */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 justify-items-center">
          {photos.map((photo: BirthdayPhoto, index: number) => {
            // Apply slight dynamic vertical offset for scrapbook feel
            const offsetClasses = [
              'lg:translate-y-0',
              'lg:translate-y-8',
              'lg:-translate-y-4',
              'lg:translate-y-6',
              'lg:-translate-y-2',
              'lg:translate-y-4',
            ][index % 6];

            return (
              <div key={photo.id} className={`w-full flex justify-center ${offsetClasses}`}>
                <PolaroidPhoto
                  photo={photo}
                  onClick={() => onSelectPhoto(photo)}
                  size="md"
                />
              </div>
            );
          })}
        </div>

        {/* Next Chapter Prompt */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
            Ready to see how the years blossomed?
          </p>
          <button
            onClick={onNextChapter}
            className="group px-7 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Continue to Chapter 02: Growing Up →
          </button>
        </div>
      </div>
    </div>
  );
};

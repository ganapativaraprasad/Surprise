import React from 'react';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { HangingPhoto } from '../components/photos/HangingPhoto';
import { Users, Smile } from 'lucide-react';

interface Scene06Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene06_Friends: React.FC<Scene06Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.friends;
  const photos = birthdayPhotos.friends;

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#FDF5F2] via-[#F8EEF8] to-[#FFF3F6] text-[#4A3E4D] overflow-hidden">
      {/* Background Cheerful Accents */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Users className="w-3.5 h-3.5" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-4 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-purple-600">
          <Smile className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-semibold text-slate-600">
            5 Celebratory Moments With Friends
          </span>
          <Smile className="w-4 h-4" />
        </div>
      </div>

      {/* Clothesline Twine across top of photos */}
      <div className="relative max-w-5xl mx-auto mb-2">
        <div className="w-full h-[2px] bg-amber-800/20 shadow-xs hidden sm:block" />
      </div>

      {/* Hanging Photos Presentation */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 lg:gap-10">
          {photos.map((photo: BirthdayPhoto, index: number) => (
            <div key={photo.id} className="flex justify-center">
              <HangingPhoto
                photo={photo}
                index={index}
                onClick={() => onSelectPhoto(photo)}
              />
            </div>
          ))}
        </div>

        {/* Next Chapter Prompt */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <button
            onClick={onNextChapter}
            className="group px-7 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Enter Chapter 05: Our Little World →
          </button>
        </div>
      </div>
    </div>
  );
};

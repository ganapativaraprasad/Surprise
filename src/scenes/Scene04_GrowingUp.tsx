import React, { useRef } from 'react';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { TimelinePhoto } from '../components/photos/TimelinePhoto';
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface Scene04Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene04_GrowingUp: React.FC<Scene04Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.growingUp;
  const photos = birthdayPhotos.growingUp;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Ages corresponding to timeline points: 12, 14, 16, 18, 20, 22
  const timelineAges = [12, 14, 16, 18, 20, 22];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#FBF4FC] via-[#F4F9FF] to-[#FFF9F3] text-[#4A3E4D] overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-4 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-xs font-mono tracking-widest uppercase text-slate-600">
            Scroll or drag through the years 2016 → 2026
          </span>
        </div>
      </div>

      {/* Desktop Scroll Controls */}
      <div className="hidden lg:flex items-center justify-end max-w-6xl mx-auto mb-4 gap-2 pr-4">
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll timeline left"
          className="p-2 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll timeline right"
          className="p-2 rounded-full bg-white shadow-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Chronological Timeline Container */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Horizontal Scroll on Desktop / Wrap on Mobile */}
        <div
          ref={scrollContainerRef}
          className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-6 overflow-x-auto pb-8 pt-4 no-scrollbar scroll-smooth"
        >
          {photos.map((photo: BirthdayPhoto, index: number) => (
            <div key={photo.id} className="shrink-0 w-full md:w-auto flex justify-center">
              <TimelinePhoto
                photo={photo}
                index={index}
                age={timelineAges[index] || 22}
                onClick={() => onSelectPhoto(photo)}
              />
            </div>
          ))}
        </div>

        {/* Next Chapter Prompt */}
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <button
            onClick={onNextChapter}
            className="group px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>Proceed to Chapter 03: Her Beautiful World</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

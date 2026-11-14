import React from 'react';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { MemoryCollage } from '../components/photos/MemoryCollage';
import { Heart, Sparkles } from 'lucide-react';

interface Scene07Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene07_OurMemories: React.FC<Scene07Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.ourMemories;
  const photos = birthdayPhotos.ourMemories;

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#FFF3F6] via-[#FFFDF9] to-[#F8F2FC] text-[#4A3E4D] overflow-hidden">
      {/* Soft Rosy & Lavender Blurs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>{chapter.tag} • BEST FRIENDS FOREVER</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-4 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-rose-500 font-script text-xl">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>"The kind of friendship people search lifetimes for."</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
      </div>

      {/* Memory Collage Component */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <MemoryCollage photos={photos} onSelectPhoto={onSelectPhoto} />

        {/* Next Chapter Prompt */}
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <button
            onClick={onNextChapter}
            className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Discover Chapter 06: What Makes You, You →
          </button>
        </div>
      </div>
    </div>
  );
};

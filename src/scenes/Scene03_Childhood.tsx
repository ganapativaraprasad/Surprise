import React, { useState } from 'react';
import { StoryDialog } from '../components/common/StoryDialog';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { childhoodInteractive } from '../data/interactiveContent';
import { PolaroidPhoto } from '../components/photos/PolaroidPhoto';
import { Sparkles, Heart, Star, X, ZoomIn, CheckCircle } from 'lucide-react';

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

  // Active discovered memory popup
  const [activeMemory, setActiveMemory] = useState<{
    photo: BirthdayPhoto;
    message: string;
  } | null>(null);

  // Hidden stars state
  const [collectedStars, setCollectedStars] = useState<number[]>([]);
  const [revealedStarMessage, setRevealedStarMessage] = useState<string | null>(null);

  const handleStarClick = (star: { id: number; message: string }) => {
    if (!collectedStars.includes(star.id)) {
      setCollectedStars((prev) => [...prev, star.id]);
    }
    setRevealedStarMessage(star.message);
  };

  const isAllStarsCollected = collectedStars.length === childhoodInteractive.hiddenStars.length;

  return (
    <div className="album-page">
      {/* Background Soft Blurs */}
      <div className="absolute top-10 left-1/4 w-80 h-80 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="album-heading">
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

        {/* Interactive Stats & Star Collector Badge */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-pink-200 text-xs font-semibold text-slate-600">
            <Heart className="w-3.5 h-3.5 fill-current text-pink-500" />
            <span>Tap any photo to discover its secret memory</span>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all ${
              isAllStarsCollected
                ? 'bg-amber-400 text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.5)]'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isAllStarsCollected ? 'fill-current animate-spin' : 'fill-amber-400 text-amber-500'}`} />
            <span>
              {isAllStarsCollected
                ? 'All 5 Stars Discovered! ✨'
                : `Hidden Stars: ${collectedStars.length} / 5 Found`}
            </span>
          </div>
        </div>
      </div>

      {/* Star Collector Reward Banner */}
      {isAllStarsCollected && (
        <div className="relative z-20 max-w-xl mx-auto mb-10 p-4 rounded-2xl bg-gradient-to-r from-amber-100 via-pink-100 to-purple-100 border border-amber-300 text-center shadow-lg animate-fadeIn">
          <div className="flex items-center justify-center gap-2 text-amber-800 font-bold text-sm sm:text-base">
            <Sparkles className="w-5 h-5 text-amber-500 animate-bounce" />
            <span>{childhoodInteractive.allStarsReward}</span>
            <Sparkles className="w-5 h-5 text-amber-500 animate-bounce" />
          </div>
        </div>
      )}

      {/* Dynamic Scrapbook Container with ALL 11 Photos & 5 Hidden Stars */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Hidden Interactive Stars Scattered Across the Scrapbook */}
        {childhoodInteractive.hiddenStars.map((star) => {
          const isCollected = collectedStars.includes(star.id);
          return (
            <button
              key={star.id}
              onClick={() => handleStarClick(star)}
              title={isCollected ? 'Star already found!' : 'Find secret star!'}
              style={{ left: star.x, top: star.y }}
              className={`absolute z-30 p-2.5 rounded-full transition-all duration-300 ${
                isCollected
                  ? 'bg-amber-300 text-amber-900 scale-110 shadow-[0_0_15px_rgba(251,191,36,0.6)] cursor-default'
                  : 'bg-white/80 hover:bg-amber-100 text-amber-500 shadow-md hover:scale-125 animate-pulse cursor-pointer'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>
          );
        })}

        {/* Section 1: Top Featured Showcase (First 3 Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 items-start justify-items-center mb-12">
          {photos.slice(0, 3).map((photo, index) => {
            const sweetMsg = childhoodInteractive.memoriesMessages[index % childhoodInteractive.memoriesMessages.length];

            return (
              <div key={photo.id} className="w-full flex flex-col items-center">
                <PolaroidPhoto
                  photo={photo}
                  onClick={() => setActiveMemory({ photo, message: sweetMsg })}
                  size="md"
                />
                <button
                  onClick={() => setActiveMemory({ photo, message: sweetMsg })}
                  className="mt-2 text-[11px] font-semibold text-pink-600 hover:text-pink-800 underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span>Tap to discover memory</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Section 2: Staggered Collage Layout (Next 4 Photos) */}
        <div className="relative my-10 py-8 px-4 bg-pink-50/40 rounded-3xl border border-pink-100/60 shadow-xs">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-600 font-semibold">
              The Sweetest Little Chapters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
            {photos.slice(3, 7).map((photo, index) => {
              const actualIdx = 3 + index;
              const sweetMsg = childhoodInteractive.memoriesMessages[actualIdx % childhoodInteractive.memoriesMessages.length];

              return (
                <div key={photo.id} className="w-full flex flex-col items-center">
                  <PolaroidPhoto
                    photo={photo}
                    onClick={() => setActiveMemory({ photo, message: sweetMsg })}
                    size="sm"
                  />
                  <button
                    onClick={() => setActiveMemory({ photo, message: sweetMsg })}
                    className="mt-2 text-[11px] font-semibold text-pink-600 hover:text-pink-800 underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-pink-400" />
                    <span>Tap to discover</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Nostalgic Mosaic Keepsakes (Final 4 Photos) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
          {photos.slice(7).map((photo, index) => {
            const actualIdx = 7 + index;
            const sweetMsg = childhoodInteractive.memoriesMessages[actualIdx % childhoodInteractive.memoriesMessages.length];

            return (
              <div key={photo.id} className="w-full flex flex-col items-center">
                <PolaroidPhoto
                  photo={photo}
                  onClick={() => setActiveMemory({ photo, message: sweetMsg })}
                  size="sm"
                />
                <button
                  onClick={() => setActiveMemory({ photo, message: sweetMsg })}
                  className="mt-2 text-[11px] font-semibold text-pink-600 hover:text-pink-800 underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span>Tap to discover</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Next Chapter Prompt */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
            All {photos.length} childhood memories preserved • Ready to watch time unfold?
          </p>
          <button
            onClick={onNextChapter}
            className="group px-8 py-3.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Continue to Chapter 02: Growing Up →
          </button>
        </div>
      </div>

      {/* Interaction 1: Memory Revelation Popup */}
      {activeMemory && (
        <StoryDialog
          label="Discovered memory"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onDismiss={() => setActiveMemory(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveMemory(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 mb-4 shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-pink-600">
              Discovered Memory
            </span>

            <p className="font-serif text-xl sm:text-2xl font-bold text-slate-800 mt-2 mb-3 leading-snug">
              "{activeMemory.message}"
            </p>

            <div className="photo-mat w-52 max-w-full h-40 rounded-lg my-3 border border-pink-200">
              <img
                src={activeMemory.photo.src}
                alt={activeMemory.photo.alt}
                className="w-full h-full photo-fit"
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  const p = activeMemory.photo;
                  setActiveMemory(null);
                  onSelectPhoto(p);
                }}
                className="px-5 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Zoom Photo</span>
              </button>
              <button
                onClick={() => setActiveMemory(null)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </StoryDialog>
      )}

      {/* Interaction 2: Star Message Modal */}
      {revealedStarMessage && (
        <StoryDialog
          label="Hidden star"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onDismiss={() => setRevealedStarMessage(null)}
        >
          <div
            className="relative w-full max-w-sm bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-300 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg mb-4 animate-bounce">
              <Star className="w-8 h-8 fill-current" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700">
              Hidden Star Discovered!
            </span>

            <p className="font-serif text-lg font-bold text-slate-800 mt-2 mb-4">
              "{revealedStarMessage}"
            </p>

            <div className="flex items-center gap-1 text-xs text-amber-700 font-semibold mb-6">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>{collectedStars.length} of 5 stars collected</span>
            </div>

            <button
              onClick={() => setRevealedStarMessage(null)}
              className="px-6 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              Continue Exploring
            </button>
          </div>
        </StoryDialog>
      )}
    </div>
  );
};

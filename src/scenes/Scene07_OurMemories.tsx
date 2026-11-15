import React, { useState } from 'react';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { ourMemoriesInteractive } from '../data/interactiveContent';
import { Heart, ChevronLeft, ChevronRight, Mail, Star, X, ZoomIn } from 'lucide-react';

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

  // 3D Carousel active center index
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Active opened personal note beside photo
  const [activeNoteIdx, setActiveNoteIdx] = useState<number | null>(null);

  // Sealed personal letter at the end
  const [isLetterOpened, setIsLetterOpened] = useState(false);

  // 5 Constellation stars state
  const [collectedConstellation, setCollectedConstellation] = useState<number[]>([]);
  const [activeConstellationStar, setActiveConstellationStar] = useState<string | null>(null);

  const handleNextPhoto = () => {
    setCarouselIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCarouselIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleCollectStar = (star: { id: number; message: string }) => {
    if (!collectedConstellation.includes(star.id)) {
      setCollectedConstellation((prev) => [...prev, star.id]);
    }
    setActiveConstellationStar(star.message);
  };

  const isConstellationComplete =
    collectedConstellation.length === ourMemoriesInteractive.constellationStars.length;

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#FFF3F6] via-[#FFFDF9] to-[#F8F2FC] text-[#4A3E4D] overflow-hidden">
      {/* Soft Rosy & Lavender Blurs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-10">
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

        {/* Memory Constellation Progress Badge */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs transition-all ${
              isConstellationComplete
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-300'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isConstellationComplete ? 'fill-current' : 'text-rose-500'}`} />
            <span>
              {isConstellationComplete
                ? ourMemoriesInteractive.allConstellationComplete
                : `Memory Constellation: ${collectedConstellation.length} / 5 Stars Found`}
            </span>
          </div>
        </div>
      </div>

      {/* Hidden Constellation Stars Scattered in the Scene */}
      {ourMemoriesInteractive.constellationStars.map((star, idx) => {
        const isFound = collectedConstellation.includes(star.id);
        const positions = [
          { top: '18%', left: '10%' },
          { top: '24%', right: '12%' },
          { top: '55%', left: '8%' },
          { top: '65%', right: '10%' },
          { top: '78%', left: '16%' },
        ];
        const pos = positions[idx % positions.length];

        return (
          <button
            key={star.id}
            onClick={() => handleCollectStar(star)}
            style={pos}
            className={`absolute z-30 p-2.5 rounded-full transition-all duration-300 ${
              isFound
                ? 'bg-rose-400 text-white scale-110 shadow-[0_0_15px_rgba(244,114,182,0.8)] cursor-default'
                : 'bg-white hover:bg-rose-50 text-rose-400 shadow-md hover:scale-125 animate-pulse cursor-pointer'
            }`}
            title="Collect memory star"
          >
            <Star className="w-4 h-4 fill-current" />
          </button>
        );
      })}

      {/* 1. INTERACTIVE 3D PHOTO CAROUSEL */}
      <div className="relative z-10 max-w-5xl mx-auto my-12">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Swipe or use arrows to rotate through our moments:
          </span>
        </div>

        <div className="relative flex items-center justify-center min-h-[380px] sm:min-h-[440px] perspective-1000 select-none">
          {photos.map((photo: BirthdayPhoto, index: number) => {
            const total = photos.length;
            // Calculate relative offset from active center
            let offset = index - carouselIdx;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isLeft = offset === -1;
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            return (
              <div
                key={photo.id}
                onClick={() => {
                  if (isCenter) onSelectPhoto(photo);
                  else setCarouselIdx(index);
                }}
                className={`absolute transition-all duration-500 ease-out cursor-pointer ${
                  isCenter
                    ? 'z-30 scale-105 shadow-2xl opacity-100'
                    : isLeft
                    ? 'z-10 -translate-x-44 sm:-translate-x-64 scale-90 rotate-y-25 opacity-75 blur-[0.5px]'
                    : 'z-10 translate-x-44 sm:translate-x-64 scale-90 -rotate-y-25 opacity-75 blur-[0.5px]'
                }`}
              >
                <div className="w-64 sm:w-80 bg-white rounded-3xl p-4 shadow-xl border border-rose-100 text-center flex flex-col items-center">
                  <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-rose-50 mb-3 relative group">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isCenter && (
                      <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <p className="font-serif text-base sm:text-lg font-bold text-slate-800 line-clamp-2 px-2">
                    "{photo.caption}"
                  </p>

                  {/* 2. OPEN THE MEMORY ENVELOPE BUTTON */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveNoteIdx(index);
                    }}
                    className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 shadow-xs transition-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-500" />
                    <span>Open Memory Note ✉️</span>
                  </button>
                </div>
              </div>
            );
          })}

          {/* Carousel Navigation Arrows */}
          <button
            onClick={handlePrevPhoto}
            aria-label="Previous memory"
            className="absolute left-2 sm:left-8 z-40 p-3 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-xl border border-rose-100 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextPhoto}
            aria-label="Next memory"
            className="absolute right-2 sm:right-8 z-40 p-3 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-xl border border-rose-100 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 3. A LITTLE MESSAGE FROM ME (SEALED LETTER AT END) */}
      <div className="relative z-10 max-w-2xl mx-auto my-16 text-center">
        {!isLetterOpened ? (
          <div
            onClick={() => setIsLetterOpened(true)}
            className="cursor-pointer group p-8 rounded-3xl bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 border-2 border-rose-200 shadow-xl hover:shadow-2xl hover:scale-102 transition-all select-none"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-800">
              A Little Sealed Message From Me
            </h3>

            <p className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold mt-2">
              Tap to open & unfold ✉️
            </p>
          </div>
        ) : (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-rose-200 shadow-2xl animate-fadeIn text-center relative">
            <button
              onClick={() => setIsLetterOpened(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-600 block mb-2">
              {ourMemoriesInteractive.secretLetter.salutation}
            </span>

            <p className="font-serif text-xl sm:text-2xl font-normal text-slate-800 leading-relaxed italic my-4 px-2">
              "{ourMemoriesInteractive.secretLetter.message}"
            </p>

            <div className="font-script text-2xl text-rose-600 font-bold mt-4">
              {ourMemoriesInteractive.secretLetter.signature}
            </div>
          </div>
        )}
      </div>

      {/* Next Chapter Prompt */}
      <div className="relative z-10 mt-12 flex flex-col items-center justify-center text-center">
        <button
          onClick={onNextChapter}
          className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Discover Chapter 06: What Makes You, You →
        </button>
      </div>

      {/* Opened Memory Note Modal */}
      {activeNoteIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveNoteIdx(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveNoteIdx(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
              <Heart className="w-7 h-7 fill-current" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-600">
              Personal Memory Note
            </span>

            <p className="font-serif text-xl font-bold text-slate-800 mt-2 mb-4 leading-relaxed">
              "{ourMemoriesInteractive.personalCaptions[activeNoteIdx % ourMemoriesInteractive.personalCaptions.length]}"
            </p>

            <button
              onClick={() => setActiveNoteIdx(null)}
              className="px-6 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              Cherish This Moment
            </button>
          </div>
        </div>
      )}

      {/* Constellation Star Modal */}
      {activeConstellationStar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveConstellationStar(null)}
        >
          <div
            className="relative w-full max-w-sm bg-gradient-to-b from-rose-50 to-white rounded-3xl p-6 shadow-2xl border border-rose-300 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg mb-3 animate-bounce">
              <Star className="w-7 h-7 fill-current" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-600">
              Constellation Star Unlocked
            </span>

            <p className="font-serif text-lg font-bold text-slate-800 mt-2 mb-4">
              {activeConstellationStar}
            </p>

            <button
              onClick={() => setActiveConstellationStar(null)}
              className="px-6 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

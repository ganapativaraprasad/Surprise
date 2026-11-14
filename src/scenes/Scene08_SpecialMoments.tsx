import React, { useState } from 'react';
import { chapterTitles, specialTraitsCards, InteractiveCard } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { Sparkles, RotateCw, Heart } from 'lucide-react';

interface Scene08Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene08_SpecialMoments: React.FC<Scene08Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.whatMakesYouYou;
  const cards = specialTraitsCards;
  const photos = birthdayPhotos.specialMoments;

  // Track flipped state of cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#F8F2FC] via-[#FFFDF9] to-[#FBF5F9] text-[#4A3E4D] overflow-hidden">
      {/* Decorative Aura */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
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

        <p className="mt-3 text-xs font-medium text-pink-500 uppercase tracking-widest">
          Tap each card below to reveal what makes you shine ✨
        </p>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* 3 Interactive Flipping Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-16">
          {cards.map((card: InteractiveCard) => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip(card.id);
                  }
                }}
                className="perspective-1000 w-full max-w-sm h-80 cursor-pointer select-none"
              >
                <div
                  className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT OF CARD */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl p-6 bg-white shadow-xl border border-pink-100/80 flex flex-col items-center justify-between text-center hover:shadow-2xl transition-all">
                    <div className="w-full flex justify-between items-center text-xs text-slate-400">
                      <span className="font-mono tracking-widest">SABDHA</span>
                      <RotateCw className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
                    </div>

                    <div className="flex flex-col items-center my-auto">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-100 to-purple-100 flex items-center justify-center text-4xl shadow-inner mb-4">
                        {card.frontIcon}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-slate-800">
                        {card.frontTitle}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {card.frontSubtitle}
                      </p>
                    </div>

                    <div className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                      Click to flip card ↷
                    </div>
                  </div>

                  {/* BACK OF CARD */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl flex flex-col items-center justify-between text-center border border-slate-700">
                    <div className="w-full flex justify-between items-center text-xs text-pink-300">
                      <span className="font-mono tracking-widest">FEATURE</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    </div>

                    <div className="flex flex-col items-center my-auto px-2">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl mb-3">
                        <Heart className="w-5 h-5 text-rose-400 fill-current" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-amber-200">
                        {card.backTitle}
                      </h4>
                      <p className="mt-3 text-sm text-slate-200 leading-relaxed font-light">
                        "{card.backMessage}"
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Tap again to flip back
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Supporting Photos Section */}
        <div className="mt-16 pt-12 border-t border-pink-100">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-600">
              Capturing Your Grace
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-800 mt-1">
              Moments That Reflect Your Essence
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 justify-items-center">
            {photos.map((photo: BirthdayPhoto) => (
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
                className="group relative cursor-pointer bg-white p-3 rounded-2xl shadow-md hover:shadow-xl border border-pink-100 transition-all duration-300 max-w-xs w-full"
              >
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-pink-50">
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
                  {photo.tag && (
                    <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/90 text-purple-700 shadow-sm backdrop-blur-xs">
                      {photo.tag}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-center font-serif text-sm font-semibold text-slate-700">
                  "{photo.caption}"
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Chapter Prompt */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <button
            onClick={onNextChapter}
            className="group px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Continue to Chapter 07: A Letter From Me →
          </button>
        </div>
      </div>
    </div>
  );
};

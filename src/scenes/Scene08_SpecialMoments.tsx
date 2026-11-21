import React, { useState } from 'react';
import { StoryDialog } from '../components/common/StoryDialog';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { whatMakesYouYouInteractive } from '../data/interactiveContent';
import { Sparkles, RotateCw, Heart, Star, CheckCircle, Mail, ArrowRight, X, ZoomIn } from 'lucide-react';

interface Scene08Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene08_SpecialMoments: React.FC<Scene08Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.whatMakesYouYou;
  const cards = whatMakesYouYouInteractive.cards;
  const photos = birthdayPhotos.specialMoments;

  // Track flipped state of 3 cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Track selected wishes
  const [selectedWishes, setSelectedWishes] = useState<string[]>([]);
  const [activeWishModal, setActiveWishModal] = useState<{
    title: string;
    message: string;
    icon: string;
  } | null>(null);

  // Sealed golden envelope at end
  const [isEndEnvelopeOpened, setIsEndEnvelopeOpened] = useState(false);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelectWish = (wish: { id: string; title: string; message: string; icon: string }) => {
    if (!selectedWishes.includes(wish.id)) {
      setSelectedWishes((prev) => [...prev, wish.id]);
    }
    setActiveWishModal(wish);
  };

  return (
    <div className="album-page">
      {/* Decorative Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Chapter Header */}
      <div className="album-heading">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-4 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

        <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 shadow-xs text-xs font-semibold text-pink-600">
          <span>✨ Tap each card below to flip in 3D & celebrate you</span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-20">
        {/* 1. THREE 3D FLIP CARDS — FIXED HEIGHT PREVENTS ANY COLLAPSE OR OVERLAP */}
        <section aria-label="Personality Flip Cards">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {cards.map((card) => {
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
                  style={{ height: '380px' }}
                  className="perspective-1000 w-full max-w-sm cursor-pointer select-none"
                >
                  <div
                    className={`relative w-full h-full duration-700 transform-style-3d transition-transform ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* FRONT OF CARD */}
                    <div className="absolute inset-0 backface-hidden rounded-3xl p-7 bg-white shadow-lg hover:shadow-2xl border border-pink-100 flex flex-col items-center justify-between text-center transition-all">
                      <div className="w-full flex justify-between items-center text-xs text-slate-400">
                        <span className="font-mono tracking-widest text-[11px] font-semibold text-pink-400">SABDHA 22</span>
                        <RotateCw className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '9s' }} />
                      </div>

                      <div className="flex flex-col items-center my-auto">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-100 to-purple-100 flex items-center justify-center text-4xl shadow-inner mb-4">
                          {card.icon}
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-slate-800">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 font-sans">
                          {card.frontSubtitle}
                        </p>
                      </div>

                      <div className="text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-100 px-3.5 py-1.5 rounded-full">
                        Tap to flip card ↷
                      </div>
                    </div>

                    {/* BACK OF CARD */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-7 bg-gradient-to-b from-white via-pink-50/50 to-purple-50/60 shadow-2xl border-2 border-pink-300 flex flex-col items-center justify-between text-center">
                      <div className="w-full flex justify-between items-center text-xs text-pink-600">
                        <span className="font-mono tracking-widest uppercase font-bold text-[11px]">Revealed</span>
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </div>

                      <div className="my-auto px-2">
                        <h4 className="font-serif text-xl font-bold text-slate-800 mb-3">
                          {card.backTitle}
                        </h4>
                        <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                          "{card.backMessage}"
                        </p>
                      </div>

                      <div className="text-xs font-semibold text-slate-400">
                        Tap again to flip back
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. INTERACTIVE WISH SELECTION: "CHOOSE A WISH" (CLEARLY ISOLATED & SPACIOUS) */}
        <section aria-label="Interactive Birthday Wishes">
          <div className="p-8 sm:p-10 rounded-3xl bg-white/95 border border-pink-200/90 shadow-xl text-center max-w-4xl mx-auto backdrop-blur-xs">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-mono font-bold uppercase mb-3">
              <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span>Interactive Wishes For You</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
              Choose A Birthday Wish
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-8">
              Select one or several wishes for your 22nd year — each holds a special blessing:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {whatMakesYouYouInteractive.wishes.map((wish) => {
                const isSelected = selectedWishes.includes(wish.id);

                return (
                  <button
                    key={wish.id}
                    onClick={() => handleSelectWish(wish)}
                    className={`px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-sm ${
                      isSelected
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105 ring-2 ring-pink-300'
                        : 'bg-slate-50 hover:bg-pink-50 text-slate-700 border border-slate-200 hover:scale-102'
                    }`}
                  >
                    <span className="text-lg">{wish.icon}</span>
                    <span>{wish.title}</span>
                    {isSelected && <CheckCircle className="w-4 h-4 text-emerald-300" />}
                  </button>
                );
              })}
            </div>

            {selectedWishes.length > 0 && (
              <p className="mt-5 text-xs font-mono text-pink-600 font-semibold animate-fadeIn">
                ✨ {selectedWishes.length} {selectedWishes.length === 1 ? 'wish' : 'wishes'} claimed for your 22nd year!
              </p>
            )}
          </div>
        </section>

        {/* 3. SPECIAL MOMENTS GALLERY — 100% VISIBLE WITH ZERO HEAD CROPPING */}
        {photos.length > 0 && (
          <section aria-label="Special Moments Photo Gallery">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest text-pink-700 font-bold bg-pink-100/80 border border-pink-200 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                <span>Moments That Capture Your Shine ({photos.length} Keepsakes)</span>
              </span>
              <p className="mt-2.5 text-xs text-slate-500 font-mono">
                Click any portrait to open in full screen view
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
              {photos.map((photo: BirthdayPhoto) => (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className="cursor-pointer group w-full max-w-sm bg-white p-4 rounded-3xl shadow-md hover:shadow-2xl border border-pink-100 hover:border-pink-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col select-none"
                >
                  {/* Photo mat with an ambient background */}
                  <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-pink-50/60 to-purple-50/40 flex items-center justify-center p-2 shadow-inner">
                    {/* Ambient blurred backdrop echoing photo's true colors */}
                    <img
                      src={photo.src}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-35 scale-110 pointer-events-none"
                    />

                    {/* Full photograph */}
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="relative z-10 h-full w-full photo-fit rounded-xl"
                      loading="lazy"
                    />

                    {/* Hover Zoom Indicator */}
                    <div className="absolute inset-0 z-20 bg-slate-900/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[2px]">
                      <div className="p-3 rounded-full bg-white/20 backdrop-blur-md shadow-lg">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Tag badge */}
                    {photo.tag && (
                      <span className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-white/95 text-pink-700 shadow-sm border border-pink-100">
                        {photo.tag}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 px-1 text-center">
                    <p className="font-serif text-sm sm:text-base font-semibold text-slate-800 line-clamp-2 leading-snug">
                      "{photo.caption}"
                    </p>
                    <span className="mt-1.5 inline-block text-[11px] font-mono font-medium text-pink-600 group-hover:underline">
                      Tap to view memory →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. SEALED GOLDEN ENVELOPE / TRANSITION TO CHAPTER 07 */}
        <section aria-label="Chapter Letter Transition" className="pt-8 text-center">
          {!isEndEnvelopeOpened ? (
            <button
              onClick={() => setIsEndEnvelopeOpened(true)}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 hover:from-amber-500 hover:to-pink-600 text-white font-bold text-sm tracking-widest uppercase shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <Mail className="w-5 h-5 text-amber-100 group-hover:rotate-12 transition-transform" />
              <span>A Special Message Is Waiting For You ✉️</span>
            </button>
          ) : (
            <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-tr from-amber-50 via-pink-50 to-purple-50 border-2 border-amber-300 shadow-2xl animate-fadeIn text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-pink-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <Heart className="w-8 h-8 fill-current" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-slate-800 leading-snug mb-2">
                "{whatMakesYouYouInteractive.endNotice.message}"
              </h4>

              <p className="text-xs font-mono text-pink-600 font-semibold uppercase tracking-wider mb-6">
                Personal Birthday Letter Ready
              </p>

              <button
                onClick={onNextChapter}
                className="px-8 py-3.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-sm tracking-wider uppercase shadow-md hover:scale-105 transition-all flex items-center gap-2 mx-auto"
              >
                <span>{whatMakesYouYouInteractive.endNotice.buttonText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Wish Blessing Modal */}
      {activeWishModal && (
        <StoryDialog
          label="Special moment"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onDismiss={() => setActiveWishModal(null)}
        >
          <div
            className="relative w-full max-w-sm bg-gradient-to-b from-pink-50 to-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-300 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveWishModal(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-pink-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-200 to-amber-200 flex items-center justify-center text-3xl shadow-inner mb-4 animate-bounce">
              {activeWishModal.icon}
            </div>

            <h4 className="font-serif text-2xl font-bold text-slate-800 mb-2">
              {activeWishModal.title}
            </h4>

            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-medium mb-6">
              "{activeWishModal.message}"
            </p>

            <button
              onClick={() => setActiveWishModal(null)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              Thank You ✨
            </button>
          </div>
        </StoryDialog>
      )}
    </div>
  );
};

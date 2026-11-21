import React, { useState } from 'react';
import { StoryDialog } from '../components/common/StoryDialog';
import { chapterTitles, fiveStarWishes, StarWish } from '../data/birthdayContent';
import { Star, Sparkles, CheckCircle2, RotateCcw, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Scene10Props {
  onPlayStarCollectSfx: (index: number) => void;
  onUnlockUniverse: () => void;
  onSkipGame: () => void;
}

export const Scene10_CatchStarsGame: React.FC<Scene10Props> = ({
  onPlayStarCollectSfx,
  onUnlockUniverse,
  onSkipGame,
}) => {
  const chapter = chapterTitles.game;
  const starsData = fiveStarWishes;

  // Track collected star ids
  const [collectedIds, setCollectedIds] = useState<number[]>([]);
  // Active wish modal when a star is collected
  const [activeWish, setActiveWish] = useState<StarWish | null>(null);

  // Pre-calculated aesthetic scattered positions for the 5 stars across the sky
  const starPositions = [
    { top: '21%', left: '19%' },
    { top: '20%', left: '79%' },
    { top: '69%', left: '22%' },
    { top: '73%', left: '75%' },
    { top: '43%', left: '49%' },
  ];

  const handleCollectStar = (star: StarWish) => {
    if (collectedIds.includes(star.id)) {
      // Re-open wish modal if already collected
      setActiveWish(star);
      return;
    }

    const nextCollected = [...collectedIds, star.id];
    setCollectedIds(nextCollected);
    onPlayStarCollectSfx(nextCollected.length);
    setActiveWish(star);

    // If all 5 collected, trigger celebratory star confetti
    if (nextCollected.length === 5) {
      confetti({
        disableForReducedMotion: true,
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FBBF24', '#F472B6', '#A78BFA', '#60A5FA', '#34D399'],
      });
    }
  };

  const handleReset = () => {
    setCollectedIds([]);
    setActiveWish(null);
  };

  const isCompleted = collectedIds.length === 5;

  return (
    <div className="game-page">
      {/* Background Floating Dream Clouds & Nebula */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating background tiny stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/70 animate-pulse"
            style={{
              top: `${(i * 17) % 94 + 3}%`,
              left: `${(i * 29) % 94 + 3}%`,
              width: `${(i % 3) + 1.5}px`,
              height: `${(i % 3) + 1.5}px`,
              animationDuration: `${1.5 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      {/* Game Header & Instructions */}
      <div className="game-heading">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-300/20 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{chapter.tag} • MINI-GAME</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {chapter.title}
        </h2>

        <p className="font-script text-2xl text-pink-300 mt-1">
          {chapter.subtitle}
        </p>

        <p className="mt-3 text-sm sm:text-base text-slate-300 font-light max-w-lg mx-auto">
          {chapter.intro2}
        </p>

        {/* Score & Progress Tracker */}
        <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 shadow-lg">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
            Collected:
          </span>
          <div className="flex items-center gap-1.5">
            {starsData.map((star: StarWish) => {
              const isFound = collectedIds.includes(star.id);
              return (
                <div
                  key={star.id}
                  title={star.name}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                    isFound
                      ? 'bg-amber-400 text-slate-900 shadow-lg scale-110'
                      : 'bg-white/10 text-white/30 border border-white/10'
                  }`}
                >
                  ★
                </div>
              );
            })}
          </div>
          <span className="text-xs font-mono font-bold text-amber-300 ml-1">
            {collectedIds.length}/5
          </span>
        </div>
      </div>

      {/* Interactive Sky Playfield */}
      <div className="star-board">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        {/* 5 Collectible Stars */}
        {!isCompleted && starsData.map((star: StarWish, idx: number) => {
          const isCollected = collectedIds.includes(star.id);
          const pos = starPositions[idx];

          return (
            <button
              type="button"
              key={star.id}
              onClick={() => handleCollectStar(star)}
              aria-label={isCollected ? `Read ${star.name} wish again` : `Catch ${star.name} star`}
              style={{
                top: pos.top,
                left: pos.left,
              }}
              className="sky-star absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group select-none"
              data-collected={isCollected}
            >
              {/* Star Pulsing Halo */}
              <span
                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                  isCollected
                    ? 'bg-green-400/20 scale-125'
                    : 'bg-amber-400/30 blur-md group-hover:scale-150 animate-pulse'
                }`}
              />

              {/* Star Icon Body */}
              <span
                className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-300 ${
                  isCollected
                    ? 'bg-slate-900/80 border-2 border-emerald-400 text-emerald-300 shadow-lg'
                    : 'bg-gradient-to-tr from-amber-400 to-yellow-200 text-slate-900 shadow-xl group-hover:scale-125 group-hover:rotate-12'
                }`}
              >
                {isCollected ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                ) : (
                  <Star className="w-7 h-7 fill-current text-slate-900" />
                )}
              </span>

              {/* Star Name Tag */}
              <span
                className={`block text-center mt-1 text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                  isCollected ? 'text-emerald-300' : 'text-amber-200 group-hover:text-white'
                }`}
              >
                {star.name}
              </span>
            </button>
          );
        })}

        {/* Completion Grand Star Reveal */}
        {isCompleted && !activeWish && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md p-6 text-center animate-fadeIn">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-pink-300 flex items-center justify-center text-slate-900 shadow-2xl animate-bounce">
              <Sparkles className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-white mt-4">
              {chapter.completedTitle}
            </h3>

            <p className="mt-2 text-sm sm:text-base text-pink-200 max-w-md">
              {chapter.completedSubtitle}
            </p>

            <button
              onClick={onUnlockUniverse}
              className="mt-6 px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-bold text-base sm:text-lg tracking-wider uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 animate-pulse"
            >
              <span>{chapter.unlockButton}</span>
            </button>
          </div>
        )}
      </div>

      {/* Wish Reveal Modal on collecting each star */}
      {activeWish && (
        <StoryDialog
          label="Star wish"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
          onDismiss={() => setActiveWish(null)}
        >
          <div
            className="relative max-w-sm w-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 border border-amber-300/40 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveWish(null)}
              aria-label="Close wish card"
              className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full mx-auto bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-3xl mb-3 shadow-inner">
              {activeWish.icon}
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
              Star Wish Unlocked
            </span>

            <h4 className="font-serif text-2xl font-bold text-white mt-1">
              {activeWish.title}
            </h4>

            <p className="mt-3 font-sans text-sm text-slate-200 leading-relaxed font-light">
              "{activeWish.message}"
            </p>

            <button
              onClick={() => setActiveWish(null)}
              className="mt-6 w-full py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Catch Next Star
            </button>
          </div>
        </StoryDialog>
      )}

      {/* Footer Controls: Reset & Skip */}
      <div className="relative z-10 flex items-center justify-between max-w-4xl w-full mx-auto pt-2 text-xs text-slate-400">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Stars</span>
        </button>

        <button
          onClick={onSkipGame}
          className="flex items-center gap-1 hover:text-amber-300 transition-colors underline underline-offset-4"
        >
          <span>Skip to Finale</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

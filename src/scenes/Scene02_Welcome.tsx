import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { welcomeContent } from '../data/birthdayContent';
import { Sparkles, ArrowRight, Heart, Lock, CheckCircle2, Gift } from 'lucide-react';
import { BirthdayPuzzle } from '../components/welcome/BirthdayPuzzle';

interface Scene02Props {
  onStartJourney: () => void;
}

export const Scene02_Welcome: React.FC<Scene02Props> = ({ onStartJourney }) => {
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const puzzleImageSrc = '/photos/welcome-puzzle.jpg';

  useEffect(() => {
    // Initial soft welcome confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#FFD1DC', '#E8E0F0', '#F6D365', '#FDA085', '#FFF0F5', '#C5ADE2'],
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 sm:py-16 overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFFDF9] to-[#F8F2FC] text-[#4A3E4D]">
      {/* Soft Pastel Background Glows */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-purple-200/35 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[500px] h-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      {/* Floating Decorative Balloons */}
      <div className="absolute top-8 left-6 sm:left-16 animate-float-slow pointer-events-none opacity-60">
        <div className="w-10 sm:w-12 h-14 sm:h-16 rounded-full bg-gradient-to-tr from-pink-300 to-rose-200 shadow-md relative">
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-pink-300" />
        </div>
      </div>
      <div className="absolute top-16 right-6 sm:right-20 animate-float-reverse pointer-events-none opacity-60">
        <div className="w-10 sm:w-14 h-14 sm:h-18 rounded-full bg-gradient-to-tr from-purple-300 to-indigo-200 shadow-md relative">
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-purple-300" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl w-full flex flex-col items-center text-center">
        {/* Date & Milestone Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-4 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>{welcomeContent.dateDisplay}</span>
          <span className="w-1 h-1 rounded-full bg-pink-400" />
          <span>{welcomeContent.ageHighlight}</span>
        </div>

        {/* Page Top Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800 leading-[1.15]">
          HAPPY BIRTHDAY,{' '}
          <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            SABDHA!
          </span>
        </h1>

        {/* 22 Years Decorative Highlight */}
        <div className="mt-2.5 flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-pink-300" />
          <div className="flex items-center gap-1.5 text-pink-600 font-script text-xl sm:text-2xl">
            <Heart className="w-3.5 h-3.5 fill-current text-pink-500" />
            <span>22 Years of Pure Grace</span>
            <Heart className="w-3.5 h-3.5 fill-current text-pink-500" />
          </div>
          <span className="h-[1px] w-12 bg-pink-300" />
        </div>

        {/* SPLIT 2-COLUMN SECTION: PUZZLE ON ONE SIDE, REVEAL/MESSAGE ON THE OTHER SIDE */}
        <div className="mt-10 w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">
          {/* SIDE A: THE 5x5 INTERACTIVE PUZZLE */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div className="mb-3 text-center">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-pink-700 font-bold bg-pink-50 px-3.5 py-1 rounded-full border border-pink-200">
                <Gift className="w-3.5 h-3.5 text-pink-500" />
                <span>Piece Together The Birthday Memory</span>
              </span>
              <p className="mt-1 text-xs text-slate-500 font-sans">
                Move & swap the pieces to reconstruct the original picture
              </p>
            </div>

            <BirthdayPuzzle
              imageSrc={puzzleImageSrc}
              isSolved={isPuzzleSolved}
              onSolvedChange={setIsPuzzleSolved}
            />
          </div>

          {/* SIDE B: SOLVED RESULT / HAPPY BIRTHDAY REVEAL */}
          <div className="w-full lg:w-1/2 flex flex-col items-center text-center max-w-md">
            {!isPuzzleSolved ? (
              /* State 1: Before Puzzle is Solved — Mystery Lock Preview */
              <div className="w-full flex flex-col items-center animate-fadeIn">
                {/* Moderate Mystery Frame */}
                <div className="relative w-[280px] sm:w-[300px] aspect-[9/16] rounded-2xl p-1 bg-gradient-to-tr from-pink-200 via-purple-200 to-amber-200 shadow-xl flex items-center justify-center overflow-hidden border-2 border-white/80">
                  {/* Blurred mystery background */}
                  <img
                    src={puzzleImageSrc}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover filter blur-xl opacity-30 scale-110 pointer-events-none"
                  />

                  {/* Lock & Teaser in Center */}
                  <div className="relative z-10 p-6 flex flex-col items-center bg-white/85 backdrop-blur-md rounded-xl border border-pink-100 shadow-md max-w-[240px]">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 flex items-center justify-center text-white shadow-lg mb-3 animate-pulse">
                      <Lock className="w-6 h-6" />
                    </div>

                    <h3 className="font-serif text-lg font-bold text-slate-800 leading-snug">
                      Birthday Portrait Locked
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 font-sans leading-relaxed">
                      Solve the <strong>5×5 puzzle</strong> on the left to reveal the birthday picture & sweet birthday note!
                    </p>

                    <div className="mt-4 px-3 py-1 rounded-full bg-pink-100/90 text-[10px] font-mono text-pink-700 font-semibold">
                      Hint: Tap 2 tiles to swap
                    </div>
                  </div>
                </div>

                {/* Subtitle message */}
                <p className="mt-6 font-sans text-sm sm:text-base text-slate-600 max-w-sm leading-relaxed">
                  {welcomeContent.subtitle}
                </p>

                {/* Direct Start Journey option */}
                <div className="mt-6 flex flex-col items-center">
                  <button
                    onClick={onStartJourney}
                    className="group px-7 py-3 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium text-xs sm:text-sm tracking-widest uppercase shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5"
                  >
                    <span>{welcomeContent.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <span className="mt-2 text-[11px] text-slate-400 font-mono">
                    (or solve the puzzle first for the full surprise!)
                  </span>
                </div>
              </div>
            ) : (
              /* State 2: When Puzzle is Solved — Happy Birthday Celebration with Original Image */
              <div className="w-full flex flex-col items-center animate-fadeIn">
                {/* Celebration Badge */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold tracking-widest uppercase shadow-md mb-4 animate-bounce">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Surprise Unlocked! Happy Birthday!</span>
                </div>

                {/* Moderate Original Image Frame (w-280px to 300px, aspect-9/16, moderate & proper) */}
                <div className="relative w-[280px] sm:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-amber-300 via-pink-400 to-purple-400 shadow-2xl border-4 border-pink-200">
                  {/* Glowing ambient backing */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-300/40 via-purple-300/40 to-amber-200/40 blur-lg pointer-events-none" />

                  {/* Pristine Full Original Photo */}
                  <div className="relative z-10 w-full h-full rounded-xl overflow-hidden bg-slate-100 shadow-inner">
                    <img
                      src={puzzleImageSrc}
                      alt="Sabdha 22nd Birthday portrait"
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />

                    {/* Badge on photo */}
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-xs font-serif font-bold text-slate-800 bg-white/95 shadow-md backdrop-blur-xs whitespace-nowrap border border-pink-100">
                      ✨ Pure Grace • 22 Years ✨
                    </span>
                  </div>
                </div>

                {/* Birthday Wish Text */}
                <div className="mt-5 max-w-sm px-2">
                  <h3 className="font-serif text-2xl font-extrabold text-slate-800 leading-tight">
                    Happy Birthday, Sabdha! 🎂
                  </h3>
                  <p className="mt-2 font-sans text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    "May your life be as radiant, joyful, and full of grace as your beautiful smile. Every piece of you makes this universe brighter!"
                  </p>
                </div>

                {/* Journey Start Button with celebratory pulse */}
                <button
                  onClick={onStartJourney}
                  className="mt-6 group relative px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-semibold text-sm sm:text-base tracking-widest uppercase shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 ring-4 ring-pink-200/80 animate-pulse"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>{welcomeContent.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Memory Book Footer Quote */}
        <div className="mt-14 relative p-1.5 rounded-3xl bg-gradient-to-tr from-pink-200/80 via-purple-200/80 to-amber-200/80 shadow-md max-w-md w-full">
          <div className="bg-white/95 rounded-[22px] p-5 text-center border border-white/60">
            <span className="font-serif italic text-xs sm:text-sm text-slate-500">
              "Every photograph holds a heartbeat, every year tells a story..."
            </span>
            <div className="mt-2.5 flex items-center justify-center gap-2 text-[11px] font-mono tracking-widest uppercase text-slate-400">
              <span>9 Chapters</span>
              <span>•</span>
              <span>31+ Memories</span>
              <span>•</span>
              <span>1 Magical Finale</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

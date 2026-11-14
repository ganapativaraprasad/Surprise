import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { welcomeContent } from '../data/birthdayContent';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface Scene02Props {
  onStartJourney: () => void;
}

export const Scene02_Welcome: React.FC<Scene02Props> = ({ onStartJourney }) => {
  useEffect(() => {
    // Elegant soft celebratory confetti blast
    const count = 120;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#FFD1DC', '#E8E0F0', '#F6D365', '#FDA085', '#FFF0F5', '#C5ADE2'],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFFDF9] to-[#F8F2FC] text-[#4A3E4D]">
      {/* Soft Pastel Cloud Backgrounds */}
      <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-purple-200/35 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[500px] h-96 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />

      {/* Floating Decorative Balloons */}
      <div className="absolute top-12 left-8 sm:left-24 animate-float-slow pointer-events-none opacity-70">
        <div className="w-10 sm:w-14 h-14 sm:h-18 rounded-full bg-gradient-to-tr from-pink-300 to-rose-200 shadow-md relative">
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-pink-300" />
        </div>
      </div>
      <div className="absolute top-24 right-8 sm:right-28 animate-float-reverse pointer-events-none opacity-70">
        <div className="w-12 sm:w-16 h-16 sm:h-20 rounded-full bg-gradient-to-tr from-purple-300 to-indigo-200 shadow-md relative">
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-purple-300" />
        </div>
      </div>

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center">
        {/* Date & Milestone Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 border border-pink-200/80 text-pink-700 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>{welcomeContent.dateDisplay}</span>
          <span className="w-1 h-1 rounded-full bg-pink-400" />
          <span>{welcomeContent.ageHighlight}</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-800 leading-[1.15]">
          HAPPY BIRTHDAY, <br />
          <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent">
            SABDHA!
          </span>
        </h1>

        {/* 22 Years Decorative Highlight */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-pink-300" />
          <div className="flex items-center gap-1.5 text-pink-600 font-script text-2xl sm:text-3xl">
            <Heart className="w-4 h-4 fill-current text-pink-500" />
            <span>22 Years of Pure Grace</span>
            <Heart className="w-4 h-4 fill-current text-pink-500" />
          </div>
          <span className="h-[1px] w-12 bg-pink-300" />
        </div>

        {/* Subtitle */}
        <p className="mt-6 font-sans text-base sm:text-lg md:text-xl text-slate-600 max-w-xl font-normal leading-relaxed">
          {welcomeContent.subtitle}
        </p>

        {/* Memory Book Preview Frame */}
        <div className="mt-10 relative p-1.5 rounded-3xl bg-gradient-to-tr from-pink-200 via-purple-200 to-amber-200 shadow-xl max-w-md w-full">
          <div className="bg-white/95 rounded-[22px] p-6 text-center border border-white/60">
            <span className="font-serif italic text-sm text-slate-500">
              "Every photograph holds a heartbeat, every year tells a story..."
            </span>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase text-slate-400">
              <span>9 Chapters</span>
              <span>•</span>
              <span>31+ Memories</span>
              <span>•</span>
              <span>1 Magical Finale</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartJourney}
          className="mt-10 group relative px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 text-white font-medium text-sm sm:text-base tracking-widest uppercase shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
        >
          <span>{welcomeContent.buttonText}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { finaleContent } from '../../data/birthdayContent';
import { Sparkles, Heart } from 'lucide-react';

export const BirthdayTypography: React.FC = () => {
  return (
    <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-2xl mx-auto select-none">
      {/* Date & Milestone Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-amber-200 text-xs sm:text-sm font-mono tracking-widest uppercase mb-3 shadow-lg">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>{finaleContent.date}</span>
        <span className="w-1 h-1 rounded-full bg-amber-400" />
        <span>{finaleContent.ageBadge}</span>
      </div>

      {/* Main Celestial Birthday Greeting */}
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] font-light text-slate-200 uppercase">
        {finaleContent.greeting}
      </h2>

      <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-pink-200 drop-shadow-[0_0_35px_rgba(254,240,138,0.45)] mt-1">
        {finaleContent.name}
      </h1>

      {/* Quote */}
      <p className="font-serif italic text-base sm:text-xl text-slate-300/90 font-light mt-3 max-w-lg leading-relaxed">
        "{finaleContent.quote}"
      </p>

      {/* Final Heartfelt Signature */}
      <div className="mt-4 flex items-center justify-center gap-2 text-pink-300 font-script text-xl sm:text-2xl drop-shadow-sm">
        <Heart className="w-4 h-4 fill-current text-rose-400" />
        <span>{finaleContent.signature}</span>
        <Heart className="w-4 h-4 fill-current text-rose-400" />
      </div>
    </div>
  );
};

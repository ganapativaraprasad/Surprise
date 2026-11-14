import React from 'react';
import { Sparkles } from 'lucide-react';

interface MoonProps {
  onOpenWishes: () => void;
}

export const Moon: React.FC<MoonProps> = ({ onOpenWishes }) => {
  return (
    <div
      onClick={onOpenWishes}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenWishes();
        }
      }}
      aria-label="Open 22 Birthday Wishes from the Moon"
      className="group relative cursor-pointer z-10 transition-transform duration-700 hover:scale-105 select-none"
    >
      {/* Outer Atmospheric Moonlight Radiance */}
      <div className="absolute -inset-16 rounded-full bg-gradient-to-r from-violet-400/15 via-white/20 to-amber-200/15 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
      <div className="absolute -inset-8 rounded-full bg-white/20 blur-2xl pointer-events-none" />

      {/* Full Moon Disc */}
      <div className="relative w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 rounded-full bg-gradient-to-tr from-[#E6ECF5] via-[#F8FAFC] to-[#FFFDF5] shadow-[0_0_80px_rgba(255,255,255,0.45)] border border-white/60 overflow-hidden flex items-center justify-center">
        {/* Soft Lunar Crater Textures */}
        <div className="absolute w-12 h-12 rounded-full bg-slate-300/25 blur-xs top-8 left-10" />
        <div className="absolute w-16 h-14 rounded-full bg-slate-300/20 blur-xs top-20 right-12" />
        <div className="absolute w-20 h-18 rounded-full bg-slate-300/15 blur-xs bottom-10 left-16" />
        <div className="absolute w-8 h-8 rounded-full bg-slate-400/20 blur-xs bottom-16 right-16" />
        <div className="absolute w-6 h-6 rounded-full bg-slate-400/25 blur-xs top-14 left-24" />

        {/* Soft Radial 3D Sphere Shading */}
        <div className="absolute inset-0 rounded-full bg-radial from-transparent via-slate-900/5 to-slate-900/30 pointer-events-none" />

        {/* Interactive Prompt Badge Floating Over Moon */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-2 rounded-2xl bg-slate-900/40 backdrop-blur-xs border border-white/30 text-white shadow-lg opacity-85 group-hover:opacity-100 transition-opacity">
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-amber-100 mt-1">
            22 Little Wishes
          </span>
          <span className="text-[10px] text-white/75 uppercase tracking-widest">
            Click the Moon
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { finaleContent } from '../../data/birthdayContent';
import { Sparkles, Heart, Moon as MoonIcon, RotateCcw } from 'lucide-react';

interface FinaleCinematicOverlayProps {
  onOpenWishes: () => void;
  onReplayJourney?: () => void;
}

export const FinaleCinematicOverlay: React.FC<FinaleCinematicOverlayProps> = ({
  onOpenWishes,
  onReplayJourney,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between items-center px-4 py-6 sm:py-8 select-none">
      {/* 1. TOP-LEFT CORNER: Chapter 09 Badge */}
      <div className="w-full flex items-center justify-between pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-200 tracking-widest uppercase shadow-xl hover:bg-slate-900/90 transition-all">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Chapter 09 • The Magical Universe</span>
        </div>

        {/* Replay Story from Chapter 01 in top-right */}
        {onReplayJourney && (
          <button
            onClick={onReplayJourney}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900/90 border border-white/20 text-xs font-mono text-slate-300 hover:text-white backdrop-blur-md transition-all shadow-lg hover:scale-105 active:scale-95"
            title="Replay entire journey from Chapter 01"
          >
            <RotateCcw className="w-3 h-3 text-amber-300" />
            <span>Replay Story</span>
          </button>
        )}
      </div>

      {/* 2. CENTER SECTION: Final Birthday Typography (Positioned naturally below the star constellation) */}
      <div className="w-full max-w-3xl my-auto text-center px-4 pointer-events-auto transition-all duration-1000 mt-12 sm:mt-16">
        {/* Date & Milestone Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/70 backdrop-blur-md border border-amber-300/30 text-amber-200 text-xs sm:text-sm font-mono tracking-widest uppercase mb-3 shadow-[0_0_25px_rgba(251,191,36,0.25)]">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          <span>22 • 11 • 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>22 Years of Beautiful You</span>
        </div>

        {/* Main Grand Birthday Greeting */}
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl tracking-[0.25em] font-light text-slate-100 uppercase drop-shadow-lg">
          {finaleContent.greeting}
        </h2>

        {/* Constellation Name Slot: Dedicated space for the 3D celestial star constellation "SABDHA" */}
        <div className="h-20 sm:h-28 md:h-32 my-2 flex items-center justify-center pointer-events-none" />

        {/* Quote */}
        <p className="font-serif italic text-base sm:text-xl md:text-2xl text-slate-200/90 font-light mt-4 max-w-xl mx-auto leading-relaxed drop-shadow-md">
          "May your life shine as beautifully as these stars."
        </p>

        {/* Handwritten Personal Dedication */}
        <div className="mt-5 flex items-center justify-center gap-2 text-pink-300 font-script text-2xl sm:text-3xl drop-shadow-md">
          <Heart className="w-5 h-5 fill-current text-rose-400 animate-pulse" />
          <span>Created with love, just for you. ❤️</span>
          <Heart className="w-5 h-5 fill-current text-rose-400 animate-pulse" />
        </div>
      </div>

      {/* 3. BOTTOM CONTROLS & INTERACTIVE HINTS */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 pointer-events-auto pb-2">
        {/* Interactive Tips */}
        <div className="flex items-center gap-2 text-slate-400 text-center sm:text-left bg-slate-950/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>Click Moon for Wishes • Click Lake for Ripples • Click Sky for Stars</span>
        </div>

        {/* 22 Little Wishes Button */}
        <button
          onClick={onOpenWishes}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-500 hover:to-indigo-500 text-white font-serif font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(139,92,246,0.45)] hover:scale-105 transition-all flex items-center gap-2"
        >
          <MoonIcon className="w-4 h-4 text-amber-300 fill-current" />
          <span>22 Little Wishes</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};

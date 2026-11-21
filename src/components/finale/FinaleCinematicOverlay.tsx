import React from 'react';
import { finaleContent } from '../../data/birthdayContent';
import { BirthdayPhoto } from '../../data/photos';
import { Sparkles, Heart, Moon as MoonIcon, RotateCcw } from 'lucide-react';

interface FinaleCinematicOverlayProps {
  constellationSlot: React.RefObject<HTMLDivElement>;
  onOpenWishes: () => void;
  onReplayJourney?: () => void;
  portrait: BirthdayPhoto | null;
  onSelectPhoto: (photo: BirthdayPhoto) => void;
}

export const FinaleCinematicOverlay: React.FC<FinaleCinematicOverlayProps> = ({
  constellationSlot,
  onOpenWishes,
  onReplayJourney,
  portrait,
  onSelectPhoto,
}) => {
  return (
    <div className="finale-overlay">
      {/* 1. TOP-LEFT CORNER: Chapter 09 Badge */}
      <div className="finale-topline">
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

      {/* 2. CENTER SECTION: Final Birthday Typography */}
      <div className="finale-greeting">
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
        <div ref={constellationSlot} className="finale-constellation-slot h-20 sm:h-28 md:h-32 mt-3 mb-2">
          <span>SABDHA</span>
        </div>

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
      <div className="finale-actions">
        {/* Interactive Tips */}
        <div className="flex items-center gap-2 text-slate-400 text-center sm:text-left bg-slate-950/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>Click Moon for Wishes • Click Lake for Ripples • Click Sky for Stars</span>
        </div>

        {/* 22 Little Wishes Button */}
        {portrait && (
          <button type="button" className="finale-keepsake" onClick={() => onSelectPhoto(portrait)}>
            <img src={portrait.src} alt="" />
            <span>{portrait.tag ?? 'Birthday keepsake'}</span>
          </button>
        )}
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

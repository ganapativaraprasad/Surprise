import React, { useState, useEffect } from 'react';
import { NightSkyCanvas } from '../components/finale/NightSkyCanvas';
import { Moon } from '../components/finale/Moon';
import { Mountains } from '../components/finale/Mountains';
import { BirthdayTypography } from '../components/finale/BirthdayTypography';
import { TwentyTwoWishesModal } from '../components/finale/TwentyTwoWishesModal';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { Sparkles, RotateCcw, Image } from 'lucide-react';

interface Scene11Props {
  onPlayWaterDropSfx: () => void;
  onPlayStarCollectSfx: () => void;
  onReplayJourney: () => void;
  onSelectPhoto: (photo: BirthdayPhoto) => void;
}

export const Scene11_FinalUniverse: React.FC<Scene11Props> = ({
  onPlayWaterDropSfx,
  onPlayStarCollectSfx,
  onReplayJourney,
  onSelectPhoto,
}) => {
  const [isWishesOpen, setIsWishesOpen] = useState(false);
  const [transitionStage, setTransitionStage] = useState(0);

  // Staged cinematic sequence on entering the Magical Universe
  useEffect(() => {
    // Stage 1: Initial star burst expansion (0s)
    const t1 = setTimeout(() => setTransitionStage(1), 300); // Stage 1: Night sky & stars reveal
    const t2 = setTimeout(() => setTransitionStage(2), 900); // Stage 2: Mountains & lake emerge
    const t3 = setTimeout(() => setTransitionStage(3), 1600); // Stage 3: Moon reveals & glows
    const t4 = setTimeout(() => setTransitionStage(4), 2300); // Stage 4: Typography & fireflies appear

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const finalePhoto = birthdayPhotos.finale;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050814] text-white flex flex-col justify-between select-none">
      {/* 1. HTML5 Canvas: Deep Night Sky, Twinkling Stars, Shooting Stars, Lake & Ripples */}
      <NightSkyCanvas
        onLakeClick={onPlayWaterDropSfx}
        onSkyClick={onPlayStarCollectSfx}
      />

      {/* 2. Mountain Silhouettes framing the lake */}
      <div
        className={`transition-opacity duration-1000 ${
          transitionStage >= 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Mountains />
      </div>

      {/* 3. Top Section: Centered Full Moon */}
      <div
        className={`relative z-10 w-full flex flex-col items-center pt-8 sm:pt-12 transition-all duration-1000 ${
          transitionStage >= 3
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 -translate-y-8 scale-90'
        }`}
      >
        <Moon onOpenWishes={() => setIsWishesOpen(true)} />
      </div>

      {/* 4. Middle Section: Birthday Typography */}
      <div
        className={`relative z-20 my-auto py-4 transition-all duration-1000 delay-300 ${
          transitionStage >= 4
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <BirthdayTypography />

        {/* Optional Keepsake Finale Photo Button if available */}
        {finalePhoto && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => onSelectPhoto(finalePhoto)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-pink-200 border border-white/20 backdrop-blur-xs transition-all shadow-md"
            >
              <Image className="w-3.5 h-3.5" />
              <span>View Sabdha's 22nd Portrait</span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Bottom Interactive Controls over Calm Lake */}
      <div
        className={`relative z-20 w-full max-w-4xl mx-auto px-4 pb-16 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 transition-opacity duration-1000 ${
          transitionStage >= 4 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Left Tip */}
        <div className="flex items-center gap-2 text-slate-400 text-center sm:text-left">
          <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
          <span>Tap the sky for star bursts • Tap the lake for ripples</span>
        </div>

        {/* Center / Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Explore 22 Wishes Button */}
          <button
            onClick={() => setIsWishesOpen(true)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold shadow-lg hover:shadow-violet-500/30 transition-all flex items-center gap-2"
          >
            <span>22 Little Wishes</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </button>

          {/* Replay Entire Story */}
          <button
            onClick={onReplayJourney}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all flex items-center gap-1.5"
            title="Replay journey from Chapter 01"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </button>
        </div>
      </div>

      {/* 22 Little Wishes Modal */}
      <TwentyTwoWishesModal
        isOpen={isWishesOpen}
        onClose={() => setIsWishesOpen(false)}
        onStarClickSfx={onPlayStarCollectSfx}
      />
    </div>
  );
};

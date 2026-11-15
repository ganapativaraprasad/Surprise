import React, { useState } from 'react';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { growingUpInteractive } from '../data/interactiveContent';
import { CoverflowCarousel } from '../components/growingUp/CoverflowCarousel';
import { TimelinePhoto } from '../components/photos/TimelinePhoto';
import { Clock, Lock, Unlock, ArrowRight, LayoutGrid, Sparkles, Layers } from 'lucide-react';

interface Scene04Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene04_GrowingUp: React.FC<Scene04Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.growingUp;
  const photos = birthdayPhotos.growingUp;

  // Active milestone index (0 to 17)
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState<number>(0);

  // View mode toggle: 'coverflow' | 'grid'
  const [viewMode, setViewMode] = useState<'coverflow' | 'grid'>('coverflow');

  // Then & Now slider position (0 to 100%)
  const [sliderPos, setSliderPos] = useState<number>(50);

  // Unlocked end milestone state
  const [isEndMilestoneUnlocked, setIsEndMilestoneUnlocked] = useState<boolean>(false);

  // Compare Childhood (photo 18 = toddler in maroon frock) vs Now (Age 22 = attached portrait)
  const thenPhoto: BirthdayPhoto = {
    id: 'then-childhood',
    src: '/photos/growing-up/photo-18.jpg',
    caption: 'Little footsteps filled with innocence, curiosity, and wonder.',
    tag: 'Little Steps',
    alt: 'Sabdha Childhood in maroon dress',
    width: 1200,
    height: 1600,
    aspectRatio: 0.75,
    orientation: 'portrait',
  };

  const nowPhoto: BirthdayPhoto = {
    id: 'now-22-portrait',
    src: '/photos/sabdha-now-22.jpg',
    caption: 'Standing here today at 22, poised, radiant, and full of grace.',
    tag: 'Golden 22',
    alt: 'Sabdha at 22 today',
    width: 576,
    height: 1024,
    aspectRatio: 0.56,
    orientation: 'portrait',
  };

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 pt-16 pb-36 bg-gradient-to-b from-[#FBF4FC] via-[#F4F9FF] to-[#FFF9F3] text-[#4A3E4D] overflow-hidden">
      {/* Soft Background Auras */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 -right-32 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Chapter Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-blue-600" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-3.5 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

        {/* View Mode Switcher */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="inline-flex p-1 bg-white/90 border border-slate-200 rounded-full shadow-xs">
            <button
              onClick={() => setViewMode('coverflow')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'coverflow'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Coverflow View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Timeline Grid View</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* SECTION 1: 3D COVERFLOW OR TIMELINE GRID */}
        {viewMode === 'coverflow' ? (
          <section aria-label="3D Coverflow Timeline">
            <CoverflowCarousel
              photos={photos}
              milestoneMessages={growingUpInteractive.milestoneMessages}
              onSelectPhoto={onSelectPhoto}
              activeIndex={activeMilestoneIdx}
              onActiveIndexChange={setActiveMilestoneIdx}
            />
          </section>
        ) : (
          /* Alternate Grid View: Clean, ordered display of all 18 photos */
          <section aria-label="Timeline Grid View">
            <div className="text-center mb-8">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200 shadow-xs">
                All 18 Milestones in Chronological Sequence (Steps 1 – 18)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {photos.map((photo, index) => (
                <div
                  key={photo.id}
                  onClick={() => onSelectPhoto(photo)}
                  className="cursor-pointer hover:scale-103 transition-transform"
                >
                  <TimelinePhoto
                    photo={photo}
                    index={index}
                    stageLabel={`Step ${index + 1}`}
                    onClick={() => onSelectPhoto(photo)}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: INTERACTIVE "THEN AND NOW" COMPARISON REVEAL */}
        <section aria-label="Then and Now Comparison" className="pt-4">
          <div className="max-w-3xl mx-auto p-6 sm:p-10 bg-white/95 rounded-3xl border border-blue-200 shadow-xl text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>{growingUpInteractive.thenAndNow.title}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
              "{growingUpInteractive.thenAndNow.subtitle}"
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 font-sans italic mt-1.5 mb-8">
              Drag the interactive slider below to witness time gracefully unfold:
            </p>

            {/* Draggable Comparison Window (Moderate, 9:16 aspect ratio, max-w-xs) */}
            <div className="relative max-w-[280px] sm:max-w-[300px] mx-auto aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-4 border-white select-none bg-slate-100">
              {/* NOW Photo (Background / Age 22) */}
              <img
                src={nowPhoto.src}
                alt="Sabdha Now at 22"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-slate-900/85 text-white text-[11px] font-mono font-bold shadow-lg backdrop-blur-xs border border-white/20">
                NOW (Age 22) ✨
              </span>

              {/* THEN Photo (Foreground clipped by slider / Childhood baby frock) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden z-10"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={thenPhoto.src}
                  alt="Sabdha Childhood Then"
                  className="absolute inset-0 w-full h-full object-cover object-top max-w-none"
                  style={{ width: '100%', height: '100%' }}
                />
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-pink-600/90 text-white text-[11px] font-mono font-bold shadow-lg backdrop-blur-xs border border-white/20 whitespace-nowrap">
                  🌸 THEN (Childhood)
                </span>
              </div>

              {/* Center Divider Handle */}
              <div
                className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] cursor-ew-resize flex items-center justify-center z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-8 h-8 rounded-full bg-white shadow-xl text-slate-800 flex items-center justify-center text-xs font-bold ring-2 ring-blue-300">
                  ↔
                </div>
              </div>
            </div>

            {/* Range slider for tactile control */}
            <div className="max-w-xs mx-auto mt-6 px-2">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(e) => setSliderPos(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                aria-label="Then and Now comparison slider"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                <span>← Slide to Then</span>
                <span>Slide to Now →</span>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-blue-50/60 border border-blue-100 max-w-md mx-auto">
              <p className="font-script text-base sm:text-lg text-blue-900 leading-snug">
                "{growingUpInteractive.thenAndNow.quote}"
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: UNLOCK THE NEXT MILESTONE AT THE END */}
        <section aria-label="Next Chapter Transition" className="pt-4 text-center">
          {!isEndMilestoneUnlocked ? (
            <button
              onClick={() => setIsEndMilestoneUnlocked(true)}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm tracking-widest uppercase shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto"
            >
              <Lock className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
              <span>Click to Unlock Final Milestone ✨</span>
            </button>
          ) : (
            <div className="max-w-xl mx-auto p-8 rounded-3xl bg-gradient-to-tr from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-300 shadow-2xl animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
                <Unlock className="w-7 h-7" />
              </div>

              <h4 className="font-serif text-2xl font-bold text-slate-800 leading-snug mb-2">
                "{growingUpInteractive.endMilestone.message}"
              </h4>

              <p className="text-xs font-mono text-blue-700 font-semibold uppercase tracking-wider mb-6">
                Milestone Unlocked • Your beautiful world awaits
              </p>

              <button
                onClick={onNextChapter}
                className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:scale-105 transition-all flex items-center gap-2 mx-auto"
              >
                <span>Continue to Chapter 03: Her Beautiful World</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

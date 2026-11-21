import React, { useState } from 'react';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { growingUpInteractive } from '../data/interactiveContent';
import { CoverflowCarousel } from '../components/growingUp/CoverflowCarousel';
import { TimelinePhoto } from '../components/photos/TimelinePhoto';
import { Clock, Lock, Unlock, ArrowRight, LayoutGrid, Sparkles, Layers, ChevronsLeftRight } from 'lucide-react';

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
    width: 899,
    height: 1599,
    aspectRatio: 0.56,
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
    <div className="album-page">
      {/* Soft Background Auras */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 -right-32 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Chapter Header */}
      <div className="album-heading">
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
              aria-pressed={viewMode === 'coverflow'}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'coverflow'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Photo album</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              aria-pressed={viewMode === 'grid'}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Timeline grid</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-16">
        {/* SECTION 1: 3D COVERFLOW OR TIMELINE GRID */}
        {viewMode === 'coverflow' ? (
          <section aria-label="Growing Up album">
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
              Drag the divider left or right to reveal the full photo. Tap Then or Now to enlarge it.
            </p>

            <div className="photo-comparison photo-mat">
              <img className="photo-fit" src={nowPhoto.src} alt={nowPhoto.alt} />
              <img
                className="photo-fit"
                src={thenPhoto.src}
                alt={thenPhoto.alt}
                style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
              />
              <div className="photo-comparison-divider" style={{ '--comparison-position': `${sliderPos}%` } as React.CSSProperties} aria-hidden="true">
                <span><ChevronsLeftRight size={22} /></span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPos}
                onChange={(event) => setSliderPos(event.currentTarget.valueAsNumber)}
                aria-label="Then and Now comparison slider"
                aria-valuetext={`${sliderPos}% childhood, ${100 - sliderPos}% age 22`}
              />
            </div>
            <div className="photo-comparison-labels">
              <button type="button" onClick={() => onSelectPhoto(thenPhoto)}>🌸 Then (Childhood)</button>
              <button type="button" onClick={() => onSelectPhoto(nowPhoto)}>Now (Age 22) ✨</button>
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

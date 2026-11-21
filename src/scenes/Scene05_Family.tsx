import React, { useState } from 'react';
import { StoryDialog } from '../components/common/StoryDialog';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { familyInteractive } from '../data/interactiveContent';
import { Home, Sparkles, Heart, Mail, CheckCircle, Puzzle, X, Eye } from 'lucide-react';

interface Scene05Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene05_Family: React.FC<Scene05Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.family;
  const photos = birthdayPhotos.family;

  // Active opened appreciation note
  const [activeNote, setActiveNote] = useState<{
    id: number;
    title: string;
    message: string;
  } | null>(null);

  // Puzzle State (3x3 swap puzzle)
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);
  const puzzlePhoto = photos[0]; // Choose primary family portrait
  const [puzzleTiles, setPuzzleTiles] = useState<number[]>([4, 0, 7, 1, 8, 3, 2, 6, 5]); // shuffled
  const [selectedTileIdx, setSelectedTileIdx] = useState<number | null>(null);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleTileClick = (index: number) => {
    if (isPuzzleSolved) return;

    if (selectedTileIdx === null) {
      setSelectedTileIdx(index);
    } else {
      // Swap tiles
      const newTiles = [...puzzleTiles];
      const temp = newTiles[selectedTileIdx];
      newTiles[selectedTileIdx] = newTiles[index];
      newTiles[index] = temp;
      setPuzzleTiles(newTiles);
      setSelectedTileIdx(null);

      // Check if solved: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      const solved = newTiles.every((val, i) => val === i);
      if (solved) {
        setIsPuzzleSolved(true);
      }
    }
  };

  const handleAutoSolve = () => {
    setPuzzleTiles([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    setIsPuzzleSolved(true);
  };

  return (
    <div className="album-page">
      {/* Warm Golden Glows */}
      <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-amber-100/50 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="album-heading">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Home className="w-3.5 h-3.5" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-4 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

        {/* Floating actions: appreciation notes & memory puzzle */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsPuzzleOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold shadow-sm hover:scale-105 transition-all"
          >
            <Puzzle className="w-4 h-4 text-amber-600" />
            <span>Play Family Memory Puzzle 🧩</span>
          </button>
        </div>
      </div>

      {/* 2. FLOATING APPRECIATION NOTES (GARDEN ENVELOPES) */}
      <div className="relative z-10 max-w-5xl mx-auto mb-12">
        <div className="text-center mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-800/80 font-bold">
            ✉️ Sealed Garden Appreciation Notes (Tap to open)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {familyInteractive.floatingNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setActiveNote(note)}
              className="cursor-pointer group p-4 sm:p-5 rounded-2xl bg-white/90 border border-amber-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-4 select-none"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-400 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-700 uppercase">
                  Note #{note.id}
                </span>
                <h4 className="font-serif text-base font-bold text-slate-800 group-hover:text-amber-800 transition-colors">
                  {note.title}
                </h4>
                <span className="text-[11px] text-slate-400 underline font-medium">
                  Tap to read message
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1. LIVING PHOTO FRAMES GALLERY */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="family-photo-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {photos.map((photo: BirthdayPhoto) => {
            const isLandscape = photo.orientation === 'landscape';

            return (
              <button
                type="button"
                key={photo.id}
                onClick={() => onSelectPhoto(photo)}
                className={`group flex min-w-0 flex-col items-center cursor-pointer bg-white/95 rounded-2xl p-4 shadow-md hover:shadow-2xl border border-amber-200/80 transition-all duration-300 hover:-translate-y-2 select-none hover:ring-2 hover:ring-amber-300 ${
                  isLandscape ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Gold accent border container */}
                <span className="photo-mat family-photo w-full rounded-lg border border-amber-200/60">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="photo-fit w-full h-full"
                    loading="lazy"
                  />
                </span>

                <span className="mt-4 text-center px-2">
                  {photo.tag && <span className="block text-xs font-semibold text-amber-800 mb-1">{photo.tag}</span>}
                  <span className="block font-serif text-lg font-semibold text-slate-800 leading-snug">
                    "{photo.caption}"
                  </span>
                  <span className="inline-block mt-1 text-[11px] font-mono font-medium text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                    Living Memory Frame • Tap to view full
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Next Chapter Prompt */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
            Every family memory cherished • Ready to meet your friends?
          </p>
          <button
            onClick={onNextChapter}
            className="group px-8 py-3.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:scale-105 transition-all duration-300"
          >
            Continue to Chapter 04: Beautiful People →
          </button>
        </div>
      </div>

      {/* Note Revelation Modal */}
      {activeNote && (
        <StoryDialog
          label="Family memory"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onDismiss={() => setActiveNote(null)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-300 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveNote(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-lg mb-4 animate-bounce">
              <Heart className="w-8 h-8 fill-current text-rose-500" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700">
              {activeNote.title}
            </span>

            <p className="font-serif text-xl sm:text-2xl font-bold text-slate-800 mt-3 mb-6 leading-relaxed">
              "{activeNote.message}"
            </p>

            <button
              onClick={() => setActiveNote(null)}
              className="px-6 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              Keep Close to Heart
            </button>
          </div>
        </StoryDialog>
      )}

      {/* 3. FAMILY MEMORY PUZZLE MODAL */}
      {isPuzzleOpen && (
        <StoryDialog
          label="Family photo puzzle"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
          onDismiss={() => setIsPuzzleOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-300 flex flex-col items-center text-center max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPuzzleOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 mb-1">
              Family Keepsake Activity
            </span>

            <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">
              Family Memory Puzzle (3×3)
            </h3>

            <p className="text-xs text-slate-500 mb-4">
              Click any two tiles to swap their positions until the full photograph is restored!
            </p>

            {/* 3x3 Puzzle Grid */}
            <div className="relative w-full max-w-80 grid grid-cols-3 grid-rows-3 gap-1 bg-amber-100 p-1.5 rounded-2xl shadow-inner border border-amber-200" style={{ aspectRatio: `${puzzlePhoto.width} / ${puzzlePhoto.height}` }}>
              {puzzleTiles.map((tileIndex, slotIdx) => {
                const isSelected = selectedTileIdx === slotIdx;
                const row = Math.floor(tileIndex / 3);
                const col = tileIndex % 3;

                return (
                  <button
                    type="button"
                    key={slotIdx}
                    onClick={() => handleTileClick(slotIdx)}
                    aria-label={`Family puzzle tile ${slotIdx + 1}`}
                    aria-pressed={isSelected}
                    className={`relative cursor-pointer overflow-hidden rounded-lg select-none transition-all ${
                      isSelected ? 'ring-4 ring-amber-500 scale-95 shadow-lg' : 'hover:opacity-90'
                    }`}
                    style={{
                      backgroundImage: `url(${puzzlePhoto.src})`,
                      backgroundSize: '300% 300%',
                      backgroundPosition: `${col * 50}% ${row * 50}%`,
                    }}
                  >
                    <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-black/50 text-white px-1 rounded">
                      {slotIdx + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Preview Popup or Image Toggle */}
            {showPreview && (
              <div className="mt-3 p-2 bg-amber-50 rounded-xl border border-amber-200 animate-fadeIn">
                <span className="text-[11px] font-mono text-amber-800 font-bold block mb-1">
                  Reference Photograph:
                </span>
                <img
                  src={puzzlePhoto.src}
                  alt="Puzzle reference"
                  className="photo-mat photo-fit w-full max-w-52 h-32 rounded-lg mx-auto"
                />
              </div>
            )}

            {/* Puzzle Controls */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{showPreview ? 'Hide Preview' : 'Show Preview'}</span>
              </button>

              {!isPuzzleSolved ? (
                <button
                  onClick={handleAutoSolve}
                  className="px-4 py-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Solve / Skip</span>
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 animate-fadeIn">
                  <CheckCircle className="w-4 h-4" />
                  <span>{familyInteractive.puzzleSuccessMessage}</span>
                </div>
              )}
            </div>
          </div>
        </StoryDialog>
      )}
    </div>
  );
};

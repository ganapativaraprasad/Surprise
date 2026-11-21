import React, { useRef, useState } from 'react';
import { StoryDialog } from '../components/common/StoryDialog';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { ourMemoriesInteractive } from '../data/interactiveContent';
import { Heart, ChevronLeft, ChevronRight, Mail, X, ZoomIn } from 'lucide-react';

interface Scene07Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene07_OurMemories: React.FC<Scene07Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.ourMemories;
  const photos = birthdayPhotos.ourMemories;

  // 3D Carousel active center index
  const [carouselIdx, setCarouselIdx] = useState(0);
  const touchStart = useRef<number | null>(null);

  // Active opened personal note beside photo
  const [activeNoteIdx, setActiveNoteIdx] = useState<number | null>(null);

  // Sealed personal letter at the end
  const [isLetterOpened, setIsLetterOpened] = useState(false);

  const handleNextPhoto = () => {
    setCarouselIdx((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCarouselIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="album-page">
      {/* Soft Rosy & Lavender Blurs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="album-heading">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>{chapter.tag} • BEST FRIENDS FOREVER</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-4 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

      </div>

      {/* Shared photo album */}
      <div className="relative z-10 max-w-5xl mx-auto my-12">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Swipe or use the arrows to browse our memories
          </span>
        </div>

        <div
          className="memory-carousel"
          aria-label="Shared memories carousel"
          role="group"
          data-local-keys
          onKeyDown={(event) => {
            if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            event.preventDefault();
            if (event.key === 'ArrowRight') handleNextPhoto();
            else handlePrevPhoto();
          }}
          onTouchStart={(event) => {
            touchStart.current = event.touches.length === 1 ? event.touches[0].clientX : null;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStart.current;
            touchStart.current = null;
            if (distance < -48) handleNextPhoto();
            if (distance > 48) handlePrevPhoto();
          }}
        >
          <div className="memory-stage">
            {[-1, 0, 1].map((offset) => {
              const index = (carouselIdx + offset + photos.length) % photos.length;
              const photo = photos[index];
              const isCurrent = offset === 0;

              return (
                <article key={photo.id} className="memory-print" data-current={isCurrent}>
                  <button
                    type="button"
                    onClick={() => isCurrent ? onSelectPhoto(photo) : setCarouselIdx(index)}
                    aria-label={`${isCurrent ? 'Enlarge' : 'Show'} ${photo.alt}`}
                    className="photo-mat memory-photo"
                  >
                    <img src={photo.src} alt={photo.alt} className="photo-fit" />
                    {isCurrent && <span className="memory-zoom" aria-hidden="true"><ZoomIn size={18} /></span>}
                  </button>
                  <p className="font-serif text-base sm:text-lg font-semibold text-slate-800">
                    "{photo.caption}"
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveNoteIdx(index)}
                    className="memory-note-button"
                  >
                    <Mail size={15} aria-hidden="true" />
                    <span>Open Memory Note ✉️</span>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="memory-controls">
            <button type="button" onClick={handlePrevPhoto} aria-label="Previous memory" className="story-icon-button">
              <ChevronLeft size={22} />
            </button>
            <span aria-live="polite">{carouselIdx + 1} / {photos.length}</span>
            <button type="button" onClick={handleNextPhoto} aria-label="Next memory" className="story-icon-button">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. A LITTLE MESSAGE FROM ME (SEALED LETTER AT END) */}
      <div className="relative z-10 max-w-2xl mx-auto my-16 text-center">
        {!isLetterOpened ? (
          <div
            onClick={() => setIsLetterOpened(true)}
            className="cursor-pointer group p-8 rounded-3xl bg-gradient-to-r from-rose-100 via-pink-100 to-purple-100 border-2 border-rose-200 shadow-xl hover:shadow-2xl hover:scale-102 transition-all select-none"
          >
            <div className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <Mail className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-800">
              A Little Sealed Message From Me
            </h3>

            <p className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold mt-2">
              Tap to open & unfold ✉️
            </p>
          </div>
        ) : (
          <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-rose-200 shadow-2xl animate-fadeIn text-center relative">
            <button
              onClick={() => setIsLetterOpened(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-600 block mb-2">
              {ourMemoriesInteractive.secretLetter.salutation}
            </span>

            <p className="font-serif text-xl sm:text-2xl font-normal text-slate-800 leading-relaxed italic my-4 px-2">
              "{ourMemoriesInteractive.secretLetter.message}"
            </p>

            <div className="font-script text-2xl text-rose-600 font-bold mt-4">
              {ourMemoriesInteractive.secretLetter.signature}
            </div>
          </div>
        )}
      </div>

      {/* Next Chapter Prompt */}
      <div className="relative z-10 mt-12 flex flex-col items-center justify-center text-center">
        <button
          onClick={onNextChapter}
          className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Discover Chapter 06: What Makes You, You →
        </button>
      </div>

      {/* Opened Memory Note Modal */}
      {activeNoteIdx !== null && (
        <StoryDialog
          label="Memory note"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onDismiss={() => setActiveNoteIdx(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveNoteIdx(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-3">
              <Heart className="w-7 h-7 fill-current" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-600">
              Personal Memory Note
            </span>

            <p className="font-serif text-xl font-bold text-slate-800 mt-2 mb-4 leading-relaxed">
              "{ourMemoriesInteractive.personalCaptions[activeNoteIdx % ourMemoriesInteractive.personalCaptions.length]}"
            </p>

            {ourMemoriesInteractive.extraNotes[activeNoteIdx] && (
              <p className="mb-4 text-sm leading-relaxed text-slate-600">{ourMemoriesInteractive.extraNotes[activeNoteIdx]}</p>
            )}

            <button
              onClick={() => setActiveNoteIdx(null)}
              className="px-6 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              Cherish This Moment
            </button>
          </div>
        </StoryDialog>
      )}

    </div>
  );
};

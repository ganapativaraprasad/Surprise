import React, { useEffect, useState } from 'react';
import { StoryDialog } from '../components/common/StoryDialog';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { chapterTitles, personalLetter } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { birthdayLetterInteractive } from '../data/interactiveContent';
import { Mail, Heart, Sparkles, Feather, RotateCcw, ArrowRight, X } from 'lucide-react';

interface Scene09Props {
  onPlayEnvelopeSfx: () => void;
  onNextChapter: () => void;
  onSelectPhoto?: (photo: BirthdayPhoto) => void;
}

export const Scene09_BirthdayLetter: React.FC<Scene09Props> = ({
  onPlayEnvelopeSfx,
  onNextChapter,
  onSelectPhoto,
}) => {
  const chapter = chapterTitles.letter;
  const letter = personalLetter;
  const letterPhoto = birthdayPhotos.birthdayLetter;
  const reducedMotion = useReducedMotion();

  // Envelope state: closed -> opening -> opened
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening' | 'opened'>('closed');

  // Hidden final surprise modal state
  const [isFinalSurpriseOpen, setIsFinalSurpriseOpen] = useState(false);

  const handleOpenLetter = () => {
    if (envelopeState !== 'closed') return;
    setEnvelopeState('opening');
    onPlayEnvelopeSfx();
  };

  useEffect(() => {
    if (envelopeState !== 'opening') return;
    const timer = window.setTimeout(() => setEnvelopeState('opened'), reducedMotion ? 0 : 650);
    return () => window.clearTimeout(timer);
  }, [envelopeState, reducedMotion]);

  const handleRefoldLetter = () => {
    setEnvelopeState('closed');
  };

  return (
    <div className="album-page">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-pink-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="album-heading">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Feather className="w-3.5 h-3.5" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* 1. CLOSED & OPENING ENVELOPE STATE */}
        {envelopeState !== 'opened' ? (
          <div className="flex flex-col items-center text-center my-8">
            <div
              onClick={handleOpenLetter}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenLetter();
                }
              }}
              className={`letter-envelope group cursor-pointer relative p-6 flex flex-col items-center justify-center select-none ${
                envelopeState === 'opening' ? 'is-opening' : ''
              }`}
            >
              {/* Wax Seal */}
              <div className="letter-seal w-16 h-16 rounded-full text-white flex items-center justify-center">
                <Heart className="w-8 h-8 fill-current text-rose-100" />
              </div>

              <span className="font-script text-3xl sm:text-4xl text-slate-800 mt-4">
                To Dear Sabdha
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mt-1">
                Sealed With A Best Friend's Love
              </span>

              {envelopeState === 'opening' && (
                <div className="letter-opening-status" role="status">
                  Unfolding Your Letter... ✨
                </div>
              )}
            </div>

            <p className="mt-8 font-serif text-lg sm:text-xl text-slate-600 font-light italic">
              "{chapter.teaser}"
            </p>

            <button
              onClick={handleOpenLetter}
              className="mt-6 px-8 py-3.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm tracking-widest uppercase shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>{chapter.buttonText}</span>
            </button>
          </div>
        ) : (
          /* 2. OPENED PARCHMENT LETTER */
          <div className="letter-paper w-full p-6 sm:p-10 md:p-12 border relative animate-fadeIn">
            {/* Top Bar with Stamp & Re-Fold Button */}
            <div className="flex items-center justify-between border-b border-amber-200/50 pb-4 mb-6">
              <button
                onClick={handleRefoldLetter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-mono transition-all"
                title="Fold back into envelope"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-fold envelope</span>
              </button>

              {/* Stamp decoration */}
              <div className="w-16 h-20 border-2 border-dashed border-rose-300 rounded bg-rose-50/50 p-1 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-mono font-bold text-rose-600">22 NOV</span>
                <Heart className="w-4 h-4 text-rose-500 fill-current my-0.5" />
                <span className="text-[9px] font-mono text-slate-500">2026</span>
              </div>
            </div>

            {/* Salutation */}
            <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 mb-6">
              {letter.salutation}
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 font-sans text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {letter.paragraphs.map((paragraph: string, idx: number) => (
                <p key={idx} className="indent-4 sm:indent-8">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-col items-start">
              <p className="font-serif text-base text-slate-600 italic">{letter.closing}</p>
              <p className="font-script text-3xl sm:text-4xl text-rose-600 font-bold mt-1">{letter.signature}</p>
            </div>

            {/* Tucked Keepsake Photograph */}
            {letterPhoto && (
              <div className="mt-8 bg-amber-50/40 p-4 rounded-2xl border border-amber-200/40">
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => onSelectPhoto?.(letterPhoto)}
                    className="relative cursor-pointer w-20 sm:w-24 aspect-[3/4] bg-white p-1.5 rounded-lg shadow-md border border-amber-200 hover:scale-105 transition-all shrink-0"
                  >
                    <img
                      src={letterPhoto.src}
                      alt={letterPhoto.alt}
                      className="w-full h-full photo-fit rounded-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-rose-600 font-bold">
                      Keepsake Photo
                    </span>
                    <p className="font-serif text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                      "{letterPhoto.caption}"
                    </p>
                    <button
                      onClick={() => onSelectPhoto?.(letterPhoto)}
                      className="mt-1 text-xs text-rose-600 hover:text-rose-700 underline font-medium"
                    >
                      View Full Memory →
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* 3. HIDDEN FINAL MESSAGE AT END OF LETTER */}
            <div className="mt-10 pt-6 border-t border-rose-100 flex flex-col items-center text-center">
              <span className="text-xs font-mono text-slate-400 mb-2">
                Psst... there's one glowing secret hidden below:
              </span>

              <button
                onClick={() => setIsFinalSurpriseOpen(true)}
                className="group p-3 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-500 border border-rose-200 shadow-md hover:scale-110 active:scale-95 transition-all flex items-center gap-2"
                title="Open hidden surprise"
              >
                <Heart className="w-6 h-6 fill-rose-500 animate-pulse" />
                <span className="text-xs font-bold text-rose-600 pr-1">
                  Tap Secret Heart ❤️
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Regular Chapter 08 Gateway Button */}
        {envelopeState === 'opened' && (
          <div className="mt-12 flex flex-col items-center justify-center text-center animate-fadeIn">
            <button
              onClick={onNextChapter}
              className="group px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>Play Chapter 08: Catch The Stars Game</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>
        )}
      </div>

      {/* Hidden Final Surprise Modal */}
      {isFinalSurpriseOpen && (
        <StoryDialog
          label="Birthday surprise"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
          onDismiss={() => setIsFinalSurpriseOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-b from-rose-50 via-pink-50 to-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-300 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsFinalSurpriseOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white text-slate-500 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center shadow-xl mb-4 animate-bounce">
              <Sparkles className="w-10 h-10 text-amber-200" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-600">
              {birthdayLetterInteractive.hiddenSurprise.prompt}
            </span>

            <p className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 mt-2 mb-6 leading-snug">
              "{birthdayLetterInteractive.hiddenSurprise.message}"
            </p>

            <button
              onClick={() => {
                setIsFinalSurpriseOpen(false);
                onNextChapter();
              }}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{birthdayLetterInteractive.hiddenSurprise.buttonText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </StoryDialog>
      )}
    </div>
  );
};

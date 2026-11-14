import React, { useState } from 'react';
import { chapterTitles, personalLetter } from '../data/birthdayContent';
import { Mail, Heart, Sparkles, Feather } from 'lucide-react';

interface Scene09Props {
  onPlayEnvelopeSfx: () => void;
  onNextChapter: () => void;
}

export const Scene09_BirthdayLetter: React.FC<Scene09Props> = ({
  onPlayEnvelopeSfx,
  onNextChapter,
}) => {
  const chapter = chapterTitles.letter;
  const letter = personalLetter;
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenLetter = () => {
    setIsOpened(true);
    onPlayEnvelopeSfx();
  };

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#FBF5F9] via-[#FFFDF9] to-[#F2EBF9] text-[#4A3E4D] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-pink-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-purple-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Feather className="w-3.5 h-3.5" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        {/* Closed Envelope State */}
        {!isOpened ? (
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
              className="group cursor-pointer relative w-72 sm:w-96 h-52 sm:h-64 bg-gradient-to-tr from-[#FFF7EE] via-[#FDF0E2] to-[#FCE8D5] rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center border border-amber-200/60 hover:scale-105 transition-all duration-300"
            >
              {/* Wax Seal */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 fill-current text-rose-100" />
              </div>

              <span className="font-script text-3xl text-slate-800 mt-4">
                To Dear Sabdha
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400 mt-1">
                A Letter Sealed With Love
              </span>
            </div>

            <p className="mt-8 font-serif text-lg text-slate-600 font-light italic">
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
          /* Opened Parchment Letter */
          <div className="w-full letter-paper rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl border border-amber-200/60 relative animate-fadeIn">
            {/* Stamp decoration */}
            <div className="absolute top-6 right-6 w-16 h-20 border-2 border-dashed border-rose-300/80 rounded bg-rose-50/50 p-1 flex flex-col items-center justify-center text-center hidden sm:flex">
              <span className="text-[10px] font-mono font-bold text-rose-600">22 NOV</span>
              <Heart className="w-4 h-4 text-rose-500 fill-current my-0.5" />
              <span className="text-[9px] font-mono text-slate-500">2026</span>
            </div>

            {/* Salutation */}
            <div className="font-serif text-2xl sm:text-3xl font-bold text-slate-800 border-b border-amber-200/40 pb-4 mb-6">
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

            {/* Closing & Handwritten Signature */}
            <div className="mt-8 pt-6 border-t border-amber-200/40 flex flex-col items-end">
              <span className="font-serif text-base text-slate-600 italic">
                {letter.closing}
              </span>
              <span className="font-script text-3xl sm:text-4xl text-rose-600 font-bold mt-1">
                {letter.signature}
              </span>
            </div>
          </div>
        )}

        {/* Next Chapter Prompt */}
        {isOpened && (
          <div className="mt-16 flex flex-col items-center justify-center text-center animate-fadeIn">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
              One more joyful surprise is waiting for you...
            </p>
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
    </div>
  );
};

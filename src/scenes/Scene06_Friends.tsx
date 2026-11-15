import React, { useState } from 'react';
import { chapterTitles } from '../data/birthdayContent';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { friendsInteractive } from '../data/interactiveContent';
import { HangingPhoto } from '../components/photos/HangingPhoto';
import { Users, Smile, Gift, Sparkles, X, Eye } from 'lucide-react';

interface Scene06Props {
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  onNextChapter: () => void;
}

export const Scene06_Friends: React.FC<Scene06Props> = ({
  onSelectPhoto,
  onNextChapter,
}) => {
  const chapter = chapterTitles.friends;
  const photos = birthdayPhotos.friends;

  // Friendship Message Popup
  const [activeFriendMsg, setActiveFriendMsg] = useState<{
    photo: BirthdayPhoto;
    message: string;
  } | null>(null);

  // Surprise Gift Box State
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  // "Who's hiding behind the memory?" Scratch/Peel Reveal Game
  // Use photos[0] as the mystery photo
  const mysteryPhoto = photos[0];
  const [revealClicks, setRevealClicks] = useState(0); // 0 = covered, 1 = half peeled, 2 = fully revealed
  const isMysteryRevealed = revealClicks >= 2;

  const handleMysteryClick = () => {
    if (revealClicks < 2) {
      setRevealClicks((prev) => prev + 1);
    }
  };

  const handleGiftClick = () => {
    setIsGiftOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-[#FDF5F2] via-[#F8EEF8] to-[#FFF3F6] text-[#4A3E4D] overflow-hidden">
      {/* Background Cheerful Accents */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-widest uppercase mb-4 shadow-xs">
          <Users className="w-3.5 h-3.5" />
          <span>{chapter.tag}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight">
          {chapter.heading}
        </h2>

        <p className="mt-4 font-sans text-base sm:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
          {chapter.subtitle}
        </p>

        {/* Interactive Activities Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleGiftClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <Gift className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>Open Friendship Surprise Box 🎁</span>
          </button>
        </div>
      </div>

      {/* 2. "WHO'S HIDING BEHIND THE MEMORY?" REVEAL CARD */}
      <div className="relative z-10 max-w-xl mx-auto mb-16 p-6 sm:p-8 bg-white/95 rounded-3xl border-2 border-purple-200 shadow-xl text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-mono font-bold uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mini Game • Who's Hiding Behind The Memory?</span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-800 mb-2">
          {isMysteryRevealed ? "Found You! 🎉" : "Tap the cover to peel away the mystery!"}
        </h3>

        <div
          onClick={handleMysteryClick}
          className="relative max-w-xs mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl cursor-pointer select-none my-4 group border-4 border-white"
        >
          {/* Actual Photograph */}
          <img
            src={mysteryPhoto.src}
            alt="Mystery photograph"
            className="w-full h-full object-cover"
          />

          {/* Decorative Scratch/Peel Overlays */}
          {!isMysteryRevealed && (
            <div
              className={`absolute inset-0 bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 flex flex-col items-center justify-center text-white transition-all duration-500 ${
                revealClicks === 1 ? 'translate-y-1/2 opacity-75 rotate-3' : 'opacity-100'
              }`}
            >
              <Gift className="w-12 h-12 mb-2 animate-bounce" />
              <span className="font-serif font-bold text-lg">Tap to peel!</span>
              <span className="text-xs font-mono text-purple-100 mt-1">
                {revealClicks === 0 ? "Click 1 of 2" : "One more tap!"}
              </span>
            </div>
          )}
        </div>

        {isMysteryRevealed && (
          <div className="mt-3 p-3 bg-purple-50 rounded-xl border border-purple-200 animate-fadeIn text-xs sm:text-sm font-semibold text-purple-800">
            {friendsInteractive.mysteryRevealMessage}
          </div>
        )}
      </div>

      {/* 1. INTERACTIVE HANGING PHOTOGRAPHS */}
      <div className="relative max-w-5xl mx-auto mb-2">
        <div className="w-full h-[2px] bg-amber-800/20 shadow-xs hidden sm:block" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Tap any hanging photo to reveal its friendship story:
          </span>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-8 lg:gap-10">
          {photos.map((photo: BirthdayPhoto, index: number) => {
            const msg = friendsInteractive.friendshipMessages[index % friendsInteractive.friendshipMessages.length];
            return (
              <div
                key={photo.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => setActiveFriendMsg({ photo, message: msg })}
              >
                <HangingPhoto
                  photo={photo}
                  index={index}
                  onClick={() => setActiveFriendMsg({ photo, message: msg })}
                />
                <span className="mt-1 text-[11px] font-semibold text-purple-600 group-hover:text-purple-800 underline">
                  Tap to explore story ✨
                </span>
              </div>
            );
          })}
        </div>

        {/* Next Chapter Prompt */}
        <div className="mt-20 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">
            Cherishing every laugh & adventure • Ready for our special memories?
          </p>
          <button
            onClick={onNextChapter}
            className="group px-8 py-3.5 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm tracking-wider uppercase shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Enter Chapter 05: Our Little World →
          </button>
        </div>
      </div>

      {/* Friendship Photo Revelation Modal */}
      {activeFriendMsg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveFriendMsg(null)}
        >
          <div
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-purple-200 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveFriendMsg(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4 shadow-inner">
              <Smile className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-600">
              Friendship Keepsake
            </span>

            <p className="font-serif text-xl sm:text-2xl font-bold text-slate-800 mt-2 mb-3 leading-snug">
              "{activeFriendMsg.message}"
            </p>

            <div className="w-32 aspect-[3/4] rounded-lg overflow-hidden my-3 shadow-md border-2 border-purple-200">
              <img
                src={activeFriendMsg.photo.src}
                alt={activeFriendMsg.photo.alt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => {
                  const p = activeFriendMsg.photo;
                  setActiveFriendMsg(null);
                  onSelectPhoto(p);
                }}
                className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Zoom Photo</span>
              </button>
              <button
                onClick={() => setActiveFriendMsg(null)}
                className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. FRIENDSHIP SURPRISE BOX MODAL */}
      {isGiftOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsGiftOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-gradient-to-b from-purple-50 via-pink-50 to-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-purple-300 text-center flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsGiftOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-500 shadow-sm"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-xl mb-4 animate-bounce">
              <Gift className="w-10 h-10 text-amber-200" />
            </div>

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-purple-700">
              {friendsInteractive.surpriseGiftBox.title}
            </span>

            <p className="font-serif text-xl sm:text-2xl font-bold text-slate-800 mt-3 mb-6 leading-relaxed">
              "{friendsInteractive.surpriseGiftBox.message}"
            </p>

            <button
              onClick={() => setIsGiftOpen(false)}
              className="px-8 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-all"
            >
              Thank You! ❤️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

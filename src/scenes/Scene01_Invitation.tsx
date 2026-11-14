import React, { useState } from 'react';
import { invitationContent } from '../data/birthdayContent';
import { Sparkles, Heart } from 'lucide-react';

interface Scene01Props {
  onOpenSurprise: () => void;
  onPlayEnvelopeSfx: () => void;
}

export const Scene01_Invitation: React.FC<Scene01Props> = ({
  onOpenSurprise,
  onPlayEnvelopeSfx,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    onPlayEnvelopeSfx();

    // Allow the flap and glow animation to shine before transitioning to welcome
    setTimeout(() => {
      onOpenSurprise();
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-[#180F2A] via-[#2A1845] to-[#120B20] text-white">
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-[100px] pointer-events-none" />

      {/* Floating gentle stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 31) % 100}%`,
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              opacity: 0.3 + ((i % 5) * 0.12),
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i * 0.3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center text-center">
        {/* Mystery Header Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-pink-200 text-xs sm:text-sm font-medium tracking-widest uppercase mb-6 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>A Special Delivery For You</span>
        </div>

        {/* Envelope Container */}
        <div className="relative my-4 cursor-pointer group" onClick={handleOpen}>
          {/* Glowing Aura */}
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-amber-300/30 rounded-3xl blur-xl group-hover:opacity-100 opacity-60 transition duration-700" />

          {/* Envelope Body */}
          <div className="relative w-72 sm:w-84 h-48 sm:h-56 bg-gradient-to-tr from-[#FFF5EC] to-[#FDE8DF] rounded-2xl shadow-2xl p-4 flex flex-col justify-between border-2 border-white/60">
            {/* Top Flap (Animated) */}
            <div
              className={`absolute top-0 left-0 right-0 h-28 bg-[#FEE4D6] rounded-t-2xl border-b border-amber-200/50 shadow-md origin-top transition-all duration-700 ${
                isOpen ? 'rotate-x-180 -translate-y-2 opacity-0' : 'rotate-x-0'
              }`}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
              }}
            />

            {/* Glowing Heart / Star Wax Seal */}
            <div
              className={`absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 text-white shadow-lg transition-transform duration-500 ${
                isOpen ? 'scale-150 opacity-0' : 'group-hover:scale-110'
              }`}
            >
              <Heart className="w-6 h-6 fill-current animate-pulse text-rose-100" />
            </div>

            {/* Light beam burst on open */}
            {isOpen && (
              <div className="absolute inset-0 flex items-center justify-center z-30">
                <div className="w-full h-full bg-radial from-amber-200/90 via-pink-300/40 to-transparent animate-ping" />
              </div>
            )}

            {/* Envelope Interior Letter Peek */}
            <div className="h-full w-full flex flex-col items-center justify-center pt-8">
              <span className="font-script text-3xl sm:text-4xl text-slate-700 tracking-wide">
                For Sabdha
              </span>
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase mt-1">
                22 November 2026
              </span>
            </div>
          </div>
        </div>

        {/* Teaser Texts */}
        <p className="mt-8 font-serif text-lg sm:text-xl text-pink-100/90 font-light max-w-md leading-relaxed">
          "{invitationContent.teaser}"
        </p>

        <h1 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
          {invitationContent.question}
        </h1>

        {/* Action Button */}
        <button
          onClick={handleOpen}
          disabled={isOpen}
          className="mt-8 relative group overflow-hidden px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-semibold text-sm sm:text-base tracking-wider uppercase shadow-xl hover:shadow-pink-500/35 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <span className="relative z-10 flex items-center gap-2">
            {invitationContent.buttonText}
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>

        <p className="mt-4 text-xs text-purple-200/60 font-light">
          Tap the envelope or button to begin • Turn up your sound 🎵
        </p>
      </div>
    </div>
  );
};

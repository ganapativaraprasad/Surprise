import React from 'react';
import { Lock, Unlock, Sparkles, Heart } from 'lucide-react';

interface RealisticEnvelopeProps {
  isOpen: boolean;
  isUnlocked: boolean;
  isError: boolean;
  onClick?: () => void;
}

export const RealisticEnvelope: React.FC<RealisticEnvelopeProps> = ({
  isOpen,
  isUnlocked,
  isError,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="portal-envelope relative select-none group flex flex-col items-center perspective-1000"
    >
      {/* 1. Ambient Glow Aura behind Envelope */}
      <div
        className={`absolute -inset-6 rounded-3xl blur-2xl transition-all duration-1000 pointer-events-none ${
          isUnlocked
            ? 'bg-gradient-to-r from-emerald-400/40 via-amber-300/50 to-pink-400/40 opacity-100 animate-pulse scale-105'
            : isError
            ? 'bg-rose-600/40 opacity-90 scale-95'
            : 'bg-gradient-to-r from-pink-500/25 via-purple-500/25 to-amber-300/25 opacity-70 group-hover:opacity-100 scale-100'
        }`}
      />

      {/* Floating particles around envelope */}
      <div className="absolute -inset-8 pointer-events-none overflow-hidden">
        <Sparkles className="absolute top-2 left-4 w-4 h-4 text-amber-300/70 animate-ping" style={{ animationDuration: '3s' }} />
        <Sparkles className="absolute bottom-3 right-6 w-3.5 h-3.5 text-pink-300/70 animate-ping" style={{ animationDuration: '4s', animationDelay: '1.5s' }} />
      </div>

      {/* 2. Main Envelope 3D Body Container */}
      <div
        className={`portal-envelope-body relative rounded-lg border border-amber-100/60 transition-transform duration-700 ease-out ${
          isOpen ? 'scale-105' : 'hover:-translate-y-1.5'
        }`}
        style={{
          background: 'linear-gradient(135deg, #FFF9F3 0%, #FDF3E7 50%, #FBE9D9 100%)',
          boxShadow: '0 25px 50px -12px rgba(24, 13, 41, 0.6), 0 0 30px rgba(245, 210, 138, 0.2)',
        }}
      >
        {/* Subtle Paper Fiber Texture overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#8B5E3C 0.75px, transparent 0.75px)`,
            backgroundSize: '8px 8px',
          }}
        />

        {/* Interior Gold Liner peek */}
        <div className="absolute top-0 left-0 right-0 h-full rounded-2xl overflow-hidden pointer-events-none">
          <div className="w-full h-24 bg-gradient-to-b from-amber-200/50 via-pink-200/20 to-transparent" />
        </div>

        {/* 3. The Animated Folded Flap (Top Triangular Flap) */}
        <div
          className={`envelope-flap absolute top-0 left-0 right-0 h-24 sm:h-28 rounded-t-lg z-20 origin-top ${
            isOpen
              ? 'rotate-x-180 pointer-events-none'
              : 'rotate-x-0'
          }`}
          style={{
            background: 'linear-gradient(180deg, #FDEFE0 0%, #F9DEC8 90%, #EFCBB0 100%)',
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            filter: 'drop-shadow(0 6px 8px rgba(90, 40, 10, 0.18))',
          }}
        >
          {/* Paper Crease Line */}
          <div className="absolute inset-0 opacity-40 bg-gradient-to-b from-white/60 via-transparent to-amber-950/20" />
        </div>

        {/* 4. Left & Right Fold Lines (Subtle embossed pocket geometry) */}
        <div
          className="absolute bottom-0 left-0 w-1/2 h-full z-10 pointer-events-none rounded-bl-2xl"
          style={{
            clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%)',
            background: 'linear-gradient(45deg, rgba(230,195,170,0.4) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-1/2 h-full z-10 pointer-events-none rounded-br-2xl"
          style={{
            clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)',
            background: 'linear-gradient(-45deg, rgba(230,195,170,0.4) 0%, transparent 60%)',
          }}
        />

        {/* 5. Realistic Sculpted Wax Seal */}
        <div
          className={`envelope-wax absolute left-1/2 -translate-x-1/2 z-30 flex items-center justify-center transition-all duration-700 ${
            isOpen ? 'scale-150 opacity-0' : isUnlocked ? 'scale-110' : 'group-hover:scale-105'
          }`}
        >
          {/* Outer Scalloped Wax Border */}
          <div
            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-colors duration-500 shadow-[0_8px_20px_rgba(159,18,57,0.4)] ${
              isUnlocked
                ? 'bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-400 border-2 border-emerald-200'
                : isError
                ? 'bg-gradient-to-tr from-rose-700 via-red-600 to-rose-500 border-2 border-rose-300 animate-shake'
                : 'bg-gradient-to-tr from-rose-700 via-pink-600 to-rose-500 border-2 border-amber-300/70'
            }`}
          >
            {/* Wax Highlight Ring */}
            <div className="absolute inset-1 rounded-full border border-white/30" />

            {/* Inner Debossed Emblem */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/15 flex items-center justify-center shadow-inner">
              {isUnlocked ? (
                <Unlock className="w-5 h-5 text-amber-100 animate-pulse" />
              ) : (
                <Lock className="w-5 h-5 text-amber-100 drop-shadow-sm" />
              )}
            </div>

            {/* Glowing Golden Ring pulse */}
            <div className="absolute -inset-1 rounded-full border border-amber-400/50 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
          </div>
        </div>

        {/* 6. Letter Preview / Elegant Typography inside the card */}
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-end pb-4 px-6 text-center">
          <span className="font-script text-3xl sm:text-4xl md:text-5xl text-slate-800 tracking-wide drop-shadow-xs font-semibold">
            For Sabdha
          </span>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-[1px] w-6 bg-amber-400/60" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold">
              22 NOVEMBER • PROTECTED
            </span>
            <span className="h-[1px] w-6 bg-amber-400/60" />
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs text-rose-500 font-medium">
            <Heart className="w-3 h-3 fill-current text-rose-400" />
            <span className="text-[11px] font-serif italic text-slate-600">A Little Universe of Memories</span>
            <Heart className="w-3 h-3 fill-current text-rose-400" />
          </div>
        </div>

        {/* 7. Radiant Golden Light Burst on Unlock */}
        {isOpen && (
          <div className="absolute inset-0 z-40 flex items-center justify-center overflow-hidden rounded-2xl pointer-events-none">
            <div className="w-96 h-96 rounded-full bg-gradient-to-r from-amber-200 via-pink-300 to-white opacity-90 animate-ping" />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-xs animate-pulse" />
          </div>
        )}
      </div>

      <style>{`
        .rotate-x-0 {
          transform: rotateX(0deg);
        }
        .rotate-x-180 {
          transform: rotateX(180deg);
        }
      `}</style>
    </div>
  );
};

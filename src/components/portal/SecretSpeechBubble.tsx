import React from 'react';
import { Sparkles } from 'lucide-react';
import { BearEmotion } from './GuardianBearCharacter';

interface SecretSpeechBubbleProps {
  emotion: BearEmotion;
  text: string;
}

export const SecretSpeechBubble: React.FC<SecretSpeechBubbleProps> = ({
  emotion,
  text,
}) => {
  const isAngry = emotion === 'angry';
  const isCelebrating = emotion === 'celebrating';

  return (
    <div
      className={`relative max-w-2xl mx-auto px-5 py-3.5 sm:px-7 sm:py-4 rounded-3xl backdrop-blur-xl border transition-all duration-500 shadow-2xl ${
        isAngry
          ? 'bg-rose-950/80 border-rose-500/80 text-rose-100 shadow-[0_0_30px_rgba(244,63,94,0.35)] animate-shake'
          : isCelebrating
          ? 'bg-emerald-950/80 border-emerald-400/80 text-emerald-100 shadow-[0_0_30px_rgba(52,211,153,0.35)]'
          : 'bg-slate-900/60 border-purple-400/30 text-pink-100 shadow-[0_10px_35px_rgba(23,13,41,0.6)]'
      }`}
    >
      {/* Downward Speech Bubble Tail pointing towards the gate */}
      <div
        className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rotate-45 border-r border-b backdrop-blur-xl ${
          isAngry
            ? 'bg-rose-950 border-rose-500/80'
            : isCelebrating
            ? 'bg-emerald-950 border-emerald-400/80'
            : 'bg-slate-900/80 border-purple-400/30'
        }`}
      />

      <div className="flex items-center justify-center gap-3">
        <Sparkles
          className={`w-4 h-4 shrink-0 animate-spin ${
            isAngry ? 'text-rose-400' : isCelebrating ? 'text-amber-300' : 'text-amber-300'
          }`}
          style={{ animationDuration: '6s' }}
        />

        <p className="font-serif text-sm sm:text-base md:text-lg leading-relaxed text-center font-normal tracking-wide">
          "{text}"
        </p>

        <Sparkles
          className={`w-4 h-4 shrink-0 animate-spin ${
            isAngry ? 'text-rose-400' : isCelebrating ? 'text-amber-300' : 'text-amber-300'
          }`}
          style={{ animationDuration: '6s', animationDirection: 'reverse' }}
        />
      </div>
    </div>
  );
};

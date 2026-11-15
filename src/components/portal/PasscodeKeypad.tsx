import React from 'react';
import { KeyRound, Delete, Sparkles, HelpCircle, Heart } from 'lucide-react';

interface PasscodeKeypadProps {
  digits: string[];
  isUnlocked: boolean;
  isError: boolean;
  showHint: boolean;
  onDigitChange: (index: number, val: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeypadPress: (key: string) => void;
  onToggleHint: () => void;
  onSubmit: () => void;
  inputRefs: React.RefObject<HTMLInputElement>[];
}

export const PasscodeKeypad: React.FC<PasscodeKeypadProps> = ({
  digits,
  isUnlocked,
  isError,
  showHint,
  onDigitChange,
  onKeyDown,
  onKeypadPress,
  onToggleHint,
  onSubmit,
  inputRefs,
}) => {
  const isComplete = digits.join('').length === 4;

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      {/* 1. Header Label */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono tracking-widest text-pink-200/90 uppercase mb-3 shadow-sm">
        <KeyRound className="w-3.5 h-3.5 text-amber-300" />
        <span>Enter 4-Digit Birth Year</span>
      </div>

      {/* 2. Glassmorphic Digit Boxes */}
      <div
        className={`flex items-center justify-center gap-3 sm:gap-4 my-2 transition-all ${
          isError ? 'animate-shake' : ''
        }`}
      >
        {digits.map((digit, index) => {
          const isFilled = !!digit;
          const isNextEmpty = digits.findIndex((d) => d === '') === index;

          return (
            <div key={index} className="relative">
              <input
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                disabled={isUnlocked}
                onChange={(e) => onDigitChange(index, e.target.value)}
                onKeyDown={(e) => onKeyDown(index, e)}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-mono font-bold rounded-2xl outline-none backdrop-blur-md transition-all duration-300 shadow-xl select-none ${
                  isUnlocked
                    ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-105'
                    : isError
                    ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                    : isFilled
                    ? 'bg-white/15 border-2 border-pink-400 text-white shadow-[0_0_15px_rgba(244,114,182,0.3)] scale-102'
                    : isNextEmpty
                    ? 'bg-white/10 border-2 border-purple-400/80 text-white shadow-[0_0_15px_rgba(168,85,247,0.25)]'
                    : 'bg-white/5 border border-white/15 text-slate-300 hover:border-pink-300/40 hover:bg-white/10'
                }`}
              />

              {/* Glowing active indicator dot */}
              {isNextEmpty && !isUnlocked && (
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-pink-400 shadow-[0_0_8px_#F472B6] animate-ping" />
              )}
            </div>
          );
        })}
      </div>

      {/* 3. Hint Toggle & Card */}
      <div className="mt-2.5 flex flex-col items-center">
        <button
          type="button"
          onClick={onToggleHint}
          className="inline-flex items-center gap-1.5 text-xs text-pink-300/80 hover:text-pink-200 transition-colors py-1 px-3 rounded-full hover:bg-white/5"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
          <span className="font-sans underline decoration-pink-400/40 underline-offset-4">
            {showHint ? 'Hide Secret Hint' : 'Need a Passcode Hint?'}
          </span>
        </button>

        {showHint && (
          <div className="mt-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-950/90 to-slate-900/90 border border-amber-300/40 text-amber-200 text-xs font-sans text-center shadow-xl backdrop-blur-md animate-fadeIn max-w-xs">
            <p className="font-serif italic">
              "The universe was blessed on 22 November 2004... enter the birth year: <strong className="text-amber-300 font-mono tracking-widest font-bold">2 0 0 4</strong> ✨"
            </p>
          </div>
        )}
      </div>

      {/* 4. Tactile Glass Numeric Keypad */}
      <div className="mt-4 grid grid-cols-3 gap-2.5 w-full max-w-[260px]">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'backspace'].map((key) => {
          const isClear = key === 'clear';
          const isBack = key === 'backspace';

          return (
            <button
              key={key}
              type="button"
              disabled={isUnlocked}
              onClick={() => onKeypadPress(key)}
              className={`h-11 sm:h-12 rounded-2xl font-mono font-bold text-base transition-all duration-150 active:scale-95 flex items-center justify-center select-none backdrop-blur-md shadow-md ${
                isClear
                  ? 'bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-900/50 hover:border-rose-400/60 text-xs tracking-wider uppercase'
                  : isBack
                  ? 'bg-violet-950/40 text-violet-200 border border-violet-500/30 hover:bg-violet-900/50 hover:border-violet-400/60'
                  : 'bg-white/8 text-white border border-white/15 hover:bg-white/18 hover:border-pink-300/50 shadow-[0_4px_12px_rgba(0,0,0,0.2)]'
              }`}
            >
              {isClear ? 'Clear' : isBack ? <Delete className="w-4 h-4" /> : key}
            </button>
          );
        })}
      </div>

      {/* 5. Glowing Unlock CTA Button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isUnlocked || !isComplete}
        className={`mt-5 w-full py-3.5 sm:py-4 px-6 rounded-full font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 select-none shadow-2xl ${
          isUnlocked
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/50 cursor-default scale-102'
            : isComplete
            ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-[0_0_25px_rgba(244,114,182,0.6)] hover:scale-105 active:scale-98 animate-pulse cursor-pointer'
            : 'bg-white/10 text-white/35 border border-white/10 cursor-not-allowed'
        }`}
      >
        {isUnlocked ? (
          <>
            <span>Universe Unlocked! ✨</span>
            <Heart className="w-4 h-4 fill-current text-white animate-ping" />
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Unlock Sabdha's Universe</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </>
        )}
      </button>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

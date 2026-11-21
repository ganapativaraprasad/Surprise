import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { StarFieldCanvas } from '../components/portal/StarFieldCanvas';
import { GuardianBearCharacter, BearEmotion } from '../components/portal/GuardianBearCharacter';
import { RealisticEnvelope } from '../components/portal/RealisticEnvelope';
import { PasscodeKeypad } from '../components/portal/PasscodeKeypad';
import { SecretSpeechBubble } from '../components/portal/SecretSpeechBubble';

interface Scene01Props {
  onOpenSurprise: () => void;
  onPlayEnvelopeSfx: () => void;
}

const CORRECT_PASSCODE = '2004';

// Synthesize pleasant sound effects directly via Web Audio
const playSfx = (type: 'type' | 'error' | 'success') => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    if (type === 'type') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520 + Math.random() * 80, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'error') {
      // Disappointed / cute angry buzz
      [220, 165].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);
        gain.gain.setValueAtTime(0.12, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (idx + 1) * 0.13);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.12);
        osc.stop(now + (idx + 1) * 0.14);
      });
    } else if (type === 'success') {
      // Magical triumphant arpeggio
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.16, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.38);
      });
    }
  } catch {
    // Non-blocking fallback if audio context is restricted
  }
};

export const Scene01_Invitation: React.FC<Scene01Props> = ({
  onOpenSurprise,
  onPlayEnvelopeSfx,
}) => {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [emotion, setEmotion] = useState<BearEmotion>('idle');
  const [isError, setIsError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [speechText, setSpeechText] = useState(
    'Halt, Queen Sabdha! 🧸 Security Bears Barnaby & Bella here! Only the birthday girl knows the secret 4-digit Birth Year code to unlock this universe! Enter your birth year below 👇'
  );

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus first input on load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.matchMedia('(pointer: fine)').matches) {
        inputRefs[0].current?.focus({ preventScroll: true });
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const validatePasscode = useCallback(
    (enteredCode: string) => {
      if (enteredCode === CORRECT_PASSCODE) {
        // CORRECT PASSCODE (2004)
        setIsError(false);
        setIsUnlocked(true);
        setEmotion('celebrating');
        playSfx('success');

        setSpeechText(
          'YAAAY!! 🎉💖 PASSCODE ACCEPTED! It really is you, Queen Sabdha! Unlocking your magical universe right now... ✨'
        );

        // Confetti burst
        confetti({
          disableForReducedMotion: true,
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#F472B6', '#FBBF24', '#A855F7', '#38BDF8', '#EC4899', '#FFF0E5'],
        });

        setTimeout(() => {
          setEnvelopeOpen(true);
          onPlayEnvelopeSfx();
        }, 800);

        setTimeout(() => {
          onOpenSurprise();
        }, 2500);
      } else {
        // WRONG CODE -> ANGRY BEARS
        setIsError(true);
        setEmotion('angry');
        playSfx('error');

        setSpeechText(
          `HMMMPH!! 😤💢 WRONG CODE! "${enteredCode}" is NOT your birth year! The teddy bears are angry! Type the right code (2004) to enter your magical world!! 🧸💨`
        );

        // Vibrate on mobile
        if ('vibrate' in navigator) {
          navigator.vibrate([100, 60, 100]);
        }

        // Reset after shake
        setTimeout(() => {
          setIsError(false);
          setDigits(['', '', '', '']);
          inputRefs[0].current?.focus();
        }, 1800);
      }
    },
    [onOpenSurprise, onPlayEnvelopeSfx]
  );

  const handleDigitChange = (index: number, value: string) => {
    if (isUnlocked) return;

    const cleaned = value.replace(/[^0-9]/g, '');
    const char = cleaned.slice(-1);

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    if (char) {
      playSfx('type');
      setEmotion('typing');
      setSpeechText('Ooooh! What year is that? Keep typing... 🐾✨');

      if (index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }

    const currentCode = newDigits.join('');
    if (currentCode.length === 4) {
      validatePasscode(currentCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    } else if (e.key === 'Enter') {
      const currentCode = digits.join('');
      if (currentCode.length === 4) {
        validatePasscode(currentCode);
      }
    }
  };

  const handleKeypadPress = (val: string) => {
    if (isUnlocked) return;

    if (val === 'clear') {
      setDigits(['', '', '', '']);
      inputRefs[0].current?.focus();
      setEmotion('idle');
      setSpeechText('Cleared! Take your time, Sabdha! Which year were you born in? 🧸');
      return;
    }

    if (val === 'backspace') {
      const lastIndex = digits.reduce((acc, curr, idx) => (curr ? idx : acc), -1);
      if (lastIndex >= 0) {
        const newDigits = [...digits];
        newDigits[lastIndex] = '';
        setDigits(newDigits);
        inputRefs[lastIndex].current?.focus();
      }
      return;
    }

    const emptyIndex = digits.findIndex((d) => d === '');
    if (emptyIndex !== -1) {
      handleDigitChange(emptyIndex, val);
    }
  };

  return (
    <div className="invitation-page">
      {/* 1. LAYER 1: Deep Atmospheric Gradient & Glowing Nebulae */}
      <div className="invitation-sky" />

      {/* Atmospheric Nebula Glowing Orbs */}
      <div className="absolute top-1/4 -left-20 w-[550px] h-[550px] rounded-full bg-[#76519A]/20 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full bg-[#F5A6C8]/18 blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#382052]/35 blur-[150px] pointer-events-none" />

      {/* 2. LAYER 2: Interactive HTML5 Canvas Starfield with Shooting Stars */}
      <StarFieldCanvas />

      {/* Floating Delicate Balloons in distant corners */}
      <div className="absolute top-12 left-6 sm:left-14 pointer-events-none opacity-30 hidden sm:block animate-floatSlow">
        <span className="text-4xl lg:text-5xl">🎈</span>
      </div>
      <div className="absolute top-16 right-8 sm:right-20 pointer-events-none opacity-30 hidden sm:block animate-floatSlow" style={{ animationDelay: '2s' }}>
        <span className="text-4xl lg:text-5xl">🎈</span>
      </div>

      <div className="invitation-spread">
        <section className="invitation-cover" aria-labelledby="invitation-title">
          <p className="story-eyebrow"><Sparkles size={15} /> Top Secret • Birthday Portal Guardians</p>
          <h1 id="invitation-title">A Little Universe<br /><em>of Memories</em></h1>
          <RealisticEnvelope isOpen={envelopeOpen} isUnlocked={isUnlocked} isError={isError} />
        </section>
        <section className="invitation-access" aria-label="Birthday passcode">
          <SecretSpeechBubble emotion={emotion} text={speechText} />
          <PasscodeKeypad
            digits={digits}
            isUnlocked={isUnlocked}
            isError={isError}
            showHint={showHint}
            onDigitChange={handleDigitChange}
            onKeyDown={handleKeyDown}
            onKeypadPress={handleKeypadPress}
            onToggleHint={() => setShowHint(!showHint)}
            onSubmit={() => validatePasscode(digits.join(''))}
            inputRefs={inputRefs}
          />
        </section>
        <div className="invitation-guardians">
          <GuardianBearCharacter name="Barnaby" emotion={emotion} />
          <GuardianBearCharacter name="Bella" emotion={emotion} />
        </div>
      </div>

      {/* 5. FOOTER: Ambient sound guidance & copyright note */}
      <footer className="relative z-20 w-full text-center pb-2 pt-4">
        <p className="text-xs text-purple-200/60 font-light tracking-wide">
          Enter 2004 to prove you are the real Sabdha • Turn up your sound 🎵
        </p>
      </footer>

      {/* Global CSS for floating animations */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        .animate-floatSlow {
          animation: floatSlow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

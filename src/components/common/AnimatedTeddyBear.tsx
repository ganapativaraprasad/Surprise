import React from 'react';

export type TeddyEmotion = 'idle' | 'typing' | 'angry' | 'celebrating';

export interface AnimatedTeddyBearProps {
  emotion: TeddyEmotion;
  variant?: 'left' | 'right' | 'solo';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AnimatedTeddyBear: React.FC<AnimatedTeddyBearProps> = ({
  emotion,
  variant = 'solo',
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-28 h-32 sm:w-36 sm:h-40',
    md: 'w-36 h-44 sm:w-48 sm:h-56',
    lg: 'w-48 h-56 sm:w-60 sm:h-72',
  };

  const isAngry = emotion === 'angry';
  const isCelebrating = emotion === 'celebrating';
  const isTyping = emotion === 'typing';

  return (
    <div
      className={`relative select-none flex flex-col items-center ${sizeMap[size]} ${className}`}
    >
      {/* Dynamic Emotion Overhead Badges / Effects */}
      {isAngry && (
        <div className="absolute -top-7 sm:-top-8 z-30 flex items-center gap-1.5 animate-bounce">
          <span className="text-xl sm:text-2xl animate-spin" style={{ animationDuration: '3s' }}>
            💢
          </span>
          <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-lg animate-pulse">
            Grrr! Wrong!
          </span>
          <span className="text-xl sm:text-2xl animate-spin" style={{ animationDuration: '3s' }}>
            💨
          </span>
        </div>
      )}

      {isCelebrating && (
        <div className="absolute -top-8 sm:-top-9 z-30 flex items-center gap-1 animate-bounce">
          <span className="text-xl sm:text-2xl">🎉</span>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-purple-950 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg">
            YAAAY 2004!
          </span>
          <span className="text-xl sm:text-2xl">💖</span>
        </div>
      )}

      {isTyping && (
        <div className="absolute -top-6 sm:-top-7 z-30 flex items-center gap-1 animate-pulse">
          <span className="px-2 py-0.5 rounded-full bg-purple-500/80 text-white text-[10px] sm:text-xs font-semibold backdrop-blur-xs">
            Watching you type... 👀
          </span>
        </div>
      )}

      {/* Floating Balloons for Left Bear */}
      {variant === 'left' && (
        <div className="absolute -top-12 -left-6 sm:-top-16 sm:-left-8 pointer-events-none hidden sm:block animate-floatSlow">
          {/* Balloon strings */}
          <svg className="w-16 h-20 overflow-visible opacity-80" viewBox="0 0 60 80">
            {/* Balloon 1 - Pink Heart */}
            <g transform="translate(10, 0)">
              <circle cx="12" cy="14" r="12" fill="url(#balloonPink)" />
              <polygon points="10,25 14,25 12,28" fill="#F472B6" />
              <path d="M12,28 Q10,50 18,75" stroke="#FBCFE8" strokeWidth="1" fill="none" />
            </g>
            {/* Balloon 2 - Golden Star */}
            <g transform="translate(30, -10)">
              <circle cx="12" cy="14" r="11" fill="url(#balloonGold)" />
              <polygon points="10,24 14,24 12,27" fill="#FBBF24" />
              <path d="M12,27 Q22,50 18,75" stroke="#FDE68A" strokeWidth="1" fill="none" />
            </g>
            <defs>
              <radialGradient id="balloonPink" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FDF2F8" />
                <stop offset="50%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#DB2777" />
              </radialGradient>
              <radialGradient id="balloonGold" cx="30%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="60%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      )}

      {/* Floating Sparkles & Heart Key for Right Bear */}
      {variant === 'right' && (
        <div className="absolute -top-10 -right-6 sm:-top-12 sm:-right-8 pointer-events-none hidden sm:block animate-pulse">
          <div className="flex flex-col items-center">
            <span className="text-2xl drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">
              🔑
            </span>
            <span className="text-[9px] font-mono text-amber-300 font-bold tracking-widest bg-black/40 px-1.5 py-0.5 rounded-full border border-amber-300/40">
              SECRET
            </span>
          </div>
        </div>
      )}

      {/* Main Animated SVG Teddy Bear */}
      <svg
        viewBox="0 0 200 240"
        className={`w-full h-full drop-shadow-2xl transition-transform duration-300 ${
          isAngry
            ? 'animate-teddyAngry'
            : isCelebrating
            ? 'animate-teddyCelebrate'
            : isTyping
            ? 'animate-teddyCurious'
            : 'animate-teddyBreathe'
        }`}
      >
        <defs>
          {/* Fur Gradient */}
          <linearGradient id="bearFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DCA36E" />
            <stop offset="50%" stopColor="#C4844D" />
            <stop offset="100%" stopColor="#A76834" />
          </linearGradient>

          {/* Tummy Fur Gradient */}
          <linearGradient id="bearTummy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2DE" />
            <stop offset="100%" stopColor="#F6DCB8" />
          </linearGradient>

          {/* Inner Ear Gradient */}
          <linearGradient id="innerEar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#F472B6" />
          </linearGradient>

          {/* Golden Crown/Hat Gradient */}
          <linearGradient id="partyHat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        {/* 1. EARS */}
        {/* Left Ear */}
        <g className={isAngry ? 'animate-earTwitchLeft' : ''}>
          <circle cx="56" cy="62" r="24" fill="url(#bearFur)" stroke="#8C5325" strokeWidth="2.5" />
          <circle cx="56" cy="62" r="14" fill="url(#innerEar)" opacity="0.85" />
          {isAngry && (
            /* Steam puff from left ear */
            <path
              d="M40,46 Q30,30 22,34 Q20,44 32,46"
              fill="white"
              opacity="0.8"
              className="animate-pulse"
            />
          )}
        </g>

        {/* Right Ear */}
        <g className={isAngry ? 'animate-earTwitchRight' : ''}>
          <circle cx="144" cy="62" r="24" fill="url(#bearFur)" stroke="#8C5325" strokeWidth="2.5" />
          <circle cx="144" cy="62" r="14" fill="url(#innerEar)" opacity="0.85" />
          {isAngry && (
            /* Steam puff from right ear */
            <path
              d="M160,46 Q170,30 178,34 Q180,44 168,46"
              fill="white"
              opacity="0.8"
              className="animate-pulse"
            />
          )}
        </g>

        {/* Party Hat or Floral Bow */}
        {variant === 'left' && (
          <g transform="translate(100, 32)">
            {/* Party Hat Cone */}
            <polygon points="-16,14 16,14 0,-24" fill="url(#partyHat)" stroke="#CA8A04" strokeWidth="1.5" />
            {/* Stripes */}
            <path d="M-8,3 L8,3" stroke="#EC4899" strokeWidth="2" />
            <path d="M-12,9 L12,9" stroke="#3B82F6" strokeWidth="2" />
            {/* Pom-pom */}
            <circle cx="0" cy="-24" r="5" fill="#F43F5E" />
          </g>
        )}

        {variant === 'right' && (
          <g transform="translate(136, 44)">
            {/* Daisy Flower */}
            <circle cx="-5" cy="0" r="4.5" fill="#FDA4AF" />
            <circle cx="5" cy="0" r="4.5" fill="#FDA4AF" />
            <circle cx="0" cy="-5" r="4.5" fill="#FDA4AF" />
            <circle cx="0" cy="5" r="4.5" fill="#FDA4AF" />
            <circle cx="0" cy="0" r="4" fill="#FACC15" />
          </g>
        )}

        {variant === 'solo' && (
          <g transform="translate(100, 34)">
            {/* Tiny Golden Birthday Crown */}
            <polygon points="-14,10 -10,0 -4,6 0,-6 4,6 10,0 14,10" fill="url(#partyHat)" stroke="#CA8A04" strokeWidth="1.5" />
            <circle cx="0" cy="-6" r="2" fill="#F43F5E" />
          </g>
        )}

        {/* 2. BODY */}
        <ellipse cx="100" cy="162" rx="54" ry="58" fill="url(#bearFur)" stroke="#8C5325" strokeWidth="2.5" />

        {/* Tummy Oval */}
        <ellipse cx="100" cy="166" rx="36" ry="40" fill="url(#bearTummy)" />

        {/* Heart embroidery on Tummy */}
        <path
          d="M100,166 C95,158 84,158 84,168 C84,178 100,188 100,188 C100,188 116,178 116,168 C116,158 105,158 100,166 Z"
          fill={isAngry ? '#EF4444' : isCelebrating ? '#EC4899' : '#F472B6'}
          opacity="0.75"
        />

        {/* 3. FEET / LEGS */}
        {/* Left Foot */}
        <ellipse cx="64" cy="214" rx="22" ry="16" fill="url(#bearFur)" stroke="#8C5325" strokeWidth="2.5" />
        <ellipse cx="64" cy="214" rx="14" ry="10" fill="url(#bearTummy)" />
        {/* Foot pads */}
        <circle cx="58" cy="209" r="2.5" fill="#D97706" opacity="0.6" />
        <circle cx="64" cy="207" r="2.5" fill="#D97706" opacity="0.6" />
        <circle cx="70" cy="209" r="2.5" fill="#D97706" opacity="0.6" />

        {/* Right Foot */}
        <ellipse cx="136" cy="214" rx="22" ry="16" fill="url(#bearFur)" stroke="#8C5325" strokeWidth="2.5" />
        <ellipse cx="136" cy="214" rx="14" ry="10" fill="url(#bearTummy)" />
        {/* Foot pads */}
        <circle cx="130" cy="209" r="2.5" fill="#D97706" opacity="0.6" />
        <circle cx="136" cy="207" r="2.5" fill="#D97706" opacity="0.6" />
        <circle cx="142" cy="209" r="2.5" fill="#D97706" opacity="0.6" />

        {/* 4. HEAD */}
        <ellipse cx="100" cy="98" rx="50" ry="46" fill="url(#bearFur)" stroke="#8C5325" strokeWidth="2.5" />

        {/* Cheeks Blush */}
        {isAngry ? (
          /* Angry bright red cheeks */
          <g>
            <circle cx="68" cy="112" r="13" fill="#EF4444" opacity="0.8" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="68" cy="112" r="12" fill="#DC2626" opacity="0.7" />
            <circle cx="132" cy="112" r="13" fill="#EF4444" opacity="0.8" className="animate-ping" style={{ animationDuration: '2s' }} />
            <circle cx="132" cy="112" r="12" fill="#DC2626" opacity="0.7" />
          </g>
        ) : isCelebrating ? (
          /* Joyful pink heart blush */
          <g>
            <circle cx="68" cy="112" r="12" fill="#F472B6" opacity="0.75" />
            <circle cx="132" cy="112" r="12" fill="#F472B6" opacity="0.75" />
          </g>
        ) : (
          /* Gentle pink blush */
          <g>
            <circle cx="68" cy="112" r="10" fill="#FBCFE8" opacity="0.7" />
            <circle cx="132" cy="112" r="10" fill="#FBCFE8" opacity="0.7" />
          </g>
        )}

        {/* Snout Muzzle */}
        <ellipse cx="100" cy="114" rx="26" ry="20" fill="url(#bearTummy)" stroke="#C4844D" strokeWidth="1.5" />

        {/* Dark Brown Nose */}
        <path
          d="M93,105 Q100,102 107,105 Q100,114 93,105 Z"
          fill="#3E2413"
        />
        {/* Nose Highlight */}
        <ellipse cx="98" cy="105" rx="2" ry="1" fill="#FFFFFF" opacity="0.8" />

        {/* Mouth depending on Emotion */}
        {isAngry ? (
          /* Angry / Pouting Wavy Frown */
          <g>
            <path
              d="M100,112 L100,116 M90,126 Q100,118 110,126"
              stroke="#3E2413"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Tiny sharp tooth of anger */}
            <polygon points="98,122 102,122 100,125" fill="white" />
          </g>
        ) : isCelebrating ? (
          /* Wide Happy Smiling Open Mouth */
          <g>
            <path d="M100,112 L100,116" stroke="#3E2413" strokeWidth="2" />
            <path
              d="M88,118 Q100,134 112,118 Z"
              fill="#BE123C"
              stroke="#3E2413"
              strokeWidth="2"
            />
            {/* Cute pink tongue */}
            <path d="M94,124 Q100,120 106,124 Q100,132 94,124 Z" fill="#FB7185" />
          </g>
        ) : isTyping ? (
          /* Curious "O" mouth */
          <g>
            <path d="M100,112 L100,116" stroke="#3E2413" strokeWidth="2" />
            <circle cx="100" cy="122" r="4.5" fill="#3E2413" />
          </g>
        ) : (
          /* Gentle Happy Smile */
          <g>
            <path d="M100,112 L100,117" stroke="#3E2413" strokeWidth="2" />
            <path
              d="M91,120 Q96,125 100,120 Q104,125 109,120"
              stroke="#3E2413"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}

        {/* EYES */}
        {isAngry ? (
          /* Angry Slanted Eyebrows & Glaring Eyes */
          <g>
            {/* Eyebrows angled in anger */}
            <path d="M72,82 L88,90" stroke="#3E2413" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M128,82 L112,90" stroke="#3E2413" strokeWidth="3.5" strokeLinecap="round" />
            {/* Eyes narrowed with determination */}
            <ellipse cx="80" cy="94" rx="7" ry="5" fill="#3E2413" />
            <circle cx="81" cy="93" r="1.8" fill="#EF4444" />
            <ellipse cx="120" cy="94" rx="7" ry="5" fill="#3E2413" />
            <circle cx="119" cy="93" r="1.8" fill="#EF4444" />
          </g>
        ) : isCelebrating ? (
          /* Joyful Squinting Eyes `^ ^` */
          <g>
            <path
              d="M74,96 Q80,87 86,96"
              stroke="#3E2413"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M114,96 Q120,87 126,96"
              stroke="#3E2413"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        ) : (
          /* Normal Shiny Sparkly Eyes with Blink */
          <g className="animate-bearBlink">
            {/* Left Eye */}
            <ellipse cx="80" cy="93" rx="7" ry="9" fill="#29180E" />
            <circle cx="78" cy="90" r="3" fill="#FFFFFF" />
            <circle cx="83" cy="96" r="1.5" fill="#FFFFFF" />
            {/* Right Eye */}
            <ellipse cx="120" cy="93" rx="7" ry="9" fill="#29180E" />
            <circle cx="118" cy="90" r="3" fill="#FFFFFF" />
            <circle cx="123" cy="96" r="1.5" fill="#FFFFFF" />
          </g>
        )}

        {/* 5. ARMS / PAWS */}
        {isCelebrating ? (
          /* Both Paws Raised in Victory/Joy */
          <g>
            {/* Left Paw High */}
            <path
              d="M58,154 C40,140 28,110 40,94 C48,84 64,96 66,114 Z"
              fill="url(#bearFur)"
              stroke="#8C5325"
              strokeWidth="2.5"
            />
            <circle cx="44" cy="98" r="8" fill="url(#bearTummy)" />
            {/* Right Paw High */}
            <path
              d="M142,154 C160,140 172,110 160,94 C152,84 136,96 134,114 Z"
              fill="url(#bearFur)"
              stroke="#8C5325"
              strokeWidth="2.5"
            />
            <circle cx="156" cy="98" r="8" fill="url(#bearTummy)" />
          </g>
        ) : isAngry ? (
          /* Crossed Arms / Stubborn Paws */
          <g>
            <ellipse cx="78" cy="162" rx="16" ry="12" fill="url(#bearFur)" stroke="#8C5325" strokeWidth="2.5" />
            <ellipse cx="122" cy="162" rx="16" ry="12" fill="url(#bearFur)" stroke="#8C5325" strokeWidth="2.5" />
            <path d="M72,162 L128,162" stroke="#8C5325" strokeWidth="3" strokeLinecap="round" />
          </g>
        ) : variant === 'left' ? (
          /* Waving Left Paw */
          <g>
            {/* Left Arm Waving */}
            <g className="animate-pawWave origin-[46px_146px]">
              <path
                d="M56,156 C40,145 32,126 38,112 C44,102 58,112 58,128 Z"
                fill="url(#bearFur)"
                stroke="#8C5325"
                strokeWidth="2.5"
              />
              <circle cx="42" cy="118" r="7" fill="url(#bearTummy)" />
            </g>
            {/* Right Arm resting */}
            <path
              d="M144,156 C160,166 168,184 158,194 C148,200 140,186 138,172 Z"
              fill="url(#bearFur)"
              stroke="#8C5325"
              strokeWidth="2.5"
            />
          </g>
        ) : (
          /* Gentle Paws Holding Heart or Resting */
          <g>
            {/* Left Arm Resting */}
            <path
              d="M56,156 C40,166 32,184 42,194 C52,200 60,186 62,172 Z"
              fill="url(#bearFur)"
              stroke="#8C5325"
              strokeWidth="2.5"
            />
            {/* Right Arm Waving softly */}
            <g className="animate-pawWave origin-[154px_146px]">
              <path
                d="M144,156 C160,145 168,126 162,112 C156,102 142,112 142,128 Z"
                fill="url(#bearFur)"
                stroke="#8C5325"
                strokeWidth="2.5"
              />
              <circle cx="158" cy="118" r="7" fill="url(#bearTummy)" />
            </g>
          </g>
        )}
      </svg>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes teddyBreathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.02); }
        }
        @keyframes teddyCurious {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(-2px); }
        }
        @keyframes teddyAngry {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-3px, 2px) rotate(-4deg); }
          40% { transform: translate(3px, -2px) rotate(4deg); }
          60% { transform: translate(-4px, 1px) rotate(-3deg); }
          80% { transform: translate(4px, -1px) rotate(3deg); }
        }
        @keyframes teddyCelebrate {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.06); }
        }
        @keyframes bearBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes pawWave {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes earTwitchLeft {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-8deg); }
        }
        @keyframes earTwitchRight {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        .animate-teddyBreathe {
          animation: teddyBreathe 3.5s ease-in-out infinite;
        }
        .animate-teddyCurious {
          animation: teddyCurious 2.2s ease-in-out infinite;
        }
        .animate-teddyAngry {
          animation: teddyAngry 0.35s ease-in-out infinite;
        }
        .animate-teddyCelebrate {
          animation: teddyCelebrate 0.8s ease-in-out infinite;
        }
        .animate-bearBlink {
          transform-origin: 100px 93px;
          animation: bearBlink 4s infinite;
        }
        .animate-pawWave {
          animation: pawWave 1.4s ease-in-out infinite;
        }
        .animate-earTwitchLeft {
          transform-origin: 56px 62px;
          animation: earTwitchLeft 0.3s ease-in-out infinite;
        }
        .animate-earTwitchRight {
          transform-origin: 144px 62px;
          animation: earTwitchRight 0.3s ease-in-out infinite;
        }
        .animate-floatSlow {
          animation: floatSlow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

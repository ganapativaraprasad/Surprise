import React from 'react';

export type BearEmotion = 'idle' | 'typing' | 'angry' | 'celebrating';

export interface GuardianBearCharacterProps {
  name: 'Barnaby' | 'Bella';
  emotion: BearEmotion;
  className?: string;
}

export const GuardianBearCharacter: React.FC<GuardianBearCharacterProps> = ({
  name,
  emotion,
  className = '',
}) => {
  const isBarnaby = name === 'Barnaby';
  const isAngry = emotion === 'angry';
  const isCelebrating = emotion === 'celebrating';
  const isTyping = emotion === 'typing';

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* Dynamic Status / Reaction Badges floating above the head */}
      <div className="absolute -top-10 z-30 flex items-center gap-1.5 transition-all duration-300">
        {isAngry && (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-rose-900/90 border border-rose-400 text-rose-100 text-xs font-bold shadow-xl animate-bounce backdrop-blur-md">
            <span>💢</span>
            <span>Hmph! Wrong Year!</span>
            <span>💨</span>
          </div>
        )}

        {isCelebrating && (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/95 border border-amber-200 text-purple-950 text-xs font-black shadow-xl animate-bounce backdrop-blur-md">
            <span>🎉</span>
            <span>Queen Sabdha 2004!</span>
            <span>💖</span>
          </div>
        )}

        {isTyping && (
          <div className="px-2.5 py-0.5 rounded-full bg-violet-900/80 border border-violet-400/60 text-violet-200 text-[11px] font-medium shadow-md animate-pulse backdrop-blur-md">
            {isBarnaby ? 'Watching closely... 🐾' : 'Is it 2004...? ✨'}
          </div>
        )}
      </div>

      {/* Floating Helium Balloons for Barnaby */}
      {isBarnaby && (
        <div className="absolute -top-24 -left-8 pointer-events-none hidden lg:block animate-balloonFloat">
          <svg className="w-24 h-32 overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]" viewBox="0 0 80 120">
            <defs>
              {/* Balloon 1: Royal Violet */}
              <radialGradient id="balloonViolet" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#EDE9FE" />
                <stop offset="40%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#581C87" />
              </radialGradient>
              {/* Balloon 2: Rose Gold */}
              <radialGradient id="balloonRose" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="45%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#9F1239" />
              </radialGradient>
              {/* Balloon 3: Champagne Gold */}
              <radialGradient id="balloonChampagne" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FEF9C3" />
                <stop offset="45%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#B45309" />
              </radialGradient>
            </defs>

            {/* Balloon 1 */}
            <g transform="translate(14, 4)">
              <ellipse cx="16" cy="18" rx="14" ry="17" fill="url(#balloonViolet)" />
              <polygon points="13,35 19,35 16,38" fill="#7E22CE" />
              <path d="M16,38 Q10,75 22,110" stroke="rgba(216,180,254,0.6)" strokeWidth="1.2" fill="none" />
              {/* Specular highlight */}
              <ellipse cx="11" cy="11" rx="4" ry="7" fill="white" opacity="0.45" transform="rotate(-20 11 11)" />
            </g>

            {/* Balloon 2 */}
            <g transform="translate(42, -6)">
              <ellipse cx="16" cy="18" rx="13" ry="16" fill="url(#balloonRose)" />
              <polygon points="13,34 19,34 16,37" fill="#BE123C" />
              <path d="M16,37 Q25,75 22,110" stroke="rgba(254,205,211,0.6)" strokeWidth="1.2" fill="none" />
              <ellipse cx="11" cy="11" rx="3.5" ry="6" fill="white" opacity="0.45" transform="rotate(-20 11 11)" />
            </g>

            {/* Balloon 3 */}
            <g transform="translate(28, 18)">
              <ellipse cx="14" cy="16" rx="12" ry="15" fill="url(#balloonChampagne)" />
              <polygon points="11,31 17,31 14,34" fill="#D97706" />
              <path d="M14,34 Q18,70 22,110" stroke="rgba(253,230,138,0.6)" strokeWidth="1.2" fill="none" />
              <ellipse cx="10" cy="10" rx="3" ry="5" fill="white" opacity="0.45" transform="rotate(-20 10 10)" />
            </g>
          </svg>
        </div>
      )}

      {/* Floating Golden Secret Key for Bella */}
      {!isBarnaby && (
        <div className="absolute -top-16 -right-6 pointer-events-none hidden lg:block animate-keyGlow">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-300/60 backdrop-blur-md flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.6)]">
              <span className="text-2xl drop-shadow-md">🗝️</span>
            </div>
            <span className="mt-1 text-[9px] font-mono tracking-widest text-amber-200 uppercase bg-purple-950/80 px-2 py-0.5 rounded-full border border-amber-400/40">
              KEY 2004
            </span>
          </div>
        </div>
      )}

      {/* Main Dimensional Character Artwork */}
      <div
        className={`relative w-44 h-56 sm:w-52 sm:h-64 lg:w-60 lg:h-72 transition-transform duration-500 ${
          isAngry
            ? 'animate-bearPout'
            : isCelebrating
            ? 'animate-bearVictory'
            : isTyping
            ? 'animate-bearCurious'
            : 'animate-bearBreathe'
        }`}
      >
        <svg
          viewBox="0 0 240 280"
          className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
        >
          <defs>
            {/* Rich Volumetric Fur Gradients */}
            <radialGradient id="furGradient" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#E4A870" />
              <stop offset="45%" stopColor="#C4844D" />
              <stop offset="85%" stopColor="#9B5C26" />
              <stop offset="100%" stopColor="#6E3B12" />
            </radialGradient>

            <radialGradient id="furHighlight" cx="30%" cy="20%" r="50%">
              <stop offset="0%" stopColor="#F9D7B5" />
              <stop offset="60%" stopColor="#E4A870" />
              <stop offset="100%" stopColor="#C4844D" />
            </radialGradient>

            {/* Muzzle & Tummy Cream Gradient */}
            <radialGradient id="creamPlush" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFF9F0" />
              <stop offset="60%" stopColor="#FCE7CB" />
              <stop offset="100%" stopColor="#E6C49E" />
            </radialGradient>

            {/* Inner Ear Soft Velvet */}
            <radialGradient id="innerEarGrad" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#FCE7F3" />
              <stop offset="65%" stopColor="#F472B6" />
              <stop offset="100%" stopColor="#BE185D" />
            </radialGradient>

            {/* Party Hat Gradient */}
            <linearGradient id="partyHatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            {/* Drop Shadow Filter */}
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2A1608" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* 1. EARS */}
          {/* Left Ear */}
          <g className={isAngry ? 'animate-earSteamLeft' : ''}>
            <circle cx="68" cy="74" r="28" fill="url(#furGradient)" stroke="#6E3B12" strokeWidth="2.5" />
            <circle cx="68" cy="74" r="16" fill="url(#innerEarGrad)" />
            {/* Ear Fluff Rim */}
            <path d="M50,74 Q68,60 84,76" stroke="#F9D7B5" strokeWidth="1.8" fill="none" opacity="0.6" />
            {isAngry && (
              /* Cartoon Steam puffs */
              <g className="animate-pulse">
                <circle cx="48" cy="48" r="6" fill="white" opacity="0.8" />
                <circle cx="40" cy="38" r="9" fill="white" opacity="0.75" />
                <circle cx="30" cy="30" r="12" fill="white" opacity="0.7" />
              </g>
            )}
          </g>

          {/* Right Ear */}
          <g className={isAngry ? 'animate-earSteamRight' : ''}>
            <circle cx="172" cy="74" r="28" fill="url(#furGradient)" stroke="#6E3B12" strokeWidth="2.5" />
            <circle cx="172" cy="74" r="16" fill="url(#innerEarGrad)" />
            <path d="M156,76 Q172,60 190,74" stroke="#F9D7B5" strokeWidth="1.8" fill="none" opacity="0.6" />
            {isAngry && (
              <g className="animate-pulse">
                <circle cx="192" cy="48" r="6" fill="white" opacity="0.8" />
                <circle cx="200" cy="38" r="9" fill="white" opacity="0.75" />
                <circle cx="210" cy="30" r="12" fill="white" opacity="0.7" />
              </g>
            )}
          </g>

          {/* Accessories: Hat for Barnaby, Bow/Flower for Bella */}
          {isBarnaby ? (
            <g transform="translate(120, 42)">
              {/* Party Hat Cone with curved base */}
              <path
                d="M-20,18 L0,-28 L20,18 Q0,24 -20,18 Z"
                fill="url(#partyHatGrad)"
                stroke="#78350F"
                strokeWidth="1.8"
              />
              {/* Decorative hat spirals */}
              <path d="M-12,5 Q0,9 12,5" stroke="#EC4899" strokeWidth="2.5" fill="none" />
              <path d="M-6,-10 Q0,-6 6,-10" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
              {/* Fluffy Pom-Pom */}
              <circle cx="0" cy="-28" r="7" fill="#F43F5E" />
              <circle cx="0" cy="-28" r="5" fill="#FFE4E6" opacity="0.5" />
            </g>
          ) : (
            <g transform="translate(164, 52)">
              {/* Pink Sakura / Daisy Flower behind ear */}
              <circle cx="-7" cy="0" r="6" fill="#FDA4AF" />
              <circle cx="7" cy="0" r="6" fill="#FDA4AF" />
              <circle cx="0" cy="-7" r="6" fill="#FDA4AF" />
              <circle cx="0" cy="7" r="6" fill="#FDA4AF" />
              <circle cx="0" cy="0" r="5.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
              {/* Tiny Pearl center */}
              <circle cx="-1" cy="-1" r="1.5" fill="#FFFFFF" />
            </g>
          )}

          {/* 2. BODY & TORSO */}
          <ellipse cx="120" cy="185" rx="66" ry="68" fill="url(#furGradient)" stroke="#6E3B12" strokeWidth="2.5" />

          {/* Plush Tummy Patch */}
          <ellipse cx="120" cy="188" rx="44" ry="48" fill="url(#creamPlush)" />
          {/* Subtle plush tummy stitch shadow */}
          <path
            d="M92,188 Q120,224 148,188"
            stroke="#D8AC7D"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            fill="none"
            opacity="0.6"
          />

          {/* Embroidered Heart Emblem on Chest */}
          <path
            d="M120,172 C114,162 102,162 102,174 C102,186 120,198 120,198 C120,198 138,186 138,174 C138,162 126,162 120,172 Z"
            fill={isAngry ? '#E11D48' : isCelebrating ? '#EC4899' : '#F472B6'}
            opacity="0.85"
            stroke="#BE185D"
            strokeWidth="1"
          />

          {/* 3. FEET / LEGS */}
          {/* Left Foot */}
          <ellipse cx="76" cy="242" rx="26" ry="18" fill="url(#furGradient)" stroke="#6E3B12" strokeWidth="2.5" />
          <ellipse cx="76" cy="242" rx="17" ry="11" fill="url(#creamPlush)" />
          {/* Toe beans */}
          <circle cx="68" cy="235" r="3" fill="#C4844D" opacity="0.8" />
          <circle cx="76" cy="233" r="3" fill="#C4844D" opacity="0.8" />
          <circle cx="84" cy="235" r="3" fill="#C4844D" opacity="0.8" />

          {/* Right Foot */}
          <ellipse cx="164" cy="242" rx="26" ry="18" fill="url(#furGradient)" stroke="#6E3B12" strokeWidth="2.5" />
          <ellipse cx="164" cy="242" rx="17" ry="11" fill="url(#creamPlush)" />
          {/* Toe beans */}
          <circle cx="156" cy="235" r="3" fill="#C4844D" opacity="0.8" />
          <circle cx="164" cy="233" r="3" fill="#C4844D" opacity="0.8" />
          <circle cx="172" cy="235" r="3" fill="#C4844D" opacity="0.8" />

          {/* 4. HEAD */}
          <ellipse cx="120" cy="112" rx="60" ry="54" fill="url(#furGradient)" stroke="#6E3B12" strokeWidth="2.5" />
          {/* Forehead light highlight */}
          <ellipse cx="120" cy="85" rx="36" ry="20" fill="url(#furHighlight)" opacity="0.55" />

          {/* Cheeks Blush with Rosy Glow */}
          {isAngry ? (
            <g>
              <ellipse cx="80" cy="128" rx="15" ry="12" fill="#E11D48" opacity="0.85" className="animate-ping" />
              <ellipse cx="80" cy="128" rx="14" ry="11" fill="#BE123C" opacity="0.9" />
              <ellipse cx="160" cy="128" rx="15" ry="12" fill="#E11D48" opacity="0.85" className="animate-ping" />
              <ellipse cx="160" cy="128" rx="14" ry="11" fill="#BE123C" opacity="0.9" />
            </g>
          ) : isCelebrating ? (
            <g>
              <ellipse cx="80" cy="126" rx="14" ry="10" fill="#F472B6" opacity="0.85" />
              <ellipse cx="160" cy="126" rx="14" ry="10" fill="#F472B6" opacity="0.85" />
            </g>
          ) : (
            <g>
              <ellipse cx="80" cy="126" rx="12" ry="8" fill="#FBCFE8" opacity="0.7" />
              <ellipse cx="160" cy="126" rx="12" ry="8" fill="#FBCFE8" opacity="0.7" />
            </g>
          )}

          {/* Cream Snout Muzzle */}
          <ellipse cx="120" cy="130" rx="32" ry="24" fill="url(#creamPlush)" stroke="#A76834" strokeWidth="1.8" />

          {/* Dark Chocolate Nose */}
          <path
            d="M112,120 Q120,116 128,120 Q120,131 112,120 Z"
            fill="#3B1D08"
            stroke="#200E02"
            strokeWidth="1.5"
          />
          {/* Glossy Nose Reflection */}
          <ellipse cx="117" cy="119" rx="2.5" ry="1.2" fill="#FFFFFF" opacity="0.85" />

          {/* MOUTH — Expressive by emotion */}
          {isAngry ? (
            /* Comical angry pout / zigzag frown with tiny teeth */
            <g>
              <path d="M120,128 L120,133" stroke="#3B1D08" strokeWidth="2.5" strokeLinecap="round" />
              <path
                d="M106,144 Q120,134 134,144"
                stroke="#3B1D08"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              {/* Cute little determined fangs */}
              <polygon points="115,138 119,138 117,143" fill="white" />
              <polygon points="121,138 125,138 123,143" fill="white" />
            </g>
          ) : isCelebrating ? (
            /* Radiant joyful open smile with tongue */
            <g>
              <path d="M120,128 L120,132" stroke="#3B1D08" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M106,134 Q120,154 134,134 Z"
                fill="#9F1239"
                stroke="#3B1D08"
                strokeWidth="2"
              />
              <path d="M112,142 Q120,136 128,142 Q120,152 112,142 Z" fill="#FB7185" />
            </g>
          ) : isTyping ? (
            /* Wondering cute "o" */
            <g>
              <path d="M120,128 L120,133" stroke="#3B1D08" strokeWidth="2" strokeLinecap="round" />
              <circle cx="120" cy="140" r="5" fill="#3B1D08" />
              <circle cx="120" cy="140" r="3" fill="#831843" />
            </g>
          ) : (
            /* Sweet teddy smile */
            <g>
              <path d="M120,128 L120,133" stroke="#3B1D08" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M110,137 Q115,142 120,137 Q125,142 130,137"
                stroke="#3B1D08"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}

          {/* EYES */}
          {isAngry ? (
            /* Angry determined brows & squint */
            <g>
              <path d="M86,96 L106,106" stroke="#3B1D08" strokeWidth="4" strokeLinecap="round" />
              <path d="M154,96 L134,106" stroke="#3B1D08" strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="96" cy="110" rx="8" ry="6" fill="#200E02" />
              <circle cx="97" cy="109" r="2" fill="#EF4444" />
              <ellipse cx="144" cy="110" rx="8" ry="6" fill="#200E02" />
              <circle cx="143" cy="109" r="2" fill="#EF4444" />
            </g>
          ) : isCelebrating ? (
            /* Joyful laughing crescents `^ ^` */
            <g>
              <path
                d="M88,114 Q96,102 104,114"
                stroke="#3B1D08"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M136,114 Q144,102 152,114"
                stroke="#3B1D08"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ) : (
            /* Glossy deep glass eyes with triple light reflections */
            <g className="animate-bearBlink">
              {/* Left Eye */}
              <ellipse cx="96" cy="108" rx="8.5" ry="11" fill="#1A0D04" />
              <ellipse cx="94" cy="104" rx="3.5" ry="4.5" fill="#FFFFFF" />
              <circle cx="99" cy="112" r="1.8" fill="#FFFFFF" />
              <circle cx="93" cy="113" r="1" fill="#FFFFFF" opacity="0.6" />

              {/* Right Eye */}
              <ellipse cx="144" cy="108" rx="8.5" ry="11" fill="#1A0D04" />
              <ellipse cx="142" cy="104" rx="3.5" ry="4.5" fill="#FFFFFF" />
              <circle cx="147" cy="112" r="1.8" fill="#FFFFFF" />
              <circle cx="141" cy="113" r="1" fill="#FFFFFF" opacity="0.6" />
            </g>
          )}

          {/* 5. ARMS & PAWS */}
          {isCelebrating ? (
            /* Both Arms Raised High in Victory */
            <g>
              <path
                d="M68,175 C45,155 30,120 44,98 C54,84 74,100 78,122 Z"
                fill="url(#furGradient)"
                stroke="#6E3B12"
                strokeWidth="2.5"
              />
              <circle cx="48" cy="104" r="10" fill="url(#creamPlush)" />
              <path
                d="M172,175 C195,155 210,120 196,98 C186,84 166,100 162,122 Z"
                fill="url(#furGradient)"
                stroke="#6E3B12"
                strokeWidth="2.5"
              />
              <circle cx="192" cy="104" r="10" fill="url(#creamPlush)" />
            </g>
          ) : isAngry ? (
            /* Crossed Arms of Disapproval */
            <g>
              <ellipse cx="92" cy="180" rx="20" ry="15" fill="url(#furGradient)" stroke="#6E3B12" strokeWidth="2.5" />
              <ellipse cx="148" cy="180" rx="20" ry="15" fill="url(#furGradient)" stroke="#6E3B12" strokeWidth="2.5" />
              <path d="M86,180 L154,180" stroke="#6E3B12" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          ) : isBarnaby ? (
            /* Barnaby Waving Paw */
            <g>
              <g className="animate-pawWave origin-[56px_165px]">
                <path
                  d="M68,175 C48,160 38,135 46,118 C54,106 70,118 72,136 Z"
                  fill="url(#furGradient)"
                  stroke="#6E3B12"
                  strokeWidth="2.5"
                />
                <circle cx="52" cy="126" r="9" fill="url(#creamPlush)" />
              </g>
              {/* Right Arm holding balloon string */}
              <path
                d="M172,175 C190,185 200,205 188,218 C176,225 168,208 166,192 Z"
                fill="url(#furGradient)"
                stroke="#6E3B12"
                strokeWidth="2.5"
              />
              <circle cx="184" cy="212" r="7" fill="url(#creamPlush)" />
            </g>
          ) : (
            /* Bella Holding Secret Key */
            <g>
              <path
                d="M68,175 C50,185 40,205 52,218 C64,225 72,208 74,192 Z"
                fill="url(#furGradient)"
                stroke="#6E3B12"
                strokeWidth="2.5"
              />
              <circle cx="56" cy="212" r="7" fill="url(#creamPlush)" />
              {/* Right Arm Gently Greeting */}
              <g className="animate-pawWave origin-[184px_165px]">
                <path
                  d="M172,175 C192,160 202,135 194,118 C186,106 170,118 168,136 Z"
                  fill="url(#furGradient)"
                  stroke="#6E3B12"
                  strokeWidth="2.5"
                />
                <circle cx="188" cy="126" r="9" fill="url(#creamPlush)" />
              </g>
            </g>
          )}
        </svg>

        {/* Soft Glowing Stardust Cloud Base under the Bear */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 sm:w-48 h-8 rounded-full bg-gradient-to-r from-transparent via-purple-300/20 to-transparent blur-md pointer-events-none" />
      </div>

      {/* Name Ribbon */}
      <div className="mt-3 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-center shadow-lg">
        <span className="font-serif text-xs sm:text-sm font-bold tracking-wider text-pink-200">
          {name} Bear
        </span>
        <span className="block text-[9px] font-mono tracking-widest text-amber-300/80 uppercase">
          Birthday Guardian
        </span>
      </div>

      <style>{`
        @keyframes bearBreathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.015); }
        }
        @keyframes bearCurious {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(2.5deg) translateY(-3px); }
        }
        @keyframes bearPout {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-4px, 2px) rotate(-3deg); }
          75% { transform: translate(4px, -2px) rotate(3deg); }
        }
        @keyframes bearVictory {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.05); }
        }
        @keyframes bearBlink {
          0%, 88%, 100% { transform: scaleY(1); }
          93% { transform: scaleY(0.08); }
        }
        @keyframes pawWave {
          0%, 100% { transform: rotate(-6deg); }
          50% { transform: rotate(16deg); }
        }
        @keyframes earSteamLeft {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-7deg); }
        }
        @keyframes earSteamRight {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(7deg); }
        }
        @keyframes balloonFloat {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes keyGlow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-6px) scale(1.05); }
        }
        .animate-bearBreathe {
          animation: bearBreathe 4s ease-in-out infinite;
        }
        .animate-bearCurious {
          animation: bearCurious 2.5s ease-in-out infinite;
        }
        .animate-bearPout {
          animation: bearPout 0.4s ease-in-out infinite;
        }
        .animate-bearVictory {
          animation: bearVictory 0.75s ease-in-out infinite;
        }
        .animate-bearBlink {
          transform-origin: 120px 108px;
          animation: bearBlink 4.2s infinite;
        }
        .animate-pawWave {
          animation: pawWave 1.6s ease-in-out infinite;
        }
        .animate-earSteamLeft {
          transform-origin: 68px 74px;
          animation: earSteamLeft 0.35s ease-in-out infinite;
        }
        .animate-earSteamRight {
          transform-origin: 172px 74px;
          animation: earSteamRight 0.35s ease-in-out infinite;
        }
        .animate-balloonFloat {
          animation: balloonFloat 4.5s ease-in-out infinite;
        }
        .animate-keyGlow {
          animation: keyGlow 2.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

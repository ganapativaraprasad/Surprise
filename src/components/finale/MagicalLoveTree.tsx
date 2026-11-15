import React from 'react';

export const MagicalLoveTree: React.FC = () => {
  // 4 delicate, tastefully spaced hanging love charms placed strictly in the far-left corner
  const hangingCharms = [
    { id: 1, x: 105, y: 160, stringLen: 45, delay: '0s', size: 16, color: '#F472B6', glow: '#EC4899' }, // soft rose pink
    { id: 2, x: 155, y: 195, stringLen: 38, delay: '1.2s', size: 14, color: '#FDE047', glow: '#EAB308' }, // champagne gold
    { id: 3, x: 205, y: 170, stringLen: 50, delay: '0.7s', size: 17, color: '#C084FC', glow: '#A855F7' }, // soft lavender
    { id: 4, x: 250, y: 225, stringLen: 35, delay: '1.9s', size: 13, color: '#FDA4AF', glow: '#F43F5E' }, // delicate blush
  ];

  return (
    <div className="absolute bottom-0 left-0 w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] h-[360px] sm:h-[430px] md:h-[490px] pointer-events-none z-10 select-none overflow-visible">
      {/* Elegant Slender Tree Silhouette hugging the far-left corner */}
      <svg
        viewBox="0 0 320 500"
        preserveAspectRatio="xMinYMax meet"
        className="w-full h-full overflow-visible drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
      >
        <defs>
          {/* Bark Gradient: Midnight slate to deep indigo with moonlight rim */}
          <linearGradient id="cornerTreeBark" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#080C1E" />
            <stop offset="60%" stopColor="#0F1738" />
            <stop offset="100%" stopColor="#28224E" />
          </linearGradient>

          {/* Moonlight Rim Highlight along branches */}
          <linearGradient id="moonlightEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#A99BCF" stopOpacity="0" />
          </linearGradient>

          {/* Soft Stardust Blossom Glow */}
          <radialGradient id="fairyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="45%" stopColor="#F472B6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Lake Bank Soil & Roots */}
        <path
          d="M0,500 L0,450 C20,446 45,444 65,455 C85,465 105,452 130,460 C145,466 160,485 180,500 Z"
          fill="#070A18"
        />

        {/* Slender Curved Ancient Trunk */}
        <path
          d="M15,500 C25,440 32,380 44,320 C56,260 74,210 100,175 C88,215 75,270 65,335 C55,390 48,445 42,500 Z"
          fill="url(#cornerTreeBark)"
        />

        {/* Trunk Edge Moonlight Highlight */}
        <path
          d="M28,485 C38,430 45,370 56,310 C68,250 86,205 102,175"
          stroke="url(#moonlightEdge)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Slender Graceful Arching Branches (Strictly contained within far left) */}
        {/* Branch A: Upper graceful arc */}
        <path
          d="M100,175 C135,150 175,135 225,142 C255,146 280,160 295,170 C270,163 245,154 218,153 C175,151 135,165 100,175 Z"
          fill="url(#cornerTreeBark)"
        />
        {/* Branch A delicate twigs */}
        <path
          d="M218,153 C240,132 270,128 290,132"
          stroke="url(#cornerTreeBark)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M165,158 C185,140 210,138 230,144"
          stroke="url(#cornerTreeBark)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Branch B: Middle slender bough */}
        <path
          d="M80,240 C115,220 150,205 190,202 C225,200 255,212 280,225 C250,217 220,211 185,212 C150,214 115,228 80,240 Z"
          fill="url(#cornerTreeBark)"
        />
        {/* Branch B delicate twigs */}
        <path
          d="M185,212 C208,194 235,192 255,198"
          stroke="url(#cornerTreeBark)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Fairy Blossom Clusters along boughs */}
        {[
          { cx: 160, cy: 152, r: 12 },
          { cx: 215, cy: 145, r: 14 },
          { cx: 265, cy: 158, r: 13 },
          { cx: 145, cy: 210, r: 13 },
          { cx: 200, cy: 205, r: 14 },
          { cx: 245, cy: 218, r: 11 },
        ].map((blossom, idx) => (
          <g key={idx} className="animate-pulse" style={{ animationDuration: `${3.5 + (idx % 2)}s` }}>
            <circle cx={blossom.cx} cy={blossom.cy} r={blossom.r} fill="url(#fairyGlow)" />
            <circle cx={blossom.cx - 2} cy={blossom.cy - 2} r={1.2} fill="#FFFFFF" />
            <circle cx={blossom.cx + 3} cy={blossom.cy + 1} r={0.9} fill="#FEF08A" />
          </g>
        ))}

        {/* 4 REFINED HANGING LOVE SYMBOLS ON FAR-LEFT BRANCHES */}
        {hangingCharms.map((charm) => {
          const heartY = charm.y + charm.stringLen;

          return (
            <g
              key={charm.id}
              className="origin-top animate-cornerCharmSway"
              style={{
                transformOrigin: `${charm.x}px ${charm.y}px`,
                animationDelay: charm.delay,
              }}
            >
              {/* Thin Delicate Silver Thread */}
              <line
                x1={charm.x}
                y1={charm.y}
                x2={charm.x}
                y2={heartY}
                stroke="#E2E8F0"
                strokeWidth="0.9"
                strokeDasharray="2 2"
                opacity="0.65"
              />

              {/* Tiny Golden Anchor Ring */}
              <circle cx={charm.x} cy={charm.y} r="1.8" fill="#FBBF24" />

              {/* Hanging Love Symbol */}
              <g transform={`translate(${charm.x}, ${heartY})`}>
                {/* Subtle Glow Halo */}
                <circle
                  cx="0"
                  cy="0"
                  r={charm.size * 0.75}
                  fill={charm.glow}
                  opacity="0.25"
                  className="animate-ping"
                  style={{ animationDuration: '4s' }}
                />

                {/* Heart Shape */}
                <path
                  d="M0,-2 C-3,-9 -11,-9 -11,-2 C-11,4 0,11 0,11 C0,11 11,4 11,-2 C11,-9 3,-9 0,-2 Z"
                  fill={charm.color}
                  stroke="#FFFFFF"
                  strokeWidth="0.9"
                  filter="drop-shadow(0 0 6px rgba(244,114,182,0.75))"
                  transform={`scale(${charm.size / 18})`}
                />

                {/* Delicate Specular Highlight */}
                <path
                  d="M-3,-5 C-5,-5 -8,-3 -8,0"
                  stroke="#FFFFFF"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.85"
                  transform={`scale(${charm.size / 18})`}
                />

                {/* Tiny Star beneath heart */}
                <circle cx="0" cy={charm.size * 0.6} r="1.1" fill="#FEF08A" className="animate-pulse" />
              </g>
            </g>
          );
        })}
      </svg>

      {/* Very subtle falling sparkles strictly within corner bounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-amber-200 animate-cornerSparkleDrift"
            style={{
              top: `${25 + (i * 14)}%`,
              left: `${30 + (i * 12)}%`,
              width: `${(i % 2) + 2}px`,
              height: `${(i % 2) + 2}px`,
              opacity: 0.6,
              animationDuration: `${6 + i}s`,
              animationDelay: `${i * 1.2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes cornerCharmSway {
          0% {
            transform: rotate(-3.5deg);
          }
          100% {
            transform: rotate(3.5deg);
          }
        }
        @keyframes cornerSparkleDrift {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          25% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.4;
          }
          100% {
            transform: translate(40px, 90px);
            opacity: 0;
          }
        }
        .animate-cornerCharmSway {
          animation: cornerCharmSway 4.8s ease-in-out infinite alternate;
        }
        .animate-cornerSparkleDrift {
          animation: cornerSparkleDrift 7s linear infinite;
        }
      `}</style>
    </div>
  );
};
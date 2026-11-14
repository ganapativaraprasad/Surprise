import React from 'react';

export const Mountains: React.FC = () => {
  return (
    <div className="absolute inset-x-0 bottom-[38%] z-[5] pointer-events-none select-none">
      {/* Background Mountain Layer (Distant, soft bluish-indigo) */}
      <svg
        className="w-full h-32 sm:h-44 md:h-56 -mb-1"
        viewBox="0 0 1440 320"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,220 L120,160 L280,240 L420,130 L600,210 L780,110 L940,190 L1120,120 L1280,200 L1440,150 L1440,320 L0,320 Z"
          fill="#131B38"
          fillOpacity="0.85"
        />
      </svg>

      {/* Midground Mountain Layer (Atmospheric violet-slate) */}
      <svg
        className="w-full h-24 sm:h-36 md:h-44 -mt-16 sm:-mt-24 -mb-1"
        viewBox="0 0 1440 260"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,170 L180,100 L340,190 L520,90 L700,160 L860,80 L1040,150 L1220,95 L1440,160 L1440,260 L0,260 Z"
          fill="#0C132B"
          fillOpacity="0.95"
        />
      </svg>

      {/* Foreground Mountain Ridges & Shoreline Mist */}
      <div className="w-full h-8 bg-gradient-to-t from-[#0B1124] to-transparent opacity-90" />
    </div>
  );
};


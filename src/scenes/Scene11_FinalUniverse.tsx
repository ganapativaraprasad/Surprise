import React, { useState } from 'react';
import { CinematicUniverse3D } from '../components/finale/CinematicUniverse3D';
import { FinaleCinematicOverlay } from '../components/finale/FinaleCinematicOverlay';
import { TwentyTwoWishesModal } from '../components/finale/TwentyTwoWishesModal';
import { MagicalLoveTree } from '../components/finale/MagicalLoveTree';

interface Scene11Props {
  onPlayWaterDropSfx: () => void;
  onPlayStarCollectSfx: () => void;
  onReplayJourney: () => void;
  onSelectPhoto?: (photo: any) => void;
}

export const Scene11_FinalUniverse: React.FC<Scene11Props> = ({
  onPlayWaterDropSfx,
  onPlayStarCollectSfx,
  onReplayJourney,
}) => {
  const [isWishesOpen, setIsWishesOpen] = useState(false);

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-[#10182F] text-white select-none">
      {/* 1. Real 3D WebGL Three.js Scene: Moon, Reflecting Lake, Fireflies, and Constellation Morphing */}
      <CinematicUniverse3D
        onOpenWishes={() => setIsWishesOpen(true)}
        onPlayWaterDrop={onPlayWaterDropSfx}
        onPlayStarCollect={onPlayStarCollectSfx}
      />

      {/* 2. Magical Fantasy Tree with Hanging Love Charms swaying gracefully in the breeze */}
      <MagicalLoveTree />

      {/* 3. Controls & Birthday Typography Overlay */}
      <FinaleCinematicOverlay
        onOpenWishes={() => setIsWishesOpen(true)}
        onReplayJourney={onReplayJourney}
      />

      {/* 4. 22 Little Wishes Modal */}
      <TwentyTwoWishesModal
        isOpen={isWishesOpen}
        onClose={() => setIsWishesOpen(false)}
        onStarClickSfx={onPlayStarCollectSfx}
      />
    </div>
  );
};

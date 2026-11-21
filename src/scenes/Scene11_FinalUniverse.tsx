import { useCallback, useRef, useState } from 'react';
import { birthdayPhotos, BirthdayPhoto } from '../data/photos';
import { CinematicUniverse3D } from '../components/finale/CinematicUniverse3D';
import { FinaleCinematicOverlay } from '../components/finale/FinaleCinematicOverlay';
import { TwentyTwoWishesModal } from '../components/finale/TwentyTwoWishesModal';
import { MagicalLoveTree } from '../components/finale/MagicalLoveTree';

interface Scene11Props {
  onPlayWaterDropSfx: () => void;
  onPlayStarCollectSfx: () => void;
  onReplayJourney: () => void;
  onSelectPhoto: (photo: BirthdayPhoto) => void;
}

export default function Scene11_FinalUniverse({
  onPlayWaterDropSfx,
  onPlayStarCollectSfx,
  onReplayJourney,
  onSelectPhoto,
}: Scene11Props) {
  const [isWishesOpen, setIsWishesOpen] = useState(false);
  const openWishes = useCallback(() => setIsWishesOpen(true), []);
  const portrait = birthdayPhotos.finale;
  const constellationSlot = useRef<HTMLDivElement>(null);

  return (
    <div className="finale-page">
      {/* 1. Real 3D WebGL Three.js Scene: Moon, Reflecting Lake, Fireflies, and Constellation Morphing */}
      <CinematicUniverse3D
        constellationSlot={constellationSlot}
        onOpenWishes={openWishes}
        onPlayWaterDrop={onPlayWaterDropSfx}
        onPlayStarCollect={onPlayStarCollectSfx}
      />

      {/* 2. Magical Fantasy Tree with Hanging Love Charms swaying gracefully in the breeze */}
      <MagicalLoveTree />

      {/* 3. Controls & Birthday Typography Overlay */}
      <FinaleCinematicOverlay
        constellationSlot={constellationSlot}
        onOpenWishes={openWishes}
        onReplayJourney={onReplayJourney}
        portrait={portrait}
        onSelectPhoto={onSelectPhoto}
      />

      {/* 4. 22 Little Wishes Modal */}
      <TwentyTwoWishesModal
        isOpen={isWishesOpen}
        onClose={() => setIsWishesOpen(false)}
        onStarClickSfx={onPlayStarCollectSfx}
      />
    </div>
  );
}

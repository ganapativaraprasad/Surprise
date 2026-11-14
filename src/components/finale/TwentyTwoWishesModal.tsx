import React, { useState } from 'react';
import { twentyTwoWishes, LittleWish } from '../../data/wishes';
import { X, Sparkles } from 'lucide-react';

interface TwentyTwoWishesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStarClickSfx: () => void;
}

export const TwentyTwoWishesModal: React.FC<TwentyTwoWishesModalProps> = ({
  isOpen,
  onClose,
  onStarClickSfx,
}) => {
  const [selectedWish, setSelectedWish] = useState<LittleWish | null>(null);
  const [openedIds, setOpenedIds] = useState<number[]>([]);

  if (!isOpen) return null;

  const handleSelectWish = (wish: LittleWish) => {
    setSelectedWish(wish);
    if (!openedIds.includes(wish.id)) {
      setOpenedIds((prev) => [...prev, wish.id]);
    }
    onStarClickSfx();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#131A38] via-[#0E1428] to-[#080B17] rounded-3xl p-6 sm:p-8 border border-amber-300/30 shadow-[0_0_80px_rgba(167,139,250,0.3)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close 22 Wishes modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/30 text-amber-200 text-xs font-mono tracking-widest uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>22 YEARS • 22 BLESSINGS</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
            22 Little Wishes For Sabdha
          </h3>

          <p className="font-sans text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto">
            Each star holds a sincere wish for your 22nd year. Tap any star to unlock its blessing.
          </p>

          <div className="mt-2 text-xs font-mono text-amber-300/80">
            Discovered: {openedIds.length} / 22
          </div>
        </div>

        {/* Star Constellation Grid (22 Stars) */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 justify-items-center py-4">
          {twentyTwoWishes.map((wish) => {
            const isOpened = openedIds.includes(wish.id);
            const isCurrent = selectedWish?.id === wish.id;

            return (
              <button
                key={wish.id}
                onClick={() => handleSelectWish(wish)}
                title={`Wish #${wish.id}: ${wish.title}`}
                className={`relative group flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl transition-all duration-300 ${
                  isCurrent
                    ? 'bg-amber-400 text-slate-950 scale-110 shadow-[0_0_20px_rgba(254,240,138,0.8)]'
                    : isOpened
                    ? 'bg-violet-900/60 text-amber-200 border border-amber-300/40 hover:scale-105'
                    : 'bg-white/5 border border-white/15 text-slate-300 hover:border-amber-300/60 hover:scale-105 hover:bg-white/10'
                }`}
              >
                <span className="text-xs font-mono font-bold">#{wish.id}</span>
                <span className="text-[10px] leading-none mt-0.5 opacity-80">{wish.icon}</span>
              </button>
            );
          })}
        </div>

        {/* Active Selected Wish Card */}
        {selectedWish ? (
          <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-violet-950/70 via-slate-900/80 to-purple-950/70 border border-amber-300/40 shadow-xl text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full mx-auto bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-2xl mb-2">
              {selectedWish.icon}
            </div>

            <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest">
              Wish #{selectedWish.id} • {selectedWish.title}
            </span>

            <p className="mt-3 font-serif text-base sm:text-lg text-white font-medium leading-relaxed italic">
              "{selectedWish.wish}"
            </p>

            <button
              onClick={() => setSelectedWish(null)}
              className="mt-4 px-5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors"
            >
              Close & Pick Another
            </button>
          </div>
        ) : (
          <div className="mt-4 text-center text-xs text-slate-400 italic">
            Tap any of the 22 numbered stars above to read its wish
          </div>
        )}
      </div>
    </div>
  );
};

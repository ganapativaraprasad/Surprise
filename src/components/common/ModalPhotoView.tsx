import React, { useEffect, useCallback } from 'react';
import { X, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { BirthdayPhoto } from '../../data/photos';

interface ModalPhotoViewProps {
  photo: BirthdayPhoto | null;
  photoList?: BirthdayPhoto[];
  onClose: () => void;
  onSelectPhoto?: (photo: BirthdayPhoto) => void;
}

export const ModalPhotoView: React.FC<ModalPhotoViewProps> = ({
  photo,
  photoList = [],
  onClose,
  onSelectPhoto,
}) => {
  const currentIndex = photo && photoList.length > 0
    ? photoList.findIndex((p) => p.id === photo.id)
    : -1;

  const handleNext = useCallback(() => {
    if (currentIndex >= 0 && currentIndex < photoList.length - 1 && onSelectPhoto) {
      onSelectPhoto(photoList[currentIndex + 1]);
    } else if (currentIndex === photoList.length - 1 && onSelectPhoto && photoList.length > 0) {
      onSelectPhoto(photoList[0]); // Loop back to start
    }
  }, [currentIndex, photoList, onSelectPhoto]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0 && onSelectPhoto) {
      onSelectPhoto(photoList[currentIndex - 1]);
    } else if (currentIndex === 0 && onSelectPhoto && photoList.length > 0) {
      onSelectPhoto(photoList[photoList.length - 1]); // Loop to end
    }
  }, [currentIndex, photoList, onSelectPhoto]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    if (photo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [photo, onClose, handleNext, handlePrev]);

  if (!photo) return null;

  const isLandscape = photo.orientation === 'landscape';
  const hasMultiple = photoList.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      {/* Lightbox Modal Window */}
      <div
        className={`relative w-full ${
          isLandscape ? 'max-w-3xl' : 'max-w-md'
        } bg-white rounded-3xl shadow-2xl overflow-hidden border border-pink-100/50 p-4 sm:p-6 max-h-[92vh] flex flex-col transition-all`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {photo.tag && (
              <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">
                <Tag className="w-3 h-3" />
                {photo.tag}
              </span>
            )}
            {hasMultiple && (
              <span className="text-xs font-mono text-slate-500">
                {currentIndex + 1} of {photoList.length}
              </span>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close photo view"
            className="p-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Polaroid frame with true aspect-ratio preservation */}
        <div className="relative my-3 rounded-2xl overflow-hidden bg-slate-950/5 flex items-center justify-center max-h-[66vh] group">
          <img
            src={photo.src}
            alt={photo.alt}
            className="w-auto h-auto max-w-full max-h-[64vh] object-contain rounded-xl shadow-xs transition-opacity duration-300"
          />

          {/* Left Arrow Button */}
          {hasMultiple && (
            <button
              onClick={handlePrev}
              aria-label="Previous photograph"
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md transition-all shadow-lg hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Right Arrow Button */}
          {hasMultiple && (
            <button
              onClick={handleNext}
              aria-label="Next photograph"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-md transition-all shadow-lg hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Details & Captions */}
        <div className="mt-1 pt-1 text-center sm:text-left">
          <p className="font-serif text-base sm:text-lg font-medium text-slate-800 leading-snug">
            "{photo.caption}"
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Use ← → Arrow keys to browse</span>
            <span>{photo.width} × {photo.height}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

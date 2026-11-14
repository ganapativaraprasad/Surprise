import React, { useEffect } from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import { BirthdayPhoto } from '../../data/photos';

interface ModalPhotoViewProps {
  photo: BirthdayPhoto | null;
  onClose: () => void;
}

export const ModalPhotoView: React.FC<ModalPhotoViewProps> = ({ photo, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (photo) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [photo, onClose]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-pink-100/40 p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close photo view"
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Polaroid styled container */}
        <div className="relative rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner aspect-[4/5] sm:aspect-[4/5] flex items-center justify-center">
          <img
            src={photo.src}
            alt={photo.alt}
            onError={(e) => {
              if (photo.placeholderSrc && e.currentTarget.src !== photo.placeholderSrc) {
                e.currentTarget.src = photo.placeholderSrc;
              }
            }}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Details & Captions */}
        <div className="mt-4 pt-2">
          <div className="flex items-center justify-between gap-2 mb-2">
            {photo.tag && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">
                <Tag className="w-3 h-3" />
                {photo.tag}
              </span>
            )}
            {photo.year && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                <Calendar className="w-3 h-3" />
                {photo.year}
              </span>
            )}
          </div>

          <p className="font-serif text-lg font-medium text-slate-800 leading-snug">
            "{photo.caption}"
          </p>
        </div>
      </div>
    </div>
  );
};


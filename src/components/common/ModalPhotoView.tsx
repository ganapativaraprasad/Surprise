import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { BirthdayPhoto } from '../../data/photos';

interface ModalPhotoViewProps {
  photo: BirthdayPhoto | null;
  photoList?: BirthdayPhoto[];
  onClose: () => void;
  onSelectPhoto?: (photo: BirthdayPhoto) => void;
}

export function ModalPhotoView({ photo, photoList = [], onClose, onSelectPhoto }: ModalPhotoViewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStart = useRef<number | null>(null);
  const isOpen = photo !== null;
  const index = photoList.findIndex((item) => item.id === photo?.id);
  const canBrowse = index >= 0 && photoList.length > 1 && !!onSelectPhoto;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const browse = (step: number) => {
    if (!canBrowse) return;
    const size = photoList.length;
    onSelectPhoto?.(photoList[(index + step + size) % size]);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photograph viewer"
      className="photo-viewer"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (!canBrowse || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        browse(event.key === 'ArrowRight' ? 1 : -1);
      }}
    >
      {photo && (
        <div className="photo-viewer-frame">
          <header className="photo-viewer-bar">
            <div className="photo-viewer-meta">
              {photo.tag && <span>{photo.tag}</span>}
              {canBrowse && <span>{index + 1} / {photoList.length}</span>}
            </div>
            <button type="button" className="story-icon-button" onClick={onClose} aria-label="Close photo view" autoFocus>
              <X size={22} />
            </button>
          </header>
          <figure>
            <div
              className="photo-viewer-image"
              onTouchStart={(event) => {
                touchStart.current = event.touches.length === 1 ? event.touches[0].clientX : null;
              }}
              onTouchCancel={() => { touchStart.current = null; }}
              onTouchEnd={(event) => {
                if (touchStart.current === null) return;
                const distance = event.changedTouches[0].clientX - touchStart.current;
                touchStart.current = null;
                if (Math.abs(distance) > 48) browse(distance > 0 ? -1 : 1);
              }}
            >
              <img key={photo.id} src={photo.src} alt={photo.alt} />
            </div>
            <figcaption>
              <span aria-live="polite">“{photo.caption}”</span>
              {canBrowse && (
                <div>
                  <button type="button" className="story-icon-button" onClick={() => browse(-1)} aria-label="Previous photograph"><ChevronLeft size={22} /></button>
                  <button type="button" className="story-icon-button" onClick={() => browse(1)} aria-label="Next photograph"><ChevronRight size={22} /></button>
                </div>
              )}
            </figcaption>
          </figure>
        </div>
      )}
    </dialog>
  );
}

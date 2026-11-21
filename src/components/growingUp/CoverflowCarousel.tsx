import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, ZoomIn } from 'lucide-react';
import { BirthdayPhoto } from '../../data/photos';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CoverflowCarouselProps {
  photos: BirthdayPhoto[];
  milestoneMessages: string[];
  onSelectPhoto: (photo: BirthdayPhoto) => void;
  activeIndex: number;
  onActiveIndexChange: (index: number | ((prev: number) => number)) => void;
}

export function CoverflowCarousel({
  photos,
  milestoneMessages,
  onSelectPhoto,
  activeIndex,
  onActiveIndexChange,
}: CoverflowCarouselProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const reducedMotion = useReducedMotion();
  const thumbnailList = useRef<HTMLDivElement>(null);
  const touchStart = useRef<number | null>(null);
  const total = photos.length;
  const activePhoto = photos[activeIndex];
  const activeMessage = milestoneMessages[activeIndex % milestoneMessages.length];

  useEffect(() => {
    if (!isPlaying || total < 2) return;
    const timer = window.setInterval(() => {
      if (document.hidden || document.querySelector('dialog[open], [aria-modal="true"]')) return;
      onActiveIndexChange((index) => (index + 1) % total);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPlaying, total, onActiveIndexChange]);

  useEffect(() => {
    const list = thumbnailList.current;
    const active = list?.children[activeIndex] as HTMLElement | undefined;
    if (!list || !active) return;
    list.scrollTo({
      left: active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }, [activeIndex, reducedMotion]);

  if (!activePhoto) return null;

  const select = (index: number) => {
    setIsPlaying(false);
    onActiveIndexChange((index + total) % total);
  };

  const openPhoto = () => {
    setIsPlaying(false);
    onSelectPhoto(activePhoto);
  };

  return (
    <section
      className="milestone-album"
      aria-label="Growing up photo timeline"
      data-local-keys
      onKeyDown={(event) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        select(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
      }}
    >
      <div className="milestone-spread">
        <button
          type="button"
          className="milestone-print"
          onClick={openPhoto}
          aria-label={`Enlarge ${activePhoto.alt}`}
          onTouchStart={(event) => {
            touchStart.current = event.touches.length === 1 ? event.touches[0].clientX : null;
          }}
          onTouchCancel={() => { touchStart.current = null; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = event.changedTouches[0].clientX - touchStart.current;
            touchStart.current = null;
            if (Math.abs(distance) > 48) select(activeIndex + (distance > 0 ? -1 : 1));
          }}
        >
          <img key={activePhoto.id} src={activePhoto.src} alt={activePhoto.alt} />
          <ZoomIn size={20} aria-hidden="true" />
        </button>
        <div className="milestone-note">
          <p className="story-eyebrow">{activePhoto.tag} · {activeIndex + 1} / {total}</p>
          {activeMessage && <h3 key={activePhoto.id}>“{activeMessage}”</h3>}
          <p className="milestone-caption">{activePhoto.caption}</p>
          <div className="milestone-controls">
            <button type="button" className="story-icon-button" onClick={() => select(activeIndex - 1)} aria-label="Previous photo"><ChevronLeft size={20} /></button>
            <button type="button" className="story-icon-button" onClick={() => select(activeIndex + 1)} aria-label="Next photo"><ChevronRight size={20} /></button>
            <button type="button" className="milestone-play" onClick={() => setIsPlaying((playing) => !playing)}>
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
              {isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            </button>
          </div>
        </div>
      </div>
      <div className="milestone-thumbnails" ref={thumbnailList} aria-label="Choose a milestone">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => select(index)}
            aria-label={`Milestone ${index + 1}, ${photo.tag || photo.caption}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <img src={photo.src} alt="" loading="lazy" />
            <span>{index + 1}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

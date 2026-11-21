import { useEffect, useRef, useState } from 'react';
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { SceneMeta } from '../../hooks/useSceneNavigation';

interface ChapterIndicatorProps {
  currentScene: number;
  scenes: SceneMeta[];
  onSelectScene: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ChapterIndicator({
  currentScene,
  scenes,
  onSelectScene,
  onNext,
  onPrev,
}: ChapterIndicatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const lastScene = scenes.length - 1;

  useEffect(() => {
    if (!isOpen) return;
    activeRef.current?.focus();
    const dismissOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('pointerdown', dismissOutside);
    return () => document.removeEventListener('pointerdown', dismissOutside);
  }, [isOpen]);

  if (currentScene === 0) return null;

  return (
    <nav
      ref={navRef}
      className="chapter-dock"
      aria-label="Story chapters"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          setIsOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      {isOpen && (
        <ol id="chapter-list" className="chapter-list">
          {scenes.slice(1).map((scene) => (
            <li key={scene.id}>
              <button
                type="button"
                ref={scene.index === currentScene ? activeRef : undefined}
                aria-current={scene.index === currentScene ? 'step' : undefined}
                onClick={() => {
                  onSelectScene(scene.index);
                  setIsOpen(false);
                }}
              >
                <span>{String(scene.index).padStart(2, '0')}</span>
                {scene.title}
              </button>
            </li>
          ))}
        </ol>
      )}
      <div className="chapter-dock-controls">
        <button type="button" className="story-icon-button" disabled={currentScene === 1} onClick={onPrev} aria-label="Previous chapter">
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          className="chapter-toggle"
          ref={toggleRef}
          onClick={() => setIsOpen((open) => !open)}
          aria-label={`Chapters, ${scenes[currentScene].title}, ${currentScene} of ${lastScene}`}
          aria-expanded={isOpen}
          aria-controls={isOpen ? 'chapter-list' : undefined}
        >
          <BookOpen size={17} aria-hidden="true" />
          <span className="chapter-current">
            <strong>{scenes[currentScene].title}</strong>
            <small>{currentScene} / {lastScene}</small>
          </span>
          <ChevronDown size={15} aria-hidden="true" />
        </button>
        <button type="button" className="story-icon-button" disabled={currentScene === lastScene} onClick={onNext} aria-label="Next chapter">
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="chapter-progress" aria-hidden="true">
        <span style={{ width: `${currentScene / lastScene * 100}%` }} />
      </div>
    </nav>
  );
}

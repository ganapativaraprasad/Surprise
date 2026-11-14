import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SceneMeta } from '../../hooks/useSceneNavigation';

interface ChapterIndicatorProps {
  currentScene: number;
  scenes: SceneMeta[];
  onSelectScene: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
  worldMode: 'memory' | 'universe';
}

export const ChapterIndicator: React.FC<ChapterIndicatorProps> = ({
  currentScene,
  scenes,
  onSelectScene,
  onNext,
  onPrev,
  worldMode,
}) => {
  // Hide on initial invitation scene (Scene 0) to preserve mystery and pure opening aesthetic
  if (currentScene === 0) return null;

  const currentMeta = scenes[currentScene];
  const isDark = worldMode === 'universe';

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] w-auto">
      <nav aria-label="Story chapters" className="w-auto">
        <div
          className={`flex items-center gap-1.5 sm:gap-3 px-3 sm:px-4 py-2 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 ${
            isDark
              ? 'bg-slate-900/80 border border-slate-700/60 text-slate-200'
              : 'bg-white/80 border border-pink-200/60 text-slate-700'
          }`}
        >
          {/* Previous Button */}
          {currentScene > 1 && (
            <button
              onClick={onPrev}
              aria-label="Previous chapter"
              className={`p-1.5 rounded-full transition-all ${
                isDark ? 'hover:bg-slate-800 text-slate-300' : 'hover:bg-pink-100 text-slate-600'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {/* Chapter Dots */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-1">
            {scenes.map((scene) => {
              if (scene.index === 0) return null; // Skip invitation in dots
              const isActive = scene.index === currentScene;
              const isPast = scene.index < currentScene;

              return (
                <button
                  key={scene.id}
                  onClick={() => onSelectScene(scene.index)}
                  aria-label={`Jump to ${scene.title}`}
                  title={`${scene.tag}: ${scene.title}`}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? isDark
                        ? 'w-6 h-2 bg-gradient-to-r from-violet-400 to-amber-300'
                        : 'w-6 h-2 bg-gradient-to-r from-pink-400 to-purple-400'
                      : isPast
                      ? isDark
                        ? 'w-2 h-2 bg-violet-400/60 hover:bg-violet-300'
                        : 'w-2 h-2 bg-pink-300/80 hover:bg-pink-400'
                      : isDark
                      ? 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                      : 'w-2 h-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              );
            })}
          </div>

          {/* Tag & Title on Desktop / Tablet */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-medium pl-1 border-l border-slate-200 dark:border-slate-700">
            <span
              className={`font-semibold tracking-wider text-[10px] uppercase px-1.5 py-0.5 rounded ${
                isDark
                  ? 'bg-violet-900/60 text-violet-300'
                  : 'bg-pink-100 text-pink-700'
              }`}
            >
              {currentMeta.tag}
            </span>
            <span className="truncate max-w-[130px] opacity-90">{currentMeta.title}</span>
          </div>

          {/* Next Button */}
          {currentScene < scenes.length - 1 && (
            <button
              onClick={onNext}
              aria-label="Next chapter"
              className={`p-1.5 rounded-full transition-all ${
                isDark
                  ? 'hover:bg-slate-800 text-slate-300'
                  : 'hover:bg-pink-100 text-slate-600'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

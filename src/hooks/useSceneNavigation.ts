import { useState, useCallback, useEffect, useLayoutEffect } from 'react';

export interface SceneMeta {
  index: number;
  id: string;
  title: string;
  tag: string;
  world: 'memory' | 'universe';
}

export const SCENES: SceneMeta[] = [
  { index: 0, id: 'invitation', title: 'The Invitation', tag: 'START', world: 'memory' },
  { index: 1, id: 'welcome', title: 'Welcome Sabdha', tag: 'CELEBRATE', world: 'memory' },
  { index: 2, id: 'childhood', title: 'Little Sabdha', tag: 'CH 01', world: 'memory' },
  { index: 3, id: 'growing-up', title: 'Growing Up', tag: 'CH 02', world: 'memory' },
  { index: 4, id: 'family', title: 'Her Beautiful World', tag: 'CH 03', world: 'memory' },
  { index: 5, id: 'friends', title: 'Beautiful Memories', tag: 'CH 04', world: 'memory' },
  { index: 6, id: 'our-memories', title: 'Our Little World', tag: 'CH 05', world: 'memory' },
  { index: 7, id: 'special-moments', title: 'What Makes You You', tag: 'CH 06', world: 'memory' },
  { index: 8, id: 'letter', title: 'A Letter From Me', tag: 'CH 07', world: 'memory' },
  { index: 9, id: 'catch-stars', title: 'Catch The Stars', tag: 'CH 08', world: 'memory' },
  { index: 10, id: 'universe', title: 'The Magical Universe', tag: 'FINALE', world: 'universe' },
];

export const useSceneNavigation = (initialScene = 0) => {
  const [currentScene, setCurrentScene] = useState<number>(initialScene);

  const goToScene = useCallback((index: number) => {
    if (index >= 0 && index < SCENES.length) {
      setCurrentScene(index);
    }
  }, []);

  const nextScene = useCallback(() => {
    setCurrentScene((prev) => Math.min(prev + 1, SCENES.length - 1));
  }, []);

  const prevScene = useCallback(() => {
    setCurrentScene((prev) => Math.max(prev - 1, 1));
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (currentScene > 0) {
      document.getElementById('story-scene')?.focus({ preventScroll: true });
    }
  }, [currentScene]);

  // Keyboard navigation support: Left/Right arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (document.querySelector('dialog[open], [aria-modal="true"]')) return;
      if (e.target instanceof Element && e.target.closest(
        'input, textarea, select, button, [contenteditable], [role="button"], [data-local-keys]'
      )) return;

      if (e.key === 'ArrowRight' && currentScene < SCENES.length - 1) {
        // Only allow arrow navigation after invitation
        if (currentScene > 0) nextScene();
      } else if (e.key === 'ArrowLeft' && currentScene > 1) {
        prevScene();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScene, nextScene, prevScene]);

  const currentMeta = SCENES[currentScene];
  const isUniverseMode = currentMeta.world === 'universe';

  return {
    currentScene,
    currentMeta,
    scenes: SCENES,
    goToScene,
    nextScene,
    prevScene,
    isUniverseMode,
  };
};


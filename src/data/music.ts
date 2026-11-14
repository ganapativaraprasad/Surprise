export interface ChapterMusicConfig {
  sceneIndex: number;
  chapterId: string;
  title: string;
  audioSrc: string;
  loop: boolean;
  volume: number; // default volume between 0 and 1
}

// 1 Song specifically for each chapter
export const chapterMusicList: ChapterMusicConfig[] = [
  {
    sceneIndex: 0,
    chapterId: 'invitation',
    title: 'The Secret Invitation',
    audioSrc: '', // Silent until user opens surprise
    loop: false,
    volume: 0.6,
  },
  {
    sceneIndex: 1,
    chapterId: 'welcome',
    title: 'Welcome Sabdha',
    audioSrc: '/audio/ch-01.mp3', // Initial celebratory music
    loop: true,
    volume: 0.7,
  },
  {
    sceneIndex: 2,
    chapterId: 'childhood',
    title: 'Chapter 01: Little Sabdha',
    audioSrc: '/audio/ch-01.mp3', // CH-01
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 3,
    chapterId: 'growing-up',
    title: 'Chapter 02: Growing Up',
    audioSrc: '/audio/ch-02.mp3', // CH-02
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 4,
    chapterId: 'family',
    title: 'Chapter 03: Her Beautiful World',
    audioSrc: '/audio/ch-03.mp3', // CH-03
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 5,
    chapterId: 'friends',
    title: 'Chapter 04: Beautiful People',
    audioSrc: '/audio/ch-04.mp3', // CH-04
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 6,
    chapterId: 'our-memories',
    title: 'Chapter 05: Our Little World',
    audioSrc: '/audio/ch-05.mp3', // CH-05
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 7,
    chapterId: 'special-moments',
    title: 'Chapter 06: What Makes You, You',
    audioSrc: '/audio/ch-06.mp3', // CH-06
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 8,
    chapterId: 'letter',
    title: 'Chapter 07: A Letter From Me',
    audioSrc: '/audio/ch-07.mp3', // CH-07
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 9,
    chapterId: 'catch-stars',
    title: 'Chapter 08: Catch The Stars',
    audioSrc: '/audio/ch-08.mp3', // CH-08 (or user-provided mini-game track)
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 10,
    chapterId: 'universe',
    title: 'Chapter 09: The Magical Universe',
    audioSrc: '/audio/finale.mp3', // Final.mp3
    loop: true,
    volume: 0.8,
  },
];

export const getMusicForScene = (sceneIndex: number): ChapterMusicConfig => {
  const found = chapterMusicList.find((c) => c.sceneIndex === sceneIndex);
  return (
    found || {
      sceneIndex,
      chapterId: `chapter-${sceneIndex}`,
      title: `Chapter ${sceneIndex}`,
      audioSrc: `/audio/ch-${String(sceneIndex).padStart(2, '0')}.mp3`,
      loop: true,
      volume: 0.7,
    }
  );
};

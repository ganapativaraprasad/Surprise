export interface ChapterMusicConfig {
  sceneIndex: number;
  chapterId: string;
  title: string;
  audioSrc: string;
  loop: boolean;
  volume: number; // base volume between 0 and 1
}

// Centralized configuration for all chapter audio tracks
// Place your audio files into public/audio/ with these exact names
export const chapterMusicList: ChapterMusicConfig[] = [
  {
    sceneIndex: 0,
    chapterId: 'invitation',
    title: 'The Secret Invitation',
    audioSrc: '/audio/invitation.mp3',
    loop: true,
    volume: 0.65,
  },
  {
    sceneIndex: 1,
    chapterId: 'welcome',
    title: 'Happy Birthday Welcome',
    audioSrc: '/audio/welcome.mp3',
    loop: true,
    volume: 0.7,
  },
  {
    sceneIndex: 2,
    chapterId: 'childhood',
    title: 'Chapter 01: Little Sabdha',
    audioSrc: '/audio/ch-01.mp3', // Provided by user
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 3,
    chapterId: 'growing-up',
    title: 'Chapter 02: Growing Up',
    audioSrc: '/audio/ch-02.mp3',
    loop: true,
    volume: 0.7,
  },
  {
    sceneIndex: 4,
    chapterId: 'family',
    title: 'Chapter 03: Her Beautiful World',
    audioSrc: '/audio/ch-03.mp3',
    loop: true,
    volume: 0.7,
  },
  {
    sceneIndex: 5,
    chapterId: 'friends',
    title: 'Chapter 04: Beautiful People, Beautiful Memories',
    audioSrc: '/audio/ch-04.mp3',
    loop: true,
    volume: 0.7,
  },
  {
    sceneIndex: 6,
    chapterId: 'our-memories',
    title: 'Chapter 05: Our Little World',
    audioSrc: '/audio/ch-05.mp3',
    loop: true,
    volume: 0.75,
  },
  {
    sceneIndex: 7,
    chapterId: 'special-moments',
    title: 'Chapter 06: What Makes You, You',
    audioSrc: '/audio/ch-06.mp3',
    loop: true,
    volume: 0.7,
  },
  {
    sceneIndex: 8,
    chapterId: 'letter',
    title: 'Chapter 07: A Letter From Me',
    audioSrc: '/audio/ch-07.mp3',
    loop: true,
    volume: 0.7,
  },
  {
    sceneIndex: 9,
    chapterId: 'catch-stars',
    title: 'Chapter 08: Catch The Stars Mini-Game',
    audioSrc: '/audio/ch-08.mp3',
    loop: true,
    volume: 0.7,
  },
  {
    sceneIndex: 10,
    chapterId: 'universe',
    title: 'Chapter 09: The Magical Universe',
    audioSrc: '/audio/ch-09.mp3',
    loop: true,
    volume: 0.8,
  },
];

export const getMusicForScene = (sceneIndex: number): ChapterMusicConfig => {
  const found = chapterMusicList.find((c) => c.sceneIndex === sceneIndex);
  return (
    found || {
      sceneIndex,
      chapterId: 'default',
      title: `Chapter ${sceneIndex}`,
      audioSrc: `/audio/ch-${String(sceneIndex).padStart(2, '0')}.mp3`,
      loop: true,
      volume: 0.7,
    }
  );
};

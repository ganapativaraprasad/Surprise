import { useState, useRef, useCallback, useEffect } from 'react';
import { getMusicForScene, ChapterMusicConfig } from '../data/music';

// Short sound effects (Envelope whoosh, star collect chime, water ripple, universe burst)
// Uses simple Web Audio oscillators that auto-terminate in < 0.6 seconds. No background music.
class SoundEffectsPlayer {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.sfxGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(Math.max(0, Math.min(1, vol * 0.5)), this.ctx.currentTime);
    }
  }

  public playEnvelope() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.42);
  }

  public playStarCollect(index: number = 0) {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const baseFreqs = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    const freq = baseFreqs[Math.min(index, baseFreqs.length - 1)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.3);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.62);
  }

  public playWaterDrop() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(350, now + 0.15);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  public playUniverseBurst() {
    this.init();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const chords = [261.63, 329.63, 392.0, 523.25, 659.25];
    chords.forEach((f, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.05);
      gain.gain.setValueAtTime(0.001, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.05 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 1.8);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 1.9);
    });
  }
}

const sfx = new SoundEffectsPlayer();

// Global single Audio instance to guarantee only ONE track plays at any moment
let globalAudio: HTMLAudioElement | null = null;

const getGlobalAudio = (): HTMLAudioElement => {
  if (!globalAudio) {
    globalAudio = new Audio();
    globalAudio.preload = 'auto';
  }
  return globalAudio;
};

export const useAudio = (currentSceneIndex: number = 0) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [worldMode, setWorldMode] = useState<'memory' | 'universe'>('memory');
  const [currentTrackInfo, setCurrentTrackInfo] = useState<ChapterMusicConfig>(() =>
    getMusicForScene(currentSceneIndex)
  );

  const isUserPlayingRef = useRef(false);
  const activeSceneRef = useRef(currentSceneIndex);

  // Sync volume & mute to the single global audio instance
  const applyAudioSettings = useCallback(
    (trackVol: number = 0.75) => {
      const audio = getGlobalAudio();
      const effectiveVol = isMuted ? 0 : volume * trackVol;
      audio.volume = Math.max(0, Math.min(1, effectiveVol));
      audio.muted = isMuted;
      sfx.setVolume(isMuted ? 0 : volume);
    },
    [isMuted, volume]
  );

  // Switch to a new chapter's music: stops previous song, loads new song, and loops it
  const playChapterTrack = useCallback(
    (track: ChapterMusicConfig, shouldPlay: boolean) => {
      setCurrentTrackInfo(track);
      const audio = getGlobalAudio();

      // If no track for this chapter (e.g. empty string), pause and return
      if (!track.audioSrc) {
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        return;
      }

      applyAudioSettings(track.volume);

      // Check if this exact source is already playing
      const isSameSrc = audio.src && audio.src.endsWith(track.audioSrc);

      if (!isSameSrc) {
        // Stop previous chapter's song completely!
        audio.pause();
        audio.currentTime = 0;
        audio.src = track.audioSrc;
        audio.loop = track.loop ?? true;
      }

      if (shouldPlay) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            isUserPlayingRef.current = true;
          })
          .catch((err) => {
            console.warn('Playback prevented or file loading:', err);
            setIsPlaying(false);
          });
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    },
    [applyAudioSettings]
  );

  // When chapter changes:
  useEffect(() => {
    activeSceneRef.current = currentSceneIndex;
    const track = getMusicForScene(currentSceneIndex);

    // If user has started music playback, automatically switch and play the new chapter's song
    const shouldPlay = isUserPlayingRef.current;
    playChapterTrack(track, shouldPlay);
  }, [currentSceneIndex, playChapterTrack]);

  // Sync native audio events to state
  useEffect(() => {
    const audio = getGlobalAudio();

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onError = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
    };
  }, []);

  // Play / Pause Toggle
  const togglePlay = useCallback(() => {
    const audio = getGlobalAudio();
    const track = getMusicForScene(activeSceneRef.current);

    if (isPlaying) {
      // Pause immediately
      audio.pause();
      isUserPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      // Start playing this chapter's song
      isUserPlayingRef.current = true;
      playChapterTrack(track, true);
    }
  }, [isPlaying, playChapterTrack]);

  // Explicit start music helper (e.g. on opening the surprise)
  const startMusic = useCallback(() => {
    isUserPlayingRef.current = true;
    const track = getMusicForScene(activeSceneRef.current);
    if (track.audioSrc) {
      playChapterTrack(track, true);
    }
  }, [playChapterTrack]);

  // Mute / Unmute Toggle
  const toggleMute = useCallback(() => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    const audio = getGlobalAudio();
    audio.muted = nextMuted;
    if (nextMuted) {
      audio.volume = 0;
      sfx.setVolume(0);
    } else {
      const track = getMusicForScene(activeSceneRef.current);
      audio.volume = volume * (track.volume || 0.75);
      sfx.setVolume(volume);
    }
  }, [isMuted, volume]);

  // Volume Slider Change
  const setVolume = useCallback(
    (val: number) => {
      setVolumeState(val);
      const audio = getGlobalAudio();
      if (!isMuted) {
        const track = getMusicForScene(activeSceneRef.current);
        audio.volume = val * (track.volume || 0.75);
        sfx.setVolume(val);
      }
    },
    [isMuted]
  );

  const switchMode = useCallback((mode: 'memory' | 'universe') => {
    setWorldMode(mode);
  }, []);

  return {
    isPlaying,
    isMuted,
    volume,
    worldMode,
    currentTrackInfo,
    togglePlay,
    startMusic,
    toggleMute,
    setVolume,
    switchMode,
    playEnvelope: useCallback(() => sfx.playEnvelope(), []),
    playStarCollect: useCallback((i: number) => sfx.playStarCollect(i), []),
    playWaterDrop: useCallback(() => sfx.playWaterDrop(), []),
    playUniverseBurst: useCallback(() => sfx.playUniverseBurst(), []),
  };
};

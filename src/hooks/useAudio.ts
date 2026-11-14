import { useState, useRef, useCallback, useEffect } from 'react';
import { getMusicForScene, ChapterMusicConfig } from '../data/music';

// Web Audio API Procedural Synth for SFX and Fallback Ambient Music
class DreamAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingSynth = false;
  private masterGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private synthGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentMode: 'memory' | 'universe' = 'memory';
  private currentStep = 0;

  private memoryNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  private universeNotes = [130.81, 196.00, 246.94, 261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99];

  public initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.synthGain = this.ctx.createGain();
      this.synthGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.synthGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMode(mode: 'memory' | 'universe') {
    this.currentMode = mode;
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime, 0.05);
    }
  }

  public startSynth() {
    this.initContext();
    if (this.isPlayingSynth) return;
    this.isPlayingSynth = true;

    const playStep = () => {
      if (!this.isPlayingSynth || !this.ctx || !this.synthGain) return;

      const now = this.ctx.currentTime;
      const notes = this.currentMode === 'memory' ? this.memoryNotes : this.universeNotes;
      const freq = notes[Math.floor(Math.random() * notes.length)];

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = this.currentMode === 'memory' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + (this.currentMode === 'memory' ? 1.8 : 2.8));

      osc.connect(noteGain);
      noteGain.connect(this.synthGain);

      osc.start(now);
      osc.stop(now + 3.0);

      if (this.currentStep % 4 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(this.currentMode === 'memory' ? 130.81 : 98.00, now);
        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.exponentialRampToValueAtTime(0.1, now + 0.3);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
        bassOsc.connect(bassGain);
        bassGain.connect(this.synthGain);
        bassOsc.start(now);
        bassOsc.stop(now + 3.6);
      }

      this.currentStep++;
      const nextDelay = this.currentMode === 'memory' ? 450 + Math.random() * 200 : 600 + Math.random() * 400;
      this.timerId = window.setTimeout(playStep, nextDelay);
    };

    playStep();
  }

  public stopSynth() {
    this.isPlayingSynth = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public playEnvelope() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.45);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.52);
  }

  public playStarCollect(index: number = 0) {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const baseFreqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    const freq = baseFreqs[Math.min(index, baseFreqs.length - 1)];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.35);
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.72);
  }

  public playWaterDrop() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.18);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  public playUniverseBurst() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const chords = [261.63, 329.63, 392.00, 523.25, 659.25, 1046.50];
    chords.forEach((f, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.06);
      gain.gain.setValueAtTime(0.001, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.06 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 2.2);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 2.3);
    });
  }
}

const sfxEngine = new DreamAudioEngine();

export const useAudio = (currentSceneIndex: number = 0) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [worldMode, setWorldMode] = useState<'memory' | 'universe'>('memory');
  const [currentTrackInfo, setCurrentTrackInfo] = useState<ChapterMusicConfig>(() =>
    getMusicForScene(currentSceneIndex)
  );

  const activeAudioRef = useRef<HTMLAudioElement | null>(null);
  const userInitiatedRef = useRef(false);
  const fadeIntervalRef = useRef<number | null>(null);

  // Smoothly crossfade from old audio element to new audio element
  const transitionToTrack = useCallback(
    (track: ChapterMusicConfig, shouldPlay: boolean) => {
      setCurrentTrackInfo(track);

      // Stop any existing fade
      if (fadeIntervalRef.current) {
        window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }

      const prevAudio = activeAudioRef.current;

      // Create new audio element for this chapter
      const newAudio = new Audio(track.audioSrc);
      newAudio.loop = track.loop ?? true;
      const targetVolume = isMuted ? 0 : volume * track.volume;
      newAudio.volume = shouldPlay ? 0 : targetVolume;

      // When audio ends or errors (e.g. file not added yet), fallback gracefully to synth
      newAudio.onerror = () => {
        if (userInitiatedRef.current && isPlaying) {
          sfxEngine.startSynth();
        }
      };

      if (shouldPlay) {
        newAudio
          .play()
          .then(() => {
            // Succeeded playing track file! Stop synth if it was running
            sfxEngine.stopSynth();

            // Fade in new audio
            let cur = 0;
            const step = targetVolume / 15;
            fadeIntervalRef.current = window.setInterval(() => {
              cur = Math.min(targetVolume, cur + step);
              if (newAudio) newAudio.volume = cur;
              if (cur >= targetVolume) {
                if (fadeIntervalRef.current) {
                  window.clearInterval(fadeIntervalRef.current);
                  fadeIntervalRef.current = null;
                }
              }
            }, 30);
          })
          .catch(() => {
            // Browser autoplay policy or missing file -> fallback to procedural melody
            if (userInitiatedRef.current) {
              sfxEngine.startSynth();
            }
          });
      }

      // Fade out previous audio
      if (prevAudio) {
        let prevVol = prevAudio.volume;
        const fadeOut = window.setInterval(() => {
          prevVol = Math.max(0, prevVol - 0.1);
          prevAudio.volume = prevVol;
          if (prevVol <= 0) {
            window.clearInterval(fadeOut);
            prevAudio.pause();
            prevAudio.currentTime = 0;
            prevAudio.src = '';
          }
        }, 30);
      }

      activeAudioRef.current = newAudio;
    },
    [isMuted, volume, isPlaying]
  );

  // Whenever currentSceneIndex changes (user moves to a new chapter):
  useEffect(() => {
    const nextTrack = getMusicForScene(currentSceneIndex);
    const shouldPlay = isPlaying || userInitiatedRef.current;
    transitionToTrack(nextTrack, shouldPlay);
  }, [currentSceneIndex, transitionToTrack]);

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    userInitiatedRef.current = true;
    sfxEngine.initContext();

    if (isPlaying) {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
      }
      sfxEngine.stopSynth();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const track = getMusicForScene(currentSceneIndex);
      if (activeAudioRef.current && activeAudioRef.current.src.includes(track.audioSrc)) {
        activeAudioRef.current
          .play()
          .then(() => sfxEngine.stopSynth())
          .catch(() => sfxEngine.startSynth());
      } else {
        transitionToTrack(track, true);
      }
    }
  }, [isPlaying, currentSceneIndex, transitionToTrack]);

  // Handle Mute/Unmute
  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      if (activeAudioRef.current) {
        activeAudioRef.current.volume = volume * currentTrackInfo.volume;
      }
      sfxEngine.setVolume(volume);
    } else {
      setIsMuted(true);
      if (activeAudioRef.current) {
        activeAudioRef.current.volume = 0;
      }
      sfxEngine.setVolume(0);
    }
  }, [isMuted, volume, currentTrackInfo]);

  // Handle Volume change
  const setVolume = useCallback(
    (val: number) => {
      setVolumeState(val);
      if (!isMuted) {
        if (activeAudioRef.current) {
          activeAudioRef.current.volume = val * currentTrackInfo.volume;
        }
        sfxEngine.setVolume(val);
      }
    },
    [isMuted, currentTrackInfo]
  );

  // Switch world mode
  const switchMode = useCallback((mode: 'memory' | 'universe') => {
    setWorldMode(mode);
    sfxEngine.setMode(mode);
  }, []);

  const playEnvelope = useCallback(() => sfxEngine.playEnvelope(), []);
  const playStarCollect = useCallback((index: number) => sfxEngine.playStarCollect(index), []);
  const playWaterDrop = useCallback(() => sfxEngine.playWaterDrop(), []);
  const playUniverseBurst = useCallback(() => sfxEngine.playUniverseBurst(), []);

  return {
    isPlaying,
    isMuted,
    volume,
    worldMode,
    currentTrackInfo,
    togglePlay,
    toggleMute,
    setVolume,
    switchMode,
    playEnvelope,
    playStarCollect,
    playWaterDrop,
    playUniverseBurst,
  };
};

import { useState, useRef, useCallback } from 'react';

// Web Audio API Procedural Dreamy Music & Sound FX Synthesizer
// Guarantees soothing audio works instantly in any browser without needing external audio downloads!
class DreamAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingBgm = false;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentMode: 'memory' | 'universe' = 'memory';
  private currentStep = 0;

  // Pentatonic scales for soothing melodic arpeggios
  // Memory World: Warm F-Major / D-Minor pentatonic (F, G, A, C, D)
  private memoryNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
  // Universe: Ethereal celestial notes (C, E, G, B, D, E)
  private universeNotes = [130.81, 196.00, 246.94, 261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);

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

  public startBGM() {
    this.initContext();
    if (this.isPlayingBgm) return;
    this.isPlayingBgm = true;

    const playNextMelodyStep = () => {
      if (!this.isPlayingBgm || !this.ctx || !this.bgmGain) return;

      const now = this.ctx.currentTime;
      const notes = this.currentMode === 'memory' ? this.memoryNotes : this.universeNotes;
      
      // Select note from scale with harmonic chord progression
      const noteIndex = Math.floor(Math.random() * notes.length);
      const freq = notes[noteIndex];

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Soft sine / warm triangle bell wave
      osc.type = this.currentMode === 'memory' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Music box / celestial harp envelope
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + (this.currentMode === 'memory' ? 1.8 : 2.8));

      osc.connect(noteGain);
      noteGain.connect(this.bgmGain);

      osc.start(now);
      osc.stop(now + 3.0);

      // Play soft bass pad every 4 steps
      if (this.currentStep % 4 === 0) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(this.currentMode === 'memory' ? 130.81 : 98.00, now);
        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.exponentialRampToValueAtTime(0.12, now + 0.3);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
        bassOsc.connect(bassGain);
        bassGain.connect(this.bgmGain);
        bassOsc.start(now);
        bassOsc.stop(now + 3.6);
      }

      this.currentStep++;
      const nextDelay = this.currentMode === 'memory' ? 450 + Math.random() * 200 : 600 + Math.random() * 400;
      this.timerId = window.setTimeout(playNextMelodyStep, nextDelay);
    };

    playNextMelodyStep();
  }

  public stopBGM() {
    this.isPlayingBgm = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  // SFX: Envelope open
  public playEnvelope() {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    
    // Whoosh / paper flutter sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.45);
    
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.52);
  }

  // SFX: Star collect chime
  public playStarCollect(index: number = 0) {
    this.initContext();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    
    // Rising crystal chime chord
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

  // SFX: Water drop / ripple
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

  // SFX: Magical universe unlock burst
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

// Global audio singleton
const audioEngine = new DreamAudioEngine();

export const useAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.7);
  const [worldMode, setWorldMode] = useState<'memory' | 'universe'>('memory');
  const userInitiated = useRef(false);

  const togglePlay = useCallback(() => {
    userInitiated.current = true;
    if (isPlaying) {
      audioEngine.stopBGM();
      setIsPlaying(false);
    } else {
      audioEngine.startBGM();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      audioEngine.setVolume(volume);
      setIsMuted(false);
    } else {
      audioEngine.setVolume(0);
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const setVolume = useCallback((val: number) => {
    setVolumeState(val);
    if (!isMuted) {
      audioEngine.setVolume(val);
    }
  }, [isMuted]);

  const switchMode = useCallback((mode: 'memory' | 'universe') => {
    setWorldMode(mode);
    audioEngine.setMode(mode);
  }, []);

  const playEnvelope = useCallback(() => audioEngine.playEnvelope(), []);
  const playStarCollect = useCallback((index: number) => audioEngine.playStarCollect(index), []);
  const playWaterDrop = useCallback(() => audioEngine.playWaterDrop(), []);
  const playUniverseBurst = useCallback(() => audioEngine.playUniverseBurst(), []);

  return {
    isPlaying,
    isMuted,
    volume,
    worldMode,
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

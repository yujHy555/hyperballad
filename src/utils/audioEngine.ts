// Web Audio API Synthesizers for Jazz Drumming & Generative Beat Construction Matrix

class JazzAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private bpm: number = 132;
  private currentStep: number = 0;
  private masterGain: GainNode | null = null;
  public onBeatCallback: ((step: number, bpm: number) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.25;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic jazz ride cymbal (metallic chime + sustained wash)
  private playRideCymbal(accent: boolean = false, velocity: number = 0.7) {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    const freqs = [312, 545, 678, 892, 1240, 1820, 2430, 4850, 7200];
    const cymbalGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = accent ? 4500 : 5500;

    cymbalGain.gain.setValueAtTime((accent ? 0.45 : 0.25) * velocity, t);
    cymbalGain.gain.exponentialRampToValueAtTime(0.001, t + (accent ? 0.9 : 0.5));

    freqs.forEach(f => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(f, t);
      osc.connect(filter);
      osc.start(t);
      osc.stop(t + (accent ? 0.9 : 0.5));
    });

    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 8500;
    noiseFilter.Q.value = 1.2;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime((accent ? 0.35 : 0.18) * velocity, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + (accent ? 0.7 : 0.4));

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(cymbalGain);
    noise.start(t);
    noise.stop(t + (accent ? 0.7 : 0.4));

    filter.connect(cymbalGain);
    cymbalGain.connect(this.masterGain);
  }

  // Soft wire brush snare stir / tap
  private playBrushSnare(accent: boolean = false) {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * (accent ? 0.25 : 0.15);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = accent ? 2200 : 3400;
    filter.Q.value = 0.8;

    const brushGain = this.ctx.createGain();
    brushGain.gain.setValueAtTime(accent ? 0.25 : 0.1, t);
    brushGain.gain.exponentialRampToValueAtTime(0.0001, t + (accent ? 0.25 : 0.15));

    noise.connect(filter);
    filter.connect(brushGain);
    brushGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + (accent ? 0.25 : 0.15));
  }

  // Warm acoustic jazz kick (soft felt beater)
  private playJazzKick() {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const kickGain = this.ctx.createGain();

    osc.frequency.setValueAtTime(85, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.15);

    kickGain.gain.setValueAtTime(0.3, t);
    kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(kickGain);
    kickGain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.28);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initContext();
    this.isPlaying = true;
    this.currentStep = 0;

    const stepDurationMs = (60 / this.bpm / 3) * 1000;

    this.intervalId = window.setInterval(() => {
      const stepInMeasure = this.currentStep % 12;

      if (stepInMeasure === 0) {
        this.playRideCymbal(true, 0.9);
        this.playJazzKick();
      } else if (stepInMeasure === 3) {
        this.playRideCymbal(false, 0.6);
        this.playBrushSnare(false);
      } else if (stepInMeasure === 5) {
        this.playRideCymbal(false, 0.75);
      } else if (stepInMeasure === 6) {
        this.playRideCymbal(true, 0.85);
      } else if (stepInMeasure === 9) {
        this.playRideCymbal(false, 0.65);
        this.playBrushSnare(true);
      } else if (stepInMeasure === 11) {
        this.playRideCymbal(false, 0.8);
      }

      if (this.onBeatCallback) {
        this.onBeatCallback(stepInMeasure, this.bpm);
      }

      this.currentStep++;
    }, stepDurationMs);
  }

  public stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    // Mute any ongoing tail immediately
    if (this.ctx && this.masterGain) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(0, t);
      setTimeout(() => {
        if (this.masterGain) {
          this.masterGain.gain.setValueAtTime(0.25, this.ctx!.currentTime);
        }
      }, 50);
    }
    this.isPlaying = false;
  }

  public setVolume(vol: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, vol));
    }
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.max(60, Math.min(220, newBpm));
    if (this.isPlaying) {
      this.stop();
      this.start();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

// -------------------------------------------------------------
// Interactive Beat Construction Matrix Synthesizer & Sequencer
// -------------------------------------------------------------
export interface MatrixTrackData {
  name: string;
  steps: boolean[];
  color: string;
  muted?: boolean;
}

class BeatMatrixAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private activeVoices: { stop?: (t: number) => void }[] = [];

  // Lookahead scheduler properties
  private nextNoteTime: number = 0;
  private currentStep: number = 0;
  private timerId: number | null = null;
  private tracks: MatrixTrackData[] = [];
  private bpm: number = 134;
  private swingAmount: number = 61; // 50 (straight) to 75 (heavy swing)
  private onStepCallback: ((step: number) => void) | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.35;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- Voice Synthesis Methods ---

  // Track 0: Ride Cymbal / Bell Accent (High Metallic Shimmer)
  public playRide(time?: number, velocity: number = 0.8) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time !== undefined ? time : this.ctx.currentTime;

    const freqs = [320, 540, 685, 890, 1260, 1850, 2400, 4800, 7400];
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 4800;

    gainNode.gain.setValueAtTime(0.3 * velocity, t);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

    freqs.forEach(f => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'square';
      osc.frequency.setValueAtTime(f, t);
      osc.connect(filter);
      osc.start(t);
      osc.stop(t + 0.65);
    });

    // Metallic wash noise
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.4);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const nFilter = this.ctx.createBiquadFilter();
    nFilter.type = 'bandpass';
    nFilter.frequency.value = 9000;
    nFilter.Q.value = 1.5;

    const nGain = this.ctx.createGain();
    nGain.gain.setValueAtTime(0.22 * velocity, t);
    nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);

    noise.connect(nFilter);
    nFilter.connect(nGain);
    nGain.connect(gainNode);
    noise.start(t);
    noise.stop(t + 0.5);

    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
  }

  // Track 1: Snare / Rimshot / Brush Tap (Acoustic Shell Body + Crisp Wires)
  public playSnare(time?: number, velocity: number = 0.75) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time !== undefined ? time : this.ctx.currentTime;

    // Shell tone (warm drum body)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(195, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.08);

    oscGain.gain.setValueAtTime(0.35 * velocity, t);
    oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    osc.connect(oscGain);
    oscGain.connect(this.masterGain);
    osc.start(t);
    osc.stop(t + 0.1);

    // Snare wire sizzle (pink-filtered noise)
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.2);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2600;
    filter.Q.value = 0.9;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.38 * velocity, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start(t);
    noise.stop(t + 0.18);
  }

  // Track 2: Kick / Sub Felt Bass (Low Pitch Sweep + Organic Transient)
  public playKick(time?: number, velocity: number = 0.9) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time !== undefined ? time : this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const kickGain = this.ctx.createGain();

    osc.frequency.setValueAtTime(110, t);
    osc.frequency.exponentialRampToValueAtTime(44, t + 0.09);

    kickGain.gain.setValueAtTime(0.48 * velocity, t);
    kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.26);

    osc.connect(kickGain);
    kickGain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.26);
  }

  // Track 3: Hi-Hat / Pedal Chick / Flower Tambourine (Tight Crisp Chime)
  public playHiHat(time?: number, velocity: number = 0.7) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    const t = time !== undefined ? time : this.ctx.currentTime;

    const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 8200;

    const hatGain = this.ctx.createGain();
    hatGain.gain.setValueAtTime(0.25 * velocity, t);
    hatGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.07);

    noise.connect(filter);
    filter.connect(hatGain);
    hatGain.connect(this.masterGain);

    noise.start(t);
    noise.stop(t + 0.07);
  }

  // Audition voice by track index
  public triggerVoice(trackIndex: number) {
    switch (trackIndex) {
      case 0:
        this.playRide();
        break;
      case 1:
        this.playSnare();
        break;
      case 2:
        this.playKick();
        break;
      case 3:
        this.playHiHat();
        break;
    }
  }

  // --- Sequencer Clock & Scheduling Loop ---

  public start(
    tracks: MatrixTrackData[],
    bpm: number,
    swing: number,
    onStep: (step: number) => void
  ) {
    this.init();
    this.tracks = tracks;
    this.bpm = bpm;
    this.swingAmount = swing;
    this.onStepCallback = onStep;

    if (this.isRunning) {
      this.stop();
    }

    this.isRunning = true;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx!.currentTime + 0.05;

    // Start lookahead scheduler (runs every 25ms)
    this.scheduler();
  }

  private scheduler = () => {
    if (!this.isRunning || !this.ctx) return;

    // Schedule any notes that fall within the next 100ms window
    while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
      this.scheduleStep(this.currentStep, this.nextNoteTime);
      this.advanceStep();
    }

    this.timerId = window.setTimeout(this.scheduler, 25);
  };

  private scheduleStep(step: number, time: number) {
    // Notify visual UI when sound actually lands
    const delayMs = Math.max(0, (time - this.ctx!.currentTime) * 1000);
    setTimeout(() => {
      if (this.isRunning && this.onStepCallback) {
        this.onStepCallback(step);
      }
    }, delayMs);

    // Play active steps for each track
    this.tracks.forEach((track, trkIdx) => {
      if (track.muted) return;
      if (track.steps[step]) {
        switch (trkIdx) {
          case 0:
            this.playRide(time, step % 4 === 0 ? 0.95 : 0.7);
            break;
          case 1:
            this.playSnare(time, step % 8 === 4 ? 0.9 : 0.65);
            break;
          case 2:
            this.playKick(time, step === 0 ? 1.0 : 0.85);
            break;
          case 3:
            this.playHiHat(time, step % 2 === 0 ? 0.75 : 0.55);
            break;
        }
      }
    });
  }

  private advanceStep() {
    // 16th-note step base duration
    const secondsPerBeat = 60.0 / this.bpm;
    const stepDuration = 0.25 * secondsPerBeat;

    // Authentic swing timing adjustment:
    // Even steps (0, 2, 4...) are elongated; odd steps (1, 3, 5...) are compressed
    const swingFactor = (this.swingAmount - 50) / 100; // 0 (no swing) to 0.25 (heavy swing)
    const isEven = this.currentStep % 2 === 0;
    const stepLen = isEven
      ? stepDuration * (1 + swingFactor * 0.7)
      : stepDuration * (1 - swingFactor * 0.7);

    this.nextNoteTime += stepLen;
    this.currentStep = (this.currentStep + 1) % 16;
  }

  public updateTracks(newTracks: MatrixTrackData[]) {
    this.tracks = newTracks;
  }

  public updateBpm(newBpm: number) {
    this.bpm = Math.max(50, Math.min(220, newBpm));
  }

  public updateSwing(newSwing: number) {
    this.swingAmount = Math.max(50, Math.min(75, newSwing));
  }

  public stop() {
    this.isRunning = false;

    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    // Instantly silence all voices
    if (this.ctx && this.masterGain) {
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.setValueAtTime(0, t);

      // Restore volume for the next audition or start
      setTimeout(() => {
        if (this.ctx && this.masterGain) {
          this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        }
      }, 30);
    }
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}

export const jazzAudio = new JazzAudioEngine();
export const beatMatrixAudio = new BeatMatrixAudioEngine();

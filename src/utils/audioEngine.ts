// Web Audio API Synthesizer for Jazz Drumming (Ride Cymbal Swing & Brush Snare)
class JazzAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private bpm: number = 132;
  private currentStep: number = 0;
  private gainNode: GainNode | null = null;
  public onBeatCallback: ((step: number, bpm: number) => void) | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.25;
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Realistic jazz ride cymbal (metallic chime + sustained wash)
  private playRideCymbal(accent: boolean = false, velocity: number = 0.7) {
    if (!this.ctx || !this.gainNode) return;
    const t = this.ctx.currentTime;

    // Metallic square wave cluster for cymbal bell/wash
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

    // High frequency white noise wash
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
    cymbalGain.connect(this.gainNode);
  }

  // Soft wire brush snare stir / tap
  private playBrushSnare(accent: boolean = false) {
    if (!this.ctx || !this.gainNode) return;
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
    brushGain.connect(this.gainNode);

    noise.start(t);
    noise.stop(t + (accent ? 0.25 : 0.15));
  }

  // Warm acoustic jazz kick (soft felt beater)
  private playJazzKick() {
    if (!this.ctx || !this.gainNode) return;
    const t = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const kickGain = this.ctx.createGain();

    osc.frequency.setValueAtTime(85, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.15);

    kickGain.gain.setValueAtTime(0.3, t);
    kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

    osc.connect(kickGain);
    kickGain.connect(this.gainNode);

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

    // Swing rhythm: 12-pulse triplet division for authentic jazz swing feel
    // Beat 1: Ride (accent)
    // Beat 2: Hi-hat pedal "chick", Ride
    // Beat 2-triplet-3: Ride skip ("da-ding")
    // Beat 3: Ride
    // Beat 4: Hi-hat pedal, Ride skip
    const stepDurationMs = (60 / this.bpm / 3) * 1000;

    this.intervalId = window.setInterval(() => {
      const stepInMeasure = this.currentStep % 12;

      // Jazz swing pattern on 12-subdivision grid (3 triplets per beat x 4 beats)
      // Step 0 (Beat 1.1): Ride accent + soft kick
      if (stepInMeasure === 0) {
        this.playRideCymbal(true, 0.9);
        this.playJazzKick();
      }
      // Step 3 (Beat 2.1): Ride + brush tap
      else if (stepInMeasure === 3) {
        this.playRideCymbal(false, 0.6);
        this.playBrushSnare(false);
      }
      // Step 5 (Beat 2.3 - the swing skip): Ride skip
      else if (stepInMeasure === 5) {
        this.playRideCymbal(false, 0.75);
      }
      // Step 6 (Beat 3.1): Ride accent
      else if (stepInMeasure === 6) {
        this.playRideCymbal(true, 0.85);
      }
      // Step 9 (Beat 4.1): Ride + brush accent
      else if (stepInMeasure === 9) {
        this.playRideCymbal(false, 0.65);
        this.playBrushSnare(true);
      }
      // Step 11 (Beat 4.3 - pickup skip into beat 1)
      else if (stepInMeasure === 11) {
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
    this.isPlaying = false;
  }

  public setVolume(vol: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, vol));
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

export const jazzAudio = new JazzAudioEngine();

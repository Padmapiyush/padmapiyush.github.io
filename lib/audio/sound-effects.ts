// Web Audio API Synthesizer for TeamForge
// Generates responsive, zero-asset audio effects without missing file errors

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  private initCtx() {
    if (!this.enabled) return null;
    if (typeof window === "undefined") return null;

    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Play a gentle UI click
  public playClick() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore audio failure
    }
  }

  // Card Reveal: Mystical ascending chime
  public playCardReveal() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99]; // C major pentatonic
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.4);
      });
    } catch {
      // Ignore audio failure
    }
  }

  // Bid Placed: Bright golden coin chime
  public playBid() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
      osc1.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.12); // E6

      osc2.frequency.setValueAtTime(1318.51, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(1975.53, ctx.currentTime + 0.14); // B6

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.25);
      osc2.stop(ctx.currentTime + 0.25);
    } catch {
      // Ignore audio failure
    }
  }

  // Pass: Soft muted whoosh
  public playPass() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // Ignore audio failure
    }
  }

  // Gavel / Auction Hammer: Deep impact strike
  public playGavel() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      // Low thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.23);

      // High resonance ring
      const ring = ctx.createOscillator();
      const ringGain = ctx.createGain();
      ring.type = "triangle";
      ring.frequency.setValueAtTime(540, ctx.currentTime);
      ringGain.gain.setValueAtTime(0.15, ctx.currentTime);
      ringGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      ring.connect(ringGain);
      ringGain.connect(ctx.destination);

      ring.start();
      ring.stop(ctx.currentTime + 0.45);
    } catch {
      // Ignore audio failure
    }
  }

  // Winner Fanfare: Majestic chord progression
  public playVictory() {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const chords = [
        { freqs: [392, 493.88, 587.33], time: 0, dur: 0.25 }, // G
        { freqs: [440, 554.37, 659.25], time: 0.26, dur: 0.25 }, // A
        { freqs: [523.25, 659.25, 783.99, 1046.5], time: 0.52, dur: 0.8 }, // C High
      ];

      chords.forEach(({ freqs, time, dur }) => {
        freqs.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

          gain.gain.setValueAtTime(0, ctx.currentTime + time);
          gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + time + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + dur);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + time);
          osc.stop(ctx.currentTime + time + dur);
        });
      });
    } catch {
      // Ignore audio failure
    }
  }
}

export const soundManager = new SoundEffectsManager();

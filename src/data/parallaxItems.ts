import { ParallaxMediaItem } from '../types';

export const INITIAL_PARALLAX_ITEMS: ParallaxMediaItem[] = [
  // SECTION 0: HERO — Nature & Sacred Mathematics
  {
    id: 'hero-back-fibonacci',
    type: 'html',
    layer: 'back',
    sectionIndex: 0,
    title: 'Logarithmic Fibonacci Spiral (φ = 1.618)',
    position: { xPercent: 72, yPercent: 20, scale: 1.25, zIndex: 1 }
  },
  {
    id: 'hero-front-cymbal',
    type: 'html',
    layer: 'front',
    sectionIndex: 0,
    title: '22" Resonant Bronze with Phyllotaxis Lathe',
    position: { xPercent: 88, yPercent: 62, scale: 1.1, zIndex: 30 }
  },

  // SECTION 1: SESSION WORK & RECORDING — Chladni Sound Geometry
  {
    id: 'session-back-chladni',
    type: 'html',
    layer: 'back',
    sectionIndex: 1,
    title: 'Chladni Nodal Sound Geometry Plate',
    position: { xPercent: 26, yPercent: 22, scale: 1.15, zIndex: 1 }
  },
  {
    id: 'session-front-sticks',
    type: 'html',
    layer: 'front',
    sectionIndex: 1,
    title: 'Michigan Maple & Botanical Grain Venation',
    position: { xPercent: 78, yPercent: 70, scale: 1.15, zIndex: 30 }
  },

  // SECTION 2: PERFORMANCE — Natural Wave Harmonics & Live Stage Video
  {
    id: 'perf-back-waves',
    type: 'html',
    layer: 'back',
    sectionIndex: 2,
    title: 'Fibonacci Harmonic Standing Waves',
    position: { xPercent: 32, yPercent: 18, scale: 1.3, zIndex: 1 }
  },
  {
    id: 'perf-front-cymbal-bloom',
    type: 'html',
    layer: 'front',
    sectionIndex: 2,
    title: 'Geometric Bronze Blossom Splash',
    position: { xPercent: 82, yPercent: 28, scale: 1.2, zIndex: 30 }
  },
  {
    id: 'perf-front-live-video',
    type: 'video',
    layer: 'front',
    src: '/videos/hb_05_1.mp4',
    sectionIndex: 2,
    title: 'Live Stage Capture // Take 05',
    position: { xPercent: 88, yPercent: 72, scale: 0.85, zIndex: 35 }
  },

  // SECTION 3: BEAT CONSTRUCTION — Euclidean Geometry & Golden Angle
  {
    id: 'beat-back-euclidean',
    type: 'html',
    layer: 'back',
    sectionIndex: 3,
    title: 'Flower of Life & Euclidean Matrix E(5, 12)',
    position: { xPercent: 22, yPercent: 25, scale: 1.1, zIndex: 1 }
  },
  {
    id: 'beat-front-golden-angle',
    type: 'html',
    layer: 'front',
    sectionIndex: 3,
    title: 'Golden Angle 137.5° Micro-Timing Node',
    position: { xPercent: 75, yPercent: 68, scale: 1.1, zIndex: 30 }
  },

  // SECTION 4: OUTRO — Sacred Geometry Seal
  {
    id: 'outro-back-monogram',
    type: 'html',
    layer: 'back',
    sectionIndex: 4,
    title: 'Vesica Piscis Harmonic Monogram',
    position: { xPercent: 55, yPercent: 22, scale: 1.35, zIndex: 1 }
  }
];

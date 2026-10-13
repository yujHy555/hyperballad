export type ParallaxLayerType = 'back' | 'middle' | 'front';

export interface ParallaxMediaItem {
  id: string;
  type: 'image' | 'video' | 'html';
  layer: ParallaxLayerType;
  src?: string; // URL or path to .png or .webm
  alt?: string;
  title?: string;
  sectionIndex: number; // 0: Hero, 1: Session, 2: Performance, 3: Beat Construction, 4: Outro
  position: {
    xPercent: number; // 0 to 100 within section
    yPercent: number; // 0 to 100 vertical
    scale?: number;
    zIndex?: number;
    rotation?: number; // degrees
  };
  customClass?: string;
}

export interface CameraSettings {
  fov: number; // 25 to 85 (focal length equivalent)
  aperture: number; // 1.2 to 16.0 (controls DoF blur radius)
  focalPlane: 'front' | 'middle' | 'back' | 'all';
  focusDistance: number; // normalized 0 (front) to 1 (back)
  dofEnabled: boolean;
  smoothing: number; // 0.02 (super smooth glide) to 0.15 (crisp)
  mouseParallaxFactor: number; // 0 to 1.5
  parallaxSpread: number; // multiplier for depth difference between layers (0.5 to 2.5)
  dollyZ: number; // camera distance (300 to 1200)
}

export interface SectionInfo {
  id: string;
  title: string;
  subtitle: string;
  categoryNumber?: string;
  bpm?: number;
  timeSignature?: string;
}

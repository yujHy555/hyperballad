import React from 'react';
import { ParallaxMediaItem } from '../types';

interface ParallaxItemRendererProps {
  item: ParallaxMediaItem;
  layer: 'front' | 'middle' | 'back';
}

export const ParallaxItemRenderer: React.FC<ParallaxItemRendererProps> = ({ item }) => {
  // If user has provided a custom image or transparent PNG
  if (item.type === 'image' && item.src) {
    return (
      <div className="relative group">
        <img
          src={item.src}
          alt={item.alt || item.title}
          className="max-w-[320px] md:max-w-[420px] h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(213,0,50,0.2)] transition-transform duration-500 group-hover:scale-105"
        />
        {item.title && (
          <div className="absolute -bottom-5 left-0 text-[10px] uppercase font-mono tracking-widest text-[#A50034] bg-white/90 px-2 py-0.5 rounded border border-[#D50032]/25 backdrop-blur">
            {item.title}
          </div>
        )}
      </div>
    );
  }

  // If user has provided a transparent WebM video
  if (item.type === 'video' && item.src) {
    const isMp4 = item.src.endsWith('.mp4');
    return (
      <div className="relative group">
        <video
          src={item.src}
          autoPlay
          loop
          muted
          playsInline
          className={`max-w-[340px] md:max-w-[460px] h-auto ${
            isMp4
              ? 'rounded-2xl border border-[#D50032]/30 shadow-lg object-cover'
              : 'object-contain filter drop-shadow-[0_15px_35px_rgba(213,0,50,0.25)]'
          }`}
        />
        {item.title && (
          <div className="absolute -bottom-5 left-0 text-[10px] uppercase font-mono tracking-widest text-[#A50034] bg-white/90 px-2 py-0.5 rounded border border-[#D50032]/25 backdrop-blur">
            {item.title}
          </div>
        )}
      </div>
    );
  }

  // Pure Fine-Line Geometric Artwork (No Solid Shapes, No Icons in Artwork)
  switch (item.id) {
    // HERO — Golden Ratio Spiral & Fibonacci Nautilus (Back layer)
    case 'hero-back-fibonacci':
      return (
        <div className="relative w-72 h-72 rounded-2xl border border-[#D50032]/15 flex items-center justify-center p-5 bg-white/40 backdrop-blur-xs select-none">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Fibonacci rectangles in delicate thin line */}
            <rect x="20" y="20" width="100" height="100" fill="none" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.3" />
            <rect x="120" y="20" width="60" height="60" fill="none" stroke="#A50034" strokeWidth="0.7" strokeOpacity="0.25" />
            <rect x="120" y="80" width="40" height="40" fill="none" stroke="#FFB3BA" strokeWidth="0.7" strokeOpacity="0.4" />
            <rect x="100" y="95" width="20" height="25" fill="none" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.3" />

            {/* Nautilus Golden Spiral Path */}
            <path
              d="M 20,120 A 100,100 0 0,1 120,20 A 60,60 0 0,1 180,80 A 40,40 0 0,1 140,120 A 25,25 0 0,1 115,95"
              fill="none"
              stroke="#D50032"
              strokeWidth="1.2"
              strokeDasharray="4 2"
              strokeOpacity="0.85"
            />

            {/* Concentric Golden Radii Lines */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="#D50032" strokeWidth="0.6" strokeOpacity="0.2" />
            <circle cx="100" cy="100" r="52.5" fill="none" stroke="#A50034" strokeWidth="0.6" strokeOpacity="0.25" />
            <circle cx="100" cy="100" r="32.5" fill="none" stroke="#FFB3BA" strokeWidth="0.6" strokeOpacity="0.4" />
          </svg>

          <div className="absolute bottom-2.5 left-4 text-[9px] font-mono tracking-widest text-[#A50034] uppercase">
            <span>GOLDEN SPIRAL // φ = 1.618</span>
          </div>
        </div>
      );

    // HERO — Fine-Line Sacred Cymbal & Phyllotaxis Lathe (Foreground, Pure Thin Linework)
    case 'hero-front-cymbal':
      return (
        <div className="relative w-64 h-64 select-none transform hover:scale-105 transition-transform duration-700">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Concentric Fine Lathe Lines (Zero solid disc fills) */}
            <circle cx="100" cy="100" r="94" fill="none" stroke="#D50032" strokeWidth="1.0" strokeOpacity="0.45" />
            <circle cx="100" cy="100" r="86" fill="none" stroke="#A50034" strokeWidth="0.65" strokeOpacity="0.35" strokeDasharray="3 2" />
            <circle cx="100" cy="100" r="76" fill="none" stroke="#D50032" strokeWidth="0.6" strokeOpacity="0.3" />
            <circle cx="100" cy="100" r="64" fill="none" stroke="#FFB3BA" strokeWidth="0.8" strokeOpacity="0.5" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#A50034" strokeWidth="0.6" strokeOpacity="0.3" />
            <circle cx="100" cy="100" r="34" fill="none" stroke="#D50032" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="100" cy="100" r="18" fill="none" stroke="#A50034" strokeWidth="0.9" strokeOpacity="0.6" />
            <circle cx="100" cy="100" r="6" fill="none" stroke="#D50032" strokeWidth="1.1" />

            {/* Radial Phyllotaxis Line Rays at Golden Angles */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="100"
                y1="10"
                x2="100"
                y2="24"
                stroke="#D50032"
                strokeWidth="0.7"
                strokeOpacity="0.5"
                transform={`rotate(${deg} 100 100)`}
              />
            ))}

            {/* Inscribed Sacred Triangles / Harmonic Lattice Lines */}
            <polygon
              points="100,18 171,141 29,141"
              fill="none"
              stroke="#D50032"
              strokeWidth="0.65"
              strokeOpacity="0.25"
            />
            <polygon
              points="100,182 29,59 171,59"
              fill="none"
              stroke="#A50034"
              strokeWidth="0.65"
              strokeOpacity="0.25"
            />
          </svg>

          <div className="absolute -bottom-5 right-0 text-[9px] font-mono tracking-widest text-[#A50034] uppercase bg-white/90 px-2.5 py-0.5 rounded border border-[#D50032]/20">
            22" Acoustic Lathe Lines
          </div>
        </div>
      );

    // SESSION — Chladni Sound Frequency Nodal Plate (Back layer)
    case 'session-back-chladni':
      return (
        <div className="w-72 p-4 rounded-2xl border border-[#D50032]/15 bg-white/50 backdrop-blur-xs select-none">
          <div className="text-[10px] font-mono text-[#A50034] tracking-widest uppercase mb-1">
            Chladni Nodal Sound Patterns
          </div>

          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.3" />
              <ellipse cx="50" cy="50" rx="38" ry="16" fill="none" stroke="#D50032" strokeWidth="0.8" strokeOpacity="0.5" />
              <ellipse cx="50" cy="50" rx="16" ry="38" fill="none" stroke="#D50032" strokeWidth="0.8" strokeOpacity="0.5" />
              <ellipse cx="50" cy="50" rx="34" ry="34" fill="none" stroke="#A50034" strokeWidth="0.65" strokeDasharray="3 2" strokeOpacity="0.4" />
              {[0, 45, 90, 135].map((rot) => (
                <line
                  key={rot}
                  x1="50"
                  y1="6"
                  x2="50"
                  y2="94"
                  stroke="#FFB3BA"
                  strokeWidth="0.65"
                  strokeOpacity="0.6"
                  transform={`rotate(${rot} 50 50)`}
                />
              ))}
              <circle cx="50" cy="50" r="3.5" fill="none" stroke="#D50032" strokeWidth="1" />
            </svg>
          </div>

          <div className="mt-1 text-[9px] font-mono text-[#7A6E74] flex justify-between border-t border-[#D50032]/10 pt-1.5">
            <span>Acoustic Cymatics</span>
            <span className="text-[#D50032]">432 Hz Nodal Harmonics</span>
          </div>
        </div>
      );

    // SESSION — Fine-Line Acoustic Axis Sticks (Foreground, Pure Thin Linework)
    case 'session-front-sticks':
      return (
        <div className="relative w-64 h-24 select-none">
          <svg className="w-full h-full" viewBox="0 0 240 90">
            {/* Stick 1 Fine Wireframe Contour */}
            <g transform="rotate(-12 120 45)">
              <line x1="10" y1="30" x2="210" y2="30" stroke="#D50032" strokeWidth="1.2" strokeOpacity="0.6" />
              <line x1="10" y1="36" x2="210" y2="36" stroke="#A50034" strokeWidth="0.7" strokeOpacity="0.4" />
              <circle cx="218" cy="33" r="5" fill="none" stroke="#D50032" strokeWidth="1" />
              {/* Fine grain hatch lines */}
              <line x1="40" y1="30" x2="50" y2="36" stroke="#FFB3BA" strokeWidth="0.5" strokeOpacity="0.6" />
              <line x1="80" y1="30" x2="90" y2="36" stroke="#FFB3BA" strokeWidth="0.5" strokeOpacity="0.6" />
              <line x1="130" y1="30" x2="140" y2="36" stroke="#FFB3BA" strokeWidth="0.5" strokeOpacity="0.6" />
            </g>

            {/* Stick 2 Fine Wireframe Contour */}
            <g transform="rotate(10 120 55)">
              <line x1="20" y1="55" x2="220" y2="55" stroke="#A50034" strokeWidth="1.1" strokeOpacity="0.55" />
              <line x1="20" y1="61" x2="220" y2="61" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.35" />
              <circle cx="228" cy="58" r="5" fill="none" stroke="#A50034" strokeWidth="1" />
            </g>
          </svg>

          <div className="absolute -bottom-2 left-4 text-[9px] font-mono tracking-widest text-[#A50034] uppercase bg-white/90 px-2.5 py-0.5 rounded border border-[#D50032]/20">
            Linear Strike Vectors
          </div>
        </div>
      );

    // PERFORMANCE — Fibonacci Harmonic Wave Rings (Back layer)
    case 'perf-back-waves':
      return (
        <div className="relative w-72 h-72 flex items-center justify-center select-none">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="92" fill="none" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.2" />
            <circle cx="100" cy="100" r="76" fill="none" stroke="#A50034" strokeWidth="0.7" strokeOpacity="0.3" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="58" fill="none" stroke="#D50032" strokeWidth="0.75" strokeOpacity="0.35" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="#FFB3BA" strokeWidth="0.8" strokeOpacity="0.45" />
            <circle cx="100" cy="100" r="24" fill="none" stroke="#D50032" strokeWidth="0.9" strokeOpacity="0.6" />
          </svg>
          <div className="absolute text-center">
            <span className="text-[11px] font-mono text-[#D50032] font-bold tracking-wider block">1, 1, 2, 3, 5, 8</span>
            <span className="text-[8px] font-mono text-[#7A6E74] uppercase">Harmonic Wave Progression</span>
          </div>
        </div>
      );

    // PERFORMANCE — Fine-Line Geometric Blossom Lattice (Foreground, Pure Thin Linework)
    case 'perf-front-cymbal-bloom':
      return (
        <div className="relative w-60 h-60 select-none group">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#D50032" strokeWidth="0.75" strokeOpacity="0.35" />
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <ellipse
                key={deg}
                cx="50"
                cy="50"
                rx="42"
                ry="15"
                fill="none"
                stroke={deg % 60 === 0 ? '#D50032' : '#FFB3BA'}
                strokeWidth="0.7"
                strokeOpacity="0.55"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="14" fill="none" stroke="#A50034" strokeWidth="0.75" strokeDasharray="2 2" strokeOpacity="0.5" />
            <circle cx="50" cy="50" r="3.5" fill="none" stroke="#D50032" strokeWidth="1" />
          </svg>

          <div className="absolute -bottom-4 left-2 text-[9px] font-mono tracking-widest text-[#A50034] uppercase bg-white/90 px-2.5 py-0.5 rounded border border-[#D50032]/20">
            Geometric Bloom Lattice
          </div>
        </div>
      );

    // BEAT CONSTRUCTION — Euclidean Rhythm Matrix Lines (Back layer)
    case 'beat-back-euclidean':
      return (
        <div className="w-72 p-4 rounded-2xl border border-[#D50032]/15 bg-white/50 backdrop-blur-xs select-none">
          <div className="text-[10px] font-mono text-[#A50034] mb-1.5 uppercase tracking-widest flex justify-between font-semibold">
            <span>Euclidean Algorithm</span>
            <span className="text-[#D50032] font-bold">E(5, 12) ∩ E(7, 16)</span>
          </div>
          <div className="relative w-42 h-42 mx-auto flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.25" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <circle
                  key={deg}
                  cx={50 + 22 * Math.cos((deg * Math.PI) / 180)}
                  cy={50 + 22 * Math.sin((deg * Math.PI) / 180)}
                  r="22"
                  fill="none"
                  stroke="#FFB3BA"
                  strokeWidth="0.65"
                  strokeOpacity="0.6"
                />
              ))}
              <polygon
                points="50,6 91.8,36.4 75.8,85.6 24.2,85.6 8.2,36.4"
                fill="none"
                stroke="#D50032"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />
            </svg>
          </div>
        </div>
      );

    // BEAT CONSTRUCTION — Golden Angle 137.5° Compass Lines (Foreground, Pure Thin Linework)
    case 'beat-front-golden-angle':
      return (
        <div className="p-3 rounded-xl border border-[#D50032]/20 bg-white/90 backdrop-blur-xs select-none">
          <div className="text-[9px] font-mono text-[#A50034] tracking-widest uppercase font-semibold mb-1">
            Golden Angle θ
          </div>
          <div className="flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#D50032" strokeWidth="0.75" strokeOpacity="0.35" />
              <line x1="20" y1="20" x2="20" y2="2" stroke="#D50032" strokeWidth="1" />
              <line x1="20" y1="20" x2="35" y2="30" stroke="#A50034" strokeWidth="1" />
              <path d="M 20,10 A 10,10 0 0,1 27,24" fill="none" stroke="#FFB3BA" strokeWidth="1" strokeDasharray="2 1" />
            </svg>
            <div>
              <div className="text-xl font-bold font-mono text-[#18070F] tracking-wider leading-none">137.5077°</div>
              <div className="text-[9px] font-mono text-[#7A6E74] mt-0.5">-18.4ms Botanical Drag</div>
            </div>
          </div>
        </div>
      );

    // OUTRO — Sacred Vesica Piscis Monogram (Back layer)
    case 'outro-back-monogram':
      return (
        <div className="w-68 h-68 rounded-full border border-[#D50032]/20 flex items-center justify-center select-none bg-radial from-[#FFB3BA]/15 to-transparent">
          <div className="relative w-full h-full flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="38" cy="50" r="30" fill="none" stroke="#FFB3BA" strokeWidth="0.7" strokeOpacity="0.6" />
              <circle cx="62" cy="50" r="30" fill="none" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.4" />
            </svg>
            <div className="text-center z-10">
              <div className="text-5xl font-['Instrument_Serif'] italic text-[#18070F]">
                HB
              </div>
              <div className="text-[9px] font-mono tracking-[0.3em] text-[#A50034] uppercase mt-1 font-semibold">
                NATURE • PATTERNS • RHYTHM
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-3 rounded-lg border border-[#D50032]/20 bg-white/80 text-xs font-mono text-[#A50034]">
          {item.title || 'Parallax Asset'}
        </div>
      );
  }
};

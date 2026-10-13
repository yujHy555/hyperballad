import React from 'react';
import { ParallaxMediaItem } from '../types';

interface ParallaxItemRendererProps {
  item: ParallaxMediaItem;
  layer: 'front' | 'middle' | 'back';
}

export const ParallaxItemRenderer: React.FC<ParallaxItemRendererProps> = ({ item, layer }) => {
  // If user has provided a custom image or transparent PNG
  if (item.type === 'image' && item.src) {
    return (
      <div className="relative group">
        <img
          src={item.src}
          alt={item.alt || item.title}
          className="max-w-[320px] md:max-w-[420px] h-auto object-contain drop-shadow-[0_20px_45px_rgba(213,0,50,0.25)] filter transition-transform duration-500 group-hover:scale-105"
        />
        {item.title && (
          <div className="absolute -bottom-6 left-0 text-[10px] uppercase font-mono tracking-widest text-[#A50034] bg-white/95 px-2.5 py-0.5 rounded border border-[#D50032]/30 backdrop-blur shadow-sm">
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
              ? 'rounded-2xl border border-[#D50032]/30 shadow-[0_20px_45px_rgba(213,0,50,0.3)] object-cover'
              : 'object-contain filter drop-shadow-[0_20px_45px_rgba(213,0,50,0.3)]'
          }`}
        />
        {item.title && (
          <div className="absolute -bottom-6 left-0 text-[10px] uppercase font-mono tracking-widest text-[#A50034] bg-white/95 px-2.5 py-0.5 rounded border border-[#D50032]/30 backdrop-blur shadow-sm">
            {item.title} {isMp4 ? '(Live Video)' : '(WebM Alpha)'}
          </div>
        )}
      </div>
    );
  }

  // Fine-Line Geometric & Pattern Vector Artwork
  switch (item.id) {
    // HERO — Golden Ratio Spiral & Fibonacci Nautilus (Back layer)
    case 'hero-back-fibonacci':
      return (
        <div className="relative w-72 h-72 rounded-2xl border border-[#D50032]/20 flex items-center justify-center p-5 bg-white/60 backdrop-blur-xs select-none shadow-xs">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Fibonacci fine-line rectangles */}
            <rect x="20" y="20" width="100" height="100" fill="none" stroke="rgba(213, 0, 50, 0.35)" strokeWidth="0.8" />
            <rect x="120" y="20" width="60" height="60" fill="none" stroke="rgba(165, 0, 52, 0.3)" strokeWidth="0.8" />
            <rect x="120" y="80" width="40" height="40" fill="none" stroke="rgba(255, 179, 186, 0.5)" strokeWidth="0.8" />
            <rect x="100" y="95" width="20" height="25" fill="none" stroke="rgba(213, 0, 50, 0.4)" strokeWidth="0.8" />

            {/* Nautilus Golden Spiral Path */}
            <path
              d="M 20,120 A 100,100 0 0,1 120,20 A 60,60 0 0,1 180,80 A 40,40 0 0,1 140,120 A 25,25 0 0,1 115,95"
              fill="none"
              stroke="#D50032"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />

            {/* Concentric Golden Radii Lines */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(213, 0, 50, 0.25)" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="52.5" fill="none" stroke="rgba(165, 0, 52, 0.3)" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="32.5" fill="none" stroke="rgba(255, 179, 186, 0.5)" strokeWidth="0.8" />
          </svg>

          <div className="absolute bottom-2.5 left-4 text-[9px] font-mono tracking-widest text-[#A50034] uppercase flex items-center gap-2">
            <span>GOLDEN SPIRAL</span>
            <span className="text-black/20">|</span>
            <span className="text-[#D50032] font-bold">φ = 1.6180339</span>
          </div>
        </div>
      );

    // HERO — Fine-Line Sacred Geometry Astrolabe & Orbital Lattice (Front layer, zero solid discs)
    case 'hero-front-cymbal':
      return (
        <div className="relative w-64 h-64 select-none transform hover:scale-105 transition-transform duration-700">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Concentric fine boundary lines */}
            <circle cx="100" cy="100" r="92" fill="none" stroke="#D50032" strokeWidth="1.2" strokeOpacity="0.4" />
            <circle cx="100" cy="100" r="84" fill="none" stroke="#A50034" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.5" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#D50032" strokeWidth="0.8" strokeOpacity="0.35" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="#FFB3BA" strokeWidth="1" strokeOpacity="0.6" />
            <circle cx="100" cy="100" r="28" fill="none" stroke="#D50032" strokeWidth="0.8" strokeOpacity="0.5" />
            <circle cx="100" cy="100" r="10" fill="none" stroke="#A50034" strokeWidth="1.2" />

            {/* Radial Geometric Spokes (Golden Angle Ticks) */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="100"
                y1="8"
                x2="100"
                y2="22"
                stroke="#D50032"
                strokeWidth="0.8"
                strokeOpacity="0.6"
                transform={`rotate(${deg} 100 100)`}
              />
            ))}

            {/* Inscribed Fine Golden Triangles / Hexagram Lattice */}
            <polygon
              points="100,16 172.7,142 27.3,142"
              fill="none"
              stroke="#D50032"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
            <polygon
              points="100,184 27.3,58 172.7,58"
              fill="none"
              stroke="#A50034"
              strokeWidth="0.8"
              strokeOpacity="0.3"
            />
          </svg>

          <div className="absolute -bottom-6 right-0 text-[10px] font-mono tracking-widest text-[#A50034] uppercase bg-white/90 px-3 py-1 rounded-full border border-[#D50032]/30 shadow-xs">
            Front // Geometric Line Lattice
          </div>
        </div>
      );

    // SESSION — Chladni Sound Geometry Nodal Plate (Back layer)
    case 'session-back-chladni':
      return (
        <div className="w-76 p-4 rounded-2xl border border-[#D50032]/20 bg-white/80 backdrop-blur-md select-none shadow-xs">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono text-[#A50034] tracking-widest uppercase font-semibold">
              Chladni Nodal Sound Patterns
            </span>
            <span className="w-2 h-2 rounded-full bg-[#D50032] animate-ping" />
          </div>

          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(213, 0, 50, 0.3)" strokeWidth="0.8" />
              <ellipse cx="50" cy="50" rx="38" ry="16" fill="none" stroke="#D50032" strokeWidth="1" opacity="0.6" />
              <ellipse cx="50" cy="50" rx="16" ry="38" fill="none" stroke="#D50032" strokeWidth="1" opacity="0.6" />
              <ellipse cx="50" cy="50" rx="34" ry="34" fill="none" stroke="#A50034" strokeWidth="0.8" strokeDasharray="3 2" />
              {[0, 45, 90, 135].map((rot) => (
                <line
                  key={rot}
                  x1="50"
                  y1="6"
                  x2="50"
                  y2="94"
                  stroke="rgba(255, 179, 186, 0.7)"
                  strokeWidth="0.8"
                  transform={`rotate(${rot} 50 50)`}
                />
              ))}
              <circle cx="50" cy="50" r="4" fill="#D50032" opacity="0.8" />
            </svg>
            <div className="absolute text-[8px] font-mono text-[#A50034] uppercase bg-white/90 px-1.5 py-0.5 rounded border border-[#D50032]/20">
              f = 432 Hz • m=4, n=4
            </div>
          </div>

          <div className="mt-2 text-[10px] font-mono text-[#7A6E74] flex justify-between border-t border-[#D50032]/15 pt-1.5">
            <span>Acoustic Cymatics</span>
            <span className="text-[#D50032]">Harmonic Frequency Rings</span>
          </div>
        </div>
      );

    // SESSION — Fine-Line Acoustic Axis Sticks (Front layer)
    case 'session-front-sticks':
      return (
        <div className="relative w-68 h-28 select-none">
          {/* Stick 1 fine linear contour */}
          <div className="absolute top-4 left-0 w-64 h-1.5 bg-[#D50032]/80 rounded-full rotate-[-15deg] shadow-xs">
            <div className="absolute right-0 -top-1 w-3.5 h-3.5 rounded-full bg-white border border-[#D50032]" />
          </div>

          {/* Stick 2 fine linear contour */}
          <div className="absolute top-14 left-4 w-64 h-1.5 bg-[#A50034]/70 rounded-full rotate-[13deg] shadow-xs">
            <div className="absolute right-0 -top-1 w-3.5 h-3.5 rounded-full bg-white border border-[#A50034]" />
          </div>

          <div className="absolute -bottom-3 left-6 text-[10px] font-mono tracking-widest text-[#A50034] uppercase bg-white/90 px-3 py-0.5 rounded-full border border-[#D50032]/30 shadow-xs">
            Front // Linear Strike Axes
          </div>
        </div>
      );

    // PERFORMANCE — Fibonacci Harmonic Wave Rings (Back layer)
    case 'perf-back-waves':
      return (
        <div className="relative w-76 h-76 flex items-center justify-center select-none">
          <div className="absolute inset-0 rounded-full border border-[#D50032]/20 animate-ping [animation-duration:5s]" />
          <div className="absolute inset-8 rounded-full border border-[#D50032]/30" />
          <div className="absolute inset-16 rounded-full border border-[#A50034]/25" />
          <div className="absolute inset-24 rounded-full border border-[#FFB3BA]/40" />
          <div className="w-24 h-24 rounded-full bg-white/80 flex flex-col items-center justify-center border border-[#D50032]/30 backdrop-blur-xs shadow-xs">
            <span className="text-[11px] font-mono text-[#D50032] font-bold tracking-wider">1, 1, 2, 3, 5, 8</span>
            <span className="text-[8px] font-mono text-[#7A6E74] uppercase mt-0.5">Harmonic Progression</span>
          </div>
        </div>
      );

    // PERFORMANCE — Fine-Line Geometric Bloom Lattice (Front layer, zero solid discs)
    case 'perf-front-cymbal-bloom':
      return (
        <div className="relative w-60 h-60 select-none group">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#D50032" strokeWidth="0.8" strokeOpacity="0.4" />
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <ellipse
                key={deg}
                cx="50"
                cy="50"
                rx="42"
                ry="16"
                fill="none"
                stroke={deg % 60 === 0 ? '#D50032' : '#FFB3BA'}
                strokeWidth="0.85"
                strokeOpacity="0.6"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
            <circle cx="50" cy="50" r="14" fill="none" stroke="#A50034" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="50" cy="50" r="4" fill="#D50032" />
          </svg>

          <div className="absolute -bottom-5 left-2 text-[10px] font-mono tracking-widest text-[#A50034] uppercase bg-white/90 px-3 py-0.5 rounded-full border border-[#D50032]/30 shadow-xs">
            Front // Geometric Blossom Lattice
          </div>
        </div>
      );

    // BEAT CONSTRUCTION — Euclidean Rhythm Matrix & Flower of Life Lines (Back layer)
    case 'beat-back-euclidean':
      return (
        <div className="w-76 p-4 rounded-2xl border border-[#D50032]/20 bg-white/80 backdrop-blur-md select-none shadow-xs">
          <div className="text-[10px] font-mono text-[#A50034] mb-2 uppercase tracking-widest flex justify-between font-semibold">
            <span>Euclidean Rhythm Lines</span>
            <span className="text-[#D50032] font-bold">E(5, 12) ∩ E(7, 16)</span>
          </div>
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(213, 0, 50, 0.3)" strokeWidth="0.8" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <circle
                  key={deg}
                  cx={50 + 21 * Math.cos((deg * Math.PI) / 180)}
                  cy={50 + 21 * Math.sin((deg * Math.PI) / 180)}
                  r="21"
                  fill="none"
                  stroke="rgba(255, 179, 186, 0.7)"
                  strokeWidth="0.75"
                />
              ))}
              <polygon
                points="50,8 89.9,37 74.7,83.9 25.3,83.9 10.1,37"
                fill="none"
                stroke="#D50032"
                strokeWidth="1.5"
              />
            </svg>
            <div className="absolute text-[9px] font-mono text-[#D50032] font-bold uppercase bg-white/90 px-2 py-0.5 rounded border border-[#D50032]/30 shadow-2xs">
              Pattern Geometry
            </div>
          </div>
        </div>
      );

    // BEAT CONSTRUCTION — Golden Angle 137.5° Micro-Timing Node (Front layer)
    case 'beat-front-golden-angle':
      return (
        <div className="p-3.5 rounded-xl border border-[#D50032]/30 bg-white/95 backdrop-blur-md shadow-sm select-none">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D50032] animate-ping" />
            <span className="text-[10px] font-mono text-[#A50034] tracking-widest uppercase font-semibold">Golden Angle Phyllotaxis</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#18070F] tracking-wider">137.5077°</div>
          <div className="text-[9px] font-mono text-[#7A6E74] mt-1 flex justify-between">
            <span>Sunflower Seed Offset</span>
            <span className="text-[#D50032] font-bold">-18.4 ms Drag</span>
          </div>
        </div>
      );

    // OUTRO — Sacred Vesica Piscis Monogram (Back layer)
    case 'outro-back-monogram':
      return (
        <div className="w-72 h-72 rounded-full border border-[#D50032]/25 flex items-center justify-center select-none bg-radial from-[#FFB3BA]/20 to-transparent">
          <div className="relative w-full h-full flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="38" cy="50" r="30" fill="none" stroke="rgba(255, 179, 186, 0.7)" strokeWidth="0.8" />
              <circle cx="62" cy="50" r="30" fill="none" stroke="rgba(213, 0, 50, 0.5)" strokeWidth="0.8" />
            </svg>
            <div className="text-center z-10">
              <div className="text-6xl font-['Instrument_Serif'] italic text-[#18070F] drop-shadow-xs">
                HB
              </div>
              <div className="text-[9px] font-mono tracking-[0.35em] text-[#A50034] uppercase mt-2 font-semibold">
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

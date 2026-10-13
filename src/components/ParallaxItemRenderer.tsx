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
          className="max-w-[340px] md:max-w-[440px] h-auto object-contain drop-shadow-[0_20px_45px_rgba(213,0,50,0.35)] filter transition-transform duration-500 group-hover:scale-105"
        />
        {item.title && (
          <div className="absolute -bottom-6 left-0 text-[10px] uppercase font-mono tracking-widest text-[#FFB3BA] bg-[#18060d]/90 px-2.5 py-0.5 rounded border border-[#FFB3BA]/30 backdrop-blur">
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
          className={`max-w-[360px] md:max-w-[480px] h-auto ${
            isMp4
              ? 'rounded-2xl border border-[#FFB3BA]/40 shadow-[0_25px_60px_rgba(213,0,50,0.5)] object-cover'
              : 'object-contain filter drop-shadow-[0_25px_55px_rgba(213,0,50,0.4)]'
          }`}
        />
        {item.title && (
          <div className="absolute -bottom-6 left-0 text-[10px] uppercase font-mono tracking-widest text-[#FFB3BA] bg-[#18060d]/90 px-2.5 py-0.5 rounded border border-[#FFB3BA]/30 backdrop-blur">
            {item.title} {isMp4 ? '(Live Video)' : '(WebM Alpha)'}
          </div>
        )}
      </div>
    );
  }

  // Rich Vector / Generative Geometry + Nature Artwork Components
  switch (item.id) {
    // HERO — Golden Ratio Spiral & Fibonacci Nautilus (Back layer)
    case 'hero-back-fibonacci':
      return (
        <div className="relative w-80 h-80 rounded-2xl border border-[#F9C2C2]/15 flex items-center justify-center p-6 bg-radial from-[#2a0613]/50 to-[#0e0407]/40 backdrop-blur-xs select-none">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Fibonacci rectangles */}
            <rect x="20" y="20" width="100" height="100" fill="none" stroke="rgba(255, 179, 186, 0.25)" strokeWidth="0.8" />
            <rect x="120" y="20" width="60" height="60" fill="none" stroke="rgba(255, 179, 186, 0.2)" strokeWidth="0.8" />
            <rect x="120" y="80" width="40" height="40" fill="none" stroke="rgba(255, 179, 186, 0.2)" strokeWidth="0.8" />
            <rect x="100" y="95" width="20" height="25" fill="none" stroke="rgba(255, 179, 186, 0.2)" strokeWidth="0.8" />
            
            {/* Nautilus Golden Spiral Path */}
            <path
              d="M 20,120 A 100,100 0 0,1 120,20 A 60,60 0 0,1 180,80 A 40,40 0 0,1 140,120 A 25,25 0 0,1 115,95"
              fill="none"
              stroke="url(#spiralGrad)"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            
            {/* Concentric Golden Radii */}
            <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(213, 0, 50, 0.2)" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="52.5" fill="none" stroke="rgba(255, 179, 186, 0.3)" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="32.5" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.8" />

            <defs>
              <linearGradient id="spiralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D50032" />
                <stop offset="50%" stopColor="#FFB3BA" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute bottom-3 left-4 text-[9px] font-mono tracking-widest text-[#FFB3BA]/70 uppercase flex items-center gap-2">
            <span>NAUTILUS SPIRAL</span>
            <span className="text-white/40">|</span>
            <span className="text-[#D50032] font-bold">φ = 1.6180339</span>
          </div>
        </div>
      );

    // HERO — Floating 22" Resonant Bronze Cymbal with Phyllotaxis Lathe (Front layer)
    case 'hero-front-cymbal':
      return (
        <div className="relative w-64 h-64 select-none transform hover:scale-105 transition-transform duration-700">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8a142e] via-[#e5a072] to-[#ffccd2] opacity-90 shadow-[0_30px_70px_rgba(213,0,50,0.4),inset_0_0_40px_rgba(165,0,52,0.6)] border border-[#FFB3BA]/40" />
          
          {/* Lathe grooves with Golden Ratio spacings */}
          <div className="absolute inset-4 rounded-full border border-black/35" />
          <div className="absolute inset-7 rounded-full border border-black/25" />
          <div className="absolute inset-12 rounded-full border border-black/25" />
          <div className="absolute inset-18 rounded-full border border-black/35" />

          {/* Phyllotaxis Hammer Marks (Fibonacci sunflower petal distribution) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <div
              key={i}
              className="absolute w-2.5 h-1.5 rounded-full bg-black/30 blur-[0.5px]"
              style={{
                top: `${50 + 32 * Math.sin((deg * Math.PI) / 180)}%`,
                left: `${50 + 32 * Math.cos((deg * Math.PI) / 180)}%`,
                transform: `rotate(${deg}deg)`
              }}
            />
          ))}

          {/* Cymbal Bell with Ruby specular heart */}
          <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-gradient-to-b from-[#ffdbe0] to-[#A50034] shadow-inner border border-black/40 flex items-center justify-center">
            <div className="w-3.5 h-3.5 rounded-full bg-[#18060d] shadow-inner border border-[#D50032]" />
          </div>

          <div className="absolute -bottom-7 right-0 text-[10px] font-mono tracking-widest text-[#FFB3BA] uppercase bg-[#18060d]/90 px-3 py-1 rounded-full border border-[#D50032]/40 shadow-lg">
            Front // 22" Phyllotaxis Bronze
          </div>
        </div>
      );

    // SESSION — Chladni Sound Geometry Nodal Plate (Back layer)
    case 'session-back-chladni':
      return (
        <div className="w-80 p-5 rounded-2xl border border-[#F9C2C2]/15 bg-gradient-to-br from-[#1c0610]/80 to-[#0e0407]/90 backdrop-blur-md select-none">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-mono text-[#FFB3BA] tracking-widest uppercase">
              Chladni Nodal Sound Geometry
            </span>
            <span className="w-2 h-2 rounded-full bg-[#D50032] animate-ping" />
          </div>

          {/* Symmetrical Sound Frequency Mandala */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Outer boundary */}
              <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(249, 194, 194, 0.2)" strokeWidth="0.8" />
              {/* Nodal lines formed by resonance */}
              <ellipse cx="50" cy="50" rx="38" ry="16" fill="none" stroke="#FFB3BA" strokeWidth="1.2" opacity="0.6" />
              <ellipse cx="50" cy="50" rx="16" ry="38" fill="none" stroke="#FFB3BA" strokeWidth="1.2" opacity="0.6" />
              <ellipse cx="50" cy="50" rx="34" ry="34" fill="none" stroke="#D50032" strokeWidth="0.8" strokeDasharray="3 2" />
              {/* 8-petal nodal flower */}
              {[0, 45, 90, 135].map((rot) => (
                <line
                  key={rot}
                  x1="50"
                  y1="6"
                  x2="50"
                  y2="94"
                  stroke="rgba(255, 255, 255, 0.25)"
                  strokeWidth="0.8"
                  transform={`rotate(${rot} 50 50)`}
                />
              ))}
              <circle cx="50" cy="50" r="6" fill="#D50032" opacity="0.8" />
            </svg>
            <div className="absolute text-[8px] font-mono text-white/70 uppercase bg-black/60 px-1.5 py-0.5 rounded">
              f = 432 Hz • m=4, n=4
            </div>
          </div>

          <div className="mt-3 text-[10px] font-mono text-[#F9C2C2]/70 flex justify-between border-t border-white/5 pt-2">
            <span>Acoustic Cymatics</span>
            <span className="text-[#D50032]">Sand on Resonant Brass</span>
          </div>
        </div>
      );

    // SESSION — Solid Maple Drumsticks with Botanical Leaf Venation (Front layer)
    case 'session-front-sticks':
      return (
        <div className="relative w-68 h-36 select-none">
          {/* Stick 1 with leaf venation motif */}
          <div className="absolute top-6 left-0 w-64 h-3 bg-gradient-to-r from-[#d9be9b] via-[#F9C2C2] to-[#A50034] rounded-full rotate-[-16deg] shadow-[0_15px_30px_rgba(213,0,50,0.35)] border border-[#FFB3BA]/40">
            <div className="absolute right-0 -top-0.5 w-4 h-4 rounded-full bg-[#FFFFFF] shadow-sm border border-[#FFB3BA]" />
            <div className="absolute left-8 top-0.5 text-[8px] font-mono tracking-widest text-[#18060d] font-bold uppercase">
              Solid Maple // Leaf Grain
            </div>
          </div>

          {/* Stick 2 */}
          <div className="absolute top-18 left-4 w-64 h-3 bg-gradient-to-r from-[#d9be9b] via-[#FFB3BA] to-[#8a142e] rounded-full rotate-[14deg] shadow-[0_15px_30px_rgba(213,0,50,0.35)] border border-[#FFB3BA]/40">
            <div className="absolute right-0 -top-0.5 w-4 h-4 rounded-full bg-[#FFFFFF] shadow-sm border border-[#FFB3BA]" />
          </div>

          <div className="absolute -bottom-4 left-6 text-[10px] font-mono tracking-widest text-[#FFB3BA] uppercase bg-[#18060d]/90 px-3 py-0.5 rounded-full border border-[#D50032]/40">
            Front // Organic Grain Resonator
          </div>
        </div>
      );

    // PERFORMANCE — Fibonacci Harmonic Waves (Back layer)
    case 'perf-back-waves':
      return (
        <div className="relative w-80 h-80 flex items-center justify-center select-none">
          <div className="absolute inset-0 rounded-full border border-[#D50032]/20 animate-ping [animation-duration:5s]" />
          <div className="absolute inset-8 rounded-full border border-[#FFB3BA]/25" />
          <div className="absolute inset-16 rounded-full border border-[#F9C2C2]/20" />
          <div className="absolute inset-24 rounded-full border border-white/20" />
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#D50032]/25 to-transparent flex flex-col items-center justify-center border border-[#FFB3BA]/40 backdrop-blur-xs">
            <span className="text-[11px] font-mono text-white font-bold tracking-wider">1, 1, 2, 3, 5, 8</span>
            <span className="text-[8px] font-mono text-[#FFB3BA] uppercase mt-0.5">Harmonic Series</span>
          </div>
        </div>
      );

    // PERFORMANCE — Faceted Geometric Bronze Blossom (Front layer)
    case 'perf-front-cymbal-bloom':
      return (
        <div className="relative w-60 h-60 select-none group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#A50034] via-[#e5a072] to-[#FFFFFF] opacity-90 shadow-[0_25px_65px_rgba(213,0,50,0.45)] border border-[#FFB3BA]/50" />
          {/* Petal Facets SVG */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <ellipse
                key={deg}
                cx="50"
                cy="50"
                rx="42"
                ry="18"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="0.8"
                transform={`rotate(${deg} 50 50)`}
              />
            ))}
          </svg>
          <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-gradient-to-b from-[#FFFFFF] to-[#D50032] flex items-center justify-center shadow-lg">
            <div className="w-3.5 h-3.5 rounded-full bg-[#18060d]" />
          </div>
          <div className="absolute -bottom-6 left-2 text-[10px] font-mono tracking-widest text-[#FFB3BA] uppercase bg-[#18060d]/90 px-3 py-1 rounded-full border border-[#D50032]/40 shadow-lg">
            Front // Petal-Faceted Bronze
          </div>
        </div>
      );

    // BEAT CONSTRUCTION — Euclidean Rhythm Matrix & Flower of Life (Back layer)
    case 'beat-back-euclidean':
      return (
        <div className="w-80 p-5 rounded-2xl border border-[#F9C2C2]/15 bg-gradient-to-br from-[#1c0610]/80 to-[#0e0407]/90 backdrop-blur-md select-none">
          <div className="text-[10px] font-mono text-[#FFB3BA] mb-2 uppercase tracking-widest flex justify-between">
            <span>Euclidean Algorithm</span>
            <span className="text-[#D50032] font-bold">E(5, 12) ∩ E(7, 16)</span>
          </div>
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Flower of Life Base Circles */}
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.8" />
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <circle
                  key={deg}
                  cx={50 + 21 * Math.cos((deg * Math.PI) / 180)}
                  cy={50 + 21 * Math.sin((deg * Math.PI) / 180)}
                  r="21"
                  fill="none"
                  stroke="rgba(255, 179, 186, 0.35)"
                  strokeWidth="0.8"
                />
              ))}
              {/* Inscribed 5-beat pentagon in Crimson */}
              <polygon
                points="50,8 89.9,37 74.7,83.9 25.3,83.9 10.1,37"
                fill="none"
                stroke="#D50032"
                strokeWidth="1.8"
              />
            </svg>
            <div className="absolute text-[9px] font-mono text-[#FFFFFF] font-bold uppercase bg-[#A50034]/70 px-2 py-0.5 rounded">
              Geometry of Groove
            </div>
          </div>
        </div>
      );

    // BEAT CONSTRUCTION — Golden Angle 137.5° Micro-Timing Node (Front layer)
    case 'beat-front-golden-angle':
      return (
        <div className="p-4 rounded-xl border border-[#D50032]/40 bg-[#1a050f]/95 backdrop-blur-md shadow-[0_20px_45px_rgba(213,0,50,0.35)] select-none">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D50032] animate-ping" />
            <span className="text-[10px] font-mono text-[#FFB3BA] tracking-widest uppercase">Golden Angle Phyllotaxis</span>
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-wider">137.5077°</div>
          <div className="text-[9px] font-mono text-[#F9C2C2]/80 mt-1 flex justify-between">
            <span>Sunflower Seed Metric Offset</span>
            <span className="text-[#D50032] font-bold">-18.4 ms Drag</span>
          </div>
        </div>
      );

    // OUTRO — Sacred Vesica Piscis Monogram (Back layer)
    case 'outro-back-monogram':
      return (
        <div className="w-72 h-72 rounded-full border border-[#F9C2C2]/20 flex items-center justify-center select-none bg-radial from-[#A50034]/20 to-transparent">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Vesica Piscis Intersecting Arcs */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <circle cx="38" cy="50" r="30" fill="none" stroke="rgba(255, 179, 186, 0.3)" strokeWidth="0.8" />
              <circle cx="62" cy="50" r="30" fill="none" stroke="rgba(213, 0, 50, 0.4)" strokeWidth="0.8" />
            </svg>
            <div className="text-center z-10">
              <div className="text-6xl font-['Instrument_Serif'] italic text-white drop-shadow-[0_0_20px_rgba(213,0,50,0.5)]">
                HB
              </div>
              <div className="text-[9px] font-mono tracking-[0.35em] text-[#FFB3BA] uppercase mt-2">
                NATURE • MATH • RHYTHM
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="p-4 rounded-lg border border-[#F9C2C2]/20 bg-[#18060d]/80 text-xs font-mono text-[#FFB3BA]">
          {item.title || 'Parallax Asset'}
        </div>
      );
  }
};

import React from 'react';
import { ParallaxMediaItem } from '../types';

interface ParallaxItemRendererProps {
  item: ParallaxMediaItem;
  layer: 'front' | 'middle' | 'back';
}

export const ParallaxItemRenderer: React.FC<ParallaxItemRendererProps> = ({ item }) => {
  // If user has provided a custom image (.png)
  if (item.type === 'image' && item.src) {
    return (
      <div className="relative group">
        <img
          src={item.src}
          alt={item.alt || item.title}
          className="max-w-[420px] md:max-w-[580px] h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(213,0,50,0.2)] transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    );
  }

  // If user has provided a transparent video (.webm)
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
          className={`max-w-[420px] md:max-w-[580px] h-auto ${
            isMp4
              ? 'rounded-2xl border border-[#D50032]/30 shadow-lg object-cover'
              : 'object-contain filter drop-shadow-[0_15px_35px_rgba(213,0,50,0.25)]'
          }`}
        />
      </div>
    );
  }

  // Pure Fine-Line Geometric Artwork (Much Larger Visual Dimensions with Ultra-Thin Non-Scaling Line Widths)
  switch (item.id) {
    // HERO — Golden Ratio Spiral & Fibonacci Subdivision (Back layer)
    case 'hero-back-fibonacci':
      return (
        <div className="relative w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] md:w-[760px] md:h-[760px] lg:w-[880px] lg:h-[880px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none">
            {/* Fibonacci Subdivision Rectangles (Pure fine wireframe) */}
            <rect x="24" y="24" width="120" height="120" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.32" vectorEffect="non-scaling-stroke" />
            <rect x="144" y="24" width="72" height="72" stroke="#A50034" strokeWidth="0.7" strokeOpacity="0.28" vectorEffect="non-scaling-stroke" />
            <rect x="144" y="96" width="48" height="48" stroke="#FFB3BA" strokeWidth="0.7" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
            <rect x="120" y="114" width="24" height="30" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.32" vectorEffect="non-scaling-stroke" />

            {/* Diagonal Golden Section Vectors */}
            <line x1="24" y1="24" x2="216" y2="144" stroke="#A50034" strokeWidth="0.6" strokeOpacity="0.22" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            <line x1="144" y1="24" x2="120" y2="144" stroke="#D50032" strokeWidth="0.6" strokeOpacity="0.22" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />

            {/* Nautilus Logarithmic Spiral Continuous Curve */}
            <path
              d="M 24,144 A 120,120 0 0,1 144,24 A 72,72 0 0,1 216,96 A 48,48 0 0,1 168,144 A 30,30 0 0,1 138,114"
              stroke="#D50032"
              strokeWidth="0.95"
              strokeDasharray="4 2"
              strokeOpacity="0.7"
              vectorEffect="non-scaling-stroke"
            />

            {/* Concentric Golden Radii Orbital Lines */}
            <circle cx="120" cy="120" r="102" stroke="#D50032" strokeWidth="0.6" strokeOpacity="0.22" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="63" stroke="#A50034" strokeWidth="0.6" strokeOpacity="0.26" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="39" stroke="#FFB3BA" strokeWidth="0.6" strokeOpacity="0.35" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      );

    // HERO — Fine-Line Sacred Cymbal & Phyllotaxis Lathe (Foreground)
    case 'hero-front-cymbal':
      return (
        <div className="relative w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] md:w-[720px] md:h-[720px] lg:w-[840px] lg:h-[840px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none">
            {/* Concentric Acoustic Lathe Lines (Pure thin wireframe, zero solid discs) */}
            <circle cx="120" cy="120" r="114" stroke="#D50032" strokeWidth="0.85" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="104" stroke="#A50034" strokeWidth="0.6" strokeOpacity="0.3" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="92" stroke="#D50032" strokeWidth="0.6" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="78" stroke="#FFB3BA" strokeWidth="0.7" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="60" stroke="#A50034" strokeWidth="0.6" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="42" stroke="#D50032" strokeWidth="0.65" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="24" stroke="#A50034" strokeWidth="0.7" strokeOpacity="0.5" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="8" stroke="#D50032" strokeWidth="0.85" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />

            {/* Radial Golden Angle Rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="120"
                y1="12"
                x2="120"
                y2="28"
                stroke="#D50032"
                strokeWidth="0.65"
                strokeOpacity="0.4"
                transform={`rotate(${deg} 120 120)`}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Inscribed Sacred Hexagram / Harmonic Lattice Lines */}
            <polygon
              points="120,24 203,168 37,168"
              stroke="#D50032"
              strokeWidth="0.6"
              strokeOpacity="0.22"
              vectorEffect="non-scaling-stroke"
            />
            <polygon
              points="120,216 37,72 203,72"
              stroke="#A50034"
              strokeWidth="0.6"
              strokeOpacity="0.22"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      );

    // COLLABORATION — 3/5/11 Tri-Modal Harmonic Convergence Rings (Back layer)
    case 'collab-back-synergy':
      return (
        <div className="relative w-[460px] h-[460px] sm:w-[600px] sm:h-[600px] md:w-[740px] md:h-[740px] lg:w-[860px] lg:h-[860px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none">
            {/* Outer 11-Beat Harmonic Circle */}
            <circle cx="120" cy="120" r="108" stroke="#D50032" strokeWidth="0.65" strokeOpacity="0.26" vectorEffect="non-scaling-stroke" />
            {/* 3 Intersecting Borromean / Tri-Discipline Circles (Drums × Visuals × Musicians/DJs) */}
            <circle cx="120" cy="86" r="56" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.42" vectorEffect="non-scaling-stroke" />
            <circle cx="90" cy="138" r="56" stroke="#A50034" strokeWidth="0.7" strokeOpacity="0.38" vectorEffect="non-scaling-stroke" />
            <circle cx="150" cy="138" r="56" stroke="#FFB3BA" strokeWidth="0.75" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
            {/* Inscribed 3/5/11 Triangle & Pentagram Nodes */}
            <polygon points="120,30 198,165 42,165" stroke="#D50032" strokeWidth="0.6" strokeDasharray="3 2" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="14" stroke="#A50034" strokeWidth="0.75" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      );

    // COLLABORATION — Audio-Visual Transient Sync Lattice (Foreground)
    case 'collab-front-nodes':
      return (
        <div className="relative w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="88" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.35" strokeDasharray="4 2" vectorEffect="non-scaling-stroke" />
            <circle cx="100" cy="100" r="54" stroke="#FFB3BA" strokeWidth="0.65" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
            {[0, 32.72, 65.45, 98.18, 130.9, 163.63, 196.36, 229.09, 261.81, 294.54, 327.27].map((deg, idx) => (
              <line
                key={idx}
                x1="100"
                y1="12"
                x2="100"
                y2="46"
                stroke={idx % 2 === 0 ? '#D50032' : '#A50034'}
                strokeWidth="0.7"
                strokeOpacity="0.45"
                transform={`rotate(${deg} 100 100)`}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>
      );

    // SESSION — Chladni Sound Frequency Nodal Plate (Back layer)
    case 'session-back-chladni':
      return (
        <div className="relative w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] md:w-[760px] md:h-[760px] lg:w-[880px] lg:h-[880px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none">
            {/* Concentric Boundary & Nodal Circles */}
            <circle cx="120" cy="120" r="110" stroke="#D50032" strokeWidth="0.65" strokeOpacity="0.25" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="82" stroke="#A50034" strokeWidth="0.6" strokeDasharray="3 2" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="8" stroke="#D50032" strokeWidth="0.85" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />

            {/* 432 Hz Nodal Harmonic Ellipses */}
            <ellipse cx="120" cy="120" rx="92" ry="38" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
            <ellipse cx="120" cy="120" rx="38" ry="92" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />

            {/* Diagonal Standing Frequency Rays */}
            {[0, 45, 90, 135].map((rot) => (
              <line
                key={rot}
                x1="120"
                y1="14"
                x2="120"
                y2="226"
                stroke="#FFB3BA"
                strokeWidth="0.6"
                strokeOpacity="0.5"
                transform={`rotate(${rot} 120 120)`}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Hyperbolic Nodal Chords */}
            <path
              d="M 50,50 Q 120,120 190,50 M 50,190 Q 120,120 190,190"
              stroke="#A50034"
              strokeWidth="0.6"
              strokeOpacity="0.3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      );

    // SESSION — Fine-Line Acoustic Axis Sticks (Foreground)
    case 'session-front-sticks':
      return (
        <div className="relative w-[500px] h-[210px] sm:w-[660px] sm:h-[260px] md:w-[800px] md:h-[310px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 280 110" fill="none">
            {/* Stick 1 Fine Wireframe Contour & Strike Vector */}
            <g transform="rotate(-11 140 55)">
              <line x1="15" y1="40" x2="245" y2="40" stroke="#D50032" strokeWidth="0.9" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
              <line x1="15" y1="47" x2="245" y2="47" stroke="#A50034" strokeWidth="0.6" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />
              <circle cx="254" cy="43.5" r="5.5" stroke="#D50032" strokeWidth="0.85" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
              {/* Fine venation tick marks */}
              <line x1="50" y1="40" x2="62" y2="47" stroke="#FFB3BA" strokeWidth="0.5" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="100" y1="40" x2="112" y2="47" stroke="#FFB3BA" strokeWidth="0.5" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="160" y1="40" x2="172" y2="47" stroke="#FFB3BA" strokeWidth="0.5" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
              {/* Fulcrum nodal ring */}
              <circle cx="95" cy="43.5" r="9" stroke="#FFB3BA" strokeWidth="0.5" strokeDasharray="2 2" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />
            </g>

            {/* Stick 2 Fine Wireframe Contour */}
            <g transform="rotate(11 140 65)">
              <line x1="25" y1="65" x2="255" y2="65" stroke="#A50034" strokeWidth="0.85" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
              <line x1="25" y1="72" x2="255" y2="72" stroke="#D50032" strokeWidth="0.6" strokeOpacity="0.35" vectorEffect="non-scaling-stroke" />
              <circle cx="264" cy="68.5" r="5.5" stroke="#A50034" strokeWidth="0.85" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
              {/* Wood grain ticks */}
              <line x1="70" y1="65" x2="82" y2="72" stroke="#FFB3BA" strokeWidth="0.5" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="130" y1="65" x2="142" y2="72" stroke="#FFB3BA" strokeWidth="0.5" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
              <line x1="190" y1="65" x2="202" y2="72" stroke="#FFB3BA" strokeWidth="0.5" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />
            </g>
          </svg>
        </div>
      );

    // PERFORMANCE — Fibonacci Harmonic Wave Rings (Back layer)
    case 'perf-back-waves':
      return (
        <div className="relative w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] md:w-[760px] md:h-[760px] lg:w-[880px] lg:h-[880px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none">
            {/* Concentric Fibonacci Harmonic Standing Wave Rings */}
            <circle cx="120" cy="120" r="112" stroke="#D50032" strokeWidth="0.65" strokeOpacity="0.22" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="94" stroke="#A50034" strokeWidth="0.65" strokeOpacity="0.28" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="72" stroke="#D50032" strokeWidth="0.65" strokeOpacity="0.32" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="50" stroke="#FFB3BA" strokeWidth="0.7" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="30" stroke="#D50032" strokeWidth="0.8" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="12" stroke="#A50034" strokeWidth="0.85" strokeOpacity="0.65" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />

            {/* Sinusoidal Wave Contours */}
            <path
              d="M 12,120 Q 66,96 120,120 T 228,120"
              stroke="#FFB3BA"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 120,12 Q 144,66 120,120 T 120,228"
              stroke="#D50032"
              strokeWidth="0.6"
              strokeOpacity="0.3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      );

    // PERFORMANCE — Fine-Line Geometric Blossom Lattice (Foreground)
    case 'perf-front-cymbal-bloom':
      return (
        <div className="relative w-[440px] h-[440px] sm:w-[580px] sm:h-[580px] md:w-[720px] md:h-[720px] lg:w-[840px] lg:h-[840px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none">
            {/* Boundary Harmonic Rings */}
            <circle cx="120" cy="120" r="110" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.32" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="34" stroke="#A50034" strokeWidth="0.65" strokeDasharray="2 2" strokeOpacity="0.45" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="8" stroke="#D50032" strokeWidth="0.85" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />

            {/* 12-Fold Geometric Rosette / Flower of Life Petal Ellipses */}
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <ellipse
                key={deg}
                cx="120"
                cy="120"
                rx="100"
                ry="36"
                stroke={deg % 60 === 0 ? '#D50032' : '#FFB3BA'}
                strokeWidth="0.65"
                strokeOpacity="0.48"
                transform={`rotate(${deg} 120 120)`}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Harmonic Dodecagram Chords */}
            <polygon
              points="120,20 206,70 206,170 120,220 34,170 34,70"
              stroke="#A50034"
              strokeWidth="0.55"
              strokeOpacity="0.25"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      );

    // BEAT CONSTRUCTION — Euclidean Rhythm Matrix Lines (Back layer)
    case 'beat-back-euclidean':
      return (
        <div className="relative w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] md:w-[760px] md:h-[760px] lg:w-[880px] lg:h-[880px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none">
            {/* Outer 16-Step Division Ring */}
            <circle cx="120" cy="120" r="106" stroke="#D50032" strokeWidth="0.65" strokeOpacity="0.25" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="76" stroke="#A50034" strokeWidth="0.55" strokeOpacity="0.25" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />

            {/* 6 Overlapping Sacred Euclidean Pulse Circles */}
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <circle
                key={deg}
                cx={120 + 52 * Math.cos((deg * Math.PI) / 180)}
                cy={120 + 52 * Math.sin((deg * Math.PI) / 180)}
                r="52"
                stroke="#FFB3BA"
                strokeWidth="0.6"
                strokeOpacity="0.5"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Inscribed E(5, 16) Euclidean Pentagram Regular Polygon */}
            <polygon
              points="120,16 218,87 181,202 59,202 22,87"
              stroke="#D50032"
              strokeWidth="0.95"
              strokeOpacity="0.7"
              vectorEffect="non-scaling-stroke"
            />

            {/* Inscribed E(7, 16) Alternate Heptagon Pulse */}
            <polygon
              points="120,24 195,59 217,138 168,206 72,206 23,138 45,59"
              stroke="#A50034"
              strokeWidth="0.65"
              strokeOpacity="0.35"
              strokeDasharray="3 2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      );

    // BEAT CONSTRUCTION — Golden Angle 137.5° Compass Lines (Foreground)
    case 'beat-front-golden-angle':
      return (
        <div className="relative w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] md:w-[620px] md:h-[620px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
            {/* Compass Protractor Dial & Calibration Ticks */}
            <circle cx="100" cy="100" r="90" stroke="#D50032" strokeWidth="0.75" strokeOpacity="0.3" vectorEffect="non-scaling-stroke" />
            <circle cx="100" cy="100" r="70" stroke="#A50034" strokeWidth="0.55" strokeOpacity="0.25" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
            <circle cx="100" cy="100" r="4" stroke="#D50032" strokeWidth="0.85" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />

            {/* 24 Calibration Rays around perimeter */}
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
              <line
                key={deg}
                x1="100"
                y1="10"
                x2="100"
                y2={deg % 45 === 0 ? '22' : '16'}
                stroke={deg % 45 === 0 ? '#D50032' : '#FFB3BA'}
                strokeWidth={deg % 45 === 0 ? '0.65' : '0.5'}
                strokeOpacity="0.4"
                transform={`rotate(${deg} 100 100)`}
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Primary Reference Arm at 0° */}
            <line x1="100" y1="100" x2="100" y2="10" stroke="#D50032" strokeWidth="0.9" strokeOpacity="0.8" vectorEffect="non-scaling-stroke" />

            {/* Golden Angle Vector at 137.5077° */}
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="10"
              stroke="#A50034"
              strokeWidth="0.9"
              strokeOpacity="0.8"
              transform="rotate(137.5077 100 100)"
              vectorEffect="non-scaling-stroke"
            />

            {/* Connecting Golden Arc Subtension */}
            <path
              d="M 100,50 A 50,50 0 0,1 133,136"
              stroke="#FFB3BA"
              strokeWidth="0.75"
              strokeDasharray="3 2"
              strokeOpacity="0.7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      );

    // OUTRO — Sacred Vesica Piscis Geometric Construction (Back layer)
    case 'outro-back-monogram':
      return (
        <div className="relative w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] md:w-[760px] md:h-[760px] lg:w-[880px] lg:h-[880px] select-none pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 240 240" fill="none">
            {/* Outer Golden Bounding Circle */}
            <circle cx="120" cy="120" r="110" stroke="#D50032" strokeWidth="0.65" strokeOpacity="0.25" vectorEffect="non-scaling-stroke" />
            <circle cx="120" cy="120" r="18" stroke="#A50034" strokeWidth="0.6" strokeDasharray="2 2" strokeOpacity="0.4" vectorEffect="non-scaling-stroke" />

            {/* Vesica Piscis Intersecting Circles */}
            <circle cx="92" cy="120" r="70" stroke="#FFB3BA" strokeWidth="0.7" strokeOpacity="0.6" vectorEffect="non-scaling-stroke" />
            <circle cx="148" cy="120" r="70" stroke="#D50032" strokeWidth="0.7" strokeOpacity="0.5" vectorEffect="non-scaling-stroke" />

            {/* Inscribed Equilateral Harmonic Triangles in the Mandorla */}
            <polygon
              points="120,60 92,120 148,120"
              stroke="#A50034"
              strokeWidth="0.6"
              strokeOpacity="0.35"
              vectorEffect="non-scaling-stroke"
            />
            <polygon
              points="120,180 92,120 148,120"
              stroke="#D50032"
              strokeWidth="0.6"
              strokeOpacity="0.35"
              vectorEffect="non-scaling-stroke"
            />

            {/* Vertical and Horizontal Harmonic Axes */}
            <line x1="120" y1="30" x2="120" y2="210" stroke="#FFB3BA" strokeWidth="0.55" strokeOpacity="0.4" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
            <line x1="30" y1="120" x2="210" y2="120" stroke="#D50032" strokeWidth="0.55" strokeOpacity="0.3" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      );

    default:
      return null;
  }
};

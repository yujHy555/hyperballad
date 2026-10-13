import React, { useState } from 'react';
import { Sliders, Radio } from 'lucide-react';

interface StemTrack {
  id: string;
  name: string;
  mic: string;
  level: number;
  muted: boolean;
  solo: boolean;
  freq: string;
}

export const SessionRecordingSection: React.FC = () => {
  const [stems, setStems] = useState<StemTrack[]>([
    { id: '1', name: 'Kick Drum (Felt Beater)', mic: 'AKG D12 Vintage (Sub-Harmonic)', level: 86, muted: false, solo: false, freq: '42 Hz • Fundamental Resonance' },
    { id: '2', name: 'Snare Top (Nodal Harmonics)', mic: 'Beyerdynamic M201TG Dynamic', level: 92, muted: false, solo: false, freq: '180 Hz - 432 Hz • Chladni Node' },
    { id: '3', name: 'Snare Bottom (Wire Sizzle)', mic: 'Shure SM57 Unidyne III', level: 70, muted: false, solo: false, freq: '1.618 kHz • High Sizzle' },
    { id: '4', name: 'Overheads (True Ribbon Blumlein)', mic: 'Coles 4038 Ribbon Stereo Pair', level: 88, muted: false, solo: false, freq: '30 Hz - 15 kHz • Spherical Field' },
    { id: '5', name: 'Chamber Room (Acoustic Space)', mic: 'Neumann U67 Tube (Omni Radial)', level: 76, muted: false, solo: false, freq: '0.38s RT60 • Golden Reverb' }
  ]);

  const toggleMute = (id: string) => {
    setStems(prev => prev.map(s => s.id === id ? { ...s, muted: !s.muted } : s));
  };

  const toggleSolo = (id: string) => {
    setStems(prev => prev.map(s => s.id === id ? { ...s, solo: !s.solo } : s));
  };

  const handleLevel = (id: string, val: number) => {
    setStems(prev => prev.map(s => s.id === id ? { ...s, level: val } : s));
  };

  return (
    <div className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden">
      {/* Background Section Accent */}
      <div className="absolute -right-20 top-1/4 w-96 h-96 rounded-full bg-[#D50032]/5 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-[#D50032]/40 flex items-center justify-center bg-white shadow-[0_4px_15px_rgba(213,0,50,0.15)]">
            <span className="font-mono text-xs text-[#D50032] font-bold">01</span>
          </div>
          <div>
            <span className="font-mono tracking-[0.28em] text-xs text-[#A50034] font-semibold uppercase block">
              Discipline 01
            </span>
            <span className="font-['Cinzel'] text-sm tracking-wider text-[#18070F] font-semibold">
              SESSION WORK & RECORDING // CHLADNI HARMONICS
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[#F9C2C2]/60 bg-white/90 text-[11px] font-mono text-[#A50034] shadow-xs">
          <Radio className="w-3.5 h-3.5 text-[#D50032] animate-pulse" />
          <span>STUDER A800 24-TRACK // ANALOG SATURATION 15 IPS</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
        {/* Left Column: Narrative & Mathematical Philosophy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#D50032] bg-[#FFB3BA]/25 border border-[#D50032]/30 uppercase font-semibold">
            Acoustic Physics & Natural Wood Grain
          </div>

          <h2 className="font-['Instrument_Serif'] text-5xl sm:text-6xl text-[#18070F] leading-[0.95]">
            Nodal physics, pocket & <br />
            <span className="italic text-[#D50032]">analog resonance</span>
          </h2>

          <p className="text-sm sm:text-base text-[#3F353A] leading-relaxed font-['Plus_Jakarta_Sans'] font-normal">
            In recording sessions, sound is natural geometry and pattern made audible. Each drum head vibrates according to Chladni nodal plate geometries, captured through figure-8 ribbon physics and vintage cross-laminated Michigan maple shells with locked micro-timing.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-sm">
              <div className="text-[10px] font-mono text-[#D50032] uppercase font-bold">Spherical Ribbon Pair</div>
              <div className="text-[#18070F] text-xs font-bold mt-1">Coles 4038 Blumlein</div>
              <div className="text-[#7A6E74] text-[11px] mt-0.5">Zero phase smearing, organic 3D depth</div>
            </div>
            <div className="p-3.5 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-sm">
              <div className="text-[10px] font-mono text-[#A50034] uppercase font-bold">Resonant Shell Wood</div>
              <div className="text-[#18070F] text-xs font-bold mt-1">1968 Gretsch Round Badge</div>
              <div className="text-[#7A6E74] text-[11px] mt-0.5">Jasper 6-ply natural cross-grain decay</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Multitrack Stem Console */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl border border-[#F9C2C2]/70 bg-white shadow-xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#F9C2C2]/30">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-[#D50032]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#18070F] uppercase">
                  Acoustic Stems Console // Pure Phase Linearity
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#D50032] bg-[#FFB3BA]/30 px-2.5 py-0.5 rounded-full border border-[#D50032]/30 font-semibold">
                96kHz / 24-bit Lossless WAV
              </span>
            </div>

            {/* Stem Track Faders */}
            <div className="space-y-3">
              {stems.map((stem) => (
                <div
                  key={stem.id}
                  className={`p-3 rounded-xl border transition-all ${
                    stem.muted
                      ? 'border-[#F9C2C2]/20 bg-[#F7F5F2] opacity-40'
                      : 'border-[#F9C2C2]/50 bg-[#F7F5F2] hover:border-[#D50032]/40'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <div>
                      <div className="text-xs font-semibold text-[#18070F] flex items-center gap-2">
                        <span>{stem.name}</span>
                        <span className="text-[10px] font-mono text-[#7A6E74] font-normal">({stem.mic})</span>
                      </div>
                      <div className="text-[9px] font-mono text-[#A50034]">{stem.freq}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSolo(stem.id)}
                        className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-colors cursor-pointer ${
                          stem.solo
                            ? 'bg-[#A50034] text-white'
                            : 'bg-white text-[#3F353A] border border-[#F9C2C2]/60 hover:bg-[#F9C2C2]/40'
                        }`}
                      >
                        S
                      </button>
                      <button
                        onClick={() => toggleMute(stem.id)}
                        className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-colors cursor-pointer ${
                          stem.muted
                            ? 'bg-[#D50032] text-white'
                            : 'bg-white text-[#3F353A] border border-[#F9C2C2]/60 hover:bg-[#F9C2C2]/40'
                        }`}
                      >
                        M
                      </button>
                      <span className="text-[10px] font-mono text-[#3F353A] font-semibold w-8 text-right">{stem.level}%</span>
                    </div>
                  </div>

                  {/* Level Slider and Custom Crimson VU Meter Bar */}
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stem.level}
                      onChange={(e) => handleLevel(stem.id, parseInt(e.target.value))}
                      className="w-full accent-[#D50032] h-1.5 bg-white rounded-lg cursor-pointer"
                    />
                    {/* Live VU meter in crimson and blush */}
                    <div className="w-24 h-2 bg-white rounded-full overflow-hidden flex p-0.5 gap-0.5 border border-[#F9C2C2]/60 shadow-inner">
                      <div
                        className="h-full bg-gradient-to-r from-[#A50034] via-[#D50032] to-[#FFB3BA] rounded-full transition-all duration-150"
                        style={{ width: `${stem.muted ? 0 : Math.min(100, stem.level * 0.95)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Stem summary */}
            <div className="pt-2 flex justify-between items-center text-[10px] font-mono text-[#7A6E74]">
              <span>Tape warmth or raw 24-bit discrete tracks with Chladni phase alignment</span>
              <span className="text-[#D50032] font-bold">Worldwide Remote Turnaround</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Specs Row */}
      <div className="relative z-20 flex justify-between items-center pt-4 border-t border-[#F9C2C2]/30 text-[11px] font-mono text-[#7A6E74]">
        <div className="flex items-center gap-4">
          <span>01 / 03 DISCIPLINES</span>
          <span>•</span>
          <span>SESSION & RECORDING</span>
        </div>
        <div className="hover:text-[#D50032] cursor-pointer transition-colors font-semibold">
          GLIDE FORWARD TO 02 PERFORMANCE →
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Play, Pause, Sparkles, SlidersHorizontal, Shapes } from 'lucide-react';

interface RhythmPattern {
  name: string;
  bpm: number;
  timeSig: string;
  description: string;
  tracks: {
    name: string;
    steps: boolean[];
    color: string;
  }[];
}

export const BeatConstructionSection: React.FC = () => {
  const PRESET_PATTERNS: RhythmPattern[] = [
    {
      name: 'London Broken Beat // Phyllotaxis',
      bpm: 134,
      timeSig: '4/4 Broken (Golden Drag)',
      description: 'Phyllotaxis-inspired kick displacement with 16th-note ghost snare drag and floating ride',
      tracks: [
        { name: 'Ride Cymbal φ', steps: [true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, false], color: '#FFB3BA' },
        { name: 'Ghost Snare', steps: [false, true, false, true, true, false, false, true, false, true, true, false, false, true, false, true], color: '#F9C2C2' },
        { name: 'Sync Kick Sub', steps: [true, false, false, false, false, false, true, false, false, true, false, false, true, false, false, false], color: '#D50032' },
        { name: 'Hi-Hat Chick', steps: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], color: '#FFFFFF' }
      ]
    },
    {
      name: '5/4 Metric Modulation // Golden Pulse',
      bpm: 118,
      timeSig: '5/4 Quintuplet Swing',
      description: 'Golden ratio pulse with shifting metric center and natural micro-delayed backbeat',
      tracks: [
        { name: '5:4 Ride Wave', steps: [true, false, false, true, false, true, false, false, true, false, true, false, false, true, false, false], color: '#FFB3BA' },
        { name: 'Rimshot Node', steps: [false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false], color: '#F9C2C2' },
        { name: 'Felt Bass Pulse', steps: [true, false, false, false, false, false, true, false, false, false, false, true, false, false, false, false], color: '#D50032' },
        { name: 'Pedal Cymbal', steps: [false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false], color: '#FFFFFF' }
      ]
    },
    {
      name: '7/8 Balkan-Afro // Fibonacci (2+2+3)',
      bpm: 142,
      timeSig: '7/8 Asymmetric',
      description: 'Fibonacci metric progression with elongated 3rd group providing forward organic flow',
      tracks: [
        { name: 'Bell Accent', steps: [true, false, true, false, true, false, false, true, false, true, false, true, false, false, true, false], color: '#FFB3BA' },
        { name: 'Brush Tap', steps: [false, true, false, true, false, true, true, false, true, false, true, false, true, true, false, true], color: '#F9C2C2' },
        { name: 'Sub Kick', steps: [true, false, false, false, true, false, false, true, false, false, false, true, false, false, true, false], color: '#D50032' },
        { name: 'Flower Tambourine', steps: [false, false, true, false, false, true, false, false, false, true, false, false, true, false, false, false], color: '#FFFFFF' }
      ]
    }
  ];

  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [currentTracks, setCurrentTracks] = useState(PRESET_PATTERNS[0].tracks);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [swingAmount, setSwingAmount] = useState<number>(61);

  // Load preset pattern
  const selectPreset = (index: number) => {
    setActivePresetIndex(index);
    setCurrentTracks(PRESET_PATTERNS[index].tracks);
    setCurrentStep(0);
  };

  // Toggle single step on track
  const toggleStep = (trackIdx: number, stepIdx: number) => {
    setCurrentTracks(prev => {
      const copy = [...prev];
      copy[trackIdx].steps[stepIdx] = !copy[trackIdx].steps[stepIdx];
      return copy;
    });
  };

  // Step sequencer clock
  useEffect(() => {
    if (!isPlaying) return;

    const currentBpm = PRESET_PATTERNS[activePresetIndex].bpm;
    const stepDuration = (60 / currentBpm / 4) * 1000;

    const interval = setInterval(() => {
      setCurrentStep(s => (s + 1) % 16);
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isPlaying, activePresetIndex]);

  return (
    <div className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden">
      {/* Background Section Accent with Crimson Glow */}
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 rounded-full bg-[#D50032]/5 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-[#D50032]/40 flex items-center justify-center bg-[#FFFFFF] backdrop-blur shadow-[0_4px_15px_rgba(213,0,50,0.15)]">
            <span className="font-mono text-xs text-[#D50032] font-bold">03</span>
          </div>
          <div>
            <span className="font-mono tracking-[0.28em] text-xs text-[#A50034] font-semibold uppercase block">
              Discipline 03
            </span>
            <span className="font-['Cinzel'] text-sm tracking-wider text-[#18070F] font-semibold">
              BEAT CONSTRUCTION // EUCLIDEAN & PHYLLOTAXIS GEOMETRY
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[#F9C2C2]/60 bg-[#FFFFFF]/90 text-[11px] font-mono text-[#A50034] shadow-xs">
          <Shapes className="w-3.5 h-3.5 text-[#D50032]" />
          <span>EUCLIDEAN ALGORITHM E(5, 12) • GOLDEN ANGLE θ = 137.5°</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
        {/* Left Column: Narrative & Philosophy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#D50032] bg-[#FFB3BA]/25 border border-[#D50032]/30 uppercase font-semibold">
            Mathematics of Groove & Natural Growth
          </div>

          <h2 className="font-['Instrument_Serif'] text-5xl sm:text-6xl text-[#18070F] leading-[0.95]">
            Euclidean matrices & <br />
            <span className="italic text-[#D50032]">golden ratio geometry</span>
          </h2>

          <p className="text-sm sm:text-base text-[#3F353A] leading-relaxed font-['Plus_Jakarta_Sans'] font-normal">
            Beat construction translates nature's generative growth patterns into time. Using Euclidean spacing, Fibonacci metric modulations, and human micro-delays modeled after sunflower phyllotaxis, rhythms breathe with mathematical precision and organic soul.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-[#F9C2C2]/60 bg-[#FFFFFF] shadow-sm">
              <div className="text-[10px] font-mono text-[#D50032] uppercase font-bold">Euclidean Pulses</div>
              <div className="text-[#18070F] text-xs font-bold mt-1">E(5, 12) & E(7, 16)</div>
              <div className="text-[#7A6E74] text-[11px] mt-0.5">Maximum even distribution across circles</div>
            </div>
            <div className="p-3.5 rounded-xl border border-[#F9C2C2]/60 bg-[#FFFFFF] shadow-sm">
              <div className="text-[10px] font-mono text-[#A50034] uppercase font-bold">Micro-Timing Offset</div>
              <div className="text-[#18070F] text-xs font-bold mt-1">-18.4ms Botanical Drag</div>
              <div className="text-[#7A6E74] text-[11px] mt-0.5">Unquantized organic swing feel</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Euclidean / Beat Architecture Sequencer */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl border border-[#F9C2C2]/70 bg-[#FFFFFF] shadow-xl space-y-5">
            <div className="flex flex-wrap justify-between items-center pb-3 border-b border-[#F9C2C2]/30 gap-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#D50032]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#18070F] uppercase">
                  Generative Rhythm Architecture Matrix
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-3.5 py-1 rounded-full text-xs font-mono border transition-all cursor-pointer shadow-sm flex items-center gap-1.5 ${
                    isPlaying
                      ? 'bg-[#D50032] text-white border-[#D50032] shadow-[0_0_12px_rgba(213,0,50,0.4)]'
                      : 'bg-[#FFB3BA]/25 text-[#A50034] border-[#D50032]/40 hover:bg-[#D50032] hover:text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-[#D50032]" />}
                  <span className="font-semibold">{isPlaying ? 'PAUSE CLOCK' : 'START CLOCK'}</span>
                </button>
              </div>
            </div>

            {/* Presets Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {PRESET_PATTERNS.map((pat, idx) => (
                <button
                  key={idx}
                  onClick={() => selectPreset(idx)}
                  className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                    activePresetIndex === idx
                      ? 'border-[#D50032] bg-[#D50032] text-white shadow-md'
                      : 'border-[#F9C2C2]/50 bg-[#F7F5F2] text-[#3F353A] hover:border-[#D50032]/40 hover:bg-white'
                  }`}
                >
                  <div className="text-xs font-semibold truncate">{pat.name}</div>
                  <div className="text-[10px] font-mono opacity-80 truncate">{pat.timeSig}</div>
                </button>
              ))}
            </div>

            {/* Interactive Step Matrix */}
            <div className="p-4 rounded-xl border border-[#F9C2C2]/50 bg-[#F7F5F2] space-y-3">
              <div className="text-xs font-mono text-[#7A6E74] mb-2 flex justify-between">
                <span>{PRESET_PATTERNS[activePresetIndex].description}</span>
                <span className="text-[#D50032] font-bold">NODE: {currentStep + 1} / 16</span>
              </div>

              {currentTracks.map((trk, trkIdx) => (
                <div key={trkIdx} className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono text-[#18070F] font-semibold">
                    <span style={{ color: trk.color === '#FFFFFF' ? '#A50034' : trk.color }}>{trk.name}</span>
                  </div>

                  {/* 16 Steps row */}
                  <div className="grid grid-cols-16 gap-1">
                    {trk.steps.map((isActive, stepIdx) => {
                      const isCurrent = currentStep === stepIdx;
                      return (
                        <button
                          key={stepIdx}
                          onClick={() => toggleStep(trkIdx, stepIdx)}
                          className={`h-7 rounded-sm transition-all border cursor-pointer relative ${
                            isActive
                              ? isCurrent
                                ? 'bg-[#D50032] border-[#D50032] scale-110 shadow-[0_0_12px_rgba(213,0,50,0.6)] z-10'
                                : 'border-transparent shadow-sm'
                              : isCurrent
                              ? 'bg-[#FFB3BA]/60 border-[#D50032]'
                              : 'bg-white border-[#F9C2C2]/60 hover:border-[#D50032]/40'
                          }`}
                          style={{
                            backgroundColor: isActive && !isCurrent ? (trk.color === '#FFFFFF' ? '#A50034' : trk.color) : undefined
                          }}
                          title={`Toggle pulse step ${stepIdx + 1}`}
                        >
                          {/* Quarter beat notch */}
                          {stepIdx % 4 === 0 && (
                            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-[#D50032]/40" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Swing & Micro-timing controls */}
              <div className="pt-3 border-t border-[#F9C2C2]/30 flex items-center justify-between text-[11px] font-mono text-[#3F353A]">
                <div className="flex items-center gap-3">
                  <span>GOLDEN SWING: {swingAmount}% (φ Ratio)</span>
                  <input
                    type="range"
                    min="50"
                    max="75"
                    value={swingAmount}
                    onChange={(e) => setSwingAmount(parseInt(e.target.value))}
                    className="accent-[#D50032] w-24 h-1.5 bg-white rounded cursor-pointer"
                  />
                </div>
                <span className="text-[#D50032] font-semibold">Click any node to sculpt groove geometry</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Specs Row */}
      <div className="relative z-20 flex justify-between items-center pt-4 border-t border-[#F9C2C2]/30 text-[11px] font-mono text-[#7A6E74]">
        <div className="flex items-center gap-4">
          <span>03 / 03 DISCIPLINES</span>
          <span>•</span>
          <span>BEAT CONSTRUCTION</span>
        </div>
        <div className="hover:text-[#D50032] cursor-pointer transition-colors font-semibold">
          GLIDE FORWARD TO MASTER ARCHIVE →
        </div>
      </div>
    </div>
  );
};

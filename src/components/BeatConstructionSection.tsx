import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sparkles, Shapes, Volume2, VolumeX, RotateCcw, Wand2, Sliders } from 'lucide-react';
import { beatMatrixAudio, jazzAudio, MatrixTrackData } from '../utils/audioEngine';

interface RhythmPattern {
  name: string;
  bpm: number;
  timeSig: string;
  description: string;
  tracks: MatrixTrackData[];
}

export const BeatConstructionSection: React.FC = () => {
  const PRESET_PATTERNS: RhythmPattern[] = [
    {
      name: 'London Broken Beat // Phyllotaxis',
      bpm: 134,
      timeSig: '4/4 Broken (Golden Drag)',
      description: 'Phyllotaxis-inspired kick displacement with 16th-note ghost snare drag and floating ride',
      tracks: [
        { name: 'Ride Cymbal φ', steps: [true, false, true, true, false, true, true, false, true, true, false, true, true, false, true, false], color: '#D50032', muted: false },
        { name: 'Ghost Snare', steps: [false, true, false, true, true, false, false, true, false, true, true, false, false, true, false, true], color: '#A50034', muted: false },
        { name: 'Sync Kick Sub', steps: [true, false, false, false, false, false, true, false, false, true, false, false, true, false, false, false], color: '#D50032', muted: false },
        { name: 'Hi-Hat Chick', steps: [false, false, true, false, false, false, true, false, false, false, true, false, false, false, true, false], color: '#7A6E74', muted: false }
      ]
    },
    {
      name: '5/4 Metric Modulation // Golden Pulse',
      bpm: 118,
      timeSig: '5/4 Quintuplet Swing',
      description: 'Golden ratio pulse with shifting metric center and natural micro-delayed backbeat',
      tracks: [
        { name: '5:4 Ride Wave', steps: [true, false, false, true, false, true, false, false, true, false, true, false, false, true, false, false], color: '#D50032', muted: false },
        { name: 'Rimshot Node', steps: [false, false, false, false, true, false, false, false, false, true, false, false, false, false, true, false], color: '#A50034', muted: false },
        { name: 'Felt Bass Pulse', steps: [true, false, false, false, false, false, true, false, false, false, false, true, false, false, false, false], color: '#D50032', muted: false },
        { name: 'Pedal Cymbal', steps: [false, true, false, false, true, false, false, true, false, false, true, false, false, true, false, false], color: '#7A6E74', muted: false }
      ]
    },
    {
      name: '7/8 Balkan-Afro // Fibonacci (2+2+3)',
      bpm: 142,
      timeSig: '7/8 Asymmetric',
      description: 'Fibonacci metric progression with elongated 3rd group providing forward organic flow',
      tracks: [
        { name: 'Bell Accent', steps: [true, false, true, false, true, false, false, true, false, true, false, true, false, false, true, false], color: '#D50032', muted: false },
        { name: 'Brush Tap', steps: [false, true, false, true, false, true, true, false, true, false, true, false, true, true, false, true], color: '#A50034', muted: false },
        { name: 'Sub Kick', steps: [true, false, false, false, true, false, false, true, false, false, false, true, false, false, true, false], color: '#D50032', muted: false },
        { name: 'Flower Tambourine', steps: [false, false, true, false, false, true, false, false, false, true, false, false, true, false, false, false], color: '#7A6E74', muted: false }
      ]
    }
  ];

  const [activePresetIndex, setActivePresetIndex] = useState<number>(0);
  const [currentTracks, setCurrentTracks] = useState<MatrixTrackData[]>(PRESET_PATTERNS[0].tracks);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(PRESET_PATTERNS[0].bpm);
  const [swingAmount, setSwingAmount] = useState<number>(61);

  // References for live callback updates
  const tracksRef = useRef(currentTracks);
  tracksRef.current = currentTracks;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      beatMatrixAudio.stop();
    };
  }, []);

  // Toggle Clock Playback
  const handleTogglePlay = () => {
    if (isPlaying) {
      beatMatrixAudio.stop();
      setIsPlaying(false);
    } else {
      // Pause background ambient audio to prevent clash
      if (jazzAudio.getIsPlaying()) {
        jazzAudio.stop();
      }
      beatMatrixAudio.start(currentTracks, bpm, swingAmount, (step) => {
        setCurrentStep(step);
      });
      setIsPlaying(true);
    }
  };

  // Load preset pattern
  const selectPreset = (index: number) => {
    setActivePresetIndex(index);
    const preset = PRESET_PATTERNS[index];
    const newTracks = preset.tracks.map(t => ({ ...t, steps: [...t.steps] }));
    setCurrentTracks(newTracks);
    setBpm(preset.bpm);
    setCurrentStep(0);

    if (isPlaying) {
      beatMatrixAudio.updateTracks(newTracks);
      beatMatrixAudio.updateBpm(preset.bpm);
    }
  };

  // Toggle single step on track with instant audio preview
  const toggleStep = (trackIdx: number, stepIdx: number) => {
    const updated = currentTracks.map((trk, tIdx) => {
      if (tIdx !== trackIdx) return trk;
      const copy = [...trk.steps];
      copy[stepIdx] = !copy[stepIdx];
      return { ...trk, steps: copy };
    });

    setCurrentTracks(updated);
    beatMatrixAudio.updateTracks(updated);

    // Audio audition: hear the sound when tapped
    if (!updated[trackIdx].muted) {
      beatMatrixAudio.triggerVoice(trackIdx);
    }
  };

  // Toggle Track Mute
  const toggleMute = (trackIdx: number) => {
    const updated = currentTracks.map((trk, tIdx) => {
      if (tIdx !== trackIdx) return trk;
      return { ...trk, muted: !trk.muted };
    });
    setCurrentTracks(updated);
    beatMatrixAudio.updateTracks(updated);
  };

  // Live BPM change
  const handleBpmChange = (newBpm: number) => {
    const clamped = Math.max(60, Math.min(200, newBpm));
    setBpm(clamped);
    beatMatrixAudio.updateBpm(clamped);
  };

  // Live Swing change
  const handleSwingChange = (newSwing: number) => {
    setSwingAmount(newSwing);
    beatMatrixAudio.updateSwing(newSwing);
  };

  // Reset / Clear grid
  const handleClearAll = () => {
    const cleared = currentTracks.map(trk => ({
      ...trk,
      steps: new Array(16).fill(false)
    }));
    setCurrentTracks(cleared);
    beatMatrixAudio.updateTracks(cleared);
  };

  // Euclidean Rhythm Generator algorithm (Bjorklund's algorithm E(k, n))
  const generateEuclidean = (k: number, n: number = 16): boolean[] => {
    const pattern = new Array(n).fill(false);
    for (let i = 0; i < k; i++) {
      const idx = Math.floor((i * n) / k);
      pattern[idx] = true;
    }
    return pattern;
  };

  const handleGenerateEuclidean = () => {
    const generated: MatrixTrackData[] = [
      { ...currentTracks[0], steps: generateEuclidean(11, 16) }, // E(11, 16) Ride polyrhythm
      { ...currentTracks[1], steps: generateEuclidean(5, 16) },  // E(5, 16) Snare syncopation
      { ...currentTracks[2], steps: generateEuclidean(4, 16) },  // E(4, 16) Euclidean Kick pulse
      { ...currentTracks[3], steps: generateEuclidean(8, 16) }   // E(8, 16) Offbeat hi-hat
    ];
    setCurrentTracks(generated);
    beatMatrixAudio.updateTracks(generated);
  };

  return (
    <div className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between p-6 sm:p-8 md:p-12 select-none overflow-y-auto no-scrollbar">
      {/* Background Section Accent with Crimson Glow */}
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 rounded-full bg-[#D50032]/5 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 flex justify-between items-start w-full max-w-7xl mx-auto mb-2">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full border border-[#D50032]/40 flex items-center justify-center bg-white shadow-[0_4px_15px_rgba(213,0,50,0.15)]">
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

        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[#F9C2C2]/60 bg-white/90 text-[11px] font-mono text-[#A50034] shadow-xs">
          <Shapes className="w-3.5 h-3.5 text-[#D50032]" />
          <span>EUCLIDEAN ALGORITHM E(5, 16) • GOLDEN ANGLE θ = 137.5°</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center w-full max-w-7xl mx-auto">
        {/* Left Column: Narrative & Philosophy */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#D50032] bg-[#FFB3BA]/25 border border-[#D50032]/30 uppercase font-semibold">
            Mathematics of Groove & Natural Growth
          </div>

          <h2 className="font-['Instrument_Serif'] text-4xl sm:text-5xl text-[#18070F] leading-[0.95]">
            Euclidean matrices & <br />
            <span className="italic text-[#D50032]">golden ratio geometry</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#4A4347] leading-relaxed font-['Plus_Jakarta_Sans'] font-normal">
            Beat construction translates nature's generative growth patterns into time. Using Euclidean spacing, Fibonacci metric modulations, and human micro-delays modeled after sunflower phyllotaxis, rhythms breathe with mathematical precision and organic soul.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-xs">
              <div className="text-[10px] font-mono text-[#D50032] uppercase font-bold">Euclidean Pulses</div>
              <div className="text-[#18070F] text-xs font-bold mt-0.5">E(5, 12) & E(7, 16)</div>
              <div className="text-[#7A6E74] text-[10px] mt-0.5">Maximum even distribution across circles</div>
            </div>
            <div className="p-3 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-xs">
              <div className="text-[10px] font-mono text-[#A50034] uppercase font-bold">Micro-Timing Offset</div>
              <div className="text-[#18070F] text-xs font-bold mt-0.5">-18.4ms Botanical Drag</div>
              <div className="text-[#7A6E74] text-[10px] mt-0.5">Unquantized organic swing feel</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Euclidean / Beat Architecture Sequencer */}
        <div className="lg:col-span-7">
          <div className="p-5 sm:p-6 rounded-2xl border border-[#F9C2C2]/70 bg-white shadow-xl space-y-4">
            {/* Top Toolbar */}
            <div className="flex flex-wrap justify-between items-center pb-3 border-b border-[#F9C2C2]/30 gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D50032]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#18070F] uppercase">
                  Generative Rhythm Architecture Matrix
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Euclidean Randomizer */}
                <button
                  onClick={handleGenerateEuclidean}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-[#F9C2C2]/70 bg-[#F7F5F2] hover:bg-white text-[#18070F] transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Generate Sacred Euclidean Pattern"
                >
                  <Wand2 className="w-3 h-3 text-[#D50032]" />
                  <span>EUCLIDEAN</span>
                </button>

                {/* Clear All */}
                <button
                  onClick={handleClearAll}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono border border-[#F9C2C2]/70 bg-[#F7F5F2] hover:bg-white text-[#7A6E74] hover:text-[#D50032] transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Clear all steps"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>CLEAR</span>
                </button>

                {/* Master Start / Pause Clock Button */}
                <button
                  onClick={handleTogglePlay}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono border transition-all cursor-pointer shadow-md flex items-center gap-2 ${
                    isPlaying
                      ? 'bg-[#D50032] text-white border-[#D50032] shadow-[0_0_15px_rgba(213,0,50,0.5)] animate-pulse'
                      : 'bg-white text-[#D50032] border-[#D50032] hover:bg-[#D50032] hover:text-white'
                  }`}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-[#D50032]" />}
                  <span className="font-bold tracking-wider">{isPlaying ? 'PAUSE CLOCK' : 'START CLOCK'}</span>
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
                  <div className="text-[10px] font-mono opacity-85 truncate mt-0.5">
                    {pat.timeSig} • {pat.bpm} BPM
                  </div>
                </button>
              ))}
            </div>

            {/* Interactive Step Matrix */}
            <div className="p-4 rounded-xl border border-[#F9C2C2]/50 bg-[#F7F5F2] space-y-3">
              <div className="text-xs font-mono text-[#7A6E74] flex justify-between items-center">
                <span className="truncate max-w-[280px] sm:max-w-md">{PRESET_PATTERNS[activePresetIndex].description}</span>
                <span className="text-[#D50032] font-bold text-xs bg-white px-2 py-0.5 rounded border border-[#F9C2C2]/60">
                  NODE: {currentStep + 1} / 16
                </span>
              </div>

              {currentTracks.map((trk, trkIdx) => (
                <div key={trkIdx} className="space-y-1">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="font-semibold text-[#18070F] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: trk.color }} />
                      <span>{trk.name}</span>
                    </span>

                    {/* Mute toggle button */}
                    <button
                      onClick={() => toggleMute(trkIdx)}
                      className={`text-[10px] px-2 py-0.5 rounded transition-all cursor-pointer border ${
                        trk.muted
                          ? 'bg-amber-100 text-amber-800 border-amber-300 font-bold'
                          : 'bg-white text-[#7A6E74] border-black/10 hover:border-[#D50032]'
                      }`}
                      title={trk.muted ? 'Unmute voice' : 'Mute voice'}
                    >
                      {trk.muted ? 'MUTED' : 'MUTE'}
                    </button>
                  </div>

                  {/* 16 Steps Row */}
                  <div className="grid grid-cols-16 gap-1">
                    {trk.steps.map((isActive, stepIdx) => {
                      const isCurrent = isPlaying && currentStep === stepIdx;
                      return (
                        <button
                          key={stepIdx}
                          onClick={() => toggleStep(trkIdx, stepIdx)}
                          className={`h-7 rounded-sm transition-all border cursor-pointer relative ${
                            isActive
                              ? isCurrent
                                ? 'bg-[#D50032] border-[#D50032] scale-110 shadow-[0_0_12px_rgba(213,0,50,0.8)] z-10'
                                : 'border-transparent shadow-xs'
                              : isCurrent
                              ? 'bg-[#FFB3BA]/70 border-[#D50032] scale-105'
                              : 'bg-white border-[#F9C2C2]/60 hover:border-[#D50032]/50 hover:bg-[#FAF9F5]'
                          }`}
                          style={{
                            backgroundColor: isActive && !isCurrent ? trk.color : undefined
                          }}
                          title={`Toggle ${trk.name} pulse ${stepIdx + 1}`}
                        >
                          {/* Quarter beat notch */}
                          {stepIdx % 4 === 0 && (
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-[#D50032]/40" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Swing & Tempo Controls */}
              <div className="pt-3 border-t border-[#F9C2C2]/40 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#3F353A]">
                {/* Swing Slider */}
                <div className="flex items-center gap-2">
                  <span>GOLDEN SWING: <strong className="text-[#A50034]">{swingAmount}%</strong> (φ)</span>
                  <input
                    type="range"
                    min="50"
                    max="75"
                    value={swingAmount}
                    onChange={(e) => handleSwingChange(parseInt(e.target.value))}
                    className="accent-[#D50032] w-20 h-1.5 bg-white rounded cursor-pointer"
                  />
                </div>

                {/* Live BPM Slider */}
                <div className="flex items-center gap-2">
                  <span>TEMPO: <strong className="text-[#D50032]">{bpm} BPM</strong></span>
                  <input
                    type="range"
                    min="70"
                    max="180"
                    value={bpm}
                    onChange={(e) => handleBpmChange(parseInt(e.target.value))}
                    className="accent-[#D50032] w-20 h-1.5 bg-white rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Specs Row */}
      <div className="relative z-20 flex justify-between items-center pt-3 border-t border-[#F9C2C2]/30 text-[11px] font-mono text-[#7A6E74] w-full max-w-7xl mx-auto mt-2">
        <div className="flex items-center gap-4">
          <span>03 / 03 DISCIPLINES</span>
          <span>•</span>
          <span>BEAT CONSTRUCTION</span>
        </div>
        <div className="text-[#D50032] font-semibold">
          LIVE WEB AUDIO SYNTHESIS • 16-NODE EUCLIDEAN SEQUENCER
        </div>
      </div>
    </div>
  );
};

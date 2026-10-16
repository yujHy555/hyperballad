import React, { useState } from 'react';
import { Users, Eye, Disc, Music, Sparkles, Radio, ArrowRight } from 'lucide-react';

interface CollaborationFormat {
  id: string;
  tag: string;
  title: string;
  role: string;
  description: string;
  elements: string[];
  signalNote: string;
}

export const CollaborationSection: React.FC = () => {
  const [activeFormat, setActiveFormat] = useState<number>(0);

  const formats: CollaborationFormat[] = [
    {
      id: 'visual-artists',
      tag: 'VISUAL ARTISTS',
      title: 'Live Generative & Projection Visualists',
      role: 'Real-Time Audio-Reactive Visuals × Acoustic Drum Triggers',
      description:
        'Each show pairs Rory Mayne’s live drumming with a guest visual artist. Transient sensors on the kick, snare, and cymbals feed directly into projection mapping rigs, analog liquid-light projectors, and Chladni geometry shaders—turning every polyrhythm into living visual architecture.',
      elements: [
        'Transient-reactive projection mapping & sacred geometry',
        'Live camera feeds, CRT rescanning & analog video synthesis',
        'Improvised visual-percussion dialogue in 3/5/11 meters'
      ],
      signalNote: 'MIDI / CV & Acoustic Transient Trigger Link'
    },
    {
      id: 'djs-selectors',
      tag: 'DJs & SELECTORS',
      title: 'Back-to-Back Live Drums × Turntables & Decks',
      role: 'Vinyl Selectors, Dubplates, Broken Beat & Hybrid Electronics',
      description:
        'Unscripted collisions between club culture and jazz percussion. Rory Mayne plays live acoustic drums alongside guest DJs—weaving broken beat, UK jazz-jungle, dub basslines, and rare groove vinyl into high-voltage, continuous live sets.',
      elements: [
        'Live acoustic pocket locked to vinyl & stem decks',
        'Real-time dub sirens, polyrhythmic cuts & tempo shifts',
        'Spontaneous B2B rhythmic call-and-response'
      ],
      signalNote: 'Unquantized Human Pocket × Club Sub-Bass'
    },
    {
      id: 'musicians',
      tag: 'LIVE MUSICIANS',
      title: 'Improvising Instrumentalists & Sonic Architects',
      role: 'Horns, Upright/Electric Bass, Rhodes & Modular Synths',
      description:
        'Rotating lineups of guest musicians join Rory on stage to form one-night-only ensembles. Fromtenor saxophonists and fretless bassists to modular synth performers, each show explores fresh harmonic territory anchored by driving acoustic grooves.',
      elements: [
        'Intimate duos, trios & expanded electric collectives',
        'Odd-meter 3/4, 5/4 & 11/8 rhythmic explorations',
        'Zero pre-recorded backing tracks—100% live interplay'
      ],
      signalNote: 'Dynamic Stage Mix • ppp Brush to fff Rimshot'
    },
    {
      id: 'regular-guests',
      tag: 'REGULAR GUESTS',
      title: 'The Hyperballad Resident Family & Special Sit-Ins',
      role: 'Returning Collaborators & Unannounced Late-Night Guests',
      description:
        'Alongside new featured artists at every date, Hyperballad hosts a core circle of regular guests—trusted musicians, vocalists, selectors, and visualists who drop in for evolving residencies and spontaneous multi-artist finales.',
      elements: [
        'Rotating resident roster returning across the season',
        'Unannounced special guest sit-ins during late sets',
        'Cross-disciplinary jams uniting DJ, musician & visualist'
      ],
      signalNote: '3/5/11 Collective Residency Format'
    }
  ];

  const current = formats[activeFormat];

  return (
    <div className="relative w-screen h-[100dvh] flex-shrink-0 flex flex-col justify-between pt-3 sm:pt-5 md:pt-7 pb-16 sm:pb-20 px-4 sm:px-10 md:px-14 lg:px-20 select-none overflow-y-auto no-scrollbar">
      {/* Subtle Background Accent */}
      <div className="absolute left-1/4 top-1/4 w-80 h-80 rounded-full bg-[#D50032]/5 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 flex justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D50032]/40 flex items-center justify-center bg-white shadow-xs">
            <span className="font-mono text-[11px] sm:text-xs text-[#D50032] font-bold">01</span>
          </div>
          <div>
            <span className="font-mono tracking-[0.2em] sm:tracking-[0.26em] text-[10px] sm:text-[11px] text-[#A50034] font-semibold uppercase block">
              Discipline 01 • Live Show Concept
            </span>
            <span className="font-['Cinzel'] text-xs sm:text-sm tracking-wider text-[#18070F] font-semibold">
              COLLABORATION // RORY MAYNE × VISUAL ARTISTS, MUSICIANS & DJs
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2.5 px-3 py-1 rounded-full border border-[#F9C2C2]/60 bg-white/90 text-[10px] lg:text-[11px] font-mono text-[#A50034] shadow-xs">
          <Users className="w-3.5 h-3.5 text-[#D50032]" />
          <span>DRUMMER RORY MAYNE + ROTATING LINEUP & REGULAR GUESTS</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 my-auto items-center w-full max-w-7xl mx-auto py-1 sm:py-2">
        {/* Left Column: Narrative & Show Philosophy */}
        <div className="lg:col-span-5 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest text-[#D50032] bg-[#FFB3BA]/25 border border-[#D50032]/30 uppercase font-semibold">
            <Sparkles className="w-3 h-3 text-[#D50032]" />
            <span>Every Show A New Alchemy • 3/5/11</span>
          </div>

          <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-5xl xl:text-[3.4rem] text-[#18070F] leading-[0.95]">
            Rory Mayne live with <br />
            <span className="italic text-[#D50032]">artists, musicians & DJs</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#3F353A] leading-relaxed font-['Plus_Jakarta_Sans'] font-normal">
            Every <strong className="text-[#18070F] font-semibold">hyperballad 3/5/11</strong> show is a living, one-off convergence. Anchored by drummer <strong className="text-[#A50034] font-semibold">Rory Mayne</strong> playing live acoustic & hybrid percussion, each night brings together a curated mix of <strong className="text-[#18070F] font-semibold">visual artists, live musicians, and DJs</strong>—joined by a rotating family of <strong className="text-[#18070F] font-semibold">regular special guests</strong>.
          </p>

          {/* 3-Pillar Show Formula Cards */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-1">
            <div className="p-2.5 sm:p-3 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-2xs">
              <div className="text-[9px] sm:text-[10px] font-mono text-[#D50032] uppercase font-bold truncate">The Anchor</div>
              <div className="text-[#18070F] text-[11px] sm:text-xs font-bold mt-0.5">Rory Mayne</div>
              <div className="text-[#7A6E74] text-[9px] sm:text-[10px] mt-0.5 leading-tight">Live drums & 3/5/11 pocket every show</div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-2xs">
              <div className="text-[9px] sm:text-[10px] font-mono text-[#A50034] uppercase font-bold truncate">The Mix</div>
              <div className="text-[#18070F] text-[11px] sm:text-xs font-bold mt-0.5">Visuals • DJ • Band</div>
              <div className="text-[#7A6E74] text-[9px] sm:text-[10px] mt-0.5 leading-tight">New cross-media lineup each night</div>
            </div>

            <div className="p-2.5 sm:p-3 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-2xs">
              <div className="text-[9px] sm:text-[10px] font-mono text-[#D50032] uppercase font-bold truncate">The Circle</div>
              <div className="text-[#18070F] text-[11px] sm:text-xs font-bold mt-0.5">Regular Guests</div>
              <div className="text-[#7A6E74] text-[9px] sm:text-[10px] mt-0.5 leading-tight">Resident artists & spontaneous sit-ins</div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Show Collaboration Matrix */}
        <div className="lg:col-span-7 w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl border border-[#F9C2C2]/70 bg-white shadow-xl space-y-3 sm:space-y-3.5">
            {/* Top Bar */}
            <div className="flex flex-wrap justify-between items-center pb-2.5 border-b border-[#F9C2C2]/30 gap-2">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D50032]" />
                <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-wider text-[#18070F] uppercase">
                  Live Show Architecture // Rotating Collaborators
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-[#D50032] bg-[#FFB3BA]/25 px-2.5 py-0.5 rounded-full border border-[#D50032]/30 font-semibold">
                Rory Mayne × Featured Guests
              </span>
            </div>

            {/* 4 Interactive Collaborator Role Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
              {formats.map((fmt, idx) => {
                const Icon = idx === 0 ? Eye : idx === 1 ? Disc : idx === 2 ? Music : Users;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setActiveFormat(idx)}
                    className={`p-2 sm:p-2.5 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                      activeFormat === idx
                        ? 'border-[#D50032] bg-[#D50032] text-white shadow-md'
                        : 'border-[#F9C2C2]/50 bg-[#F7F5F2] text-[#3F353A] hover:border-[#D50032]/40 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-[9px] font-mono uppercase tracking-wider opacity-85 font-bold">
                        0{idx + 1}
                      </span>
                      <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-90" />
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-mono font-bold truncate">
                      {fmt.tag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Collaboration Spotlight Card */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-[#F9C2C2]/50 bg-[#F7F5F2] space-y-2.5 sm:space-y-3">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-['Instrument_Serif'] text-[#18070F] leading-tight">
                    {current.title}
                  </h3>
                  <div className="text-[10px] sm:text-[11px] font-mono text-[#A50034] font-semibold mt-0.5">
                    {current.role}
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono bg-white border border-[#D50032]/30 text-[#D50032] font-semibold">
                  {current.signalNote}
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-[#3F353A] leading-relaxed font-normal">
                {current.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                {current.elements.map((el, i) => (
                  <div
                    key={i}
                    className="p-2 rounded-lg bg-white border border-[#F9C2C2]/50 text-[10px] sm:text-[11px] text-[#18070F] font-mono flex items-start gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D50032] mt-1 flex-shrink-0" />
                    <span className="leading-snug">{el}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Stage Signal Chain Banner */}
            <div className="p-2.5 sm:p-3 rounded-xl border border-[#D50032]/25 bg-[#FFB3BA]/15 flex flex-wrap items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[#18070F] flex-wrap">
                <span className="px-2 py-0.5 rounded bg-[#D50032] text-white font-bold">RORY MAYNE [DRUMS]</span>
                <ArrowRight className="w-3 h-3 text-[#D50032]" />
                <span className="px-2 py-0.5 rounded bg-white border border-[#F9C2C2] text-[#A50034] font-semibold">VISUAL ARTISTS</span>
                <span>+</span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#F9C2C2] text-[#A50034] font-semibold">MUSICIANS / DJs</span>
                <span>+</span>
                <span className="px-2 py-0.5 rounded bg-white border border-[#F9C2C2] text-[#18070F] font-semibold">REGULAR GUESTS</span>
              </div>
              <span className="text-[#A50034] font-bold hidden sm:inline">UNSCRIPTED LIVE FORMAT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Specs Row */}
      <div className="relative z-20 flex justify-between items-center pt-2 sm:pt-3 border-t border-[#F9C2C2]/30 text-[10px] sm:text-[11px] font-mono text-[#7A6E74] w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4">
          <span>01 / 04 DISCIPLINES</span>
          <span>•</span>
          <span>LIVE COLLABORATION & GUESTS</span>
        </div>
        <div className="text-[#D50032] font-semibold">
          RORY MAYNE × VISUALS / MUSICIANS / DJs
        </div>
      </div>
    </div>
  );
};

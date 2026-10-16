import React, { useState } from 'react';
import { MapPin, Zap, Music, Award, Waves, Film, Volume2, VolumeX } from 'lucide-react';

interface LivePerformance {
  venue: string;
  city: string;
  ensemble: string;
  format: string;
  highlight: string;
  dynamics: string;
}

export const PerformanceSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'video' | 'venues'>('video');
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  const performances: LivePerformance[] = [
    {
      venue: "Ronnie Scott's Jazz Club",
      city: 'London, UK',
      ensemble: 'Hyperballad Trio + Tenor Sax',
      format: 'Main Stage Residency',
      highlight: 'Acoustic trio improvisation over 11/8 metric changes with brush dynamic modulation',
      dynamics: 'ppp to fff dynamic range'
    },
    {
      venue: 'Blue Note Tokyo',
      city: 'Aoyama, Tokyo',
      ensemble: 'Contemporary Octet',
      format: 'International Tour Feature',
      highlight: 'Dual drummer metric interplay, polyrhythmic ride accents over prepared piano',
      dynamics: 'Orchestral brass & rimshot punch'
    },
    {
      venue: 'North Sea Jazz Festival',
      city: 'Rotterdam, Netherlands',
      ensemble: 'Electric Jazz Collective',
      format: 'Hudson Arena Stage',
      highlight: 'Unscripted 22-minute open-meter drum suite merging West African polyrhythms and broken beat',
      dynamics: 'High energy acoustic projection'
    },
    {
      venue: 'Village Vanguard',
      city: 'New York City, USA',
      ensemble: 'Acoustic Quartet',
      format: 'Late Night Sessions',
      highlight: 'Pure acoustic cymbal colorations, delicate brush sweeps in historic subterranean wedge acoustics',
      dynamics: 'Micro-tonal acoustic detail'
    }
  ];

  return (
    <div className="relative w-screen h-[100dvh] flex-shrink-0 flex flex-col justify-between pt-3 sm:pt-5 md:pt-7 pb-16 sm:pb-20 px-4 sm:px-10 md:px-14 lg:px-20 select-none overflow-y-auto no-scrollbar">
      {/* Background Section Accent */}
      <div className="absolute left-1/3 bottom-10 w-96 h-96 rounded-full bg-[#A50034]/5 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 flex justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D50032]/40 flex items-center justify-center bg-white shadow-[0_4px_15px_rgba(213,0,50,0.15)]">
            <span className="font-mono text-[11px] sm:text-xs text-[#D50032] font-bold">03</span>
          </div>
          <div>
            <span className="font-mono tracking-[0.2em] sm:tracking-[0.26em] text-[10px] sm:text-[11px] text-[#A50034] font-semibold uppercase block">
              Discipline 03
            </span>
            <span className="font-['Cinzel'] text-xs sm:text-sm tracking-wider text-[#18070F] font-semibold">
              LIVE PERFORMANCE & ORGANIC KINETICS
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2.5 px-3 py-1 rounded-full border border-[#F9C2C2]/60 bg-white/90 text-[10px] lg:text-[11px] font-mono text-[#A50034] shadow-xs">
          <Waves className="w-3.5 h-3.5 text-[#D50032]" />
          <span>ACOUSTIC DYNAMICS: FROM WIRE BRUSH WHISPER TO TIDAL RIMSHOT</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 my-auto items-center w-full max-w-7xl mx-auto py-1 sm:py-2">
        {/* Left Column: Narrative & Philosophy */}
        <div className="lg:col-span-5 space-y-3 sm:space-y-4">
          <div className="inline-block px-3 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest text-[#D50032] bg-[#FFB3BA]/25 border border-[#D50032]/30 uppercase font-semibold">
            Living Kinetic Ecosystem
          </div>

          <h2 className="font-['Instrument_Serif'] text-3xl sm:text-4xl md:text-5xl xl:text-[3.4rem] text-[#18070F] leading-[0.95]">
            Unscripted dialogue & <br />
            <span className="italic text-[#D50032]">organic dynamic flow</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#3F353A] leading-relaxed font-['Plus_Jakarta_Sans'] font-normal">
            On the live stage, jazz drumming is a living conversation that mimics nature's tides. Balancing explosive crescendo projections with whispering pianissimo brushes, every groove adapts in real time to the hall's natural reverberant geometry.
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-2.5 sm:p-3 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-2xs">
              <div className="text-[9px] sm:text-[10px] font-mono text-[#D50032] uppercase font-bold">Dynamic Range</div>
              <div className="text-[#18070F] text-[11px] sm:text-xs font-bold mt-0.5">ppp to fff Nuance</div>
              <div className="text-[#7A6E74] text-[10px] mt-0.5 leading-tight">Wire brush stirs to physical ride crashes</div>
            </div>
            <div className="p-2.5 sm:p-3 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-2xs">
              <div className="text-[9px] sm:text-[10px] font-mono text-[#A50034] uppercase font-bold">Ensemble Kinetics</div>
              <div className="text-[#18070F] text-[11px] sm:text-xs font-bold mt-0.5">Intimate Trio to Octet</div>
              <div className="text-[#7A6E74] text-[10px] mt-0.5 leading-tight">Harmonic anchor and kinetic soloist</div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Video Footage Player & Tour Showcase */}
        <div className="lg:col-span-7 w-full">
          <div className="p-3.5 sm:p-5 rounded-2xl border border-[#F9C2C2]/70 bg-white shadow-xl space-y-2.5 sm:space-y-3">
            {/* View Mode Switcher */}
            <div className="flex justify-between items-center pb-2 border-b border-[#F9C2C2]/30">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('video')}
                  className={`px-3 py-1 rounded-xl text-[11px] sm:text-xs font-mono tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                    viewMode === 'video'
                      ? 'bg-[#D50032] text-white font-bold shadow-md'
                      : 'bg-[#F7F5F2] text-[#3F353A] border border-[#F9C2C2]/50 hover:bg-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>STAGE VIDEO [hb_05_1]</span>
                </button>

                <button
                  onClick={() => setViewMode('venues')}
                  className={`px-3 py-1 rounded-xl text-[11px] sm:text-xs font-mono tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                    viewMode === 'venues'
                      ? 'bg-[#D50032] text-white font-bold shadow-md'
                      : 'bg-[#F7F5F2] text-[#3F353A] border border-[#F9C2C2]/50 hover:bg-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>TOUR RESIDENCIES</span>
                </button>
              </div>

              {viewMode === 'video' && (
                <button
                  onClick={() => setIsVideoMuted(!isVideoMuted)}
                  className={`px-2.5 py-1 rounded-full border text-[10px] font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
                    isVideoMuted
                      ? 'bg-[#F7F5F2] border-[#F9C2C2]/60 text-[#3F353A] hover:text-[#D50032]'
                      : 'bg-[#D50032] text-white border-[#D50032]'
                  }`}
                >
                  {isVideoMuted ? <VolumeX className="w-3 h-3 text-[#A50034]" /> : <Volume2 className="w-3 h-3 text-white" />}
                  <span>{isVideoMuted ? 'UNMUTE AUDIO' : 'MUTED'}</span>
                </button>
              )}
            </div>

            {/* Mode 1: Live Video Footage Player */}
            {viewMode === 'video' ? (
              <div className="space-y-2">
                <div className="relative rounded-xl overflow-hidden border border-[#F9C2C2]/60 shadow-[0_12px_30px_rgba(165,0,52,0.08)] bg-black aspect-video max-h-[34vh] 2xl:max-h-[40vh] w-full mx-auto group">
                  <video
                    src="/videos/hb_05_1.mp4"
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur px-2.5 py-0.5 rounded-md border border-[#F9C2C2]/80 text-[9px] sm:text-[10px] font-mono text-[#18070F] flex items-center gap-1.5 pointer-events-none shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D50032]" />
                    <span className="font-bold text-[#A50034]">LIVE DRUMMING CAPTURE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-[#7A6E74] px-1">
                  <span>File: videos/hb_05_1.mp4 • Natural Room Acoustics</span>
                  <span className="text-[#D50032] font-semibold">100% Unquantized Human Pocket</span>
                </div>
              </div>
            ) : (
              /* Mode 2: Tour Residencies */
              <div className="space-y-3">
                {/* Performance Venue Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {performances.map((perf, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                        activeTab === index
                          ? 'border-[#D50032] bg-[#D50032] text-white shadow-md'
                          : 'border-[#F9C2C2]/50 bg-[#F7F5F2] text-[#3F353A] hover:border-[#D50032]/40 hover:bg-white'
                      }`}
                    >
                      <div className="text-[11px] sm:text-xs font-semibold truncate">{perf.venue}</div>
                      <div className="text-[9px] sm:text-[10px] font-mono opacity-80 truncate">{perf.city}</div>
                    </button>
                  ))}
                </div>

                {/* Active Venue Details Spotlight */}
                <div className="p-3.5 sm:p-4 rounded-xl border border-[#F9C2C2]/50 bg-[#F7F5F2] space-y-2.5 sm:space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl font-['Instrument_Serif'] text-[#18070F]">
                        {performances[activeTab].venue}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] font-mono text-[#A50034] mt-0.5">
                        <MapPin className="w-3 h-3 text-[#D50032]" />
                        <span>{performances[activeTab].city}</span>
                        <span>•</span>
                        <span>{performances[activeTab].format}</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono bg-[#FFB3BA]/30 border border-[#D50032]/30 text-[#A50034] font-semibold">
                      {performances[activeTab].ensemble}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-[#3F353A] leading-relaxed font-normal">
                    {performances[activeTab].highlight}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-4 text-[10px] sm:text-[11px] font-mono text-[#7A6E74] border-t border-[#F9C2C2]/30">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-[#D50032]" />
                      <span>Dynamics: {performances[activeTab].dynamics}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Music className="w-3 h-3 text-[#A50034]" />
                      <span>Acoustic Room Projection</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Press snippet */}
            <div className="p-2.5 sm:p-3 rounded-xl border border-[#D50032]/30 bg-[#FFB3BA]/20 text-[11px] sm:text-xs text-[#A50034] font-normal italic flex items-center justify-between gap-2">
              <span>"Fluid, intricate pattern time with the brush finesse of Paul Motian and the kinetic authority of Tony Williams."</span>
              <span className="text-[9px] sm:text-[10px] font-mono not-italic text-[#7A6E74] uppercase whitespace-nowrap">— London Jazz Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Specs Row */}
      <div className="relative z-20 flex justify-between items-center pt-2 sm:pt-3 border-t border-[#F9C2C2]/30 text-[10px] sm:text-[11px] font-mono text-[#7A6E74] w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-4">
          <span>03 / 04 DISCIPLINES</span>
          <span>•</span>
          <span>LIVE PERFORMANCE</span>
        </div>
        <div className="hover:text-[#D50032] cursor-pointer transition-colors font-semibold">
          GLIDE FORWARD TO 04 BEAT CONSTRUCTION →
        </div>
      </div>
    </div>
  );
};

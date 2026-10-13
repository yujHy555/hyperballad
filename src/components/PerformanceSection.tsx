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
    <div className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden">
      {/* Background Section Accent */}
      <div className="absolute left-1/3 bottom-10 w-96 h-96 rounded-full bg-[#A50034]/5 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-[#D50032]/40 flex items-center justify-center bg-white shadow-[0_4px_15px_rgba(213,0,50,0.15)]">
            <span className="font-mono text-xs text-[#D50032] font-bold">02</span>
          </div>
          <div>
            <span className="font-mono tracking-[0.28em] text-xs text-[#A50034] font-semibold uppercase block">
              Discipline 02
            </span>
            <span className="font-['Cinzel'] text-sm tracking-wider text-[#18070F] font-semibold">
              LIVE PERFORMANCE & ORGANIC KINETICS
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[#F9C2C2]/60 bg-white/90 text-[11px] font-mono text-[#A50034] shadow-xs">
          <Waves className="w-3.5 h-3.5 text-[#D50032]" />
          <span>ACOUSTIC DYNAMICS: FROM WIRE BRUSH WHISPER TO TIDAL RIMSHOT</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center">
        {/* Left Column: Narrative & Philosophy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-block px-3.5 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#D50032] bg-[#FFB3BA]/25 border border-[#D50032]/30 uppercase font-semibold">
            Living Kinetic Ecosystem
          </div>

          <h2 className="font-['Instrument_Serif'] text-5xl sm:text-6xl text-[#18070F] leading-[0.95]">
            Unscripted dialogue & <br />
            <span className="italic text-[#D50032]">organic dynamic flow</span>
          </h2>

          <p className="text-sm sm:text-base text-[#3F353A] leading-relaxed font-['Plus_Jakarta_Sans'] font-normal">
            On the live stage, jazz drumming is a living conversation that mimics nature's tides. Balancing explosive crescendo projections with whispering pianissimo brushes, every groove adapts in real time to the hall's natural reverberant geometry.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-sm">
              <div className="text-[10px] font-mono text-[#D50032] uppercase font-bold">Dynamic Range</div>
              <div className="text-[#18070F] text-xs font-bold mt-1">ppp to fff Nuance</div>
              <div className="text-[#7A6E74] text-[11px] mt-0.5">Wire brush stirs to physical ride crashes</div>
            </div>
            <div className="p-3.5 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-sm">
              <div className="text-[10px] font-mono text-[#A50034] uppercase font-bold">Ensemble Kinetics</div>
              <div className="text-[#18070F] text-xs font-bold mt-1">Intimate Trio to Octet</div>
              <div className="text-[#7A6E74] text-[11px] mt-0.5">Harmonic anchor and kinetic soloist</div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Video Footage Player & Tour Showcase */}
        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl border border-[#F9C2C2]/70 bg-white shadow-xl space-y-4">
            {/* View Mode Switcher */}
            <div className="flex justify-between items-center pb-3 border-b border-[#F9C2C2]/30">
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('video')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
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
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
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
                  className={`px-3 py-1 rounded-full border text-[10px] font-mono flex items-center gap-1.5 cursor-pointer transition-colors ${
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
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden border border-[#F9C2C2]/60 shadow-[0_15px_35px_rgba(165,0,52,0.08)] bg-black aspect-video group">
                  <video
                    src="/videos/hb_05_1.mp4"
                    autoPlay
                    loop
                    muted={isVideoMuted}
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md border border-[#F9C2C2]/80 text-[10px] font-mono text-[#18070F] flex items-center gap-2 pointer-events-none shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#D50032]" />
                    <span className="font-bold text-[#A50034]">LIVE DRUMMING CAPTURE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-mono text-[#7A6E74] px-1">
                  <span>File: videos/hb_05_1.mp4 • Natural Room Acoustics</span>
                  <span className="text-[#D50032] font-semibold">100% Unquantized Human Pocket</span>
                </div>
              </div>
            ) : (
              /* Mode 2: Tour Residencies */
              <div className="space-y-4">
                {/* Performance Venue Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {performances.map((perf, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                        activeTab === index
                          ? 'border-[#D50032] bg-[#D50032] text-white shadow-md'
                          : 'border-[#F9C2C2]/50 bg-[#F7F5F2] text-[#3F353A] hover:border-[#D50032]/40 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-semibold truncate">{perf.venue}</div>
                      <div className="text-[10px] font-mono opacity-80 truncate">{perf.city}</div>
                    </button>
                  ))}
                </div>

                {/* Active Venue Details Spotlight */}
                <div className="p-5 rounded-xl border border-[#F9C2C2]/50 bg-[#F7F5F2] space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-['Instrument_Serif'] text-[#18070F]">
                        {performances[activeTab].venue}
                      </h3>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#A50034] mt-1">
                        <MapPin className="w-3 h-3 text-[#D50032]" />
                        <span>{performances[activeTab].city}</span>
                        <span>•</span>
                        <span>{performances[activeTab].format}</span>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-[#FFB3BA]/30 border border-[#D50032]/30 text-[#A50034] font-semibold">
                      {performances[activeTab].ensemble}
                    </span>
                  </div>

                  <div className="text-sm text-[#3F353A] leading-relaxed font-normal">
                    {performances[activeTab].highlight}
                  </div>

                  <div className="pt-2 flex flex-wrap gap-4 text-[11px] font-mono text-[#7A6E74] border-t border-[#F9C2C2]/30">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#D50032]" />
                      <span>Dynamics: {performances[activeTab].dynamics}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-[#A50034]" />
                      <span>Acoustic Room Projection</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Press snippet */}
            <div className="p-3.5 rounded-xl border border-[#D50032]/30 bg-[#FFB3BA]/20 text-xs text-[#A50034] font-normal italic flex items-center justify-between">
              <span>"Fluid, intricate pattern time with the brush finesse of Paul Motian and the kinetic authority of Tony Williams."</span>
              <span className="text-[10px] font-mono not-italic text-[#7A6E74] uppercase ml-2">— London Jazz Review</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Specs Row */}
      <div className="relative z-20 flex justify-between items-center pt-4 border-t border-[#F9C2C2]/30 text-[11px] font-mono text-[#7A6E74]">
        <div className="flex items-center gap-4">
          <span>02 / 03 DISCIPLINES</span>
          <span>•</span>
          <span>LIVE PERFORMANCE</span>
        </div>
        <div className="hover:text-[#D50032] cursor-pointer transition-colors font-semibold">
          GLIDE FORWARD TO 03 BEAT CONSTRUCTION →
        </div>
      </div>
    </div>
  );
};

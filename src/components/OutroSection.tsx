import React, { useState } from 'react';
import { Send, Check, Disc, ArrowLeft } from 'lucide-react';

interface OutroSectionProps {
  onBackToStart: () => void;
}

export const OutroSection: React.FC<OutroSectionProps> = ({ onBackToStart }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Studio Session (Remote Stems)',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="relative w-screen h-[100dvh] flex-shrink-0 flex flex-col justify-between p-4 sm:p-8 md:p-12 select-none overflow-y-auto no-scrollbar">
      {/* Background Section Accent */}
      <div className="absolute left-1/4 top-1/3 w-96 h-96 rounded-full bg-[#A50034]/5 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-20 flex justify-between items-start w-full max-w-7xl mx-auto mb-2 sm:mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#D50032]/40 flex items-center justify-center bg-white shadow-xs">
            <span className="font-mono text-xs text-[#D50032] font-bold">HB</span>
          </div>
          <div>
            <span className="font-mono tracking-[0.22em] sm:tracking-[0.28em] text-[10px] sm:text-xs text-[#A50034] font-semibold uppercase block">
              Inquiries & Master Archive
            </span>
            <span className="font-['Cinzel'] text-xs sm:text-sm tracking-wider text-[#18070F] font-semibold">
              HYPERBALLAD SESSIONS // NATURE & PATTERNS
            </span>
          </div>
        </div>

        <button
          onClick={onBackToStart}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#F9C2C2]/60 bg-white hover:border-[#D50032] text-[11px] sm:text-xs font-mono tracking-wider flex items-center gap-1.5 sm:gap-2 text-[#3F353A] hover:text-[#D50032] transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO START</span>
        </button>
      </div>

      {/* Center Grid */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 my-auto items-center w-full max-w-7xl mx-auto">
        {/* Left Column: Gear Rider (HIDDEN on mobile to simplify greatly!) */}
        <div className="hidden lg:block lg:col-span-5 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#D50032] bg-[#FFB3BA]/25 border border-[#D50032]/30 uppercase font-semibold">
            Natural Materials & Resonant Shells
          </div>

          <h2 className="font-['Instrument_Serif'] text-4xl sm:text-5xl text-[#18070F] leading-[0.95]">
            Book a session & <br />
            <span className="italic text-[#D50032]">collaborate</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#4A4347] leading-relaxed font-['Plus_Jakarta_Sans'] font-normal">
            Available worldwide for in-person studio recording sessions, remote multitrack drum tracking, international tours, masterclasses, and custom beat sound design.
          </p>

          {/* Master Gear Rider */}
          <div className="p-4 rounded-xl border border-[#F9C2C2]/60 bg-white shadow-xs space-y-2">
            <div className="text-xs font-mono font-bold text-[#A50034] uppercase tracking-wider flex items-center gap-2">
              <Disc className="w-3.5 h-3.5 text-[#D50032]" />
              <span>Studio Arsenal</span>
            </div>
            <ul className="text-[11px] text-[#3F353A] space-y-1 font-mono">
              <li>• 1968 Gretsch Round Badge (Jasper 6-ply)</li>
              <li>• Craviotto Solid Single-Ply Steam-Bent Maple</li>
              <li>• Istanbul Agop 22" 30th Anniversary Hand-Lathed Rides</li>
              <li>• Coles 4038 Ribbon Blumlein Pair, Neumann U67, API 312 Preamps</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Contact & Session Inquiry Form (Takes 100% on mobile) */}
        <div className="col-span-1 lg:col-span-7 w-full">
          <div className="p-4 sm:p-6 md:p-8 rounded-2xl border border-[#F9C2C2]/70 bg-white shadow-xl space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center pb-2.5 sm:pb-3 border-b border-[#F9C2C2]/30">
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-wider text-[#18070F] uppercase">
                Direct Session Inquiry
              </span>
              <span className="text-[10px] font-mono text-[#D50032] bg-[#FFB3BA]/25 px-2.5 py-0.5 rounded-full border border-[#D50032]/30 font-semibold">
                Response &lt;24h
              </span>
            </div>

            {submitted ? (
              <div className="p-6 text-center space-y-2 rounded-xl bg-[#FFB3BA]/20 border border-[#D50032]/40">
                <Check className="w-7 h-7 text-[#D50032] mx-auto" />
                <h4 className="text-base sm:text-lg font-['Instrument_Serif'] text-[#18070F]">Inquiry Received</h4>
                <p className="text-[11px] font-mono text-[#7A6E74]">
                  Thank you. Your session request has been logged. Let's make rhythm happen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono text-[#7A6E74] mb-1 uppercase font-semibold">
                      Name / Artist
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Miles Evans"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F5F2] border border-[#F9C2C2]/60 text-[#18070F] text-xs font-mono focus:border-[#D50032] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-[11px] font-mono text-[#7A6E74] mb-1 uppercase font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. artist@blue-note.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#F7F5F2] border border-[#F9C2C2]/60 text-[#18070F] text-xs font-mono focus:border-[#D50032] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono text-[#7A6E74] mb-1 uppercase font-semibold">
                    Discipline
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5F2] border border-[#F9C2C2]/60 text-[#18070F] text-xs font-mono focus:border-[#D50032] focus:outline-hidden"
                  >
                    <option value="Studio Session (Remote Stems)">01. Studio Session (Remote Multitrack Stems)</option>
                    <option value="Studio Session (In-Person)">01. Studio Session (In-Person)</option>
                    <option value="Live Performance / Touring">02. Live Performance & Touring</option>
                    <option value="Beat Construction / Custom Grooves">03. Beat Construction & Sound Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono text-[#7A6E74] mb-1 uppercase font-semibold">
                    Project Vision / Tempo / Links
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Tell me about the track, reference artists, tempo, or multitrack requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F5F2] border border-[#F9C2C2]/60 text-[#18070F] text-xs font-mono focus:border-[#D50032] focus:outline-hidden resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-[#D50032] to-[#A50034] text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#D50032]/20 border border-[#FFB3BA]/40"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Session Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer Specs Row */}
      <div className="relative z-20 flex justify-between items-center pt-2 sm:pt-3 border-t border-[#F9C2C2]/30 text-[10px] sm:text-[11px] font-mono text-[#7A6E74] w-full max-w-7xl mx-auto mt-2">
        <div>HYPERBALLAD © 2026 • PATTERN ARCHITECTURE</div>
        <div className="flex gap-3 sm:gap-4">
          <span className="hover:text-[#D50032] cursor-pointer transition-colors">INSTAGRAM</span>
          <span className="hover:text-[#D50032] cursor-pointer transition-colors">BANDCAMP</span>
          <span className="hover:text-[#D50032] cursor-pointer transition-colors">SPOTIFY</span>
        </div>
      </div>
    </div>
  );
};

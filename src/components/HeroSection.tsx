import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ArrowRight, Disc, Activity, Sparkles, Maximize2 } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  audioActive: boolean;
  onToggleAudio: () => void;
  isMobile?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  audioActive,
  onToggleAudio,
  isMobile = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  const toggleVideoPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsVideoMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="relative w-screen h-[100dvh] flex-shrink-0 flex flex-col justify-between p-4 sm:p-8 md:p-12 select-none overflow-y-auto no-scrollbar">
      {/* Soft Ambient Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#F7F6F3]/40 to-[#F7F6F3] pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-20 flex justify-between items-center w-full max-w-7xl mx-auto mb-2 sm:mb-4">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D50032]/40 flex items-center justify-center bg-white shadow-xs">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#D50032]" />
          </div>
          <div>
            <span className="font-['Cinzel'] tracking-[0.22em] sm:tracking-[0.28em] text-[10px] sm:text-xs text-[#A50034] font-bold uppercase block">
              The Geometry of Rhythm
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#7A6E74] tracking-wider hidden sm:inline">
              PATTERNS • NATURE • JAZZ PERCUSSION
            </span>
          </div>
        </div>

        {/* Audio Toggle & Formula Pill */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F9C2C2]/70 bg-white/90 text-[11px] font-mono text-[#A50034] shadow-xs">
            <Sparkles className="w-3 h-3 text-[#D50032]" />
            <span>φ = 1.6180339 • GOLDEN ANGLE 137.5°</span>
          </div>

          <button
            onClick={onToggleAudio}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[11px] sm:text-xs font-mono tracking-wider flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer shadow-xs ${
              audioActive
                ? 'bg-[#D50032] border-[#D50032] text-white shadow-[0_4px_15px_rgba(213,0,50,0.35)]'
                : 'bg-white border-[#F9C2C2]/80 text-[#3F353A] hover:border-[#D50032] hover:text-[#D50032]'
            }`}
          >
            {audioActive ? <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" /> : <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
            <span>{audioActive ? 'JAZZ SWING [LIVE]' : 'ENABLE AUDIO'}</span>
          </button>
        </div>
      </div>

      {/* Main Center Hero Block with 1280x720 Rounded Video */}
      <div className="relative z-20 w-full max-w-7xl mx-auto my-auto flex flex-col items-center">
        {/* Title Row */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-2 sm:gap-4 mb-2 sm:mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest text-[#D50032] bg-[#FFB3BA]/30 border border-[#D50032]/30 uppercase font-semibold">
                Nature × Geometry • Patterns × Beauty
              </span>
            </div>

            <h1 className="font-['Instrument_Serif'] text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[0.92] text-[#18070F]">
              hyper<span className="italic font-normal text-[#D50032]">ballad</span>
            </h1>
          </div>

          {/* Verbose text hidden on mobile */}
          <p className="hidden md:block text-xs sm:text-sm text-[#4A4347] max-w-md font-['Plus_Jakarta_Sans'] font-normal leading-relaxed">
            Where logarithmic phyllotaxis meets jazz drumming pocket. Acoustic resonance, unscripted live dynamics, and polyrhythmic sacred patterns synthesized into pure sonic beauty.
          </p>
        </div>

        {/* 1280x720 Rounded Video Player (Adaptive for Portrait & Landscape) */}
        <div className="relative w-full max-w-[1280px] aspect-[16/9] max-h-[46vh] sm:max-h-[58vh] md:max-h-[62vh] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#F9C2C2]/70 shadow-[0_20px_50px_rgba(165,0,52,0.12),0_4px_25px_rgba(0,0,0,0.06)] bg-black group">
          <video
            ref={videoRef}
            src="/videos/hb_05_1.mp4"
            autoPlay
            loop
            muted={isVideoMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Top Video Status Pill */}
          <div className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#F9C2C2]/80 text-[10px] sm:text-[11px] font-mono text-[#18070F] flex items-center gap-1.5 sm:gap-2 shadow-md pointer-events-none">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D50032]" />
            <span className="font-bold text-[#A50034]">LIVE DRUMMING</span>
            <span className="text-[#7A6E74] hidden sm:inline">• 1280×720</span>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-2.5 sm:bottom-4 left-2.5 sm:left-4 right-2.5 sm:right-4 flex justify-between items-center pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Play / Pause Button */}
              <button
                onClick={toggleVideoPlay}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/95 hover:bg-white text-[#18070F] hover:text-[#D50032] border border-[#F9C2C2]/80 text-[11px] sm:text-xs font-mono font-semibold tracking-wider flex items-center gap-1.5 sm:gap-2 backdrop-blur-md transition-all shadow-md cursor-pointer"
                title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isVideoPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D50032]" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D50032]" />}
                <span>{isVideoPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              {/* Mute / Unmute Button */}
              <button
                onClick={toggleVideoMute}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-[11px] sm:text-xs font-mono font-semibold tracking-wider flex items-center gap-1.5 sm:gap-2 backdrop-blur-md transition-all shadow-md cursor-pointer ${
                  isVideoMuted
                    ? 'bg-white/95 hover:bg-white text-[#18070F] border-[#F9C2C2]/80'
                    : 'bg-[#D50032] text-white border-[#D50032] shadow-[0_4px_20px_rgba(213,0,50,0.5)]'
                }`}
                title={isVideoMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
              >
                {isVideoMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A50034]" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />}
                <span>{isVideoMuted ? 'UNMUTE AUDIO' : 'AUDIO LIVE'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={handleFullscreen}
                className="p-1.5 sm:p-2.5 rounded-full bg-white/90 hover:bg-white text-[#18070F] hover:text-[#D50032] border border-[#F9C2C2]/80 transition-all shadow-md cursor-pointer"
                title="Fullscreen"
              >
                <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Discipline Anchors Row — HIDDEN on mobile to simplify */}
        <div className="hidden md:grid w-full grid-cols-3 gap-3 mt-4">
          <div className="p-3 rounded-2xl border border-[#F9C2C2]/60 bg-white/85 backdrop-blur-sm shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#D50032] uppercase font-bold tracking-wider block">01 / RECORDING</span>
              <span className="text-xs font-semibold text-[#18070F]">Chladni Sound Harmonics</span>
            </div>
            <span className="text-[10px] font-mono text-[#7A6E74]">24-Track Tape</span>
          </div>

          <div className="p-3 rounded-2xl border border-[#F9C2C2]/60 bg-white/85 backdrop-blur-sm shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#A50034] uppercase font-bold tracking-wider block">02 / PERFORMANCE</span>
              <span className="text-xs font-semibold text-[#18070F]">Organic Kinetic Tides</span>
            </div>
            <span className="text-[10px] font-mono text-[#7A6E74]">ppp to fff</span>
          </div>

          <div className="p-3 rounded-2xl border border-[#F9C2C2]/60 bg-white/85 backdrop-blur-sm shadow-xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-[#D50032] uppercase font-bold tracking-wider block">03 / BEAT MATRIX</span>
              <span className="text-xs font-semibold text-[#18070F]">Euclidean & Phyllotaxis</span>
            </div>
            <span className="text-[10px] font-mono text-[#7A6E74]">Golden Angle θ</span>
          </div>
        </div>
      </div>

      {/* Bottom Row / Scroll Hint */}
      <div className="relative z-20 flex justify-between items-center pt-2 sm:pt-4 border-t border-[#F9C2C2]/40 w-full max-w-7xl mx-auto mt-2">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={onExplore}
            className="group px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#D50032] to-[#A50034] text-white font-semibold text-[11px] sm:text-xs tracking-wider uppercase flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 shadow-md cursor-pointer border border-[#FFB3BA]/40"
          >
            <span>{isMobile ? 'TO BEAT MATRIX' : 'EXPLORE DISCIPLINES'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#7A6E74]">
            <span>SWIPE OR GLIDE TO SCROLL</span>
          </div>
        </div>

        {/* Tempo and Metric Signature */}
        <div className="flex items-center gap-3 sm:gap-6 font-mono text-[10px] sm:text-xs text-[#7A6E74]">
          <div className="flex items-center gap-1.5">
            <Disc className="w-3 h-3 text-[#D50032]" />
            <span className="text-[#18070F] font-semibold">132 BPM</span>
          </div>
          <span className="text-[#F9C2C2]">•</span>
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-[#A50034]" />
            <span className="text-[#18070F] font-semibold">7/4 TENSION</span>
          </div>
        </div>
      </div>
    </div>
  );
};

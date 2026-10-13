import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, ArrowRight, Disc, Activity, Sparkles, Maximize2 } from 'lucide-react';

interface HeroSectionProps {
  onExplore: () => void;
  audioActive: boolean;
  onToggleAudio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplore,
  audioActive,
  onToggleAudio
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
    <div className="relative w-screen h-screen flex-shrink-0 flex flex-col justify-between p-6 sm:p-8 md:p-12 select-none overflow-y-auto no-scrollbar">
      {/* Soft Ambient Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#F7F6F3]/40 to-[#F7F6F3] pointer-events-none" />

      {/* Top Header Row */}
      <div className="relative z-20 flex justify-between items-center w-full max-w-7xl mx-auto mb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-full border border-[#D50032]/40 flex items-center justify-center bg-white shadow-[0_4px_12px_rgba(213,0,50,0.15)]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D50032] animate-pulse" />
          </div>
          <div>
            <span className="font-['Cinzel'] tracking-[0.28em] text-xs text-[#A50034] font-bold uppercase block">
              The Geometry of Rhythm
            </span>
            <span className="text-[11px] font-mono text-[#7A6E74] tracking-wider">
              MATHEMATICS • NATURE • JAZZ PERCUSSION
            </span>
          </div>
        </div>

        {/* Audio Toggle & Formula Pill */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F9C2C2]/70 bg-white/90 text-[11px] font-mono text-[#A50034] shadow-xs">
            <Sparkles className="w-3 h-3 text-[#D50032]" />
            <span>φ = 1.6180339 • GOLDEN ANGLE 137.5°</span>
          </div>

          <button
            onClick={onToggleAudio}
            className={`px-4 py-2 rounded-full border text-xs font-mono tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              audioActive
                ? 'bg-[#D50032] border-[#D50032] text-white shadow-[0_4px_15px_rgba(213,0,50,0.35)]'
                : 'bg-white border-[#F9C2C2]/80 text-[#3F353A] hover:border-[#D50032] hover:text-[#D50032]'
            }`}
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5 animate-bounce text-white" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{audioActive ? 'JAZZ SWING ENGINE [LIVE]' : 'ENABLE JAZZ AUDIO'}</span>
          </button>
        </div>
      </div>

      {/* Main Center Hero Block with 1280x720 Rounded Video */}
      <div className="relative z-20 w-full max-w-7xl mx-auto my-auto flex flex-col items-center">
        {/* Title & Introduction Row */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono tracking-widest text-[#D50032] bg-[#FFB3BA]/30 border border-[#D50032]/30 uppercase font-semibold">
                Nature × Geometry • Math × Beauty
              </span>
              <span className="text-[#A50034]/40">•</span>
              <span className="text-[10px] font-mono text-[#7A6E74]">
                3 Disciplines of Acoustic Architecture
              </span>
            </div>

            <h1 className="font-['Instrument_Serif'] text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[0.92] text-[#18070F]">
              hyper<span className="italic font-normal text-[#D50032]">ballad</span>
            </h1>
          </div>

          <p className="text-xs sm:text-sm text-[#4A4347] max-w-md font-['Plus_Jakarta_Sans'] font-normal leading-relaxed">
            Where logarithmic phyllotaxis meets jazz drumming pocket. Acoustic resonance, unscripted live dynamics, and polyrhythmic sacred geometry synthesized into pure sonic beauty.
          </p>
        </div>

        {/* 1280x720 Rounded Video Player */}
        <div className="relative w-full max-w-[1280px] aspect-[16/9] max-h-[62vh] rounded-3xl overflow-hidden border-2 border-[#F9C2C2]/70 shadow-[0_25px_60px_rgba(165,0,52,0.12),0_4px_25px_rgba(0,0,0,0.06)] bg-black group">
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
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#F9C2C2]/80 text-[11px] font-mono text-[#18070F] flex items-center gap-2 shadow-md pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#D50032] animate-pulse" />
            <span className="font-bold text-[#A50034]">LIVE DRUMMING CAPTURE</span>
            <span className="text-[#7A6E74] hidden sm:inline">• 1280×720 // hb_05_1.mp4</span>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Play / Pause Button */}
              <button
                onClick={toggleVideoPlay}
                className="px-4 py-2 rounded-full bg-white/95 hover:bg-white text-[#18070F] hover:text-[#D50032] border border-[#F9C2C2]/80 text-xs font-mono font-semibold tracking-wider flex items-center gap-2 backdrop-blur-md transition-all shadow-lg cursor-pointer"
                title={isVideoPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isVideoPlaying ? <Pause className="w-3.5 h-3.5 text-[#D50032]" /> : <Play className="w-3.5 h-3.5 text-[#D50032]" />}
                <span>{isVideoPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              {/* Mute / Unmute Button */}
              <button
                onClick={toggleVideoMute}
                className={`px-4 py-2 rounded-full border text-xs font-mono font-semibold tracking-wider flex items-center gap-2 backdrop-blur-md transition-all shadow-lg cursor-pointer ${
                  isVideoMuted
                    ? 'bg-white/95 hover:bg-white text-[#18070F] border-[#F9C2C2]/80'
                    : 'bg-[#D50032] text-white border-[#D50032] shadow-[0_4px_20px_rgba(213,0,50,0.5)]'
                }`}
                title={isVideoMuted ? 'Unmute Video Audio' : 'Mute Video Audio'}
              >
                {isVideoMuted ? <VolumeX className="w-3.5 h-3.5 text-[#A50034]" /> : <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />}
                <span>{isVideoMuted ? 'UNMUTE AUDIO' : 'AUDIO LIVE'}</span>
              </button>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={handleFullscreen}
                className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#18070F] hover:text-[#D50032] border border-[#F9C2C2]/80 transition-all shadow-lg cursor-pointer"
                title="Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Discipline Anchors Row */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
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
      <div className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-4 border-t border-[#F9C2C2]/40 w-full max-w-7xl mx-auto mt-2">
        <div className="flex items-center gap-6">
          <button
            onClick={onExplore}
            className="group px-7 py-3 rounded-full bg-gradient-to-r from-[#D50032] to-[#A50034] hover:from-[#e60037] hover:to-[#b8003a] text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2.5 transition-transform hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(213,0,50,0.35)] cursor-pointer border border-[#FFB3BA]/40"
          >
            <span>EXPLORE DISCIPLINES</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <div className="hidden md:flex items-center gap-2.5 text-xs font-mono text-[#7A6E74]">
            <div className="w-6 h-4 rounded-sm border border-[#F9C2C2]/80 bg-white flex items-center justify-center text-[10px] text-[#A50034]">
              ⇄
            </div>
            <span>GLIDE RIGHT TO SCROLL • WHEEL / DRAG / KEYS</span>
          </div>
        </div>

        {/* Tempo and Metric Signature */}
        <div className="flex items-center gap-6 font-mono text-xs text-[#7A6E74]">
          <div className="flex items-center gap-2">
            <Disc className="w-3.5 h-3.5 text-[#D50032] animate-spin" />
            <span className="text-[#18070F] font-semibold">132 BPM GOLDEN SWING</span>
          </div>
          <span className="text-[#F9C2C2]">•</span>
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#A50034]" />
            <span className="text-[#18070F] font-semibold">7/4 METRIC TENSION</span>
          </div>
        </div>
      </div>
    </div>
  );
};

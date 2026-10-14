import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CameraSettings, SectionInfo } from '../types';
import { ChevronLeft, ChevronRight, Camera, Layers, Volume2, VolumeX } from 'lucide-react';

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  cameraSettings: CameraSettings;
  onScrollProgress: (progress: number, scrollX: number) => void;
  sections: SectionInfo[];
  onOpenCamControls: () => void;
  onOpenMediaGuide: () => void;
  audioActive: boolean;
  onToggleAudio: () => void;
}

export const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  cameraSettings,
  onScrollProgress,
  sections,
  onOpenCamControls,
  onOpenMediaGuide,
  audioActive,
  onToggleAudio
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTargetX = useRef<number>(0);
  const currentScrollX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragStartScroll = useRef<number>(0);
  const dragVelocity = useRef<number>(0);
  const lastDragTime = useRef<number>(0);
  const lastDragX = useRef<number>(0);

  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [scrollProgressState, setScrollProgressState] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1440);

  const numSections = sections.length;
  const maxScroll = Math.max(0, (numSections - 1) * windowWidth);

  // Resize & Orientation Change Handler
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const newWidth = window.innerWidth;
        setWindowWidth(newWidth);
        // Re-align scrollTarget to match current section index on rotation/resize
        scrollTargetX.current = Math.min(Math.max(0, (numSections - 1) * newWidth), activeSectionIndex * newWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [numSections, activeSectionIndex]);

  // Smooth Gliding Animation Frame Loop
  useEffect(() => {
    let animId: number;

    const loop = () => {
      const lerpSpeed = isDragging.current ? 0.28 : cameraSettings.smoothing;

      // Soft magnetic cushion towards nearest section when coasting slowly
      const velocity = Math.abs(scrollTargetX.current - currentScrollX.current);
      if (!isDragging.current && velocity < 1.2 && velocity > 0.01) {
        const nearestIdx = Math.round(currentScrollX.current / windowWidth);
        const nearestStop = nearestIdx * windowWidth;
        const distToStop = Math.abs(currentScrollX.current - nearestStop);
        if (distToStop < windowWidth * 0.18) {
          scrollTargetX.current += (nearestStop - scrollTargetX.current) * 0.06;
        }
      }

      currentScrollX.current += (scrollTargetX.current - currentScrollX.current) * lerpSpeed;

      // Elastic bounds clamp
      const clampedCurrent = Math.max(-50, Math.min(maxScroll + 50, currentScrollX.current));

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${-clampedCurrent}px, 0, 0)`;
      }

      const progress = maxScroll > 0 ? Math.max(0, Math.min(1, clampedCurrent / maxScroll)) : 0;
      setScrollProgressState(progress);
      onScrollProgress(progress, clampedCurrent);

      const activeIdx = Math.round(clampedCurrent / windowWidth);
      setActiveSectionIndex(Math.max(0, Math.min(numSections - 1, activeIdx)));

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [maxScroll, windowWidth, cameraSettings.smoothing, numSections, onScrollProgress]);

  // Wheel Event Handler (translates both deltaY and deltaX into smooth horizontal momentum)
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 1.35;
      scrollTargetX.current = Math.max(0, Math.min(maxScroll, scrollTargetX.current + delta));
    },
    [maxScroll]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input, select, textarea, a, video, .no-drag')) {
      return;
    }
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = scrollTargetX.current;
    lastDragX.current = e.clientX;
    lastDragTime.current = performance.now();
    dragVelocity.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = dragStartX.current - e.clientX;
    scrollTargetX.current = Math.max(0, Math.min(maxScroll, dragStartScroll.current + deltaX));

    const now = performance.now();
    const dt = now - lastDragTime.current;
    if (dt > 10) {
      dragVelocity.current = (lastDragX.current - e.clientX) / dt;
      lastDragX.current = e.clientX;
      lastDragTime.current = now;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const throwMomentum = dragVelocity.current * 320;
    scrollTargetX.current = Math.max(0, Math.min(maxScroll, scrollTargetX.current + throwMomentum));
  };

  // Touch Swipe Events for Mobile Devices (Smooth thumb gestures)
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button, input, select, textarea, a, video, .no-drag')) {
      return;
    }
    isDragging.current = true;
    const touch = e.touches[0];
    dragStartX.current = touch.clientX;
    dragStartScroll.current = scrollTargetX.current;
    lastDragX.current = touch.clientX;
    lastDragTime.current = performance.now();
    dragVelocity.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    const deltaX = dragStartX.current - touch.clientX;
    scrollTargetX.current = Math.max(0, Math.min(maxScroll, dragStartScroll.current + deltaX));

    const now = performance.now();
    const dt = now - lastDragTime.current;
    if (dt > 10) {
      dragVelocity.current = (lastDragX.current - touch.clientX) / dt;
      lastDragX.current = touch.clientX;
      lastDragTime.current = now;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const throwMomentum = dragVelocity.current * 320;
    scrollTargetX.current = Math.max(0, Math.min(maxScroll, scrollTargetX.current + throwMomentum));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea, select')) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        scrollTargetX.current = Math.min(maxScroll, scrollTargetX.current + windowWidth * 0.85);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        scrollTargetX.current = Math.max(0, scrollTargetX.current - windowWidth * 0.85);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollTargetX.current = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollTargetX.current = maxScroll;
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        if (idx < numSections) {
          scrollTargetX.current = idx * windowWidth;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [maxScroll, windowWidth, numSections]);

  const scrollToSection = (index: number) => {
    scrollTargetX.current = Math.max(0, Math.min(maxScroll, index * windowWidth));
  };

  return (
    <div
      className="relative w-screen h-[100dvh] overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {/* Horizontally sliding track for Middle Layer (Main Content) */}
      <div
        ref={containerRef}
        className="flex h-full will-change-transform z-10 relative"
        style={{ width: `${numSections * 100}vw` }}
      >
        {children}
      </div>

      {/* Floating Bottom Navigator HUD */}
      <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94vw] sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-full border border-[#F9C2C2]/80 bg-white/95 backdrop-blur-md shadow-2xl flex items-center justify-between gap-2 sm:gap-4">
        {/* Navigation Section Pills */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar mx-auto sm:mx-0">
          {sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(idx)}
              className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeSectionIndex === idx
                  ? 'bg-gradient-to-r from-[#D50032] to-[#A50034] text-white font-bold shadow-md border border-[#FFB3BA]/40'
                  : 'text-[#3F353A] hover:text-[#D50032] hover:bg-[#FFB3BA]/20'
              }`}
            >
              <span>{sec.title}</span>
            </button>
          ))}
        </div>

        {/* Action Pills: Hidden on narrow mobile, clean audio toggle */}
        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#F9C2C2]/40 flex-shrink-0">
          <button
            onClick={onOpenCamControls}
            className="p-2 rounded-full border border-[#F9C2C2]/70 hover:border-[#D50032] bg-[#F7F5F2] hover:bg-[#FFB3BA]/20 text-[#3F353A] hover:text-[#D50032] transition-all cursor-pointer shadow-xs"
            title="Open Camera Rig & Optics Director"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenMediaGuide}
            className="p-2 rounded-full border border-[#F9C2C2]/70 hover:border-[#D50032] bg-[#F7F5F2] hover:bg-[#FFB3BA]/20 text-[#3F353A] hover:text-[#D50032] transition-all cursor-pointer shadow-xs"
            title="Open Parallax Media Studio (.png & .webm)"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleAudio}
            className={`p-2 rounded-full border transition-all cursor-pointer shadow-xs ${
              audioActive
                ? 'border-[#D50032] bg-[#D50032] text-white shadow-sm'
                : 'border-[#F9C2C2]/70 bg-[#F7F5F2] text-[#3F353A] hover:text-[#D50032]'
            }`}
            title="Toggle Procedural Jazz Percussion Audio"
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5 text-white" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Floating Next/Prev Arrow Gliders (Visible on desktop/tablet) */}
      {activeSectionIndex > 0 && (
        <button
          onClick={() => scrollToSection(activeSectionIndex - 1)}
          className="hidden sm:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-[#F9C2C2]/70 bg-white/90 hover:bg-white text-[#3F353A] hover:text-[#D50032] hover:border-[#D50032]/60 items-center justify-center backdrop-blur shadow-xl transition-all cursor-pointer"
          title="Glide Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {activeSectionIndex < numSections - 1 && (
        <button
          onClick={() => scrollToSection(activeSectionIndex + 1)}
          className="hidden sm:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full border border-[#F9C2C2]/70 bg-white/90 hover:bg-white text-[#3F353A] hover:text-[#D50032] hover:border-[#D50032]/60 items-center justify-center backdrop-blur shadow-xl transition-all cursor-pointer"
          title="Glide Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Top Edge Progress Indicator Line */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#A50034] via-[#D50032] to-[#FFB3BA] transition-all duration-75"
          style={{ width: `${scrollProgressState * 100}%` }}
        />
      </div>
    </div>
  );
};

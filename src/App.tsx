import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CameraSettings, ParallaxMediaItem } from './types';
import { INITIAL_PARALLAX_ITEMS } from './data/parallaxItems';
import { jazzAudio } from './utils/audioEngine';

import { CanvasStage } from './components/CanvasStage';
import { ParallaxLayerHost } from './components/ParallaxLayerHost';
import { HorizontalScrollContainer } from './components/HorizontalScrollContainer';
import { HeroSection } from './components/HeroSection';
import { SessionRecordingSection } from './components/SessionRecordingSection';
import { PerformanceSection } from './components/PerformanceSection';
import { BeatConstructionSection } from './components/BeatConstructionSection';
import { OutroSection } from './components/OutroSection';
import { CameraControlsModal } from './components/CameraControlsModal';
import { ParallaxMediaGuide } from './components/ParallaxMediaGuide';
import { SECTIONS, MOBILE_SECTIONS } from './data/sections';

import { Camera, Layers } from 'lucide-react';

export const App: React.FC = () => {
  // Parallax Media items state (allows adding custom .png & .webm assets)
  const [parallaxItems, setParallaxItems] = useState<ParallaxMediaItem[]>(INITIAL_PARALLAX_ITEMS);

  // Camera settings (FOV, Aperture/DoF, Glide Damping, Parallax Spread, Dolly Z)
  const [cameraSettings, setCameraSettings] = useState<CameraSettings>({
    fov: 46,
    aperture: 1.8,
    focalPlane: 'middle',
    focusDistance: 0.5,
    dofEnabled: true,
    smoothing: 0.045,
    mouseParallaxFactor: 0.75,
    parallaxSpread: 1.45,
    dollyZ: 620
  });

  // Scroll tracking state
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollX, setScrollX] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Audio status
  const [audioActive, setAudioActive] = useState<boolean>(false);

  // Modals
  const [isCamModalOpen, setIsCamModalOpen] = useState<boolean>(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState<boolean>(false);

  // Window dimensions & Mobile detection
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1440);
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        setWindowWidth(width);
        setIsMobile(width < 768);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const activeSections = useMemo(() => {
    return isMobile ? MOBILE_SECTIONS : SECTIONS;
  }, [isMobile]);

  // Mobile Parallax filtering (maps section indices to 0, 1, 2 for the 3 active mobile sections)
  const activeParallaxItems = useMemo(() => {
    if (!isMobile) return parallaxItems;
    return parallaxItems
      .filter(item => item.sectionIndex === 0 || item.sectionIndex === 3 || item.sectionIndex === 4)
      .map(item => ({
        ...item,
        sectionIndex: item.sectionIndex === 3 ? 1 : item.sectionIndex === 4 ? 2 : 0
      }));
  }, [parallaxItems, isMobile]);

  // Mouse move handler for subtle 3D perspective shift
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePos({ x: normX, y: normY });
  }, []);

  const handleScrollProgress = useCallback((progress: number, x: number) => {
    setScrollProgress(progress);
    setScrollX(x);
  }, []);

  const handleToggleAudio = () => {
    const newState = jazzAudio.toggle();
    setAudioActive(newState);
  };

  const scrollToHero = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
  };

  const scrollToNextFromHero = () => {
    if (isMobile) {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '2' })); // Beat Matrix on mobile
    } else {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: '2' })); // Recording on desktop
    }
  };

  return (
    <div
      className="relative w-screen h-[100dvh] overflow-hidden bg-[#F7F6F3] text-[#18070F] select-none"
      onMouseMove={handleMouseMove}
    >
      {/* 1. WebGL 3D Camera Stage (Fine-Line Sacred Geometric Wireframes & Patterns) */}
      <CanvasStage
        scrollProgress={scrollProgress}
        totalWidth={windowWidth * activeSections.length}
        cameraSettings={cameraSettings}
        mousePos={mousePos}
        audioActive={audioActive}
      />

      {/* 2. Parallax Back Layer (Sacred line geometry, Fibonacci spirals, Chladni frequency lines) */}
      <ParallaxLayerHost
        layer="back"
        items={activeParallaxItems}
        scrollX={scrollX}
        sectionWidth={windowWidth}
        cameraSettings={cameraSettings}
        onEditSlot={() => setIsMediaModalOpen(true)}
      />

      {/* 3. Horizontal Scroll Container & Middle Content Layer */}
      <HorizontalScrollContainer
        cameraSettings={cameraSettings}
        onScrollProgress={handleScrollProgress}
        sections={activeSections}
        onOpenCamControls={() => setIsCamModalOpen(true)}
        onOpenMediaGuide={() => setIsMediaModalOpen(true)}
        audioActive={audioActive}
        onToggleAudio={handleToggleAudio}
      >
        {isMobile ? (
          // MOBILE VERSION: Exactly 3 essential sections (hyperballad + Beat Matrix + Archive)
          <>
            {/* Mobile Section 0: Hero / hyperballad */}
            <HeroSection
              onExplore={scrollToNextFromHero}
              audioActive={audioActive}
              onToggleAudio={handleToggleAudio}
              isMobile={true}
            />

            {/* Mobile Section 1: Beat Construction Matrix */}
            <BeatConstructionSection />

            {/* Mobile Section 2: Outro & Archive */}
            <OutroSection onBackToStart={scrollToHero} />
          </>
        ) : (
          // DESKTOP VERSION: Full 5 sections across all disciplines
          <>
            {/* Section 0: Hero */}
            <HeroSection
              onExplore={scrollToNextFromHero}
              audioActive={audioActive}
              onToggleAudio={handleToggleAudio}
              isMobile={false}
            />

            {/* Section 1: Session Work and Recording */}
            <SessionRecordingSection />

            {/* Section 2: Performance */}
            <PerformanceSection />

            {/* Section 3: Beat Construction */}
            <BeatConstructionSection />

            {/* Section 4: Outro / Archive / Bookings */}
            <OutroSection onBackToStart={scrollToHero} />
          </>
        )}
      </HorizontalScrollContainer>

      {/* 4. Parallax Front Layer (Fine-line astrolabe lattices, micro-timing nodes) */}
      <ParallaxLayerHost
        layer="front"
        items={activeParallaxItems}
        scrollX={scrollX}
        sectionWidth={windowWidth}
        cameraSettings={cameraSettings}
        onEditSlot={() => setIsMediaModalOpen(true)}
      />

      {/* Top Floating Utility HUD Bar (Desktop only) */}
      <div className="fixed top-6 right-6 z-40 hidden md:flex items-center gap-3">
        {/* Camera Optics Quick Indicator Pill */}
        <button
          onClick={() => setIsCamModalOpen(true)}
          className="px-3.5 py-1.5 rounded-full border border-[#D50032]/25 hover:border-[#D50032] bg-white/90 hover:bg-white text-xs font-mono tracking-wider flex items-center gap-2 backdrop-blur shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <Camera className="w-3.5 h-3.5 text-[#D50032]" />
          <span className="text-[#18070F]/90 font-medium">
            {cameraSettings.fov}mm • f/{cameraSettings.aperture.toFixed(1)} [
            <span className="text-[#A50034] font-bold uppercase">{cameraSettings.focalPlane}</span>]
          </span>
        </button>

        {/* Media Slots Quick Pill */}
        <button
          onClick={() => setIsMediaModalOpen(true)}
          className="px-3.5 py-1.5 rounded-full border border-[#D50032]/25 hover:border-[#A50034] bg-white/90 hover:bg-white text-xs font-mono tracking-wider flex items-center gap-2 backdrop-blur shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-[#D50032]" />
          <span className="text-[#18070F]/90 font-medium">PARALLAX SLOTS</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <CameraControlsModal
        settings={cameraSettings}
        onChange={setCameraSettings}
        isOpen={isCamModalOpen}
        onClose={() => setIsCamModalOpen(false)}
      />

      <ParallaxMediaGuide
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        items={parallaxItems}
        onUpdateItems={setParallaxItems}
      />
    </div>
  );
};

export default App;

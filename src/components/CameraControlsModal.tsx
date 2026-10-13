import React, { useState } from 'react';
import { Camera, Sliders, Eye, Compass, Aperture, X, Check, Copy } from 'lucide-react';
import { CameraSettings } from '../types';

interface CameraControlsModalProps {
  settings: CameraSettings;
  onChange: (settings: CameraSettings) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const CameraControlsModal: React.FC<CameraControlsModalProps> = ({
  settings,
  onChange,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const updateSetting = <K extends keyof CameraSettings>(key: K, value: CameraSettings[K]) => {
    onChange({
      ...settings,
      [key]: value
    });
  };

  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'cinematic':
        onChange({
          fov: 48,
          aperture: 1.4,
          focalPlane: 'middle',
          focusDistance: 0.5,
          dofEnabled: true,
          smoothing: 0.045,
          mouseParallaxFactor: 0.8,
          parallaxSpread: 1.5,
          dollyZ: 620
        });
        break;
      case 'wide':
        onChange({
          fov: 30,
          aperture: 8.0,
          focalPlane: 'middle',
          focusDistance: 0.5,
          dofEnabled: true,
          smoothing: 0.07,
          mouseParallaxFactor: 0.4,
          parallaxSpread: 1.0,
          dollyZ: 750
        });
        break;
      case 'macro':
        onChange({
          fov: 75,
          aperture: 1.2,
          focalPlane: 'front',
          focusDistance: 0.2,
          dofEnabled: true,
          smoothing: 0.035,
          mouseParallaxFactor: 1.1,
          parallaxSpread: 2.1,
          dollyZ: 520
        });
        break;
      case 'drift':
        onChange({
          fov: 45,
          aperture: 4.0,
          focalPlane: 'middle',
          focusDistance: 0.5,
          dofEnabled: true,
          smoothing: 0.025, // ultra silky momentum
          mouseParallaxFactor: 0.9,
          parallaxSpread: 1.8,
          dollyZ: 600
        });
        break;
    }
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-[#D50032]/25 bg-white/95 shadow-[0_25px_60px_rgba(213,0,50,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#F9C2C2]/30 flex justify-between items-center bg-[#FAF9F5]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D50032]/10 border border-[#D50032]/30 flex items-center justify-center text-[#D50032]">
              <Camera className="w-4 h-4 text-[#D50032]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold font-mono tracking-wider text-[#18070F] uppercase">
                Camera Rig & Optics Director
              </h3>
              <p className="text-[11px] font-mono text-[#52444A]">
                Live 3D Perspective, Depth of Field & Momentum Gliding
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-black/10 hover:border-[#D50032] flex items-center justify-center text-[#52444A] hover:text-[#18070F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-mono text-[#18070F]">
          {/* Quick Presets */}
          <div>
            <span className="text-[10px] uppercase text-[#A50034] tracking-widest font-semibold block mb-2.5">
              Optics Presets
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => applyPreset('cinematic')}
                className="p-2.5 rounded-xl border border-[#F9C2C2]/40 hover:border-[#D50032] bg-[#F7F6F3] hover:bg-[#D50032]/10 text-left transition-all cursor-pointer shadow-2xs"
              >
                <div className="font-semibold text-[#18070F]">🎬 Cinematic</div>
                <div className="text-[10px] text-[#52444A]">50mm f/1.4</div>
              </button>
              <button
                onClick={() => applyPreset('wide')}
                className="p-2.5 rounded-xl border border-[#F9C2C2]/40 hover:border-[#D50032] bg-[#F7F6F3] hover:bg-[#D50032]/10 text-left transition-all cursor-pointer shadow-2xs"
              >
                <div className="font-semibold text-[#18070F]">🎷 Studio Wide</div>
                <div className="text-[10px] text-[#52444A]">24mm f/8.0</div>
              </button>
              <button
                onClick={() => applyPreset('macro')}
                className="p-2.5 rounded-xl border border-[#F9C2C2]/40 hover:border-[#D50032] bg-[#F7F6F3] hover:bg-[#D50032]/10 text-left transition-all cursor-pointer shadow-2xs"
              >
                <div className="font-semibold text-[#18070F]">🥁 Cymbal Macro</div>
                <div className="text-[10px] text-[#52444A]">85mm f/1.2</div>
              </button>
              <button
                onClick={() => applyPreset('drift')}
                className="p-2.5 rounded-xl border border-[#F9C2C2]/40 hover:border-[#D50032] bg-[#F7F6F3] hover:bg-[#D50032]/10 text-left transition-all cursor-pointer shadow-2xs"
              >
                <div className="font-semibold text-[#18070F]">⚡ Silk Drift</div>
                <div className="text-[10px] text-[#52444A]">Ultra Damped</div>
              </button>
            </div>
          </div>

          {/* Focal Plane Selector */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase text-[#A50034] tracking-widest font-semibold">
                Depth of Field Focal Plane
              </span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.dofEnabled}
                  onChange={(e) => updateSetting('dofEnabled', e.target.checked)}
                  className="accent-[#D50032]"
                />
                <span className="text-[#18070F]/80 text-[11px] font-medium">Enable DoF Blur</span>
              </label>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {(['front', 'middle', 'back', 'all'] as const).map((plane) => (
                <button
                  key={plane}
                  onClick={() => updateSetting('focalPlane', plane)}
                  className={`py-2 rounded-xl border text-center font-mono capitalize transition-all cursor-pointer ${
                    settings.focalPlane === plane
                      ? 'border-[#D50032] bg-[#D50032] text-white shadow-sm'
                      : 'border-[#F9C2C2]/40 bg-[#F7F6F3] text-[#52444A] hover:border-[#D50032]/40'
                  }`}
                >
                  {plane === 'all' ? 'All (Deep)' : `${plane} Focus`}
                </button>
              ))}
            </div>
            <div className="text-[10px] text-[#52444A]">
              {settings.focalPlane === 'middle' && 'Subject and category content cards stay sharp; foreground & background planes gently defocus.'}
              {settings.focalPlane === 'front' && 'Foreground floating cymbals & sticks stay sharp; background & text defocus like cinema.'}
              {settings.focalPlane === 'back' && 'Background acoustic baffles & Fibonacci spirals stay sharp; foreground planes blur out.'}
              {settings.focalPlane === 'all' && 'Infinite depth of field — all layers stay completely sharp.'}
            </div>
          </div>

          {/* Sliders: Aperture (f-stop) */}
          <div className="space-y-1.5 p-3 rounded-xl border border-[#F9C2C2]/30 bg-[#F7F6F3]/80">
            <div className="flex justify-between items-center">
              <span className="text-[#18070F] font-medium flex items-center gap-2">
                <Aperture className="w-3.5 h-3.5 text-[#D50032]" />
                <span>Lens Aperture (Bokeh Intensity)</span>
              </span>
              <span className="text-[#A50034] font-bold">f/{settings.aperture.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="1.2"
              max="16.0"
              step="0.2"
              value={settings.aperture}
              onChange={(e) => updateSetting('aperture', parseFloat(e.target.value))}
              className="w-full accent-[#D50032] h-1.5 bg-black/10 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#52444A]">
              <span>f/1.2 (Creamy Bokeh Blur)</span>
              <span>f/16.0 (Sharp Focus)</span>
            </div>
          </div>

          {/* Sliders: Focal Length (FOV) */}
          <div className="space-y-1.5 p-3 rounded-xl border border-[#F9C2C2]/30 bg-[#F7F6F3]/80">
            <div className="flex justify-between items-center">
              <span className="text-[#18070F] font-medium flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-[#D50032]" />
                <span>Camera Field of View (FOV / Lens Angle)</span>
              </span>
              <span className="text-[#A50034] font-bold">{settings.fov}°</span>
            </div>
            <input
              type="range"
              min="24"
              max="80"
              step="1"
              value={settings.fov}
              onChange={(e) => updateSetting('fov', parseInt(e.target.value))}
              className="w-full accent-[#D50032] h-1.5 bg-black/10 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#52444A]">
              <span>24° (Telephoto Tight)</span>
              <span>80° (Wide Anamorphic)</span>
            </div>
          </div>

          {/* Sliders: Momentum Glide Damping */}
          <div className="space-y-1.5 p-3 rounded-xl border border-[#F9C2C2]/30 bg-[#F7F6F3]/80">
            <div className="flex justify-between items-center">
              <span className="text-[#18070F] font-medium flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#D50032]" />
                <span>Scroll Glide Softness (Momentum Lerp)</span>
              </span>
              <span className="text-[#A50034] font-bold">{settings.smoothing.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.12"
              step="0.005"
              value={settings.smoothing}
              onChange={(e) => updateSetting('smoothing', parseFloat(e.target.value))}
              className="w-full accent-[#D50032] h-1.5 bg-black/10 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#52444A]">
              <span>0.02 (Soft Silk Glide)</span>
              <span>0.12 (Direct Snappy)</span>
            </div>
          </div>

          {/* Sliders: Parallax Depth Spread */}
          <div className="space-y-1.5 p-3 rounded-xl border border-[#F9C2C2]/30 bg-[#F7F6F3]/80">
            <div className="flex justify-between items-center">
              <span className="text-[#18070F] font-medium flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-[#D50032]" />
                <span>Parallax Multi-Plane Separation</span>
              </span>
              <span className="text-[#A50034] font-bold">{settings.parallaxSpread.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={settings.parallaxSpread}
              onChange={(e) => updateSetting('parallaxSpread', parseFloat(e.target.value))}
              className="w-full accent-[#D50032] h-1.5 bg-black/10 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#52444A]">
              <span>0.5x (Subtle Depth)</span>
              <span>2.5x (Deep 3D Separation)</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#F9C2C2]/30 bg-[#FAF9F5] flex justify-between items-center">
          <button
            onClick={copyConfig}
            className="px-3.5 py-2 rounded-xl border border-[#D50032]/25 hover:border-[#D50032] text-[#52444A] hover:text-[#18070F] flex items-center gap-2 transition-colors cursor-pointer text-xs font-mono"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Settings Copied!' : 'Copy Config JSON'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D50032] to-[#A50034] text-white font-semibold text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-md hover:opacity-95"
          >
            Close & Apply
          </button>
        </div>
      </div>
    </div>
  );
};

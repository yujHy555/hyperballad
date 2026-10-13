import React, { useState } from 'react';
import { Layers, Upload, Check, X, Sparkles, Plus, Trash2 } from 'lucide-react';
import { ParallaxLayerType, ParallaxMediaItem } from '../types';

interface ParallaxMediaGuideProps {
  isOpen: boolean;
  onClose: () => void;
  items: ParallaxMediaItem[];
  onUpdateItems: (newItems: ParallaxMediaItem[]) => void;
}

export const ParallaxMediaGuide: React.FC<ParallaxMediaGuideProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateItems
}) => {
  const [activeTab, setActiveTab] = useState<'manager' | 'guide'>('manager');
  const [selectedLayer, setSelectedLayer] = useState<ParallaxLayerType>('front');
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle local test file drop/selection (PNG or WebM)
  const handleLocalFile = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const isVideo = file.name.endsWith('.webm') || file.type.includes('video');

    onUpdateItems(
      items.map(it => {
        if (it.id === itemId) {
          return {
            ...it,
            type: isVideo ? 'video' : 'image',
            src: fileUrl,
            title: file.name
          };
        }
        return it;
      })
    );

    setUploadSuccess(`Loaded ${file.name} into ${selectedLayer.toUpperCase()} slot!`);
    setTimeout(() => setUploadSuccess(null), 3000);
  };

  const handleAddNewSlot = (layer: ParallaxLayerType) => {
    const newSlot: ParallaxMediaItem = {
      id: `custom-${Date.now()}`,
      type: 'image',
      layer: layer,
      sectionIndex: 0,
      title: `Custom ${layer.toUpperCase()} Slot`,
      position: {
        xPercent: 50,
        yPercent: 50,
        scale: 1,
        zIndex: layer === 'front' ? 30 : layer === 'middle' ? 10 : 1
      }
    };
    onUpdateItems([...items, newSlot]);
  };

  const handleDeleteSlot = (id: string) => {
    onUpdateItems(items.filter(it => it.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl border border-[#D50032]/25 bg-white/95 shadow-[0_25px_60px_rgba(213,0,50,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-[#F9C2C2]/30 flex justify-between items-center bg-[#FAF9F5]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D50032]/10 border border-[#D50032]/30 flex items-center justify-center text-[#D50032]">
              <Layers className="w-4 h-4 text-[#D50032]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold font-mono tracking-wider text-[#18070F] uppercase">
                Parallax Media Studio // .PNG & .WEBM Alpha
              </h3>
              <p className="text-[11px] font-mono text-[#52444A]">
                Front, Middle & Back Multi-Plane Parallax Layer Manager
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

        {/* Tab Switcher */}
        <div className="px-6 pt-4 flex gap-4 border-b border-[#F9C2C2]/20 text-xs font-mono bg-[#FAF9F5]/50">
          <button
            onClick={() => setActiveTab('manager')}
            className={`pb-3 font-semibold transition-colors cursor-pointer ${
              activeTab === 'manager'
                ? 'border-b-2 border-[#D50032] text-[#D50032]'
                : 'text-[#52444A] hover:text-[#18070F]'
            }`}
          >
            Active Parallax Slots ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 font-semibold transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'border-b-2 border-[#D50032] text-[#D50032]'
                : 'text-[#52444A] hover:text-[#18070F]'
            }`}
          >
            Developer Workflow & Specs
          </button>
        </div>

        {uploadSuccess && (
          <div className="mx-6 mt-4 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs font-mono flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{uploadSuccess}</span>
          </div>
        )}

        {/* Tab 1: Slots Manager */}
        {activeTab === 'manager' && (
          <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs font-mono text-[#18070F]">
            {/* Filter by layer */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {(['front', 'middle', 'back'] as const).map(l => (
                  <button
                    key={l}
                    onClick={() => setSelectedLayer(l)}
                    className={`px-3 py-1.5 rounded-xl uppercase font-mono tracking-wider cursor-pointer border transition-all ${
                      selectedLayer === l
                        ? 'border-[#D50032] bg-[#D50032] text-white shadow-xs'
                        : 'border-[#F9C2C2]/40 bg-[#F7F6F3] text-[#52444A] hover:border-[#D50032]/40'
                    }`}
                  >
                    {l} ({items.filter(i => i.layer === l).length})
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleAddNewSlot(selectedLayer)}
                className="px-3 py-1.5 rounded-xl border border-[#D50032]/30 text-white bg-gradient-to-r from-[#D50032] to-[#A50034] hover:opacity-95 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-white" />
                <span>Add {selectedLayer.toUpperCase()} Slot</span>
              </button>
            </div>

            {/* Slot Cards List */}
            <div className="space-y-3">
              {items
                .filter(it => it.layer === selectedLayer)
                .map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-[#F9C2C2]/40 bg-[#F7F6F3] space-y-3 shadow-2xs"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-[#18070F] flex items-center gap-2">
                          <span>{item.title || item.id}</span>
                          <span className="text-[10px] text-[#A50034] uppercase bg-[#FFB3BA]/40 px-2 py-0.5 rounded border border-[#D50032]/25 font-bold">
                            Section {item.sectionIndex}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#52444A] mt-0.5">
                          Type: {item.type.toUpperCase()} • Position: X:{item.position.xPercent}% Y:{item.position.yPercent}%
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* File upload input to test transparent PNG or WebM */}
                        <label className="px-3 py-1.5 rounded-xl border border-[#D50032]/30 hover:border-[#D50032] bg-white hover:bg-[#D50032]/5 text-[#18070F] flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs">
                          <Upload className="w-3 h-3 text-[#D50032]" />
                          <span>Load .png / .webm</span>
                          <input
                            type="file"
                            accept=".png,.webm,image/png,video/webm"
                            className="hidden"
                            onChange={(e) => handleLocalFile(e, item.id)}
                          />
                        </label>

                        <button
                          onClick={() => handleDeleteSlot(item.id)}
                          className="p-1.5 rounded-xl border border-red-500/25 text-red-600 hover:bg-red-500/10 cursor-pointer"
                          title="Remove slot"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {item.src && (
                      <div className="p-2 rounded bg-white border border-black/5 text-[10px] text-[#52444A] truncate">
                        Loaded: {item.src}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Tab 2: Developer Guide & Instructions */}
        {activeTab === 'guide' && (
          <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs font-mono text-[#3F353A] leading-relaxed">
            <div className="p-4 rounded-xl border border-[#D50032]/25 bg-[#FAF9F5] space-y-2">
              <div className="text-[#A50034] font-bold uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D50032]" />
                <span>How the Parallax System Works</span>
              </div>
              <p className="text-[#52444A]">
                The engine maintains three independent depth planes along the horizontal axis with differential motion speeds:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[#3F353A]">
                <li><strong className="text-[#18070F]">Back Layer:</strong> 0.42x speed factor. Perfect for Fibonacci spirals, sacred geometry, Chladni nodal frequency plates.</li>
                <li><strong className="text-[#18070F]">Middle Layer:</strong> 1.00x speed factor. The main focal track containing section cards, interactive consoles, and text.</li>
                <li><strong className="text-[#18070F]">Front Layer:</strong> 1.68x speed factor. Glides rapidly past the camera. Ideal for high-detail cymbals, sticks, and transparent WebM video elements.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-[#A50034] font-bold uppercase">1. Adding Transparent WebM Videos</h4>
              <p className="text-[#52444A]">
                To create videos with transparent alpha backgrounds:
              </p>
              <pre className="p-3 rounded-lg bg-[#F7F6F3] border border-[#F9C2C2]/30 text-[11px] text-[#A50034] overflow-x-auto">
{`# FFmpeg recipe to convert ProRes 4444 (with alpha) to WebM VP9:
ffmpeg -i input_with_alpha.mov -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 2M output.webm`}
              </pre>
            </div>

            <div className="space-y-2">
              <h4 className="text-[#A50034] font-bold uppercase">2. Adding Transparent PNG Images</h4>
              <p className="text-[#52444A]">
                Save your cymbals, kits, or botanical elements with 32-bit PNG (RGB + Alpha). Drop them in <code className="text-[#18070F] bg-black/5 px-1 rounded">public/assets/</code> and point the slot's <code className="text-[#18070F] bg-black/5 px-1 rounded">src</code> attribute to the file path.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-[#F9C2C2]/30 bg-[#FAF9F5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D50032] to-[#A50034] text-white font-semibold text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-md hover:opacity-95"
          >
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { CameraSettings, ParallaxMediaItem } from '../types';
import { ParallaxItemRenderer } from './ParallaxItemRenderer';

interface ParallaxLayerHostProps {
  layer: 'front' | 'middle' | 'back';
  items: ParallaxMediaItem[];
  scrollX: number; // current smooth scroll in pixels
  sectionWidth: number; // width of one section in pixels
  cameraSettings: CameraSettings;
  onEditSlot?: (item: ParallaxMediaItem) => void;
}

export const ParallaxLayerHost: React.FC<ParallaxLayerHostProps> = ({
  layer,
  items,
  scrollX,
  sectionWidth,
  cameraSettings,
  onEditSlot
}) => {
  // Speed multiplier for parallax depth
  const getSpeedMultiplier = () => {
    const spread = cameraSettings.parallaxSpread;
    switch (layer) {
      case 'back':
        return 0.42 * spread;
      case 'middle':
        return 1.0;
      case 'front':
        return 1.68 * spread;
    }
  };

  const speed = getSpeedMultiplier();
  const layerTranslateX = -scrollX * speed;

  // Compute optical Depth of Field blur based on camera focal plane and aperture
  const getDoFStyles = () => {
    if (!cameraSettings.dofEnabled) {
      return { filter: 'none', transition: 'filter 0.4s ease' };
    }

    const { aperture, focalPlane } = cameraSettings;
    // Lower f-stop (e.g. 1.4) = shallower DoF = stronger bokeh blur
    const blurPower = Math.max(0, (8.0 - aperture) * 1.3);

    let blurAmount = 0;
    let opacity = 1;

    if (focalPlane === 'middle') {
      if (layer === 'back') {
        blurAmount = Math.max(0, 3 + blurPower * 1.2);
        opacity = 0.85;
      } else if (layer === 'front') {
        blurAmount = Math.max(0, 2 + blurPower * 0.9);
      } else {
        blurAmount = 0; // middle in crisp focus
      }
    } else if (focalPlane === 'front') {
      if (layer === 'front') {
        blurAmount = 0; // front crisp
      } else if (layer === 'middle') {
        blurAmount = Math.max(0, 2.5 + blurPower * 0.8);
      } else {
        blurAmount = Math.max(0, 5.5 + blurPower * 1.5);
        opacity = 0.7;
      }
    } else if (focalPlane === 'back') {
      if (layer === 'back') {
        blurAmount = 0; // back crisp
      } else if (layer === 'middle') {
        blurAmount = Math.max(0, 3.0 + blurPower * 0.9);
      } else {
        blurAmount = Math.max(0, 6.0 + blurPower * 1.6);
      }
    }

    return {
      filter: blurAmount > 0 ? `blur(${blurAmount.toFixed(1)}px)` : 'none',
      opacity,
      transition: 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease'
    };
  };

  const filteredItems = items.filter(item => item.layer === layer);
  const dofStyle = getDoFStyles();

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${
        layer === 'front' ? 'z-30' : layer === 'middle' ? 'z-10' : 'z-0'
      }`}
      style={{
        transform: `translate3d(${layerTranslateX}px, 0, 0)`,
        willChange: 'transform',
        ...dofStyle
      }}
    >
      {filteredItems.map(item => {
        // Compute world position based on sectionIndex and xPercent/yPercent
        const itemX = item.sectionIndex * sectionWidth + (item.position.xPercent / 100) * sectionWidth;
        const itemY = `${item.position.yPercent}%`;

        return (
          <div
            key={item.id}
            className="absolute pointer-events-none"
            style={{
              left: `${itemX}px`,
              top: itemY,
              transform: `translate(-50%, -50%) scale(${item.position.scale || 1}) rotate(${item.position.rotation || 0}deg)`,
              zIndex: item.position.zIndex || 10
            }}
          >
            <div
              className="animate-smooth-float"
              style={{
                animationDuration: `${10 + (item.sectionIndex % 3) * 3}s`,
                animationDelay: `${(item.sectionIndex * 0.9).toFixed(1)}s`
              }}
            >
              <ParallaxItemRenderer item={item} layer={layer} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

# HYPERBALLAD — Jazz Drumming, Recording & Beat Architecture

A horizontally scrolling web landing page crafted for jazz drumming across 3 core disciplines:
1. **Session Work & Recording**
2. **Performance & Improvisation**
3. **Beat Construction & Polyrhythmic Architecture**

---

## Key Features

### 1. Horizontal Momentum Glide Engine
- **Silky Smooth Glide**: Physics-driven inertia scroll with spring damping and elastic bounds.
- **Soft, Padded Stop Cushioning**: Magnetic gentle cushion that softly centers sections when coasting.
- **Multi-Input Control**:
  - Trackpad / Mouse Wheel (vertical and horizontal delta)
  - Click-and-drag / Touch swipe with throw momentum
  - Keyboard Navigation (`←` / `→` arrow keys, `PageUp` / `PageDown`, `Home` / `End`, `1` to `5`)
  - Bottom navigation HUD with quick jump pills

### 2. Multi-Plane Parallax System (`front`, `middle`, `back`)
- **Spatial Layering**:
  - `back`: 0.42x speed factor (diffuse room baffles, tape reels, ambient acoustics)
  - `middle`: 1.00x speed factor (main reading cards, interactive console, beat matrix)
  - `front`: 1.68x speed factor (cymbals, sticks, ghost-note nodes)
- **Transparent Asset Support**:
  - Ready for `.png` images with transparency
  - Ready for `.webm` video with alpha channel (VP9 yuva420p)
- **Parallax Media Studio**: Open the on-screen studio to test uploading your `.png` / `.webm` files directly into any layer!

### 3. WebGL Camera Rig with Depth of Field (DoF)
- **Three.js Perspective Camera**:
  - Smooth horizontal tracking synchronized with the scroll progress.
  - Subtle cursor-following perspective shift and 3D brass cymbals and stardust particles.
- **Dynamic Optical Depth of Field**:
  - Focus targets: `Front`, `Middle`, `Back`, or `All (Deep focus)`.
  - Realistic Bokeh blur calculated dynamically based on lens aperture ($f/1.2$ to $f/16$).
- **Interactive Camera Controls Modal**:
  - Adjust FOV (24mm - 80mm), Aperture ($f/1.2 - f/16$), Scroll Glide Softness, and Parallax Separation.
  - 4 one-click cinematic presets + "Copy Config JSON" button.

### 4. Interactive Disciplines Showcase
- **Hero**: Atmospheric intro, aesthetic typography, live BPM counter.
- **01. Session Work & Recording**: Multitrack stem console with live VU meters, Solo/Mute toggles, and faders.
- **02. Performance**: Touring journals, dynamic range metrics ($ppp$ to $fff$), and venue showcases.
- **03. Beat Construction**: Interactive 16-step poly-metric rhythm matrix with live step sequencer, swing slider, and London Broken Beat / 5:4 modulation presets.
- **04. Archive & Bookings**: Master gear rider and session inquiry form.
- **Procedural Jazz Audio Engine**: Native Web Audio API ride cymbal swing and wire brush snare synthesis (zero audio files needed).

---

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build production bundle
npm run build
```

Dev server default URL: `http://localhost:3000/`

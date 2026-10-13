import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CameraSettings } from '../types';

interface CanvasStageProps {
  scrollProgress: number; // 0 to 1 across whole horizontal track
  totalWidth: number;
  cameraSettings: CameraSettings;
  mousePos: { x: number; y: number }; // normalized -1 to 1
  audioActive: boolean;
}

export const CanvasStage: React.FC<CanvasStageProps> = ({
  scrollProgress,
  totalWidth,
  cameraSettings,
  mousePos,
  audioActive
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cymbalMeshesRef = useRef<THREE.Mesh[]>([]);
  const phyllotaxisPointsRef = useRef<THREE.Points | null>(null);
  const geometricRingsRef = useRef<THREE.Group[]>([]);
  const sacredPolyhedraRef = useRef<THREE.LineSegments[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene setup with soft white botanical fog
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0xF7F6F3, 0.00055);

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      cameraSettings.fov,
      width / height,
      1,
      3200
    );
    camera.position.set(0, 0, cameraSettings.dollyZ);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lights: Soft White Ambient + Crimson & Blush Accents
    const ambientLight = new THREE.AmbientLight(0xfff7f8, 2.6);
    scene.add(ambientLight);

    // Key Light: Crimson Ruby (#D50032)
    const crimsonKeyLight = new THREE.DirectionalLight(0xd50032, 2.8);
    crimsonKeyLight.position.set(220, 320, 420);
    scene.add(crimsonKeyLight);

    // Fill Light: Petal Blossom Pink (#FFB3BA)
    const blossomFillLight = new THREE.DirectionalLight(0xffb3ba, 2.0);
    blossomFillLight.position.set(-200, -120, -180);
    scene.add(blossomFillLight);

    // Specular Rim: Soft Alabaster White
    const whiteRimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    whiteRimLight.position.set(0, 400, -200);
    scene.add(whiteRimLight);

    // 5. Dynamic 3D Objects: Resonant Bronze Cymbals + Sacred Golden Ratio Geometry across 5 sections
    const cymbalGeo = new THREE.CylinderGeometry(85, 95, 2.5, 52);
    const bellGeo = new THREE.SphereGeometry(22, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.45);

    // Cymbal Material with Rose-Wine Specular Luster
    const cymbalMat = new THREE.MeshStandardMaterial({
      color: 0xdfa16a,
      metalness: 0.94,
      roughness: 0.22,
      emissive: 0x3d0714,
      emissiveIntensity: 0.2
    });

    const cymbals: THREE.Mesh[] = [];
    const sectionSpans = [0, 800, 1600, 2400, 3200];
    const PHI = 1.6180339887; // The Golden Ratio

    sectionSpans.forEach((xPos, idx) => {
      const group = new THREE.Group();

      // Cymbal Disc
      const cymbal = new THREE.Mesh(cymbalGeo, cymbalMat);
      cymbal.rotation.x = Math.PI / 2.3 + (idx % 2 === 0 ? 0.18 : -0.18);
      cymbal.rotation.y = idx * 0.45;
      group.add(cymbal);

      // Cymbal Bell (Nautilus proportion)
      const bell = new THREE.Mesh(bellGeo, cymbalMat);
      bell.position.y = 2.5;
      bell.rotation.x = -Math.PI / 2;
      group.add(bell);

      const zDepths = [-160, 45, -110, 95, -45];
      const yOffsets = [-35, 75, -80, 55, -25];

      group.position.set(xPos, yOffsets[idx], zDepths[idx]);
      group.scale.setScalar(0.72 + (idx % 3) * 0.22);
      scene.add(group);
      cymbals.push(cymbal);

      // Sacred Golden Ratio Concentric Rings
      const ringGroup = new THREE.Group();
      ringGroup.position.set(xPos, yOffsets[idx], zDepths[idx]);

      const ringRadii = [80, 80 * PHI, 80 * PHI * PHI];
      const ringColors = [0xd50032, 0xffb3ba, 0xa50034];

      ringRadii.forEach((rad, rIdx) => {
        const ringGeo = new THREE.RingGeometry(rad, rad + 1.8, 80);
        const ringMat = new THREE.MeshBasicMaterial({
          color: ringColors[rIdx],
          transparent: true,
          opacity: 0.32 - rIdx * 0.08,
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.15;
        ringGroup.add(ring);
      });
      scene.add(ringGroup);
      geometricRingsRef.current.push(ringGroup);

      // Sacred Geometry Polyhedron Wireframe (Dodecahedron - sacred symbol of the cosmos & harmony)
      const dドウGeo = new THREE.IcosahedronGeometry(45 + (idx % 2) * 15, 0);
      const wireframeGeo = new THREE.WireframeGeometry(dドウGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0xffb3ba : 0xd50032,
        transparent: true,
        opacity: 0.22
      });
      const polyLine = new THREE.LineSegments(wireframeGeo, wireMat);
      polyLine.position.set(xPos, yOffsets[idx] + 70, zDepths[idx] - 60);
      scene.add(polyLine);
      sacredPolyhedraRef.current.push(polyLine);
    });

    cymbalMeshesRef.current = cymbals;

    // 6. Generative Phyllotaxis Flower & Golden Spiral Spores (Geometry + Nature + Math)
    // Formula: theta = n * 137.5077° (Golden Angle), r = c * sqrt(n)
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const c1 = new THREE.Color(0xd50032); // Crimson
    const c2 = new THREE.Color(0xffb3ba); // Blossom Pink
    const c3 = new THREE.Color(0xf9c2c2); // Soft Blush
    const c4 = new THREE.Color(0xffffff); // Pure White

    const GOLDEN_ANGLE = 137.507764 * (Math.PI / 180); // ~2.39996 rad

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution across horizontal sections
      const sectionOffset = (i / particleCount) * 3600 - 150;
      const angle = i * GOLDEN_ANGLE;
      const radius = Math.sqrt(i % 150) * 28;

      positions[i * 3] = sectionOffset + Math.cos(angle) * (radius * 0.4);
      positions[i * 3 + 1] = Math.sin(angle) * radius + (Math.sin(i * 0.2) * 40);
      positions[i * 3 + 2] = Math.cos(angle * 1.618) * 400 + (Math.random() - 0.5) * 100;

      // Color assignment from the user's signature palette
      const seed = i % 4;
      const col = seed === 0 ? c1 : seed === 1 ? c2 : seed === 2 ? c3 : c4;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 4.5 + 2.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom Botanical Particle Texture with soft Petal Gradient
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d')!;
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255,255,255,1)');
    radGrad.addColorStop(0.35, 'rgba(255,179,186,0.9)');
    radGrad.addColorStop(0.7, 'rgba(213,0,50,0.5)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = radGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 7,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const phyllotaxisPoints = new THREE.Points(particleGeo, particleMat);
    scene.add(phyllotaxisPoints);
    phyllotaxisPointsRef.current = phyllotaxisPoints;

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      cymbalGeo.dispose();
      bellGeo.dispose();
      cymbalMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      pTexture.dispose();
    };
  }, []);

  // Update dynamic camera FOV
  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current.fov = cameraSettings.fov;
    cameraRef.current.updateProjectionMatrix();
  }, [cameraSettings.fov]);

  // Main Render Loop
  useEffect(() => {
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Horizontal tracking
      const totalWorldX = 3200;
      const targetCamX = scrollProgress * totalWorldX;

      // Mouse Parallax Offset
      const mouseFactor = cameraSettings.mouseParallaxFactor * 60;
      const targetCamY = mousePos.y * mouseFactor;
      const mouseCamXOffset = mousePos.x * mouseFactor;

      // Smooth Camera Damping
      const smoothFactor = Math.min(1, delta * (cameraSettings.smoothing * 60));
      cameraRef.current.position.x += (targetCamX + mouseCamXOffset - cameraRef.current.position.x) * smoothFactor;
      cameraRef.current.position.y += (targetCamY - cameraRef.current.position.y) * 0.06;
      cameraRef.current.position.z += (cameraSettings.dollyZ - cameraRef.current.position.z) * 0.08;

      cameraRef.current.lookAt(cameraRef.current.position.x + 30, cameraRef.current.position.y * 0.3, 0);

      // Rotate Cymbals with harmonic organic wobble
      cymbalMeshesRef.current.forEach((cymbal, i) => {
        const audioResonance = audioActive ? Math.sin(elapsedTime * 6 + i) * 0.04 : 0;
        cymbal.rotation.y += (0.2 + i * 0.08 + (audioActive ? 0.3 : 0)) * delta;
        cymbal.position.y = Math.sin(elapsedTime * 1.4 + i * 1.618) * 5 + audioResonance * 12;
      });

      // Sacred Geometry Concentric Rings: Golden Ratio Breathing
      geometricRingsRef.current.forEach((ringGroup, i) => {
        const breath = 1 + Math.sin(elapsedTime * 1.618 + i) * 0.04 + (audioActive ? 0.06 : 0);
        ringGroup.scale.set(breath, breath, breath);
        ringGroup.rotation.z += 0.05 * delta;
      });

      // Sacred Polyhedra Wireframe rotations
      sacredPolyhedraRef.current.forEach((poly, i) => {
        poly.rotation.x += (0.2 + i * 0.1) * delta;
        poly.rotation.y += (0.15 + i * 0.05) * delta;
      });

      // Phyllotaxis Flower Spiral: Natural organic wave drift
      if (phyllotaxisPointsRef.current) {
        phyllotaxisPointsRef.current.rotation.x = Math.sin(elapsedTime * 0.5) * 0.05;
        phyllotaxisPointsRef.current.rotation.z = elapsedTime * 0.015;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [scrollProgress, cameraSettings, mousePos, audioActive]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
};

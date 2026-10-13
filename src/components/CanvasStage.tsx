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
  const fineLineGeometricMeshesRef = useRef<THREE.Group[]>([]);
  const phyllotaxisPointsRef = useRef<THREE.Points | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene setup with soft white botanical fog
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0xF7F6F3, 0.0005);

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

    const crimsonKeyLight = new THREE.DirectionalLight(0xd50032, 2.2);
    crimsonKeyLight.position.set(220, 320, 420);
    scene.add(crimsonKeyLight);

    const blossomFillLight = new THREE.DirectionalLight(0xffb3ba, 1.8);
    blossomFillLight.position.set(-200, -120, -180);
    scene.add(blossomFillLight);

    // 5. Fine Line Style Geometric Wireframes (Smooth, Calm, Zero Solid Discs)
    const geometricGroups: THREE.Group[] = [];
    const sectionSpans = [0, 800, 1600, 2400, 3200];
    const PHI = 1.6180339887; // The Golden Ratio

    sectionSpans.forEach((xPos, idx) => {
      const group = new THREE.Group();

      // (A) Concentric Fine-Line Orbital Circles
      const radii = [45, 45 * PHI, 45 * PHI * PHI];
      const lineColors = [0xd50032, 0xffb3ba, 0xa50034];

      radii.forEach((r, rIdx) => {
        const segments = 96;
        const circlePoints: THREE.Vector3[] = [];
        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          circlePoints.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
        }
        const circleGeo = new THREE.BufferGeometry().setFromPoints(circlePoints);
        const circleMat = new THREE.LineBasicMaterial({
          color: lineColors[rIdx],
          transparent: true,
          opacity: 0.38 - rIdx * 0.08,
          linewidth: 1
        });
        const line = new THREE.LineLoop(circleGeo, circleMat);
        line.rotation.x = Math.PI / 2.2 + (rIdx * 0.1);
        group.add(line);
      });

      // (B) Fine-Line Sacred Polyhedron Wireframe (Icosahedron lines)
      const icosaGeo = new THREE.IcosahedronGeometry(52 + (idx % 2) * 12, 0);
      const icosaEdges = new THREE.EdgesGeometry(icosaGeo);
      const wireMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0xd50032 : 0xa50034,
        transparent: true,
        opacity: 0.3,
        linewidth: 1
      });
      const polyLine = new THREE.LineSegments(icosaEdges, wireMat);
      group.add(polyLine);

      // (C) Nested Inner Octahedron Fine Wireframe
      const octaGeo = new THREE.OctahedronGeometry(26, 0);
      const octaEdges = new THREE.EdgesGeometry(octaGeo);
      const octaMat = new THREE.LineBasicMaterial({
        color: 0xffb3ba,
        transparent: true,
        opacity: 0.45,
        linewidth: 1
      });
      const innerPoly = new THREE.LineSegments(octaEdges, octaMat);
      group.add(innerPoly);

      // (D) Delicate 3D Golden Ratio Spiral Line
      const spiralPoints: THREE.Vector3[] = [];
      const spiralSteps = 80;
      for (let s = 0; s < spiralSteps; s++) {
        const t = (s / spiralSteps) * (Math.PI * 4);
        const radius = Math.pow(PHI, t / Math.PI) * 7.0;
        spiralPoints.push(
          new THREE.Vector3(
            Math.cos(t) * radius,
            Math.sin(t) * radius,
            (s - spiralSteps / 2) * 0.8
          )
        );
      }
      const spiralGeo = new THREE.BufferGeometry().setFromPoints(spiralPoints);
      const spiralMat = new THREE.LineBasicMaterial({
        color: 0xd50032,
        transparent: true,
        opacity: 0.32,
        linewidth: 1
      });
      const spiralLine = new THREE.Line(spiralGeo, spiralMat);
      spiralLine.rotation.x = Math.PI / 2.4;
      group.add(spiralLine);

      const zDepths = [-140, 40, -100, 80, -35];
      const yOffsets = [-25, 60, -65, 45, -15];

      group.position.set(xPos, yOffsets[idx], zDepths[idx]);
      group.scale.setScalar(0.72 + (idx % 3) * 0.16);
      scene.add(group);
      geometricGroups.push(group);
    });

    fineLineGeometricMeshesRef.current = geometricGroups;

    // 6. Generative Phyllotaxis Flower & Golden Spiral Spores (Calm, Serene, Less Busy)
    const particleCount = 420; // Reduced count for calm elegance
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const c1 = new THREE.Color(0xd50032); // Crimson
    const c2 = new THREE.Color(0xffb3ba); // Blossom Pink
    const c3 = new THREE.Color(0xf9c2c2); // Soft Blush
    const c4 = new THREE.Color(0xffffff); // Pure White

    const GOLDEN_ANGLE = 137.507764 * (Math.PI / 180);

    for (let i = 0; i < particleCount; i++) {
      const sectionOffset = (i / particleCount) * 3600 - 150;
      const angle = i * GOLDEN_ANGLE;
      const radius = Math.sqrt(i % 120) * 26;

      positions[i * 3] = sectionOffset + Math.cos(angle) * (radius * 0.4);
      positions[i * 3 + 1] = Math.sin(angle) * radius + (Math.sin(i * 0.15) * 30);
      positions[i * 3 + 2] = Math.cos(angle * 1.618) * 380 + (Math.random() - 0.5) * 80;

      const seed = i % 4;
      const col = seed === 0 ? c1 : seed === 1 ? c2 : seed === 2 ? c3 : c4;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 3.5 + 2.0;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d')!;
    const radGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    radGrad.addColorStop(0, 'rgba(255,255,255,1)');
    radGrad.addColorStop(0.35, 'rgba(255,179,186,0.8)');
    radGrad.addColorStop(0.7, 'rgba(213,0,50,0.35)');
    radGrad.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = radGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 6,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      opacity: 0.42, // Soft, non-intrusive
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    phyllotaxisPointsRef.current = particles;

    // 7. Render Loop with Smooth, Slow & Reactive Motion (Zero Frenetic Spinning)
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      if (!cameraRef.current || !sceneRef.current || !rendererRef.current) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Camera Horizontal Dolly based on Scroll
      const trackLength = totalWidth - width;
      const targetCamX = scrollProgress * (trackLength > 0 ? trackLength : 3200);

      const mouseFactor = cameraSettings.mouseParallaxFactor * 50;
      const targetCamY = mousePos.y * mouseFactor;
      const mouseCamXOffset = mousePos.x * mouseFactor;

      // Smooth Camera Damping
      const smoothFactor = Math.min(1, delta * (cameraSettings.smoothing * 60));
      cameraRef.current.position.x += (targetCamX + mouseCamXOffset - cameraRef.current.position.x) * smoothFactor;
      cameraRef.current.position.y += (targetCamY - cameraRef.current.position.y) * 0.05;
      cameraRef.current.position.z += (cameraSettings.dollyZ - cameraRef.current.position.z) * 0.06;

      cameraRef.current.lookAt(cameraRef.current.position.x + 25, cameraRef.current.position.y * 0.25, 0);

      // Smooth, Slow, Reactive Wireframe Rotation (Calm ambient drift + subtle mouse response)
      fineLineGeometricMeshesRef.current.forEach((group, i) => {
        // Very slow, peaceful ambient rotation
        group.rotation.y += 0.02 * delta;

        // Reactive tilt tracking user's mouse gently
        const targetRotX = mousePos.y * 0.12 + Math.sin(elapsedTime * 0.4 + i) * 0.04;
        const targetRotZ = mousePos.x * 0.1;
        group.rotation.x += (targetRotX - group.rotation.x) * 0.025;
        group.rotation.z += (targetRotZ - group.rotation.z) * 0.025;

        // Subtle, gentle floating height drift (no frenetic bobbing)
        const gentleFloat = Math.sin(elapsedTime * 0.5 + i) * 1.8;
        group.position.y = yOffsets[i] + gentleFloat + (audioActive ? Math.sin(elapsedTime * 2 + i) * 1.2 : 0);

        // Very subtle breathing pulse
        const breath = 1 + Math.sin(elapsedTime * 0.8 + i) * 0.015;
        group.scale.set(breath, breath, breath);
      });

      // Calm, slow drift for particles
      if (phyllotaxisPointsRef.current) {
        phyllotaxisPointsRef.current.rotation.z = elapsedTime * 0.003;
        phyllotaxisPointsRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.01;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    const yOffsets = [-25, 60, -65, 45, -15];

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

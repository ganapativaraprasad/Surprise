import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface CinematicUniverse3DProps {
  constellationSlot: React.RefObject<HTMLDivElement>;
  onOpenWishes: () => void;
  onPlayWaterDrop: () => void;
  onPlayStarCollect: () => void;
}

export const CinematicUniverse3D: React.FC<CinematicUniverse3DProps> = ({
  constellationSlot,
  onOpenWishes,
  onPlayWaterDrop,
  onPlayStarCollect,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasFallback, setHasFallback] = useState(false);
  const reducedMotion = useReducedMotion();

  // Active ripples list for water shader
  const ripplesRef = useRef<{ x: number; y: number; time: number }[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    const nameSlot = constellationSlot.current;
    if (!container || !nameSlot) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x10182f, 0.008);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 38);
    camera.lookAt(0, 4, 0);
    camera.updateMatrixWorld();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setHasFallback(true);
      return;
    }
    setHasFallback(false);
    renderer.setSize(width, height);
    // Optimized adaptive pixel ratio to ensure 60fps on both desktop and mobile devices
    const isMobile = typeof window !== 'undefined' && (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0x282348, 1.4);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xfff5e4, 2.0);
    moonLight.position.set(0, 18, 10);
    scene.add(moonLight);

    // 3. Background Ambient Stars: Clean, refined distant night sky
    const starCount = 900;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorPalette = [
      new THREE.Color(0xffffff), // pure white
      new THREE.Color(0xf5d58d), // champagne gold
      new THREE.Color(0xe8eaf5), // moonlight silver
      new THREE.Color(0xa99bcf), // twilight lavender
      new THREE.Color(0xe9a8c9), // soft pink
    ];

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 170;
      starPos[i * 3 + 1] = 2.0 + Math.random() * 55;
      starPos[i * 3 + 2] = -25 - Math.random() * 70;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Star particle diamond texture: sharp pinpoint core with subtle 4-pointed glint
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 64;
    starCanvas.height = 64;
    const sCtx = starCanvas.getContext('2d')!;
    const sGrad = sCtx.createRadialGradient(32, 32, 0, 32, 32, 28);
    sGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    sGrad.addColorStop(0.18, 'rgba(255, 245, 215, 0.95)');
    sGrad.addColorStop(0.5, 'rgba(210, 195, 255, 0.25)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 64, 64);
    sCtx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    sCtx.lineWidth = 1.2;
    sCtx.beginPath();
    sCtx.moveTo(32, 6); sCtx.lineTo(32, 58);
    sCtx.moveTo(6, 32); sCtx.lineTo(58, 32);
    sCtx.stroke();
    const starTex = new THREE.CanvasTexture(starCanvas);

    const starMat = new THREE.PointsMaterial({
      size: 0.95,
      vertexColors: true,
      map: starTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 4. Procedural Realistic Full Moon
    const moonCanvas = document.createElement('canvas');
    moonCanvas.width = 1024;
    moonCanvas.height = 1024;
    const mCtx = moonCanvas.getContext('2d')!;

    const mGrad = mCtx.createRadialGradient(480, 480, 50, 512, 512, 512);
    mGrad.addColorStop(0, '#FFFFFF');
    mGrad.addColorStop(0.6, '#F8FAFC');
    mGrad.addColorStop(0.9, '#E2E8F0');
    mGrad.addColorStop(1, '#CBD5E1');
    mCtx.fillStyle = mGrad;
    mCtx.fillRect(0, 0, 1024, 1024);

    // Maria (Darker basalt plains)
    mCtx.fillStyle = 'rgba(148, 163, 184, 0.28)';
    const maria = [
      { x: 380, y: 340, rx: 140, ry: 90, r: 0.2 },
      { x: 620, y: 410, rx: 170, ry: 130, r: -0.3 },
      { x: 340, y: 550, rx: 190, ry: 140, r: 0.1 },
      { x: 580, y: 640, rx: 130, ry: 100, r: 0.4 },
      { x: 490, y: 260, rx: 90, ry: 60, r: -0.1 },
    ];
    maria.forEach((m) => {
      mCtx.save();
      mCtx.translate(m.x, m.y);
      mCtx.rotate(m.r);
      mCtx.beginPath();
      mCtx.ellipse(0, 0, m.rx, m.ry, 0, 0, Math.PI * 2);
      mCtx.fill();
      mCtx.restore();
    });

    // Craters & ray streaks
    mCtx.fillStyle = 'rgba(100, 116, 139, 0.3)';
    for (let i = 0; i < 40; i++) {
      const cx = 150 + Math.random() * 720;
      const cy = 150 + Math.random() * 720;
      const cr = 6 + Math.random() * 22;
      mCtx.beginPath();
      mCtx.arc(cx, cy, cr, 0, Math.PI * 2);
      mCtx.fill();

      mCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      mCtx.lineWidth = 2;
      mCtx.beginPath();
      mCtx.arc(cx - 2, cy - 2, cr * 0.9, Math.PI * 0.6, Math.PI * 1.6);
      mCtx.stroke();
    }

    const moonTexture = new THREE.CanvasTexture(moonCanvas);
    const moonGeo = new THREE.SphereGeometry(5.0, 64, 64);
    const moonMat = new THREE.MeshStandardMaterial({
      map: moonTexture,
      roughness: 0.85,
      metalness: 0.05,
      emissive: new THREE.Color(0xfefce8),
      emissiveIntensity: 0.38,
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    // Positioned gracefully in the upper sky, leaving negative space for the central star constellation
    moonMesh.position.set(0, 16.5, -34);
    scene.add(moonMesh);

    // Moon Atmospheric Radiant Halo
    const haloCanvas = document.createElement('canvas');
    haloCanvas.width = 256;
    haloCanvas.height = 256;
    const hCtx = haloCanvas.getContext('2d')!;
    const hGrad = hCtx.createRadialGradient(128, 128, 40, 128, 128, 128);
    hGrad.addColorStop(0, 'rgba(255, 255, 255, 0.65)');
    hGrad.addColorStop(0.35, 'rgba(245, 213, 141, 0.35)');
    hGrad.addColorStop(0.7, 'rgba(169, 155, 207, 0.15)');
    hGrad.addColorStop(1, 'rgba(16, 24, 47, 0)');
    hCtx.fillStyle = hGrad;
    hCtx.fillRect(0, 0, 256, 256);
    const haloTex = new THREE.CanvasTexture(haloCanvas);

    const haloMat = new THREE.SpriteMaterial({
      map: haloTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.75,
    });
    const moonHalo = new THREE.Sprite(haloMat);
    moonHalo.scale.set(28, 28, 1);
    moonHalo.position.copy(moonMesh.position);
    moonHalo.position.z -= 0.8;
    scene.add(moonHalo);

    // 5. Layered Mountain Silhouettes
    const createMountainRidge = (
      z: number,
      y: number,
      color: number,
      opacity: number,
      heightScale: number,
      pointsCount: number
    ) => {
      const shape = new THREE.Shape();
      shape.moveTo(-150, -40);

      const segmentWidth = 300 / pointsCount;
      const points: THREE.Vector2[] = [];

      for (let i = 0; i <= pointsCount; i++) {
        const x = -150 + i * segmentWidth;
        const freq1 = Math.sin(i * 0.35);
        const freq2 = Math.cos(i * 0.75) * 0.5;
        const freq3 = Math.sin(i * 1.8) * 0.25;
        const h = (freq1 + freq2 + freq3 + 1.2) * heightScale;
        points.push(new THREE.Vector2(x, y + h));
      }

      points.forEach((pt) => shape.lineTo(pt.x, pt.y));
      shape.lineTo(150, -40);
      shape.closePath();

      const geom = new THREE.ShapeGeometry(shape);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.z = z;
      return mesh;
    };

    const mtnFar = createMountainRidge(-60, -2, 0x141b38, 0.85, 4.5, 36);
    scene.add(mtnFar);

    const mtnMid = createMountainRidge(-40, -4, 0x0f162e, 0.95, 3.8, 30);
    scene.add(mtnMid);

    const mtnNear = createMountainRidge(-25, -6, 0x0a0f21, 1.0, 2.5, 24);
    scene.add(mtnNear);

    // 6. Lake Water with Custom Reflection & Ripple Shader
    const waterUniforms = {
      uTime: { value: 0 },
      uMoonPos: { value: new THREE.Vector2(0, 0.65) },
      uRipples: { value: new Float32Array(10 * 3) },
      uActiveRipples: { value: 0 },
    };

    const waterVertexShader = `
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `;

    const waterFragmentShader = `
      uniform float uTime;
      uniform vec2 uMoonPos;
      uniform vec3 uRipples[10];
      uniform int uActiveRipples;
      varying vec2 vUv;
      varying vec3 vWorldPosition;

      void main() {
        vec3 deepColor = vec3(0.04, 0.06, 0.14);
        vec3 surfaceColor = vec3(0.07, 0.10, 0.22);
        vec3 waterColor = mix(surfaceColor, deepColor, vUv.y);

        float wave1 = sin(vWorldPosition.x * 0.4 + uTime * 1.8) * 0.015;
        float wave2 = cos(vWorldPosition.z * 0.3 + uTime * 1.2) * 0.015;
        float waveTotal = wave1 + wave2;

        float rippleDistort = 0.0;
        for(int i = 0; i < 10; i++) {
          if (i >= uActiveRipples) break;
          vec2 rCenter = uRipples[i].xy;
          float rAge = uRipples[i].z;
          float dist = distance(vWorldPosition.xz, rCenter);
          float radius = rAge * 9.0;
          float waveWidth = 1.8;
          
          if (dist > radius - waveWidth && dist < radius + waveWidth) {
            float strength = (1.0 - smoothstep(0.0, 4.0, rAge)) * 0.08;
            rippleDistort += sin((dist - radius) * 5.0) * strength;
          }
        }

        // Moonlight Reflection Column
        float distFromMoonCol = abs(vWorldPosition.x + waveTotal * 12.0 + rippleDistort * 8.0);
        float moonBeam = exp(-distFromMoonCol * distFromMoonCol * 0.025);
        float moonBeamIntensity = smoothstep(0.0, 1.0, 1.0 - vUv.y * 0.8) * moonBeam;
        
        vec2 water = vWorldPosition.xz;
        float chop = sin(water.x * 1.35 + water.y * 0.45 - uTime * 0.7);
        float crest = sin(water.y * 4.7 + chop * 1.5 + uTime * 1.9);
        float crossCurrent = sin(water.x * 2.1 - water.y * 2.8 + uTime * 1.2);
        float shimmer = pow(max(0.0, crest), 4.0) * smoothstep(-0.55, 0.85, crossCurrent);

        vec3 moonLightColor = vec3(0.96, 0.93, 0.85);
        vec3 goldAccent = vec3(0.96, 0.84, 0.55);

        vec3 finalColor = waterColor;
        finalColor += moonLightColor * moonBeamIntensity * 0.5;
        finalColor += goldAccent * (moonBeamIntensity * shimmer) * 0.82;
        finalColor += vec3(rippleDistort * 0.8);

        float alpha = smoothstep(0.0, 0.15, vUv.y) * 0.95;
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const waterMat = new THREE.ShaderMaterial({
      uniforms: waterUniforms,
      vertexShader: waterVertexShader,
      fragmentShader: waterFragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const waterGeo = new THREE.PlaneGeometry(160, 50, 32, 32);
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2 + 0.15;
    waterMesh.position.set(0, -9.5, 8);
    scene.add(waterMesh);

    // 7. Fireflies: delicate, small, hovering strictly near the lake surface
    const fireflyCount = 24;
    const fireflyGeo = new THREE.BufferGeometry();
    const fireflyPos = new Float32Array(fireflyCount * 3);
    const fireflyBasePos: { x: number; y: number; z: number; phase: number; speed: number }[] = [];

    for (let i = 0; i < fireflyCount; i++) {
      const bx = (Math.random() - 0.5) * 44;
      const by = -1.2 + Math.random() * 2.2; // strictly hover near water
      const bz = -8 + Math.random() * 18;    // middle distance, never right at camera!
      fireflyPos[i * 3] = bx;
      fireflyPos[i * 3 + 1] = by;
      fireflyPos[i * 3 + 2] = bz;

      fireflyBasePos.push({
        x: bx,
        y: by,
        z: bz,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.5,
      });
    }

    fireflyGeo.setAttribute('position', new THREE.BufferAttribute(fireflyPos, 3));

    const ffCanvas = document.createElement('canvas');
    ffCanvas.width = 32;
    ffCanvas.height = 32;
    const ffCtx = ffCanvas.getContext('2d')!;
    const ffGrad = ffCtx.createRadialGradient(16, 16, 0, 16, 16, 14);
    ffGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    ffGrad.addColorStop(0.25, 'rgba(254, 240, 138, 0.9)');
    ffGrad.addColorStop(0.65, 'rgba(245, 158, 11, 0.35)');
    ffGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ffCtx.fillStyle = ffGrad;
    ffCtx.fillRect(0, 0, 32, 32);
    const ffTex = new THREE.CanvasTexture(ffCanvas);

    const fireflyMat = new THREE.PointsMaterial({
      size: 0.42,
      map: ffTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fireflyPoints = new THREE.Points(fireflyGeo, fireflyMat);
    scene.add(fireflyPoints);

    // 8. CELESTIAL STAR CONSTELLATION: FORMING "SABDHA" LETTER BY LETTER
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 1200;
    textCanvas.height = 240;
    const tCtx = textCanvas.getContext('2d')!;

    const nameCenterY = 9.2;
    const nameDepth = -14;
    const letterChars = ['S', 'A', 'B', 'D', 'H', 'A'];
    const letterCenters = [200, 360, 520, 680, 840, 1000];

    interface ConstellationStar {
      target: THREE.Vector3;
      origin: THREE.Vector3;
      letterIndex: number;
      isContour: boolean;
      isAnchor: boolean;
      twinkleSpeed: number;
      twinklePhase: number;
      baseColor: { r: number; g: number; b: number };
    }

    const constellationStars: ConstellationStar[] = [];

    letterChars.forEach((char, lIdx) => {
      const cx = letterCenters[lIdx];

      // 1. Contour stroke sampling (crisp letter outlines, serifs, stems)
      tCtx.clearRect(0, 0, 1200, 240);
      tCtx.fillStyle = '#000000';
      tCtx.fillRect(0, 0, 1200, 240);
      tCtx.font = '600 115px "Playfair Display", "Cinzel", "Cormorant Garamond", Georgia, serif';
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.strokeStyle = '#FFFFFF';
      tCtx.lineWidth = 2.8;
      tCtx.strokeText(char, cx, 120);

      const strokeImg = tCtx.getImageData(cx - 90, 30, 180, 180).data;
      for (let py = 0; py < 180; py += 4) {
        for (let px = 0; px < 180; px += 4) {
          const idx = (py * 180 + px) * 4;
          if (strokeImg[idx] > 160) {
            const canvasX = (cx - 90) + px;
            const canvasY = 30 + py;

            const worldX = (canvasX - 600) * 0.033;
            const worldY = nameCenterY - (canvasY - 120) * 0.033;
            const worldZ = nameDepth + (Math.random() - 0.5) * 0.3;

            const ox = (Math.random() - 0.5) * 80;
            const oy = 6 + Math.random() * 26;
            const oz = -20 - Math.random() * 40;

            const isAnchor = Math.random() < 0.12;

            constellationStars.push({
              target: new THREE.Vector3(worldX, worldY, worldZ),
              origin: new THREE.Vector3(ox, oy, oz),
              letterIndex: lIdx,
              isContour: true,
              isAnchor,
              twinkleSpeed: 1.6 + Math.random() * 2.2,
              twinklePhase: Math.random() * Math.PI * 2,
              baseColor: isAnchor
                ? { r: 0.98, g: 0.88, b: 0.58 } // warm champagne gold
                : { r: 0.94, g: 0.96, b: 1.0 }, // moonlight white
            });
          }
        }
      }

      // 2. Sparse interior fill sampling (preserves readability without blurring into a solid block)
      tCtx.clearRect(0, 0, 1200, 240);
      tCtx.fillStyle = '#000000';
      tCtx.fillRect(0, 0, 1200, 240);
      tCtx.fillStyle = '#FFFFFF';
      tCtx.fillText(char, cx, 120);

      const fillImg = tCtx.getImageData(cx - 90, 30, 180, 180).data;
      for (let py = 2; py < 180; py += 6) {
        for (let px = 2; px < 180; px += 6) {
          const idx = (py * 180 + px) * 4;
          if (fillImg[idx] > 200 && Math.random() < 0.35) {
            const canvasX = (cx - 90) + px + (Math.random() - 0.5) * 1.5;
            const canvasY = 30 + py + (Math.random() - 0.5) * 1.5;

            const worldX = (canvasX - 600) * 0.033;
            const worldY = nameCenterY - (canvasY - 120) * 0.033;
            const worldZ = nameDepth + (Math.random() - 0.5) * 0.3;

            const ox = (Math.random() - 0.5) * 80;
            const oy = 6 + Math.random() * 26;
            const oz = -20 - Math.random() * 40;

            constellationStars.push({
              target: new THREE.Vector3(worldX, worldY, worldZ),
              origin: new THREE.Vector3(ox, oy, oz),
              letterIndex: lIdx,
              isContour: false,
              isAnchor: false,
              twinkleSpeed: 1.3 + Math.random() * 1.8,
              twinklePhase: Math.random() * Math.PI * 2,
              baseColor: { r: 0.96, g: 0.91, b: 0.76 }, // soft starlight gold
            });
          }
        }
      }
    });

    const cCount = constellationStars.length;
    const cGeo = new THREE.BufferGeometry();
    const cPos = new Float32Array(cCount * 3);
    const cColors = new Float32Array(cCount * 3);

    for (let i = 0; i < cCount; i++) {
      const star = constellationStars[i];
      cPos[i * 3] = star.origin.x;
      cPos[i * 3 + 1] = star.origin.y;
      cPos[i * 3 + 2] = star.origin.z;

      cColors[i * 3] = star.baseColor.r;
      cColors[i * 3 + 1] = star.baseColor.g;
      cColors[i * 3 + 2] = star.baseColor.b;
    }

    cGeo.setAttribute('position', new THREE.BufferAttribute(cPos, 3));
    cGeo.setAttribute('color', new THREE.BufferAttribute(cColors, 3));

    const cMat = new THREE.PointsMaterial({
      size: 0.85,
      map: starTex,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const constellationPoints = new THREE.Points(cGeo, cMat);
    scene.add(constellationPoints);

    const fitConstellation = () => {
      const bounds = container.getBoundingClientRect();
      const slot = nameSlot.getBoundingClientRect();
      const center = new THREE.Vector3(0, nameCenterY, nameDepth).project(camera);
      const outer = new THREE.Vector3(15, nameCenterY + 2, nameDepth).project(camera);
      const nameWidth = outer.x * bounds.width;
      const nameHeight = (outer.y - center.y) * bounds.height;
      const scale = Math.min(1, (slot.width * 0.94) / nameWidth, (slot.height * 0.85) / nameHeight);

      // Place the star name in the text layout's reserved space at its original depth.
      center.x = ((slot.left + slot.width / 2 - bounds.left) / bounds.width) * 2 - 1;
      center.y = 1 - ((slot.top + slot.height / 2 - bounds.top) / bounds.height) * 2;
      center.unproject(camera);
      constellationPoints.scale.set(scale, scale, 1);
      constellationPoints.position.set(center.x, center.y - nameCenterY * scale, center.z - nameDepth);
      cMat.size = 0.85 * scale;
    };
    fitConstellation();

    // 9. Interactive Raycasting (Lake, Moon, Sky)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const bounds = container.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);

      // Check Moon Click -> Open 22 Wishes
      const moonHits = raycaster.intersectObject(moonMesh);
      if (moonHits.length > 0) {
        onOpenWishes();
        return;
      }

      // Check Lake Click -> Ripple wave
      const waterHits = raycaster.intersectObject(waterMesh);
      if (waterHits.length > 0) {
        const hitPt = waterHits[0].point;
        if (ripplesRef.current.length >= 10) ripplesRef.current.shift();
        ripplesRef.current.push({ x: hitPt.x, y: hitPt.z, time: 0 });
        onPlayWaterDrop();
        return;
      }

      // Sky Click -> Starburst chime
      if (mouse.y > -0.2) {
        onPlayStarCollect();
      }
    };

    container.addEventListener('click', handlePointerDown);

    // 10. Resize handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      fitConstellation();
      renderer.setSize(width, height);
      if (reducedMotion) renderer.render(scene, camera);
    };
    const layoutObserver = new ResizeObserver(handleResize);
    layoutObserver.observe(container);
    layoutObserver.observe(nameSlot);
    if (nameSlot.parentElement) layoutObserver.observe(nameSlot.parentElement);

    // 11. Animation Loop with Smooth Constellation Morphing
    const startTime = performance.now();
    let lastTime = startTime;
    let elapsedTime = 0;
    let animId = 0;
    let frameCount = 0;
    let isPositionsSettled = false;

    // Smoothstep easing helper
    const smoothStep = (min: number, max: number, value: number) => {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    };

    const animate = (now: number) => {
      if (!reducedMotion) animId = requestAnimationFrame(animate);
      frameCount++;
      const delta = reducedMotion ? 0 : Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsedTime += delta;
      const elapsed = reducedMotion ? 6 : elapsedTime;

      // Update Water Shader
      waterUniforms.uTime.value = elapsed;

      // Update Ripples
      const rippleData = waterUniforms.uRipples.value;
      for (let i = 0; i < 10; i++) {
        if (i < ripplesRef.current.length) {
          const r = ripplesRef.current[i];
          r.time += delta;
          rippleData[i * 3] = r.x;
          rippleData[i * 3 + 1] = r.y;
          rippleData[i * 3 + 2] = r.time;
        } else {
          rippleData[i * 3 + 2] = 999.0;
        }
      }
      ripplesRef.current = ripplesRef.current.filter((r) => r.time < 4.0);
      waterUniforms.uActiveRipples.value = ripplesRef.current.length;

      // Update Fireflies: gentle hover near lake water
      const ffPosAttr = fireflyGeo.attributes.position as THREE.BufferAttribute;
      const ffArray = ffPosAttr.array as Float32Array;
      for (let i = 0; i < fireflyCount; i++) {
        const bp = fireflyBasePos[i];
        bp.phase += delta * bp.speed;
        ffArray[i * 3] = bp.x + Math.sin(bp.phase * 0.8) * 0.8;
        ffArray[i * 3 + 1] = bp.y + Math.cos(bp.phase * 1.1) * 0.35;
        ffArray[i * 3 + 2] = bp.z + Math.sin(bp.phase * 0.6) * 0.6;
      }
      ffPosAttr.needsUpdate = true;

      // Moon gentle rotation & floating in upper sky
      moonMesh.rotation.y = elapsed * 0.015;
      moonMesh.position.y = 16.5 + Math.sin(elapsed * 0.3) * 0.15;
      moonHalo.position.y = moonMesh.position.y;

      // --- LETTER-BY-LETTER CONSTELLATION REVEAL & STABLE STAR-FORMED STATE ---
      // Optimized: Once settled, positions buffer is locked to save GPU bandwidth and maintain 60 FPS
      const cPosAttr = cGeo.attributes.position as THREE.BufferAttribute;
      const cPosArray = cPosAttr.array as Float32Array;

      const cColorAttr = cGeo.attributes.color as THREE.BufferAttribute;
      const cColorArray = cColorAttr.array as Float32Array;

      const isSettled = elapsed >= 5.5;

      if (!isPositionsSettled || !isSettled) {
        for (let i = 0; i < cCount; i++) {
          const star = constellationStars[i];
          const tStart = 0.8 + star.letterIndex * 0.6;
          const tEnd = tStart + 1.2;

          let p = 0.0;
          if (elapsed >= tEnd) {
            p = 1.0;
          } else if (elapsed > tStart) {
            p = smoothStep(tStart, tEnd, elapsed);
          }

          if (p < 1.0) {
            // Graceful cosmic flight in from the deep galaxy
            cPosArray[i * 3] = star.origin.x + (star.target.x - star.origin.x) * p;
            cPosArray[i * 3 + 1] = star.origin.y + (star.target.y - star.origin.y) * p + Math.sin(p * Math.PI) * 1.5;
            cPosArray[i * 3 + 2] = star.origin.z + (star.target.z - star.origin.z) * p;
          } else {
            // Permanent readable resting state
            cPosArray[i * 3] = star.target.x;
            cPosArray[i * 3 + 1] = star.target.y;
            cPosArray[i * 3 + 2] = star.target.z;
          }
        }
        cPosAttr.needsUpdate = true;
        if (isSettled) {
          isPositionsSettled = true;
        }
      }

      // Update twinkling colors every 2nd frame to halve GPU upload bandwidth
      if (frameCount % 2 === 0) {
        for (let i = 0; i < cCount; i++) {
          const star = constellationStars[i];
          const tw = Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase) * 0.18;
          cColorArray[i * 3] = Math.min(1.0, star.baseColor.r + tw);
          cColorArray[i * 3 + 1] = Math.min(1.0, star.baseColor.g + tw);
          cColorArray[i * 3 + 2] = Math.min(1.0, star.baseColor.b + tw);
        }
        cColorAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate(startTime);

    return () => {
      layoutObserver.disconnect();
      container.removeEventListener('click', handlePointerDown);
      cancelAnimationFrame(animId);

      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      starTex.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      moonTexture.dispose();
      haloTex.dispose();
      haloMat.dispose();
      waterGeo.dispose();
      waterMat.dispose();
      fireflyGeo.dispose();
      fireflyMat.dispose();
      ffTex.dispose();
      cGeo.dispose();
      cMat.dispose();
      for (const mountain of [mtnFar, mtnMid, mtnNear]) {
        mountain.geometry.dispose();
        mountain.material.dispose();
      }

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [constellationSlot, onOpenWishes, onPlayWaterDrop, onPlayStarCollect, reducedMotion]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 w-full h-full z-0 overflow-hidden select-none ${hasFallback ? 'finale-sky-fallback' : 'cursor-pointer'}`}
      aria-hidden="true"
    />
  );
};

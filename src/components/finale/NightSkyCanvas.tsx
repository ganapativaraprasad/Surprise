import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface NightSkyCanvasProps {
  onLakeClick?: () => void;
  onSkyClick?: () => void;
}

export const NightSkyCanvas: React.FC<NightSkyCanvasProps> = ({
  onLakeClick,
  onSkyClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const horizonY = () => height * 0.62; // Lake begins at 62% from top

    // 1. Stars Generation
    interface Star {
      x: number;
      y: number;
      radius: number;
      baseAlpha: number;
      twinkleSpeed: number;
      color: string;
      phase: number;
    }

    const starCount = Math.min(600, Math.floor((width * height) / 2500));
    const stars: Star[] = [];
    const starColors = ['#FFFFFF', '#FEF08A', '#E0E7FF', '#C7D2FE', '#FDE047'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * horizonY(),
        radius: 0.5 + Math.random() * 1.6,
        baseAlpha: 0.2 + Math.random() * 0.7,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        phase: Math.random() * Math.PI * 2,
      });
    }

    // 2. Shooting Stars
    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    const shootingStars: ShootingStar[] = [];
    const triggerShootingStar = (originX?: number, originY?: number) => {
      shootingStars.push({
        x: originX !== undefined ? originX : Math.random() * width * 0.8,
        y: originY !== undefined ? originY : Math.random() * (horizonY() * 0.5),
        length: 80 + Math.random() * 100,
        speed: 12 + Math.random() * 8,
        angle: (Math.PI / 4) + (Math.random() - 0.5) * 0.3,
        opacity: 1.0,
        active: true,
      });
    };

    let shootingStarTimer = 0;

    // 3. Fireflies
    interface Firefly {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      dAlpha: number;
      color: string;
    }

    const fireflyCount = 45;
    const fireflies: Firefly[] = [];
    for (let i = 0; i < fireflyCount; i++) {
      fireflies.push({
        x: Math.random() * width,
        y: horizonY() - 80 + Math.random() * (height - horizonY() + 60),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.4,
        size: 1.5 + Math.random() * 2.2,
        alpha: 0.2 + Math.random() * 0.7,
        dAlpha: (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1),
        color: Math.random() < 0.6 ? '#FDE047' : '#86EFAC',
      });
    }

    // 4. Interactive Water Ripples
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
    }
    const ripples: Ripple[] = [];

    // 5. Interactive Star Bursts
    interface SparkleBurst {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      radius: number;
    }
    const sparkles: SparkleBurst[] = [];

    // Canvas click handler
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const hz = horizonY();

      if (clickY >= hz) {
        // Clicked on lake -> create ripple
        ripples.push({
          x: clickX,
          y: clickY,
          radius: 2,
          maxRadius: 60 + Math.random() * 40,
          opacity: 0.8,
        });
        onLakeClick?.();
      } else {
        // Clicked on sky -> create star burst & shooting star
        for (let i = 0; i < 16; i++) {
          const angle = (Math.PI * 2 * i) / 16;
          const speed = 1.5 + Math.random() * 3.5;
          sparkles.push({
            x: clickX,
            y: clickY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1.0,
            color: Math.random() < 0.5 ? '#FEF08A' : '#F472B6',
            radius: 1.5 + Math.random() * 2,
          });
        }
        triggerShootingStar(clickX, clickY);
        onSkyClick?.();
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.03;
      const hz = horizonY();

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // --- A. SKY GRADIENT ---
      const skyGrad = ctx.createLinearGradient(0, 0, 0, hz);
      skyGrad.addColorStop(0, '#04060E');
      skyGrad.addColorStop(0.4, '#090E20');
      skyGrad.addColorStop(0.8, '#131A38');
      skyGrad.addColorStop(1, '#1E264E');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, hz);

      // Soft Nebula Glow
      const nebula = ctx.createRadialGradient(width * 0.45, hz * 0.35, 10, width * 0.45, hz * 0.35, width * 0.5);
      nebula.addColorStop(0, 'rgba(124, 58, 237, 0.14)');
      nebula.addColorStop(0.6, 'rgba(236, 72, 153, 0.08)');
      nebula.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, hz);

      // --- B. TWINKLING STARS ---
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.phase += s.twinkleSpeed;
        const currentAlpha = Math.max(0.1, Math.min(1, s.baseAlpha + Math.sin(s.phase) * 0.35));

        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- C. SHOOTING STARS ---
      shootingStarTimer++;
      if (shootingStarTimer % 280 === 0 && Math.random() < 0.8) {
        triggerShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        if (!ss.active) continue;

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.opacity -= 0.015;

        if (ss.opacity <= 0 || ss.y > hz) {
          ss.active = false;
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const ssGrad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        ssGrad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
        ssGrad.addColorStop(0.3, `rgba(254, 240, 138, ${ss.opacity * 0.8})`);
        ssGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = ssGrad;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Glowing head
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = ss.opacity;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- D. STAR BURSTS (CLICK SFX) ---
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.02;
        if (sp.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- E. THE PEACEFUL LAKE & WATER REFLECTION ---
      const lakeGrad = ctx.createLinearGradient(0, hz, 0, height);
      lakeGrad.addColorStop(0, '#0B1124');
      lakeGrad.addColorStop(0.4, '#070C1D');
      lakeGrad.addColorStop(1, '#03060E');
      ctx.fillStyle = lakeGrad;
      ctx.globalAlpha = 1.0;
      ctx.fillRect(0, hz, width, height - hz);

      // Moon Reflection Shimmer Column in Water
      const moonX = width * 0.5; // Aligned with Moon position
      const reflectionGrad = ctx.createLinearGradient(moonX, hz, moonX, height);
      reflectionGrad.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      reflectionGrad.addColorStop(0.2, 'rgba(254, 240, 138, 0.4)');
      reflectionGrad.addColorStop(0.7, 'rgba(199, 210, 254, 0.25)');
      reflectionGrad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');

      // Shimmering horizontal wave lines for water reflection
      const waveCount = 28;
      for (let w = 0; w < waveCount; w++) {
        const progress = w / waveCount;
        const waveY = hz + progress * (height - hz);
        const waveWidth = 70 + progress * 240;
        const waveOffset = Math.sin(time * 2 + w * 0.6) * (4 + progress * 8);

        ctx.strokeStyle = reflectionGrad;
        ctx.lineWidth = 1.2 + progress * 2;
        ctx.globalAlpha = (1 - progress * 0.6) * 0.5;

        ctx.beginPath();
        ctx.moveTo(moonX - waveWidth / 2 + waveOffset, waveY);
        ctx.lineTo(moonX + waveWidth / 2 + waveOffset, waveY);
        ctx.stroke();
      }

      // --- F. WATER RIPPLES ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 1.2;
        r.opacity -= 0.015;

        if (r.opacity <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.scale(1, 0.35); // Elliptical perspective for water surface
        ctx.beginPath();
        ctx.arc(0, 0, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200, 225, 255, ${r.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // --- G. GLOWING FIREFLIES ---
      for (let i = 0; i < fireflies.length; i++) {
        const f = fireflies[i];
        f.x += f.vx + Math.sin(time + i) * 0.2;
        f.y += f.vy + Math.cos(time + i) * 0.2;

        f.alpha += f.dAlpha;
        if (f.alpha > 0.85 || f.alpha < 0.15) {
          f.dAlpha = -f.dAlpha;
        }

        // Boundary wrap
        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;
        if (f.y < hz - 120) f.y = height - 10;
        if (f.y > height + 10) f.y = hz - 80;

        // Firefly Outer Glow
        ctx.fillStyle = f.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, f.alpha * 0.3));
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Firefly Inner Core
        ctx.globalAlpha = Math.max(0, Math.min(1, f.alpha));
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animId);
    };
  }, [onLakeClick, onSkyClick, prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full cursor-pointer"
    />
  );
};


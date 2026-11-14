import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface FloatingParticlesProps {
  density?: number;
  world?: 'memory' | 'universe';
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  density = 35,
  world = 'memory',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

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

    const colors =
      world === 'memory'
        ? [
            'rgba(255, 182, 193, 0.45)', // pink
            'rgba(232, 224, 240, 0.5)',  // lavender
            'rgba(253, 230, 138, 0.45)', // soft gold
            'rgba(255, 229, 217, 0.45)', // peach
            'rgba(244, 114, 182, 0.35)', // rose
          ]
        : [
            'rgba(254, 240, 138, 0.65)', // star gold
            'rgba(255, 255, 255, 0.75)', // bright white
            'rgba(167, 139, 250, 0.5)',  // violet
            'rgba(199, 210, 254, 0.55)', // indigo
          ];

    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      alpha: number;
      maxAlpha: number;
      dAlpha: number;
      isHeart?: boolean;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < density; i++) {
      const isHeart = world === 'memory' && Math.random() < 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isHeart ? 6 + Math.random() * 4 : 1.5 + Math.random() * 3.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.5,
        alpha: Math.random() * 0.5,
        maxAlpha: 0.4 + Math.random() * 0.5,
        dAlpha: 0.005 + Math.random() * 0.008,
        isHeart,
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      c.save();
      c.beginPath();
      c.translate(x, y);
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      c.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      c.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size);
      c.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      c.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        p.alpha += p.dAlpha;
        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.dAlpha = -p.dAlpha;
        }

        // Wrap around
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.radius);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [density, world, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
    />
  );
};

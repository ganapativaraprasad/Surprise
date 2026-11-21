import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  isBright?: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export const StarFieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
      initStars();
      if (reducedMotion) render();
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Gentle parallax target (-1 to 1)
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 30;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 20;
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(canvas);
    if (!reducedMotion) window.addEventListener('mousemove', handleMouseMove);

    // Initialize Stars
    let stars: Star[] = [];

    const starColors = [
      '#FFFFFF',
      '#FFF4E6', // Warm Champagne
      '#E9D5FF', // Soft Lavender
      '#FCE7F3', // Soft Rose Pink
      '#DDD6FE', // Violet
    ];

    const initStars = () => {
      stars = [];
      const starCount = Math.min(320, Math.floor((width * height) / 3600));
      for (let i = 0; i < starCount; i++) {
        const isBright = Math.random() < 0.08;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: isBright ? Math.random() * 1.6 + 1.2 : Math.random() * 1.1 + 0.4,
          baseAlpha: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          isBright,
        });
      }
    };

    initStars();

    // Shooting Stars
    const shootingStars: ShootingStar[] = [];
    let nextShootingStarTime = Date.now() + 2500;

    const spawnShootingStar = () => {
      const angle = (Math.PI / 180) * (30 + Math.random() * 25); // Slanted downward right
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * (height * 0.4),
        length: 80 + Math.random() * 70,
        speed: 9 + Math.random() * 6,
        angle,
        alpha: 1,
        life: 0,
        maxLife: 40 + Math.random() * 30,
      });
      nextShootingStarTime = Date.now() + 3500 + Math.random() * 4500;
    };

    // Render loop
    const render = () => {
      // Lerp mouse parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const px = mouseRef.current.x;
      const py = mouseRef.current.y;

      // Draw Twinkling Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.twinklePhase += s.twinkleSpeed;
        const alpha = Math.max(0.15, Math.min(1, s.baseAlpha + Math.sin(s.twinklePhase) * 0.35));

        // Parallax offset proportional to size
        const starX = (s.x + px * (s.size * 0.4) + width) % width;
        const starY = (s.y + py * (s.size * 0.4) + height) % height;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.arc(starX, starY, s.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point sparkle for bright stars
        if (s.isBright && alpha > 0.6) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = 0.6;
          ctx.globalAlpha = alpha * 0.7;

          const spike = s.size * 3.2;
          ctx.beginPath();
          ctx.moveTo(starX - spike, starY);
          ctx.lineTo(starX + spike, starY);
          ctx.moveTo(starX, starY - spike);
          ctx.lineTo(starX, starY + spike);
          ctx.stroke();

          // Soft glow halo
          const halo = ctx.createRadialGradient(starX, starY, 0, starX, starY, s.size * 4);
          halo.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
          halo.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(starX, starY, s.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Check shooting star spawn
      if (Date.now() > nextShootingStarTime) {
        spawnShootingStar();
      }

      // Draw & update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const progress = ss.life / ss.maxLife;
        ss.alpha = progress < 0.2 ? progress * 5 : 1 - (progress - 0.2) * 1.25;

        if (ss.life >= ss.maxLife || ss.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'rgba(244, 114, 182, 0)');
        grad.addColorStop(0.6, 'rgba(251, 191, 36, 0.4)');
        grad.addColorStop(1, `rgba(255, 255, 255, ${Math.max(0, ss.alpha)})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = ss.alpha;

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        // Glowing star head
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      if (!reducedMotion) animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

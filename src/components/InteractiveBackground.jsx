import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   InteractiveBackground
   A fluid dark blue and navy blue animated background without 
   dot glows or bubbles, per user's request.
───────────────────────────────────────────────────────────── */

export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const draw = () => {
      time += 0.005;
      const w = canvas.width;
      const h = canvas.height;

      // Base solid dark blue background
      ctx.fillStyle = '#051128'; 
      ctx.fillRect(0, 0, w, h);

      // Create gentle overlapping animated gradients (navy blue and deep blue)
      const g1 = ctx.createRadialGradient(
        w * 0.3 + Math.sin(time) * 200, 
        h * 0.4 + Math.cos(time * 0.8) * 100, 
        0, 
        w * 0.3, h * 0.4, w * 0.8
      );
      g1.addColorStop(0, 'rgba(14, 33, 85, 0.6)');
      g1.addColorStop(1, 'transparent');

      const g2 = ctx.createRadialGradient(
        w * 0.8 + Math.cos(time) * 150, 
        h * 0.8 + Math.sin(time * 1.1) * 150, 
        0, 
        w * 0.8, h * 0.8, w * 0.7
      );
      g2.addColorStop(0, 'rgba(9, 18, 48, 0.8)');
      g2.addColorStop(1, 'transparent');

      const g3 = ctx.createRadialGradient(
        w * 0.5 + Math.sin(time * 0.5) * 300, 
        h * 0.2 + Math.cos(time * 0.7) * 200, 
        0, 
        w * 0.5, h * 0.2, w * 0.9
      );
      g3.addColorStop(0, 'rgba(23, 56, 128, 0.3)');
      g3.addColorStop(1, 'transparent');

      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = g3;
      ctx.fillRect(0, 0, w, h);

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        background: '#040b16'
      }}
    />
  );
}

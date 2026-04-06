"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  // Target position (where the pixel lives in the letter)
  tx: number;
  ty: number;
  // Current position
  x: number;
  y: number;
  // Scatter-out destination
  sx: number;
  sy: number;
  // Size of the square
  size: number;
  // Stagger delay (0–1)
  delay: number;
  // Is it an orange accent particle?
  accent: boolean;
  // Per-particle opacity
  opacity: number;
}

const PARTICLE_SIZE = 6;
const SCATTER_RANGE = 300;
const PHASE_IN_DURATION = 700;    // ms to converge
const PHASE_HOLD_DURATION = 500;  // ms to hold
const PHASE_OUT_DURATION = 600;   // ms to scatter out
const TOTAL_DURATION = PHASE_IN_DURATION + PHASE_HOLD_DURATION + PHASE_OUT_DURATION;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeInCubic(t: number) {
  return t * t * t;
}

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // --- Build offscreen canvas to sample letter pixels ---
    const off = document.createElement("canvas");
    off.width = W;
    off.height = H;
    const offCtx = off.getContext("2d")!;

    const fontSize = Math.min(Math.floor(W / 7), 130);
    const subFontSize = Math.floor(fontSize * 0.55);

    offCtx.fillStyle = "#ffffff";
    offCtx.fillRect(0, 0, W, H);

    offCtx.font = `900 ${fontSize}px Impact, Arial Black, sans-serif`;
    offCtx.fillStyle = "#000000";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "alphabetic";

    const line1Y = H / 2 - fontSize * 0.15;
    const line2Y = H / 2 + subFontSize * 1.1;

    offCtx.fillText("KUSHAL", W / 2, line1Y);
    offCtx.font = `900 ${subFontSize}px Impact, Arial Black, sans-serif`;
    offCtx.letterSpacing = "0.3em";
    offCtx.fillText("KONGARA", W / 2, line2Y);

    // Sample every PARTICLE_SIZE-th pixel
    const imageData = offCtx.getImageData(0, 0, W, H);
    const data = imageData.data;

    const particles: Particle[] = [];
    const step = PARTICLE_SIZE;

    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        const idx = (y * W + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        // Check if pixel is dark (part of a letter)
        if (r < 80 && g < 80 && b < 80) {
          const isAccent = Math.random() < 0.1;
          particles.push({
            tx: x,
            ty: y,
            x: x + (Math.random() - 0.5) * SCATTER_RANGE * 2,
            y: y + (Math.random() - 0.5) * SCATTER_RANGE * 2,
            sx: x + (Math.random() - 0.5) * SCATTER_RANGE * 2.5,
            sy: y + (Math.random() - 0.5) * SCATTER_RANGE * 2.5,
            size: PARTICLE_SIZE - 1,
            delay: Math.random() * 0.4,
            accent: isAccent,
            opacity: 0,
          });
        }
      }
    }

    // --- Animation loop ---
    let startTime: number | null = null;
    let rafId: number;

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, W, H);

      for (const p of particles) {
        const delayedElapsed = elapsed - p.delay * PHASE_IN_DURATION;

        if (elapsed < PHASE_IN_DURATION) {
          // Phase 0: converge in
          const raw = Math.max(0, delayedElapsed) / PHASE_IN_DURATION;
          const t = easeInOutCubic(Math.min(raw, 1));
          p.x = lerp(p.x, p.tx, 0.12);
          p.opacity = Math.min(1, t * 2);
        } else if (elapsed < PHASE_IN_DURATION + PHASE_HOLD_DURATION) {
          // Phase 1: hold
          p.x = lerp(p.x, p.tx, 0.3);
          p.y = lerp(p.y, p.ty, 0.3);
          p.opacity = 1;
        } else {
          // Phase 2: scatter out
          const t = easeInCubic(
            Math.min((elapsed - PHASE_IN_DURATION - PHASE_HOLD_DURATION) / PHASE_OUT_DURATION, 1)
          );
          p.x = lerp(p.x, p.sx, 0.08);
          p.y = lerp(p.y, p.sy, 0.08);
          p.opacity = Math.max(0, 1 - t * 1.5);
        }

        if (elapsed < PHASE_IN_DURATION) {
          p.y = lerp(p.y, p.ty, 0.12);
        }

        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));
        ctx.fillStyle = p.accent ? "#ff5500" : "#0a0a0a";
        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      ctx.globalAlpha = 1;

      if (elapsed < TOTAL_DURATION + 100) {
        rafId = requestAnimationFrame(animate);
      } else {
        if (!doneRef.current) {
          doneRef.current = true;
          onDone();
        }
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [onDone]);

  return (
    <div className="fixed inset-0 z-[9999] bg-white pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}

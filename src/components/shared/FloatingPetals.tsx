"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  type: "jasmine" | "gold" | "rose";
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip on reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const petals: Petal[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createPetal = (): Petal => ({
      x: Math.random() * window.innerWidth,
      y: -20,
      size: 4 + Math.random() * 8,
      speedY: 0.6 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      opacity: 0.4 + Math.random() * 0.5,
      type: ["jasmine", "gold", "rose"][Math.floor(Math.random() * 3)] as Petal["type"],
    });

    // Seed initial petals
    for (let i = 0; i < 15; i++) {
      const p = createPetal();
      p.y = Math.random() * window.innerHeight;
      petals.push(p);
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.type === "jasmine") {
        ctx.fillStyle = "#FFFFF0";
        // Five petals
        for (let i = 0; i < 5; i++) {
          ctx.save();
          ctx.rotate((i * Math.PI * 2) / 5);
          ctx.beginPath();
          ctx.ellipse(0, -p.size * 0.6, p.size * 0.3, p.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
        ctx.fillStyle = "#FFD700";
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "gold") {
        ctx.fillStyle = "#C9972C";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "#E34234";
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Spawn new petals
      if (frame % 80 === 0 && petals.length < 30) {
        petals.push(createPetal());
      }

      for (let i = petals.length - 1; i >= 0; i--) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(frame * 0.01 + i) * 0.3;
        p.rotation += p.rotationSpeed;

        drawPetal(p);

        if (p.y > window.innerHeight + 30) {
          petals.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="petalCanvas"
      aria-hidden="true"
    />
  );
}

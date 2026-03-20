"use client";

import { useEffect, useRef } from "react";

export function MatrixRain({ id, label }: { id: string, label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || 72;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const chars = "アイウエオカキ01ABCDEFGHあいうえ";
    let drops = Array.from({ length: Math.floor(canvas.width / 13) }, () => Math.random() * 6 | 0);

    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(3,7,15,.42)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "11px JetBrains Mono";

      drops.forEach((y, i) => {
        ctx.globalAlpha = Math.random() * 0.5 + 0.1;
        ctx.fillStyle = "#00FF94";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 13, y * 13);
        if (y * 13 > canvas.height && Math.random() > 0.78) drops[i] = 0;
        else drops[i]++;
      });
      ctx.globalAlpha = 1;
    }, 88);

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="rd">
      <canvas ref={canvasRef} id={id} />
      <span className="rd-l">{label}</span>
    </div>
  );
}

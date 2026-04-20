import type React from "react";

interface TiltOptions {
  perspective?: number;
  rotateMultiplier?: number;
  scale?: number;
  translateY?: number;
}

export function useTilt({
  perspective = 600,
  rotateMultiplier = 8,
  scale = 1.03,
  translateY = -10,
}: TiltOptions = {}) {
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(${perspective}px) rotateY(${x * rotateMultiplier}deg) rotateX(${-y * rotateMultiplier}deg) scale(${scale}) translateY(${translateY}px)`;
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = `perspective(${perspective}px) rotateY(0deg) rotateX(0deg) scale(1) translateY(0px)`;
  };

  return { onMouseMove, onMouseLeave };
}

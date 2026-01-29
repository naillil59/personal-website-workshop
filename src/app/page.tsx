"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dvdRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const dvd = dvdRef.current;
    if (!container || !dvd) return;

    let rafId = 0;
    let lastTime = performance.now();

    const size = { width: dvd.offsetWidth, height: dvd.offsetHeight };
    const position = {
      x: Math.random() * Math.max(1, container.clientWidth - size.width),
      y: Math.random() * Math.max(1, container.clientHeight - size.height),
    };
    const speed = 120;
    const velocity = {
      x: (Math.random() > 0.5 ? 1 : -1) * speed,
      y: (Math.random() > 0.5 ? 1 : -1) * speed,
    };

    const update = (now: number) => {
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      position.x += velocity.x * delta;
      position.y += velocity.y * delta;

      const maxX = container.clientWidth - size.width;
      const maxY = container.clientHeight - size.height;

      if (position.x <= 0) {
        position.x = 0;
        velocity.x *= -1;
      } else if (position.x >= maxX) {
        position.x = maxX;
        velocity.x *= -1;
      }

      if (position.y <= 0) {
        position.y = 0;
        velocity.y *= -1;
      } else if (position.y >= maxY) {
        position.y = maxY;
        velocity.y *= -1;
      }

      dvd.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      rafId = requestAnimationFrame(update);
    };

    const handleResize = () => {
      size.width = dvd.offsetWidth;
      size.height = dvd.offsetHeight;
      position.x = Math.min(position.x, container.clientWidth - size.width);
      position.y = Math.min(position.y, container.clientHeight - size.height);
    };

    window.addEventListener("resize", handleResize);
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-zinc-50 font-sans dark:bg-black"
    >
      <div
        ref={dvdRef}
        className="absolute left-0 top-0 text-4xl font-semibold uppercase"
      >
        My awesome and cool website
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const animRef = useRef<number>(0);
  const visible = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const maxPoints = 24;
    const maxAge = 35;

    let lastX = 0, lastY = 0;

    const handleMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      visible.current = true;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        points.current.push({ x: e.clientX, y: e.clientY, age: 0 });
        if (points.current.length > maxPoints) {
          points.current.shift();
        }
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    const handleLeave = () => { visible.current = false; };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      points.current = points.current.filter((p) => {
        p.age++;
        return p.age < maxAge;
      });

      const len = points.current.length;
      if (len > 1) {
        for (let i = 1; i < len; i++) {
          const p0 = points.current[i - 1];
          const p1 = points.current[i];
          const life = 1 - p1.age / maxAge;

          // Sharp, thin line matching background streak style
          const alpha = life * 0.18;
          const width = life * 1.2 + 0.3;

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = "butt";
          ctx.stroke();
        }
      }

      // Subtle sharp head glow
      if (visible.current) {
        const grad = ctx.createRadialGradient(mouse.current.x, mouse.current.y, 0, mouse.current.x, mouse.current.y, 3);
        grad.addColorStop(0, "rgba(255,255,255,0.25)");
        grad.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mouse.current.x, mouse.current.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none hidden md:block"
      aria-hidden="true"
    />
  );
};

export default CursorTrail;

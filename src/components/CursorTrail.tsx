import { useEffect, useRef } from "react";

interface Point {
  x: number; // page coordinates
  y: number;
  age: number;
}

const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const points = useRef<Point[]>([]);
  // viewport coords of cursor
  const viewportMouse = useRef({ x: -100, y: -100 });
  const animRef = useRef<number>(0);
  const visible = useRef(false);

  useEffect(() => {
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

    const maxPoints = 16;
    const maxAge = 15;
    const maxTrailPx = 480; // max pixel length of trail
    let lastPageX = 0, lastPageY = 0;

    const handleMove = (e: MouseEvent) => {
      viewportMouse.current.x = e.clientX;
      viewportMouse.current.y = e.clientY;
      visible.current = true;

      const px = e.clientX + window.scrollX;
      const py = e.clientY + window.scrollY;
      const dx = px - lastPageX;
      const dy = py - lastPageY;

      if (Math.sqrt(dx * dx + dy * dy) > 3) {
        points.current.push({ x: px, y: py, age: 0 });
        if (points.current.length > maxPoints) points.current.shift();
        lastPageX = px;
        lastPageY = py;
      }
    };

    // On scroll, add a point at the cursor's new page position so the
    // trail visually sweeps in the scroll direction
    const handleScroll = () => {
      if (!visible.current) return;
      const px = viewportMouse.current.x + window.scrollX;
      const py = viewportMouse.current.y + window.scrollY;
      const dx = px - lastPageX;
      const dy = py - lastPageY;
      if (Math.sqrt(dx * dx + dy * dy) > 1) {
        points.current.push({ x: px, y: py, age: 0 });
        if (points.current.length > maxPoints) points.current.shift();
        lastPageX = px;
        lastPageY = py;
      }
    };

    const handleLeave = () => { visible.current = false; };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      points.current = points.current.filter((p) => {
        p.age++;
        return p.age < maxAge;
      });

      // Trim from tail if total pixel length exceeds max
      let totalLen = 0;
      for (let i = points.current.length - 1; i > 0; i--) {
        const a = points.current[i], b = points.current[i - 1];
        const dx = a.x - b.x, dy = a.y - b.y;
        totalLen += Math.sqrt(dx * dx + dy * dy);
        if (totalLen > maxTrailPx) {
          points.current = points.current.slice(i);
          break;
        }
      }

      const len = points.current.length;
      if (len > 1) {
        // Convert page coords → viewport coords for drawing
        const sx = window.scrollX;
        const sy = window.scrollY;

        const tail = points.current[0];
        const head = points.current[len - 1];
        const tx = tail.x - sx, ty = tail.y - sy;
        const hx = head.x - sx, hy = head.y - sy;

        const gradient = ctx.createLinearGradient(tx, ty, hx, hy);
        gradient.addColorStop(0, "hsla(38, 40%, 60%, 0)");
        gradient.addColorStop(0.4, "hsla(40, 55%, 62%, 0.12)");
        gradient.addColorStop(1, "hsla(43, 72%, 72%, 0.55)");

        ctx.beginPath();
        ctx.moveTo(tx, ty);

        for (let i = 1; i < len - 1; i++) {
          const ax = points.current[i].x - sx;
          const ay = points.current[i].y - sy;
          const mx = (ax + (points.current[i + 1].x - sx)) / 2;
          const my = (ay + (points.current[i + 1].y - sy)) / 2;
          ctx.quadraticCurveTo(ax, ay, mx, my);
        }

        ctx.lineTo(hx, hy);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      // Head glow at viewport cursor position
      if (visible.current) {
        const { x, y } = viewportMouse.current;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 5);
        grad.addColorStop(0, "hsla(43, 72%, 72%, 0.5)");
        grad.addColorStop(1, "hsla(38, 40%, 60%, 0)");
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default CursorTrail;

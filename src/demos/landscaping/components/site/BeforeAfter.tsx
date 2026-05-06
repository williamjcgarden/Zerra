import { useRef, useState } from "react";
import type { PointerEvent } from "react";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfter({
  before, after, alt,
}: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    update(event.clientX);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    event.preventDefault();
    update(event.clientX);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={ref}
      className="group relative h-full w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl"
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDragStart={(event) => event.preventDefault()}
    >
      <img
        src={after}
        alt={`${alt} after`}
        loading="lazy"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={`${alt} before`}
          loading="lazy"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          style={{ width: pos > 0 ? `${100 / (pos / 100)}%` : "10000%", maxWidth: "none" }}
        />
      </div>
      <div className="absolute top-3 left-3 rounded-full bg-charcoal/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-charcoal-foreground">
        Before
      </div>
      <div className="absolute top-3 right-3 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
        After
      </div>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lift pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-charcoal shadow-lift">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

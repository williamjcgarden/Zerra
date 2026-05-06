import { useEffect, useState } from "react";

export function DemoModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const trigger = target.closest<HTMLElement>("button, a[data-demo-action]");
      if (!trigger) return;
      if (trigger.hasAttribute("data-no-demo")) return;
      if (trigger.closest("[data-no-demo]")) return;
      e.preventDefault();
      e.stopPropagation();
      setOpen(true);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="liquid-glass relative z-10 max-w-md w-full rounded-2xl p-8 text-white text-center animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className="text-2xl md:text-3xl font-normal mb-3"
          style={{ letterSpacing: "-0.03em" }}
        >
          Demo Website
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          This is a demo site. If this website was yours, this button would
          connect prospects to signup, checkout, sales, or your product flow.
        </p>
        <button
          data-no-demo
          onClick={() => setOpen(false)}
          className="bg-white text-black px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 active:scale-95"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

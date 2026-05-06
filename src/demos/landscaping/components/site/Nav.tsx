import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Nav({ onDemoAction }: { onDemoAction: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 group">
          <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${scrolled ? "bg-primary text-primary-foreground" : "bg-white/15 text-white backdrop-blur"}`}>
            <Leaf className="h-4 w-4" />
          </span>
          <span className={`font-display text-xl tracking-tight ${scrolled ? "text-foreground" : "text-white"}`}>
            Verdant<span className="text-accent">.</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${scrolled ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white"}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={onDemoAction}
          className="inline-flex items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-soft transition-all hover:shadow-lift hover:-translate-y-0.5"
        >
          Get Free Quote
        </button>
      </div>
    </header>
  );
}

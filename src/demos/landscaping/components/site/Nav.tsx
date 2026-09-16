import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";

const base = "/our-work/landscaping-demo";
const links = [
  { label: "Services", href: `${base}#services` },
  { label: "Portfolio", href: `${base}#portfolio` },
  { label: "About", href: `${base}#about` },
  { label: "Contact", href: `${base}#contact` },
];

export function Nav({ onDemoAction }: { onDemoAction: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const deepPage = location.pathname.replace(/\/$/, "") !== base;
  const solid = scrolled || deepPage || open;
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header
      className={`landscaping-nav fixed inset-x-0 z-50 transition-all duration-500 ${solid ? "bg-background/85 backdrop-blur-xl border-b border-border/60 py-3" : "bg-transparent py-5"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6">
        <Link
          to={base}
          className="flex min-h-11 items-center gap-2 group"
          aria-label="Verdant home"
        >
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${solid ? "bg-primary text-primary-foreground" : "bg-white/15 text-white backdrop-blur"}`}
          >
            <Leaf className="h-4 w-4" />
          </span>
          <span
            className={`font-display text-xl tracking-tight ${solid ? "text-foreground" : "text-white"}`}
          >
            Verdant<span className="text-accent">.</span>
          </span>
        </Link>
        <nav
          className="hidden md:flex items-center gap-9"
          aria-label="Verdant navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`inline-flex min-h-11 items-center text-sm font-medium transition-colors ${deepPage ? "text-foreground hover:text-primary" : solid ? "text-foreground/70 hover:text-foreground" : "text-white/80 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={onDemoAction}
          className={`landscaping-nav-quote inline-flex min-h-11 items-center rounded-full px-5 py-2.5 text-sm font-semibold shadow-soft transition-all hover:shadow-lift hover:-translate-y-0.5 ${deepPage ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}
        >
          Get a Quote
        </button>
        <button
          ref={toggle}
          type="button"
          className={`flex h-11 w-11 shrink-0 items-center justify-center md:hidden ${solid ? "text-primary" : "text-white"}`}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="landscaping-mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          id="landscaping-mobile-menu"
          aria-label="Verdant mobile navigation"
          className="landscaping-mobile-menu mx-6 mt-4 border-t border-border py-3 md:hidden"
        >
          {links.map((link) => (
            <Link
              className="flex min-h-11 items-center py-2 text-primary"
              key={link.href}
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Link
            className="flex min-h-11 items-center py-2 font-semibold text-primary"
            to={`${base}/get-a-quote`}
          >
            Get a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}

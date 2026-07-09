import { Link } from "../RouterCompat";
import { Menu, Phone, X, Droplets } from "lucide-react";
import { useState } from "react";
import { NAV, SITE } from "../site";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/85 backdrop-blur-md">
      <div className="container-tight flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-surface shadow-card">
            <Droplets className="h-5 w-5 text-[color:var(--aqua)]" strokeWidth={2.4} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[15px] font-bold tracking-tight text-ink">Rapid Plumbing</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-2">& Gas · Comox Valley</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-2 transition-colors hover:text-brand"
              activeProps={{ className: "text-brand" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-card transition-colors hover:bg-brand-hover"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            Call Us Today
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-muted"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-surface">
          <nav className="container-tight flex flex-col py-3">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-ink hover:bg-muted"
                activeProps={{ className: "text-brand" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={SITE.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground"
            >
              <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

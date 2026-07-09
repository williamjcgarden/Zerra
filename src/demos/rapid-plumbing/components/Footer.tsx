import { Link } from "../RouterCompat";
import { Facebook, Mail, MapPin, Phone, Star } from "lucide-react";
import { NAV, SERVICES, SITE } from "../site";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-slate-200">
      <div className="container-tight grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-surface/10 ring-1 ring-white/10">
              <span className="text-[color:var(--aqua)] font-display font-bold">R</span>
            </span>
            <div>
              <div className="font-display text-base font-bold text-white">Rapid Plumbing & Gas</div>
              <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Serving Comox Valley</div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-sm text-slate-300">{SITE.rating.toFixed(1)} · {SITE.reviewCount} Google reviews</span>
          </div>
          <a href={SITE.facebook} aria-label="Facebook" className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
            <Facebook className="h-4 w-4" />
          </a>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Company</div>
          <ul className="mt-4 space-y-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-sm text-slate-300 hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Services</div>
          <ul className="mt-4 space-y-2">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to="/services" hash={s.slug} className="text-sm text-slate-300 hover:text-white">{s.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Contact</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5 text-slate-300"><Phone className="h-4 w-4 mt-0.5 text-[color:var(--aqua)]" /><a href={SITE.phoneHref} className="hover:text-white">{SITE.phoneDisplay}</a></li>
            <li className="flex items-start gap-2.5 text-slate-300"><Mail className="h-4 w-4 mt-0.5 text-[color:var(--aqua)]" /><a href={SITE.emailHref} className="hover:text-white">{SITE.email}</a></li>
            <li className="flex items-start gap-2.5 text-slate-300"><MapPin className="h-4 w-4 mt-0.5 text-[color:var(--aqua)]" />{SITE.area}, British Columbia</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-tight flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</p>
          <p className="text-xs text-slate-500">Expert plumbing and gas services you can trust.</p>
        </div>
      </div>
    </footer>
  );
}

import { MapPin, ShieldCheck, Star, Flame } from "lucide-react";
import { SITE } from "../site";

export function TrustRow({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  const base = isDark ? "text-slate-300" : "text-slate-2";
  const chip = isDark ? "bg-white/5 ring-white/10" : "bg-surface ring-border";
  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${base}`}>
      <div className={`inline-flex items-center gap-2 rounded-full ${chip} ring-1 px-3.5 py-1.5 text-sm`}>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[color:var(--aqua)] text-[color:var(--aqua)]" />
          ))}
        </div>
        <span className="font-semibold">{SITE.rating.toFixed(1)}</span>
        <span className="opacity-80">· {SITE.reviewCount} Google reviews</span>
      </div>
      <div className={`inline-flex items-center gap-2 rounded-full ${chip} ring-1 px-3.5 py-1.5 text-sm`}>
        <MapPin className="h-3.5 w-3.5 text-[color:var(--aqua)]" />
        Local Comox Valley
      </div>
      <div className={`inline-flex items-center gap-2 rounded-full ${chip} ring-1 px-3.5 py-1.5 text-sm`}>
        <Flame className="h-3.5 w-3.5 text-[color:var(--aqua)]" />
        Plumbing & Gas
      </div>
      <div className={`inline-flex items-center gap-2 rounded-full ${chip} ring-1 px-3.5 py-1.5 text-sm`}>
        <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--aqua)]" />
        Licensed & Insured
      </div>
    </div>
  );
}

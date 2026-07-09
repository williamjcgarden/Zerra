import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, subtitle, children }: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="hero-gradient relative overflow-hidden text-white">
      <div aria-hidden className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.35),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(6,182,212,0.25),transparent_50%)]" />
      <div className="container-tight relative py-20 md:py-28">
        <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--aqua)] ring-1 ring-white/15">
          {eyebrow}
        </span>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-lg text-slate-200 md:text-xl">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
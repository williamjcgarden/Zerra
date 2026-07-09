import { createFileRoute, Link } from "../RouterCompat";
import { ArrowRight, CheckCircle2, Phone, Star } from "lucide-react";
import heroImg from "@/demos/rapid-plumbing/assets/hero-plumber.jpg";
import tankImg from "@/demos/rapid-plumbing/assets/hot-water-tank.jpg";
import valleyImg from "@/demos/rapid-plumbing/assets/comox-valley.jpg";
import { SERVICES, SITE, REVIEWS } from "@/demos/rapid-plumbing/site";
import { ServiceIcon } from "@/demos/rapid-plumbing/components/ServiceIcon";
import { TrustRow } from "@/demos/rapid-plumbing/components/TrustRow";
import { ReviewCard } from "@/demos/rapid-plumbing/components/ReviewCard";
import { CTASection } from "@/demos/rapid-plumbing/components/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rapid Plumbing & Gas — Comox Valley Plumbers You Can Trust" },
      { name: "description", content: "Expert plumbing and gas services in the Comox Valley. Hot water tanks, gas fitting, Poly-B, drain camera inspections, renovations, and more. 5.0 stars, 98+ reviews." },
      { property: "og:title", content: "Rapid Plumbing & Gas — Comox Valley Plumbers" },
      { property: "og:description", content: "Expert plumbing and gas services you can trust across Comox Valley." },
      { property: "og:url", content: "/" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden text-white">
        <div aria-hidden className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.35),transparent_50%),radial-gradient(circle_at_85%_80%,rgba(6,182,212,0.25),transparent_55%)]" />
        <div className="container-tight relative grid gap-12 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--aqua)] ring-1 ring-white/15">
              Serving the Comox Valley
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.02] md:text-6xl lg:text-[68px]">
              Expert plumbing and gas services <span className="text-gradient-brand">you can trust</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-200 md:text-xl">
              Professional plumbing and gas services for homeowners, builders, and businesses across the Comox Valley.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.phoneHref} className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-elegant transition hover:bg-brand-hover">
                <Phone className="h-4 w-4" strokeWidth={2.4} /> Call Us Today
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15">
                Request Service <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8">
              <TrustRow variant="dark" />
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-[color:var(--aqua)]/20 blur-3xl" aria-hidden />
            <img
              src={heroImg}
              alt="Rapid Plumbing technician working on copper pipes in a Comox Valley home"
              width={1600}
              height={1200}
              className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-elegant ring-1 ring-white/10"
            />
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-surface p-4 shadow-elegant ring-1 ring-border sm:block">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[color:var(--brand)] text-[color:var(--brand)]" />
                  ))}
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-ink">5.0 · Google</div>
                  <div className="text-xs text-muted-foreground">{SITE.reviewCount} verified reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews highlight */}
      <section className="container-tight py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">What locals say</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Satisfied customers speak out</h2>
            <div className="mt-3 flex items-center gap-2 text-slate-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[color:var(--brand)] text-[color:var(--brand)]" />
                ))}
              </div>
              <span className="text-sm font-medium">5.0 Google rating · {SITE.reviewCount} reviews</span>
            </div>
          </div>
          <Link to="/reviews" className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:bg-muted">
            Read More Reviews <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.slice(0, 3).map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-surface py-20">
        <div className="container-tight">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Services</span>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">Full-service plumbing & gas</h2>
              <p className="mt-3 max-w-xl text-slate-2">From emergency repairs to full renovations, we handle it all with skilled technicians and honest pricing.</p>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover">
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services"
                hash={s.slug}
                className="group relative flex flex-col rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-2">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Learn more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container-tight py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Why Rapid</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Skilled, honest, and up-front — every job.</h2>
            <p className="mt-4 text-slate-2">Locally owned and operated in the Comox Valley. Our team shows up on time, respects your home, and gets the job done right.</p>
            <a href={SITE.phoneHref} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-slate-2">
              <Phone className="h-4 w-4" /> Talk to a plumber
            </a>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              "Prompt, reliable service",
              "Honest, up-front pricing",
              "Skilled, certified technicians",
              "Residential & commercial experience",
              "Clean, respectful worksites",
              "Local Comox Valley team",
            ].map((v) => (
              <li key={v} className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-card">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brand" />
                <span className="text-sm font-medium text-ink">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured: hot water tank */}
      <section className="bg-ink py-20 text-white">
        <div className="container-tight grid gap-12 lg:grid-cols-2 lg:items-center">
          <img
            src={tankImg}
            alt="Modern hot water tank installation"
            width={1200}
            height={900}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-elegant ring-1 ring-white/10"
          />
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--aqua)]">Featured service</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Hot water tank replacement — done same day.</h2>
            <p className="mt-4 text-slate-300">No hot water is never convenient. We diagnose fast, source the right tank, and install it safely with guidance you'll actually understand.</p>
            <ul className="mt-6 grid gap-3">
              {[
                "Fast diagnosis and honest recommendations",
                "Safe, code-compliant gas and electric installs",
                "Old tank removal and cleanup included",
                "Homeowner-friendly guidance on warranty and care",
              ].map((v) => (
                <li key={v} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[color:var(--aqua)]" />
                  {v}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={SITE.phoneHref} className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand-hover">
                <Phone className="h-4 w-4" /> Call for same-day service
              </a>
              <Link to="/services" hash="hot-water-tank-replacement" className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/15">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="container-tight py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-border">
            <img src={valleyImg} alt="Aerial view of the Comox Valley" width={1600} height={900} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-6">
              <div className="font-display text-xl font-bold text-white">Comox Valley, BC</div>
              <div className="text-sm text-slate-200">Courtenay · Comox · Cumberland · surrounding communities</div>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Service area</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Proudly local. Serving the whole Valley.</h2>
            <p className="mt-4 text-slate-2">
              We're your local Comox Valley plumbing and gas team. From quick service calls to full builder rough-ins, we cover homes and businesses across the region.
            </p>
            <Link to="/service-areas" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-ink hover:bg-muted">
              See service areas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

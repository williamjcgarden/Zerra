import { createFileRoute } from "../RouterCompat";
import { CheckCircle2, Phone } from "lucide-react";
import { PageHero } from "@/demos/rapid-plumbing/components/PageHero";
import { CTASection } from "@/demos/rapid-plumbing/components/CTASection";
import { ServiceIcon } from "@/demos/rapid-plumbing/components/ServiceIcon";
import { SERVICES, SITE } from "@/demos/rapid-plumbing/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Plumbing & Gas Services in Comox Valley — Rapid Plumbing & Gas" },
      { name: "description", content: "Full-service plumbing and gas: repairs, hot water tanks, gas fitting, Poly-B replacement, sewer and drain camera inspections, renovations, and new construction." },
      { property: "og:title", content: "Services — Rapid Plumbing & Gas" },
      { property: "og:description", content: "Comprehensive plumbing and gas services across the Comox Valley." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Full-service plumbing & gas across Comox Valley"
        subtitle="From urgent repairs to full renovations and new builds, our team handles every job with skill, honesty, and respect for your home."
      />
      <section className="container-tight py-16 md:py-20">
        <div className="grid gap-6 lg:gap-8">
          {SERVICES.map((s, i) => (
            <article
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-24 gap-6 rounded-3xl border border-border bg-surface p-6 shadow-card md:grid-cols-[auto_1fr_auto] md:items-start md:gap-8 md:p-8"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand">
                <ServiceIcon name={s.icon} className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-2">
                  Service {String(i + 1).padStart(2, "0")}
                </div>
                <h2 className="mt-1 text-2xl font-bold text-ink md:text-3xl">{s.title}</h2>
                <p className="mt-3 max-w-2xl text-slate-2">{s.short}</p>
                <div className="mt-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-2">Common reasons to call</div>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {s.reasons.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-ink">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand-hover">
                <Phone className="h-4 w-4" /> Call Us Today
              </a>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}

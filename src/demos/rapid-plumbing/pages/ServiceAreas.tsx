import { createFileRoute } from "../RouterCompat";
import { MapPin, Phone } from "lucide-react";
import valleyImg from "@/demos/rapid-plumbing/assets/comox-valley.jpg";
import { PageHero } from "@/demos/rapid-plumbing/components/PageHero";
import { CTASection } from "@/demos/rapid-plumbing/components/CTASection";
import { SITE } from "@/demos/rapid-plumbing/site";

export const Route = createFileRoute("/service-areas")({
  head: () => ({
    meta: [
      { title: "Service Areas — Plumbing & Gas in Comox Valley" },
      { name: "description", content: "Local plumbing and gas service across Courtenay, Comox, Cumberland, and surrounding Comox Valley communities." },
      { property: "og:title", content: "Service Areas — Rapid Plumbing & Gas" },
      { property: "og:description", content: "Serving Courtenay, Comox, Cumberland, and the Comox Valley." },
      { property: "og:url", content: "/service-areas" },
    ],
    links: [{ rel: "canonical", href: "/service-areas" }],
  }),
  component: AreasPage,
});

const areas = ["Courtenay", "Comox", "Cumberland", "Royston", "Union Bay", "Merville", "Black Creek", "Fanny Bay"];

function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title="Plumbing and gas services in Comox Valley"
        subtitle="Local service for homes, businesses, builders, and renovations across the Valley."
      />

      <section className="container-tight py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div className="relative overflow-hidden rounded-3xl ring-1 ring-border">
            <img src={valleyImg} alt="Comox Valley aerial view" width={1600} height={900} loading="lazy" className="aspect-[16/10] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent" />
            <div className="absolute bottom-0 p-6 text-white">
              <div className="font-display text-2xl font-bold">Comox Valley, British Columbia</div>
              <div className="text-sm text-slate-200">Vancouver Island · East Coast</div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Local service for homes, businesses, builders, and renovations</h2>
            <p className="mt-4 text-slate-2">We serve the entire Comox Valley and surrounding communities. Whether you're a homeowner with a leaking tap, a builder starting a new project, or a business needing gas work, our local team is close by and ready to help.</p>
            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-2">Communities we serve <span className="font-normal text-muted-foreground normal-case">(examples — easy to expand)</span></div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <li key={a} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-border">
                    <MapPin className="h-3.5 w-3.5 text-brand" />{a}
                  </li>
                ))}
              </ul>
            </div>
            <a href={SITE.phoneHref} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand-hover">
              <Phone className="h-4 w-4" /> Call for local service
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-tight grid gap-8 md:grid-cols-3">
          {[
            { title: "Homeowners", body: "Repairs, upgrades, hot water tanks, and gas work for every kind of home." },
            { title: "Builders", body: "Reliable rough-in and finish plumbing for new construction across the Valley." },
            { title: "Businesses", body: "Commercial plumbing and gas fitting, planned maintenance, and service calls." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border bg-background p-6">
              <div className="font-display text-lg font-bold text-ink">{c.title}</div>
              <p className="mt-2 text-sm text-slate-2">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}

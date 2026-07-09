import { createFileRoute } from "../RouterCompat";
import { Star, Phone } from "lucide-react";
import { PageHero } from "@/demos/rapid-plumbing/components/PageHero";
import { CTASection } from "@/demos/rapid-plumbing/components/CTASection";
import { ReviewCard } from "@/demos/rapid-plumbing/components/ReviewCard";
import { REVIEWS, SITE } from "@/demos/rapid-plumbing/site";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Rapid Plumbing & Gas Comox Valley" },
      { name: "description", content: "5.0-star rated on Google with 98+ reviews. See what Comox Valley homeowners, builders, and businesses say about Rapid Plumbing & Gas." },
      { property: "og:title", content: "Reviews — Rapid Plumbing & Gas" },
      { property: "og:description", content: "5.0 Google rating and 98+ reviews across the Comox Valley." },
      { property: "og:url", content: "/reviews" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

const themes = [
  { title: "Prompt service", body: "Fast response, on-time arrival, and quick diagnosis." },
  { title: "Respectful technicians", body: "Clean, polite, and considerate in your home." },
  { title: "Reliable work", body: "Jobs done right the first time, backed by experience." },
  { title: "Honest pricing", body: "Up-front quotes with no surprises at the end." },
  { title: "Skilled & up-front", body: "Clear communication and quality craftsmanship." },
];

function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Google reviews" title="Rated 5.0 by Comox Valley locals" subtitle={`${SITE.reviewCount} verified Google reviews and counting. Here's what our customers say.`}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[color:var(--aqua)] text-[color:var(--aqua)]" />
              ))}
            </div>
            <span className="font-semibold">5.0</span>
            <span className="text-slate-300">· {SITE.reviewCount} Google reviews</span>
          </div>
          <a href={SITE.phoneHref} className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand-hover">
            <Phone className="h-4 w-4" /> Call the team customers trust
          </a>
        </div>
      </PageHero>

      <section className="container-tight py-16 md:py-20">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => <ReviewCard key={r.name + r.date} {...r} />)}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`ph-${i}`} className="flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-border bg-surface/60 p-6 text-sm text-muted-foreground">
              More Google reviews load here as they come in.
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-tight">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Common themes</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">What customers keep saying</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {themes.map((t) => (
              <div key={t.title} className="rounded-2xl border border-border bg-background p-5">
                <div className="font-display text-base font-bold text-ink">{t.title}</div>
                <p className="mt-2 text-sm text-slate-2">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

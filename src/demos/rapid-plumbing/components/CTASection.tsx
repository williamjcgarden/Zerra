import { Phone, ArrowRight } from "lucide-react";
import { Link } from "../RouterCompat";
import { SITE } from "../site";

export function CTASection() {
  return (
    <section className="container-tight py-20">
      <div className="hero-gradient relative overflow-hidden rounded-3xl px-8 py-14 text-center text-white shadow-elegant md:px-16 md:py-20">
        <div aria-hidden className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.35),transparent_50%)]" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-5xl">Need a plumber you can trust?</h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-200 md:text-lg">
            Call Rapid Plumbing & Gas today for prompt, professional service across Comox Valley.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={SITE.phoneHref} className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-card transition hover:bg-slate-100">
              <Phone className="h-4 w-4" /> Call Us Today
            </a>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground ring-1 ring-white/20 transition hover:bg-brand-hover">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

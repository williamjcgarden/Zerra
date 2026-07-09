import { createFileRoute } from "../RouterCompat";
import { Mail, MapPin, Phone, Star, Clock, Send } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/demos/rapid-plumbing/components/PageHero";
import { SERVICES, SITE } from "@/demos/rapid-plumbing/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Rapid Plumbing & Gas — Comox Valley" },
      { name: "description", content: "Call, email, or request service from Rapid Plumbing & Gas — your local Comox Valley plumbing and gas experts." },
      { property: "og:title", content: "Contact Rapid Plumbing & Gas" },
      { property: "og:description", content: "Get in touch with your local Comox Valley plumbing and gas team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to a local plumber today" subtitle="Prompt, professional service across the Comox Valley. Call us or send a request and we'll get back to you quickly." />

      <section className="container-tight py-16 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <div className="rounded-3xl border border-border bg-surface p-6 shadow-card md:p-10">
            {sent ? (
              <div className="py-16 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-brand">
                  <Send className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-ink">Request received</h2>
                <p className="mt-2 text-slate-2">Thanks — we'll be in touch shortly. For anything urgent, call {SITE.phoneDisplay}.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="grid gap-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full name" required><input required className="input" /></Field>
                  <Field label="Phone" required><input required type="tel" className="input" /></Field>
                </div>
                <Field label="Email"><input type="email" className="input" /></Field>
                <Field label="Service needed" required>
                  <select required className="input" defaultValue="">
                    <option value="" disabled>Select a service…</option>
                    {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                    <option value="other">Something else</option>
                  </select>
                </Field>
                <Field label="Message" required>
                  <textarea required rows={5} className="input resize-y" placeholder="Tell us what's going on…" />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Preferred contact method">
                    <select className="input" defaultValue="phone">
                      <option value="phone">Phone call</option>
                      <option value="text">Text message</option>
                      <option value="email">Email</option>
                    </select>
                  </Field>
                  <label className="mt-7 flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                    <input type="checkbox" className="h-4 w-4 accent-[color:var(--brand)]" />
                    <span className="text-sm font-medium text-ink">This is urgent / emergency</span>
                  </label>
                </div>
                <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-card hover:bg-brand-hover">
                  <Send className="h-4 w-4" /> Request service
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-5">
            <a href={SITE.phoneHref} className="group flex items-center justify-between rounded-2xl bg-ink p-6 text-white shadow-card">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--aqua)]">Call us today</div>
                <div className="mt-1 font-display text-2xl font-bold">{SITE.phoneDisplay}</div>
                <div className="mt-1 text-sm text-slate-300">Tap to call — fastest response</div>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white transition group-hover:bg-brand-hover">
                <Phone className="h-5 w-5" />
              </span>
            </a>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center gap-2 text-brand">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[color:var(--brand)] text-[color:var(--brand)]" />
                  ))}
                </div>
                <span className="text-sm font-semibold">5.0 · {SITE.reviewCount} Google reviews</span>
              </div>
              <p className="mt-3 text-sm text-slate-2">"Prompt service. Jack was pleasant, respected our home." — Jon S.</p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6">
              <ul className="grid gap-4 text-sm">
                <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 text-brand" /><a href={SITE.emailHref} className="text-ink hover:text-brand">{SITE.email}</a></li>
                <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 text-brand" /><span className="text-ink">{SITE.area}, British Columbia</span></li>
                <li className="flex items-start gap-3"><Clock className="mt-0.5 h-4 w-4 text-brand" /><span className="text-ink">Mon–Fri · Business hours (emergency service available)</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-2">
        {label}{required && <span className="text-brand"> *</span>}
      </span>
      {children}
    </label>
  );
}

import { useEffect, useState } from "react";
import {
  ArrowRight, Sprout, Hammer, PencilRuler, Repeat, Star,
  Award, Gem, HeartHandshake, Phone, Mail, MapPin, Clock,
  Instagram, Facebook, Twitter, ChevronLeft, ChevronRight, Leaf, X,
} from "lucide-react";
import "@/demos/landscaping/landscaping.css";
import BackToZerra from "@/components/BackToZerra";
import { Nav } from "@/demos/landscaping/components/site/Nav";
import { BeforeAfter } from "@/demos/landscaping/components/site/BeforeAfter";
import { useReveal } from "@/demos/landscaping/hooks/use-reveal";
import hero from "@/demos/landscaping/assets/hero.jpg";
import b1 from "@/demos/landscaping/assets/before-1.jpg";
import a1 from "@/demos/landscaping/assets/after-1.jpg";
import b2 from "@/demos/landscaping/assets/before-2.jpg";
import a2 from "@/demos/landscaping/assets/after-2.jpg";
import b3 from "@/demos/landscaping/assets/before-3.jpg";
import a3 from "@/demos/landscaping/assets/after-3.jpg";
import b4 from "@/demos/landscaping/assets/before-4.jpg";
import a4 from "@/demos/landscaping/assets/after-4.jpg";
import t1 from "@/demos/landscaping/assets/team-1.jpg";
import t2 from "@/demos/landscaping/assets/team-2.jpg";
import t3 from "@/demos/landscaping/assets/team-3.jpg";
import t4 from "@/demos/landscaping/assets/team-4.jpg";
import c1 from "@/demos/landscaping/assets/client-1.jpg";
import c2 from "@/demos/landscaping/assets/client-2.jpg";
import c3 from "@/demos/landscaping/assets/client-3.jpg";

const services = [
  { icon: Sprout, title: "Lawn Care", desc: "Year-round programs that keep your turf thick, green, and disease-free." },
  { icon: Hammer, title: "Hardscaping", desc: "Patios, walkways, retaining walls, and fire features built to last decades." },
  { icon: PencilRuler, title: "Landscape Design", desc: "Custom plans drawn by certified designers — tailored to your home and lifestyle." },
  { icon: Repeat, title: "Maintenance Plans", desc: "Seasonal visits with a dedicated crew so your yard always looks its best." },
];

const projects = [
  { before: b1, after: a1, name: "Riverside Lawn Revival", tag: "Lawn + Beds", span: "row-span-2" },
  { before: b2, after: a2, name: "Maple Grove Patio", tag: "Hardscape" },
  { before: b3, after: a3, name: "Heritage Curb Appeal", tag: "Front Yard" },
  { before: b4, after: a4, name: "Hillside Terrace", tag: "Retaining Walls", span: "row-span-2" },
];

const team = [
  { img: t1, name: "Daniel Marsh", role: "Founder & Lead Designer", bio: "Twenty years digging in the dirt — and still our biggest plant nerd." },
  { img: t2, name: "Elena Rivera", role: "Landscape Architect", bio: "Translates dreams into blueprints. Color theory wizard." },
  { img: t3, name: "Jonas Kim", role: "Horticulturist", bio: "If a plant can grow here, Jonas knows how to keep it thriving." },
  { img: t4, name: "Aisha Patel", role: "Project Manager", bio: "Keeps every job on time, on budget, and beautifully on-brand." },
];

const testimonials = [
  { img: c1, name: "Sarah Chen", role: "Homeowner, Oak Park", rating: 5, quote: "Verdant turned our weedy lot into the kind of yard neighbors stop and photograph. The team was warm, communicative, and absolutely meticulous." },
  { img: c2, name: "Marcus Reid", role: "Architect, Lakeshore", rating: 5, quote: "I've worked with a lot of contractors. Verdant is in a league of their own — design talent that rivals any firm I've seen." },
  { img: c3, name: "Linda Hoffmann", role: "Retired, Westbrook", rating: 5, quote: "They listened. They cared. They built me a garden I'll enjoy for the rest of my life. I cannot recommend them enough." },
];

function DemoAlert({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/55 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-md rounded-[2rem] border border-primary/10 bg-background p-8 text-center shadow-deep"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close demo message"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:bg-secondary hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Leaf className="h-6 w-6" />
        </span>
        <h3 className="mt-6 font-display text-3xl text-foreground">Demo Website</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          This is a demo site. If this website was yours, this button would turn visitor interest into a quote request, consultation booking, or direct call.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-7 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

function Hero({ onDemoAction }: { onDemoAction: () => void }) {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <img src={hero} alt="Lush landscaped backyard at golden hour" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover scale-105" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/40 to-charcoal/85" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-24 pt-40">
        <div className="max-w-3xl" style={{ animation: "lscape-fade-up 1s cubic-bezier(.22,1,.36,1) both" }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur">
            <Leaf className="h-3 w-3" /> Premium Landscape Design Since 2003
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-white md:text-7xl lg:text-8xl">
            Transform Your<br />
            <span className="italic text-accent">Outdoor Space.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">
            Expert landscaping. Premium results. Crafted by people who genuinely love what grows in your backyard.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#portfolio" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-semibold text-accent-foreground shadow-deep transition-all hover:-translate-y-0.5 hover:shadow-lift">
              View Our Work <ArrowRight className="h-4 w-4" />
            </a>
            <button type="button" onClick={onDemoAction} className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition-all hover:bg-white hover:text-charcoal">
              Schedule Consultation
            </button>
          </div>
        </div>
        <div className="mt-16 flex items-center gap-8 text-white/75">
          <div><div className="font-display text-3xl text-white">500+</div><div className="text-xs uppercase tracking-wider">Yards Transformed</div></div>
          <div className="h-10 w-px bg-white/25" />
          <div><div className="font-display text-3xl text-white">20+</div><div className="text-xs uppercase tracking-wider">Years Experience</div></div>
          <div className="h-10 w-px bg-white/25" />
          <div><div className="font-display text-3xl text-white">4.9★</div><div className="text-xs uppercase tracking-wider">200+ Reviews</div></div>
        </div>
      </div>
    </section>
  );
}

function Services({ onDemoAction }: { onDemoAction: () => void }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="services" className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary accent-underline">What We Do</span>
          <h2 className="mt-8 font-display text-4xl md:text-5xl">Care for every corner of your landscape.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="reveal group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:bg-secondary hover:shadow-lift"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <button type="button" onClick={onDemoAction} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                Learn More <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const ref = useReveal<HTMLElement>();
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("portfolio");
      if (!el) return;
      const r = el.getBoundingClientRect();
      setOffset(r.top * 0.08);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} id="portfolio" className="bg-secondary/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary accent-underline">Recent Work</span>
            <h2 className="mt-8 font-display text-4xl md:text-5xl">Drag the slider. Watch the transformation.</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Each project starts with a blank canvas — sometimes literally — and ends in something we're genuinely proud to put our name on.</p>
        </div>
        <div className="grid auto-rows-[260px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <div
              key={p.name}
              className={`reveal group relative ${p.span ?? ""} ${i % 3 === 0 ? "lg:row-span-2" : ""}`}
              style={{ transitionDelay: `${i * 80}ms`, transform: `translateY(${offset * (i % 2 === 0 ? 0.5 : -0.3)}px)` }}
            >
              <BeforeAfter before={p.before} after={p.after} alt={p.name} />
              <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 rounded-xl bg-charcoal/85 px-4 py-3 text-charcoal-foreground opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-xs uppercase tracking-wider text-accent">{p.tag}</div>
                <div className="font-display text-lg">{p.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const ref = useReveal<HTMLElement>();
  const features = [
    { icon: Award, title: "20+ Years Experience", desc: "Two decades of proven craftsmanship across hundreds of unique properties." },
    { icon: Gem, title: "Premium Materials", desc: "Stone, plants, and finishes sourced from growers and quarries we trust by name." },
    { icon: HeartHandshake, title: "Dedicated Support", desc: "One project lead, one crew, one phone number — from first sketch to final walk-through." },
  ];
  return (
    <section ref={ref} id="about" className="bg-charcoal py-28 text-charcoal-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Why Verdant</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Built on craft. Run with care.</h2>
        </div>
        <div className="grid gap-12 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.title} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
              <f.icon className="h-9 w-9 text-accent" />
              <h3 className="mt-6 font-display text-2xl">
                <span className="border-b-2 border-accent pb-1">{f.title}</span>
              </h3>
              <p className="mt-5 leading-relaxed text-charcoal-foreground/75">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Team() {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary accent-underline">The People</span>
          <h2 className="mt-8 font-display text-4xl md:text-5xl">Meet the crew behind your yard.</h2>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <div key={m.name} className="reveal group" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                <img src={m.img} alt={m.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/70 to-transparent" />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-xl">{m.name}</h3>
                <div className="text-sm font-medium text-accent">{m.role}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const ref = useReveal<HTMLElement>();
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((v) => (v + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section ref={ref} className="bg-secondary/40 py-28">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="reveal text-xs font-semibold uppercase tracking-[0.2em] text-primary">Word of Mouth</span>
        <h2 className="reveal mt-4 font-display text-4xl md:text-5xl">Kind words from kind people.</h2>
        <div className="reveal relative mt-14 min-h-[280px]">
          {testimonials.map((tt, i) => (
            <div
              key={tt.name}
              className={`absolute inset-0 transition-all duration-700 ${i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}`}
            >
              <div className="flex justify-center gap-1 text-accent">
                {Array.from({ length: tt.rating }).map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}
              </div>
              <blockquote className="mx-auto mt-6 max-w-3xl font-display text-2xl leading-snug text-foreground md:text-3xl">
                "{tt.quote}"
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-3">
                <img src={tt.img} alt={tt.name} loading="lazy" className="h-12 w-12 rounded-full object-cover" />
                <div className="text-left">
                  <div className="font-semibold">{tt.name}</div>
                  <div className="text-sm text-muted-foreground">{tt.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="reveal mt-8 flex items-center justify-center gap-3">
          <button aria-label="Previous" onClick={() => setIdx((v) => (v - 1 + testimonials.length) % testimonials.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Go to ${i + 1}`} className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-accent" : "w-2 bg-border"}`} />
            ))}
          </div>
          <button aria-label="Next" onClick={() => setIdx((v) => (v + 1) % testimonials.length)} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function CTA({ onDemoAction }: { onDemoAction: () => void }) {
  const ref = useReveal<HTMLElement>();
  return (
    <section ref={ref} id="contact" className="relative overflow-hidden bg-primary py-28 text-primary-foreground">
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
      <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="reveal relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-5xl leading-tight md:text-7xl">
          Ready for your <span className="italic text-accent">dream yard?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
          Free 60-minute consultation. No pressure, no fees — just real ideas for your space.
        </p>
        <button type="button" onClick={onDemoAction} className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-9 py-4 text-lg font-semibold text-accent-foreground shadow-deep transition-all hover:-translate-y-0.5">
          Get Free Quote <ArrowRight className="h-5 w-5" />
        </button>
        <div className="mt-6 text-sm text-primary-foreground/70">or call <button type="button" onClick={onDemoAction} className="underline">(555) 123-4567</button></div>
      </div>
    </section>
  );
}

function LandscapingFooter({ onDemoAction }: { onDemoAction: () => void }) {
  return (
    <footer className="bg-charcoal py-16 text-charcoal-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Leaf className="h-4 w-4" />
              </span>
              <span className="font-display text-xl">Verdant<span className="text-accent">.</span></span>
            </div>
            <p className="mt-4 text-sm text-charcoal-foreground/70">Premium landscape design and care since 2003.</p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((I, i) => (
                <button key={i} type="button" onClick={onDemoAction} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-accent hover:border-accent hover:text-accent-foreground">
                  <I className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Service Areas</h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal-foreground/75">
              <li>Oak Park</li><li>Westbrook</li><li>Maple Grove</li><li>Lakeshore</li><li>Riverside</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal-foreground/75">
              <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Mon–Fri: 7am – 6pm</li>
              <li>Sat: 8am – 4pm</li>
              <li>Sun: Closed</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-accent">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-charcoal-foreground/75">
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> (555) 123-4567</li>
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> hello@verdant.co</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> 142 Garden Lane</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-charcoal-foreground/55">
          <div>© {new Date().getFullYear()} Verdant Landscaping. All rights reserved.</div>
          <div>Cultivated with care.</div>
        </div>
      </div>
    </footer>
  );
}

const LandscapingDemo = () => {
  const [demoOpen, setDemoOpen] = useState(false);
  const showDemoAlert = () => setDemoOpen(true);

  return (
    <div className="landscaping-demo">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <BackToZerra />
      <Nav onDemoAction={showDemoAlert} />
      <Hero onDemoAction={showDemoAlert} />
      <Services onDemoAction={showDemoAlert} />
      <Portfolio />
      <WhyUs />
      <Team />
      <Testimonials />
      <CTA onDemoAction={showDemoAlert} />
      <LandscapingFooter onDemoAction={showDemoAlert} />
      <DemoAlert open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
};

export default LandscapingDemo;

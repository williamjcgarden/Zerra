import "@/demos/tech/tech.css";
import BackToZerra from "@/components/BackToZerra";
import { AnimatedHeading } from "@/demos/tech/components/AnimatedHeading";
import { FadeIn } from "@/demos/tech/components/FadeIn";
import { DemoModal } from "@/demos/tech/components/DemoModal";
import techMobileHero from "@/demos/tech/assets/tech-demo-mobile-hero.png";

function Nav() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 lg:px-16 pt-6">
      <div className="liquid-glass rounded-xl flex items-center justify-between px-4 py-2">
        <a href="#top" className="text-xl font-medium tracking-tight text-white">
          StartUp
        </a>
        <div className="hidden md:flex gap-8 text-sm text-white">
          <a href="#features" className="hover:text-gray-300 transition-all duration-200 active:scale-95 active:opacity-70">Features</a>
          <a href="#how" className="hover:text-gray-300 transition-all duration-200 active:scale-95 active:opacity-70">How it works</a>
          <a href="#pricing" className="hover:text-gray-300 transition-all duration-200 active:scale-95 active:opacity-70">Pricing</a>
          <a href="#faq" className="hover:text-gray-300 transition-all duration-200 active:scale-95 active:opacity-70">FAQ</a>
        </div>
        <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200 active:scale-95">
          Get Started
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="min-h-screen bg-black text-white relative overflow-hidden">
      <picture aria-hidden="true" className="tech-mobile-hero absolute inset-0 block md:hidden">
        <source media="(max-width: 767px)" srcSet={techMobileHero} />
        <img alt="" className="h-full w-full object-cover" decoding="async" />
      </picture>
      <video autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 hidden h-full w-full object-cover md:block">
        <source media="(min-width: 768px)" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_084718_72a17915-4964-4059-afcd-22d59399b72e.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 min-h-screen">
        <Nav />
        <div className="min-h-screen px-6 md:px-12 lg:px-16 flex flex-col items-center justify-center text-center">
          <div className="w-full max-w-4xl flex flex-col items-center">
            <FadeIn delay={100} duration={800}>
              <div className="liquid-glass rounded-full px-4 py-1.5 mb-6 text-xs tracking-wide uppercase text-white">
                Now in public beta
              </div>
            </FadeIn>
            <AnimatedHeading
              text={"Ship faster.\nScale smarter."}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
              style={{ letterSpacing: "-0.04em" }}
              delay={200}
              charDelay={30}
            />
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl">
                StartUp is the AI-native platform helping ambitious teams automate ops, accelerate growth, and turn ideas into revenue.
              </p>
            </FadeIn>
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Start free trial
                </button>
                <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                  Watch demo
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 flex justify-center">
          <FadeIn delay={1400} duration={1000}>
            <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl text-white">
              <p className="text-sm">Build. Automate. Scale.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Logos() {
  const logos = ["Northwind", "Acme Co.", "Lumen", "Pulsar", "Vertex", "Helix"];
  return (
    <section className="bg-black text-white py-16 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <p className="text-center text-sm uppercase tracking-widest text-gray-400 mb-8">Trusted by teams at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
          {logos.map((l) => <span key={l} className="text-lg md:text-xl font-medium tracking-tight text-white">{l}</span>)}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { title: "AI Workflows", desc: "Build automations in minutes with natural language. No code, no friction." },
    { title: "Realtime Insights", desc: "Live dashboards that surface what matters before it becomes a problem." },
    { title: "Unified Inbox", desc: "Email, chat, and tickets in one calm place — routed by intent, not luck." },
    { title: "Native Integrations", desc: "Plug into 200+ tools out of the box. Stripe, Slack, Linear, and beyond." },
    { title: "Enterprise Security", desc: "SOC 2 Type II, SSO, audit logs, and granular role-based access." },
    { title: "Developer API", desc: "Type-safe SDKs and webhooks designed for teams that move fast." },
  ];
  return (
    <section id="features" className="bg-black text-white py-24 md:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Features</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal" style={{ letterSpacing: "-0.04em" }}>
            Everything you need.<br /><span className="text-gray-400">Nothing you don't.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {items.map((item) => (
            <div key={item.title} className="bg-black p-8 hover:bg-white/5 transition-colors">
              <div className="h-10 w-10 rounded-lg liquid-glass mb-6" />
              <h3 className="text-xl font-medium mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Connect your stack", desc: "Sync your tools in one click. We map your data automatically." },
    { n: "02", title: "Describe the outcome", desc: "Tell StartUp what you want to happen — in plain English." },
    { n: "03", title: "Ship and iterate", desc: "Launch flows, measure impact, and refine in real time." },
  ];
  return (
    <section id="how" className="bg-black text-white py-24 md:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">How it works</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal" style={{ letterSpacing: "-0.04em" }}>From idea to live in three steps.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.n} className="liquid-glass rounded-2xl p-8">
              <div className="text-sm text-gray-400 mb-6">{s.n}</div>
              <h3 className="text-2xl font-normal mb-3 text-white" style={{ letterSpacing: "-0.02em" }}>{s.title}</h3>
              <p className="text-gray-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    { name: "Starter", price: "$0", tagline: "For solo builders kicking the tires.", features: ["Up to 3 workflows", "Community support", "1 workspace", "Basic analytics"], cta: "Start free", featured: false },
    { name: "Growth", price: "$49", tagline: "For teams shipping serious product.", features: ["Unlimited workflows", "Priority support", "Up to 10 seats", "Advanced analytics", "All integrations"], cta: "Start trial", featured: true },
    { name: "Enterprise", price: "Custom", tagline: "For organizations with scale and compliance needs.", features: ["SSO & SCIM", "Audit logs", "Dedicated CSM", "Custom SLAs", "On-prem options"], cta: "Talk to sales", featured: false },
  ];
  return (
    <section id="pricing" className="bg-black text-white py-24 md:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal" style={{ letterSpacing: "-0.04em" }}>Simple plans. Honest pricing.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div key={t.name} className={`rounded-2xl p-8 flex flex-col ${t.featured ? "bg-white text-black" : "liquid-glass border border-white/10 text-white"}`}>
              <div className="mb-6">
                <h3 className="text-xl font-medium mb-1">{t.name}</h3>
                <p className={`text-sm ${t.featured ? "text-gray-600" : "text-gray-400"}`}>{t.tagline}</p>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-normal" style={{ letterSpacing: "-0.04em" }}>{t.price}</span>
                {t.price !== "Custom" && <span className={`text-sm ml-1 ${t.featured ? "text-gray-600" : "text-gray-400"}`}>/mo</span>}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {t.features.map((f) => (
                  <li key={f} className={`text-sm flex gap-2 ${t.featured ? "text-gray-700" : "text-gray-300"}`}>
                    <span>→</span><span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full px-6 py-3 rounded-lg font-medium transition-colors ${t.featured ? "bg-black text-white hover:bg-gray-900" : "bg-white text-black hover:bg-gray-100"}`}>
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { quote: "StartUp replaced four tools in our stack and our ops team got their evenings back.", name: "Maya Chen", role: "COO, Northwind" },
    { quote: "We launched three new revenue streams in a quarter. It just keeps compounding.", name: "Diego Alvarez", role: "Founder, Lumen" },
    { quote: "The cleanest API we've integrated all year. Our engineers actually like it.", name: "Priya Shah", role: "Head of Eng, Vertex" },
  ];
  return (
    <section className="bg-black text-white py-24 md:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Loved by teams</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal" style={{ letterSpacing: "-0.04em" }}>Built for the teams building what's next.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <figure key={t.name} className="liquid-glass rounded-2xl p-8 flex flex-col justify-between">
              <blockquote className="text-lg leading-relaxed mb-6 text-white">"{t.quote}"</blockquote>
              <figcaption>
                <div className="font-medium text-white">{t.name}</div>
                <div className="text-sm text-gray-400">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Is there really a free plan?", a: "Yes. The Starter plan is free forever for solo users with up to 3 workflows." },
    { q: "Can I switch plans later?", a: "Anytime. Upgrades are prorated and downgrades take effect at the next billing cycle." },
    { q: "Do you offer onboarding for larger teams?", a: "Growth and Enterprise customers get hands-on onboarding from a dedicated specialist." },
    { q: "Where is my data stored?", a: "Data is stored in SOC 2 Type II certified facilities, with regional options for EU and US." },
  ];
  return (
    <section id="faq" className="bg-black text-white py-24 md:py-32 border-t border-white/10">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-16">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal" style={{ letterSpacing: "-0.04em" }}>Questions, answered.</h2>
        </div>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((item) => (
            <details key={item.q} className="group py-6">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-lg font-medium text-white">{item.q}</span>
                <span className="text-2xl text-gray-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-gray-400 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-black text-white py-24 md:py-32 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 text-center liquid-glass rounded-3xl py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 text-white" style={{ letterSpacing: "-0.04em" }}>Start building in minutes.</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-8">Join thousands of teams using StartUp to automate the boring and accelerate the ambitious.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">Start free trial</button>
          <button className="border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">Talk to sales</button>
        </div>
      </div>
    </section>
  );
}

function TechFooter() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-16 grid md:grid-cols-4 gap-12">
        <div>
          <div className="text-xl font-medium tracking-tight mb-3">StartUp</div>
          <p className="text-sm text-gray-400">The AI-native platform for ambitious teams.</p>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#features" className="hover:text-white">Features</a></li>
            <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
            <li><a href="#how" className="hover:text-white">How it works</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#about" data-demo-action className="hover:text-white">About</a></li>
            <li><a href="#careers" data-demo-action className="hover:text-white">Careers</a></li>
            <li><a href="#blog" data-demo-action className="hover:text-white">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#privacy" data-demo-action className="hover:text-white">Privacy</a></li>
            <li><a href="#terms" data-demo-action className="hover:text-white">Terms</a></li>
            <li><a href="#security" data-demo-action className="hover:text-white">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-gray-500">
        <p>© 2026 StartUp, Inc. All rights reserved.</p>
        <p className="mt-2 text-[11px] leading-relaxed text-gray-600">
          This is a concept demo. Testimonials, businesses, statistics, and claims are fictional.
        </p>
      </div>
    </footer>
  );
}

const TechDemo = () => (
  <main className="bg-black">
    <BackToZerra />
    <Hero />
    <Logos />
    <Features />
    <HowItWorks />
    <Pricing />
    <Testimonials />
    <FAQ />
    <CTA />
    <TechFooter />
    <DemoModal />
  </main>
);

export default TechDemo;

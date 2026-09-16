import BackToZerra from "@/components/BackToZerra";
import "@/components/demo-context.css";
import "@/demos/tech/tech.css";
import { lazy, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AnimatedHeading } from "@/demos/tech/components/AnimatedHeading";
import { FadeIn } from "@/demos/tech/components/FadeIn";
import techMobileHero from "@/demos/tech/assets/tech-demo-mobile-hero.png";

const GetStarted = lazy(() => import("@/demos/tech/components/GetStarted").then(module => ({ default: module.GetStarted })));

const HOME = "/our-work/tech-demo";
const START = `${HOME}/get-started`;

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
        <Link to={START} className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200 active:scale-95">
          Get Started
        </Link>
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
                Fictional software concept
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
                <Link to={START} className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Start free trial
                </Link>
                <Link to={`${START}?preview=1`} className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">
                  Watch demo
                </Link>
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
        <p className="text-center text-sm uppercase tracking-widest text-gray-400 mb-8">Illustrative brands, not customers</p>
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
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Illustrative product features</p>
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
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Illustrative pricing</p>
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
              <Link to={`${START}?plan=${t.name.toLowerCase()}`} className={`text-center w-full px-6 py-3 rounded-lg font-medium transition-colors ${t.featured ? "bg-black text-white hover:bg-gray-900" : "bg-white text-black hover:bg-gray-100"}`}>
                {t.cta}
              </Link>
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
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Fictional testimonial examples</p>
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
    { q: "Is StartUp a real software service?", a: "No. StartUp is a fictional brand and website concept by Zerra Studios. The product features, plans, testimonials and businesses shown are illustrative, not real offers, certifications or customer results." },
    { q: "What happens when I get started?", a: "You choose sample tools, select an automation outcome and run a sample event. The preview shows a trigger, an example AI summary and the resulting Slack message. No real tools are connected or messages sent." },
    { q: "Will my information be saved?", a: "No. The walkthrough uses prepared sample data and does not ask for account credentials or personal information. Your example resets when you leave the page or reload." },
    { q: "Can I enquire about a website like this?", a: "Yes. Use the Zerra Studios enquiry link in the footer to discuss your own website. That takes you to the real studio website." },
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
        <p className="text-gray-300 max-w-xl mx-auto mb-8">Explore the StartUp concept with a sample automation. No account or payment required.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to={START} className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">Start free trial</Link>
          <Link to={`${START}?plan=enterprise`} className="border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors">Explore Enterprise</Link>
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
            <li><a href={`${HOME}#features`} className="hover:text-white">Features</a></li>
            <li><a href={`${HOME}#pricing`} className="hover:text-white">Pricing</a></li>
            <li><a href={`${HOME}#how`} className="hover:text-white">How it works</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to={START} className="hover:text-white">Get Started</Link></li>
            <li><Link to={`${START}?preview=1`} className="hover:text-white">Try the preview</Link></li>
            <li><Link to={`${HOME}#faq`} className="hover:text-white">Concept FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-4">Zerra Studios</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to={"/"} className="hover:text-white">About the studio</Link></li>
            <li><Link to={"/our-work"} className="hover:text-white">More of our work</Link></li>
            <li><Link to={"/?enquiry=website"} className="hover:text-white">Enquire about a website</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-gray-400">
        <p>StartUp · A fictional brand and website concept by <Link to="/" className="underline underline-offset-4">Zerra Studios</Link>.</p>
        <p className="mt-2 text-[11px] leading-relaxed text-gray-400">
          Testimonials, businesses, features and prices are illustrative. Interactions are simulated; no accounts, payments or remote workspaces are created.
        </p>
      </div>
    </footer>
  );
}

function TechHome() {
  return <><Hero /><Logos /><Features /><HowItWorks /><Pricing /><Testimonials /><FAQ /><CTA /></>;
}

function TechDemo() {
  const { pathname, hash } = useLocation();
  const path = pathname.replace(/\/+$/, "");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
      else window.scrollTo(0, 0);
    }, 50);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);
  return (
    <>
    <BackToZerra />
    <div className="tech-demo bg-black">
      <Helmet>
        <title>StartUp{path.endsWith("/get-started") ? " — Get Started" : ""} | Zerra Studios Concept</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="tech-concept-bar zerra-demo-context"><span>Fictional brand &amp; website concept by Zerra Studios</span></div>
      <main>
        <Routes>
          <Route index element={<TechHome />} />
          <Route path="get-started" element={<GetStarted />} />
          <Route path="*" element={<section className="tech-setup text-white"><h1 className="text-4xl mb-6">This page isn’t part of the preview.</h1><Link to={HOME}>← Back to StartUp</Link></section>} />
        </Routes>
      </main>
      <TechFooter />
    </div>
    </>
  );
}

export default TechDemo;

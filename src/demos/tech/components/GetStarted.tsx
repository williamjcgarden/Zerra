import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { plans } from "../plans";

const HOME = "/our-work/tech-demo";
const workflows = [
  { name: "Customer follow-up", description: "Bring new enquiries into one place and route the next step." },
  { name: "Payment alerts", description: "Keep your team informed about payment activity." },
  { name: "Product updates", description: "Turn issue changes into useful team updates." },
];

export function GetStarted() {
  const { search } = useLocation();
  const [planName, setPlanName] = useState("Starter");
  const [step, setStep] = useState(1);
  const [ready, setReady] = useState(false);
  const [seats, setSeats] = useState("1");
  const [selectedWorkflows, setSelectedWorkflows] = useState([workflows[0].name]);
  const heading = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const plan = plans.find(item => item.name === planName) || plans[0];
  const price = plan.price === "Custom" ? "Custom pricing" : `${plan.price}/mo`;

  // Query selections are applied after the matching server/first-client render.
  useEffect(() => {
    const selected = new URLSearchParams(search).get("plan")?.toLowerCase();
    const match = plans.find(item => item.name.toLowerCase() === selected);
    setPlanName(match?.name || "Starter");
    setSeats("1"); setSelectedWorkflows([workflows[0].name]);
    setStep(match ? 2 : 1);
    setReady(true);
  }, [search]);
  useEffect(() => {
    if (shouldFocus.current) heading.current?.focus();
  }, [step]);

  function goTo(next: number) {
    shouldFocus.current = true;
    setStep(next);
  }
  function choosePlan(name: string) {
    setPlanName(name);
    if (name === "Growth" && Number(seats) > 10) setSeats("10");
    goTo(2);
  }
  function toggleWorkflow(name: string) {
    setSelectedWorkflows(current => current.includes(name) ? current.filter(item => item !== name) : [...current, name]);
  }

  return (
    <section className="tech-setup text-white">
      <Link to={HOME} className="tech-setup-back">← Back to StartUp</Link>
      <p className="tech-setup-kicker">Get Started · Signup preview</p>
      {step < 4 && <ol className="tech-onboarding-steps" aria-label="Signup progress">
        {["Choose plan", "Workflows & seats", "Start trial"].map((label, index) => <li key={label} aria-current={step === index + 1 ? "step" : undefined}><span>{step > index + 1 ? <Check size={14} aria-hidden="true" /> : index + 1}</span>{label}</li>)}
      </ol>}
      <h1 ref={heading} tabIndex={-1} className="text-4xl md:text-5xl font-normal mb-5" style={{ letterSpacing: "-0.04em" }}>
        {step === 1 ? "Simple plans. Honest pricing." : step === 2 ? "Set up your workflows and seats." : step === 3 ? "Start your trial." : "This is just a demo."}
      </h1>
      <p className="text-gray-300 mb-8 tech-setup-intro">
        {step === 1 ? "Choose a plan to get started." : step === 2 ? "Choose what you want to automate and how many people will use your workspace." : step === 3 ? "Review your selections before you start." : "Talk to Zerra if you want to build your own software site."}
      </p>

      {step === 1 && <div className="tech-signup-plans">
        {plans.map(item => <article key={item.name} className={item.featured ? "tech-signup-plan tech-signup-plan-featured" : "tech-signup-plan"}>
          <h2>{item.name}</h2><p>{item.tagline}</p>
          <div className="tech-plan-price">{item.price}{item.price !== "Custom" && <span>/mo</span>}</div>
          <ul>{item.features.map(feature => <li key={feature}><Check size={14} aria-hidden="true" />{feature}</li>)}</ul>
          <button type="button" disabled={!ready} onClick={() => choosePlan(item.name)}>Choose {item.name} <ArrowRight size={16} /></button>
        </article>)}
      </div>}

      {step === 2 && <form onSubmit={event => { event.preventDefault(); if (selectedWorkflows.length) goTo(3); }}>
        <div className="tech-selected-plan"><div><strong>{plan.name}</strong><span>{price}</span></div><button type="button" onClick={() => goTo(1)}>Change plan</button></div>
        <fieldset className="tech-workflow-options" aria-describedby="tech-workflow-help">
          <legend>Choose your workflows</legend>
          <p id="tech-workflow-help">Select at least one to start with.</p>
          {workflows.map(item => <label key={item.name}>
            <input type="checkbox" checked={selectedWorkflows.includes(item.name)} onChange={() => toggleWorkflow(item.name)} />
            <span><strong>{item.name}</strong><span>{item.description}</span></span>
          </label>)}
        </fieldset>
        <div className="tech-seat-field"><label htmlFor="tech-seats">Team seats</label><p id="tech-seat-help">Include yourself and everyone who will use the workspace.{plan.name === "Growth" ? " Growth includes up to 10 seats." : ""}</p><input id="tech-seats" aria-describedby="tech-seat-help" type="number" min="1" max={plan.name === "Growth" ? 10 : undefined} step="1" required value={seats} onChange={event => setSeats(event.target.value)} /></div>
        <div className="tech-setup-actions mt-8"><button className="tech-primary-action" type="submit" disabled={!selectedWorkflows.length}>Continue to trial <ArrowRight size={17} /></button></div>
      </form>}

      {step === 3 && <div className="tech-trial-review liquid-glass rounded-2xl">
        <h2>Your trial setup</h2>
        <dl><div><dt>Plan</dt><dd>{plan.name} · {price}</dd></div><div><dt>Team seats</dt><dd>{seats}</dd></div><div><dt>Workflows</dt><dd><ul>{selectedWorkflows.map(name => <li key={name}>{name}</li>)}</ul></dd></div></dl>
        <p className="tech-trial-note">Demo preview. No payment details are needed.</p>
        <div className="tech-setup-actions"><button type="button" className="tech-primary-action" onClick={() => goTo(4)}>Start trial <ArrowRight size={17} /></button><button type="button" onClick={() => goTo(2)}>Edit setup</button></div>
      </div>}

      {step === 4 && <div className="tech-demo-finish">
        <p>No trial has been started, and nothing has been charged.</p>
        <div className="tech-setup-actions"><Link className="tech-primary-action" to="/?enquiry=website">Talk to Zerra <ArrowRight size={17} /></Link><Link to={HOME}>Back to StartUp</Link></div>
      </div>}
      {step < 4 && <p className="text-sm text-gray-400 mt-8">Illustrative plans and pricing. Your selections are not saved.</p>}
    </section>
  );
}

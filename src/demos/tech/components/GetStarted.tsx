import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, GitBranch, MessageSquare, Play, RotateCcw } from "lucide-react";

const HOME = "/our-work/tech-demo";
const examples = [
  {
    source: "Stripe", description: "Keep your team in the loop when a payment needs attention.",
    requests: [
      { name: "Flag a failed payment", prompt: "When a payment fails in Stripe, summarize what happened and notify the team in Slack.", event: "Payment failed", reference: "Sample invoice INV-1042", channel: "#revenue", message: "A payment for Northwind could not be completed. Review sample invoice INV-1042 and arrange a follow-up.", action: "Review invoice" },
      { name: "Share a new subscription", prompt: "When a new subscription starts in Stripe, share the customer and plan with the team in Slack.", event: "Subscription started", reference: "Sample customer: Northwind · Growth plan", channel: "#revenue", message: "Northwind has started a Growth subscription. The team can now prepare the customer handoff.", action: "View customer" },
    ],
  },
  {
    source: "Linear", description: "Bring urgent product work to the right people, automatically.",
    requests: [
      { name: "Escalate an urgent issue", prompt: "When an urgent issue is created in Linear, summarize it and alert the team in Slack.", event: "Urgent issue created", reference: "Sample issue ENG-128 · Checkout button is unresponsive", channel: "#product", message: "ENG-128 needs attention: the checkout button is unresponsive. The sample issue is marked urgent and ready for triage.", action: "Open issue" },
      { name: "Share a resolved issue", prompt: "When an issue is completed in Linear, post a short resolution update to the team in Slack.", event: "Issue completed", reference: "Sample issue ENG-128 · Checkout button restored", channel: "#product", message: "ENG-128 is complete: the checkout button has been restored. The team can review the resolution and update affected customers.", action: "Review resolution" },
    ],
  },
];

export function GetStarted() {
  const { search } = useLocation();
  const [plan, setPlan] = useState("Starter");
  const [step, setStep] = useState(1);
  const [stack, setStack] = useState(0);
  const [request, setRequest] = useState(0);
  const [runs, setRuns] = useState(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);
  const example = examples[stack];
  const outcome = example.requests[request];

  // Apply URL choices after the identical server/first-client render.
  useEffect(() => {
    const query = new URLSearchParams(search);
    const selected = query.get("plan")?.toLowerCase();
    setPlan(selected === "growth" ? "Growth" : selected === "enterprise" ? "Enterprise" : "Starter");
    setStack(0); setRequest(0); setRuns(0);
    setStep(query.get("preview") === "1" ? 3 : 1);
  }, [search]);
  useEffect(() => {
    if (shouldFocus.current) heading.current?.focus();
  }, [step]);

  function goTo(next: number) {
    shouldFocus.current = true;
    setStep(next);
  }
  function restart() {
    setStack(0); setRequest(0); setRuns(0); goTo(1);
  }

  return (
    <section className="tech-setup text-white">
      <Link to={HOME} className="tech-setup-back">← Back to StartUp</Link>
      <div className="tech-setup-kicker"><p>Get Started · {plan} plan preview</p><span>Sample data</span></div>
      <ol className="tech-onboarding-steps" aria-label="Setup progress">
        {["Connect tools", "Choose outcome", "Test workflow"].map((label, index) => <li key={label} aria-current={step === index + 1 ? "step" : undefined}><span>{step > index + 1 ? <Check size={14} aria-hidden="true" /> : index + 1}</span>{label}</li>)}
      </ol>
      <h1 ref={heading} tabIndex={-1} className="text-4xl md:text-5xl font-normal mb-5" style={{ letterSpacing: "-0.04em" }}>
        {step === 1 ? "Connect your tools." : step === 2 ? "What should happen automatically?" : "Test your first automation."}
      </h1>
      <p className="text-gray-300 mb-8 tech-setup-intro">
        {step === 1 ? "Start with an example stack. See how StartUp could turn activity in your tools into a useful team update." : step === 2 ? "Choose a plain-English request. This guided demo uses prepared examples to show how a request becomes a workflow." : "Run a sample event through your workflow and inspect the update it produces."}
      </p>
      <p className="tech-demo-note">Interactive concept only. No tools are connected and no messages are sent.</p>

      {step === 1 && <form onSubmit={event => { event.preventDefault(); goTo(2); }}>
        <fieldset className="tech-stack-options">
          <legend className="sr-only">Choose your sample tools</legend>
          {examples.map((item, index) => <label key={item.source}>
            <input type="radio" name="sample-stack" checked={stack === index} onChange={() => { setStack(index); setRequest(0); setRuns(0); }} />
            <span><strong>{item.source} <ArrowRight size={16} aria-hidden="true" /> Slack</strong><span>{item.description}</span></span>
          </label>)}
        </fieldset>
        <div className="tech-setup-actions mt-8">
          <button className="tech-primary-action" type="submit">Use sample tools <ArrowRight size={17} /></button>
          <Link to={`${HOME}#pricing`}>Compare plans</Link>
        </div>
      </form>}

      {step === 2 && <form onSubmit={event => { event.preventDefault(); setRuns(0); goTo(3); }}>
        <div className="tech-connected-stack"><GitBranch size={16} aria-hidden="true" /> {example.source} → Slack <span>Sample stack ready</span></div>
        <fieldset className="tech-outcome-options">
          <legend className="sr-only">Choose an automation outcome</legend>
          {example.requests.map((item, index) => <label key={item.name}>
            <input type="radio" name="outcome" checked={request === index} onChange={() => { setRequest(index); setRuns(0); }} />
            <span><strong>{item.name}</strong><span>“{item.prompt}”</span></span>
          </label>)}
        </fieldset>
        <div className="tech-setup-actions mt-8">
          <button className="tech-primary-action" type="submit">Preview workflow <ArrowRight size={17} /></button>
          <button type="button" onClick={() => goTo(1)}>Back to tools</button>
        </div>
      </form>}

      {step === 3 && <>
        <div className="tech-workflow-preview liquid-glass rounded-2xl">
          <div className="tech-workflow-heading"><div><p className="text-xs uppercase tracking-widest text-gray-400 mb-2">Your sample workflow</p><h2 className="text-2xl font-normal">{outcome.name}</h2></div><span className="tech-mode-label">Test mode</span></div>
          <p className="tech-workflow-request">“{outcome.prompt}”</p>
          <ol className="tech-workflow-nodes" aria-label="Workflow steps">
            <li><span>01 · Trigger</span><strong>{outcome.event}</strong><small>{example.source}</small></li>
            <li><span>02 · AI step</span><strong>Summarize the event</strong><small>Prepared example summary</small></li>
            <li><span>03 · Action</span><strong>Notify the team</strong><small>Slack · {outcome.channel}</small></li>
          </ol>
          <div className="tech-sample-event"><span>Sample input</span><p>{outcome.reference}</p></div>
          <div className="tech-setup-actions">
            <button type="button" className="tech-primary-action" onClick={() => setRuns(count => count + 1)}>{runs ? <RotateCcw size={16} /> : <Play size={16} />} {runs ? "Run another sample" : "Run sample event"}</button>
            <button type="button" onClick={() => goTo(2)}>Edit workflow</button>
          </div>
        </div>
        <div role="status" className="tech-run-status">{runs ? `Sample run complete · ${runs} ${runs === 1 ? "event" : "events"} processed · 3 of 3 steps completed.` : "Ready to test. No sample events processed yet."}</div>
        {runs > 0 && <section className="tech-message-preview" aria-labelledby="tech-result-heading">
          <div className="tech-message-heading"><MessageSquare size={18} aria-hidden="true" /><h2 id="tech-result-heading">Slack message preview</h2><span>{outcome.channel}</span></div>
          <div className="tech-message-body"><strong>StartUp <span>APP · SAMPLE</span></strong><p>{outcome.message}</p><span className="tech-message-action">Suggested next step: {outcome.action}</span></div>
          <p className="tech-message-caption">Preview only. This message was not sent to Slack.</p>
        </section>}
        <div className="tech-setup-actions mt-6"><button type="button" onClick={restart}>Try a different workflow</button><Link to={`${HOME}#features`}>Explore StartUp’s features</Link></div>
      </>}
      <p className="text-sm text-gray-400 mt-8">Your example resets when you leave or reload. No account or trial is created.</p>
    </section>
  );
}

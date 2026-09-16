import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const HOME = "/our-work/tech-demo";
const workflows = {
  "Product launch": ["Write the launch brief", "Review the product page", "Prepare the release checklist"],
  "Client project": ["Confirm the project brief", "Review the first concept", "Prepare the client handoff"],
  "Everyday work": ["Set this week’s priorities", "Review open requests", "Plan the next team update"],
};
type Workflow = keyof typeof workflows;

export function GetStarted() {
  const { search } = useLocation();
  const [plan, setPlan] = useState("Starter");
  const [workflow, setWorkflow] = useState<Workflow>("Product launch");
  const [team, setTeam] = useState("2–5 people");
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(false);
  const [completed, setCompleted] = useState<number[]>([]);
  const heading = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);

  // Keep the first client render identical to the query-free prerendered page.
  useEffect(() => {
    const query = new URLSearchParams(search);
    const selected = query.get("plan")?.toLowerCase();
    setPlan(selected === "growth" ? "Growth" : selected === "enterprise" ? "Enterprise" : "Starter");
    setPreview(query.get("preview") === "1");
  }, [search]);
  useEffect(() => {
    if (shouldFocus.current) heading.current?.focus();
  }, [preview]);

  function showPreview(next: boolean) {
    shouldFocus.current = true;
    setPreview(next);
  }
  function restart() {
    setWorkflow("Product launch");
    setTeam("2–5 people");
    setName("");
    setCompleted([]);
    showPreview(false);
  }

  return (
    <section className="tech-setup text-white">
      <Link to={HOME} className="tech-setup-back">← Back to StartUp</Link>
      <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">Get Started · Concept preview</p>
      <h1 ref={heading} tabIndex={-1} className="text-4xl md:text-5xl font-normal mb-5" style={{ letterSpacing: "-0.04em" }}>
        {preview ? "Your workspace, in preview." : "Make room for your next idea."}
      </h1>
      <p className="text-gray-300 mb-8 tech-setup-intro">
        {preview ? "Try the sample checklist below. Your changes stay on this page." : "Choose a workflow and team size to explore a sample workspace."}
        {" "}No real account, trial, payment or invitation is created. Nothing is submitted or saved remotely.
      </p>
      {!preview ? (
        <form className="liquid-glass rounded-2xl p-6 md:p-10" onSubmit={event => { event.preventDefault(); setCompleted([]); showPreview(true); }}>
          <div className="tech-setup-fields">
            <label>Workflow
              <select aria-label="Workflow" value={workflow} onChange={event => setWorkflow(event.target.value as Workflow)}>
                {Object.keys(workflows).map(item => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>Team size
              <select aria-label="Team size" value={team} onChange={event => setTeam(event.target.value)}>
                {["Just me", "2–5 people", "6–10 people", "11+ people"].map(item => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>Illustrative plan
              <select aria-label="Illustrative plan" value={plan} onChange={event => setPlan(event.target.value)}>
                {["Starter", "Growth", "Enterprise"].map(item => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>Workspace name <span className="text-gray-400">(optional)</span>
              <input value={name} maxLength={40} onChange={event => setName(event.target.value)} placeholder="My sample workspace" autoComplete="off" aria-describedby="tech-name-help" />
            </label>
          </div>
          <p id="tech-name-help" className="text-sm text-gray-400 mt-4">Use a made-up name. No personal details are needed.</p>
          <div className="tech-setup-actions mt-8">
            <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100" type="submit">Preview workspace →</button>
            <Link to={`${HOME}#pricing`}>Compare illustrative plans</Link>
          </div>
        </form>
      ) : (
        <div className="liquid-glass rounded-2xl p-6 md:p-10">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Sample workspace</p>
          <h2 className="tech-workspace-name text-2xl md:text-3xl font-normal mb-3">{name.trim() || "My sample workspace"}</h2>
          <p className="text-sm text-gray-400 mb-7">{workflow} · {team} · {plan} concept</p>
          <p className="text-sm text-gray-300 mb-3" role="status">{completed.length} of {workflows[workflow].length} sample tasks complete</p>
          <ul className="tech-checklist">
            {workflows[workflow].map((task, index) => (
              <li key={task}><label>
                <input type="checkbox" checked={completed.includes(index)} onChange={() => setCompleted(current => current.includes(index) ? current.filter(value => value !== index) : [...current, index])} />
                <span>{task}</span>
              </label></li>
            ))}
          </ul>
          <div className="tech-setup-actions mt-8">
            <button type="button" className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100" onClick={() => showPreview(false)}>Edit workspace</button>
            <button type="button" onClick={restart}>Start again</button>
          </div>
          <p className="text-sm text-gray-400 mt-6">This is a temporary example, not a connected workspace. Reloading or leaving this page resets your choices.</p>
        </div>
      )}
      <p className="text-sm text-gray-400 mt-8">Questions about this concept? <Link className="underline underline-offset-4" to={`${HOME}#faq`}>Read the FAQ</Link>.</p>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sprout,
  Hammer,
  PencilRuler,
  Repeat,
} from "lucide-react";

export const landscapingBase = "/our-work/landscaping-demo";
const options = [
  {
    id: "lawn-care",
    title: "Lawn Care",
    icon: Sprout,
    description:
      "Explore mowing, edging and seasonal care for the lawn you have, or describe the areas you want to improve.",
    details: [
      "Current lawn condition",
      "Mowing and edging needs",
      "How you use the space",
    ],
  },
  {
    id: "hardscaping",
    title: "Hardscaping",
    icon: Hammer,
    description:
      "Bring your ideas for patios, walkways, retaining walls and outdoor gathering spaces into one project brief.",
    details: [
      "Patios and seating areas",
      "Paths and access",
      "Material preferences and existing features",
    ],
  },
  {
    id: "landscape-design",
    title: "Landscape Design",
    icon: PencilRuler,
    description:
      "Think through a garden layout around your home and the way you want to spend time outside.",
    details: [
      "Planting and garden layouts",
      "Front and back yard planning",
      "Features to keep or change",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance Plans",
    icon: Repeat,
    description:
      "Describe the regular care and seasonal attention your garden needs, from planted borders to overgrown corners.",
    details: [
      "Garden bed upkeep",
      "Seasonal tidy-ups",
      "Recurring care priorities",
    ],
  },
];
export function ServiceDetails() {
  return (
    <div className="landscaping-destination mx-auto max-w-6xl px-6 pb-20">
      <Link
        className="landscaping-journey-link"
        to={`${landscapingBase}#services`}
      >
        <ArrowLeft size={16} />
        Back to Verdant
      </Link>
      <h1 className="mt-6 font-display text-4xl text-foreground md:text-5xl">
        Care for every corner of your landscape.
      </h1>
      <p className="mt-5 max-w-2xl text-muted-foreground">
        Explore these example services, then try a project brief. Verdant is
        fictional; no quote request or booking is sent.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {options.map((service) => (
          <section
            id={service.id}
            key={service.id}
            className="landscaping-service-detail rounded-3xl border border-border bg-card p-7 md:p-9"
          >
            <service.icon className="h-9 w-9 text-primary" />
            <h2 className="mt-6 font-display text-3xl">{service.title}</h2>
            <p className="mt-4 text-muted-foreground">{service.description}</p>
            <ul className="my-6 space-y-3">
              {service.details.map((detail) => (
                <li className="flex items-start gap-3 text-sm" key={detail}>
                  <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
                  {detail}
                </li>
              ))}
            </ul>
            <Link
              className="landscaping-journey-button"
              to={`${landscapingBase}/get-a-quote?service=${service.id}`}
            >
              Plan this project <ArrowRight size={17} />
            </Link>
          </section>
        ))}
      </div>
      <section className="mt-14 rounded-3xl bg-secondary p-7 md:p-9">
        <h2 className="font-display text-3xl">
          What goes into a useful brief?
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Start with the area you want to change, how you use it and what
          matters most to you. Add a preferred timeframe. A real landscaper
          would need to review the site and scope before pricing or confirming
          work.
        </p>
        <Link
          className="landscaping-journey-link mt-4"
          to={`${landscapingBase}/get-a-quote`}
        >
          Explore the project brief <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  );
}
export function QuoteJourney() {
  const [params, setParams] = useSearchParams();
  const requestedService = params.get("service") || "";
  const [service, setService] = useState("");
  const [step, setStep] = useState(1);
  const [property, setProperty] = useState("Home garden");
  const [area, setArea] = useState("Back garden");
  const [timeframe, setTimeframe] = useState("Exploring ideas");
  const [details, setDetails] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const priorStep = useRef(step);
  useEffect(() => {
    if (options.some((item) => item.id === requestedService))
      setService(requestedService);
  }, [requestedService]);
  useEffect(() => {
    if (priorStep.current !== step) {
      heading.current?.focus();
      priorStep.current = step;
    }
  }, [step]);
  const serviceName =
    options.find((item) => item.id === service)?.title || "Help me decide";
  const restart = () => {
    setService("");
    setProperty("Home garden");
    setArea("Back garden");
    setTimeframe("Exploring ideas");
    setDetails("");
    setStep(1);
    setParams({}, { replace: true });
  };
  return (
    <div className="landscaping-destination mx-auto max-w-3xl px-6 pb-20">
      <Link className="landscaping-journey-link" to={landscapingBase}>
        <ArrowLeft size={16} />
        Back to Verdant
      </Link>
      <h1 className="mt-6 font-display text-4xl md:text-5xl">Get a Quote</h1>
      <p className="mt-5 text-muted-foreground">
        Try a project brief for your outdoor space. This is a demo: no price is
        calculated, nothing is sent or booked, and no personal details are
        needed.
      </p>
      <div className="landscaping-journey-panel mt-9 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
        <ol
          className="landscaping-progress mb-8"
          aria-label="Project brief progress"
        >
          {["Service", "Your space", "Preview"].map((label, index) => (
            <li
              key={label}
              aria-current={step === index + 1 ? "step" : undefined}
            >
              <span>{step > index + 1 ? <Check size={15} /> : index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        {step === 1 && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setStep(2);
            }}
          >
            <h2 ref={heading} tabIndex={-1} className="font-display text-3xl">
              What can we help you plan?
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Choose your starting point. Add any related ideas in the next
              step.
            </p>
            <fieldset className="landscaping-service-options">
              <legend className="sr-only">Choose a service</legend>
              {[...options, { id: "not-sure", title: "Help me decide" }].map(
                (item) => (
                  <label key={item.id}>
                    <input
                      name="service"
                      type="radio"
                      required
                      value={item.id}
                      checked={service === item.id}
                      onChange={() => setService(item.id)}
                    />
                    <span>{item.title}</span>
                  </label>
                ),
              )}
            </fieldset>
            <button type="submit" className="landscaping-journey-button">
              Continue to project details <ArrowRight size={17} />
            </button>
          </form>
        )}
        {step === 2 && (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (details.trim().length >= 10) setStep(3);
            }}
          >
            <h2 ref={heading} tabIndex={-1} className="font-display text-3xl">
              Tell us about your space.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Starting point: <strong>{serviceName}</strong>. Use general
              details; leave out your address or contact information.
            </p>
            <div className="landscaping-form-grid">
              <label>
                Property type
                <select
                  value={property}
                  onChange={(event) => setProperty(event.target.value)}
                >
                  <option>Home garden</option>
                  <option>Shared residential space</option>
                  <option>Business property</option>
                  <option>Other / not sure</option>
                </select>
              </label>
              <label>
                Area to focus on
                <select
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                >
                  <option>Back garden</option>
                  <option>Front garden</option>
                  <option>Whole property</option>
                  <option>Patio or courtyard</option>
                  <option>Other / not sure</option>
                </select>
              </label>
            </div>
            <label>
              Preferred timeframe
              <select
                value={timeframe}
                onChange={(event) => setTimeframe(event.target.value)}
              >
                <option>Exploring ideas</option>
                <option>As soon as practical</option>
                <option>Within the next few months</option>
                <option>Later in the year</option>
                <option>Recurring / seasonal care</option>
              </select>
            </label>
            <label htmlFor="landscaping-project-details">
              What would you like to change?
            </label>
            <textarea
              id="landscaping-project-details"
              required
              minLength={10}
              maxLength={1500}
              rows={5}
              value={details}
              onChange={(event) => {
                setDetails(event.target.value);
                event.target.setCustomValidity(
                  event.target.value.trim().length >= 10
                    ? ""
                    : "Please add at least 10 characters describing your ideas.",
                );
              }}
              placeholder="For example: space for outdoor dinners, more planting and a smaller lawn to maintain."
              aria-describedby="landscaping-details-hint"
            />
            <p
              id="landscaping-details-hint"
              className="mt-2 text-xs text-muted-foreground"
            >
              At least 10 characters. Please do not include personal
              information.
            </p>
            <p className="my-6 rounded-xl bg-secondary p-4 text-sm">
              Next, you’ll preview your brief. Nothing will be sent.
            </p>
            <div className="landscaping-form-actions">
              <button
                type="button"
                className="landscaping-journey-link"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} />
                Back
              </button>
              <button type="submit" className="landscaping-journey-button">
                Preview project brief <ArrowRight size={17} />
              </button>
            </div>
          </form>
        )}
        {step === 3 && (
          <div>
            <h2 ref={heading} tabIndex={-1} className="font-display text-3xl">
              Your project brief.
            </h2>
            <p className="mt-4 rounded-xl bg-secondary p-4 text-sm">
              Preview only. Nothing has been sent or booked.
            </p>
            <dl className="landscaping-brief">
              <div>
                <dt>Starting point</dt>
                <dd>{serviceName}</dd>
              </div>
              <div>
                <dt>Property & area</dt>
                <dd>
                  {property} · {area}
                </dd>
              </div>
              <div>
                <dt>Timeframe</dt>
                <dd>{timeframe}</dd>
              </div>
              <div>
                <dt>Your ideas</dt>
                <dd>{details.trim()}</dd>
              </div>
            </dl>
            <p className="mb-6 text-sm text-muted-foreground">
              For a real project, you could take a brief like this to a
              landscaper with photos and approximate dimensions. Site
              conditions, materials and scope would determine pricing.
            </p>
            <div className="landscaping-form-actions">
              <button
                type="button"
                className="landscaping-journey-button"
                onClick={() => setStep(2)}
              >
                Edit brief <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                className="landscaping-journey-link"
                onClick={restart}
              >
                Start a new brief
              </button>
            </div>
            <Link
              className="landscaping-journey-link mt-7"
              to="/?enquiry=website"
            >
              Real website enquiry with Zerra <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
      <p className="mt-5 text-center text-xs text-muted-foreground">
        Your brief stays on this page only. Leaving or reloading clears it.
      </p>
    </div>
  );
}
export function LandscapingNotFound() {
  return (
    <div className="landscaping-destination mx-auto max-w-3xl px-6 pb-20">
      <h1 className="font-display text-4xl">This page isn’t in the garden.</h1>
      <p className="my-6 text-muted-foreground">
        Explore Verdant’s services or return to the homepage.
      </p>
      <Link className="landscaping-journey-button" to={landscapingBase}>
        Back to Verdant <ArrowRight size={16} />
      </Link>
    </div>
  );
}

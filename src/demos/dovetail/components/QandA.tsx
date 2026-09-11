import { Link } from "@/demos/dovetail/navigation";

export function QandA() {
  return (
    <section className="shell section" aria-labelledby="faq-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The details</p>
          <h2 id="faq-title">Common questions.</h2>
        </div>
        <Link to="/help" className="text-link">
          Help &amp; information
        </Link>
      </div>
      <div className="details-list">
        <details>
          <summary>How should I care for the pieces?</summary>
          <p className="prose">
            Each product page includes care notes for its imagined fabric. For any real garment,
            follow the sewn-in care label; these notes describe the concept collection only.
          </p>
        </details>
        <details>
          <summary>How do the pieces fit?</summary>
          <p className="prose">
            The collection leans relaxed, with boxy tops and room for layering. Each product has
            specific fit notes; sizes and measurements are not verified for physical garments.{" "}
            <Link to="/help" hash="sizing" className="text-link">
              Sizing notes
            </Link>
          </p>
        </details>
        <details>
          <summary>Can I place an order?</summary>
          <p className="prose">
            No. DOVETAIL is a fictional clothing concept. Products and prices are illustrative; the
            bag is a local preview, with no payment or shipment.
          </p>
        </details>
        <details>
          <summary>Will my bag be saved?</summary>
          <p className="prose">
            Your bag is saved in this browser when local storage is available. It does not sync
            between devices, and clearing browser data or closing a private session may empty it. No
            account is needed.
          </p>
        </details>
        <details>
          <summary>Where would I start with the wardrobe?</summary>
          <p className="prose">
            A chalk tee, straight trousers and a dusty blue chore jacket. Add a crew for a softer
            layer, or keep it simple with the cap and tote. The palette is imagined to work across
            the collection.
          </p>
        </details>
      </div>
    </section>
  );
}

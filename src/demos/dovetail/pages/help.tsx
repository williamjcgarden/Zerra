import { Link } from "@/demos/dovetail/navigation";
import { Navbar } from "@/demos/dovetail/components/Navbar";
import { Footer } from "@/demos/dovetail/components/Footer";
import { ZERRA_CONTACT_URL } from "@/demos/dovetail/lib/zerra";

function HelpPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="page-main" tabIndex={-1}>
        <header className="shell section prose">
          <p className="eyebrow">DOVETAIL</p>
          <h1 className="page-title">Help &amp; information</h1>
          <p className="muted">A few clear notes on fit, your bag and this fictional collection.</p>
        </header>
        <div className="shell section help-layout">
          <nav className="help-nav" aria-label="Help topics">
            <Link to="/help" hash="sizing">
              Sizing &amp; fit
            </Link>
            <Link to="/help" hash="orders">
              Orders &amp; returns
            </Link>
            <Link to="/help" hash="privacy">
              Privacy &amp; storage
            </Link>
            <Link to="/help" hash="concept">
              About the concept
            </Link>
          </nav>
          <div className="prose">
            <section id="sizing" aria-labelledby="sizing-title">
              <h2 id="sizing-title" className="section-heading">
                Sizing &amp; fit
              </h2>
              <p>
                Each product has its own fit notes. Compare the described shape: boxy through the
                body, straight through the leg, or roomy enough for layering.
              </p>
              <p>
                Size options and fit advice are illustrative. There are no verified garment
                measurements, physical samples or fit guarantees for this concept.
              </p>
            </section>
            <section id="orders" aria-labelledby="orders-title">
              <h2 id="orders-title" className="section-heading">
                Orders &amp; returns
              </h2>
              <p>
                No real orders are placed. The bag and checkout are a local preview: there is no
                payment, shipment, delivery service, return or refund. Prices are illustrative and
                shown in CAD.
              </p>
              <p>
                No personal or payment details are submitted through this concept checkout. Nothing
                in your bag reserves a physical product.
              </p>
            </section>
            <section id="privacy" aria-labelledby="privacy-title">
              <h2 id="privacy-title" className="section-heading">
                Privacy &amp; storage
              </h2>
              <p>
                Your bag selections are stored only in this browser on this device, using local
                storage. They are not synced to an account or another device. Remove items from your
                bag or clear this site's browser storage to remove them.
              </p>
              <p>
                The bag stores product selections and quantities, not your name, address or payment
                details. Browser settings may prevent it from being saved.
              </p>
              <p>
                Links to Zerra Studios open a separate website. Any contact details you choose to
                send there are outside this concept checkout.
              </p>
            </section>
            <section id="concept" aria-labelledby="concept-title">
              <h2 id="concept-title" className="section-heading">
                About the concept
              </h2>
              <p>
                DOVETAIL is a fictional clothing concept by Zerra Studios, not a trading retailer.
                The brand, products, specifications, prices and availability are illustrative. They
                do not represent goods offered for sale.
              </p>
              <p>
                For website enquiries, contact{" "}
                <a className="text-link" href={ZERRA_CONTACT_URL}>
                  Zerra Studios
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HelpPage;

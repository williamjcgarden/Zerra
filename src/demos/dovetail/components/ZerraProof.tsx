import { ArrowUpRight } from "lucide-react";
import { ZERRA_CONTACT_URL } from "@/demos/dovetail/lib/zerra";

export function ZerraProof() {
  return (
    <section className="section zerra-proof" aria-labelledby="zerra-proof-title">
      <div className="shell">
        <p className="eyebrow">A concept by Zerra Studios</p>
        <h2 id="zerra-proof-title">From a brand idea to a working website.</h2>
        <p className="zerra-proof-intro">Dovetail is a fictional clothing concept exploring how brand direction, imagery and interaction can work together. Explore the wardrobe, choose a size and try the bag.</p>
        <dl className="zerra-proof-grid">
          <div><dt>Brand direction</dt><dd>A name, palette and type system carried through the site and garment graphics.</dd></div>
          <div><dt>Art direction</dt><dd>Coordinated product imagery and three ways to combine the pieces.</dd></div>
          <div><dt>Website experience</dt><dd>Product discovery, detail pages, a persistent bag and a no-payment checkout preview.</dd></div>
        </dl>
        <a className="button" href={ZERRA_CONTACT_URL}>Discuss your website with Zerra <ArrowUpRight size={18} /></a>
        <p className="small muted">Fictional brand. No real products, orders or payments.</p>
      </div>
    </section>
  );
}

import { ZERRA_CONTACT_URL, ZERRA_WORK_URL } from "@/demos/dovetail/lib/zerra";
import { Link } from "@/demos/dovetail/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <Link to="/" search={{}} className="footer-brand" aria-label="DOVETAIL Studios home">
              DOVETAIL
              <br />
              <span>STUDIOS</span>
            </Link>
            <p className="muted">Relaxed shapes. Room to combine.</p>
          </div>
          <nav className="footer-links" aria-label="Shop categories">
            <h2 className="eyebrow">Collection</h2>
            <Link to="/" search={{}} hash="shop">
              All pieces
            </Link>
            <Link to="/" search={{ category: "Tops" }} hash="shop">
              Tops
            </Link>
            <Link to="/" search={{ category: "Outerwear" }} hash="shop">
              Outerwear
            </Link>
            <Link to="/" search={{ category: "Bottoms" }} hash="shop">
              Bottoms
            </Link>
            <Link to="/" search={{ category: "Accessories" }} hash="shop">
              Accessories
            </Link>
          </nav>
          <nav className="footer-links" aria-label="Studio information">
            <h2 className="eyebrow">Studio</h2>
            <Link to="/story">Our point of view</Link>
            <Link to="/help" hash="concept">
              About the concept
            </Link>
            <a href={ZERRA_CONTACT_URL}>Website enquiries</a>
          </nav>
          <nav className="footer-links" aria-label="Help and policies">
            <h2 className="eyebrow">Help</h2>
            <Link to="/help" hash="sizing">
              Sizing &amp; fit
            </Link>
            <Link to="/help" hash="orders">
              Orders &amp; returns
            </Link>
            <Link to="/help" hash="privacy">
              Privacy &amp; storage
            </Link>
          </nav>
        </div>
        <div className="footer-bottom small muted">
          <p>
            Fictional clothing concept by{" "}
            <a className="text-link" href={ZERRA_WORK_URL}>
              Zerra Studios
            </a>
          </p>
          <p>Illustrative prices in CAD. No real orders or payments.</p>
        </div>
      </div>
    </footer>
  );
}

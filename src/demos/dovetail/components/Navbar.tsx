import { useEffect, useState } from "react";
import { Link, useNavigate } from "@/demos/dovetail/navigation";
import { ArrowRight, Menu, Search, ShoppingBag } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { OverlayPanel } from "./OverlayPanel";
import { useCart } from "@/demos/dovetail/lib/cart";
import { filterProducts, formatPrice } from "@/demos/dovetail/data/nocturn";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [headerHidden, setHeaderHidden] = useState(false);
  useEffect(() => {
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    let previousY = window.scrollY;
    let pointerNearTop = false;
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      if (y <= 80) setHeaderHidden(false);
      else if (mouse.matches) setHeaderHidden(!pointerNearTop);
      else if (Math.abs(y - previousY) >= 8) setHeaderHidden(y > previousY);
      if (Math.abs(y - previousY) >= 8) previousY = y;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!mouse.matches || event.pointerType !== "mouse") return;
      if (event.clientY <= 20) pointerNearTop = true;
      else if (event.clientY > 80) pointerNearTop = false;
      if (window.scrollY > 80) setHeaderHidden(!pointerNearTop);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);
  const { count, setOpen } = useCart();
  const navigate = useNavigate();
  const results = filterProducts({ q: query }).slice(0, 4);
  const resultCount = filterProducts({ q: query }).length;
  return (
    <>
      <header className="site-header" data-hidden={headerHidden}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="demo-context"><span>Fictional brand &amp; website concept by Zerra Studios</span></div>
        <nav aria-label="Main navigation" className="nav-shell">
          <div className="nav-left">
            <button
              className="icon-button mobile-menu-button"
              aria-label="Open menu"
              title="Menu"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="desktop-links">
              <Link to="/" search={{}} hash="shop">
                Shop
              </Link>
              <Link to="/" search={{}} hash="collections">
                Collections
              </Link>
            </div>
          </div>
          <Link to="/" search={{}} className="nav-brand" aria-label="DOVETAIL home">
            <LogoMark />
            <span>DOVETAIL</span>
          </Link>
          <div className="nav-right">
            <div className="desktop-links">
              <Link to="/story">STUDIO</Link>
            </div>
            <button
              className="icon-button"
              aria-label="Search collection"
              title="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <button
              id="bag-trigger"
              className="icon-button bag-button"
              aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
              title="Your bag"
              onClick={() => setOpen(true)}
            >
              <ShoppingBag size={20} />
              <span className="bag-count" aria-hidden="true">
                {count}
              </span>
            </button>
          </div>
        </nav>
      </header>
      <OverlayPanel
        open={menuOpen}
        onOpenChange={setMenuOpen}
        title="Explore Dovetail"
        className="menu-panel"
      >
        <nav className="mobile-links" aria-label="Mobile navigation">
          <Link to="/" search={{}} hash="shop" onClick={() => setMenuOpen(false)}>
            Shop the collection <ArrowRight />
          </Link>
          <Link to="/" search={{}} hash="collections" onClick={() => setMenuOpen(false)}>
            Collections <ArrowRight />
          </Link>
          <Link to="/story" onClick={() => setMenuOpen(false)}>
            STUDIO <ArrowRight />
          </Link>
          <Link to="/help" onClick={() => setMenuOpen(false)}>
            Customer care <ArrowRight />
          </Link>
        </nav>
        <p className="small muted">A fictional clothing concept by Zerra Studios.</p>
      </OverlayPanel>
      <OverlayPanel
        open={searchOpen}
        onOpenChange={setSearchOpen}
        title="Find your next everyday piece"
        className="search-panel"
      >
        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault();
            setSearchOpen(false);
            void navigate({ to: "/", search: { q: query.trim() || undefined }, hash: "shop" });
          }}
        >
          <label className="sr-only" htmlFor="catalog-search">
            Search by name, fabric or colour
          </label>
          <Search size={20} aria-hidden="true" />
          <input
            id="catalog-search"
            type="search"
            value={query}
            maxLength={100}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try canvas, cotton or plum"
          />
          <button
            className="icon-button"
            type="submit"
            aria-label="Show search results"
            title="Show results"
          >
            <ArrowRight size={20} />
          </button>
        </form>
        <p className="eyebrow search-label" aria-live="polite">
          {query ? `${filterProducts({ q: query }).length} results` : "From the collection"}
        </p>
        <div className="search-results">
          {results.map((product) => (
            <Link
              key={product.id}
              to="/product/$id"
              params={{ id: product.id }}
              onClick={() => setSearchOpen(false)}
            >
              <img src={product.imageSmall} alt="" width={64} height={80} />
              <span>
                <strong>{product.name}</strong>
                <span className="muted small">{product.materials}</span>
              </span>
              <span>{formatPrice(product.price)}</span>
            </Link>
          ))}
        </div>
        {resultCount > results.length && (
          <Link
            to="/"
            search={{ q: query.trim() || undefined }}
            hash="shop"
            className="text-link search-all-results"
            onClick={() => setSearchOpen(false)}
          >
            View all {resultCount} results <ArrowRight size={16} />
          </Link>
        )}
        {!results.length && (
          <div className="empty-search">
            <p>No pieces match "{query}".</p>
            <button className="text-link" onClick={() => setQuery("")}>
              Clear search
            </button>
          </div>
        )}
        <p className="small muted">All prices in CAD.</p>
      </OverlayPanel>
    </>
  );
}

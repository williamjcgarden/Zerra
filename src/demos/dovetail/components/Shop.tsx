import { useState } from "react";
import { Link, useNavigate } from "@/demos/dovetail/navigation";
import { X } from "lucide-react";
import { CATEGORIES, filterProducts, type Product, type ShopSearch } from "@/demos/dovetail/data/nocturn";
import { ProductCard } from "./ProductCard";
import { ProductDetails } from "./ProductDetails";
import { ProductImage } from "./ProductImage";
import { OverlayPanel } from "./OverlayPanel";
export function Shop({ search }: { search: ShopSearch }) {
  const [active, setActive] = useState<Product | null>(null);
  const navigate = useNavigate();
  const products = filterProducts(search);
  return (
    <section id="shop" className="section shop-section" tabIndex={-1}>
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The studio wardrobe</p>
            <h2>All nine pieces.</h2>
          </div>
          <p className="muted">
            Find a first layer, an outer layer
            <br />
            or the finishing detail.
          </p>
        </div>
        <div className="shop-toolbar">
          <nav className="category-tabs" aria-label="Product categories">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                to="/"
                search={{ ...search, category: category === "All" ? undefined : category }}
                hash="shop"
                resetScroll={false}
                aria-current={(search.category || "All") === category ? "page" : undefined}
              >
                {category}
              </Link>
            ))}
          </nav>
          <label className="sort-control">
            Sort by
            <select
              aria-label="Sort products"
              value={search.sort || "featured"}
              onChange={(event) =>
                void navigate({
                  to: "/",
                  search: {
                    ...search,
                    sort:
                      event.target.value === "featured"
                        ? undefined
                        : (event.target.value as ShopSearch["sort"]),
                  },
                  hash: "shop",
                  resetScroll: false,
                })
              }
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </label>
        </div>
        <div className="results-line">
          <p aria-live="polite">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
            {search.q ? ` matching "${search.q}"` : ""}
          </p>
          <span>Concept collection / Illustrative prices in CAD</span>
          {search.q && (
            <Link to="/" search={{ ...search, q: undefined }} hash="shop" className="text-link">
              Clear search <X size={14} />
            </Link>
          )}
        </div>
        {products.length ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={setActive} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Nothing here just yet.</h3>
            <p>Try another fabric, colour or category.</p>
            <Link to="/" search={{}} hash="shop" className="button">
              View all pieces
            </Link>
          </div>
        )}
        <OverlayPanel
          open={!!active}
          onOpenChange={(open) => {
            if (!open) setActive(null);
          }}
          title={active?.name || "Product details"}
          hideTitle
          className="quick-view-panel"
        >
          {active && (
            <div className="quick-view-grid">
              <div className="quick-view-image">
                <ProductImage product={active} eager sizes="(max-width: 767px) 85vw, 420px" />
              </div>
              <ProductDetails
                key={active.id}
                product={active}
                quick
                onAdd={() => setActive(null)}
              />
            </div>
          )}
        </OverlayPanel>
      </div>
    </section>
  );
}

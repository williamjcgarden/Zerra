import { useParams } from "react-router-dom";
import { Link } from "@/demos/dovetail/navigation";
import { ArrowLeft, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/demos/dovetail/components/Navbar";
import { Footer } from "@/demos/dovetail/components/Footer";
import { ProductDetails } from "@/demos/dovetail/components/ProductDetails";
import { ProductCard } from "@/demos/dovetail/components/ProductCard";
import { ProductImage } from "@/demos/dovetail/components/ProductImage";
import { OverlayPanel } from "@/demos/dovetail/components/OverlayPanel";
import { PRODUCTS } from "@/demos/dovetail/data/nocturn";

function ProductNotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="page-main empty-page" tabIndex={-1}>
        <p className="eyebrow">404 / Piece not found</p>
        <h1>This one's not in the collection.</h1>
        <p>There are nine other good places to start.</p>
        <Link to="/" search={{}} hash="shop" className="button">
          Back to the collection
        </Link>
      </main>
      <Footer />
    </>
  );
}
function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return <ProductNotFound />;
  return <ProductPageContent key={product.id} product={product} />;
}
function ProductPageContent({ product }: { product: (typeof PRODUCTS)[number] }) {
  const [zoom, setZoom] = useState(false);
  const pairings = {
    Tops: ["double-knee", "waxed-chore", "archive-cap"],
    Outerwear: ["fieldwork-tee", "studio-sweatpant", "canvas-tote"],
    Bottoms: ["boxy-crew", "night-shift-parka", "ribbed-sock"],
    Accessories: ["fieldwork-tee", "double-knee", "waxed-chore"],
  };
  const related = pairings[product.category].map((id) => PRODUCTS.find((p) => p.id === id)!);
  return (
    <>
      <Navbar />
      <main id="main-content" className="page-main product-page" tabIndex={-1}>
        <div className="shell">
          <Link
            className="text-link back-link"
            to="/"
            search={{ category: product.category }}
            hash="shop"
          >
            <ArrowLeft size={16} />
            Back to {product.category.toLowerCase()}
          </Link>
          <div className="product-layout">
            <div>
              <button
                className="product-main-image"
                aria-label={`Enlarge ${product.name} image`}
                onClick={() => setZoom(true)}
              >
                <ProductImage product={product} eager sizes="(max-width: 899px) 92vw, 50vw" />
                <span className="zoom-label">
                  <ZoomIn size={18} />
                  <span>View closer</span>
                </span>
              </button>
              <div className="image-caption">
                <span>DOVETAIL / The studio wardrobe</span>
                <span>{product.colorways[0].name}</span>
              </div>
            </div>
            <ProductDetails product={product} />
          </div>
        </div>
        <section className="related-section">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">In good company</p>
                <h2>Wear it with.</h2>
              </div>
              <Link className="text-link" to="/" search={{}} hash="shop">
                View all pieces
              </Link>
            </div>
            <div className="product-grid related-grid">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
        <OverlayPanel
          open={zoom}
          onOpenChange={setZoom}
          title={`${product.name} image`}
          hideTitle
          className="zoom-panel"
        >
          <img
            src={product.image}
            alt={`${product.name} in ${product.colorways[0].name}, enlarged`}
            width={960}
            height={1200}
          />
        </OverlayPanel>
      </main>
      <Footer />
    </>
  );
}

export default ProductPage;

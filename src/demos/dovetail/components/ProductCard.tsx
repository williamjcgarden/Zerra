import { Link } from "@/demos/dovetail/navigation";
import { Plus } from "lucide-react";
import { formatPrice, type Product } from "@/demos/dovetail/data/nocturn";
import { ProductImage } from "./ProductImage";
export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  return (
    <article className="product-card">
      <div className="product-card-media">
        <Link to="/product/$id" params={{ id: product.id }} aria-label={`View ${product.name}`}>
          <ProductImage product={product} />
        </Link>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        {onQuickView && (
          <button
            className="quick-view-button"
            aria-label={`Quick view ${product.name}`}
            title={`Quick view ${product.name}`}
            onClick={() => onQuickView(product)}
          >
            <Plus size={18} />
            <span>Quick view</span>
          </button>
        )}
      </div>
      <div className="product-card-heading">
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3>{product.name}</h3>
        </Link>
        <p>{formatPrice(product.price)}</p>
      </div>
      <p className="product-material">{product.materials}</p>
      <p className="product-colour">
        <span style={{ backgroundColor: product.colorways[0].hex }} />
        {product.colorways[0].name}
      </p>
    </article>
  );
}

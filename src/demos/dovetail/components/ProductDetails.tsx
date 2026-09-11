import { useState } from "react";
import { Link } from "@/demos/dovetail/navigation";
import { ArrowUpRight, Plus } from "lucide-react";
import { formatPrice, type Product } from "@/demos/dovetail/data/nocturn";
import { useCart } from "@/demos/dovetail/lib/cart";

export function ProductDetails({
  product,
  quick = false,
  onAdd,
}: {
  product: Product;
  quick?: boolean;
  onAdd?: () => void;
}) {
  const { addItem, items } = useCart();
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const colour = product.colorways[0];
  const selectedQty =
    items.find(
      (item) => item.productId === product.id && item.size === size && item.color === colour.name,
    )?.qty || 0;
  const atLimit = selectedQty >= 10;
  const Heading = quick ? "h2" : "h1";
  return (
    <div className="product-details">
      <p className="eyebrow">The studio wardrobe / {product.category}</p>
      <Heading className="product-title">{product.name}</Heading>
      <p className="product-price">
        {formatPrice(product.price)} <span>CAD</span>
      </p>
      <p className="product-description">{product.description}</p>
      <div className="colour-line">
        <span className="colour-swatch" style={{ backgroundColor: colour.hex }} />
        <span>{colour.name}</span>
        <span className="muted small">Colour shown</span>
      </div>
      <fieldset className="size-fieldset">
        <legend>
          Size <span className="muted">{size || "Select your fit"}</span>
        </legend>
        <div className="size-options">
          {product.sizes.map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={size === value}
              aria-label={`${value}${product.soldOut.includes(value) ? ", unavailable" : ""}`}
              disabled={product.soldOut.includes(value)}
              onClick={() => setSize(value)}
            >
              {value}
            </button>
          ))}
        </div>
        {product.soldOut.length > 0 && (
          <p className="small muted">
            {product.soldOut.join(", ")} unavailable in this concept collection.
          </p>
        )}
      </fieldset>
      <button
        className="button add-to-bag"
        disabled={!size || atLimit}
        onClick={() => {
          if (!size || atLimit) return;
          onAdd?.();
          addItem(product.id, size, colour.name);
        }}
      >
        {atLimit ? "Bag limit reached" : size ? "Add to bag" : "Select a size"}
        {size && !atLimit && <Plus size={18} />}
      </button>
      <p className="small muted product-demo-note">
        Concept collection. No real orders or payments.
      </p>
      <div className="details-list">
        <details>
          <summary>
            Fit &amp; sizing <Plus size={16} />
          </summary>
          <p>{product.fit}</p>
          <p className="small muted">
            Illustrative fit guidance. These garments are not available for purchase.
          </p>
        </details>
        {!quick && (
          <details>
            <summary>
              Fabric &amp; details <Plus size={16} />
            </summary>
            <ul>
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </details>
        )}
        {!quick && (
          <details>
            <summary>
              Care <Plus size={16} />
            </summary>
            <p>{product.care}</p>
          </details>
        )}
      </div>
      {quick && (
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="text-link product-full-link"
          onClick={onAdd}
        >
          View full details <ArrowUpRight size={16} />
        </Link>
      )}
    </div>
  );
}

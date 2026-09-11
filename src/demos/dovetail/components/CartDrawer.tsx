import { Link } from "@/demos/dovetail/navigation";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/demos/dovetail/lib/cart";
import { MAX_CART_QTY } from "@/demos/dovetail/lib/cart-model";
import { formatPrice } from "@/demos/dovetail/data/nocturn";
import { OverlayPanel } from "./OverlayPanel";
export function CartDrawer() {
  const { items, count, subtotal, open, setOpen, setQty, removeItem } = useCart();
  return (
    <OverlayPanel open={open} onOpenChange={setOpen} title="Your bag" drawer>
      <p className="bag-intro muted" aria-live="polite">
        {count} {count === 1 ? "piece" : "pieces"} in good company.
      </p>
      <div className="bag-body">
        {items.length === 0 ? (
          <div className="empty-state">
            <ShoppingBag size={34} />
            <h3>A little room for something good.</h3>
            <p>Your bag is empty. Start with the pieces you'll reach for most.</p>
            <Link to="/" search={{}} hash="shop" className="button" onClick={() => setOpen(false)}>
              Explore the collection <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <ul className="bag-items">
            {items.map((item) => (
              <li key={`${item.productId}|${item.size}|${item.color}`}>
                <Link
                  to="/product/$id"
                  params={{ id: item.productId }}
                  onClick={() => setOpen(false)}
                  className="bag-item-image"
                >
                  <img
                    src={item.product.imageSmall}
                    alt={`${item.product.name} in ${item.color}`}
                    width={96}
                    height={120}
                  />
                </Link>
                <div className="bag-item-details">
                  <div className="bag-item-heading">
                    <Link
                      to="/product/$id"
                      params={{ id: item.productId }}
                      onClick={() => setOpen(false)}
                    >
                      {item.product.name}
                    </Link>
                    <span>{formatPrice(item.product.price * item.qty)}</span>
                  </div>
                  <p className="small muted">
                    {item.color} / {item.size}
                  </p>
                  <div className="bag-item-controls">
                    <div
                      className="quantity-control"
                      aria-label={`Quantity for ${item.product.name}, ${item.size}`}
                    >
                      <button
                        className="icon-button"
                        aria-label={`Decrease ${item.product.name}, ${item.size} quantity`}
                        title="Decrease quantity"
                        onClick={() => setQty(item.productId, item.size, item.color, item.qty - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span aria-live="polite">{item.qty}</span>
                      <button
                        className="icon-button"
                        disabled={item.qty >= MAX_CART_QTY}
                        aria-label={`Increase ${item.product.name}, ${item.size} quantity`}
                        title={
                          item.qty >= MAX_CART_QTY
                            ? "Maximum quantity reached"
                            : "Increase quantity"
                        }
                        onClick={() => setQty(item.productId, item.size, item.color, item.qty + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      className="icon-button remove-item"
                      aria-label={`Remove ${item.product.name}, ${item.size}`}
                      title="Remove item"
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {items.length > 0 && (
        <div className="bag-footer">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong>
              {formatPrice(subtotal)} <small>CAD</small>
            </strong>
          </div>
          <p className="small muted">A concept collection. No payment will be taken.</p>
          <Link className="button" to="/checkout" onClick={() => setOpen(false)}>
            Preview checkout <ArrowRight size={18} />
          </Link>
          <button className="text-link continue-browsing" onClick={() => setOpen(false)}>
            Continue browsing
          </button>
        </div>
      )}
    </OverlayPanel>
  );
}

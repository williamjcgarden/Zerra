import { Link } from "@/demos/dovetail/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/demos/dovetail/components/Navbar";
import { Footer } from "@/demos/dovetail/components/Footer";
import { useCart } from "@/demos/dovetail/lib/cart";
import { formatPrice } from "@/demos/dovetail/data/nocturn";
import { ZERRA_WORK_URL } from "@/demos/dovetail/lib/zerra";

function Checkout() {
  const { items, subtotal, count, setOpen } = useCart();
  const [complete, setComplete] = useState(false);
  const confirmation = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (complete) confirmation.current?.focus();
  }, [complete]);
  return (
    <>
      <Navbar />
      <main id="main-content" className="page-main checkout-page" tabIndex={-1}>
        <div className="shell">
          <Link className="text-link back-link" to="/" search={{}} hash="shop">
            <ArrowLeft size={16} />
            Back to the collection
          </Link>
          {complete ? (
            <section className="checkout-complete">
              <div className="completion-mark">
                <Check size={28} />
              </div>
              <p className="eyebrow">Preview complete</p>
              <h1 ref={confirmation} tabIndex={-1}>
                That's your rotation.
              </h1>
              <p>
                No order was placed and no payment was taken.
                <br />
                Your pieces are still saved in your bag.
              </p>
              <Link to="/" search={{}} hash="shop" className="button">
                Keep exploring <ArrowRight size={18} />
              </Link>
              <a href={ZERRA_WORK_URL} className="text-link">
                Discover Zerra Studios
              </a>
            </section>
          ) : (
            <>
              <div className="checkout-heading">
                <p className="eyebrow">One last look</p>
                <h1 className="page-title">Your everyday, assembled.</h1>
                <p className="muted">Checkout preview / No payment required</p>
              </div>
              {!items.length ? (
                <div className="empty-state">
                  <h2>Your bag is waiting.</h2>
                  <p>Add a piece from the collection to preview checkout.</p>
                  <Link to="/" search={{}} hash="shop" className="button">
                    Explore the collection
                  </Link>
                </div>
              ) : (
                <div className="checkout-layout">
                  <section className="checkout-explanation">
                    <p className="eyebrow">A note from the studio</p>
                    <h2>
                      A collection to explore.
                      <br />
                      Not an order to place.
                    </h2>
                    <p>
                      DOVETAIL is a fictional clothing concept by Zerra Studios. This is the final
                      step of the shopping preview.
                    </p>
                    <p>
                      We won't ask for an address, an email or payment details. There is no
                      delivery, charge or order confirmation.
                    </p>
                    <Link className="text-link" to="/help" hash="concept">
                      About this concept <ArrowRight size={16} />
                    </Link>
                  </section>
                  <section className="checkout-summary" aria-labelledby="summary-title">
                    <div className="summary-heading">
                      <h2 id="summary-title">
                        Your bag <span>({count})</span>
                      </h2>
                      <button className="text-link" onClick={() => setOpen(true)}>
                        Edit bag
                      </button>
                    </div>
                    <ul>
                      {items.map((item) => (
                        <li key={`${item.productId}-${item.size}-${item.color}`}>
                          <img src={item.product.imageSmall} alt="" width={72} height={90} />
                          <div>
                            <Link to="/product/$id" params={{ id: item.productId }}>
                              {item.product.name}
                            </Link>
                            <p className="small muted">
                              {item.color} / {item.size} / Qty {item.qty}
                            </p>
                          </div>
                          <span>{formatPrice(item.product.price * item.qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="subtotal">
                      <span>Illustrative subtotal</span>
                      <strong>
                        {formatPrice(subtotal)} <small>CAD</small>
                      </strong>
                    </div>
                    <p className="small muted">
                      Shipping and taxes are not calculated. Nothing is charged.
                    </p>
                    <button
                      className="button"
                      onClick={() => {
                        setComplete(true);
                        window.scrollTo({ top: 0, behavior: "instant" });
                      }}
                    >
                      Complete demo checkout <ArrowRight size={18} />
                    </button>
                  </section>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Checkout;

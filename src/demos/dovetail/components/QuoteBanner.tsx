import { Link } from "@/demos/dovetail/navigation";
import { ArrowUpRight } from "lucide-react";
export function QuoteBanner() {
  return (
    <section className="closing-band" data-scroll-scene>
      <img src="/demos/dovetail/media/sky.webp" alt="" width={1920} height={1080} loading="lazy" />
      <div className="closing-copy">
        <p className="eyebrow">Make it your wardrobe</p>
        <h2 data-reveal="0">
          A first piece.
          <br />
          <em>Then your own combination.</em>
        </h2>
        <Link
          className="button button-light sweep-button"
          to="/"
          search={{}}
          hash="shop"
          onClick={(event) => {
            if (
              event.button === 0 &&
              !event.metaKey &&
              !event.ctrlKey &&
              !event.shiftKey &&
              !event.altKey &&
              event.currentTarget.href === window.location.href
            ) {
              // Same-location router navigation does not repeat anchor scrolling.
              event.preventDefault();
              const shop = document.getElementById("shop");
              shop?.focus({ preventScroll: true });
              shop?.scrollIntoView({ block: "start" });
            }
          }}
        >
          <span>Explore all nine pieces</span>
          <span className="button-arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </Link>
      </div>
    </section>
  );
}

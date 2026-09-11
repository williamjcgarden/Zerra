import { Link } from "@/demos/dovetail/navigation";
import { ArrowUpRight } from "lucide-react";
import { COLLECTIONS } from "@/demos/dovetail/data/nocturn";
export function Collections() {
  return (
    <section id="collections" className="section collections-section" data-scroll-scene>
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start with a piece</p>
            <h2 data-reveal="0">Pick your starting point.</h2>
          </div>
          <p className="muted">
            A crew, a parka, a work pant or a cap.
            <br />
            Each has a place in the wardrobe.
          </p>
        </div>
        <div className="collection-grid">
          {COLLECTIONS.map((collection, index) => (
            <Link
              key={collection.category}
              to="/product/$id"
              params={{ id: collection.productId }}
              className="collection-item"
            >
              <div className="collection-image" data-reveal={index}>
                <img
                  src={collection.image}
                  srcSet={`${collection.imageSmall} 480w, ${collection.image} ${collection.imageWidth}w`}
                  sizes="(max-width: 767px) 45vw, 24vw"
                  alt={collection.name}
                  width={960}
                  height={1200}
                  loading="lazy"
                />
                <span className="collection-number">0{index + 1}</span>
                <span className="collection-arrow">
                  <ArrowUpRight size={20} />
                </span>
              </div>
              <div className="collection-caption">
                <div>
                  <h3>{collection.name}</h3>
                  <p>{collection.description}</p>
                </div>
                <span className="small muted">View piece</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

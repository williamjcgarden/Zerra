import { Link } from "@/demos/dovetail/navigation";
import { ArrowUpRight } from "lucide-react";
export function Showcase() {
  return (
    <section className="studio-band" data-scroll-scene>
      <div className="shell studio-layout">
        <div className="studio-composition" data-drop-group>
          <div className="studio-image" data-drop-item>
            <img
              src="/demos/dovetail/media/product-double-knee-960.webp"
              alt="Ochre work pants paired with an apricot crew and blue cap"
              width={960}
              height={1280}
              loading="lazy"
            />
          </div>
          <img
            className="studio-detail studio-detail-cap"
            data-drop-item
            src="/demos/dovetail/media/product-cap-480.webp"
            alt=""
            width={480}
            height={600}
            loading="lazy"
          />
          <img
            className="studio-detail studio-detail-crew"
            data-drop-item
            src="/demos/dovetail/media/product-boxy-crew-480.webp"
            alt=""
            width={480}
            height={600}
            loading="lazy"
          />
        </div>
        <div className="studio-copy">
          <p className="eyebrow">The wardrobe approach</p>
          <h2 data-reveal="0">
            Start with colour.
            <br />
            <em>Build with layers.</em>
          </h2>
          <p>
            Chalk under blue. Apricot beside ochre. Plum over the top. Familiar shapes, with room to
            combine.
          </p>
          <p>
            A boxy crew changes the feel of a straight work pant. A cap picks up the blue in a
            jacket. The interest comes from the pieces together.
          </p>
          <Link to="/story" className="text-link studio-link">
            See the wardrobe idea <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

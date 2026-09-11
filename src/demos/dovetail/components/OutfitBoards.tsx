import { Link } from "@/demos/dovetail/navigation";
import { PRODUCTS } from "@/demos/dovetail/data/nocturn";
const outfits = [
  { title: "Chalk + blue", copy: "A light first layer, a blue jacket and straight ochre trousers.", ids: ["fieldwork-tee", "waxed-chore", "double-knee"] },
  { title: "Apricot + ochre", copy: "Soft colour above a straighter workwear shape.", ids: ["boxy-crew", "double-knee", "ribbed-sock"] },
  { title: "Plum + chalk", copy: "A darker outer layer, lifted by chalk and dusty blue.", ids: ["night-shift-parka", "fieldwork-tee", "archive-cap"] },
];
export function OutfitBoards() {
  return <section className="shell section outfit-section" aria-labelledby="outfit-title">
    <p className="eyebrow">One wardrobe, three starting points</p>
    <h2 id="outfit-title">See what goes together.</h2>
    <div className="outfit-grid">{outfits.map(outfit => <article className="outfit-board" key={outfit.title}>
      <h3>{outfit.title}</h3><p className="muted">{outfit.copy}</p>
      <div className="outfit-pieces">{outfit.ids.map(id => { const product = PRODUCTS.find(p => p.id === id)!;
        return <Link key={id} to="/product/$id" params={{ id }}>
          <img src={product.imageSmall} alt={`${product.name} in ${product.colorways[0].name}`} width={480} height={600} loading="lazy" />
          <span>{product.name}</span>
        </Link>;
      })}</div>
    </article>)}</div>
  </section>;
}

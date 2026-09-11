export type Category = "Tops" | "Outerwear" | "Bottoms" | "Accessories";
export const CATEGORIES = ["All", "Tops", "Outerwear", "Bottoms", "Accessories"] as const;
export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  materials: string;
  description: string;
  details: string[];
  fit: string;
  care: string;
  colorways: [{ name: string; hex: string }, ...{ name: string; hex: string }[]];
  sizes: [string, ...string[]];
  soldOut: string[];
  image: string;
  imageSmall: string;
  imageWidth: number;
  tag?: string;
};
const apparelSizes: [string, ...string[]] = ["XS", "S", "M", "L", "XL", "XXL"];
const cottonCare = "Wash cold with similar colours. Reshape while damp and air dry.";
const media = (name: string) => ({
  image: `/demos/dovetail/media/product-${name}-960.webp`,
  imageSmall: `/demos/dovetail/media/product-${name}-480.webp`,
  imageWidth: 960,
});
export const PRODUCTS: Product[] = [
  {
    id: "fieldwork-tee",
    name: "Fieldwork Tee",
    category: "Tops",
    price: 58,
    materials: "Heavyweight cotton jersey",
    description:
      "A substantial tee with a soft hand and a little room to move. The dropped shoulder and boxy shape make it an easy first layer, all year round.",
    details: [
      "Dense cotton jersey",
      "Ribbed crew neck",
      "Dropped shoulder",
      "Small embroidered studio mark",
    ],
    fit: "Relaxed through the chest with a boxy body. Choose your usual size for an easy fit.",
    care: cottonCare,
    colorways: [{ name: "Chalk", hex: "#e3d2b8" }],
    sizes: apparelSizes,
    soldOut: [],
    tag: "Studio essential",
    ...media("fieldwork-tee"),
  },
  {
    id: "boxy-crew",
    name: "Boxy Crew",
    category: "Tops",
    price: 110,
    materials: "Heavyweight cotton fleece",
    description:
      "A warm, weighty crew with an unhurried silhouette. Ribbed edges hold the shape; the soft apricot colour brings a little light to everyday layers.",
    details: [
      "Dense cotton fleece",
      "Ribbed cuffs and hem",
      "Relaxed shoulder",
      "Embroidered studio mark",
    ],
    fit: "Wide through the body with a gently cropped hem. Choose your usual size, or size up for a longer, roomier fit.",
    care: cottonCare,
    colorways: [{ name: "Apricot", hex: "#dba57d" }],
    sizes: apparelSizes,
    soldOut: [],
    ...media("boxy-crew"),
  },
  {
    id: "waxed-chore",
    name: "Canvas Chore Jacket",
    category: "Outerwear",
    price: 245,
    materials: "Structured cotton canvas",
    description:
      "An everyday layer with workwear roots. A straight cut, useful patch pockets and a dusty blue finish make it just as comfortable over a tee as a heavy crew.",
    details: [
      "Textured cotton canvas",
      "Button front",
      "Three patch pockets",
      "Unlined construction",
    ],
    fit: "Relaxed and straight, with room for a sweatshirt underneath. Choose your usual size.",
    care: "Spot clean where possible. Wash cool on a gentle cycle and air dry.",
    colorways: [{ name: "Dusk Blue", hex: "#687f96" }],
    sizes: apparelSizes,
    soldOut: [],
    ...media("waxed-chore"),
  },
  {
    id: "night-shift-parka",
    name: "Hooded Parka",
    category: "Outerwear",
    price: 320,
    materials: "Lightweight technical shell",
    description:
      "A generous hood, a longer line and a deep plum finish. The parka is the layer you reach for when an afternoon outside turns into an evening.",
    details: [
      "Lightweight shell fabric",
      "Adjustable hood",
      "Covered zip front",
      "Roomy front pockets",
    ],
    fit: "Longline and relaxed, with room to layer. Choose your usual size.",
    care: "Wash cool with a mild detergent. Close fastenings before washing and hang to dry.",
    colorways: [{ name: "Plum", hex: "#654451" }],
    sizes: apparelSizes,
    soldOut: [],
    ...media("night-parka"),
  },
  {
    id: "double-knee",
    name: "Double-Knee Work Pant",
    category: "Bottoms",
    price: 135,
    materials: "Heavyweight cotton twill",
    description:
      "Workwear proportions, softened for every day. A straight leg and reinforced knee bring structure; warm ochre keeps the pairing possibilities open.",
    details: [
      "Structured cotton twill",
      "Reinforced knee panels",
      "Straight leg",
      "Utility pocket detailing",
    ],
    fit: "Mid-rise with an easy straight leg. Choose your usual size for a relaxed fit.",
    care: cottonCare,
    colorways: [{ name: "Ochre", hex: "#bd925b" }],
    sizes: apparelSizes,
    soldOut: [],
    ...media("double-knee"),
  },
  {
    id: "studio-sweatpant",
    name: "Studio Sweatpant",
    category: "Bottoms",
    price: 105,
    materials: "Soft cotton fleece",
    description:
      "Off-duty, without the afterthought. A soft elastic waist and gently tapered leg keep this pair comfortable from a slow morning to a late studio session.",
    details: ["Soft cotton fleece", "Elasticated waistband", "Tapered leg", "Ribbed ankle cuffs"],
    fit: "Relaxed through the seat and thigh, tapered at the ankle. Choose your usual size.",
    care: cottonCare,
    colorways: [{ name: "Mist", hex: "#b7b2bd" }],
    sizes: apparelSizes,
    soldOut: [],
    ...media("sweatpant"),
  },
  {
    id: "archive-cap",
    name: "Six-Panel Cap",
    category: "Accessories",
    price: 45,
    materials: "Washed cotton twill",
    description:
      "The finishing touch, kept simple. A soft six-panel crown, a curved brim and a plum wordmark on washed blue. An easy addition to the whole rotation.",
    details: [
      "Washed cotton twill",
      "Soft six-panel crown",
      "Adjustable back fastening",
      "Contrasting DOVETAIL embroidery",
    ],
    fit: "One size, adjustable at the back.",
    care: "Spot clean with a damp cloth. Air dry away from direct heat.",
    colorways: [{ name: "Sky", hex: "#91a8b6" }],
    sizes: ["One Size"],
    soldOut: [],
    ...media("cap"),
  },
  {
    id: "ribbed-sock",
    name: "Ribbed Crew Socks",
    category: "Accessories",
    price: 28,
    materials: "Ribbed cotton blend",
    description:
      "A soft rib, a comfortable cuff and a warm off-white finish. An everyday pair to wear with boots, trainers and everything in between.",
    details: ["Cotton-blend knit", "Ribbed crew height", "Soft stretch cuff", "One pair"],
    fit: "A stretchy everyday fit. S, M and L are illustrative size options for this concept collection.",
    care: cottonCare,
    colorways: [{ name: "Ecru", hex: "#dfd7c4" }],
    sizes: ["S", "M", "L"],
    soldOut: [],
    ...media("socks"),
  },
  {
    id: "canvas-tote",
    name: "Canvas Tote",
    category: "Accessories",
    price: 40,
    materials: "Natural cotton canvas",
    description:
      "A useful shape, a generous handle and nothing to fuss over. Natural canvas carries the studio mark, with room for the everyday things you take along.",
    details: [
      "Natural cotton canvas",
      "Long shoulder handles",
      "Flat-fold construction",
      "Small sewn studio label",
    ],
    fit: "One size. An unstructured everyday shoulder bag.",
    care: "Spot clean and air dry.",
    colorways: [{ name: "Natural", hex: "#cfb895" }],
    sizes: ["One Size"],
    soldOut: [],
    ...media("tote"),
  },
];
export const COLLECTIONS: {
  productId: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  imageSmall: string;
  imageWidth: number;
}[] = [
  {
    productId: "boxy-crew",
    name: "Boxy Crew",
    category: "Tops",
    description: "Apricot / relaxed shape",
    image: "/demos/dovetail/media/product-boxy-crew-960.webp",
    imageSmall: "/demos/dovetail/media/product-boxy-crew-480.webp",
    imageWidth: 960,
  },
  {
    productId: "night-shift-parka",
    name: "Hooded Parka",
    category: "Outerwear",
    description: "Plum / a longer layer",
    image: "/demos/dovetail/media/product-night-parka-960.webp",
    imageSmall: "/demos/dovetail/media/product-night-parka-480.webp",
    imageWidth: 960,
  },
  {
    productId: "double-knee",
    name: "Double-Knee Work Pant",
    category: "Bottoms",
    description: "Ochre / straight leg",
    image: "/demos/dovetail/media/product-double-knee-960.webp",
    imageSmall: "/demos/dovetail/media/product-double-knee-480.webp",
    imageWidth: 960,
  },
  {
    productId: "archive-cap",
    name: "Six-Panel Cap",
    category: "Accessories",
    description: "Dusty blue / adjustable",
    image: "/demos/dovetail/media/product-cap-960.webp",
    imageSmall: "/demos/dovetail/media/product-cap-480.webp",
    imageWidth: 960,
  },
];
const money = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});
export const formatPrice = (amount: number) => money.format(amount);
export type ShopSearch = {
  category?: Category | undefined;
  q?: string | undefined;
  sort?: "price-low" | "price-high" | undefined;
};
export function validateShopSearch(search: Record<string, unknown>): ShopSearch {
  return {
    category: CATEGORIES.slice(1).includes(search["category"] as Category)
      ? (search["category"] as Category)
      : undefined,
    q: typeof search["q"] === "string" ? search["q"].trim().slice(0, 100) || undefined : undefined,
    sort:
      search["sort"] === "price-low" || search["sort"] === "price-high"
        ? search["sort"]
        : undefined,
  };
}
export function filterProducts({ category, q, sort }: ShopSearch) {
  const query = q?.trim().toLocaleLowerCase() || "";
  const results = PRODUCTS.filter(
    (p) =>
      (!category || p.category === category) &&
      `${p.name} ${p.materials} ${p.category} ${p.colorways[0].name}`
        .toLocaleLowerCase()
        .includes(query),
  );
  if (sort) results.sort((a, b) => (sort === "price-low" ? a.price - b.price : b.price - a.price));
  return results;
}

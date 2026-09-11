// @vitest-environment node
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { DOVETAIL_PRODUCT_IDS, PRERENDER_PATHS } from "@/routes";
import { PRODUCTS } from "@/demos/dovetail/data/nocturn";
import { destination } from "@/demos/dovetail/navigation";
import { render } from "@/entry-server";

describe("Dovetail integration", () => {
  it("prerenders every product and retains the three existing demos", () => {
    expect(DOVETAIL_PRODUCT_IDS).toEqual(PRODUCTS.map((product) => product.id));
    for (const product of PRODUCTS) expect(PRERENDER_PATHS).toContain(`/our-work/dovetail-demo/product/${product.id}`);
    for (const demo of ["barbershop", "landscaping", "tech"]) expect(PRERENDER_PATHS).toContain(`/our-work/${demo}-demo`);
  });
  it("keeps filters and escaped product identifiers inside the demo", () => {
    expect(destination({ to: "/", search: { q: "chalk & blue", category: "Tops" }, hash: "shop" })).toBe("/our-work/dovetail-demo?q=chalk+%26+blue&category=Tops#shop");
    expect(destination({ to: "/product/$id", params: { id: "a/b" } })).toBe("/our-work/dovetail-demo/product/a%2Fb");
  });
  it("keeps Zerra links inside the integrated local experience", () => {
    for (const file of ["src/demos/dovetail/pages/help.tsx", "src/demos/dovetail/pages/checkout.tsx"]) {
      expect(readFileSync(file, "utf8")).not.toContain("https://zerrastudios.com/");
    }
  });
  it("renders a product and branded recovery without a browser", async () => {
    const product = await render("/our-work/dovetail-demo/product/boxy-crew");
    expect(product.appHtml).toContain("Boxy Crew");
    expect(product.headHtml).toContain("noindex");

    const missing = await render("/our-work/dovetail-demo/product/missing");
    expect(missing.appHtml).toContain("Piece not found");
    expect(missing.appHtml).toContain("/our-work/dovetail-demo#shop");
  });
});

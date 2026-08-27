import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { PRERENDER_PATHS, SECTION_ROUTE_IDS } from "@/routes";

describe("static route manifest", () => {
  it("contains unique routes", () => {
    expect(new Set(PRERENDER_PATHS).size).toBe(PRERENDER_PATHS.length);
    expect(PRERENDER_PATHS).toContain("/");
    expect(PRERENDER_PATHS).not.toContain("/demo-sites/rapidplumbing/contact");
  });

  it("maps clean section URLs to homepage section IDs", () => {
    expect(SECTION_ROUTE_IDS).toEqual({
      "/services": "services",
      "/why-zerra": "why-zerra",
      "/process": "process",
      "/our-work": "our-work",
    });

    for (const path of Object.keys(SECTION_ROUTE_IDS)) {
      expect(PRERENDER_PATHS).toContain(path);
    }
  });

  it("keeps the retired Rapid preview out of routes and the sitemap", () => {
    const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
    expect(PRERENDER_PATHS.some((path) => path.includes("rapidplumbing"))).toBe(false);
    expect(sitemap).not.toContain("rapidplumbing");
  });
});

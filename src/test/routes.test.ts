import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { PRERENDER_PATHS, RAPID_PREVIEW_PATHS } from "@/routes";

describe("static route manifest", () => {
  it("contains unique routes", () => {
    expect(new Set(PRERENDER_PATHS).size).toBe(PRERENDER_PATHS.length);
    expect(PRERENDER_PATHS).toContain("/");
    expect(PRERENDER_PATHS).toContain("/demo-sites/rapidplumbing/contact");
  });

  it("keeps private preview routes out of the sitemap", () => {
    const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
    for (const path of RAPID_PREVIEW_PATHS) expect(sitemap).not.toContain(path);
  });
});

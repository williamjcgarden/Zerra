// @vitest-environment node
import { describe, expect, it } from "vitest";
import { render } from "@/entry-server";

describe("static renderer", () => {
  it("renders meaningful homepage HTML and metadata", async () => {
    const page = await render("/");
    expect(page.appHtml).toContain("Websites that");
    expect(page.appHtml).toContain("Our Work");
    expect(page.headHtml).toContain("https://zerrastudios.com/");
  });

  it("renders preview robots metadata", async () => {
    const page = await render("/demo-sites/rapidplumbing/services");
    expect(page.appHtml).toContain("Rapid Plumbing");
    expect(page.headHtml).toContain("noindex, nofollow, noarchive");
  });
});

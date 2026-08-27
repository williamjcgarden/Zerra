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

  it("renders the homepage at clean section URLs", async () => {
    const page = await render("/our-work");
    expect(page.appHtml).toContain('id="our-work"');
    expect(page.appHtml).toContain("Websites tailored to");
  });

  it("renders a not-found page for the retired Rapid preview", async () => {
    const page = await render("/demo-sites/rapidplumbing/services");
    expect(page.appHtml).toContain("Page not found");
    expect(page.appHtml).not.toContain("Rapid Plumbing");
    expect(page.headHtml).toContain("noindex");
  });
});

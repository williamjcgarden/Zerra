import { describe, expect, it } from "vitest";
import { createDocument } from "@/ssg/document";

describe("static document composition", () => {
  it("injects head and body markup", () => {
    const template = '<html><head><!--app-head--></head><body><div id="root"><!--app-html--></div></body></html>';
    const result = createDocument(template, "<main>Rendered</main>", "<title>SEO</title>");
    expect(result).toContain("<title>SEO</title>");
    expect(result).toContain('<div id="root"><main>Rendered</main></div>');
  });

  it("rejects an invalid template", () => {
    expect(() => createDocument("<html />", "body", "head")).toThrow("markers are missing");
  });
});

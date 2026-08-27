import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(resolve(path), "utf8");

describe("security and privacy compliance", () => {
  it("labels every fictional public concept demo in its footer", () => {
    const disclaimer = "This is a concept demo. Testimonials, businesses, statistics, and claims are fictional.";

    expect(read("src/pages/demos/LandscapingDemo.tsx")).toContain(disclaimer);
    expect(read("src/pages/demos/TechDemo.tsx")).toContain(disclaimer);
    expect(read("src/demos/barbershop/components/Footer.tsx")).toContain(disclaimer);
  });

  it("accurately identifies collected fields and service providers", () => {
    const policy = read("src/pages/PrivacyPolicy.tsx");

    for (const expected of [
      "business name",
      "project budget",
      "Formspree",
      "Calendly",
      "Cloudflare",
      "Google Fonts",
      "Amazon CloudFront",
    ]) {
      expect(policy).toContain(expected);
    }

    expect(policy).not.toContain("Usage data via analytics");
    expect(policy).not.toContain("We use essential and analytics cookies");
  });

  it("places a privacy notice at the point of form submission", () => {
    const contactPanel = read("src/components/ContactPanel.tsx");

    expect(contactPanel).toContain('href="/privacy-policy"');
    expect(contactPanel).toMatch(
      /By submitting, you consent to Zerra Studios and Formspree using these details to\s+respond\./,
    );
  });

  it("defines a restrictive content security policy", () => {
    const headers = read("public/_headers");

    expect(headers).toContain("Content-Security-Policy:");
    expect(headers).toContain("default-src 'self'");
    expect(headers).toContain("object-src 'none'");
    expect(headers).toContain("frame-ancestors 'self'");
    expect(headers).toContain("form-action 'self' https://formspree.io");
    expect(headers).toContain("frame-src https://calendly.com https://*.calendly.com");
  });
});

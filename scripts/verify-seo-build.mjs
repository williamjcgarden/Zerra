import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(path, "utf8");
const home = await read("dist/index.html");
const missing = await read("dist/404.html");
const headers = await read("dist/_headers");
const sitemap = await read("dist/sitemap.xml");
const wrangler = await read("wrangler.jsonc");

assert.match(home, /Websites that/);
assert.match(home, /Our Work/);
assert.match(home, /https:\/\/zerrastudios\.com\//);
assert.doesNotMatch(home, /name="keywords"/);
assert.match(missing, /Page not found/i);
assert.match(missing, /noindex/);
assert.match(headers, /Strict-Transport-Security:/);
assert.doesNotMatch(headers, /rapidplumbing/);
assert.doesNotMatch(sitemap, /demo-sites\/rapidplumbing/);
assert.match(wrangler, /"not_found_handling": "404-page"/);
assert.match(wrangler, /"html_handling": "auto-trailing-slash"/);

for (const file of [
  "dist/privacy-policy.html",
  "dist/terms-of-service.html",
  "dist/our-work/barbershop-demo.html",
]) assert.match(await read(file), /<div id="root">/);

for (const route of [
  "tech-demo", "tech-demo/get-started",
  "landscaping-demo", "landscaping-demo/services", "landscaping-demo/get-a-quote",
]) {
  const html = await read(`dist/our-work/${route}.html`);
  assert.match(html, /noindex/, `${route} must remain a concept, outside search results`);
  assert.match(html, /Fictional/i, `${route} must disclose the fictional concept in the rendered HTML`);
  assert.match(html, /<h1[\s>]/, `${route} must contain prerendered page content`);
}

const royalCuts = await read("dist/demos/royal-cuts/index.html");
assert.match(royalCuts, /noindex/);
assert.match(royalCuts, /\/demos\/royal-cuts\/assets\//);

console.log("SEO build and demo deep-route contracts verified.");

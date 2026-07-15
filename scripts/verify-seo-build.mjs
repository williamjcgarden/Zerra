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
assert.match(headers, /X-Robots-Tag: noindex, nofollow, noarchive/);
assert.doesNotMatch(sitemap, /demo-sites\/rapidplumbing/);
assert.match(wrangler, /"not_found_handling": "404-page"/);
assert.match(wrangler, /"html_handling": "auto-trailing-slash"/);

for (const file of [
  "dist/privacy-policy.html",
  "dist/terms-of-service.html",
  "dist/our-work/barbershop-demo.html",
  "dist/demo-sites/rapidplumbing/services.html",
  "dist/demo-sites/rapidplumbing/contact.html",
]) assert.match(await read(file), /<div id="root">/);

console.log("Phase 1 SEO build contract verified.");

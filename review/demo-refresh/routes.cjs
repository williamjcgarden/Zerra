const assert = require('node:assert/strict');
const base = process.env.BASE_URL || 'http://127.0.0.1:8090';
(async () => {
  for (const [path, status, text] of [
    ['/our-work/tech-demo', 200, 'tech-mobile-hero'],
    ['/our-work/tech-demo/get-started?plan=growth', 200, 'Get Started'],
    ['/our-work/tech-demo/get-started?preview=1', 200, 'Get Started'],
    ['/our-work/landscaping-demo', 200, 'Transform Your'],
    ['/our-work/landscaping-demo/services', 200, 'Lawn'],
    ['/our-work/landscaping-demo/get-a-quote?service=hardscaping', 200, 'Quote'],
    ['/our-work/tech-demo/missing-page', 404, 'StartUp'],
    ['/our-work/landscaping-demo/missing-page', 404, 'Verdant'],
    ['/our-work/dovetail-demo/missing-page', 404, 'DOVETAIL'],
    ['/demos/royal-cuts/', 200, 'Royal Cuts'],
  ]) {
    const response = await fetch(base + path);
    assert.equal(response.status, status, path);
    const html = await response.text();
    assert.ok(html.includes(text), `${path} must contain its own prerendered content`);
    assert.match(html, /noindex/, `${path} must remain outside search results`);
    console.log(`${status} ${path}`);
  }
})().catch(e => { console.error(e); process.exitCode = 1; });

// Run against a built local or live release. Uses the Royal Cuts review toolchain.
const { chromium, expect } = require('../royal-cuts-rebuild/node_modules/@playwright/test');
const AxeBuilder = require('../royal-cuts-rebuild/node_modules/@axe-core/playwright').default;
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.BASE_URL || 'http://127.0.0.1:8090';
const out = process.env.EVIDENCE_DIR || 'output/demo-refresh-2026-09-16/browser';
const routes = {
  startup: ['', '/get-started'],
  verdant: ['', '/services', '/get-a-quote'],
};
const prefixes = { startup: '/our-work/tech-demo', verdant: '/our-work/landscaping-demo' };
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 1000 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      for (const [brand, paths] of Object.entries(routes)) for (const route of paths) {
        const errors = [];
        const onError = error => errors.push(error.message);
        page.on('pageerror', onError);
        const response = await page.goto(base + prefixes[brand] + route);
        await page.locator('h1').waitFor();
        await page.evaluate(() => document.fonts.ready);
        for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += 650) {
          await page.evaluate(value => scrollTo(0, value), y);
          await page.waitForTimeout(55);
        }
        await page.waitForTimeout(150);
        const layout = await page.evaluate(() => ({
          width: innerWidth, contentWidth: document.documentElement.scrollWidth,
          badImages: [...document.images].filter(i => i.getClientRects().length && (!i.complete || !i.naturalWidth)).map(i => i.src),
          emptyLinks: [...document.querySelectorAll('a')].filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#').map(a => a.textContent),
          missingTargets: [...document.querySelectorAll('a[href^="#"]')].filter(a => a.hash.length > 1 && !document.getElementById(decodeURIComponent(a.hash.slice(1)))).map(a => a.hash),
        }));
        const axe = width === 320 ? { violations: [] } : await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        const item = { brand, route, width, status: response.status(), errors, ...layout, violations: axe.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })) };
        results.push(item);
        await page.evaluate(() => scrollTo(0, 0));
        if (width !== 320) {
          const name = `${brand}${route.replaceAll('/', '-') || '-home'}-${width}`;
          await page.screenshot({ path: path.join(out, name + '.png'), fullPage: !route });
          if (!route) await page.screenshot({ path: path.join(out, name + '-hero.png') });
        }
        page.off('pageerror', onError);
        console.log(`${brand}${route || '/'} ${width}px: HTTP ${item.status}; overflow ${item.contentWidth > width}; errors ${errors.length}; axe ${item.violations.length}`);
      }
      await context.close();
    }
    fs.writeFileSync(path.join(out, 'audit.json'), JSON.stringify(results, null, 2));
    const failures = results.filter(r => r.status !== 200 || r.contentWidth > r.width || r.errors.length || r.badImages.length || r.emptyLinks.length || r.missingTargets.length || r.violations.some(v => !(r.brand === 'verdant' && r.route === '' && v.id === 'color-contrast')));
    // Original Verdant homepage palette is deliberately preserved at the owner's request.
    // Its pre-existing contrast findings remain in audit.json; new routes must pass all rules.
    expect(failures, 'Layout, asset, route, runtime, link and accessibility findings').toEqual([]);
  } finally {
    fs.writeFileSync(path.join(out, 'audit.json'), JSON.stringify(results, null, 2));
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });

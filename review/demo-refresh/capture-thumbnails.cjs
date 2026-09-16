const { chromium } = require('../royal-cuts-rebuild/node_modules/playwright');
const sharp = require('sharp');
const path = require('node:path');
const base = process.env.BASE_URL || 'http://127.0.0.1:8090';
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1920, height: 900 }, deviceScaleFactor: 1 });
    for (const [name, route] of [
      ['barbershop', '/demos/royal-cuts/'],
      ['tech', '/our-work/tech-demo'],
      ['landscaping', '/our-work/landscaping-demo'],
    ]) {
      if (process.argv.length > 2 && !process.argv.slice(2).includes(name)) continue;
      await page.goto(base + route);
      await page.locator('h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      if (name === 'barbershop') {
        await page.locator('.pole-stage.is-ready canvas').waitFor();
        await page.locator('.hero:not(.hero-intro)').waitFor();
      }
      await page.waitForTimeout(4500);
      // Capture browser content, excluding scrollbar UI; do not change site styles.
      await page.addStyleTag({ content: 'html,body{scrollbar-width:none!important}::-webkit-scrollbar{display:none!important}' });
      const capture = await page.screenshot();
      await sharp(capture).resize(1024, 480).webp({ quality: 90 }).toFile(path.resolve(`src/assets/work-previews/${name}.webp`));
      console.log(`Captured ${name}: 1024 × 480`);
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

const { chromium, expect } = require('../royal-cuts-rebuild/node_modules/@playwright/test');
const fs = require('node:fs');
const base = process.env.BASE_URL || 'http://127.0.0.1:8090';
const out = process.env.EVIDENCE_DIR || 'output/demo-refresh-2026-09-16/regression';
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: process.env.HEADLESS === '1' });
  const results = [];
  try {
    for (const width of [1440, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 950 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      await page.goto(base + '/our-work/dovetail-demo/product/fieldwork-tee');
      await page.getByRole('button', { name: 'M', exact: true }).click();
      await page.getByRole('button', { name: 'Add to bag', exact: true }).click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await dialog.getByRole('button', { name: /Increase .* quantity/ }).click();
      await dialog.getByRole('link', { name: /Preview checkout/ }).click();
      await expect(page).toHaveURL(/\/checkout\/?$/);
      await expect(page.getByText(/Qty 2/)).toBeVisible();
      await page.getByRole('button', { name: /Complete demo checkout/ }).click();
      await expect(page.getByRole('heading', { name: "That's your rotation." })).toBeVisible();
      await expect(page.getByText(/No order was placed and no payment was taken/)).toBeVisible();
      await page.screenshot({ path: `${out}/dovetail-checkout-${width}.png` });
      await page.goto(base + '/our-work');
      const cards = page.locator('#our-work a');
      await expect(cards).toHaveCount(4);
      const expected = ['/our-work/dovetail-demo', '/demos/royal-cuts/', '/our-work/landscaping-demo', '/our-work/tech-demo'];
      for (let i = 0; i < 4; i++) {
        const card = cards.nth(i);
        await card.scrollIntoViewIfNeeded();
        await expect(card).toHaveAttribute('href', expected[i]);
        await expect(card.locator('img')).toBeVisible();
        expect(await card.locator('img').evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true);
        if (width === 1440) {
          await page.waitForTimeout(700);
          await card.hover();
          await expect.poll(() => card.locator('div.absolute').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
        }
      }
      await page.locator('#our-work').screenshot({ path: `${out}/showcase-${width}.png` });
      await cards.nth(1).click();
      await expect(page.locator('.hero')).toBeVisible();
      await expect(page).toHaveURL(/\/demos\/royal-cuts\//);
      await page.locator('.hero').getByRole('button', { name: 'Book an appointment', exact: true }).click();
      await expect(page.getByRole('dialog', { name: 'Choose your service' })).toBeVisible();
      await page.keyboard.press('Escape');
      await page.getByRole('link', { name: /Back to Zerra/ }).first().click();
      await expect(page).toHaveURL(/\/our-work\/?$/);
      await expect(page.locator('#our-work')).toBeVisible();
      await page.goto(base + '/our-work/barbershop-demo?preview=1#cuts');
      await expect(page).toHaveURL(/\/demos\/royal-cuts\/\?preview=1#cuts$/);
      expect(errors).toEqual([]);
      results.push({ width, dovetailCheckout: true, showcaseHover: width === 1440, royalBooking: true, legacyRedirect: true, errors });
      await context.close();
    }
    fs.writeFileSync(`${out}/regression.json`, JSON.stringify(results, null, 2));
    console.log('Dovetail checkout, showcase links/hover, Royal booking and legacy redirect passed at 1440px and 390px.');
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

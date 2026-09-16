const { chromium, expect } = require('../royal-cuts-rebuild/node_modules/@playwright/test');
const AxeBuilder = require('../royal-cuts-rebuild/node_modules/@axe-core/playwright').default;
const fs = require('node:fs');
const base = process.env.BASE_URL || 'http://127.0.0.1:8090';
const out = process.env.EVIDENCE_DIR || 'output/demo-refresh-2026-09-16/journeys';
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const results = [];
  try {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 950 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      const posts = []; const errors = [];
      page.on('request', r => { if (r.method() !== 'GET' && r.method() !== 'HEAD') posts.push(`${r.method()} ${r.url()}`); });
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(base + '/our-work/landscaping-demo/services');
      await page.locator('a[href$="get-a-quote?service=hardscaping"]').first().click();
      await expect(page.getByRole('radio', { name: /Hardscaping/ })).toBeChecked();
      await page.getByRole('button', { name: /Continue to project details/ }).click();
      await page.getByRole('button', { name: /Preview project brief/ }).click();
      await expect(page.getByRole('heading', { name: 'Tell us about your space.' })).toBeVisible();
      await page.getByRole('combobox', { name: /Property type/ }).selectOption('Shared residential space');
      await page.getByRole('combobox', { name: /Area to focus on/ }).selectOption('Patio or courtyard');
      await page.getByRole('combobox', { name: /Preferred timeframe/ }).selectOption('Within the next few months');
      await page.getByLabel('What would you like to change?', { exact: true }).fill('A sheltered seating area with room for outdoor dinners and layered planting.');
      await page.getByRole('button', { name: 'Back', exact: true }).click();
      await expect(page.getByRole('radio', { name: /Hardscaping/ })).toBeChecked();
      await page.getByRole('button', { name: /Continue to project details/ }).click();
      await expect(page.getByRole('combobox', { name: /Area to focus on/ })).toHaveValue('Patio or courtyard');
      await page.getByRole('button', { name: /Preview project brief/ }).click();
      await expect(page.getByRole('heading', { name: 'Your project brief.', exact: true })).toBeFocused();
      await expect(page.locator('.landscaping-brief')).toContainText('Hardscaping');
      await expect(page.locator('.landscaping-brief')).toContainText('Patio or courtyard');
      await expect(page.getByText('Preview only. Nothing has been sent or booked.', { exact: true })).toHaveText(/Nothing has been sent or booked/);
      await page.screenshot({ path: `${out}/verdant-preview-${width}.png`, fullPage: true });
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      await page.getByRole('button', { name: /Edit brief/ }).click();
      await expect(page.getByLabel('What would you like to change?', { exact: true })).toHaveValue(/sheltered seating/);
      await page.getByRole('button', { name: /Preview project brief/ }).click();
      await page.getByRole('button', { name: 'Start a new brief', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'What can we help you plan?', exact: true })).toBeVisible();
      if (width < 768) {
        await page.getByRole('button', { name: 'Open menu', exact: true }).click();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toBeFocused();
        await page.getByRole('button', { name: 'Open menu', exact: true }).click();
        await page.getByRole('navigation', { name: 'Verdant mobile navigation', exact: true }).getByRole('link', { name: 'Services', exact: true }).click();
        await expect(page).toHaveURL(/landscaping-demo\/?#services$/);
        await expect(page.getByRole('button', { name: 'Open menu', exact: true })).toHaveAttribute('aria-expanded', 'false');
      }
      results.push({ width, posts, errors, violations: axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })) });
      expect(posts).toEqual([]); expect(errors).toEqual([]); expect(axe.violations).toEqual([]);
      await context.close();
    }
    console.log('Verdant service preselection, validation, quote details/back/edit/restart, mobile navigation passed at 1440/390/320.');
  } finally { fs.writeFileSync(`${out}/verdant-journey.json`, JSON.stringify(results, null, 2)); await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

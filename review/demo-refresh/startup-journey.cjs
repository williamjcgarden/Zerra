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
      const posts = []; const errors = [];
      page.on('request', r => { if (!['GET', 'HEAD'].includes(r.method())) posts.push(`${r.method()} ${r.url()}`); });
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(base + '/our-work/tech-demo');
      await page.locator('a[href$="get-started?plan=growth"]').click();
      const plan = page.getByRole('combobox', { name: /Illustrative plan/ });
      await expect(plan).toHaveValue('Growth');
      await page.reload(); await expect(plan).toHaveValue('Growth');
      await page.getByRole('combobox', { name: /^Workflow/ }).selectOption('Client project');
      await page.getByRole('combobox', { name: /^Team size/ }).selectOption('6–10 people');
      await page.getByRole('textbox', { name: /Workspace name/ }).fill('Studio North');
      await page.getByRole('button', { name: /Preview workspace/ }).click();
      await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
      await expect(page.getByRole('heading', { name: 'Studio North', exact: true })).toBeVisible();
      const task = page.getByRole('checkbox', { name: 'Confirm the project brief', exact: true });
      await task.focus(); await page.keyboard.press('Space');
      await expect(task).toBeChecked(); await expect(task).toBeFocused();
      await expect(page.getByRole('status')).toHaveText(/1 of 3 sample tasks complete/);
      const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      await page.screenshot({ path: `${out}/startup-preview-${width}.png`, fullPage: true });
      await page.getByRole('button', { name: 'Edit workspace', exact: true }).click();
      await expect(page.getByRole('textbox', { name: /Workspace name/ })).toHaveValue('Studio North');
      await page.getByRole('textbox', { name: /Workspace name/ }).fill('W'.repeat(40));
      await page.getByRole('button', { name: /Preview workspace/ }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.getByRole('button', { name: 'Start again', exact: true }).click();
      await expect(page.getByRole('textbox', { name: /Workspace name/ })).toHaveValue('');
      await page.goto(base + '/our-work/tech-demo/get-started?preview=1');
      await expect(page.getByRole('checkbox')).toHaveCount(3);
      await page.reload(); await expect(page.getByRole('checkbox')).toHaveCount(3);
      await page.getByRole('link', { name: '← Back to StartUp', exact: true }).click();
      await expect(page.locator('#top')).toBeVisible();
      await expect(page.locator('#top h1')).toHaveText(/Ship\s+faster.*Scale\s+smarter/s);
      results.push({ width, posts, errors, violations: axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })) });
      expect(posts).toEqual([]); expect(errors).toEqual([]); expect(axe.violations).toEqual([]);
      await context.close();
    }
    console.log('Original StartUp design retained; plan/query reload, setup, keyboard checklist, edit/restart and long names pass at 1440/390/320.');
  } finally { fs.writeFileSync(`${out}/startup-journey.json`, JSON.stringify(results, null, 2)); await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });

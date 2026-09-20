import {test,expect} from '@playwright/test';

for(const width of [320,390]) test(`mobile header clears the viewport and returns the concept banner at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:844});
 await page.goto(process.env.DEMO_PATH||'/');
 await expect(page.locator('.mobile-book-bar')).toHaveCount(0);
 await page.evaluate(()=>scrollTo({top:900,behavior:'instant'}));
 await expect(page.locator('.site-chrome')).toHaveClass(/is-condensed/);
 await expect(page.locator('.royal-concept-bar')).not.toBeVisible();
 await expect.poll(async()=>Math.round((await page.locator('.site-header').boundingBox())!.y)).toBe(0);
 await expect(page.locator('.header-book')).toBeInViewport();
 expect(await page.locator('.header-book').evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
 await page.evaluate(()=>scrollTo({top:750,behavior:'instant'}));
 await expect(page.locator('.site-chrome')).not.toHaveClass(/is-condensed/);
 await expect(page.locator('.royal-concept-bar')).toBeInViewport();
 await expect.poll(async()=>Math.round((await page.locator('.site-header').boundingBox())!.y)).toBe(44);
 await page.locator('.header-book').click();
 await expect(page.getByRole('dialog',{name:'Choose your service'})).toBeVisible();
 await page.keyboard.press('Escape');
 await page.setViewportSize({width:1440,height:1000});
 await expect(page.locator('.site-chrome')).not.toHaveClass(/is-condensed/);
 await expect(page.locator('.zerra-return')).toHaveAttribute('tabindex','0');
});

test('section subtitles and haircut names remain without decorative counters',async({page})=>{
 await page.goto(process.env.DEMO_PATH||'/');
 await expect(page.locator('.cuts-progress,.look-number')).toHaveCount(0);
 const subtitles=await page.locator('.eyebrow').allTextContents();
 expect(subtitles).toContain('THE SERVICE MENU');
 expect(subtitles).toContain('FIND YOUR NEXT LOOK');
 expect(subtitles.some(text=>/^0\d\s*\//.test(text))).toBe(false);
 await page.locator('#cuts').scrollIntoViewIfNeeded();
 const pause=page.getByRole('button',{name:'Pause cuts carousel',exact:true});
 await expect(pause).toHaveCSS('border-top-width','0px');
 expect((await pause.boundingBox())!.height).toBeGreaterThanOrEqual(44);
 await pause.click();
 await expect(page.getByRole('button',{name:'Play cuts carousel',exact:true})).toBeVisible();
});

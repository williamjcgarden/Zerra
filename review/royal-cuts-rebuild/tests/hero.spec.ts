import { test, expect } from '@playwright/test';

for (const width of [390, 768, 1440]) test(`hero CTA and automatic carousel work at ${width}px`, async ({ page }) => {
 await page.setViewportSize({width,height:1000});
 await page.clock.install();
 await page.goto(process.env.DEMO_PATH||'/');await page.waitForLoadState('networkidle');
 const carousel=page.getByRole('region',{name:'Featured haircuts'});
 await expect(carousel.getByRole('button')).toHaveCount(0);
 const names=['The textured taper','Curly taper fade','Bro flow','Textured crop','Classic side part'];
 for(let i=0;i<5;i++){
  await expect(carousel.getByRole('group')).toHaveAttribute('aria-label',`${i+1} of 5: ${names[i]}`);
  await expect(carousel.locator('.carousel-count')).toHaveText(`0${i+1} / 05`);
  await page.clock.fastForward(2500);
 }
 await expect(carousel.locator('.carousel-count')).toHaveText('01 / 05');
 const cta=page.locator('.hero').getByRole('button',{name:'Book an appointment',exact:true});
 const bounds=await cta.boundingBox();expect(bounds!.height).toBeGreaterThanOrEqual(62);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.getByRole('button',{name:'Pause motion',exact:true}).click();
 await page.locator('.hero').screenshot({path:`evidence/hero-auto-${width}.png`});
 await cta.click();await expect(page.getByRole('dialog',{name:'Choose your service'})).toBeVisible();
});

test('automatic carousel respects global pause, booking and reduced motion',async({page})=>{
 await page.clock.install();await page.goto(process.env.DEMO_PATH||'/');await page.waitForLoadState('networkidle');
 const count=page.locator('.carousel-count');
 await page.clock.fastForward(2500);await expect(count).toHaveText('02 / 05');
 await page.getByRole('button',{name:'Pause motion',exact:true}).click();
 await page.clock.fastForward(7500);await expect(count).toHaveText('02 / 05');
 await page.getByRole('button',{name:'Play motion',exact:true}).click();
 await page.clock.fastForward(2500);await expect(count).toHaveText('03 / 05');
 await page.locator('.hero').getByRole('button',{name:'Book an appointment',exact:true}).click();
 await page.clock.fastForward(7500);await expect(count).toHaveText('03 / 05');
 await page.keyboard.press('Escape');await page.clock.fastForward(2500);await expect(count).toHaveText('04 / 05');
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
 await page.clock.fastForward(7500);await expect(count).toHaveText('04 / 05');
});


test('hero entrance leaves the complete letter shapes visible',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto(process.env.DEMO_PATH||'/');
 for(const width of [390,768,1440]){
  await page.setViewportSize({width,height:1000});
  await expect.poll(()=>page.locator('.hero h1>span').evaluateAll(els=>els.every(el=>el.getAnimations().every(a=>a.playState==='finished')))).toBe(true);
  const clips=await page.locator('.hero h1>span').evaluateAll(els=>els.map(el=>getComputedStyle(el).clipPath));
  expect(clips).toEqual(['none','none']);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`evidence/hero-type-fixed-${width}.png`});
 }
});


test('layered hero entrance settles once and respects reduced motion',async({page})=>{
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(process.env.DEMO_PATH||'/');
  const elements='.hero h1>span,.hero-pole,.hero-photo,.hero-description,.hero-copy>p:nth-child(2),.hero-copy>.button,.hero-secondary,.hero-seal,.hero-bottom';
  const entrance=await page.locator(elements).evaluateAll(els=>els.map(el=>({name:getComputedStyle(el).animationName,duration:getComputedStyle(el).animationDuration,clip:getComputedStyle(el).clipPath})));
  expect(entrance.every(el=>el.name.startsWith('hero-'))).toBe(true);expect(entrance.every(el=>el.clip==='none')).toBe(true);
  await expect(page.locator('.hero')).not.toHaveClass(/hero-intro/);
  const settled=await page.locator(elements).evaluateAll(els=>els.map(el=>({opacity:getComputedStyle(el).opacity,animation:getComputedStyle(el).animationName})));
  expect(settled.every(el=>el.opacity==='1'&&el.animation==='none')).toBe(true);
  await page.getByRole('button',{name:'Pause motion',exact:true}).click();await page.getByRole('button',{name:'Play motion',exact:true}).click();await expect(page.locator('.hero')).not.toHaveClass(/hero-intro/);
  await page.locator('.header-book').click();await expect(page.getByRole('dialog',{name:'Choose your service'})).toBeVisible();await page.keyboard.press('Escape');
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload();
  expect(await page.locator(elements).evaluateAll(els=>els.every(el=>getComputedStyle(el).animationName==='none'&&getComputedStyle(el).opacity==='1'))).toBe(true);
 }
});

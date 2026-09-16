import {test,expect} from '@playwright/test';
import {looks} from '../src/data';

for(const width of [390,768,1440]) test(`ten cuts can be browsed and booked at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:'reduce'});await page.goto(process.env.DEMO_PATH||'/');
 const carousel=page.getByRole('region',{name:'Haircut styles'});await carousel.scrollIntoViewIfNeeded();
 await expect(carousel.getByRole('button',{name:/^Explore /})).toHaveCount(10);
 await expect(carousel.getByRole('button',{name:/^(Previous|Next) cuts$/})).toHaveCount(0);
 for(let index=0;index<10;index++){
  await carousel.getByRole('button',{name:`Explore ${looks[index].title}`,exact:true}).click();
  const dialog=page.getByRole('dialog');await expect(dialog.getByRole('heading')).toHaveText(looks[index].title);
  const photo=await dialog.locator('.look-photo').evaluate(async el=>{const css=getComputedStyle(el);const image=new Image();image.src=css.backgroundImage.slice(5,-2);await image.decode();return {loaded:image.naturalWidth>0,size:css.backgroundSize,position:css.backgroundPosition};});
  expect(photo.loaded).toBe(true);expect(photo.size).toBe(looks[index].backgroundSize||'200% 200%');expect(photo.position).toBe(looks[index].position);
  await dialog.getByRole('button',{name:'Book an appointment'}).click();
  await expect(page.getByRole('dialog',{name:'Choose your service'})).toBeVisible();
  await expect(page.getByRole('dialog').locator('[aria-pressed="true"]')).toHaveCount(0);
  await page.keyboard.press('Escape');
 }
 await carousel.locator('.cuts-viewport').evaluate(el=>el.scrollLeft=0);
 await page.locator('#cuts').screenshot({path:`evidence/cuts-ten-${width}.png`});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.locator('#experience').getByRole('button',{name:'Book an appointment',exact:true}).click();await expect(page.getByRole('dialog',{name:'Choose your service'})).toBeVisible();
});

test('cuts glide continuously, loop seamlessly and pause in place',async({page})=>{
 test.setTimeout(60000);
 await page.setViewportSize({width:1440,height:1000});await page.goto(process.env.DEMO_PATH||'/');
 const carousel=page.getByRole('region',{name:'Haircut styles'});await carousel.scrollIntoViewIfNeeded();await page.mouse.move(1,1);
 await expect(carousel.locator('.cuts-carousel-actions button')).toHaveCount(1);
 await expect(carousel.getByRole('button',{name:'Pause cuts carousel',exact:true})).toBeVisible();
 const rail=carousel.locator('.cuts-track');
 const first=carousel.locator('.look-card').first().getByRole('heading');
 await expect.poll(()=>rail.evaluate(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).m41)).toBeLessThan(-5);
 // Follow a card across the reorder boundary: it must keep moving left at a steady speed.
 const samples=await carousel.getByRole('button',{name:'Explore Bro flow',exact:true}).evaluate(async el=>{
  const samples:{time:number;x:number}[]=[];const start=performance.now();
  await new Promise<void>(resolve=>{function frame(now:number){samples.push({time:now-start,x:el.getBoundingClientRect().x});if(now-start<3800)requestAnimationFrame(frame);else resolve();}requestAnimationFrame(frame);});return samples;
 });
 const windows=samples.filter((sample,index)=>index%20===0);
 expect(windows.length).toBeGreaterThan(8);
 for(let i=1;i<windows.length;i++){const delta=windows[i].x-windows[i-1].x;expect(delta).toBeLessThan(-10);expect(delta).toBeGreaterThan(-50);}
 await carousel.getByRole('button',{name:'Pause cuts carousel',exact:true}).click();await page.waitForTimeout(100);
 const stopped=await rail.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(700);expect(await rail.evaluate(el=>getComputedStyle(el).transform)).toBe(stopped);
 await carousel.getByRole('button',{name:'Play cuts carousel',exact:true}).click();await carousel.locator('.cuts-viewport').hover();await page.waitForTimeout(100);
 const hovered=await rail.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(700);expect(await rail.evaluate(el=>getComputedStyle(el).transform)).toBe(hovered);
 await carousel.getByRole('button',{name:/^Explore /}).first().focus();await page.mouse.move(1,1);await page.waitForTimeout(100);
 const focused=await rail.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(700);expect(await rail.evaluate(el=>getComputedStyle(el).transform)).toBe(focused);
 await page.locator('.header-book').focus();await expect.poll(()=>rail.evaluate(el=>getComputedStyle(el).transform)).not.toBe(focused);
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);const reduced=await rail.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(700);expect(await rail.evaluate(el=>getComputedStyle(el).transform)).toBe(reduced);
 // Let autoplay reach 10 and check the continuous wrap back to 1.
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.mouse.move(1,1);await expect(first).toHaveText('Flat top',{timeout:35000});
 await expect(first).toHaveText('Curly taper fade',{timeout:5000});
 await carousel.screenshot({path:'evidence/cuts-pause-only-desktop.png'});
});

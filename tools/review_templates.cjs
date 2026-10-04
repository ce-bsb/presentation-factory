const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '../organizations/ibm/templates');
(async () => {
 const browser = await chromium.launch({ channel: 'chrome', headless: true });
 const errors=[]; let checks=0;
 for (const slug of ['ibm-template','ibm-brief-template','ibm-edge-template','standard-deck']) {
  const page = await browser.newPage({reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(`${slug}: ${e.message}`));
  const file = slug === 'standard-deck' ? path.resolve(root, '../../../clients/ibm-enterprise/templates/standard-deck/index.html') : path.join(root,slug,'preview.html');
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(()=>document.fonts.ready);
  for (const [width,height] of [[1280,720],[1920,1080],[1056,700],[768,1024],[390,844],[320,568],[844,390]]) {
   await page.setViewportSize({width,height});
   assert.equal(await page.evaluate(()=>getComputedStyle(document.body).fontSize),'18px');
   const total=await page.locator('.slide').count();
   for(let i=0;i<total;i++) {
    await page.evaluate(i=>window._deck.goto(i),i);
    await page.waitForTimeout(80);
    const state=await page.evaluate(()=>{
     const s=document.querySelector('.slide.active');
     const box=s.getBoundingClientRect();
     return {width:document.documentElement.scrollWidth, viewport:innerWidth,
      overflow:s.scrollWidth>s.clientWidth+1,
      clipped:!document.body.classList.contains('reading-mode') && s.scrollHeight>s.clientHeight+2,
      bad:[...s.querySelectorAll('h1,h2,h3,p,img,td,th')].filter(el=>{const b=el.getBoundingClientRect();return b.width && (b.right>box.right+2 || b.left<box.left-2);}).map(el=>el.className || el.tagName),
      inactive:[...document.querySelectorAll('.slide:not(.active)')].every(el=>el.inert)};
    });
    if(state.width>width+1||state.overflow||state.clipped||state.bad.length||!state.inactive)errors.push(`${slug} ${width}x${height} slide ${i+1}: ${JSON.stringify(state)}`);
    checks++;
   }
   if(process.env.SCREENSHOT_DIR && (width===1280||width===390)){await page.evaluate(()=>window._deck.goto(0)); await page.waitForTimeout(100); await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,`${slug}-${width}.png`),fullPage:true});}
  }
  await page.setViewportSize({width:1280,height:720});
  await page.evaluate(()=>window._deck.goto(0)); await page.waitForTimeout(100);
  await page.locator('#nextBtn').click(); assert.equal(await page.evaluate(()=>window._deck.current),1);
  await page.mouse.click(1,100); await page.keyboard.press('End'); assert.equal(await page.evaluate(()=>window._deck.current),await page.locator('.slide').count()-1);
  await page.keyboard.press('Home'); assert.equal(await page.evaluate(()=>window._deck.current),0);
  await page.mouse.wheel(0,100); assert.equal(await page.evaluate(()=>window._deck.current),0);
  if(slug==='ibm-brief-template') {
   await page.evaluate(()=>window._deck.goto(1)); await page.waitForTimeout(100);
   await page.locator('[data-go="3"]').focus(); await page.keyboard.press('Space'); assert.equal(await page.evaluate(()=>window._deck.current),2);
  }
  if (slug === 'standard-deck') {
   await page.evaluate(()=>window._deck.goto(6)); await page.waitForTimeout(100);
   await page.locator('#task-1').focus(); await page.keyboard.press('Space');
   assert.equal(await page.locator('#task-1').isChecked(),true);
   assert.equal(await page.evaluate(()=>window._deck.current),6);
  }
  // User font enlargement must switch to readable document flow, with no clipping.
  await page.evaluate(()=>{document.documentElement.style.fontSize='200%'; window._deck.goto(0);});
  await page.waitForTimeout(150);
  assert.equal(await page.evaluate(()=>document.body.classList.contains('reading-mode')),true);
  await page.evaluate(()=>document.documentElement.style.fontSize='');
  await page.emulateMedia({media:'print'});
  assert.equal(await page.locator('.slide:visible').count(),await page.locator('.slide').count());
  await page.close();
 }
 await browser.close(); console.log(JSON.stringify({checks,errors},null,2)); if(errors.length)process.exitCode=1;
})().catch(error=>{console.error(error); process.exit(1);});

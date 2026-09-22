const { chromium } = require('@playwright/test');
(async() => {
  const browser = await chromium.launch({ args: ['--headless'] });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.in/s?k=headphones', { waituntil: 'load', timeout: 15000 });
  await page.locator('#search').wait({ state: 'visible', timeout: 5000 });
  const selectors = [
    'div[data-component-type="s-search-result"] h2 a',
    '.s-asin a:has(h2)',
    'a:has(h2)',
    'div[data-asin] h2 a'
  ];
  for (const selector of selectors) {
    const count = await page.locator(selector).count();
    console.log(selector, count);
    if (count > 0) {
      const href = await page.locator(selector).first().getAttribute('href');
      console.log('href:', href);
    }
  }
  await browser.close();
})();

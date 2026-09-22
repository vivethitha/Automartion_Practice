const path = require('path');
const dotenv = require('dotenv');
const { test, expect } = require('@playwright/test');
const { AmazonPage } = require('../pages/AmazonPage');
const { ProductPage } = require('../pages/ProductPage');
const { CartPage } = require('../pages/CartPage');
const { loadCsv, loadJson } = require('../utils/testData');

dotenv.config({ path: path.join(__dirname, '.env') });
const credentials = {
  email: process.env.AMAZON_EMAIL,
  password: process.env.AMAZON_PASSWORD,
};

async function logTestValues(source, values) {
  const log = { source, values };

  console.log(`[test-data] ${JSON.stringify(log)}`);
  await test.step(`Test data: ${source}`, async () => {
    await test.info().attach('test-data', {
      body: JSON.stringify(log, null, 2),
      contentType: 'application/json',
    });
  });
}

test.describe('Amazon framework examples', () => {
  for (const testData of loadJson('searchData.json')) {
    test(`searches for ${testData.product} using JSON data`, async ({ page }) => {
      await logTestValues('searchData.json', testData);

      const amazonPage = new AmazonPage(page);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);

      await amazonPage.open();
      await expect(page).toHaveTitle(/Amazon/);
      await amazonPage.search(testData.product);
      //await amazonPage.verifySearchResults(testData.product);
      await productPage.openProduct(testData.product);
      //await productPage.verifyProductLoaded(testData.product);
      await productPage.addToCart();
      await cartPage.openCart();
      //await cartPage.verifyCartContains(testData.product);
    });
  }

  for (const testData of loadCsv('searchData.csv')) {
    test(`searches for ${testData.product} using CSV data`, async ({ page }) => {
      await logTestValues('searchData.csv', testData);

      const amazonPage = new AmazonPage(page);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);

      await amazonPage.open();
      await amazonPage.search(testData.product);
      await amazonPage.verifySearchResults(testData.product);
      await productPage.openProduct(testData.product);
      await productPage.verifyProductLoaded(testData.product);
      await productPage.addToCart();
      await cartPage.openCart();
      await cartPage.verifyCartContains(testData.product);
    });
  }

  test('logs in with credentials from .env', async ({ page }) => {
    test.skip(!credentials.email || !credentials.password, 'Set AMAZON_EMAIL and AMAZON_PASSWORD in tests/.env');
    await logTestValues('tests/.env', {
      email: credentials.email,
      password: '[masked]',
      passwordLength: credentials.password.length,
    });

    const amazonPage = new AmazonPage(page);

    await amazonPage.open();
    await amazonPage.openLogin();
    await amazonPage.login(credentials.email, credentials.password);
    await expect(amazonPage.accountLink).toContainText(/Hello/);
  });
});




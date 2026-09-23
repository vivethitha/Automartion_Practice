const { expect } = require('@playwright/test');
const locators = require('../locators/amazon.locators');

class ProductPage {
  constructor(page) {
    this.page = page;
    this.productResults = page.locator(locators.product.productResults);
    this.productTitle = page.locator(locators.product.productTitle);
    this.addToCartButton = page.locator(locators.product.addToCartButton);
  }

  async openProduct(productName = '') {
    await this.productResults.first().waitFor({ state: 'visible', timeout: 5000 });
    await this.productResults.first().click();
    //await this.page.waitForURL(/\/dp\//, { timeout: 10000 });
  }

  async addToCart() {
    //await this.addToCartButton.waitFor({ state: 'visible', timeout: 8000 });
    await this.addToCartButton.scrollIntoViewIfNeeded();
    await this.addToCartButton.click();
    await this.page.getByText(/Added to Cart|Added to cart|Cart/i).waitFor({ state: 'visible', timeout: 8000 });
  }

  async verifyProductLoaded(productName = '') {
    await expect(this.productTitle).toBeVisible();
  }
}

module.exports = { ProductPage };

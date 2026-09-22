const { expect } = require('@playwright/test');
const locators = require('../locators/amazon.locators');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator(locators.cart.cartLink);
    this.cartItems = page.locator(locators.cart.cartItems);
    this.proceedToCheckoutButton = page.locator(locators.cart.proceedToCheckoutButton);
  }

  async openCart() {
    await this.cartLink.waitFor({ state: 'visible', timeout: 5000 });
    await this.cartLink.click();
    await this.page.waitForURL(/\/gp\/cart/, { timeout: 10000 });
  }

  async addItemToCart(productName) {
    await this.page.locator(locators.product.productResults).first().click();
    await this.page.locator(locators.product.addToCartButton).click();
  }

  async verifyCartContains(productName = '') {
    await expect(this.page).toHaveURL(/\/gp\/cart/);
    await expect(this.cartItems.first()).toBeVisible();
  }

  async checkout() {
    await this.proceedToCheckoutButton.click();
  }
}

module.exports = { CartPage };

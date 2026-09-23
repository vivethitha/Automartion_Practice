const { expect } = require('@playwright/test');
const locators = require('../locators/amazon.locators');

class AmazonPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator(locators.home.searchBox);
    this.searchButton = page.locator(locators.home.searchButton);
    this.accountLink = page.locator(locators.home.accountLink);
    this.emailInput = page.locator(locators.login.emailInput);
    this.continueButton = page.locator(locators.login.continueButton);
    this.passwordInput = page.locator(locators.login.passwordInput);
    this.signInButton = page.locator(locators.login.signInButton);
  }

  //async open() {
    await this.page.goto('/');
  }

  async search(product) {
    await this.searchBox.fill(product);
    await this.searchButton.click();
  }

  //async openLogin() {
    await this.accountLink.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.continueButton.click();
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async verifySearchResults(product) {
    await expect(this.page).toHaveURL(/\/s\?(?:k|url)=/);
    await expect(this.page.locator('body')).toContainText(product);
  }
}

module.exports = { AmazonPage };

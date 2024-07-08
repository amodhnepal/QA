const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '//*[@id="email"]';
    this.passwordInput = '//*[@id="password"]';
    this.loginButton = '//*[@id="submit"]';
    this.validLoginValidation = "//html/body/div/header/h1";
    // this.errorMessage = '//*[@id="error"]';
  }

  async login(username, password) {
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "Contact List"
    );
  }

  async invalidLogin(error) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(error);
  }
};
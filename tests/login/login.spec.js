const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/loginFixture.json");
const { LoginPage } = require("../../pageObject/login.po");

// const { beforeEach } = require("node:test");

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Test Login | Practice Test Automation/);
});

test.describe("valid login tests", () => {
  test.only("login valid", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.username, testData.validUser.password);
    
    await login.verifyValidLogin();
  });
});

test.describe("invalid login tests", () => {
  test("login invalid", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.invalidCredentials.username,
      testData.invalidUser.invalidCredentials.password
    );

    await login.invalidLogin("Your username is invalid!");
    // const errorMessage = await page.locator("#error").textContent();
    // expect(errorMessage).toContain("Your username is invalid!");
  });

  test("empty field", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyField.username,
      testData.invalidUser.emptyField.password
    );
    await login.invalidLogin("Your username is invalid!");
  });

  test("username empty", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyUsername.username,
      testData.invalidUser.emptyUsername.password
    );
    await login.invalidLogin("Your username is invalid!");
  });

  test("Password empty", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.emptyPassword.username,
      testData.invalidUser.emptyPassword.password
    );
    await login.invalidLogin("Your password is invalid!");
  });

  test("username with leading space", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.usernameLeadingSpace.username,
      testData.invalidUser.usernameLeadingSpace.password
    );
    await login.invalidLogin("Your username is invalid!");
  });

  test("password with leading space", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      testData.invalidUser.passwordLeadingSpace.username,
      testData.invalidUser.passwordLeadingSpace.password
    );
    await login.invalidLogin("Your password is invalid!");
  });
});
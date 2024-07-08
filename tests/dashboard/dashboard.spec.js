const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/loginFixture.json");
const { LoginPage } = require("../../pageObject/contactLogin.po.js");

const {
  TodayDate,
  authneticateUser1,
  createEntity,
} = require("../../utils/helper.spec.js");
const { DashboardPage } = require("../../pageObject/contactTest.dashboard.po.js");

let interceptID;

test.beforeEach(async ({ page }) => {
  await page.goto("./");
  const login = new LoginPage(page);
  await login.login(testData.validUser.username, testData.validUser.password);
  await login.verifyValidLogin();
});

test.describe.only("Dashboard CRUD Operations", () => {
  test.only("Fill Form and Validate", async ({ page }) => {
    await page.locator('//*[@id="add-contact"]').click();
    const dashboard = new DashboardPage(page);
    await dashboard.fillForm();

    await dashboard.validFill();
  });

  test("Edit Data and Validate", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.editData();
    await dashboard.validEdit();
  });

  test("Delete Data and Validate", async ({ page }) => {
    const dashboard = new DashboardPage(page);

    page.waitForTimeout(2000);
    await dashboard.deleteData();
    page.waitForTimeout(2000);
    await dashboard.validDelete();
  });

  test("Logout and Validate", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logout();
    await dashboard.validLogout();
  });
});

test("Contact Edit test", async ({ context, page, request }) => {
  const dashboard = new DashboardPage(page);
  const Data = { firstName: "hello", lastName: "world" };
  const accessToken = await authenticateUser1({ request });
  const entityId = await createEntity(Data, accessToken, "/contacts", {
    request,
  });
  await intercept(
    "https://thinking-tester-contact-list.herokuapp.com/contacts/**",
    { context, page }
  );
  await page.reload();
  await page.waitForTimeout(5000);
  await dashboard.contactEdit();
  await page.waitForTimeout(5000);
});

async function intercept(module, { context, page }) {
  await context.route(module, async (route) => {
    await route.continue();
    const response = await page.waitForResponse(module);
    const responseBody = await response.json();
    interceptId = responseBody._id;
  });
}
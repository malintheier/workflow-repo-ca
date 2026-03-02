import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
  test("home menu has links to login and register when logged out", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Login" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Register" })).toBeVisible();
  });

  test("can navigate from home to login", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/login\/?$/);
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  });

  test("can navigate from home to register", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Register" }).click();

    await expect(page).toHaveURL(/\/register\/?$/);
    await expect(page.getByRole("heading", { name: "Register" })).toBeVisible();
  });

  test("can open first venue and see venue details heading", async ({ page }) => {
    await page.goto("/");

    const firstVenueLink = page.locator("#venue-container a").first();
    await expect(firstVenueLink).toBeVisible({ timeout: 15000 });

    await firstVenueLink.click();

    await expect(page).toHaveURL(/\/venue\/\?id=/);
    await expect(page.getByRole("heading")).toContainText("Venue details");
  });
});

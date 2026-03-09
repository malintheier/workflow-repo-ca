import { expect, test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

function getEnvValue(key) {
  if (process.env[key]) {
    return process.env[key];
  }

  const envPath = path.resolve(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    return "";
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const line = envContent.split(/\r?\n/).find((currentLine) => currentLine.startsWith(`${key}=`));

  if (!line) {
    return "";
  }

  return line.slice(key.length + 1).trim();
}

const loginEmail = getEnvValue("LOGIN_EMAIL");
const loginPassword = getEnvValue("LOGIN_PASSWORD");

test.describe("Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
    });
  });

  test("shows login form fields", async ({ page }) => {
    await page.goto("/login/");

    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await expect(page.locator("#loginForm input[name='email']")).toBeVisible();
    await expect(page.locator("#loginForm input[name='password']")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  test("shows validation errors on invalid submit", async ({ page }) => {
    await page.goto("/login/");

    await page.locator("#loginForm input[name='email']").fill("invalid@email.com");
    await page.locator("#loginForm input[name='password']").fill("short");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#message-container")).toContainText(
      "Please enter a noroff.no or stud.noroff.no email address."
    );
    await expect(page.locator("#message-container")).toContainText(
      "Password must be at least 8 characters long."
    );
  });

  test("logs in with valid credentials from env", async ({ page }) => {
    test.skip(
      !loginEmail || !loginPassword || loginEmail === "..." || loginPassword === "...",
      "Set LOGIN_EMAIL and LOGIN_PASSWORD in .env or shell environment"
    );

    await page.goto("/login/");

    await page.locator("#loginForm input[name='email']").fill(loginEmail);
    await page.locator("#loginForm input[name='password']").fill(loginPassword);
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/(index\.html)?$/);
    await expect(page.locator("#logoutButton")).toBeVisible();
  });

  test("shows API error message with invalid credentials", async ({ page }) => {
    await page.goto("/login/");

    await page.locator("#loginForm input[name='email']").fill("invalid@stud.noroff.no");
    await page.locator("#loginForm input[name='password']").fill("WrongPass123");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("#message-container")).toBeVisible();
    await expect(page.locator("#message-container")).toContainText(
      /(invalid|password|email|failed)/i
    );
  });
});

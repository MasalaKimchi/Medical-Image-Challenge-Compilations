import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const challenges = JSON.parse(readFileSync(new URL("../../data/challenges.json", import.meta.url), "utf8"));

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-25T16:00:00Z"));
});

test("schedule caveats remain visible in cards, table, and comparison", async ({ page }) => {
  await page.goto("/tracker/");
  await page.getByRole("searchbox", { name: "Search challenges" }).fill("BIG-MRI");
  await expect(page.locator("#cards .card")).toHaveAttribute("data-status", "upcoming");
  await expect(page.locator("#cards")).toContainText("participation is not confirmed open");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("button", { name: "Compare", exact: true }).click();
  await expect(page.locator("#compareBody")).toContainText("participation is not confirmed open");
  await page.getByRole("button", { name: "Close comparison" }).click();
  await page.getByRole("button", { name: "Table", exact: true }).click();
  await expect(page.locator("#tableBody")).toContainText("participation is not confirmed open");
});

test("agenda explains pending participation and restricted rounds", async ({ page }) => {
  await page.goto("/timeline/");
  await page.getByRole("button", { name: "Agenda", exact: true }).click();
  await expect(page.locator("#agenda")).toContainText("Current submission availability and deadlines could not be reverified");
  await expect(page.locator("#agenda")).toContainText("new-team entry closed with Phase I");
});

test("dataset counts, storage and source links can be inspected and compared", async ({ page }) => {
  await page.goto("/tracker/?search=DoseRAD");
  const card = page.locator("#cards .card");
  await expect(card).toContainText("122 patients");
  const summary = card.locator("summary");
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(card.locator("details")).toHaveAttribute("open", "");
  await expect(card.locator("details")).toContainText("864 GB");
  await expect(card.getByRole("link", { name: "DoseRAD dataset, splits and reported 864 GB size" })).toHaveAttribute("href", "https://doserad2026.grand-challenge.org/data/");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await page.getByRole("button", { name: "Compare", exact: true }).click();
  await expect(page.locator("#compareBody")).toContainText("864 GB");
  await expect(page.locator("#compareBody")).toContainText("122 patients");
  await page.getByRole("button", { name: "Close comparison" }).click();
  await page.getByRole("button", { name: "Table", exact: true }).click();
  await page.locator("#tableBody summary").click();
  await expect(page.locator("#tableBody")).toContainText("864 GB");
});

test("new source details escape labels and reject executable URL schemes", async ({ page }) => {
  const fixture = { ...challenges[0], sources: [
    { ...challenges[0].sources[0], label: '<img src=x onerror="alert(1)">', url: "https://example.com/dataset" },
    { ...challenges[0].sources[0], id: "unsafe", label: "Unsafe source", url: "javascript:alert(1)" }
  ] };
  await page.route("**/data/challenges.js?*", route => route.fulfill({ contentType: "text/javascript", body: `window.CHALLENGES=${JSON.stringify([fixture])};` }));
  await page.goto("/tracker/");
  await page.locator("#cards summary").click();
  const details = page.locator("#cards details");
  await expect(details).toContainText('<img src=x onerror="alert(1)">');
  await expect(details.locator("img")).toHaveCount(0);
  await expect(details.locator("a")).toHaveCount(1);
  await expect(details.locator("a")).toHaveAttribute("href", "https://example.com/dataset");
});

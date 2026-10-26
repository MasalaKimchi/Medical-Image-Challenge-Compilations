import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { deriveChallengeState } from "../../assets/challenge-core.js";

const TODAY = "2026-10-26";
const challenges = JSON.parse(readFileSync(new URL("../../data/challenges.json", import.meta.url), "utf8"));
const joinable = challenges.filter(challenge => deriveChallengeState(challenge, TODAY).canJoinNow);
const rows = page => page.locator("#results .challenge-row");
const view = (page, name) => page.locator(`#viewNav [data-view="${name}"]`);

test.beforeEach(async ({ page }) => {
  await page.clock.setFixedTime(new Date(`${TODAY}T16:00:00Z`));
});

async function expectAccessible(page) {
  const { violations } = await new AxeBuilder({ page }).analyze();
  const serious = violations.filter(item => ["serious", "critical"].includes(item.impact));
  expect(serious, serious.map(item => `${item.id}: ${item.help}`).join("\n")).toEqual([]);
}

test("main and preview links reach v1 with search intact and browser Back restores views", async ({ page }) => {
  for (const entry of ["/", "/v0.1/"]) {
    await page.goto(`${entry}?view=browse&search=ATM26#results`);
    await expect(page).toHaveURL(/\/v1\/\?search=ATM26#results$/);
    await page.goto(`${entry}?view=schedule&search=ATM26#results`);
    await expect(page).toHaveURL(/\/v1\/\?view=schedule&search=ATM26#results$/);
    await expect(view(page, "schedule")).toHaveAttribute("aria-pressed", "true");
    await expect(rows(page)).toHaveCount(1);
    await expect(rows(page)).toHaveAttribute("data-id", "atm26");
  }
  await view(page, "browse").click();
  await view(page, "saved").click();
  await page.goBack();
  await expect(view(page, "browse")).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("searchbox", { name: "Search challenges" })).toHaveValue("ATM26");
  await page.goBack();
  await expect(view(page, "schedule")).toHaveAttribute("aria-pressed", "true");
  await expect(rows(page)).toHaveCount(1);
});

test("an open tab refreshes expired opportunities without losing temporary saves", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", { configurable: true, get() { throw new Error("Storage disabled"); } });
  });
  await page.clock.setFixedTime(new Date("2026-11-14T16:00:00Z"));
  await page.goto("/v1/?search=UMUD");
  await expect(rows(page)).toHaveCount(1);
  await page.locator('.save-button[data-save="umud26"]').click();
  await page.clock.setFixedTime(new Date("2026-11-15T16:00:00Z"));
  await view(page, "schedule").click();
  await expect(rows(page)).toHaveCount(0);
  await expect(page.locator("#sourceNote")).toContainText("Nov 15, 2026");
  await view(page, "saved").click();
  await expect(rows(page)).toHaveCount(1);
  await expect(rows(page)).toContainText("Closed");
  await expect(page.locator("#exportSaved")).not.toBeVisible();
});

test("v1 starts with challenges a new team can actually join", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/v1/");
  await expect(rows(page)).toHaveCount(joinable.length);
  const ids = await rows(page).evaluateAll(elements => elements.map(element => element.dataset.id));
  expect(ids.sort()).toEqual(joinable.map(challenge => challenge.id).sort());
  await expect(page.locator('[data-id="prisma26"], [data-id="clearec26"]')).toHaveCount(0);
  await expect(page.locator("#resultCount")).toContainText(String(joinable.length));
  const benchmark = page.locator('.challenge-row[data-id="panther25"]');
  await expect(benchmark).toContainText("Post-challenge benchmark");
  await expect(benchmark).toContainText("Benchmark window ends");
  await expect(benchmark).not.toContainText("Submissions due");
  await page.locator('#scopeNav [data-scope="all"]').click();
  await expect(rows(page)).toHaveCount(challenges.length);
  const restricted = page.locator('.challenge-row[data-id="prisma26"]');
  await expect(restricted).toContainText(/registered teams/i);
  await restricted.locator(".row-title").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#detailDialog")).toBeVisible();
  await expect(page.locator("#dialogBody")).toContainText("Registration closed 30 Jun");
  await page.keyboard.press("Escape");
  await expect(page.locator("#detailDialog")).not.toBeVisible();
  await expect(restricted.locator(".row-title")).toBeFocused();
  expect(errors).toEqual([]);
});

test("search and filters survive view changes and saved challenges survive reload", async ({ page }) => {
  await page.goto("/v1/");
  await page.locator("#filterDetails summary").click();
  await page.locator("#taskFilter").selectOption({ label: "Segmentation" });
  await page.locator("#modalityFilter").selectOption({ label: "CT" });
  await page.getByRole("searchbox", { name: "Search challenges" }).fill("ATM26");
  await expect(rows(page)).toHaveCount(1);
  await page.locator('.save-button[data-save="atm26"]').click();
  await expect(page.locator("#savedLabel")).toContainText("1");
  await view(page, "schedule").click();
  await expect(rows(page)).toHaveCount(1);
  await expect(rows(page)).toHaveAttribute("data-id", "atm26");
  await expect(page.locator("#taskFilter")).toHaveValue("segmentation");
  await expect(page.locator("#modalityFilter")).toHaveValue("ct");
  await view(page, "browse").click();
  await page.reload();
  await expect(page.getByRole("searchbox", { name: "Search challenges" })).toHaveValue("ATM26");
  await expect(rows(page)).toHaveCount(1);
  await expect(page.locator('.save-button[data-save="atm26"]')).toHaveAttribute("aria-pressed", "true");
  await view(page, "saved").click();
  await expect(rows(page)).toHaveCount(1);
  await expect(rows(page)).toHaveAttribute("data-id", "atm26");
  await expect(page).toHaveURL(/view=saved/);
  await page.reload();
  await expect(rows(page)).toHaveCount(1);
  await expect(page.locator("#savedTools")).toBeVisible();
});

test("blocked device storage keeps four saves for the current visit", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() { throw new Error("Storage disabled"); }
    });
  });
  await page.goto("/v1/");
  await page.locator('.save-button[aria-pressed="false"]').first().click();
  await expect(page.locator("#notice")).toContainText(/visit|session|storage|temporary|memory/i);
  for (let index = 0; index < 4; index += 1) {
    await page.locator('.save-button[aria-pressed="false"]').first().click();
  }
  await expect(page.locator('.save-button[aria-pressed="true"]')).toHaveCount(4);
  await expect(page.locator("#notice")).toContainText(/four|4/);
  await view(page, "saved").click();
  await expect(rows(page)).toHaveCount(4);
  await expect(page.locator("#savedHint")).toContainText(/visit|session|storage|temporary|memory/i);
  await rows(page).first().locator(".save-button").click();
  await expect(rows(page)).toHaveCount(3);
  await expect(page.locator("#notice")).toBeEmpty({ timeout: 6500 });
});

test("failed storage writes keep session saves when another tab changes the stored list", async ({ page }) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "medicalChallengeShortlist:v1") throw new DOMException("Storage full", "QuotaExceededError");
      return original.call(this, key, value);
    };
  });
  await page.goto("/v1/");
  for (let index = 0; index < 2; index += 1) await page.locator('.save-button[aria-pressed="false"]').first().click();
  await expect(page.locator("#notice")).toContainText(/visit|session|temporary|memory/i);
  await view(page, "saved").click();
  await expect(rows(page)).toHaveCount(2);
  const savedIds = await rows(page).evaluateAll(elements => elements.map(element => element.dataset.id));
  const peer = await page.context().newPage();
  await peer.goto("/classic/");
  const changed = page.evaluate(() => new Promise(resolve => window.addEventListener("storage", () => resolve(true), { once: true })));
  await peer.evaluate(() => localStorage.setItem("medicalChallengeShortlist:v1", "[]"));
  await changed;
  await expect(rows(page)).toHaveCount(2);
  expect(await rows(page).evaluateAll(elements => elements.map(element => element.dataset.id))).toEqual(savedIds);
  await expect(page.locator("#savedHint")).toContainText(/visit|session|temporary|memory/i);
  await peer.close();
});

test("saved comparison retains caveats and calendar omits unconfirmed deadlines", async ({ page }) => {
  await page.goto("/v1/");
  const search = page.getByRole("searchbox", { name: "Search challenges" });
  for (const [query, id] of [["SIPAIM", "sipaimtem26"], ["UMUD", "umud26"]]) {
    await search.fill(query);
    await page.locator(`.save-button[data-save="${id}"]`).click();
  }
  await search.fill("");
  await view(page, "saved").click();
  await expect(rows(page)).toHaveCount(2);
  await page.locator("#compareSaved").click();
  await expect(page.locator("#detailDialog")).toBeVisible();
  await expect(page.locator("#dialogBody")).toContainText("SIPAIM");
  await expect(page.locator("#dialogBody")).toContainText("UMUD");
  await expect(page.locator("#dialogBody")).toContainText(/conflict/i);
  await page.keyboard.press("Escape");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.locator("#exportSaved").click()
  ]);
  expect(download.suggestedFilename()).toMatch(/\.ics$/);
  const stream = await download.createReadStream();
  let calendar = "";
  for await (const chunk of stream) calendar += chunk.toString();
  expect(calendar).toContain("BEGIN:VCALENDAR");
  expect(calendar).toContain("UID:sipaimtem26-registration@");
  expect(calendar).toContain("DTSTART;VALUE=DATE:20261109");
  expect(calendar).not.toContain("UID:sipaimtem26-final@");
});

test("untrusted labels and search stay text and source links use HTTPS", async ({ page }) => {
  const unsafeLabel = '<img src=x onerror="alert(1)">';
  const fixture = {
    ...joinable[0],
    overview: unsafeLabel,
    url: "javascript:alert(1)",
    sources: [
      { id: "official", type: "official", label: unsafeLabel, url: "https://example.com/challenge" },
      { id: "unsafe", type: "dataset", label: "Unsafe source", url: "javascript:alert(1)" }
    ]
  };
  await page.route(/\/data\/challenges\.js(?:\?.*)?$/, route => route.fulfill({
    contentType: "text/javascript",
    body: `window.CHALLENGES=${JSON.stringify([fixture])};`
  }));
  await page.goto("/v1/");
  await expect(rows(page)).toContainText(unsafeLabel);
  await expect(rows(page).locator("img")).toHaveCount(0);
  await rows(page).locator(".row-title").click();
  await expect(page.locator("#dialogBody")).toContainText(unsafeLabel);
  await expect(page.locator("#dialogBody img")).toHaveCount(0);
  const links = await page.locator("#dialogBody a[href]").evaluateAll(elements => elements.map(element => element.getAttribute("href")));
  expect(links.length).toBeGreaterThan(0);
  expect(links.every(link => link.startsWith("https://"))).toBe(true);
  await page.keyboard.press("Escape");
  await page.getByRole("searchbox", { name: "Search challenges" }).fill('<script>alert("search")</script>');
  await expect(page.locator("#emptyState")).toBeVisible();
  await expect(page.locator("#results script, #emptyState script")).toHaveCount(0);
});

test("v1 remains readable and operable on narrow screens and in dark mode", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/v1/");
  await expect(rows(page)).toHaveCount(joinable.length);
  await expect(page.locator("#results.challenge-grid")).toBeVisible();
  await expect(page.locator("#results .challenge-card")).toHaveCount(joinable.length);
  await expect(page.locator('[data-id="sipaimtem26"] .row-title')).toHaveText(challenges.find(challenge => challenge.id === "sipaimtem26").name);
  const firstResult = await rows(page).first().boundingBox();
  expect(firstResult.y).toBeLessThan(Math.min(page.viewportSize().height - 44, 720));
  if (testInfo.project.name === "desktop") {
    const secondResult = await rows(page).nth(1).boundingBox();
    expect(Math.abs(secondResult.y - firstResult.y)).toBeLessThanOrEqual(1);
    expect(secondResult.x).toBeGreaterThanOrEqual(firstResult.x + firstResult.width);
  }
  await expectAccessible(page);
  if (testInfo.project.name === "desktop") await page.setViewportSize({ width: 320, height: 720 });
  const [narrowFirst, narrowSecond] = await Promise.all([rows(page).first().boundingBox(), rows(page).nth(1).boundingBox()]);
  expect(Math.abs(narrowSecond.x - narrowFirst.x)).toBeLessThanOrEqual(1);
  expect(narrowSecond.y).toBeGreaterThanOrEqual(narrowFirst.y + narrowFirst.height);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await page.locator("#themeButton").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expectAccessible(page);
  await page.locator("#filterDetails summary").click();
  await expect(page.getByLabel("Task", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
});

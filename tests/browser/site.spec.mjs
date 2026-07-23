import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoSeriousAccessibilityIssues(page) {
  const result = await new AxeBuilder({ page }).analyze();
  const serious = result.violations.filter((item) => ["serious", "critical"].includes(item.impact));
  expect(serious, serious.map((item) => `${item.id}: ${item.help}`).join("\n")).toEqual([]);
}

test.describe("challenge tracker", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tracker/");
    await expect(page.getByText("Showing 37 of 37 challenges.")).toBeVisible();
  });

  test("search, URL state, views, shortlist and comparison work", async ({ page }) => {
    const search = page.getByRole("searchbox", { name: "Search challenges" });
    await search.fill("SynthOCT");
    await expect(page.getByText("Showing 1 of 37 challenges.")).toBeVisible();
    await expect(page).toHaveURL(/search=SynthOCT/);
    await page.getByRole("button", { name: "Table", exact: true }).click();
    await expect(page).toHaveURL(/view=table/);
    await page.getByRole("button", { name: "Cards", exact: true }).click();
    const saves = page.getByRole("button", { name: "Save", exact: true });
    expect(await saves.count()).toBe(1);
    await saves.click();
    await expect(page.getByText("1 saved", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Compare", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Compare saved challenges" })).toBeVisible();
    await page.getByRole("button", { name: "Close comparison" }).click();
  });

  test("filter buttons are semantic and axe has no serious findings", async ({ page }) => {
    const oct = page.getByRole("button", { name: "OCT", exact: true });
    await expect(oct).toHaveAttribute("aria-pressed", "false");
    await oct.click();
    await expect(oct).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("Showing 1 of 37 challenges.")).toBeVisible();
    await expectNoSeriousAccessibilityIssues(page);
  });

  test("shortlist enforces four items and survives unavailable storage", async ({ browser }) => {
    const context = await browser.newContext();
    await context.addInitScript(() => {
      Object.defineProperty(window, "localStorage", { configurable: true, get() { throw new Error("storage disabled"); } });
    });
    const page = await context.newPage();
    await page.goto("/tracker/");
    for (let index = 0; index < 5; index += 1) await page.getByRole("button", { name: "Save", exact: true }).first().click();
    await expect(page.getByText("4 saved", { exact: true })).toBeVisible();
    await expect(page.getByText("You can save up to four challenges.")).toBeVisible();
    await context.close();
  });

  test("verified exact deadlines export as a calendar", async ({ page }) => {
    await page.getByRole("searchbox", { name: "Search challenges" }).fill("SynthOCT");
    await page.getByRole("button", { name: "Save", exact: true }).click();
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("button", { name: "Add to calendar", exact: true }).click()
    ]);
    expect(download.suggestedFilename()).toBe("medical-image-challenge-deadlines.ics");
    const stream = await download.createReadStream();
    let contents = "";
    for await (const chunk of stream) contents += chunk.toString();
    expect(contents).toContain("BEGIN:VCALENDAR");
    expect(contents).toContain("UID:synthoct26-development@medical-image-challenges");
    expect(contents).toContain("DTSTART;VALUE=DATE:20260814");
    expect(contents).toContain("DTEND;VALUE=DATE:20260815");
    expect(contents).toContain("END:VCALENDAR");
  });
});

test.describe("challenge schedule", () => {
  test("desktop timeline renders structured phase links", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile", "Desktop-specific default");
    await page.goto("/timeline/");
    await expect(page.getByRole("button", { name: "Timeline", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".phase")).not.toHaveCount(0);
    await expect(page.locator('[data-phase-id="flare26-test"]')).toHaveAttribute("data-status", "upcoming");
    await expect(page.locator(".today-line")).toBeVisible();
    await expectNoSeriousAccessibilityIssues(page);
  });

  test("mobile defaults to agenda and timeline centers near today", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile", "Mobile-specific default");
    await page.goto("/timeline/");
    await expect(page.getByRole("button", { name: "Agenda", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#agenda")).toBeVisible();
    await expectNoSeriousAccessibilityIssues(page);
    await page.getByRole("button", { name: "Timeline", exact: true }).click();
    await expect(page.locator(".today-line")).toBeVisible();
    await expect.poll(() => page.locator("#timelineScroll").evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
    await expectNoSeriousAccessibilityIssues(page);
  });
});

test("landing page derives totals without console errors", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await page.goto("/");
  await expect(page.locator("#challengeCount")).toHaveText("37");
  await expect(page.locator("#verifiedCount")).toHaveText("35");
  expect(errors).toEqual([]);
});

test("narrow, landscape, dark, reduced-motion and keyboard states remain usable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Runs its own viewport matrix");
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/tracker/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await expectNoSeriousAccessibilityIssues(page);
  await page.getByRole("searchbox", { name: "Search challenges" }).fill("SynthOCT");
  const save = page.getByRole("button", { name: "Save", exact: true });
  await save.focus();
  await page.keyboard.press("Enter");
  const compare = page.getByRole("button", { name: "Compare", exact: true });
  await compare.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Compare saved challenges" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(compare).toBeFocused();
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/timeline/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  await expectNoSeriousAccessibilityIssues(page);
});

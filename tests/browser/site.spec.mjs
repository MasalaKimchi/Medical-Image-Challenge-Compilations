import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";
import { deriveChallengeState, getFreshness } from "../../assets/challenge-core.js";

const challenges=JSON.parse(readFileSync(new URL("../../data/challenges.json",import.meta.url),"utf8"));
const TOTAL=challenges.length;
const BASE_DATE="2026-08-29";
test.beforeEach(async ({ page }) => { await page.clock.setFixedTime(new Date(`${BASE_DATE}T16:00:00Z`)); });

async function expectNoSeriousAccessibilityIssues(page) {
  const result = await new AxeBuilder({ page }).analyze();
  const serious = result.violations.filter((item) => ["serious", "critical"].includes(item.impact));
  expect(serious, serious.map((item) => `${item.id}: ${item.help}`).join("\n")).toEqual([]);
}

test.describe("challenge tracker", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tracker/");
    await expect(page.getByText(`Showing ${TOTAL} of ${TOTAL} challenges.`)).toBeVisible();
  });

  test("search, URL state, views, shortlist and comparison work", async ({ page }) => {
    const search = page.getByRole("searchbox", { name: "Search challenges" });
    await search.fill("SynthOCT");
    await expect(page.getByText(`Showing 1 of ${TOTAL} challenges.`)).toBeVisible();
    await expect(page).toHaveURL(/search=SynthOCT/);
    await page.getByRole("button", { name: "Table", exact: true }).click();
    await expect(page).toHaveURL(/view=table/);
    await page.getByRole("button", { name: "Cards", exact: true }).click();
    const freshness=getFreshness(challenges.find(c=>c.id==="synthoct26"),BASE_DATE);
    await expect(page.locator("#cards .fresh")).toHaveText({fresh:"Fresh",reviewDue:"Review due",stale:"Stale",unverified:"Verification date unavailable"}[freshness.key]);
    const saves = page.getByRole("button", { name: "Save", exact: true });
    expect(await saves.count()).toBe(1);
    await saves.click();
    await expect(page.getByText("1 saved", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Compare", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Compare saved challenges" })).toBeVisible();
    await page.getByRole("button", { name: "Close comparison" }).click();
  });

  test("filter buttons are semantic and axe has no serious findings", async ({ page }) => {
    const modality = page.getByRole("combobox", { name: "Filter by modality" });
    await modality.selectOption("OCT");
    await expect(modality).toHaveValue("OCT");
    await expect(page.getByText(`Showing 1 of ${TOTAL} challenges.`)).toBeVisible();
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
    await expect(page.locator('[data-phase-id="flare26-test"]')).toHaveAttribute("data-status", "open");
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
    await expect(page.locator("#swipeHint")).toBeVisible();
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
  await expect(page.locator("#challengeCount")).toHaveText(String(TOTAL));
  await expect(page.locator("#verifiedCount")).toHaveText(String(challenges.filter(c=>getFreshness(c,BASE_DATE).key==="fresh").length));
  await expect(page.locator(".tracker-preview .preview-title")).toHaveText("Medical Image Challenge Tracker");
  await expect(page.locator(".preview")).toHaveCount(2);
  expect(await page.locator(".preview").evaluateAll((previews) => previews.map((preview) => ({
    clippedHorizontally: preview.scrollWidth > preview.clientWidth,
    clippedVertically: preview.scrollHeight > preview.clientHeight
  })))).toEqual([
    { clippedHorizontally: false, clippedVertically: false },
    { clippedHorizontally: false, clippedVertically: false }
  ]);
  expect(errors).toEqual([]);
});

test("narrow, landscape, dark, reduced-motion and keyboard states remain usable", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "Runs its own viewport matrix");
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/tracker/");
  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false);
  expect(await page.locator("button").evaluateAll((buttons) => buttons.filter((button) => {
    const box = button.getBoundingClientRect();
    return box.width && box.height && (box.width < 44 || box.height < 44);
  }).map((button) => button.textContent?.trim()))).toEqual([]);
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


test("October view puts current opportunities first and exposes source review coverage", async ({ page }) => {
  const today="2026-10-25",freshCount=challenges.filter(c=>getFreshness(c,today).key==="fresh").length;
  await page.clock.setFixedTime(new Date(`${today}T16:00:00Z`));
  await page.goto("/tracker/");
  await expect(page.locator("#todayDate")).toContainText("2026");
  await expect(page.locator("#verifiedCount")).toHaveText(String(freshCount));
  await expect(page.locator("#reviewCount")).toHaveText(String(TOTAL-freshCount));
  const statuses=await page.locator("#cards .card").evaluateAll(cards=>cards.map(c=>c.dataset.status));
  const firstClosed=statuses.indexOf("closed");
  expect(firstClosed).toBeGreaterThan(0);
  expect(statuses.slice(firstClosed).every(status=>status==="closed")).toBe(true);
  const activeCount=challenges.filter(c=>["open","live"].includes(deriveChallengeState(c,today).status)).length;
  await page.goto("/");
  await expect(page.locator("#activeCount")).toHaveText(String(activeCount));
  await expect(page.locator("#reviewSummary")).toContainText("2026");
  await expect(page.locator("#previewMeta")).toContainText(`${freshCount} checked in past 14 days`);
});

test("October agenda separates completed events and filters its deadline strip", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-25T16:00:00Z"));
  await page.goto("/timeline/");
  await page.getByRole("button", { name:"Agenda",exact:true }).click();
  await page.getByRole("combobox", { name:"Filter schedule by status" }).selectOption("closed");
  await expect(page.locator("#agenda h3")).toHaveText("Completed");
  await expect(page.locator("#agenda")).not.toContainText("Date TBA");
  await expect(page.locator("#deadlineStrip .deadline-card")).toHaveCount(0);
  await page.getByRole("combobox", { name:"Filter schedule by status" }).selectOption("");
  await page.getByRole("combobox", { name:"Filter schedule by venue" }).selectOption("MIDL");
  await expect(page.locator("#deadlineStrip .deadline-card")).not.toHaveCount(0);
  expect(await page.locator("#deadlineStrip .venue").allTextContents()).toEqual(["MIDL"]);
  await expect(page.locator("#reviewSummary")).toContainText("need source review");
});

test("estimated and completed actions stay clear across tracker displays", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-10-25T16:00:00Z"));
  const base=challenges[0],phase=base.phases[0];
  const fixtures=[
    {...base,id:"estimated-fixture",name:"Estimated fixture",lastVerifiedISO:"2026-10-25",phases:[{...phase,id:"estimated",type:"registration",label:"Registration",startISO:"2026-10-01",endISO:"2026-11-10",endEstimated:true,participation:true,acceptingNewTeams:true,state:null,rolling:false}]},
    {...base,id:"completed-fixture",name:"Completed fixture",lastVerifiedISO:"2026-10-25",phases:[{...phase,id:"completed",type:"registration",label:"Registration",startISO:"2026-10-01",endISO:"2026-11-10",participation:true,acceptingNewTeams:true,state:"completed",rolling:false}]}
  ];
  await page.route("**/data/challenges.js?*",route=>route.fulfill({contentType:"text/javascript",body:`window.CHALLENGES=${JSON.stringify(fixtures)};`}));
  await page.goto("/tracker/");
  await expect(page.locator("#cards .card").first().locator(".action-box")).toContainText("estimated");
  await expect(page.locator('#cards .card[data-status="closed"] .action-box')).toContainText("Completed");
  await expect(page.locator('#cards .card[data-status="closed"] .action-box')).not.toContainText("Nov 10");
  await page.getByRole("button", { name:"Save",exact:true }).first().click();
  await page.getByRole("button", { name:"Compare",exact:true }).click();
  await expect(page.locator("#compareBody")).toContainText("estimated");
  await page.getByRole("button", { name:"Close comparison" }).click();
  await page.getByRole("button", { name:"Table",exact:true }).click();
  await expect(page.locator("#tableBody tr").first().locator("td").nth(2)).toContainText("estimated");
});

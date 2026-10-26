import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  createCalendarText, daysBetween, deriveChallengeState, derivePhaseStatus, getFreshness,
  getNextAction, isoDayNumber, localTodayISO
} from "../assets/challenge-core.js";

const phase = (overrides = {}) => ({
  id: "registration", type: "registration", label: "Registration", startISO: "2026-07-01",
  endISO: "2026-07-23", startEstimated: false, endEstimated: false,
  participation: true, acceptingNewTeams: true, rolling: false, state: null,
  sourceIds: ["official"], ...overrides
});
const challenge = (phases) => ({ id: "demo", name: "Demo", shortName: "Demo", url: "https://example.com", lastVerifiedISO: "2026-07-23", phases });

test("validates real calendar dates and uses civil-day arithmetic", () => {
  assert.equal(isoDayNumber("2026-02-29"), null);
  assert.equal(daysBetween("2024-02-28", "2024-03-01"), 2);
  assert.equal(localTodayISO(new Date(2026, 6, 23, 23, 59)), "2026-07-23");
});

test("deadline end dates are inclusive", () => {
  const item = challenge([phase()]);
  assert.equal(deriveChallengeState(item, "2026-07-23").status, "open");
  assert.equal(deriveChallengeState(item, "2026-07-24").status, "closed");
});

test("registration can close while enrolled-team testing remains open", () => {
  const item = challenge([
    phase(),
    phase({ id: "test", type: "test", label: "Test phase", startISO: "2026-07-20", endISO: "2026-08-01", acceptingNewTeams: false })
  ]);
  const state = deriveChallengeState(item, "2026-07-25");
  assert.equal(state.status, "open");
  assert.equal(state.canJoinNow, false);
  assert.equal(getNextAction(item, "2026-07-25").dateISO, "2026-08-01");
});

test("paper-only dates do not keep a challenge open", () => {
  const item = challenge([phase({ type: "paper", participation: false })]);
  assert.equal(deriveChallengeState(item, "2026-07-10").status, "closed");
});

test("rolling and postponed phases derive live and upcoming", () => {
  const rolling = challenge([phase({ type: "leaderboard", rolling: true, endISO: null, state: "active" })]);
  const postponed = challenge([phase({ startISO: null, endISO: null, state: "postponed" })]);
  assert.equal(deriveChallengeState(rolling, "2026-07-23").status, "live");
  assert.equal(deriveChallengeState(postponed, "2026-07-23").status, "upcoming");
});

test("an explicitly upcoming phase is not active, even when its planned start has passed", () => {
  const item = challenge([phase({ id: "final", type: "final-submission", label: "Final submission", startISO: null, endISO: "2026-09-01", acceptingNewTeams: false, state: "upcoming" })]);
  const state = deriveChallengeState(item, "2026-07-23");
  assert.equal(state.status, "upcoming");
  assert.equal(state.currentPhases.length, 0);
  assert.equal(derivePhaseStatus(item.phases[0], "2026-07-23"), "upcoming");
  const delayed = challenge([phase({ state: "upcoming", startISO: "2026-04-01", endISO: "2026-10-31", acceptingNewTeams: false })]);
  assert.equal(deriveChallengeState(delayed, "2026-07-23").status, "upcoming");
  assert.equal(getNextAction(delayed, "2026-07-23").kind, "confirmation");
  assert.equal(getNextAction(delayed, "2026-07-23").dateISO, null);
  assert.match(getNextAction(delayed, "2026-07-23").label, /awaiting organizer confirmation/);
});

test("expired upcoming phases close while explicitly postponed schedules remain pending", () => {
  const item = challenge([phase({ state: "upcoming" })]);
  assert.equal(deriveChallengeState(item, "2026-07-23").status, "upcoming");
  assert.equal(deriveChallengeState(item, "2026-07-24").status, "closed");
  assert.equal(derivePhaseStatus(item.phases[0], "2026-07-24"), "closed");
  assert.equal(getNextAction(item, "2026-07-24").dateISO, null);
  assert.equal(deriveChallengeState(challenge([phase({ state: "postponed" })]), "2026-07-24").status, "upcoming");
});

test("next opening skips past planned dates and finds the next scheduled phase", () => {
  const item = challenge([
    phase({ state: "upcoming", endISO: null }),
    phase({ id: "test", type: "test", state: "upcoming", startISO: "2026-08-01", endISO: "2026-08-15" })
  ]);
  const action = getNextAction(item, "2026-07-24");
  assert.equal(action.kind, "opens");
  assert.equal(action.dateISO, "2026-08-01");
  assert.equal(action.days, 8);
});

test("freshness thresholds are stable", () => {
  assert.equal(getFreshness("2026-07-09", "2026-07-23").key, "fresh");
  assert.equal(getFreshness("2026-07-08", "2026-07-23").key, "reviewDue");
  assert.equal(getFreshness("2026-06-24", "2026-07-23").key, "stale");
  assert.equal(getFreshness(null, "2026-07-23").key, "unverified");
  assert.equal(getFreshness("2026-07-24", "2026-07-23").key, "unverified");
});

test("calendar excludes estimated and TBA phases", () => {
  const item = challenge([
    phase(),
    phase({ id: "estimated", endISO: "2026-08-01", endEstimated: true }),
    phase({ id: "tba", endISO: null })
  ]);
  const calendar = createCalendarText([item]);
  assert.match(calendar, /demo-registration@medical-image-challenges/);
  assert.doesNotMatch(calendar, /estimated@/);
  assert.doesNotMatch(calendar, /tba@/);
});

test("catalogue actions never offer past dates at the review date", async () => {
  const data = JSON.parse(await readFile(new URL("../data/challenges.json", import.meta.url), "utf8"));
  for (const item of data) {
    const action = getNextAction(item, "2026-10-25");
    assert.ok(action.days === null || action.days >= 0, `${item.id} offers a past action date`);
  }
});

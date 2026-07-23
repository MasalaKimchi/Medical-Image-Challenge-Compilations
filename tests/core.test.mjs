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

test("schema migration preserves the reviewed fixture-date status distribution", async () => {
  const data = JSON.parse(await readFile(new URL("../data/challenges.json", import.meta.url), "utf8"));
  const counts = { live: 0, open: 0, upcoming: 0, closed: 0 };
  for (const item of data) counts[deriveChallengeState(item, "2026-07-23").status] += 1;
  assert.deepEqual(counts, { live: 1, open: 24, upcoming: 2, closed: 16 });
});

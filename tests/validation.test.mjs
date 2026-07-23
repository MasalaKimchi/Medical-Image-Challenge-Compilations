import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateDataSemantics } from "../scripts/validate-data.mjs";

const source = JSON.parse(await readFile(new URL("../data/challenges.json", import.meta.url), "utf8"));
const fixture = () => structuredClone(source);

test("semantic validation rejects impossible and reversed phase dates", () => {
  const impossible = fixture();
  impossible[0].phases[0].startISO = "2026-02-31";
  assert.throws(() => validateDataSemantics(impossible, "2026-07-23"), /impossible start date/);
  const reversed = fixture();
  reversed[0].phases[0].startISO = "2026-06-01";
  reversed[0].phases[0].endISO = "2026-05-01";
  assert.throws(() => validateDataSemantics(reversed, "2026-07-23"), /reversed date window/);
});

test("semantic validation rejects future provenance dates", () => {
  const future = fixture();
  future[0].lastVerifiedISO = "2026-07-24";
  assert.throws(() => validateDataSemantics(future, "2026-07-23"), /verified in the future/);
  future[0].lastVerifiedISO = null;
  future[0].sources[0].lastCheckedISO = "2026-07-24";
  assert.throws(() => validateDataSemantics(future, "2026-07-23"), /checked in the future/);
});

test("semantic validation enforces participation, rolling, and active-undated invariants", () => {
  const accepting = fixture();
  accepting[0].phases[0].acceptingNewTeams = true;
  accepting[0].phases[0].participation = false;
  assert.throws(() => validateDataSemantics(accepting, "2026-07-23"), /accepts teams/);
  const rolling = fixture();
  Object.assign(rolling[0].phases[0], { rolling: true, participation: false, state: "completed", endISO: null });
  assert.throws(() => validateDataSemantics(rolling, "2026-07-23"), /rolling phase/);
  const unverified = fixture();
  unverified[0].lastVerifiedISO = null;
  Object.assign(unverified[0].phases[0], { participation: true, state: "active", startISO: null, endISO: null });
  assert.throws(() => validateDataSemantics(unverified, "2026-07-23"), /active undated phase must be verified/);
});

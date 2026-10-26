import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { deriveChallengeState } from "../assets/challenge-core.js";

const data = JSON.parse(await readFile(new URL("../data/challenges.json", import.meta.url), "utf8"));
const get = (id) => data.find((challenge) => challenge.id === id);
const state = (id) => deriveChallengeState(get(id), "2026-10-25");

test("October review distinguishes new entry, restricted testing, and unconfirmed schedules", () => {
  for (const id of ["umud26", "owl27", "jrc27", "cellmapdream26", "lightmycells2", "cobra26"]) {
    assert.equal(state(id).status, "open", id);
    assert.equal(state(id).canJoinNow, true, id);
  }
  assert.equal(state("clearec26").status, "open");
  assert.equal(state("clearec26").canJoinNow, false);
  for (const id of ["fets27", "trials-report27", "bigmri26", "topbrainv2", "chimera-agent26", "learn2reg26", "doserad26"]) {
    assert.equal(state(id).status, "upcoming", id);
    assert.equal(state(id).canJoinNow, false, id);
  }
  for (const id of ["headline26", "selma3d26", "pengwin26", "topaneu26", "rsnaknee26", "medvidu26"]) {
    assert.equal(state(id).status, "closed", id);
  }
  for (const id of ["atm26", "rexgrounding26"]) assert.equal(state(id).status, "live", id);
  assert.equal(get("learn2reg26").lastVerifiedISO, "2026-07-31");
});

test("scored deadlines stay separate from debugging windows and unspecified dates", () => {
  assert.equal(state("owl27").finalSubmissionDeadline, "2026-11-30");
  assert.equal(get("owl27").phases.find((phase) => phase.id === "sanity").endISO, "2026-12-07");
  assert.equal(deriveChallengeState(get("owl27"), "2026-12-01").canJoinNow, false);
  assert.equal(state("jrc27").nextJoinDeadline, "2026-12-18");
  assert.equal(state("jrc27").finalSubmissionDeadline, "2027-01-29");
  assert.equal(state("fets27").finalSubmissionDeadline, "2027-07-31");
  assert.equal(state("trials-report27").finalSubmissionDeadline, "2027-09-10");
  assert.equal(state("topbrainv2").finalSubmissionDeadline, null);
  assert.equal(get("chimera-agent26").phases.find((phase) => phase.id === "round-2").startISO, null);
  assert.equal(get("chimera-agent26").phases.find((phase) => phase.id === "round-2").endISO, null);
});

test("additional events preserve eligibility and conflicting deadlines", () => {
  assert.equal(state("facevitals27").nextJoinDeadline, "2026-10-25");
  assert.equal(deriveChallengeState(get("facevitals27"), "2026-10-26").canJoinNow, false);
  assert.equal(state("prisma26").status, "open");
  assert.equal(state("prisma26").canJoinNow, false);
  assert.equal(state("prisma26").finalSubmissionDeadline, "2026-11-09");
  assert.equal(get("prisma26").dataAvailable, "evaluation-only");
  assert.equal(state("sipaimtem26").nextJoinDeadline, "2026-11-09");
  assert.equal(state("sipaimtem26").finalSubmissionDeadline, null);
  assert.match(get("sipaimtem26").statusNote, /13 Nov.*24 Nov/);
  for (const id of ["picai22", "cellseg22", "uls23"]) assert.equal(state(id).status, "live", id);
  for (const id of ["panther25", "trackrad25", "synthrad25", "toothfairy3"]) {
    assert.equal(state(id).status, "open", id);
    assert.notEqual(get(id).prizeType, "cash", `${id} must not advertise a new cash round`);
  }
});

test("filled metadata distinguishes withheld data, future releases and closed access", () => {
  assert.equal(get("echorisk26").dataAvailable, "registration-closed");
  for (const id of ["fets27", "trials-report27", "bigmri26", "jrc27"]) {
    assert.equal(get(id).dataAvailable, "not-yet-released", id);
  }
  assert.equal(get("doserad26").datasetSizeGB, 864);
  assert.equal(get("beetle").datasetSizeGB, 149.029);
  assert.equal(get("dalphin").datasetSizeGB, 1.175);
  assert.equal(get("synthoct26").datasetSizeGB, 0.038);
  assert.equal(state("fetus26").finalSubmissionDeadline, "2026-02-22");
  assert.equal(state("isles26").finalSubmissionDeadline, "2026-08-19");
});

test("expanded discovery separates ongoing evaluation from announced shared tasks", () => {
  for (const id of ["celltracking", "drac22", "amos22"]) {
    const result = deriveChallengeState(get(id), "2026-10-26");
    assert.equal(result.status, "live", id);
    assert.equal(result.canJoinNow, true, id);
    assert.equal(result.finalSubmissionDeadline, null, id);
    assert.notEqual(get(id).prizeType, "cash", id);
  }
  for (const id of ["imageclefcaption27", "imageclefgans27", "medvqagi27", "mediqa-magic27"]) {
    const challenge = get(id);
    const result = deriveChallengeState(challenge, "2026-10-26");
    assert.equal(result.status, "upcoming", id);
    assert.equal(result.canJoinNow, false, id);
    assert.equal(result.finalSubmissionDeadline, null, id);
    assert.equal(challenge.dataAvailable, "not-yet-released", id);
    assert.ok(challenge.phases.every(p => p.startISO === null && p.endISO === null), id);
  }
  assert.equal(get("celltracking").phases.find(p => p.id === "linking").startISO, "2026-10-15");
  assert.equal(get("drac22").datasetSizeGB, 2.239);
  assert.equal(get("amos22").datasetSizeGB, 24.234);
});

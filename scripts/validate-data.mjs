import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import Ajv2020 from "ajv/dist/2020.js";

const root = fileURLToPath(new URL("../", import.meta.url));

export function validDate(iso) {
  if (iso === null) return true;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || "")) return false;
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export function validateDataSemantics(data, validationToday) {
  assert.ok(validDate(validationToday), "validation date must be an ISO calendar date");
  const ids = data.map((item) => item.id);
  assert.equal(new Set(ids).size, ids.length, "Challenge IDs must be unique");
  const forbidden = ["status", "deadlineISO", "keyDates", "startISO", "endISO", "rolling", "startEstimated", "endEstimated"];
  for (const challenge of data) {
    for (const field of forbidden) assert.ok(!(field in challenge), `${challenge.id} retains legacy ${field}`);
    assert.ok(validDate(challenge.lastVerifiedISO), `${challenge.id} has an impossible verification date`);
    if (challenge.lastVerifiedISO) assert.ok(challenge.lastVerifiedISO <= validationToday, `${challenge.id} is verified in the future`);
    const sourceIds = new Set(challenge.sources.map((source) => source.id));
    assert.equal(sourceIds.size, challenge.sources.length, `${challenge.id} has duplicate source IDs`);
    for (const source of challenge.sources) {
      assert.ok(source.url.startsWith("https://"), `${challenge.id}/${source.id} must use HTTPS`);
      assert.ok(validDate(source.lastCheckedISO), `${challenge.id}/${source.id} has an impossible checked date`);
      if (source.lastCheckedISO) assert.ok(source.lastCheckedISO <= validationToday, `${challenge.id}/${source.id} was checked in the future`);
    }
    assert.equal(new Set(challenge.phases.map((phase) => phase.id)).size, challenge.phases.length, `${challenge.id} has duplicate phase IDs`);
    for (const phase of challenge.phases) {
      assert.ok(validDate(phase.startISO), `${challenge.id}/${phase.id} has an impossible start date`);
      assert.ok(validDate(phase.endISO), `${challenge.id}/${phase.id} has an impossible end date`);
      if (phase.startISO && phase.endISO) assert.ok(phase.startISO <= phase.endISO, `${challenge.id}/${phase.id} has a reversed date window`);
      for (const sourceId of phase.sourceIds) assert.ok(sourceIds.has(sourceId), `${challenge.id}/${phase.id} references missing source ${sourceId}`);
      if (phase.participation) {
        assert.ok(phase.sourceIds.some((id) => {
          const source = challenge.sources.find((item) => item.id === id);
          return source && ["organizer", "platform"].includes(source.type);
        }), `${challenge.id}/${phase.id} needs organizer or platform evidence`);
      }
      if (phase.acceptingNewTeams) assert.ok(phase.participation, `${challenge.id}/${phase.id} accepts teams but is not a participation phase`);
      if (phase.rolling) {
        assert.equal(phase.endISO, null, `${challenge.id}/${phase.id} rolling phase must be open-ended`);
        assert.ok(phase.participation, `${challenge.id}/${phase.id} rolling phase must allow participation`);
        assert.equal(phase.state, "active", `${challenge.id}/${phase.id} rolling phase must be active`);
      }
      if (phase.participation && phase.state === "active" && (!phase.startISO || !phase.endISO)) {
        assert.ok(challenge.lastVerifiedISO, `${challenge.id}/${phase.id} active undated phase must be verified`);
      }
    }
  }
  return true;
}

export async function validateFiles(validationToday = process.env.VALIDATION_TODAY || new Date().toISOString().slice(0, 10)) {
  const data = JSON.parse(await readFile(`${root}data/challenges.json`, "utf8"));
  const schema = JSON.parse(await readFile(`${root}data/challenges.schema.json`, "utf8"));
  const validate = new Ajv2020({ allErrors: true, strict: false }).compile(schema);
  if (!validate(data)) throw new AggregateError(validate.errors.map((error) => new Error(`${error.instancePath} ${error.message}`)), "Schema validation failed");
  validateDataSemantics(data, validationToday);
  console.log(`Schema v2 data is valid (${data.length} challenges).`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await validateFiles();
}

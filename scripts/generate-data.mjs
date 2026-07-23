import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const jsonPath = `${root}data/challenges.json`;
const jsPath = `${root}data/challenges.js`;
const data = JSON.parse(await readFile(jsonPath, "utf8"));
const generated = `/* Generated from data/challenges.json. Do not edit directly. */\nwindow.CHALLENGES = ${JSON.stringify(data, null, 2)};\n`;

if (process.argv.includes("--check")) {
  const current = await readFile(jsPath, "utf8");
  assert.equal(current, generated, "data/challenges.js is stale; run npm run generate:data");
  console.log(`Generated data is current (${data.length} challenges).`);
} else {
  await writeFile(jsPath, generated);
  console.log(`Generated data/challenges.js (${data.length} challenges).`);
}

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const pages = ["index.html", "tracker/index.html", "timeline/index.html"];
const failures = [];

for (const page of pages) {
  const html = await readFile(path.join(root, page), "utf8");
  const refs = [...html.matchAll(/(?:href|src)=["']([^"'#]+)["']/g)].map((match) => match[1]);
  for (const ref of refs) {
    if (/^(?:https?:|data:|mailto:|javascript:)/.test(ref) || ref.includes("${")) continue;
    const resolved = path.resolve(path.dirname(path.join(root, page)), ref.split(/[?#]/)[0]);
    try { await access(resolved); } catch { failures.push(`${page}: missing ${ref}`); }
  }
}

const data = JSON.parse(await readFile(path.join(root, "data/challenges.json"), "utf8"));
for (const challenge of data) {
  if (!challenge.url.startsWith("https://")) assert.equal(challenge.id, "csv26", `${challenge.id} primary URL must use HTTPS`);
  for (const source of challenge.sources || []) {
    if (!source.url.startsWith("https://")) assert.equal(challenge.id, "csv26", `${challenge.id}/${source.id} source must use HTTPS`);
  }
}
if (failures.length) throw new Error(`Broken internal links:\n${failures.join("\n")}`);
console.log(`Internal assets and ${data.length} challenge URLs are well formed.`);

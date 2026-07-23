import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const data = JSON.parse(await readFile(`${root}data/challenges.json`, "utf8"));
const urls = [...new Set(data.flatMap((challenge) => [challenge.url, ...challenge.sources.map((source) => source.url)]))];
const results = [];

async function probe(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const response = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(12_000),
        headers: { "user-agent": "Medical-Image-Challenge-Compilations link review" }
      });
      if (response.status < 400 || [401, 403, 405, 429].includes(response.status)) return { url, status: response.status, ok: true };
    } catch (error) {
      if (method === "GET") return { url, status: 0, ok: false, error: error.message };
    }
  }
  return { url, status: 0, ok: false, error: "No successful response" };
}

for (let index = 0; index < urls.length; index += 5) {
  results.push(...await Promise.all(urls.slice(index, index + 5).map(probe)));
}
const failed = results.filter((result) => !result.ok);
console.log(JSON.stringify({ checkedAt: new Date().toISOString(), total: results.length, failed }, null, 2));
if (failed.length) process.exitCode = 1;

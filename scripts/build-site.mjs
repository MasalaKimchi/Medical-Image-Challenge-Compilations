import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "server"), { recursive: true });
await mkdir(client, { recursive: true });

for (const entry of ["index.html", "favicon.svg", "og.png", "assets", "data", "tracker", "timeline"]) {
  await cp(resolve(root, entry), resolve(client, entry), { recursive: true });
}

await writeFile(resolve(dist, "server/index.js"), `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.endsWith("/")) url.pathname += "index.html";
    const response = await env.ASSETS.fetch(new Request(url, request));
    if (response.status !== 404) return response;
    return new Response("Not found", { status: 404, headers: { "content-type": "text/plain; charset=utf-8" } });
  }
};
`);

console.log("Built static Sites bundle in dist/.");

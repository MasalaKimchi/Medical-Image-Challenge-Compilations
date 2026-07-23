import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".css": "text/css; charset=utf-8" };

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    let relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    let target = path.resolve(root, relative || "index.html");
    if (!target.startsWith(root)) throw new Error("Invalid path");
    const info = await stat(target);
    if (info.isDirectory()) target = path.join(target, "index.html");
    response.writeHead(200, { "Content-Type": types[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-store" });
    createReadStream(target).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" }); response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Serving on http://127.0.0.1:${port}`));

import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const source = resolve("dist/server");
const destination = resolve("dist/client/_worker.js");
await mkdir(destination, { recursive: true });
for (const entry of await readdir(source, { withFileTypes: true })) {
  if (entry.name.startsWith(".") || entry.name === "wrangler.json") continue;
  await cp(resolve(source, entry.name), resolve(destination, entry.name), { recursive: true });
}

// Vite generates a Workers-specific config pointer, but Pages uses the root config.
await rm(".wrangler/deploy/config.json", { force: true });

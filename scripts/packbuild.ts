import { writeFileSync } from "node:fs";
import path from "node:path";
import { manifest } from "../src/manifest.js";

const __dirname = new URL(".", import.meta.url).pathname;

writeFileSync(
  path.resolve(__dirname, "../dist/manifest.json"),
  JSON.stringify(manifest, null, 2)
);

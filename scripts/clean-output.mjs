import { rmSync } from "node:fs";

for (const directory of [".next", "out"]) {
  rmSync(new URL(`../${directory}`, import.meta.url), { recursive: true, force: true });
}

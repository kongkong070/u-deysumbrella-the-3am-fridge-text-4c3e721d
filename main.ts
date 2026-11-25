// The 3AM Fridge Text — writes one line a smart fridge would text its
// owner at 3am to /output/entry.txt.
//
// The line: a small-voiced appliance, awake all night, with an opinion and
// no shame about sharing it. Fresh angle (no milk, no ice, no door left
// open): the leftovers have formed a union.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "3am: your leftovers have unionized and demand a warmer shelf and fewer midnight visits.";

function validate(line: string): void {
  // Mirror the kit gate (RULES.txt): UTF-8 text of 1 to 140 characters,
  // not only white space, on a single line.
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  // Only create the directory when missing; never remove or empty it —
  // on the grader it is a bind mount and removing it fails the run.
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();

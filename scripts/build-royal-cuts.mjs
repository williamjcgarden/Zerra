import { execFileSync } from "node:child_process";
import { cp, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const candidate = join(root, "review/royal-cuts-rebuild");
const destination = join(root, "public/demos/royal-cuts");
const temporary = await mkdtemp(join(tmpdir(), "royal-cuts-export-"));

try {
  // Build separately so the approved demo's CSS and dependencies stay isolated.
  execFileSync("npm", ["run", "build", "--", "--base", "/demos/royal-cuts/", "--outDir", temporary], {
    cwd: candidate,
    stdio: "inherit",
  });
  // This directory contains only this script's generated export.
  await rm(destination, { recursive: true, force: true });
  await cp(temporary, destination, { recursive: true });
  console.log("Royal Cuts exported locally to public/demos/royal-cuts; nothing deployed.");
} finally {
  await rm(temporary, { recursive: true, force: true });
}

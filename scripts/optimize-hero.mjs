import sharp from "sharp";
import { mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "../src/assets/hero-bg.jpg");
const outDir = resolve(__dirname, "../public/images");

mkdirSync(outDir, { recursive: true });

const widths = [640, 1280, 1920];

await Promise.all(
  widths.map((w) =>
    sharp(src)
      .resize(w)
      .webp({ quality: 82 })
      .toFile(resolve(outDir, `hero-bg-${w}.webp`))
      .then(() => console.log(`hero-bg-${w}.webp`))
  )
);

// JPG fallback at full resolution (1920w)
await sharp(src)
  .resize(1920)
  .jpeg({ quality: 85, progressive: true })
  .toFile(resolve(outDir, "hero-bg-1920.jpg"))
  .then(() => console.log("hero-bg-1920.jpg (fallback)"));

console.log("Done.");

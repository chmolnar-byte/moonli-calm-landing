import fs from "fs";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "../src/assets");

const files = ["Startseite1.png", "Startseite2.png", "Startseite3.png"];

/** Nur Randbereiche (Letterboxing), nie die Mitte mit dem Phone-Mockup. */
function inLetterboxZone(x, y, width, height) {
  const top = Math.floor(height * 0.12);
  const bottom = height - Math.floor(height * 0.12);
  const left = Math.floor(width * 0.06);
  const right = width - Math.floor(width * 0.06);
  return y < top || y >= bottom || x < left || x >= right;
}

function isLetterboxColor(r, g, b) {
  // Schwarze Balken oben/unten
  if (r < 55 && g < 55 && b < 55) return true;
  // Helles Letterboxing nur an den Rändern (nicht im App-UI)
  if (r > 238 && g > 235 && b > 228) return true;
  return false;
}

for (const file of files) {
  const input = path.join(assetsDir, file);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      if (inLetterboxZone(x, y, width, height) && isLetterboxColor(r, g, b)) {
        data[i + 3] = 0;
      }
    }
  }

  const base = file.replace(/\.(png|jpe?g)$/i, "");
  const tmp = path.join(assetsDir, `${base}.tmp.png`);
  const final = path.join(assetsDir, `${base}.png`);

  await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .png()
    .toFile(tmp);

  if (fs.existsSync(final)) fs.unlinkSync(final);
  fs.renameSync(tmp, final);
  console.log("OK (nur Ränder)", final, `${width}x${height}`);
}

// Hero-Kopien aktualisieren
const copies = [
  ["Startseite1.png", "hero-dashboard-weekly.png"],
  ["Startseite2.png", "hero-dashboard-dark.png"],
  ["Startseite3.png", "hero-dashboard-growth.png"],
];
for (const [src, dest] of copies) {
  fs.copyFileSync(path.join(assetsDir, src), path.join(assetsDir, dest));
}

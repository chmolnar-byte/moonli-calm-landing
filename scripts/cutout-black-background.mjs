import fs from "fs";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, "../src/assets");

const files = ["Startseite1.png", "Startseite2.png", "Startseite3.png"];

function isProtected(r, g, b) {
  return r >= 140 || g >= 140 || b >= 140;
}

function isRemovable(data, i, mode) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (isProtected(r, g, b)) return false;
  if (mode === "black") return r <= 28 && g <= 28 && b <= 28;
  return r >= 228 && g >= 224 && b >= 216;
}

function floodFillTransparent(data, width, height, mode) {
  const visited = new Uint8Array(width * height);
  const queue = [];

  const trySeed = (x, y) => {
    const idx = y * width + x;
    if (visited[idx]) return;
    const i = idx * 4;
    if (data[i + 3] === 0) return;
    if (!isRemovable(data, i, mode)) return;
    visited[idx] = 1;
    queue.push(idx);
  };

  for (let x = 0; x < width; x++) {
    trySeed(x, 0);
    trySeed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    trySeed(0, y);
    trySeed(width - 1, y);
  }

  while (queue.length) {
    const idx = queue.pop();
    data[idx * 4 + 3] = 0;

    const x = idx % width;
    const y = (idx - x) / width;
    for (const [nx, ny] of [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]) {
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const nidx = ny * width + nx;
      if (visited[nidx]) continue;
      const ni = nidx * 4;
      const r = data[ni];
      const g = data[ni + 1];
      const b = data[ni + 2];
      if (data[ni + 3] === 0 || !isRemovable(data, ni, mode)) continue;
      visited[nidx] = 1;
      queue.push(nidx);
    }
  }
}

for (const file of files) {
  const input = path.join(assetsDir, file);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  floodFillTransparent(data, width, height, "black");
  floodFillTransparent(data, width, height, "cream");

  const base = file.replace(/\.(png|jpe?g)$/i, "");
  const tmp = path.join(assetsDir, `${base}.out.tmp.png`);
  const final = path.join(assetsDir, `${base}.png`);

  await sharp(data, { raw: { width, height, channels: 4 } }).png().toFile(tmp);
  if (fs.existsSync(final)) fs.unlinkSync(final);
  fs.renameSync(tmp, final);
  console.log("OK", final);
}

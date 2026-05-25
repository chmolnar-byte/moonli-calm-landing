import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const logoPath = path.resolve("src/assets/logo.png");

await sharp(logoPath)
  .resize(96, 96, { fit: "inside", withoutEnlargement: true })
  .png()
  .toFile(path.join(publicDir, "favicon.png"));

await sharp(logoPath)
  .resize(180, 180, { fit: "inside", withoutEnlargement: true })
  .png()
  .toFile(path.join(publicDir, "apple-touch-icon.png"));

const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#182331"/>
      <stop offset="0.55" stop-color="#20364a"/>
      <stop offset="1" stop-color="#1f7f74"/>
    </linearGradient>
    <radialGradient id="glow" cx="70%" cy="20%" r="70%">
      <stop offset="0" stop-color="#72e0cf" stop-opacity="0.42"/>
      <stop offset="1" stop-color="#72e0cf" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="1030" cy="110" r="150" fill="#ffffff" opacity="0.05"/>
  <circle cx="170" cy="520" r="180" fill="#ffffff" opacity="0.04"/>
  <text x="90" y="135" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#8ff1de" letter-spacing="6">MOONLI</text>
  <text x="90" y="250" font-family="Arial, Helvetica, sans-serif" font-size="70" font-weight="800" fill="#ffffff">Baby Tracking,</text>
  <text x="90" y="330" font-family="Arial, Helvetica, sans-serif" font-size="70" font-weight="800" fill="#ffffff">Schlafprognose</text>
  <text x="90" y="410" font-family="Arial, Helvetica, sans-serif" font-size="70" font-weight="800" fill="#ffffff">&amp; Elternbegleitung</text>
  <text x="92" y="485" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="500" fill="#d7eee9">Für ruhigere Nächte und entspanntere Tage.</text>
</svg>`;

const logoBuffer = await sharp(logoPath)
  .resize(250, 250, { fit: "inside", withoutEnlargement: true })
  .png()
  .toBuffer();

await sharp(Buffer.from(ogSvg))
  .composite([{ input: logoBuffer, left: 860, top: 190 }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, "og-image.png"));

console.log("Generated favicon.png, apple-touch-icon.png and og-image.png");

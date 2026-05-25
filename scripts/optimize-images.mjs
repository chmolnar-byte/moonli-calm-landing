import path from "node:path";
import sharp from "sharp";

const assetsDir = path.resolve("src/assets");

const images = [
  { input: "logo.png", output: "logo.webp", width: 512, quality: 86 },
  { input: "capybara.png", output: "capybara.webp", width: 360, quality: 82 },
  { input: "capybara1.png", output: "capybara1.webp", width: 260, quality: 82 },
  { input: "capybara2.png", output: "capybara2.webp", width: 240, quality: 82 },
  { input: "Startseite1.png", output: "Startseite1.webp", height: 1600, quality: 82 },
  { input: "Startseite2.png", output: "Startseite2.webp", height: 1600, quality: 82 },
  { input: "Startseite3.png", output: "Startseite3.webp", height: 1600, quality: 82 },
  { input: "sleep-prognose.png", output: "sleep-prognose.webp", height: 1600, quality: 82 },
  { input: "elternbereich.png", output: "elternbereich.webp", height: 1600, quality: 82 },
  { input: "wissen.png", output: "wissen.webp", height: 1600, quality: 82 },
  { input: "entertainment.png", output: "entertainment.webp", height: 1600, quality: 82 },
  { input: "babyexpo-2026.png", output: "babyexpo-2026.webp", width: 900, quality: 84 },
];

for (const image of images) {
  const inputPath = path.join(assetsDir, image.input);
  const outputPath = path.join(assetsDir, image.output);
  const resize = {
    width: image.width,
    height: image.height,
    fit: "inside",
    withoutEnlargement: true,
  };

  await sharp(inputPath)
    .resize(resize)
    .webp({ quality: image.quality, effort: 6 })
    .toFile(outputPath);

  console.log(`${image.input} -> ${image.output}`);
}

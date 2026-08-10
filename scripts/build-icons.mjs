/**
 * Favicon ve Apple dokunmatik ikonunu üretir.
 *
 *   node scripts/build-icons.mjs
 *
 * Geometri `src/components/ui/BrandMark.tsx` içindeki `BRAND_PATH`'ten
 * okunur — marka şeklinin tek kaynağı orasıdır. Böylece header'daki
 * monogramla favicon asla birbirinden ayrı düşmez.
 *
 * Çıktılar çalışma anında değil, bir kez üretilip depoya yazılır:
 *   src/app/icon.png        96×96   (tarayıcı sekmesi)
 *   src/app/apple-icon.png  180×180 (iOS ana ekran)
 *   public/brand/mark.svg   ölçeklenebilir kaynak
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import sharp from "sharp";

/* ----------------------------------------------- Geometriyi tek yerden al */

const source = readFileSync("src/components/ui/BrandMark.tsx", "utf8");

const viewBox = source.match(/BRAND_VIEWBOX = "([^"]+)"/)?.[1];

// BRAND_PATH tek dize ya da yorumlu bir dizi olabilir; her iki biçimi de destekle
const pathBlock = source.match(/BRAND_PATH =([\s\S]*?);\n/)?.[1];
const path = pathBlock
  ? [...pathBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]).join(" ")
  : undefined;

if (!viewBox || !path) {
  throw new Error(
    "BrandMark.tsx içinden BRAND_VIEWBOX / BRAND_PATH okunamadı — " +
      "sabitlerin adı veya biçimi değişmiş olabilir.",
  );
}

const [, , markW, markH] = viewBox.split(" ").map(Number);

/* -------------------------------------------------------------- Squircle */

const SIZE = 512;
const RADIUS = Math.round(SIZE * 0.2237); // Apple squircle oranı
const MARK_WIDTH_RATIO = 0.6; // ikon genişliğinin ne kadarını kaplasın

const scale = (SIZE * MARK_WIDTH_RATIO) / markW;
const tx = (SIZE - markW * scale) / 2;
const ty = (SIZE - markH * scale) / 2;

/** Koyu squircle + açık gövdeli monogram — her iki tema altında da okunur. */
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#16213c"/>
      <stop offset="0.5" stop-color="#0c1424"/>
      <stop offset="1" stop-color="#080d18"/>
    </linearGradient>
    <radialGradient id="halo" cx="0.5" cy="0.42" r="0.62">
      <stop offset="0" stop-color="#2f7cf6" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#2f7cf6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#22d3ee"/>
      <stop offset="0.55" stop-color="#93d3fb"/>
      <stop offset="1" stop-color="#ffffff"/>
    </linearGradient>
  </defs>
  <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" fill="url(#bg)"/>
  <rect width="${SIZE}" height="${SIZE}" rx="${RADIUS}" fill="url(#halo)"/>
  <g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${scale.toFixed(4)})">
    <path d="${path}" fill="url(#mark)" fill-rule="evenodd"/>
  </g>
</svg>`;

/** Kapsız, ölçeklenebilir marka — currentColor ile her yerde kullanılabilir. */
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">
  <defs>
    <linearGradient id="m" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#2f7cf6"/>
      <stop offset="0.55" stop-color="#1b4fd8"/>
      <stop offset="1" stop-color="#0a0d14"/>
    </linearGradient>
  </defs>
  <path d="${path}" fill="url(#m)" fill-rule="evenodd"/>
</svg>`;

/* ---------------------------------------------------------------- Yazma */

const buffer = Buffer.from(iconSvg);

await sharp(buffer)
  .resize(96, 96)
  .png({ compressionLevel: 9 })
  .toFile("src/app/icon.png");

await sharp(buffer)
  .resize(180, 180)
  .flatten({ background: "#0c1424" }) // iOS saydamlığı desteklemiyor
  .png({ compressionLevel: 9 })
  .toFile("src/app/apple-icon.png");

mkdirSync("public/brand", { recursive: true });
writeFileSync("public/brand/mark.svg", markSvg);
writeFileSync("public/brand/icon.svg", iconSvg);

console.log("Üretildi:");
for (const file of [
  "src/app/icon.png",
  "src/app/apple-icon.png",
  "public/brand/mark.svg",
  "public/brand/icon.svg",
]) {
  console.log("  " + file);
}

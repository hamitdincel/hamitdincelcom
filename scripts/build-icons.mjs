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
 *   public/favicon.ico      16/32/48 (aşağıdaki nota bak)
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

/**
 * favicon.ico — `public/` içine, Next'in app/icon yoluna DEĞİL.
 *
 * Tarayıcılar `<link rel="icon">` etiketi olsa bile kök dizindeki
 * `/favicon.ico` adresini yoklamayı sürdürüyor. Dosya yoksa bu istek
 * Next'e gidiyor ve 45 KB'lık 404 sayfası üretiliyor — sayfa başına bir
 * kez, üstelik HTML ile aynı anda. Sunucudaki nginx proxy'ye giden
 * eşzamanlı istekleri çok dar sınırladığı için bu bedava istek gerçek
 * sayfa isteğiyle yarışıyordu.
 *
 * `public/` altında ve `.ico` uzantılı olduğunda nginx dosyayı doğrudan
 * diskten veriyor: Next'e hiç uğramıyor, sınıra takılmıyor.
 *
 * sharp .ico yazamıyor. ICO zaten ince bir kapsayıcı: 6 baytlık başlık,
 * her boyut için 16 baytlık dizin girdisi, ardından gömülü PNG'ler.
 * Elle kurmak dışarıdan bir bağımlılık eklemekten basit.
 */
const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(
  icoSizes.map((size) =>
    sharp(buffer).resize(size, size).png({ compressionLevel: 9 }).toBuffer(),
  ),
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // ayrılmış
header.writeUInt16LE(1, 2); // tür: 1 = ikon
header.writeUInt16LE(icoSizes.length, 4);

let offset = 6 + 16 * icoSizes.length;
const entries = icoSizes.map((size, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size === 256 ? 0 : size, 0); // genişlik (256 → 0)
  entry.writeUInt8(size === 256 ? 0 : size, 1); // yükseklik
  entry.writeUInt8(0, 2); // palet yok
  entry.writeUInt8(0, 3); // ayrılmış
  entry.writeUInt16LE(1, 4); // renk düzlemi
  entry.writeUInt16LE(32, 6); // bit derinliği
  entry.writeUInt32LE(icoPngs[i].length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += icoPngs[i].length;
  return entry;
});

writeFileSync("public/favicon.ico", Buffer.concat([header, ...entries, ...icoPngs]));

mkdirSync("public/brand", { recursive: true });
writeFileSync("public/brand/mark.svg", markSvg);
writeFileSync("public/brand/icon.svg", iconSvg);

console.log("Üretildi:");
for (const file of [
  "src/app/icon.png",
  "src/app/apple-icon.png",
  "public/favicon.ico",
  "public/brand/mark.svg",
  "public/brand/icon.svg",
]) {
  console.log("  " + file);
}

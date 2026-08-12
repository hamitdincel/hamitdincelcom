/**
 * public/images altındaki görselleri sitede gösterildikleri boyuta indirir.
 *
 *   node scripts/optimize-images.mjs
 *
 * NEDEN: Site görselleri artık çalışma anında optimize edilmiyor
 * (next.config.ts → images.unoptimized). Tarayıcıya ne gönderileceği
 * doğrudan bu dosyaların kendisi, o yüzden kaynakların makul boyutta
 * olması gerekiyor.
 *
 * Ölçüler sitedeki en büyük gösterim boyutundan türedi:
 *   ekran görüntüleri  en fazla 300 CSS px genişlikte → 780 px (2.6x retina)
 *   uygulama simgeleri en fazla  80 CSS px genişlikte → 256 px (3.2x retina)
 *
 * Script tekrar tekrar çalıştırılabilir: hedef genişliğe inmiş dosyalara
 * dokunmaz. Bu önemli, çünkü JPEG'i yeniden sıkıştırmak her seferinde
 * kalite kaybeder.
 */

import { readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import { join, extname, basename } from "node:path";
import sharp from "sharp";

/** Klasör → o klasördeki görsellerin hedef genişliği ve JPEG kalitesi */
const RULES = [
  { dir: "public/images/shots", width: 780, quality: 78 },
  { dir: "public/images", width: 256, quality: 82 },
];

const kb = (n) => Math.round(n / 1024) + " KB";
let before = 0;
let after = 0;
let skipped = 0;

for (const { dir, width, quality } of RULES) {
  const files = readdirSync(dir)
    .filter((f) => extname(f).toLowerCase() === ".jpg")
    .map((f) => join(dir, f))
    .filter((f) => statSync(f).isFile());

  for (const file of files) {
    const size = statSync(file).size;
    const meta = await sharp(file).metadata();

    if (meta.width <= width) {
      skipped++;
      continue;
    }

    // Aynı dosyaya hem okuyup hem yazmak bozulmaya yol açar; geçici dosya üzerinden.
    const tmp = join(dir, `.${basename(file)}.tmp`);
    await sharp(file)
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toFile(tmp);

    const newSize = statSync(tmp).size;
    if (newSize >= size) {
      // Küçülmediyse dokunma — orijinali korumak daha iyi.
      unlinkSync(tmp);
      skipped++;
      continue;
    }

    renameSync(tmp, file);
    before += size;
    after += newSize;
    console.log(
      `  ${file}  ${meta.width}px ${kb(size)} → ${width}px ${kb(newSize)}`,
    );
  }
}

if (before === 0) {
  console.log(`Değişiklik yok — ${skipped} dosya zaten hedef boyutta.`);
} else {
  const pct = Math.round((1 - after / before) * 100);
  console.log(
    `\n${kb(before)} → ${kb(after)}  (%${pct} küçüldü, ${skipped} dosya atlandı)`,
  );
}

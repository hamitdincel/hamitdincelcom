/**
 * `output: "standalone"` çıktısını tamamlar.
 *
 * Next standalone klasörüne YALNIZCA sunucu kodunu ve önceden üretilmiş
 * sayfaları yazar; tarayıcıya servis edilen iki klasörü kopyalamaz:
 *
 *   .next/static   — derlenmiş JS/CSS ve optimize edilmiş görseller
 *   public/        — ham görseller, favicon, robots kaynakları
 *
 * Bu eksik bir kez canlıda soruna yol açtı: `git pull && npm run build`
 * sonrası HTML tazelendi ama yeni eklenen görseller 404 döndü, çünkü
 * ayaktaki süreç standalone içindeki eski `public/` kopyasını okuyordu.
 * O yüzden kopyalama artık `postbuild` olarak otomatik çalışıyor.
 *
 * Hedefler her seferinde silinip yeniden yazılıyor: `cp -r` ile üzerine
 * kopyalamak silinmiş dosyaları geride bırakır ve iç içe klasör üretir.
 */

import { cpSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const STANDALONE = ".next/standalone";

if (!existsSync(STANDALONE)) {
  // output: "standalone" kapalıysa yapacak bir şey yok — build'i düşürme.
  console.log("standalone çıktısı yok, kopyalama atlandı.");
  process.exit(0);
}

/** Kaynağı hedefe birebir yansıtır; hedefte kalan artıkları temizler. */
function mirror(from, to) {
  if (!existsSync(from)) return;
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
  console.log(`  ${from} → ${to}`);
}

console.log("standalone tamamlanıyor:");
mirror(".next/static", join(STANDALONE, ".next/static"));
mirror("public", join(STANDALONE, "public"));

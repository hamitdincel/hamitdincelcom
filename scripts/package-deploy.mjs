/**
 * Sunucuya yüklenecek paketi hazırlar.
 *
 *   npm run build
 *   npm run package        # => deploy/ klasörü + deploy.tar.gz
 *
 * `output: "standalone"` çıktısı kendi başına eksiktir: Next, `.next/static`
 * ve `public/` klasörlerini oraya kopyalamaz. Bu script o boşluğu doldurup
 * sunucuya olduğu gibi taşınabilecek tek bir klasör üretir.
 *
 * Sonuç klasörünün içindekiler sunucuda şu komutla çalışır:
 *   NODE_ENV=production PORT=3000 node server.js
 */

import { cpSync, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const OUT = "deploy";

if (!existsSync(".next/standalone")) {
  throw new Error(
    'Önce "npm run build" çalıştırın. (.next/standalone bulunamadı — ' +
      'next.config.ts içinde output: "standalone" tanımlı olmalı.)',
  );
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

/* 1. Minimal sunucu + gerekli node_modules */
cpSync(".next/standalone", OUT, { recursive: true });

/* 2. Tarayıcıya servis edilen derlenmiş varlıklar */
cpSync(".next/static", join(OUT, ".next/static"), { recursive: true });

/* 3. Görseller, brand dosyaları, favicon kaynakları */
if (existsSync("public")) {
  cpSync("public", join(OUT, "public"), { recursive: true });
}

/* 4. Sunucu tarafı yapılandırmaları da pakete girsin */
for (const file of ["ecosystem.config.cjs", "deploy-nginx.conf"]) {
  if (existsSync(file)) cpSync(file, join(OUT, file));
}

/* 5. Sunucuda ne yapılacağını klasörün içine not düş */
writeFileSync(
  join(OUT, "BASLAT.txt"),
  [
    "Bu klasör sunucuda tek başına çalışır; npm install gerekmez.",
    "",
    "  NODE_ENV=production PORT=3000 node server.js",
    "",
    "PM2 ile kalıcı çalıştırmak için:",
    "",
    "  pm2 start server.js --name hamitdincel --update-env \\",
    "    --node-args=\"--enable-source-maps\" -- --port 3000",
    "  pm2 save",
    "",
    "Önünde nginx reverse proxy olmalı (bkz. deploy-nginx.conf).",
    "",
  ].join("\n"),
);

/* 6. Tek dosyada taşınabilsin */
execFileSync("tar", ["-czf", "deploy.tar.gz", "-C", OUT, "."], {
  stdio: "inherit",
});

const mb = (p) => {
  const out = execFileSync("du", ["-sk", p]).toString().split("\t")[0];
  return (Number(out) / 1024).toFixed(1) + " MB";
};

console.log("\nHazır:");
console.log(`  ${OUT}/          ${mb(OUT)}`);
console.log(`  deploy.tar.gz   ${(statSync("deploy.tar.gz").size / 1024 / 1024).toFixed(1)} MB`);
console.log("\nSunucuya taşıyıp açın:");
console.log("  scp deploy.tar.gz kullanici@sunucu:/var/www/hamitdincel/");
console.log("  ssh kullanici@sunucu");
console.log("  cd /var/www/hamitdincel && tar -xzf deploy.tar.gz && rm deploy.tar.gz");

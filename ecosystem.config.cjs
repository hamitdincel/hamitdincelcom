/**
 * PM2 yapılandırması — siteyi sunucuda kalıcı çalıştırır.
 *
 * Kurulu süreç zaten varsa buna dokunmaya gerek yok; dağıtım şu:
 *
 *   cd ~/www/hamitdincel.com
 *   git checkout -- package-lock.json && git pull origin main
 *   npm install && npm run build
 *   pm2 reload hamitdincel
 *
 * Sıfırdan kurmak ya da mevcut tanımı düzeltmek gerekirse:
 *
 *   pm2 delete hamitdincel        # varsa
 *   pm2 start ecosystem.config.cjs
 *   pm2 save
 *   pm2 startup                   # sunucu yeniden başlayınca kalksın (sudo ister)
 *
 * Durum ve günlükler:
 *   pm2 status
 *   pm2 logs hamitdincel --lines 50
 */

module.exports = {
  apps: [
    {
      name: "hamitdincel",

      /**
       * `next start`. Standalone çıktısı kullanılmıyor (bkz. next.config.ts),
       * bu yüzden başlatma komutu da doğrudan Next'in kendi sunucusu.
       */
      script: "node_modules/next/dist/bin/next",
      args: "start",

      /** Bu dosya deponun kökünde; yol sabitlemeye gerek yok. */
      cwd: __dirname,

      // Site statik üretildiği için tek süreç fazlasıyla yeterli.
      instances: 1,
      exec_mode: "fork",

      env: {
        NODE_ENV: "production",

        /**
         * nginx bu adrese proxy'liyor (FastPanel → Ayarlar → Backend).
         * Değiştirilecekse iki tarafın birlikte değişmesi gerekir.
         */
        PORT: 3004,
        HOSTNAME: "127.0.0.1",
      },

      // Bellek kaçağına karşı emniyet supabı
      max_memory_restart: "400M",

      // Çökerse yeniden başlat, ama sonsuz döngüye girme
      autorestart: true,
      max_restarts: 10,
      min_uptime: "20s",

      merge_logs: true,
      time: true,
    },
  ],
};

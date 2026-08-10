/**
 * PM2 yapılandırması — siteyi sunucuda kalıcı çalıştırır.
 *
 * Bu dosya `npm run package` çıktısıyla birlikte sunucuya taşınmalı ve
 * uygulamanın açıldığı klasörden çalıştırılmalıdır:
 *
 *   cd /var/www/hamitdincel
 *   pm2 start ecosystem.config.cjs
 *   pm2 save                 # mevcut süreç listesini kaydet
 *   pm2 startup              # sunucu yeniden başlayınca otomatik ayağa kalksın
 *
 * Durum ve günlükler:
 *   pm2 status
 *   pm2 logs hamitdincel
 *   pm2 reload hamitdincel   # kesintisiz yeniden başlatma
 */

module.exports = {
  apps: [
    {
      name: "hamitdincel",

      // standalone çıktısının ürettiği minimal sunucu
      script: "server.js",
      cwd: "/var/www/hamitdincel",

      // Site statik üretildiği için tek süreç fazlasıyla yeterli.
      // Trafik artarsa "cluster" moduna ve instances: "max"'a geçilebilir.
      instances: 1,
      exec_mode: "fork",

      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // Yalnızca yerel ağdan dinle; dışarıya nginx açıyor
        HOSTNAME: "127.0.0.1",
      },

      // Bellek kaçağına karşı emniyet supabı
      max_memory_restart: "400M",

      // Çökerse yeniden başlat, ama sonsuz döngüye girme
      autorestart: true,
      max_restarts: 10,
      min_uptime: "20s",

      // Günlükler
      out_file: "/var/log/hamitdincel/out.log",
      error_file: "/var/log/hamitdincel/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};

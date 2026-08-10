import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Kendi sunucumuzda çalıştırdığımız için `standalone` çıktısı alıyoruz.
   *
   * Next, `.next/standalone` altına yalnızca çalışması için gereken dosyaları
   * (minimal bir server.js + kullanılan node_modules) kopyalar. Sunucuya
   * 500 MB'lık `node_modules` yüklemek yerine ~50 MB'lık bir paket taşınıyor
   * ve sunucuda `npm install` çalıştırmaya gerek kalmıyor.
   *
   * Dikkat: `.next/static` ve `public/` bu klasöre KOPYALANMAZ; dağıtım
   * sırasında elle taşınmaları gerekir (bkz. scripts/package-deploy.mjs).
   */
  output: "standalone",

  /**
   * Sunucuda üretilen görsellerin önbellek süresi (saniye).
   * Ekran görüntüleri değişmediği için uzun tutmak CPU'yu koruyor.
   */
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  /** `X-Powered-By: Next.js` başlığını göndermeye gerek yok. */
  poweredByHeader: false,

  /** Kaynak haritaları sunucuda gereksiz yer kaplamasın. */
  productionBrowserSourceMaps: false,
};

export default nextConfig;

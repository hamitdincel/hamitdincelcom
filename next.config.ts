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
   * sırasında `postbuild` adımı kopyalıyor (scripts/sync-standalone.mjs).
   */
  output: "standalone",

  /**
   * Görseller çalışma anında optimize EDİLMİYOR.
   *
   * Açıkken `next/image`, her görsel için `/_next/image?url=...` adresini
   * üretiyor. Bu adresin uzantısı olmadığı için sunucudaki nginx onu diskte
   * bulamıyor ve Node'a proxy'liyor; proxy tarafında ise bir istek hızı
   * sınırı var. Ana sayfa tek açılışta 141 tane böyle istek yaptığı için
   * görsellerin büyük kısmı 503 dönüyordu — ziyaretçide "görseller bir
   * geliyor bir gitmiyor" olarak görünüyordu.
   *
   * Kapatınca `next/image` doğrudan `/images/...jpg` adresini yazıyor.
   * Uzantılı olduğu için nginx bunu diskten servis ediyor: sınıra takılmıyor,
   * Node'a hiç uğramıyor. Ölçüm: uzantılı istekler 24/24 başarılı,
   * proxy'ye giden istekler 2/24.
   *
   * Bedeli, boyutlandırmanın build öncesinde yapılması gerekmesi.
   * Kaynak dosyalar `scripts/optimize-images.mjs` ile sitede gösterildikleri
   * boyuta indirildi (4961 KB → 1793 KB). Yeni görsel eklerken o script
   * çalıştırılmalı.
   */
  images: {
    unoptimized: true,
  },

  /** `X-Powered-By: Next.js` başlığını göndermeye gerek yok. */
  poweredByHeader: false,

  /** Kaynak haritaları sunucuda gereksiz yer kaplamasın. */
  productionBrowserSourceMaps: false,
};

export default nextConfig;

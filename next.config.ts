import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `output: "standalone"` BİLEREK kullanılmıyor.
   *
   * Standalone çıktısının tek faydası sunucuya `node_modules` taşımamaktır.
   * Bizim dağıtımımızda sunucuda zaten `npm install` + `next build`
   * çalışıyor, yani `node_modules` orada olmak zorunda — kazandırdığı bir
   * şey yok. Karşılığında iki tuzak getiriyordu:
   *
   *   1. `.next/static` ve `public/` klasörlerini standalone klasörüne
   *      kopyalamayı Next üstlenmiyor. Bir kez unutuldu ve canlıda yeni
   *      eklenen görseller 404 döndü.
   *   2. Uygulamayı `next start` ile başlatmak standalone çıktısıyla
   *      çalışmıyor. PM2 sunucuda tam olarak bunu yapıyordu; günlüğe
   *      sürekli `"next start" does not work with "output: standalone"`
   *      uyarısı düşüyordu.
   *
   * Kaldırınca `next start` doğru komut hâline geliyor, kopyalama adımına
   * gerek kalmıyor ve sunucudaki PM2 tanımına dokunmak gerekmiyor.
   */

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

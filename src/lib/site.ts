import type { NavItem } from "./types";

export const site = {
  name: "Hamit Dincel",
  initials: "HD",
  role: "Mobil Uygulama Geliştirici",
  email: "iletisim@hamitdincel.com",

  /**
   * Telefon üç farklı biçimde tutuluyor:
   *   display  — ekranda okunan Türkçe gösterim
   *   tel      — tel: bağlantısı için uluslararası biçim
   *   whatsapp — wa.me yalnızca rakam kabul eder, baştaki 0 yerine ülke kodu
   */
  phone: {
    display: "0507 453 14 14",
    tel: "+905074531414",
    whatsapp: "905074531414",
  },
  location: "Türkiye · Uzaktan çalışmaya uygun",

  /**
   * Kanonik adres — `www` DAHİL, bilerek.
   *
   * Sunucu `hamitdincel.com` isteğini `www.hamitdincel.com`'a 301
   * yönlendiriyor. Burada kök alan adı yazdığı sürece site Google'a
   * "kanonik adresim şu" deyip o adresi kendinden kaçırıyordu: canonical
   * etiketi, sitemap'teki 11 adres ve OG adresleri hep 301 dönüyordu.
   * Google bu çelişkiyi kendince çözüp `www`'yi indeksledi.
   *
   * Buradaki değer canonical, sitemap, robots, OG ve JSON-LD'nin tek
   * kaynağı. Yönlendirme yönü sunucuda değiştirilirse burası da
   * değişmeli — ikisi ayrı düşerse aynı çelişki geri gelir.
   */
  url: "https://www.hamitdincel.com",
  description:
    "Hamit Dincel — iOS ve Android native mobil uygulama geliştiricisi. Fikirden App Store ve Google Play'de yayına kadar tek elden: mobil uygulama, REST API, backend ve web.",
} as const;

export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Proje Talebi",
)}&body=${encodeURIComponent("Merhaba Hamit,\n\nProjem hakkında kısaca:\n")}`;

export const telHref = `tel:${site.phone.tel}`;

/** Hazır giriş metniyle WhatsApp sohbeti açar. */
export const whatsappHref = `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(
  "Merhaba Hamit, hamitdincel.com üzerinden yazıyorum. Bir uygulama projesi hakkında konuşmak istiyorum.",
)}`;

/** Menüdeki bağlantılar — hepsi gerçek sayfa, kaydırma bağlantısı yok. */
export const navItems: NavItem[] = [
  { label: "Hakkımda", href: "/hakkimda" },
  { label: "Hizmetler", href: "/hizmetler" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Süreç", href: "/surec" },
  { label: "İletişim", href: "/iletisim" },
];

export const footerNavItems: NavItem[] = [
  ...navItems.slice(0, 4),
  { label: "Teknolojiler", href: "/teknolojiler" },
  { label: "SSS", href: "/sss" },
  { label: "İletişim", href: "/iletisim" },
];

/** sitemap.xml için — proje sayfaları ayrıca `projects.ts`'ten ekleniyor. */
export const staticRoutes = [
  "/",
  "/hakkimda",
  "/hizmetler",
  "/referanslar",
  "/surec",
  "/teknolojiler",
  "/sss",
  "/iletisim",
] as const;

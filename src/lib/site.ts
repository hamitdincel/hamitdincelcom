import type { NavItem } from "./types";

export const site = {
  name: "Hamit Dincel",
  initials: "HD",
  role: "Mobil Uygulama Geliştirici",
  email: "hamitdincel@gmail.com",
  location: "Türkiye · Uzaktan çalışmaya uygun",
  url: "https://hamitdincel.com",
  description:
    "Hamit Dincel — iOS ve Android native mobil uygulama geliştiricisi. Fikirden App Store ve Google Play'de yayına kadar tek elden: mobil uygulama, REST API, backend ve web.",
} as const;

export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  "Proje Talebi",
)}&body=${encodeURIComponent("Merhaba Hamit,\n\nProjem hakkında kısaca:\n")}`;

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

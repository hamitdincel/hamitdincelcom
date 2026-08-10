import type { LucideIcon } from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  /** Başlığın altındaki teknik satır — "iOS / Android · SwiftUI / Compose" */
  stackLine: string;
  description: string;
  bullets: string[];
};

/** Hero altındaki yetenek şeridi — uydurma sayı yerine yetkinlik */
export type Capability = {
  index: string;
  title: string;
  detail: string;
};

/** Telefon kompozisyonunun çevresindeki mini teknoloji kartları */
export type HeroTech = {
  icon: LucideIcon;
  label: string;
  sub: string;
};

export type StoreLinks = {
  appStore: string;
  googlePlay: string;
};

/** Detay sayfasındaki galeride yer alan tek bir uygulama ekranı */
export type ProjectScreen = {
  src: string;
  /** Ekranın adı — "Ana sayfa", "Haber detayı" … */
  title: string;
  /** Ekranda ne olduğunu ve neden öyle kurgulandığını anlatan kısa not */
  caption: string;
};

export type ProjectMeta = {
  label: string;
  value: string;
};

/** Detay sayfasındaki "Teknik kararlar" bloğu */
export type TechDecision = {
  title: string;
  body: string;
};

export type TechGroup = {
  label: string;
  items: string[];
};

export type Project = {
  /** URL parçası — /referanslar/<slug> */
  slug: string;
  name: string;
  /** Kart ve detay başlığının altındaki tek cümlelik özet */
  tagline: string;
  category: string;
  platforms: string;
  icon: string;
  /** Ana sayfadaki referans bölümünde görünen paragraf */
  summary: string;
  /** Detay sayfasının giriş paragrafları */
  overview: string[];
  challenge: { title: string; body: string };
  approach: { title: string; body: string };
  /** Case study: bu projede üstlendiğim iş */
  role: { title: string; body: string };
  /** Case study: ne teslim edildi — metrik iddiası değil, kapsam */
  delivery: { title: string; body: string };
  features: { title: string; detail: string }[];
  decisions: TechDecision[];
  meta: ProjectMeta[];
  /** İlk üçü ana sayfadaki telefon yelpazesinde kullanılır */
  screens: ProjectScreen[];
  tags: string[];
  stack: TechGroup[];
  links: StoreLinks;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};


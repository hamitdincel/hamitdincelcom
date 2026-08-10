import type { Metadata } from "next";

import { profile } from "./content";
import type { Project } from "./types";
import { site } from "./site";

/* ------------------------------------------------------------------ Metadata */

type PageMetaInput = {
  title: string;
  description: string;
  /** Sitenin kökünden itibaren yol — "/hizmetler" */
  path: string;
};

/**
 * Alt sayfalar için ortak metadata üreteci.
 * `title.template` kök layout'ta tanımlı olduğu için burada yalnızca
 * sayfa adı veriliyor; sonuna "— Hamit Dincel" otomatik ekleniyor.
 */
export function pageMetadata({
  title,
  description,
  path,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: `${title} — ${site.name}`,
      description,
    },
  };
}

export function projectMetadata(project: Project): Metadata {
  const path = `/referanslar/${project.slug}`;

  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: `${project.name} — ${site.name}`,
      description: project.tagline,
    },
  };
}

/* ------------------------------------------------------------------- JSON-LD */

/** JSON-LD'yi <script> içine gömerken kullanılacak güvenli serileştirme. */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

/**
 * Kişi şeması.
 *
 * Not: `makesOffer` bilerek kullanılmıyor — `Offer` fiyat/koşul taşıyan bir
 * teklifi tanımlar; sitede ilan edilmiş fiyat yok. Sunulan hizmetler
 * `/hizmetler` sayfasında ayrıca `Service` şemasıyla işaretleniyor.
 */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  email: site.email,
  jobTitle: site.role,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.university,
  },
  knowsAbout: [
    "iOS",
    "Android",
    "SwiftUI",
    "Kotlin",
    "Jetpack Compose",
    "REST API",
    ".NET",
    "ASP.NET Core",
    "Next.js",
  ],
};

/** `/hizmetler` sayfasında gerçekten listelenen hizmetler. */
export function servicesJsonLd(services: { title: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hizmetler",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": `${site.url}/#person` },
        areaServed: "TR",
      },
    })),
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    applicationCategory: "MobileApplication",
    operatingSystem: "iOS, Android",
    description: project.summary,
    author: { "@id": `${site.url}/#person` },
    url: `${site.url}/referanslar/${project.slug}`,
    sameAs: [project.links.appStore, project.links.googlePlay],
  };
}

/** Kırıntı navigasyonu — sayfadaki görsel breadcrumb ile birebir aynı. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}

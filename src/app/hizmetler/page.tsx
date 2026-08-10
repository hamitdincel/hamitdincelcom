import type { Metadata } from "next";

import { services } from "@/lib/content";
import { jsonLdScript, pageMetadata, servicesJsonLd } from "@/lib/seo";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = pageMetadata({
  title: "Hizmetler",
  description:
    "Mobil uygulama geliştirme, REST API ve backend, web sitesi ve yönetim paneli, entegrasyon ve mağaza yayını.",
  path: "/hizmetler",
});

export default function ServicesPage() {
  return (
    <>
      {/* Sayfada fiilen listelenen hizmetler — fiyat ilan edilmediği için
          Offer değil Service şeması kullanılıyor. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(servicesJsonLd(services))}
      />
      <Services asPage />
    </>
  );
}

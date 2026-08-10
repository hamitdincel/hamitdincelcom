import type { Metadata } from "next";

import { faqItems } from "@/lib/content";
import { faqJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = pageMetadata({
  title: "Sık Sorulan Sorular",
  description:
    "Süre, maliyet, native tercihi, kod sahipliği ve yayın sonrası destek hakkında en çok sorulanlar.",
  path: "/sss",
});

export default function FaqPage() {
  return (
    <>
      {/* Sayfadaki soruların birebir aynısı — arama sonuçlarında açılır cevap */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(faqJsonLd(faqItems))}
      />
      <Faq asPage />
    </>
  );
}

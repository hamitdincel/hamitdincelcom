import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = pageMetadata({
  title: "İletişim",
  description:
    "Mobil uygulama projeniz için iletişime geçin — yapılabilirlik, süre ve bütçe hakkında dürüst değerlendirme.",
  path: "/iletisim",
});

export default function ContactPage() {
  return <Contact asPage />;
}

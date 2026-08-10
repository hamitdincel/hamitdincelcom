import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { About } from "@/components/sections/About";

export const metadata: Metadata = pageMetadata({
  title: "Hakkımda",
  description:
    "Karadeniz Teknik Üniversitesi Bilgisayar Bilimleri mezunu, 5 yıllık deneyimli mobil uygulama geliştirici. iOS ve Android native geliştirme, REST API ve backend.",
  path: "/hakkimda",
});

export default function AboutPage() {
  return <About asPage />;
}

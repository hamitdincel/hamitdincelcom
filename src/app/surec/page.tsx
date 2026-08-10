import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { Process } from "@/components/sections/Process";

export const metadata: Metadata = pageMetadata({
  title: "Süreç",
  description:
    "Kapsam belirlemeden mağaza yayınına kadar dört adımda nasıl çalıştığımı anlatan süreç.",
  path: "/surec",
});

export default function ProcessPage() {
  return <Process asPage />;
}

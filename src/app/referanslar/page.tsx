import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { Projects } from "@/components/sections/Projects";

export const metadata: Metadata = pageMetadata({
  title: "Referanslar",
  description:
    "App Store ve Google Play'de yayında olan native mobil uygulamalar — Medya Tilkisi ve Akça Koca Kültür Platformu.",
  path: "/referanslar",
});

export default function ProjectsPage() {
  return <Projects asPage />;
}

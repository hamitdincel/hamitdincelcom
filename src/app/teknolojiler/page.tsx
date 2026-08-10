import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { TechStack } from "@/components/sections/TechStack";

export const metadata: Metadata = pageMetadata({
  title: "Teknolojiler",
  description:
    "Swift, SwiftUI, Kotlin, Jetpack Compose, .NET, ASP.NET Core, Next.js ve günlük olarak kullandığım diğer araçlar.",
  path: "/teknolojiler",
});

export default function TechStackPage() {
  return <TechStack asPage />;
}

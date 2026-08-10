import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import { analyticsId, siteVerification } from "@/lib/analytics";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { jsonLdScript, personJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "mobil uygulama geliştirici",
    "iOS geliştirici",
    "Android geliştirici",
    "SwiftUI",
    "Kotlin",
    "Jetpack Compose",
    "REST API",
    "freelance yazılım",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description:
      "Fikirden App Store'a tek elden: iOS ve Android native uygulama, REST API, backend ve web.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description:
      "Fikirden App Store'a tek elden: iOS ve Android native uygulama, REST API, backend ve web.",
  },
  robots: { index: true, follow: true },
  // Search Console "HTML etiketi" yöntemi — env değişkeni tanımlıysa basılır
  verification: siteVerification ? { google: siteVerification } : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d11" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      // Next 16 uyarısı: route geçişlerinde yumuşak kaydırmanın devreye
      // girmemesi için smooth davranışın bilinçli olduğunu belirtiyoruz.
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(personJsonLd)}
        />
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-300 focus:rounded-br-lg focus:bg-accent focus:px-[18px] focus:py-2.5 focus:font-semibold focus:text-white"
          >
            İçeriğe geç
          </a>
          <ScrollProgress />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>

        {/* Yalnızca üretimde ve NEXT_PUBLIC_GA_ID tanımlıysa yüklenir.
            @next/third-parties script'i hidrasyondan sonra çekiyor,
            ilk boyamayı geciktirmiyor. */}
        {analyticsId ? <GoogleAnalytics gaId={analyticsId} /> : null}
      </body>
    </html>
  );
}

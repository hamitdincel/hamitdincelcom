import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin } from "lucide-react";

import { closingCapabilities } from "@/lib/content";
import { mailtoHref, site } from "@/lib/site";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const helpCards = [
  {
    title: "Neyi yazmalıyım?",
    body: "Ne yapmak istediğinizi birkaç cümleyle anlatın. Teknik detay gerekmiyor — varsa benzer bir uygulama örneği çok işe yarıyor.",
  },
  {
    title: "Sonra ne oluyor?",
    body: "Yapılabilirliği değerlendirip size özellik özellik ayrılmış bir kapsam, süre ve bütçe taslağı gönderiyorum.",
  },
  {
    title: "Ücretli mi?",
    body: "İlk değerlendirme ve teklif ücretsiz. Devam etmeye karar verirseniz iş, yazılı kapsam üzerinden başlıyor.",
  },
];

/** Sayfanın finali — accent sürüklemeli kapanış. */
export function Contact({ asPage = false }: { asPage?: boolean }) {
  return (
    <Section id="iletisim" tone="plain" compact={asPage} className="overflow-hidden">
      {/* Hero'daki ızgaranın daha sakin bir versiyonu, alttan yükselen ışıma */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="layer-grid absolute inset-0 opacity-70" />
        <div className="absolute -bottom-[280px] left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent_70%)] blur-[6px]" />
      </div>

      <Container className="relative">
        {asPage ? (
          <nav
            aria-label="Konum"
            className="mb-8 flex items-center gap-2 text-[13px] text-ink-faint"
          >
            <Link href="/" className="transition-colors hover:text-ink">
              Ana sayfa
            </Link>
            <span aria-hidden className="text-line-strong">
              /
            </span>
            <span className="text-ink-muted">İletişim</span>
          </nav>
        ) : null}

        <Reveal className="mx-auto max-w-[44rem] text-center">
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-[11.5px] font-medium tracking-[0.14em] text-accent uppercase">
            <span aria-hidden className="h-px w-7 bg-line-strong" />
            İletişim
          </span>

          {asPage ? (
            <h1 className="text-[clamp(2.25rem,4.8vw,3.6rem)] leading-[1.06] font-bold tracking-[-0.038em] text-balance">
              Bir fikriniz mi var?
              <br />
              <span className="text-gradient-accent">Birlikte yayına alalım.</span>
            </h1>
          ) : (
            <h2 className="text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.06] font-semibold tracking-[-0.038em] text-balance">
              Bir fikriniz mi var?
              <br />
              <span className="text-gradient-accent">Birlikte yayına alalım.</span>
            </h2>
          )}

          <p className="mx-auto mt-6 max-w-[46ch] text-[1.03rem] leading-[1.68] text-ink-muted">
            Net bir projeniz olması gerekmiyor. Fikrinizi birkaç cümleyle yazın;
            yapılabilirliği, yaklaşık süresi ve maliyeti hakkında dürüst bir
            değerlendirmeyle dönüş yapayım.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href={mailtoHref}
              className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-linear-to-b from-accent to-accent-hover px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_14px_34px_-14px_var(--accent-glow)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgb(255_255_255/0.22)_inset,0_20px_44px_-16px_var(--accent-glow)]"
            >
              Projenizi konuşalım
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-line-strong bg-surface px-7 py-3.5 text-[15px] font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-surface-2"
            >
              <Mail className="size-4 text-ink-muted" />
              {site.email}
            </a>
          </div>

          {/* Sakin yetkinlik satırı */}
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[12px] tracking-[0.04em] text-ink-faint">
            {closingCapabilities.map((item, index) => (
              <li key={item} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden className="size-1 rounded-full bg-line-strong" />
                ) : null}
                {item}
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[13px] text-ink-faint">
            <li className="inline-flex items-center gap-2">
              <MapPin className="size-[15px] shrink-0" />
              {site.location}
            </li>
            <li className="inline-flex items-center gap-2">
              <Clock className="size-[15px] shrink-0" />
              Genelde 24 saat içinde dönüş
            </li>
          </ul>
        </Reveal>

        {asPage ? (
          <div className="mt-20 grid gap-5 sm:grid-cols-3">
            {helpCards.map((card, index) => (
              <Reveal
                key={card.title}
                index={index}
                className="edge-highlight rounded-2xl border border-line bg-surface p-7"
              >
                <h2 className="text-[1rem] font-semibold tracking-[-0.02em]">
                  {card.title}
                </h2>
                <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted">
                  {card.body}
                </p>
              </Reveal>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

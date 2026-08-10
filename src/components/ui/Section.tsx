import type { ReactNode } from "react";

/**
 * Bölüm zemini — sayfa boyunca görsel ritim kurar.
 *
 * Her bölüme farklı renk vermek yerine dört tondan oluşan kontrollü bir
 * dizilim: plain → raised → tinted → contrast. Ardışık iki bölümün aynı
 * tonu almaması, bölümlerin "üst üste dizilmiş kutular" gibi görünmesini
 * engelliyor.
 */
export type SectionTone = "plain" | "raised" | "tinted" | "contrast";

const tones: Record<SectionTone, string> = {
  plain: "bg-canvas",
  raised: "border-y border-line bg-canvas-raised",
  tinted: "border-y border-line bg-[var(--accent-tint)]",
  contrast: "bg-contrast-bg text-contrast-ink",
};

export function Section({
  id,
  tone = "plain",
  compact = false,
  className = "",
  children,
}: {
  id?: string;
  tone?: SectionTone;
  /** Kendi sayfasında tek başınayken üst boşluk küçülür */
  compact?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative ${tones[tone]} ${
        compact ? "py-16 sm:py-20" : "py-20 sm:py-28 lg:py-36"
      } ${className}`}
    >
      {children}
    </section>
  );
}

/** Tüm bölümlerde ortak yatay hizalama. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

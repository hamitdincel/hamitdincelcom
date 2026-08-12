import { SmartLink } from "./SmartLink";
import type { ReactNode } from "react";

import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  kicker: string;
  title: ReactNode;
  lead?: string;
  /**
   * Bölüm kendi sayfasında tek başına gösteriliyorsa `true`.
   * Başlık <h1> olur, üstüne konum izi (breadcrumb) eklenir.
   */
  asPage?: boolean;
  /** Koyu kontrast şerit üzerinde kullanılıyorsa renkler ters çevrilir */
  onContrast?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  lead,
  asPage = false,
  onContrast = false,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const Title = asPage ? "h1" : "h2";

  const kickerColor = onContrast ? "text-contrast-accent" : "text-accent";
  const leadColor = onContrast ? "text-contrast-muted" : "text-ink-muted";
  const ruleColor = onContrast ? "bg-contrast-line" : "bg-line-strong";

  return (
    <Reveal
      className={`max-w-[46rem] ${align === "center" ? "mx-auto text-center" : ""} ${
        asPage ? "mb-14 sm:mb-18" : "mb-12 sm:mb-16"
      } ${className}`}
    >
      {asPage ? (
        <nav
          aria-label="Konum"
          className="mb-6 flex min-h-11 items-center gap-2 text-[13px] text-ink-faint"
        >
          <SmartLink
            href="/"
            className="inline-flex min-h-11 items-center transition-colors hover:text-ink focus-visible:text-ink"
          >
            Ana sayfa
          </SmartLink>
          <span aria-hidden className="text-line-strong">
            /
          </span>
          <span className="text-ink-muted">{kicker}</span>
        </nav>
      ) : (
        <span
          className={`mb-5 inline-flex items-center gap-3 font-mono text-[11.5px] font-medium tracking-[0.14em] uppercase ${kickerColor}`}
        >
          <span aria-hidden className={`h-px w-7 ${ruleColor}`} />
          {kicker}
        </span>
      )}

      <Title
        className={
          asPage
            ? "text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.038em] text-balance"
            : "text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.034em] text-balance"
        }
      >
        {title}
      </Title>

      {lead ? (
        <p
          className={`max-w-[52ch] text-[1.03rem] leading-[1.65] ${leadColor} ${
            align === "center" ? "mx-auto" : ""
          } ${asPage ? "mt-6" : "mt-5"}`}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

import { techGroups } from "@/lib/content";
import { SmartLink } from "../ui/SmartLink";

import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Teknolojiler — sayfanın tek koyu şeridi.
 * Logo duvarı değil, kategori bazlı sakin bir liste.
 */
export function TechStack({ asPage = false }: { asPage?: boolean }) {
  return (
    <Section id="teknolojiler" tone="contrast" compact={asPage}>
      {/* Koyu zemine derinlik veren tek bir yumuşak ışıma */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(126_160_255/0.14),transparent_72%)]" />
        <div className="layer-noise absolute inset-0" />
      </div>

      <Container className="relative">
        {asPage ? (
          <nav
            aria-label="Konum"
            className="mb-6 flex min-h-11 items-center gap-2 text-[13px] text-contrast-muted"
          >
            <SmartLink href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-contrast-ink">
              Ana sayfa
            </SmartLink>
            <span aria-hidden>/</span>
            <span>Teknolojiler</span>
          </nav>
        ) : null}

        <Reveal className="mb-14 max-w-[46rem]">
          <span className="mb-5 inline-flex items-center gap-3 font-mono text-[11.5px] font-medium tracking-[0.14em] text-contrast-accent uppercase">
            <span aria-hidden className="h-px w-7 bg-contrast-line" />
            Teknolojiler
          </span>
          {asPage ? (
            <h1 className="text-[clamp(2.25rem,4.6vw,3.5rem)] leading-[1.06] font-bold tracking-[-0.038em] text-balance">
              Günlük olarak kullandığım araçlar
            </h1>
          ) : (
            <h2 className="text-[clamp(1.8rem,3.4vw,2.75rem)] leading-[1.1] font-semibold tracking-[-0.034em] text-balance">
              Günlük olarak kullandığım araçlar
            </h2>
          )}
          <p className="mt-5 max-w-[52ch] text-[1.03rem] leading-[1.65] text-contrast-muted">
            Projelerde fiilen kullandığım araçlar — denemediğim bir teknolojiyi
            listeye koymuyorum.
          </p>
        </Reveal>

        <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {techGroups.map((group, index) => (
            <Reveal key={group.label} index={index}>
              <div className="flex items-baseline gap-4">
                <h3 className="font-mono text-[11px] font-medium tracking-[0.16em] text-contrast-muted uppercase">
                  {group.label}
                </h3>
                <span aria-hidden className="h-px flex-1 bg-contrast-line" />
                <span className="font-mono text-[11px] text-contrast-muted/60">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-contrast-line bg-contrast-surface px-3 py-1.5 font-mono text-[12px] text-contrast-ink/85 transition-colors duration-300 hover:border-contrast-accent/40 hover:text-contrast-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

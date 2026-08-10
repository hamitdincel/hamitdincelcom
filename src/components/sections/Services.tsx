import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { services } from "@/lib/content";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Services({ asPage = false }: { asPage?: boolean }) {
  return (
    <Section id="hizmetler" tone="raised" compact={asPage}>
      <Container>
        <SectionHeading
          asPage={asPage}
          kicker="Hizmetler"
          title="Bir ürünü ayağa kaldırmak için gereken her parça"
          lead="Ağırlık merkezim mobil. Ama projenizin ihtiyacı olan diğer parçaları da dışarı vermeden, aynı özenle üretiyorum."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.id} index={index}>
                <SpotlightCard
                  as="article"
                  className="edge-highlight h-full rounded-2xl border border-line bg-surface p-7 sm:p-9"
                >
                  {/* Üst satır: numara + ikon + hover'da beliren ok */}
                  <div className="relative flex items-start justify-between gap-4">
                    <span
                      aria-hidden
                      className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-y-0.5"
                    >
                      <Icon className="size-5" />
                    </span>

                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-ink-faint">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <ArrowUpRight className="size-4 -translate-x-1 text-ink-faint opacity-0 transition-all duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
                    </span>
                  </div>

                  <h3 className="relative mt-7 text-[1.18rem] font-semibold tracking-[-0.022em]">
                    {service.title}
                  </h3>
                  <p className="relative mt-1.5 font-mono text-[11.5px] tracking-[0.05em] text-accent">
                    {service.stackLine}
                  </p>

                  <p className="relative mt-4 max-w-[46ch] text-[14.8px] leading-[1.65] text-ink-muted">
                    {service.description}
                  </p>

                  <ul className="relative mt-7 grid gap-2.5 border-t border-line pt-6">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-[13.8px] leading-[1.55] text-ink-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-[7px] h-px w-3 shrink-0 bg-line-strong"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-12">
          <Link
            href={asPage ? "/surec" : "/hizmetler"}
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-line-strong bg-surface px-6 py-3 text-[14.5px] font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-surface-2 hover:shadow-sm"
          >
            {asPage ? "Nasıl çalıştığımı görün" : "Hizmetlerin tamamı"}
            <ArrowRight className="size-4 text-ink-muted transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}

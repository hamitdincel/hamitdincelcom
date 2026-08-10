import { Fragment } from "react";

import {
  aboutFacts,
  aboutParagraphs,
  aboutPoints,
  aboutStatement,
} from "@/lib/content";
import { site } from "@/lib/site";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** İçerikteki **kalın** işaretlerini <strong> olarak basar. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-medium text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function About({ asPage = false }: { asPage?: boolean }) {
  return (
    <Section id="hakkimda" tone="plain" compact={asPage}>
      <Container>
        {asPage ? (
          <SectionHeading
            asPage
            kicker="Hakkımda"
            title="Uygulamayı yazan kişi, arkasındaki sistemi de biliyor"
            lead="Çoğu projede uygulama bir yerde, API başka yerde, panel bambaşka bir ekipte olur — ve kimse bütünden sorumlu olmaz. Ben bu üçünü birlikte kuruyorum."
          />
        ) : null}

        {/* --------------------------------- Editorial: ifade ↔ açıklama */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            {!asPage ? (
              <span className="mb-6 inline-flex items-center gap-3 font-mono text-[11.5px] font-medium tracking-[0.14em] text-accent uppercase">
                <span aria-hidden className="h-px w-7 bg-line-strong" />
                Hakkımda
              </span>
            ) : null}

            <p className="text-[clamp(1.5rem,2.9vw,2.15rem)] leading-[1.24] font-semibold tracking-[-0.032em] text-balance">
              {aboutStatement}
            </p>

            <div className="mt-9 flex items-center gap-4">
              <span aria-hidden className="h-px w-10 shrink-0 bg-line-strong" />
              <span className="leading-tight">
                <span className="block text-[14.5px] font-medium">{site.name}</span>
                <span className="block text-[13px] text-ink-faint">
                  Mobil Uygulama Geliştirici · Türkiye
                </span>
              </span>
            </div>

            {/* Künye — eğitim, deneyim, yaş, konum */}
            <dl className="mt-10 border-t border-line">
              {aboutFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b border-line py-3.5"
                >
                  <dt className="w-20 shrink-0 font-mono text-[10.5px] tracking-[0.14em] text-ink-faint uppercase">
                    {fact.label}
                  </dt>
                  <dd className="flex-1 text-[14.2px] leading-[1.5] text-ink-muted">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal index={1}>
            <div className="space-y-5 lg:pt-2">
              {aboutParagraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="max-w-[58ch] text-[1.01rem] leading-[1.72] text-ink-muted"
                >
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------- Uzmanlık noktaları */}
        <div aria-hidden className="rule-fade mt-16 sm:mt-20" />

        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {aboutPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.title} index={index} as="li">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-xl border border-line bg-surface text-accent shadow-xs"
                >
                  <Icon className="size-[18px]" />
                </span>
                <h3 className="mt-5 text-[15px] font-semibold tracking-[-0.015em]">
                  {point.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-ink-muted">
                  {point.description}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

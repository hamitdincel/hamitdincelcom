import { processSteps } from "@/lib/content";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TimelineTrack } from "@/components/ui/TimelineTrack";

/**
 * Süreç — kart ızgarası değil, zaman çizelgesi.
 * Masaüstünde yatay, mobilde dikey akar; ilerleme çizgisi kaydırmaya bağlı.
 */
export function Process({ asPage = false }: { asPage?: boolean }) {
  return (
    <Section id="surec" tone="plain" compact={asPage}>
      <Container>
        <SectionHeading
          asPage={asPage}
          kicker="Süreç"
          title="Nasıl çalışıyoruz"
          lead="Sürpriz yok. Her aşamada ne yapıldığını, ne zaman biteceğini ve sıradaki adımın ne olduğunu bilirsiniz."
        />

        <TimelineTrack>
          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, index) => (
              <Reveal
                key={step.step}
                index={index}
                as="li"
                className="relative pl-14 lg:pt-14 lg:pl-0"
              >
                {/* Çizgi üzerindeki düğüm */}
                <span
                  aria-hidden
                  className="absolute top-1 left-[18px] grid size-[13px] -translate-x-1/2 place-items-center rounded-full border-2 border-accent bg-canvas lg:top-[-7px] lg:left-0 lg:translate-x-0"
                >
                  <span className="size-[3px] rounded-full bg-accent" />
                </span>

                <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                  {step.step}
                </span>
                <h3 className="mt-3 text-[1.08rem] font-semibold tracking-[-0.022em]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[38ch] text-[14.2px] leading-[1.68] text-ink-muted">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </TimelineTrack>
      </Container>
    </Section>
  );
}

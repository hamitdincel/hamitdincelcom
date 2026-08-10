import { faqItems } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Server Component — durum yalnızca `Accordion` içinde. */
export function Faq({ asPage = false }: { asPage?: boolean }) {
  return (
    <Section id="sss" tone="raised" compact={asPage}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <SectionHeading
              asPage={asPage}
              kicker="Sık sorulanlar"
              title="Genelde ilk sorulanlar"
              lead="Teklif aşamasında en çok gelen sorular ve dürüst cevapları."
              className="mb-0 lg:sticky lg:top-28"
            />
          </div>

          <Reveal index={1}>
            <Accordion items={faqItems} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

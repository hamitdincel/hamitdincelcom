import { SmartLink } from "../ui/SmartLink";
import { ArrowUpRight, Clock, HelpCircle, Layers, User } from "lucide-react";

import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

const cards = [
  {
    href: "/hakkimda",
    icon: User,
    title: "Hakkımda",
    description:
      "Nasıl çalıştığım, neden native tercih ettiğim ve uygulamanın arkasındaki sistemi de neden ben kurduğum.",
  },
  {
    href: "/surec",
    icon: Clock,
    title: "Süreç",
    description:
      "Kapsam belirlemeden mağaza yayınına kadar dört adım. Hangi aşamada ne teslim edildiği baştan belli.",
  },
  {
    href: "/teknolojiler",
    icon: Layers,
    title: "Teknolojiler",
    description:
      "Mobil, backend, web ve servis tarafında günlük olarak kullandığım araçların tam listesi.",
  },
  {
    href: "/sss",
    icon: HelpCircle,
    title: "Sık sorulanlar",
    description:
      "Süre, maliyet, kod sahipliği ve yayın sonrası destek — teklif aşamasının klasik soruları.",
  },
];

/** Ana sayfadan diğer sayfalara açılan kapı. */
export function Explore() {
  return (
    <Section tone="plain" compact>
      <Container>
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="mb-5 inline-flex items-center gap-3 font-mono text-[11.5px] font-medium tracking-[0.14em] text-accent uppercase">
              <span aria-hidden className="h-px w-7 bg-line-strong" />
              Devamı
            </span>
            <h2 className="text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.12] font-semibold tracking-[-0.032em]">
              Detaylara göz atın
            </h2>
          </div>
          <p className="max-w-[38ch] text-[14.8px] leading-[1.65] text-ink-muted">
            Her başlığın kendi sayfası var — aradığınız cevap muhtemelen
            aşağıdakilerden birinde.
          </p>
        </Reveal>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.href} index={index} as="li" className="bg-surface">
                <SmartLink
                  href={card.href}
                  className="group flex h-full flex-col p-7 transition-colors duration-300 hover:bg-surface-2 sm:p-8"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span
                      aria-hidden
                      className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-y-0.5"
                    >
                      <Icon className="size-[18px]" />
                    </span>
                    <ArrowUpRight className="size-4 -translate-x-1 text-ink-faint opacity-0 transition-all duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100" />
                  </span>

                  <span className="mt-6 block text-[1.08rem] font-semibold tracking-[-0.022em]">
                    {card.title}
                  </span>
                  <span className="mt-2.5 block max-w-[42ch] text-[14.2px] leading-[1.65] text-ink-muted">
                    {card.description}
                  </span>
                </SmartLink>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

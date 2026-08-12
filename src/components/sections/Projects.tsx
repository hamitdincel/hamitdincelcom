import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { projects } from "@/lib/projects";
import type { Project } from "@/lib/types";
import { Container, Section } from "@/components/ui/Section";
import { PhoneCluster } from "@/components/ui/PhoneCluster";
import { PhoneStage } from "@/components/ui/PhoneStage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { TagList } from "@/components/ui/Tag";

function ProjectShowcase({
  project,
  index,
  reversed,
}: {
  project: Project;
  index: number;
  reversed: boolean;
}) {
  return (
    <article className="relative">
      {/* Projeler arası ince ayraç — kutu hissi vermeden ritim kurar */}
      {index > 0 ? (
        <div aria-hidden className="rule-fade mb-20 sm:mb-28" />
      ) : null}

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={reversed ? "lg:order-2" : undefined}>
          <div className="max-w-[34rem]">
            <div className="flex items-center gap-4">
              <Image
                src={project.icon}
                alt={`${project.name} uygulama simgesi`}
                width={72}
                height={72}
                className="size-14 shrink-0 rounded-[15px] border border-line object-cover shadow-sm sm:size-[68px] sm:rounded-[18px]"
              />
              <div className="min-w-0">
                <p className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">
                  {String(index + 1).padStart(2, "0")} · {project.category}
                </p>
                <h3 className="mt-1.5 text-[clamp(1.45rem,2.4vw,1.85rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
                  {project.name}
                </h3>
              </div>
            </div>

            <p className="mt-7 text-[1.01rem] leading-[1.68] text-ink-muted">
              {project.summary}
            </p>

            {/* Problem → çözüm özeti */}
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              {[project.challenge, project.approach].map((block) => (
                <div key={block.title}>
                  <dt className="font-mono text-[11.5px] sm:text-[10.5px] tracking-[0.12em] text-ink-faint uppercase">
                    {block.title}
                  </dt>
                  <dd className="mt-2 text-[13.8px] leading-[1.6] text-ink-muted">
                    {block.body.split(". ").slice(0, 2).join(". ")}.
                  </dd>
                </div>
              ))}
            </dl>

            <TagList items={project.tags} className="mt-8" />

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href={`/referanslar/${project.slug}`}
                className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-linear-to-b from-accent to-accent-hover px-5 py-2.5 text-[14.5px] font-medium text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_10px_26px_-14px_var(--accent-glow)] transition duration-300 hover:-translate-y-0.5"
              >
                Projeyi incele
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              {project.links ? (
                <StoreButtons
                  links={project.links}
                  appName={project.name}
                  variant="compact"
                />
              ) : (
                <span className="text-[13.5px] text-ink-faint">{project.status}</span>
              )}
            </div>
          </div>
        </Reveal>

        <Reveal className={`flex justify-center ${reversed ? "lg:order-1" : ""}`}>
          <PhoneStage>
            <PhoneCluster screens={project.screens} label={project.name} />
          </PhoneStage>
        </Reveal>
      </div>
    </article>
  );
}

export function Projects({ asPage = false }: { asPage?: boolean }) {
  return (
    <Section id="referanslar" tone="tinted" compact={asPage}>
      <Container>
        <SectionHeading
          asPage={asPage}
          kicker="Referanslar"
          title="Uçtan uca geliştirdiğim ürünler"
          lead="Ekran görüntüleri temsilî değil, uygulamaların kendisinden. Her birini fikir aşamasından çalışır ürüne kadar tek başıma geliştirdim; ikisi mağazalarda yayında."
        />

        <div className="space-y-20 sm:space-y-28">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.slug}
              project={project}
              index={index}
              reversed={index % 2 === 1}
            />
          ))}
        </div>

        {asPage ? null : (
          <Reveal className="mt-20">
            <Link
              href="/referanslar"
              className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-line-strong bg-surface px-6 py-3 text-[14.5px] font-medium transition duration-300 hover:-translate-y-0.5 hover:shadow-sm"
            >
              Tüm referanslara bak
              <ArrowRight className="size-4 text-ink-muted transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}

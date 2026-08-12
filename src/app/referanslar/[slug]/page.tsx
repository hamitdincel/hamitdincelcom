import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";

import { getProject, getProjectNeighbours, projects } from "@/lib/projects";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  projectJsonLd,
  projectMetadata,
} from "@/lib/seo";
import { mailtoHref } from "@/lib/site";
import { Container, Section } from "@/components/ui/Section";
import { PhoneCluster } from "@/components/ui/PhoneCluster";
import { PhoneStage } from "@/components/ui/PhoneStage";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { Reveal } from "@/components/ui/Reveal";
import { StoreButtons } from "@/components/ui/StoreButtons";
import { TagList } from "@/components/ui/Tag";

/** Her proje build sırasında statik olarak üretilir */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/referanslar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Proje bulunamadı" };
  return projectMetadata(project);
}

/** Case study gövdesindeki numaralı blok başlığı */
function BlockHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
        {index}
      </span>
      <h2 className="text-[1.4rem] leading-[1.2] font-semibold tracking-[-0.028em] sm:text-[1.6rem]">
        {title}
      </h2>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/referanslar/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const { previous, next } = getProjectNeighbours(project.slug);

  const breadcrumb = breadcrumbJsonLd([
    { name: "Ana sayfa", path: "/" },
    { name: "Referanslar", path: "/referanslar" },
    { name: project.name, path: `/referanslar/${project.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(projectJsonLd(project))}
      />
      {/* Görsel breadcrumb ile birebir aynı iz */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(breadcrumb)}
      />

      {/* ======================================================= Başlık */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="layer-grid absolute inset-0" />
          <div className="absolute -top-[280px] left-1/2 h-[560px] w-[880px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent_72%)] blur-[8px]" />
          <div className="layer-noise absolute inset-0" />
        </div>

        <Container className="relative py-14 sm:py-20">
          <nav
            aria-label="Konum"
            className="mb-8 flex min-h-11 items-center gap-2 text-[13px] text-ink-faint"
          >
            <Link href="/" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
              Ana sayfa
            </Link>
            <span aria-hidden className="text-line-strong">
              /
            </span>
            <Link href="/referanslar" className="inline-flex min-h-11 items-center transition-colors hover:text-ink">
              Referanslar
            </Link>
            <span aria-hidden className="text-line-strong">
              /
            </span>
            <span className="text-ink-muted">{project.name}</span>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-10">
            <Reveal>
              <div className="flex items-center gap-4">
                <Image
                  src={project.icon}
                  alt=""
                  width={80}
                  height={80}
                  className="size-16 shrink-0 rounded-[17px] border border-line object-cover shadow-md sm:size-[76px] sm:rounded-[20px]"
                />
                {/* platforms "iOS + Android" içerdiği için uppercase yok */}
                <p className="font-mono text-[11.5px] tracking-[0.08em] text-accent">
                  {project.category}
                  <span className="mt-1.5 block text-[11.5px] text-ink-faint">
                    {project.platforms}
                  </span>
                </p>
              </div>

              <h1 className="mt-8 text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.04] font-bold tracking-[-0.04em] text-balance">
                {project.name}
              </h1>
              <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-[1.68] text-ink-muted">
                {project.tagline}
              </p>

              {project.links ? (
                <StoreButtons
                  links={project.links}
                  appName={project.name}
                  className="mt-9"
                />
              ) : (
                <p className="mt-9 text-[14.5px] text-ink-faint">{project.status}</p>
              )}
            </Reveal>

            <Reveal className="flex justify-center">
              <PhoneStage className="lg:scale-[1.04]">
                <PhoneCluster
                  screens={project.screens}
                  label={project.name}
                  priority
                />
              </PhoneStage>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* =============================================== Genel bakış + künye */}
      <Section tone="plain" compact>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
            <Reveal>
              <BlockHeading index="01" title="Genel bakış" />
              <div className="mt-7 space-y-5">
                {project.overview.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="max-w-[62ch] text-[1.01rem] leading-[1.72] text-ink-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {[project.challenge, project.approach].map((block) => (
                  <div
                    key={block.title}
                    className="edge-highlight rounded-2xl border border-line bg-surface p-7"
                  >
                    <h3 className="text-[1.02rem] font-semibold tracking-[-0.02em]">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-[14.4px] leading-[1.68] text-ink-muted">
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Künye */}
            <Reveal index={1}>
              <dl className="lg:sticky lg:top-28">
                {project.meta.map((item, index) => (
                  <div
                    key={item.label}
                    className={`py-5 ${index > 0 ? "border-t border-line" : ""}`}
                  >
                    <dt className="font-mono text-[11.5px] sm:text-[10.5px] tracking-[0.14em] text-ink-faint uppercase">
                      {item.label}
                    </dt>
                    <dd className="mt-2 text-[14.2px] leading-[1.6] text-ink-muted">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* =============================================== Rol + öne çıkanlar */}
      <Section tone="raised" compact>
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <BlockHeading index="02" title={project.role.title} />
              <p className="mt-7 max-w-[54ch] text-[1.01rem] leading-[1.72] text-ink-muted">
                {project.role.body}
              </p>
            </Reveal>

            <Reveal index={1}>
              <h3 className="font-mono text-[11.5px] sm:text-[10.5px] tracking-[0.14em] text-ink-faint uppercase">
                Öne çıkanlar
              </h3>
              <ul className="mt-6 grid gap-5">
                {project.features.map((feature) => (
                  <li key={feature.title} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-[9px] h-px w-6 shrink-0 bg-accent"
                    />
                    <span className="text-[14.4px] leading-[1.62] text-ink-muted">
                      <b className="font-semibold text-ink">{feature.title}</b> —{" "}
                      {feature.detail}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ======================================================== Ekranlar */}
      <Section tone="tinted" compact>
        <Container>
          <Reveal className="mb-16 max-w-[46rem]">
            <BlockHeading index="03" title="Uygulamanın içinde ne var" />
            <p className="mt-5 max-w-[52ch] text-[1.01rem] leading-[1.68] text-ink-muted">
              Aşağıdaki görseller App Store&apos;daki gerçek uygulama
              sayfasından — temsilî tasarım değil.
            </p>
          </Reveal>

          <ProjectGallery screens={project.screens} />
        </Container>
      </Section>

      {/* =========================================== Teknik kararlar + yığın */}
      <Section tone="plain" compact>
        <Container>
          <Reveal className="mb-14 max-w-[46rem]">
            <BlockHeading index="04" title="Neden böyle kuruldu" />
          </Reveal>

          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {project.decisions.map((decision, index) => (
              <Reveal key={decision.title} index={index} as="li">
                <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.05rem] font-semibold tracking-[-0.022em]">
                  {decision.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[14.2px] leading-[1.68] text-ink-muted">
                  {decision.body}
                </p>
              </Reveal>
            ))}
          </ul>

          <div aria-hidden className="rule-fade my-16" />

          <Reveal className="mb-8">
            <h2 className="font-mono text-[11.5px] sm:text-[10.5px] tracking-[0.14em] text-ink-faint uppercase">
              Teknoloji yığını
            </h2>
          </Reveal>

          <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {project.stack.map((group, index) => (
              <Reveal key={group.label} index={index}>
                <div className="flex items-baseline gap-4">
                  {/* Grup etiketleri "iOS" / "Android" olabiliyor — uppercase yok */}
                  <h3 className="font-mono text-[11.5px] font-medium tracking-[0.08em] text-ink-muted">
                    {group.label}
                  </h3>
                  <span aria-hidden className="h-px flex-1 bg-line" />
                </div>
                <TagList items={group.items} className="mt-5" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================== Teslim */}
      <Section tone="contrast" compact className="overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[30%] left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(126_160_255/0.14),transparent_72%)]" />
        </div>

        <Container className="relative">
          <Reveal className="max-w-[46rem]">
            <span className="font-mono text-[11px] tracking-[0.14em] text-contrast-accent">
              05
            </span>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.3rem)] leading-[1.14] font-semibold tracking-[-0.032em]">
              {project.delivery.title}
            </h2>
            <p className="mt-6 max-w-[58ch] text-[1.01rem] leading-[1.72] text-contrast-muted">
              {project.delivery.body}
            </p>

            {project.links ? (
              <StoreButtons
                links={project.links}
                appName={project.name}
                variant="contrast"
                className="mt-9"
              />
            ) : null}
          </Reveal>
        </Container>
      </Section>

      {/* ========================================= Diğer proje + iletişim */}
      <Section tone="plain" compact>
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {previous ? (
              <Link
                href={`/referanslar/${previous.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-6 transition duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md"
              >
                <ArrowLeft className="size-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:-translate-x-1" />
                <span>
                  <span className="block font-mono text-[11.5px] sm:text-[10.5px] tracking-[0.12em] text-ink-faint uppercase">
                    Önceki proje
                  </span>
                  <span className="mt-1.5 block text-[15px] font-medium">
                    {previous.name}
                  </span>
                </span>
              </Link>
            ) : null}

            {next ? (
              <Link
                href={`/referanslar/${next.slug}`}
                className="group flex items-center justify-end gap-4 rounded-2xl border border-line bg-surface p-6 text-right transition duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md sm:col-start-2"
              >
                <span>
                  <span className="block font-mono text-[11.5px] sm:text-[10.5px] tracking-[0.12em] text-ink-faint uppercase">
                    Sonraki proje
                  </span>
                  <span className="mt-1.5 block text-[15px] font-medium">
                    {next.name}
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ) : null}
          </div>

          <div className="edge-highlight mt-6 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line bg-surface p-8 sm:p-10">
            <div>
              <h2 className="text-[1.3rem] leading-[1.2] font-semibold tracking-[-0.026em]">
                Benzer bir uygulama mı düşünüyorsunuz?
              </h2>
              <p className="mt-2.5 max-w-[46ch] text-[14.6px] leading-[1.65] text-ink-muted">
                Fikrinizi birkaç cümleyle yazın; yapılabilirliği ve yaklaşık
                süresi hakkında dürüst bir değerlendirmeyle dönüş yapayım.
              </p>
            </div>
            <a
              href={mailtoHref}
              className="group inline-flex min-h-12 items-center gap-2 rounded-xl bg-linear-to-b from-accent to-accent-hover px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_12px_30px_-14px_var(--accent-glow)] transition duration-300 hover:-translate-y-0.5"
            >
              <Mail className="size-4" />
              İletişime geç
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}

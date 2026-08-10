import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import {
  capabilities,
  heroTech,
  heroTechLine,
  yearsOfExperience,
} from "@/lib/content";
import { projects } from "@/lib/projects";
import { mailtoHref, site } from "@/lib/site";
import { PhoneCluster } from "@/components/ui/PhoneCluster";
import { PhoneStage } from "@/components/ui/PhoneStage";
import { Reveal } from "@/components/ui/Reveal";

/** Telefon kompozisyonunun çevresindeki mini teknoloji kartı. */
function TechChip({
  tech,
  className,
  drift,
}: {
  tech: (typeof heroTech)[number];
  className: string;
  drift: string;
}) {
  const Icon = tech.icon;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute hidden lg:flex ${className} ${drift}`}
    >
      <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface/75 px-3 py-2 shadow-md backdrop-blur-md">
        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon className="size-[15px]" />
        </span>
        <span className="leading-tight">
          <span className="block text-[12.5px] font-semibold tracking-[-0.01em]">
            {tech.label}
          </span>
          <span className="block text-[11px] text-ink-faint">{tech.sub}</span>
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const featured = projects[0];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* --------------------------------------------- Arka plan katmanları */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="layer-grid absolute inset-0" />
        <div className="absolute -top-[340px] left-[6%] h-[620px] w-[760px] rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent_72%)] blur-[8px]" />
        <div className="absolute top-[80px] -right-[220px] h-[680px] w-[680px] rounded-full bg-[radial-gradient(closest-side,var(--accent-tint),transparent_70%)]" />
        <div className="layer-noise absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-[1200px] px-5 pt-16 pb-14 sm:px-8 sm:pt-20 lg:pt-26 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-10">
          {/* ------------------------------------------------------- Sol */}
          <div>
            <Reveal index={0}>
              <p className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pr-4 pl-2.5 text-[12.5px] font-medium text-ink-muted shadow-xs backdrop-blur-sm">
                <span className="relative flex size-2 items-center justify-center">
                  <span className="absolute size-2 rounded-full bg-emerald-500/25 blur-[3px]" />
                  <span className="absolute size-2 animate-ping rounded-full bg-emerald-500/50" />
                  <span className="relative size-[6px] rounded-full bg-emerald-500" />
                </span>
                Yeni projeler için müsaitim
              </p>
            </Reveal>

            <Reveal index={1}>
              <h1 className="text-[clamp(2.5rem,6.2vw,5rem)] leading-[1.04] font-bold tracking-[-0.04em] text-balance">
                Fikirden mağazaya,{" "}
                <span className="text-gradient-accent">
                  tek elden mobil uygulama.
                </span>
              </h1>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-7 max-w-[36ch] text-[1.05rem] leading-[1.65] text-ink-muted sm:text-[1.09rem]">
                Ben {site.name}. {yearsOfExperience} yıldır{" "}
                <span className="font-medium text-ink">iOS ve Android</span>{" "}
                tarafında native uygulama geliştiriyorum — arayüzünden
                API&apos;sine, mağaza yayınından sürüm bakımına kadar.
              </p>
            </Reveal>

            <Reveal index={3}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href="/referanslar"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-linear-to-b from-accent to-accent-hover px-6 py-3 text-[15px] font-medium text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset,0_10px_28px_-12px_var(--accent-glow)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_1px_0_rgb(255_255_255/0.22)_inset,0_16px_36px_-14px_var(--accent-glow)]"
                >
                  Yayındaki işlerim
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={mailtoHref}
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line-strong bg-surface px-6 py-3 text-[15px] font-medium transition duration-300 hover:-translate-y-0.5 hover:bg-surface-2"
                >
                  <Mail className="size-4 text-ink-muted" />
                  E-posta gönder
                </a>
              </div>
            </Reveal>

            {/* Sakin tipografik yetkinlik satırı */}
            <Reveal index={4}>
              <p className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[12px] tracking-[0.04em] text-ink-faint">
                {heroTechLine.map((item, index) => (
                  <span key={item} className="flex items-center gap-3">
                    {index > 0 ? (
                      <span aria-hidden className="size-1 rounded-full bg-line-strong" />
                    ) : null}
                    {item}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          {/* ------------------------------------------------------- Sağ */}
          <Reveal index={2} className="relative">
            <PhoneStage className="lg:scale-[1.06] lg:pl-6">
              <PhoneCluster
                screens={featured.screens}
                label={featured.name}
                priority
              />
            </PhoneStage>

            <TechChip
              tech={heroTech[0]}
              className="top-[12%] -left-[2%]"
              drift="animate-drift-slow"
            />
            <TechChip
              tech={heroTech[1]}
              className="right-[1%] bottom-[26%]"
              drift="animate-drift-delayed"
            />
            <TechChip
              tech={heroTech[2]}
              className="bottom-[8%] left-[6%]"
              drift="animate-drift"
            />
          </Reveal>
        </div>
      </div>

      {/* ------------------------------------------------ Yetkinlik şeridi */}
      <div className="relative border-y border-line bg-canvas-raised">
        <ul className="mx-auto grid w-full max-w-[1200px] grid-cols-1 divide-y divide-line px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:divide-x lg:divide-y-0">
          {capabilities.map((capability, index) => (
            <Reveal
              key={capability.index}
              index={index}
              as="li"
              className="py-7 lg:px-7 lg:first:pl-0 lg:last:pr-0"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                {capability.index}
              </span>
              <h2 className="mt-3 text-[1.02rem] font-semibold tracking-[-0.018em]">
                {capability.title}
              </h2>
              <p className="mt-1.5 text-[13.8px] leading-[1.55] text-ink-muted">
                {capability.detail}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

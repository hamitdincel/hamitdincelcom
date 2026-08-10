import type { ProjectScreen } from "@/lib/types";
import { Phone } from "./Phone";
import { Reveal } from "./Reveal";

/**
 * Editorial ekran galerisi.
 *
 * Altı ekranı eşit kutulara dizmek yerine 3'lü gruplara ayırıp her grupta
 * bir ekranı öne çıkarıyor; gruplar arasında hizalama dönüşümlü değişiyor.
 * Tamamı Server Component.
 */

function Caption({
  screen,
  index,
  size,
}: {
  screen: ProjectScreen;
  index: number;
  size: "lg" | "sm";
}) {
  return (
    <div className={size === "lg" ? "mt-6" : "mt-4"}>
      <h3
        className={`font-mono tracking-[0.1em] text-accent uppercase ${
          size === "lg" ? "text-[11.5px]" : "text-[11.5px] sm:text-[10.5px]"
        }`}
      >
        {String(index + 1).padStart(2, "0")} · {screen.title}
      </h3>
      <p
        className={`mt-2 leading-[1.6] text-ink-muted ${
          size === "lg" ? "max-w-[38ch] text-[14px]" : "max-w-[32ch] text-[13px]"
        }`}
      >
        {screen.caption}
      </p>
    </div>
  );
}

function GalleryGroup({
  screens,
  offset,
  reversed,
}: {
  screens: ProjectScreen[];
  offset: number;
  reversed: boolean;
}) {
  const [featured, ...rest] = screens;

  return (
    <div
      className={`grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14 ${
        reversed ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Öne çıkan ekran */}
      <Reveal className="mx-auto w-full max-w-[300px] lg:mx-0">
        <Phone
          src={featured.src}
          alt={`${featured.title} ekranı`}
          variant="feature"
          className="hover:-translate-y-2"
        />
        <Caption screen={featured} index={offset} size="lg" />
      </Reveal>

      {/* Yanındaki iki küçük ekran */}
      <div className="grid gap-8 sm:grid-cols-2 lg:pt-16">
        {rest.map((screen, i) => (
          <Reveal key={screen.src} index={i + 1}>
            <Phone
              src={screen.src}
              alt={`${screen.title} ekranı`}
              variant="gallery"
              className="mx-auto max-w-[220px] hover:-translate-y-1.5"
            />
            <Caption screen={screen} index={offset + i + 1} size="sm" />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function ProjectGallery({ screens }: { screens: ProjectScreen[] }) {
  const groups: ProjectScreen[][] = [];
  for (let i = 0; i < screens.length; i += 3) {
    groups.push(screens.slice(i, i + 3));
  }

  return (
    <div className="space-y-20 sm:space-y-28">
      {groups.map((group, index) => (
        <GalleryGroup
          key={group[0].src}
          screens={group}
          offset={index * 3}
          reversed={index % 2 === 1}
        />
      ))}
    </div>
  );
}

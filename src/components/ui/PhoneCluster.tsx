import type { ProjectScreen } from "@/lib/types";
import { Phone } from "./Phone";

/**
 * Üç telefonluk yelpaze kompozisyonu.
 *
 * "Havada duran üç görsel" hissini kırmak için üç ayrı katman var:
 *   1. arkada yumuşak mavi ışıma (ambient)
 *   2. altta zemine temas gölgesi (`device-ground`)
 *   3. telefonların kendi katmanlı gölgeleri (`device-shell`)
 *
 * Server Component — hareket yalnızca CSS keyframe'i (`animate-drift`) ve
 * dışarıdaki `PhoneStage` parallax'ı üzerinden geliyor.
 */
export function PhoneCluster({
  screens,
  label,
  priority = false,
  /** Mobilde yan telefonları gizleyip merkezi öne çıkar */
  compactOnMobile = true,
}: {
  screens: readonly ProjectScreen[];
  label: string;
  priority?: boolean;
  compactOnMobile?: boolean;
}) {
  const [left, center, right] = screens;

  return (
    <div className="relative flex items-center justify-center">
      {/* Ambient ışıma — telefonların arkasında, kenarlarda eriyor */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[115%] w-[125%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,var(--accent-glow),transparent_70%)] blur-[6px]"
      />

      {/* Zemine temas gölgesi */}
      <div
        aria-hidden
        className="device-ground pointer-events-none absolute bottom-[2%] left-1/2 h-[6%] w-[74%] -translate-x-1/2"
      />

      <div className="relative flex items-center justify-center">
        <Phone
          src={left.src}
          alt={`${label} — ${left.title}`}
          variant="small"
          priority={priority}
          className={`animate-drift-slow z-1 translate-x-[38px] translate-y-3 rotate-[-7deg] sm:translate-x-[52px] sm:translate-y-4 ${
            compactOnMobile ? "max-[420px]:hidden" : ""
          }`}
        />
        <Phone
          src={center.src}
          alt={`${label} — ${center.title}`}
          priority={priority}
          className="animate-drift z-3 -translate-y-2"
        />
        <Phone
          src={right.src}
          alt={`${label} — ${right.title}`}
          variant="small"
          priority={priority}
          className={`animate-drift-delayed z-2 -translate-x-[38px] translate-y-3 rotate-[7deg] sm:-translate-x-[52px] sm:translate-y-4 ${
            compactOnMobile ? "max-[420px]:hidden" : ""
          }`}
        />
      </div>
    </div>
  );
}

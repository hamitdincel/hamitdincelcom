import Image from "next/image";

/**
 * Saf CSS iPhone çerçevesi — ayrı bir mockup görseli yok.
 *
 * Bilerek Server Component: içinde hiçbir hook ya da olay dinleyici yok.
 * Galerilerde onlarca kez render edildiği için istemciye JS taşımıyor.
 * Kaydırma parallax'ı `PhoneStage`, kompozisyon ise `PhoneCluster` işi.
 */

const sizes = {
  /** Yelpazenin ortasındaki dominant telefon */
  default: {
    frame: "w-[196px] rounded-[32px] p-[7px] sm:w-[238px] sm:rounded-[38px] sm:p-[8px]",
    island: "top-[13px] h-[14px] w-[52px] sm:top-[16px] sm:h-[17px] sm:w-[64px]",
    screen: "rounded-[26px] sm:rounded-[31px]",
    imageSizes: "(max-width: 640px) 196px, 238px",
  },
  /** Yelpazenin arkasındaki telefonlar */
  small: {
    frame: "w-[152px] rounded-[26px] p-[6px] sm:w-[194px] sm:rounded-[32px] sm:p-[7px]",
    island: "top-[10px] h-[11px] w-[42px] sm:top-[13px] sm:h-[14px] sm:w-[54px]",
    screen: "rounded-[21px] sm:rounded-[26px]",
    imageSizes: "(max-width: 640px) 152px, 194px",
  },
  /** Detay sayfası galerisi — küçük kart */
  gallery: {
    frame: "w-full rounded-[26px] p-[6px]",
    island: "top-[11px] h-[12px] w-[46px]",
    screen: "rounded-[21px]",
    imageSizes: "(max-width: 640px) 60vw, 220px",
  },
  /** Detay sayfası galerisi — öne çıkan büyük ekran */
  feature: {
    frame: "w-full rounded-[34px] p-[8px]",
    island: "top-[15px] h-[16px] w-[60px]",
    screen: "rounded-[27px]",
    imageSizes: "(max-width: 640px) 80vw, 300px",
  },
} as const;

type PhoneProps = {
  src: string;
  alt: string;
  variant?: keyof typeof sizes;
  priority?: boolean;
  className?: string;
};

export function Phone({
  src,
  alt,
  variant = "default",
  priority = false,
  className = "",
}: PhoneProps) {
  const size = sizes[variant];

  return (
    <div
      className={`device-shell relative shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${size.frame} ${className}`}
    >
      {/* dynamic island */}
      <div
        aria-hidden
        className={`absolute left-1/2 z-2 -translate-x-1/2 rounded-full bg-[#05060a] ${size.island}`}
      />
      <div
        className={`relative aspect-[900/1947] overflow-hidden bg-[#05060a] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.55)] ${size.screen}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={size.imageSizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    </div>
  );
}

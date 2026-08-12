import Image from "next/image";

/**
 * Saf CSS iPhone çerçevesi — ayrı bir mockup görseli yok.
 *
 * Bilerek Server Component: içinde hiçbir hook ya da olay dinleyici yok.
 * Galerilerde onlarca kez render edildiği için istemciye JS taşımıyor.
 * Kaydırma parallax'ı `PhoneStage`, kompozisyon ise `PhoneCluster` işi.
 */

/**
 * Ölçüler üç kademeli: <520px oranlı (vw) · 520-640px · ≥640px.
 *
 * En dar kademede neden sabit piksel değil de `vw`:
 * Üç telefonluk yelpaze, ortadaki 196px ve yanlardaki 152px ile yaklaşık
 * 460px yer kaplıyor. 390px'lik bir ekranda kenar boşluklarından sonra
 * 350px alan kalıyor — yani sabit ölçülerle taşıyor. Sabit bir küçük
 * kademe eklemek de yetmiyordu: kademe sınırının hemen üstünde (430px)
 * büyük ölçüler devreye girip yelpazeyi yine kesiyordu.
 *
 * `vw` ile yelpaze ekran genişliğiyle birlikte süzülüyor, hiçbir genişlikte
 * kesilmiyor ve 520px'te sabit kademeye neredeyse birebir denk geliyor
 * (38vw ≈ 197px), yani geçiş göze çarpmıyor.
 *
 * Köşe yarıçapı ve dynamic island da `vw` — sabit bırakılsalardı telefon
 * küçüldükçe orantısız büyük görünürlerdi.
 */
const sizes = {
  /** Yelpazenin ortasındaki dominant telefon */
  default: {
    frame:
      "w-[38vw] rounded-[6.2vw] p-[1.3vw] min-[520px]:w-[196px] min-[520px]:rounded-[32px] min-[520px]:p-[7px] sm:w-[238px] sm:rounded-[38px] sm:p-[8px]",
    island:
      "top-[2.6vw] h-[2.9vw] w-[10.3vw] min-[520px]:top-[13px] min-[520px]:h-[14px] min-[520px]:w-[52px] sm:top-[16px] sm:h-[17px] sm:w-[64px]",
    screen: "rounded-[5vw] min-[520px]:rounded-[26px] sm:rounded-[31px]",
    imageSizes: "(max-width: 520px) 38vw, (max-width: 640px) 196px, 238px",
  },
  /** Yelpazenin arkasındaki telefonlar */
  small: {
    frame:
      "w-[29vw] rounded-[4.9vw] p-[1.05vw] min-[520px]:w-[152px] min-[520px]:rounded-[26px] min-[520px]:p-[6px] sm:w-[194px] sm:rounded-[32px] sm:p-[7px]",
    island:
      "top-[2.1vw] h-[2.1vw] w-[8vw] min-[520px]:top-[10px] min-[520px]:h-[11px] min-[520px]:w-[42px] sm:top-[13px] sm:h-[14px] sm:w-[54px]",
    screen: "rounded-[3.9vw] min-[520px]:rounded-[21px] sm:rounded-[26px]",
    imageSizes: "(max-width: 520px) 29vw, (max-width: 640px) 152px, 194px",
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

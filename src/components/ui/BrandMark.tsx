/**
 * "hD" monogramı — h'nin sağ gövdesi aynı zamanda D'nin gövdesi (ligatür).
 *
 * Gradyan renkleri CSS değişkeninden geliyor, bu yüzden tema değiştiğinde
 * marka da kendiliğinden uyum sağlıyor: açık temada koyu gövde + mavi köşe,
 * koyu temada açık gövde + camgöbeği köşe.
 *
 * NOT: Aşağıdaki `d` değerleri favicon üretiminde de kullanılıyor.
 * `scripts/build-icons.mjs` bu dosyayı okuyup path'leri buradan alır —
 * geometriyi değiştirmek için tek yer burasıdır.
 */

export const BRAND_VIEWBOX = "0 0 78 64";

/* h gövdesi + h omzu + D (iç boşluk evenodd ile oyuluyor) */
export const BRAND_PATH =
  [
    "M0 0h14v64H0z", //                         h gövdesi
    "M14 32L28.5 19v14L14 46z", //              diyagonal omuz (D'den hairline boşlukla ayrı)
    "M30 0h16a32 32 0 0 1 0 64H30z", //         D dış hattı
    "M44 14a18 18 0 0 1 0 36z", //              D iç boşluğu (evenodd ile oyulur)
  ].join(" ");

export function BrandMark({
  className = "",
  /** Aynı sayfada birden fazla kullanıldığında gradyan id'si çakışmasın */
  gradientId = "brand-mark",
}: {
  className?: string;
  gradientId?: string;
}) {
  return (
    <svg
      viewBox={BRAND_VIEWBOX}
      className={className}
      role="img"
      aria-label="Hamit Dincel"
      fill="none"
    >
      <defs>
        {/* objectBoundingBox: konumdan bağımsız, sol-alttan sağ-üste */}
        <linearGradient id={gradientId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="var(--brand-from)" />
          <stop offset="0.55" stopColor="var(--brand-mid)" />
          <stop offset="1" stopColor="var(--brand-to)" />
        </linearGradient>
      </defs>
      <path fill={`url(#${gradientId})`} fillRule="evenodd" d={BRAND_PATH} />
    </svg>
  );
}

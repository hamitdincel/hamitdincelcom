/**
 * Marka monogramının OG görsellerinde kullanılabilir hâli.
 *
 * `next/og` (satori) inline SVG yerine <img> beklediği için data URI olarak
 * gömülüyor. İçerik `scripts/build-icons.mjs` ile aynı geometriden üretildi;
 * marka şekli değişirse `node scripts/build-icons.mjs` çalıştırıp bu dosyayı
 * da yenileyin.
 */
export const BRAND_MARK_DATA_URI =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3OCA2NCIgZmlsbD0ibm9uZSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJtIiB4MT0iMCIgeTE9IjEiIHgyPSIxIiB5Mj0iMCI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjJkM2VlIi8+PHN0b3Agb2Zmc2V0PSIwLjU1IiBzdG9wLWNvbG9yPSIjOTNkM2ZiIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTAgMGgxNHY2NEgweiBNMTQgMzJMMjguNSAxOXYxNEwxNCA0NnogTTMwIDBoMTZhMzIgMzIgMCAwIDEgMCA2NEgzMHogTTQ0IDE0YTE4IDE4IDAgMCAxIDAgMzZ6ICAiIGZpbGw9InVybCgjbSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==";

/** Monogramın en-boy oranı (genişlik / yükseklik) */
export const BRAND_ASPECT = 1.2188;

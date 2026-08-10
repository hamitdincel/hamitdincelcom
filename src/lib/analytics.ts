/**
 * Analitik ve site doğrulama ayarları.
 *
 * Buradaki iki değer **gizli değil** — GA ölçüm kimliği ve doğrulama token'ı
 * zaten sayfa kaynağında herkese görünür. Depoda sabit durmaları bilinçli:
 * Vercel'de ortam değişkeni eklemeyi unutunca analitiğin sessizce kapalı
 * kalmasını önlüyor. Farklı bir mülk (ör. test property'si) kullanmak
 * isterseniz ortam değişkeni bu varsayılanları ezer.
 *
 * Vercel'de: Settings → Environment Variables
 * Yerelde:   .env.local  (bkz. .env.example)
 */

/** GA4 ölçüm kimliği — analytics.google.com → Veri akışları */
const DEFAULT_GA_ID = "G-HQVFVMBXR0";

/** Search Console doğrulama token'ı */
const DEFAULT_SITE_VERIFICATION = "5o-xJo-EEzxV8y4VLdFw50NE4ADL917yGzbwSsHEMMI";

const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() || DEFAULT_GA_ID;

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
  DEFAULT_SITE_VERIFICATION;

/**
 * Analitik yalnızca üretimde yüklensin.
 *
 * `next dev` ve önizleme (preview) dağıtımlarındaki gezintilerin gerçek
 * ziyaretçi verisine karışmasını istemiyoruz.
 */
export const analyticsId =
  gaId && process.env.NODE_ENV === "production" ? gaId : undefined;

export const siteVerification = googleVerification || undefined;

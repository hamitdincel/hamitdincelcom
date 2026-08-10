import {
  Boxes,
  Braces,
  Clock,
  MonitorSmartphone,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import type {
  Capability,
  FaqItem,
  HeroTech,
  ProcessStep,
  Service,
  TechGroup,
} from "./types";

/* --------------------------------------------------------- Hero yetkinlik */

/** Hero altındaki şerit. Uydurma metrik yerine gerçek yetkinlik alanları. */
export const capabilities: Capability[] = [
  {
    index: "01",
    title: "Native Mobil",
    detail: "SwiftUI ve Jetpack Compose ile iOS + Android",
  },
  {
    index: "02",
    title: "Backend",
    detail: ".NET ile REST API ve veritabanı tasarımı",
  },
  {
    index: "03",
    title: "Teslim",
    detail: "App Store ve Google Play yayın süreçleri",
  },
  {
    index: "04",
    title: "Bakım",
    detail: "Analitik, çökme takibi ve sürüm güncellemeleri",
  },
];

/** Telefon kompozisyonunun çevresindeki mini kartlar — en fazla 3 tane. */
export const heroTech: HeroTech[] = [
  { icon: Smartphone, label: "SwiftUI", sub: "Native iOS" },
  { icon: Boxes, label: "Jetpack Compose", sub: "Native Android" },
  { icon: Braces, label: ".NET", sub: "REST API" },
];

/** Hero altındaki sakin tipografik satır */
export const heroTechLine = [
  "SwiftUI",
  "Jetpack Compose",
  ".NET",
  "Firebase",
];

/* ------------------------------------------------------------------ Hakkımda */

/* ------------------------------------------------------------------- Künye */

/**
 * Kişisel bilgiler.
 *
 * Yaş ve deneyim yılı sabit yazılmıyor, referans yıllarından türetiliyor —
 * böylece her yıl elle güncellemek gerekmiyor. Değerler build sırasında
 * hesaplandığı için her yayında tazelenir.
 *
 * `birthYear` yalnızca yıl tuttuğundan, doğum günü henüz geçmediyse yaş bir
 * fazla görünebilir; gerekirse buradan düzeltin.
 */
export const profile = {
  birthYear: 1999,
  careerStartYear: 2021,
  university: "Karadeniz Teknik Üniversitesi",
  degree: "Bilgisayar Bilimleri",
} as const;

const currentYear = new Date().getFullYear();

export const age = currentYear - profile.birthYear;
export const yearsOfExperience = currentYear - profile.careerStartYear;

/** Hakkımda bölümündeki künye satırları */
export const aboutFacts = [
  { label: "Eğitim", value: `${profile.university} — ${profile.degree}` },
  { label: "Deneyim", value: `${yearsOfExperience} yıl` },
  { label: "Yaş", value: String(age) },
  { label: "Konum", value: "Türkiye · Uzaktan çalışmaya uygun" },
];

/** Hakkımda bölümünün sol kolonundaki büyük ifade */
export const aboutStatement =
  "Mobil uygulamayı yalnızca ekranlardan ibaret görmüyorum.";

export const aboutParagraphs = [
  `Asıl mesleğim **mobil uygulama geliştirici**. ${profile.university} ${profile.degree} mezunuyum ve ${yearsOfExperience} yıldır bu alanda çalışıyorum. iOS tarafında SwiftUI, Android tarafında Kotlin ve Jetpack Compose kullanıyorum. Hibrit çerçevelerle sarılmış web sayfaları yerine, platformun kendi araçlarıyla yazılmış; açılışı hızlı, kaydırması akıcı, pili yormayan uygulamalar üretiyorum.`,
  "Ama bir uygulama tek başına yaşamaz. Beslendiği bir servis, içeriğin girildiği bir panel ve düzgün tasarlanmış bir API ister. Bu yüzden **.NET ile REST API'ler**, veritabanı modelleri ve web arayüzleri de işimin doğal parçası. Sonuç: proje farklı ekipler arasında bölünmeden, tek bir bütün olarak ilerliyor.",
  "Yazdığım kodun beni değil, sizi rahat ettirmesini önemsiyorum. Gösterişli ama kırılgan çözümler yerine okunabilir kod, net mimari ve altı ay sonra da üzerine rahatça ekleme yapılabilen yapılar kuruyorum.",
];

export const aboutPoints = [
  {
    icon: Smartphone,
    title: "Native öncelik",
    description:
      "SwiftUI ve Jetpack Compose. Platformun kendi hissiyatı, kesintisiz akış.",
  },
  {
    icon: Braces,
    title: "Uygulama + API + panel",
    description:
      "Üç parçayı da ben kurduğum için aralarında sürpriz uyumsuzluk çıkmıyor.",
  },
  {
    icon: ShieldCheck,
    title: "Mağaza süreçleri bende",
    description:
      "App Store Connect ve Play Console yönetimi, ret gerekçeleri, sürüm çıkışları.",
  },
  {
    icon: Clock,
    title: "Yayından sonra da varım",
    description:
      "Hata takibi, işletim sistemi güncellemelerine uyum ve yeni özellik eklemeleri.",
  },
] as const;

/* ----------------------------------------------------------------- Hizmetler */

export const services: Service[] = [
  {
    id: "mobil",
    icon: Smartphone,
    title: "Mobil Uygulama Geliştirme",
    stackLine: "iOS / Android · SwiftUI / Compose",
    description:
      "Sıfırdan native iOS ve Android uygulaması; ya da yıllardır sürüklenen eski bir uygulamanın modern mimariyle yeniden yazılması.",
    bullets: [
      "iOS — Swift, SwiftUI, MVVM",
      "Android — Kotlin, Jetpack Compose, Material 3",
      "Offline önbellek ve akıcı liste performansı",
      "Push bildirim, analitik, çökme takibi",
    ],
  },
  {
    id: "api",
    icon: Braces,
    title: "REST API & Backend",
    stackLine: ".NET 9 / ASP.NET Core · EF Core",
    description:
      "Uygulamanızı besleyecek servisler. Katmanlı mimaride yazılmış, dokümante edilmiş ve büyümeye hazır bir arka uç.",
    bullets: [
      "ASP.NET Core ve Entity Framework Core",
      "JWT kimlik doğrulama, rol ve yetki yönetimi",
      "Veritabanı tasarımı ve migration yönetimi",
      "Clean Architecture — test edilebilir katmanlar",
    ],
  },
  {
    id: "web",
    icon: MonitorSmartphone,
    title: "Web Sitesi & Yönetim Paneli",
    stackLine: "Next.js / TypeScript · Tailwind",
    description:
      "Kurumsal siteler, tanıtım sayfaları ve içeriğinizi kendi başınıza yönetebileceğiniz paneller. Teknik destek beklemeden çalışın.",
    bullets: [
      "Mobil öncelikli, hızlı açılan arayüzler",
      "İçerik ve kullanıcı yönetim paneli",
      "SEO temelleri ve performans optimizasyonu",
      "Mobil uygulamayla ortak veri kaynağı",
    ],
  },
  {
    id: "entegrasyon",
    icon: Boxes,
    title: "Entegrasyon & Mağaza Yayını",
    stackLine: "Firebase · App Store / Google Play",
    description:
      "Üçüncü parti servislerin bağlanması ve uygulamanızın mağazalarda yayına alınması — hesap açılışından ilk indirmeye kadar.",
    bullets: [
      "Firebase: bildirim, analitik, Crashlytics",
      "Ödeme, harita ve dış servis entegrasyonları",
      "App Store Connect & Play Console kurulumu",
      "Sürüm çıkışı, ret itirazı ve bakım desteği",
    ],
  },
];

/* --------------------------------------------------------------------- Süreç */

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Konuşma ve kapsam",
    description:
      "Ne yapmak istediğinizi dinliyorum. Teknik terimlere boğmadan; neyin gerçekten gerekli, neyin sonraya bırakılabilir olduğunu birlikte netleştiriyoruz. Çıktısı: net bir özellik listesi, süre ve bütçe.",
  },
  {
    step: "02",
    title: "Tasarım ve mimari",
    description:
      "Ekran akışlarını ve veri yapısını kuruyorum. Uygulamanın nasıl görüneceğini kod yazılmadan önce görüyorsunuz; API'nin nasıl kurgulanacağına da bu aşamada karar veriliyor.",
  },
  {
    step: "03",
    title: "Geliştirme ve ara teslimler",
    description:
      "Uygulama parça parça değil, çalışır sürümler halinde ilerliyor. Belirli aralıklarla test sürümünü telefonunuza kurup kendiniz deniyorsunuz — işin sonunda sürprizle karşılaşmıyorsunuz.",
  },
  {
    step: "04",
    title: "Yayın ve sonrası",
    description:
      "App Store ve Google Play başvurularını, mağaza metinlerini ve görsellerini ben hazırlıyorum. Yayından sonra hata takibi, işletim sistemi güncellemelerine uyum ve yeni özellikler için de aynı yerdeyim.",
  },
];

/* --------------------------------------------------------------- Teknolojiler */

export const techGroups: TechGroup[] = [
  {
    label: "Mobil",
    items: [
      "Swift",
      "SwiftUI",
      "Kotlin",
      "Jetpack Compose",
      "Material 3",
      "MVVM",
      "Room",
      "Retrofit",
      "Coil",
    ],
  },
  {
    label: "Backend",
    items: [
      "C#",
      ".NET 9",
      "ASP.NET Core",
      "Entity Framework Core",
      "REST API",
      "JWT",
      "Clean Architecture",
      "SQL",
    ],
  },
  {
    label: "Web",
    items: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
  },
  {
    label: "Servisler & Araçlar",
    items: [
      "Firebase",
      "FCM",
      "Firebase Analytics",
      "Crashlytics",
      "Git",
      "Vercel",
      "App Store Connect",
      "Google Play Console",
    ],
  },
];

/** Kapanış CTA'sının altındaki sakin yetkinlik satırı */
export const closingCapabilities = [
  "iOS",
  "Android",
  "Backend",
  "Mağaza Teslimi",
];

/* ----------------------------------------------------------------------- SSS */

export const faqItems: FaqItem[] = [
  {
    question: "Bir mobil uygulama ne kadar sürede biter?",
    answer:
      "Kapsama bağlı. İçerik akışı ve bildirim içeren orta ölçekli bir uygulama genelde birkaç ay sürer; kullanıcı hesabı, ödeme veya karmaşık iş kuralları girdiğinde bu süre uzar. İlk görüşmenin ardından size tahmin değil, özellik özellik ayrılmış net bir takvim veriyorum.",
  },
  {
    question: "Neden hibrit değil de native geliştirme?",
    answer:
      "Hibrit çözümler ilk sürümü hızlandırabilir; ama uzun vadede performans, işletim sistemi yeniliklerine erişim ve mağaza uyumu tarafında bedel ödetir. Native yazılan bir uygulama daha hızlı açılır, daha akıcı çalışır ve yıllar içinde bakımı daha ucuza gelir.",
  },
  {
    question: "Sadece iOS veya sadece Android yaptırabilir miyim?",
    answer:
      "Elbette. Çoğu proje tek platformla başlayıp kullanıcı ilgisi netleştikten sonra diğerine geçiyor. İkinci platform sonradan eklendiğinde de API ve veri yapısı hazır olduğu için süreç belirgin şekilde kısalıyor.",
  },
  {
    question: "Elimde yarım kalmış bir proje var, devralır mısınız?",
    answer:
      "Devralıyorum. Önce mevcut kodu inceleyip dürüst bir değerlendirme sunuyorum: üzerine devam etmek mi, belirli katmanları yeniden yazmak mı daha mantıklı. Hangisinin size daha az maliyet çıkaracağını gerekçesiyle anlatıyorum.",
  },
  {
    question: "Uygulamanın kodu ve mağaza hesapları kime ait olur?",
    answer:
      "Size ait olur. Kaynak kodu, tasarım dosyaları ve mağaza hesapları sizin adınıza açılır ve teslim edilir. Devam etmek istemediğiniz noktada projeniz başka bir geliştiriciye bağımlılık yaratmadan sizinle kalır.",
  },
  {
    question: "Yayın sonrası destek veriyor musunuz?",
    answer:
      "Evet. iOS ve Android her yıl yeni sürüm çıkarıyor; uygulamaların da bunlara uyum sağlaması gerekiyor. Hata düzeltmeleri, mağaza güncellemeleri ve yeni özellik eklemeleri için sürekli bir çalışma modeli kurabiliyoruz.",
  },
];

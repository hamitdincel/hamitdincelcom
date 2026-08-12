import type { Project } from "./types";

/**
 * Referans projeleri.
 *
 * `screens` dizisinin ilk üç öğesi ana sayfadaki telefon yelpazesinde,
 * tamamı ise detay sayfasındaki galeride kullanılır.
 */
export const projects: Project[] = [
  {
    slug: "residio",
    name: "Residio",
    tagline:
      "Rezidans yönetimini tek platforma toplayan sakin, teknisyen ve yönetim uygulaması — aidattan teknik talebe, rezervasyondan ziyaretçi kaydına.",
    category: "Rezidans Yönetimi",
    platforms: "iOS + Android + Web paneli",
    icon: "/images/residio.jpg",

    summary:
      "Bir rezidansın günlük işleyişi bugün WhatsApp grupları, kâğıt defterler ve telefon aramaları arasında dağılıyor. Residio bunu üç istemcide topluyor: sakin için mobil uygulama, teknisyen için görev akışı, yönetim için web paneli.",

    overview: [
      "Aidat tahsilatı, teknik arıza takibi, ortak alan rezervasyonu, ziyaretçi kaydı ve duyuru dağıtımı — bunların her biri ayrı bir kanaldan yürüdüğünde kimse bütünü göremiyor. Sakin ödemesinin işlenip işlenmediğini bilmiyor, teknisyen hangi işin öncelikli olduğunu takip edemiyor, yönetim de aylık tabloyu elle çıkarıyor.",
      "Residio üç rolü tek veri modeli üzerinde birleştiriyor. Sakinin uygulamadan açtığı talep teknisyenin görev listesine düşüyor, tamamlandığında yönetimin raporuna işleniyor; ödeme yapıldığında aidat kaydı ve gecikme zammı hesabı aynı anda kapanıyor.",
    ],

    challenge: {
      title: "Zorluk",
      body: "Üç farklı rol aynı veriyi bambaşka ihtiyaçlarla görüyor: sakin kendi dairesini, teknisyen atandığı görevleri, yönetim binanın tamamını. Yetki sınırlarının veri katmanında kurulması gerekiyordu — arayüzde gizlemek yeterli değil. Denetim turlarından birinde teknisyenin dashboard üzerinden tahsilat grafiğini görebildiği ortaya çıktı ve bu, politika katmanı sıkılaştırılarak kapatıldı.",
    },

    approach: {
      title: "Yaklaşım",
      body: "Yetkilendirme rol tabanlı politikalarla sunucuda kuruldu; her uç nokta kendi politikasından geçiyor. Ödeme, talep ve rezervasyon gibi durum değiştiren işlemler tek bir aksiyon katmanında toplandı, böylece aynı iş kuralı panelde ve mobilde ayrışmıyor. Kritik akışların her biri test altına alındı.",
    },

    role: {
      title: "Benim rolüm",
      body: "Ürünün tamamı: veri modeli ve API tasarımı, Laravel tabanlı backend ve yönetim paneli, Expo ile sakin ve teknisyen mobil uygulamaları. Kapsam dokümanından çalışır sisteme kadar tek elden yürütüldü; dört ayrı denetim turunda bulunan hatalar düzeltilip her biri için tekrar kaçmasını engelleyen test yazıldı.",
    },

    delivery: {
      title: "Durum",
      body: "Geliştirme tamamlandı: 13 panel ekranı, 20 mobil ekran, 40'tan fazla API ucu ve 509 test çalışır durumda. Mağaza yayını için ödeme sağlayıcısı entegrasyonu ve üretim sunucularının kurulumu bekleniyor — bunlar kod tarafında hazır, dış hesap onaylarına bağlı.",
    },

    features: [
      {
        title: "Aidat ve ödeme",
        detail: "dönemsel faturalama, gecikme zammı, kayıtlı kart ve tahsilat takibi",
      },
      {
        title: "Teknik talep akışı",
        detail: "kategori, fotoğraf, malzeme ve puanlama ile sakinden teknisyene uçtan uca",
      },
      {
        title: "Rezervasyon ve ziyaretçi",
        detail: "ortak alan müsaitliği, çakışma kontrolü ve QR ile ziyaretçi girişi",
      },
      {
        title: "Dashboard ve raporlama",
        detail: "dört rapor, CSV ve PDF dışa aktarma, işlem günlüğü",
      },
    ],

    decisions: [
      {
        title: "Yetki arayüzde değil veride",
        body: "Her rol için ayrı politika sınıfı yazıldı ve sorgular bunlardan geçiriliyor. Bir alanı arayüzde gizlemek yetki değildir; denetimde teknisyenin tahsilat verisine erişebildiği tam da bu yüzden ortaya çıktı.",
      },
      {
        title: "Tek aksiyon katmanı",
        body: "Ödeme kaydetme, talep durumu değiştirme gibi işlemler panel ve mobil için ayrı ayrı yazılmadı. Aynı aksiyon her iki istemciden çağrılıyor, iş kuralı tek yerde duruyor.",
      },
      {
        title: "Tekrarlanan geri düğmesi tek bileşene indi",
        body: "Geri oku on altı ekranda kopyalanmıştı ve bildirimden derin bağlantıyla açıldığında geçmiş boş olduğu için hiçbir şey yapmıyordu. Tek bileşene indirildi; geçmiş yoksa ana sayfaya düşüyor.",
      },
      {
        title: "Çift tıklama koruması",
        body: "Satır içi işlem düğmeleri form gönderimlerinden farklı olarak kilitlenmiyordu; ikinci istek sunucudaki iş kuralına takılıp işlem başarılı olmasına rağmen kullanıcıya hata gösteriyordu. Uçuş kilidi eklendi ve tarayıcı testiyle doğrulandı.",
      },
    ],

    meta: [
      { label: "Rol", value: "Ürünün tamamı — backend, panel, mobil" },
      { label: "İstemciler", value: "Sakin ve teknisyen mobil, yönetim web paneli" },
      { label: "Kapsam", value: "13 panel ekranı · 20 mobil ekran · 40+ API ucu" },
      { label: "Durum", value: "Geliştirme tamam, yayın hazırlığı sürüyor" },
    ],

    screens: [
      {
        src: "/images/shots/rs-1.jpg",
        title: "Sakin ana sayfası",
        caption:
          "Ödenmemiş aidat en üstte, tek dokunuşla ödeme. Altında hızlı işlemler, duyurular ve sakinin açtığı taleplerin güncel durumu.",
      },
      {
        src: "/images/shots/rs-2.jpg",
        title: "Aidatlar",
        caption:
          "Ödenecekler, geçmiş ödemeler ve otomatik ödeme ayrı sekmelerde. Kayıtlı kartlar ve fatura kalemleri aynı ekranda; toplam tutar üstte sabit.",
      },
      {
        src: "/images/shots/rs-3.jpg",
        title: "Teknik talep",
        caption:
          "Kategori seçimi, açıklama ve en fazla üç fotoğraf. Konum sakinin dairesinden otomatik geliyor, teknisyen talebi eksiksiz alıyor.",
      },
      {
        src: "/images/shots/rs-4.jpg",
        title: "Rezervasyon",
        caption:
          "Ortak alanlar kapasiteleriyle listeleniyor. Yaklaşan rezervasyonlar onay durumuyla görünüyor; çakışma kontrolü sunucu tarafında.",
      },
      {
        src: "/images/shots/rs-5.jpg",
        title: "Ziyaretçi kaydı",
        caption:
          "Günlük ziyaretçi listesi giriş durumu, plaka ve saatle birlikte. QR ile kayıt ve toplu giriş güvenlik ekranından yönetiliyor.",
      },
      {
        src: "/images/shots/rs-6.jpg",
        title: "Teknisyen görevleri",
        caption:
          "Görevler durum sekmelerine ayrılmış, her kartta öncelik rozeti, daire bilgisi ve fotoğraf. İlerleme çizgisi işin hangi aşamada olduğunu gösteriyor.",
      },
    ],

    status: "Geliştirme tamamlandı — yayın hazırlığı sürüyor",

    tags: [
      "Laravel",
      "React Native",
      "Expo",
      "Inertia",
      "React",
      "PostgreSQL",
    ],

    stack: [
      {
        label: "Backend",
        items: [
          "PHP 8.3",
          "Laravel 13",
          "PostgreSQL",
          "Redis",
          "Sanctum",
          "Spatie Permission",
        ],
      },
      {
        label: "Panel",
        items: ["Inertia", "React", "Tailwind CSS", "Vite"],
      },
      {
        label: "Mobil",
        items: ["React Native", "Expo Router", "TanStack Query", "Reanimated"],
      },
      {
        label: "Servisler",
        items: ["Expo Push", "Sentry", "Cloudflare R2", "DomPDF"],
      },
    ],
  },

  {
    slug: "medya-tilkisi",
    name: "Medya Tilkisi",
    tagline:
      "Günde yüzlerce haber yayınlayan bir portalın mobil karşılığı — hikâye şeridinden son dakika bildirimine.",
    category: "Haber & Medya",
    platforms: "iOS + Android",
    icon: "/images/medyatilkisi.jpg",

    summary:
      "2019'dan beri yayın yapan Medyatilkisi.com.tr'nin resmî mobil uygulaması. Gündem, magazin, spor, ekonomi ve video kategorilerinde sürekli akan yüksek hacimli içeriği mobilde tutarlı bir hızda göstermek gerekiyordu.",

    overview: [
      "Medyatilkisi.com.tr 2019'da yayına başladı ve bugün Türkiye'nin takip edilen haber portallarından biri. Gündem, magazin, yerel, spor, ekonomi, siyaset ve video başlıklarında gün boyu içerik üretiyor.",
      "Uygulamanın işi bu akışı mobilde sindirilebilir hale getirmekti: okuyucu uygulamayı açtığında ne olduğunu bir bakışta görmeli, aradığı kategoriye iki dokunuşta ulaşmalı ve son dakika haberini uygulamayı açmadan öğrenmeliydi.",
    ],

    challenge: {
      title: "Zorluk",
      body: "Haber uygulamalarında içerik dakikalar içinde eskiyor. Her ekran açılışında ağdan tam veri çekmek hem yavaş hem de zayıf bağlantıda kırılgan. Diğer yandan önbelleği fazla agresif tutmak, okuyucuya bayat manşet göstermek demek. Bu ikisi arasındaki dengeyi kurmak gerekiyordu.",
    },

    approach: {
      title: "Yaklaşım",
      body: "Ekranlar önce önbellekten çiziliyor, tazeleme arka planda yapılıyor. Böylece uygulama her koşulda anında açılıyor; veri geldiğinde liste boş ekran göstermeden kendini güncelliyor. Son dakika içerikleri bu döngünün dışında tutulup doğrudan bildirim üzerinden akıyor.",
    },


    role: {
      title: "Benim rolüm",
      body: "Ürünün mobil tarafının tamamı: ekran akışlarının kurgusu, iOS ve Android uygulamalarının yazılması, içerik API'siyle entegrasyon, bildirim altyapısının kurulması ve iki mağazada da yayın süreçlerinin yürütülmesi. Tasarım ve geliştirme aynı elde olduğu için arayüz kararları teknik kısıtlarla birlikte alındı.",
    },

    delivery: {
      title: "Teslim",
      body: "iOS ve Android sürümleri App Store ve Google Play'de yayında. Mağaza metinleri, ekran görselleri ve sürüm çıkışları da tarafımdan hazırlanıyor; işletim sistemi güncellemelerine uyum ve hata düzeltmeleri devam ediyor.",
    },

    features: [
      {
        title: "Hikâye şeridi",
        detail: "kategori bazlı öne çıkan içerikler ana sayfanın en üstünde",
      },
      {
        title: "Son dakika akışı",
        detail: "canlı rozeti ve ayrı sekmesiyle gündemden kopmayan bir şerit",
      },
      {
        title: "Köşe yazarı profilleri",
        detail: "yazar sayfası, sosyal hesaplar ve o yazara ait makale arşivi",
      },
      {
        title: "Kaydetme ve paylaşma",
        detail: "haber detayında okuma listesi ve sistem paylaşım sayfası",
      },
    ],

    decisions: [
      {
        title: "Önce önbellek, sonra ağ",
        body: "Liste ekranları yerel veriyle anında çiziliyor, güncelleme arka planda tamamlanınca fark uygulanıyor. Okuyucu hiçbir zaman boş bir ekrana bakmıyor.",
      },
      {
        title: "Görsel yükleme bütçesi",
        body: "Haber listeleri görsel ağırlıklı. Boyutlandırma sunucu tarafında yapılıyor, istemcide de bellek içi bir önbellek katmanı var — uzun listelerde kaydırma takılmıyor.",
      },
      {
        title: "Bildirim ile içerik eşleşmesi",
        body: "Push bildirimi yalnızca uyarı değil, hedef içeriğin kimliğini de taşıyor. Bildirime dokunan okuyucu ana sayfaya değil doğrudan ilgili habere düşüyor.",
      },
      {
        title: "Tek tasarım dili, iki platform",
        body: "iOS ve Android ayrı ayrı native yazıldı; ancak tipografi, aralık ve renk kararları ortak bir ölçekten türetildi. İki uygulama aynı ürün gibi duruyor, ama her biri kendi platformunun hissiyatını koruyor.",
      },
    ],

    meta: [
      { label: "Rol", value: "Tasarım, geliştirme ve yayın — tek kişi" },
      { label: "Platformlar", value: "iOS ve Android (ayrı native kod tabanları)" },
      { label: "Kapsam", value: "Mobil uygulama + içerik API entegrasyonu" },
      { label: "Durum", value: "İki mağazada da yayında, aktif bakımda" },
    ],

    screens: [
      {
        src: "/images/shots/mt-1.jpg",
        title: "Ana sayfa",
        caption:
          "En üstte kategori hikâyeleri, altında canlı rozetli son dakika şeridi ve üst manşetler. Okuyucu uygulamayı açtığı anda gündemi tek ekranda görüyor.",
      },
      {
        src: "/images/shots/mt-2.jpg",
        title: "Manşet ve köşe yazarları",
        caption:
          "Kaydırmalı ana manşet alanı ve hemen altında yazar avatarları. Sadık okuyucunun takip ettiği yazara ulaşması iki dokunuş sürüyor.",
      },
      {
        src: "/images/shots/mt-3.jpg",
        title: "Yazar profili",
        caption:
          "Yazarın kısa tanıtımı, sosyal hesapları, toplam makale sayısı ve son yazı tarihi; altında o yazara ait tüm makaleler.",
      },
      {
        src: "/images/shots/mt-4.jpg",
        title: "Haber detayı",
        caption:
          "Tam genişlikte kapak, kategori etiketi ve okunaklı gövde metni. Üst çubukta kaydetme ve paylaşma; altta okuma süresi ve görüntülenme.",
      },
      {
        src: "/images/shots/mt-5.jpg",
        title: "Keşfet",
        caption:
          "Biyografi, röportaj ve editörün seçimi gibi kürasyon blokları. Gündem dışı içeriğin de görünür kalmasını sağlıyor.",
      },
      {
        src: "/images/shots/mt-6.jpg",
        title: "Kategori listesi",
        caption:
          "Yoğun okuma için sıkı bir liste düzeni: küçük görsel, kategori etiketi, özet ve kaydetme düğmesi.",
      },
    ],

    status: "App Store ve Google Play'de yayında",

    tags: [
      "SwiftUI",
      "Kotlin",
      "Jetpack Compose",
      "Firebase",
      "Push Bildirim",
      "REST API",
    ],

    stack: [
      { label: "iOS", items: ["Swift", "SwiftUI", "MVVM", "Combine"] },
      {
        label: "Android",
        items: [
          "Kotlin",
          "Jetpack Compose",
          "Material 3",
          "Retrofit",
          "Room",
          "Coil",
        ],
      },
      { label: "Servisler", items: ["Firebase Cloud Messaging", "Analytics", "Crashlytics"] },
      { label: "Yayın", items: ["App Store Connect", "Google Play Console"] },
    ],

    links: {
      appStore: "https://apps.apple.com/tr/app/medya-tilkisi/id6482855034",
      googlePlay:
        "https://play.google.com/store/apps/details?id=medyatilkisi.com.tr",
    },
  },

  {
    slug: "akca-koca-kultur-platformu",
    name: "Akça Koca Kültür Platformu",
    tagline:
      "Bir derneğin dağınık duyuru gruplarını tek uygulamada toplayan kültür ve topluluk platformu.",
    category: "Kültür & Topluluk",
    platforms: "iOS + Android",
    icon: "/images/akcakoca.jpg",

    summary:
      "2014'te Kocaeli'de kurulan Akça Koca Kültür Platformu'nun resmî uygulaması. Farklı meslek gruplarından üyelere sahip bir derneğin duyuru, etkinlik ve haber akışını dağınık gruplardan tek bir uygulamaya taşımak hedeflendi.",

    overview: [
      "Akça Koca Kültür Platformu 2014'te Kocaeli'de kuruldu. Çeşitli meslek gruplarından genç ve dinamik bir üye profiline sahip; gezi, konferans, ziyaret ve gençlik programları düzenliyor.",
      "Dernek içeriği yıllar içinde farklı kanallara dağılmıştı: duyurular bir yerde, gezi fotoğrafları başka yerde, yazılar sitede. Uygulama bunların hepsini tek bir yerde toplayacak ve üyenin haberi kaçırmamasını sağlayacaktı.",
    ],

    challenge: {
      title: "Zorluk",
      body: "Dernek içeriği bir haber sitesinden farklı: gezi yazısı, sanat galerisi, konferans duyurusu ve üye biyografisi aynı akışta yan yana durmak zorunda. Bunları tek bir liste tasarımına sıkıştırmak içeriği birbirine benzetiyor, tamamen ayırmak ise uygulamayı dağıtıyordu.",
    },

    approach: {
      title: "Yaklaşım",
      body: "İçerik türleri ortak bir kart yapısı üzerinde ama farklı ağırlıklarla sunuldu: galeri kendi rozetiyle ve büyük görselle, yazılar okuma odaklı tipografiyle, kategoriler ise renk kodlu bir ızgarayla. Aynı uygulama içinde kalırken her tür kendi karakterini koruyor.",
    },


    role: {
      title: "Benim rolüm",
      body: "Derneğin dağınık içerik akışını tek bir bilgi mimarisinde toplayıp iOS ve Android uygulamalarını sıfırdan geliştirdim. İçerik türlerinin (yazı, galeri, etkinlik, üye) tek akışta nasıl yan yana duracağına dair tasarım kararları da bu kapsamdaydı.",
    },

    delivery: {
      title: "Teslim",
      body: "İki platformda da yayında. Dernek yönetimi içeriği kendi girebiliyor; uygulama tarafında sürüm güncellemeleri ve bildirim yönetimi devam ediyor.",
    },

    features: [
      {
        title: "Kategori ızgarası",
        detail: "Yurtiçi gezi, konferans, ziyaret ve duyuru renk kodlu kartlarla",
      },
      {
        title: "Sanat ve gezi galerisi",
        detail: "üyelerin eserleri ve etkinlik fotoğrafları için ayrı galeri akışı",
      },
      {
        title: "Yazar dizini",
        detail: "arama kutusu ve avatar ızgarasıyla yazara doğrudan erişim",
      },
      {
        title: "Çevrimdışı okuma",
        detail: "Room ile yerel kayıt — bağlantı olmadan da arşive erişim",
      },
    ],

    decisions: [
      {
        title: "Ortak kod tabanı, farklı kimlik",
        body: "Medya Tilkisi ile aynı mimari iskelet üzerine kuruldu; tema, tipografi ve içerik modeli değiştirildi. Bir uygulamada çözülen bir sorunun diğerine taşınması bu sayede günler değil saatler sürüyor.",
      },
      {
        title: "Renk kodlu kategoriler",
        body: "Dernek içeriği tür bakımından çeşitli. Kategorilere sabit renk atanması, üyenin listede aradığını okumadan önce tanımasını sağlıyor.",
      },
      {
        title: "Yerel veritabanı katmanı",
        body: "Room ile okunan içerik cihazda saklanıyor. Etkinlik alanlarında bağlantının zayıf olduğu düşünülürse, arşive erişim ağdan bağımsız çalışıyor.",
      },
      {
        title: "Üye odaklı bildirim",
        body: "Duyurular herkese değil ilgili gruba gidiyor. Bildirim yorgunluğu yaratmadan katılım oranını korumak için gerekliydi.",
      },
    ],

    meta: [
      { label: "Rol", value: "Tasarım, geliştirme ve yayın — tek kişi" },
      { label: "Platformlar", value: "iOS ve Android (ayrı native kod tabanları)" },
      { label: "Kapsam", value: "Mobil uygulama + dernek içerik altyapısı" },
      { label: "Durum", value: "İki mağazada da yayında, aktif bakımda" },
    ],

    screens: [
      {
        src: "/images/shots/ak-1.jpg",
        title: "Ana sayfa",
        caption:
          "Kaydırmalı ana manşet, hemen altında köşe yazarları şeridi ve biyografi bloğu. Derneğin gündemi ve insanları aynı ekranda.",
      },
      {
        src: "/images/shots/ak-2.jpg",
        title: "Yazı detayı",
        caption:
          "Kapak görseli, kategori etiketi ve okuma odaklı tipografi. Yazar bilgisi, okuma süresi ve görüntülenme sayısı metnin hemen üstünde.",
      },
      {
        src: "/images/shots/ak-3.jpg",
        title: "Galeri akışı",
        caption:
          "Üye eserleri ve etkinlik fotoğrafları için ayrı akış. Her kart galeri rozeti ve tarihiyle işaretleniyor.",
      },
      {
        src: "/images/shots/ak-4.jpg",
        title: "Üst manşetler",
        caption:
          "Yatay kaydırmalı öne çıkan içerikler ve altında ana manşet alanı. Gezi ve etkinlik içerikleri burada öne çıkıyor.",
      },
      {
        src: "/images/shots/ak-5.jpg",
        title: "Yazar dizini",
        caption:
          "Arama kutusu ve avatar ızgarası. Üye sayısı arttıkça listeyi taramak yerine doğrudan arama öne çıkarıldı.",
      },
      {
        src: "/images/shots/ak-6.jpg",
        title: "Kategoriler",
        caption:
          "Renk kodlu kategori kartları ve kategori araması. Güncel, ziyaretler, geziler, konferans ve duyuru tek ekranda.",
      },
    ],

    status: "App Store ve Google Play'de yayında",

    tags: [
      "SwiftUI",
      "Kotlin",
      "Jetpack Compose",
      "Room",
      "Retrofit",
      "Firebase",
    ],

    stack: [
      { label: "iOS", items: ["Swift", "SwiftUI", "MVVM"] },
      {
        label: "Android",
        items: [
          "Kotlin",
          "Jetpack Compose",
          "Material 3",
          "Room",
          "Retrofit",
          "Coil",
          "Coroutines",
        ],
      },
      { label: "Servisler", items: ["Firebase Cloud Messaging", "Analytics", "Crashlytics"] },
      { label: "Yayın", items: ["App Store Connect", "Google Play Console"] },
    ],

    links: {
      appStore: "https://apps.apple.com/tr/app/id6781691602",
      googlePlay:
        "https://play.google.com/store/apps/details?id=com.akcakocakultur",
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Detay sayfasının altındaki önceki/sonraki gezinmesi için */
export function getProjectNeighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };

  return {
    previous: index > 0 ? projects[index - 1] : undefined,
    next: index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}

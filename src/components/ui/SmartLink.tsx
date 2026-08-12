"use client";

import Link from "next/link";
import { useState } from "react";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "prefetch">;

/**
 * `next/link`, ama sayfa açılışında değil kullanıcı niyet gösterince önden yükler.
 *
 * NEDEN: Varsayılan davranışta Next, görünür alana giren her bağlantının
 * sunucu yükünü (`?_rsc=...`) arka planda çekiyor. Ana sayfada ölçtüğümüzde
 * proxy'ye giden 13 isteğin 11'i buydu — ziyaretçi hiçbir yere tıklamadan.
 *
 * Sunucudaki nginx yapılandırması proxy'ye giden istekleri saniyede ~2 ile
 * sınırlıyor ve fazlasına 503 dönüyor. Bu yüzden önden yükleme, ziyaretçinin
 * gerçek tıklamasına ayrılması gereken bütçeyi tüketiyor: sayfa yenilendiğinde
 * ya da menüye tıklandığında 503 görülüyordu.
 *
 * `prefetch={false}` başlangıçta yüklemeyi kapatıyor; fare üzerine geldiğinde
 * ya da dokunma başladığında `prefetch={null}` ile Next'in varsayılan
 * davranışına dönülüyor, yani hedef sayfa tıklamadan hemen önce hazırlanıyor.
 * Böylece gezinme hızı korunuyor ama boşta hiç istek atılmıyor.
 *
 * Kaynak: node_modules/next/dist/docs/01-app/02-guides/prefetching.md
 */
export function SmartLink({ onMouseEnter, onTouchStart, ...rest }: Props) {
  const [intent, setIntent] = useState(false);

  return (
    <Link
      {...rest}
      prefetch={intent ? null : false}
      onMouseEnter={(e) => {
        setIntent(true);
        onMouseEnter?.(e);
      }}
      onTouchStart={(e) => {
        setIntent(true);
        onTouchStart?.(e);
      }}
    />
  );
}

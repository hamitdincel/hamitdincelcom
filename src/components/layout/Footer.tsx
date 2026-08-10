import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

import {
  footerNavItems,
  mailtoHref,
  site,
  telHref,
  whatsappHref,
} from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BrandMark } from "@/components/ui/BrandMark";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas-raised">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          {/* -------------------------------------------------- Kimlik */}
          <div>
            <div className="flex items-center gap-3">
              <BrandMark gradientId="brand-footer" className="h-7 w-auto shrink-0" />
              <span aria-hidden className="h-8 w-px bg-line-strong" />
              <span className="leading-tight">
                <span className="block text-[15px] font-semibold tracking-[-0.02em]">
                  {site.name}
                </span>
                {/* İngilizce metin — bkz. Header'daki not */}
                <span className="block font-mono text-[11.5px] sm:text-[10.5px] tracking-[0.1em] text-ink-faint">
                  MOBILE APPLICATION DEVELOPER
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-[36ch] text-[14.2px] leading-[1.68] text-ink-muted">
              iOS ve Android native uygulama geliştirme; API, web ve mağaza
              yayını dahil uçtan uca teslim.
            </p>

            <ul className="mt-5 grid gap-0.5">
              <li>
                <a
                  href={mailtoHref}
                  className="group inline-flex min-h-11 items-center gap-2.5 text-[14.2px] font-medium transition-colors hover:text-accent"
                >
                  <Mail className="size-4 text-ink-muted transition-colors group-hover:text-accent" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={telHref}
                  className="group inline-flex min-h-11 items-center gap-2.5 text-[14.2px] font-medium transition-colors hover:text-accent"
                >
                  <Phone className="size-4 text-ink-muted transition-colors group-hover:text-accent" />
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2.5 text-[14.2px] font-medium transition-colors hover:text-[#25D366]"
                >
                  <WhatsAppIcon className="size-4 text-ink-muted transition-colors group-hover:text-[#25D366]" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* ------------------------------------------------ Gezinme */}
          <nav aria-label="Alt menü">
            <h2 className="font-mono text-[11.5px] sm:text-[10.5px] tracking-[0.14em] text-ink-faint uppercase">
              Gezinme
            </h2>
            <ul className="mt-4 grid gap-0.5">
              {footerNavItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex min-h-11 items-center gap-1.5 text-[14.2px] text-ink-muted transition-colors hover:text-ink"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* -------------------------------------------- Yayındaki işler */}
          <div>
            <h2 className="font-mono text-[11.5px] sm:text-[10.5px] tracking-[0.14em] text-ink-faint uppercase">
              Mağazalarda
            </h2>
            <ul className="mt-4 grid gap-0.5">
              <li>
                <Link
                  href="/referanslar/medya-tilkisi"
                  className="inline-flex min-h-11 items-center text-[14.2px] text-ink-muted transition-colors hover:text-ink"
                >
                  Medya Tilkisi
                </Link>
              </li>
              <li>
                <Link
                  href="/referanslar/akca-koca-kultur-platformu"
                  className="inline-flex min-h-11 items-center text-[14.2px] text-ink-muted transition-colors hover:text-ink"
                >
                  Akça Koca Kültür Platformu
                </Link>
              </li>
            </ul>

            <p className="mt-6 font-mono text-[11.5px] sm:text-[10.5px] leading-[1.7] tracking-[0.06em] text-ink-faint uppercase">
              App Store
              <br />
              Google Play
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line py-7 text-[13px] text-ink-faint">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase">
            {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

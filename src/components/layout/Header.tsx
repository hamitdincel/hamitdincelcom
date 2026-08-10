"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { mailtoHref, navItems, site } from "@/lib/site";
import { BrandMark } from "@/components/ui/BrandMark";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Kaydırıldığında header daralır, blur ve ince kenarlık kazanır */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Menü açıkken arka planın kaymasını engelle */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /** Alt sayfalarda da üst menü öğesi işaretli kalsın (/referanslar/xyz gibi) */
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-100 transition-[height,background-color,border-color,box-shadow] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        scrolled
          ? "border-b border-line shadow-xs backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent"
      }`}
      style={{
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--canvas) 72%, transparent)"
          : "transparent",
      }}
    >
      <div
        className={`mx-auto flex w-full max-w-[1200px] items-center justify-between gap-6 px-5 transition-[height] duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] sm:px-8 ${
          scrolled ? "h-[62px]" : "h-[78px]"
        }`}
      >
        {/* -------------------------------------------------------- Marka */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="group inline-flex items-center gap-3"
        >
          <BrandMark
            gradientId="brand-header"
            className="h-[26px] w-auto shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:-translate-y-px"
          />

          {/* Markayı yazıdan ayıran ince çizgi — logo kilidinin bir parçası */}
          <span
            aria-hidden
            className="hidden h-7 w-px bg-line-strong min-[420px]:block"
          />

          <span className="hidden leading-tight min-[420px]:block">
            <span className="block text-[14.5px] font-semibold tracking-[-0.02em]">
              {site.name}
            </span>
            {/* İngilizce metin: CSS uppercase Türkçe kurallarıyla i→İ yapar,
                bu yüzden metin doğrudan büyük harfle yazılıyor. */}
            <span className="block font-mono text-[10px] tracking-[0.1em] text-ink-faint">
              MOBILE DEVELOPER
            </span>
          </span>
        </Link>

        {/* ----------------------------------------------- Masaüstü menü */}
        <nav aria-label="Ana menü" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative px-3 py-2 text-[14px] transition-colors duration-300 ${
                  active ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.label}
                {/* Aktif göstergesi: pill yerine ince, ortadan açılan çizgi */}
                <span
                  aria-hidden
                  className={`absolute bottom-0.5 left-1/2 h-px -translate-x-1/2 rounded-full bg-accent transition-all duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                    active ? "w-5 opacity-100" : "w-0 opacity-0 group-hover:w-3 group-hover:opacity-40"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <a
            href={mailtoHref}
            className="group hidden min-h-9 items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-4 py-2 text-[13.5px] font-medium transition duration-300 hover:-translate-y-px hover:bg-surface-2 hover:shadow-sm md:inline-flex"
          >
            Projenizi konuşalım
            <ArrowRight className="size-3.5 text-ink-muted transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-ink-muted transition-colors hover:border-line-strong hover:text-ink md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------- Mobil menü */}
      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="Mobil menü"
          className={`fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-y-auto border-t border-line bg-canvas px-5 pt-6 pb-10 md:hidden ${
            scrolled ? "top-[62px]" : "top-[78px]"
          }`}
        >
          <ul className="flex flex-col">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex min-h-14 items-center justify-between border-b border-line py-4 text-[1.4rem] font-medium tracking-[-0.025em] transition-colors ${
                    isActive(item.href) ? "text-accent" : "text-ink"
                  }`}
                >
                  {item.label}
                  <span className="font-mono text-[11px] text-ink-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={mailtoHref}
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-linear-to-b from-accent to-accent-hover px-6 py-3.5 text-[15px] font-medium text-white shadow-[0_1px_0_rgb(255_255_255/0.18)_inset]"
          >
            Projenizi konuşalım
            <ArrowRight className="size-4" />
          </a>

          {/* E-posta adresi büyütülmemeli */}
          <p className="mt-6 font-mono text-[12px] tracking-[0.04em] text-ink-faint">
            {site.email}
          </p>
        </nav>
      ) : null}
    </header>
  );
}

"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Tema düğmesi.
 *
 * Hangi ikonun görüneceğine JS değil CSS karar veriyor: next-themes `.dark`
 * sınıfını hidrasyondan önce <html>'e yazdığı için iki ikonu da basıp
 * `dark:` varyantıyla gizlemek hem uyuşmazlık (hydration mismatch) hem de
 * ilk render'da boş düğme sorununu ortadan kaldırıyor.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Temayı değiştir"
      title="Temayı değiştir"
      className="grid size-[38px] shrink-0 place-items-center rounded-[11px] border border-line bg-surface text-ink-muted transition-colors hover:border-line-strong hover:bg-surface-2 hover:text-ink"
    >
      <Sun aria-hidden className="size-[18px] dark:hidden" />
      <Moon aria-hidden className="hidden size-[18px] dark:block" />
    </button>
  );
}

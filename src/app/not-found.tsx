import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center px-5 py-28 text-center sm:px-[26px] sm:py-36">
      <span className="font-mono text-[11.6px] font-medium tracking-[0.12em] text-accent uppercase">
        404
      </span>
      <h1 className="mt-5 text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.14] font-semibold tracking-[-0.03em]">
        Aradığınız sayfa burada değil
      </h1>
      <p className="mt-4 max-w-[440px] text-[1.01rem] text-ink-muted">
        Bağlantı eskimiş ya da adres yanlış yazılmış olabilir.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-full bg-accent px-[22px] py-3 text-[15px] font-medium text-white transition hover:-translate-y-0.5 hover:bg-accent-hover"
        >
          <ArrowLeft className="size-[17px]" />
          Ana sayfaya dön
        </Link>
        <Link
          href="/referanslar"
          className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface px-[22px] py-3 text-[15px] font-medium transition hover:-translate-y-0.5 hover:bg-surface-2"
        >
          Referanslara bak
        </Link>
      </div>
    </div>
  );
}

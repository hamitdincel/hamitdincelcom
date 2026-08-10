"use client";

import type { PointerEvent, ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
};

/**
 * İmlecin konumunu CSS değişkenine yazar; `.spotlight` sınıfı bunu çok
 * hafif bir radial-gradient vurgusuna çevirir. Dokunmatik cihazlarda hover
 * tetiklenmediği için görsel bir yan etkisi yok.
 */
export function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
}: SpotlightCardProps) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      onPointerMove={handlePointerMove}
      className={`spotlight group relative overflow-hidden transition duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] hover:-translate-y-1 hover:border-line-strong hover:shadow-md ${className}`}
    >
      {children}
    </Tag>
  );
}

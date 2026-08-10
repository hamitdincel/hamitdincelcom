"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Sıralı görünme için gecikme sırası (0, 1, 2 …) */
  index?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
};

/**
 * Görünüm alanına girince içeriği yumuşakça yukarı kaydırarak gösterir.
 * `prefers-reduced-motion` açıkken animasyon tamamen devre dışı kalır.
 */
export function Reveal({
  children,
  index = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 0.61, 0.36, 1],
        delay: Math.min(index, 4) * 0.08,
      }}
    >
      {children}
    </MotionTag>
  );
}

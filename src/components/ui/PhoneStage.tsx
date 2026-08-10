"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Telefonları saran kap — kaydırma sırasında hafif parallax uygular.
 *
 * Client olmak zorunda olan tek parça burası. İçindeki `PhoneCluster`
 * `children` olarak geldiği için Server Component kalmaya devam ediyor.
 */
export function PhoneStage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <motion.div
      ref={ref}
      style={reduceMotion ? undefined : { y }}
      className={`group flex items-center justify-center py-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

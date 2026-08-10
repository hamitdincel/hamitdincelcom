"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Sayfanın üstünde ilerlemeyi gösteren ince çubuk. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-200 h-0.5 origin-left bg-linear-to-r from-accent to-accent-hover"
    />
  );
}

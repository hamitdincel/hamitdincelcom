"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Süreç adımlarının arkasındaki ilerleme çizgisi.
 *
 * Masaüstünde yatay, mobilde dikey. Kaydırma ilerledikçe çizgi dolar —
 * hareket yalnızca `transform` üzerinden, layout'a dokunmuyor.
 * Sadece bu sarmalayıcı client; adımların kendisi Server Component kalıyor.
 */
export function TimelineTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 78%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  const scale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* Ray — mobilde solda dikey, masaüstünde üstte yatay */}
      <div
        aria-hidden
        className="absolute top-1 bottom-1 left-[18px] w-px bg-line lg:top-0 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
      >
        <motion.div
          style={
            reduceMotion
              ? { transform: "scale(1)" }
              : { scaleY: scale, scaleX: 1 }
          }
          className="h-full w-full origin-top bg-accent lg:hidden"
        />
        <motion.div
          style={reduceMotion ? { transform: "scale(1)" } : { scaleX: scale }}
          className="hidden h-full w-full origin-left bg-accent lg:block"
        />
      </div>

      {children}
    </div>
  );
}

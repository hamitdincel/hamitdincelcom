"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";

import type { FaqItem } from "@/lib/types";

/**
 * Akordeon — aynı anda tek soru açık kalır.
 *
 * Bölümün tamamı değil yalnızca bu parça client; başlık, açıklama ve
 * sayfanın geri kalanı Server Component olarak kalıyor.
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question} className="border-b border-line">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`flex min-h-14 w-full items-center justify-between gap-6 py-5 text-left text-[15.5px] font-medium tracking-[-0.018em] transition-colors duration-300 ${
                  isOpen ? "text-accent" : "hover:text-accent"
                }`}
              >
                {item.question}
                <span
                  aria-hidden
                  className={`grid size-7 shrink-0 place-items-center rounded-lg border transition-all duration-400 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                    isOpen
                      ? "rotate-45 border-accent/30 bg-accent-soft text-accent"
                      : "border-line text-ink-faint"
                  }`}
                >
                  <Plus className="size-3.5" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62ch] pb-6 text-[14.6px] leading-[1.7] text-ink-muted">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

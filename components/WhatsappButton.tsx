"use client";

import { AnimatePresence, motion, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/BrandIcons";

/** Bouton WhatsApp flottant : apparaît après le Hero, discret, avec une étiquette au survol. */
export function WhatsappButton({ href, label }: { href: string; label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {show && (
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-2xl bg-[#25D366] px-4 text-white shadow-[0_16px_34px_-14px_rgba(37,211,102,0.8)] transition-all duration-300 hover:gap-3 hover:pr-5 sm:bottom-7 sm:right-7"
          >
            <WhatsappIcon className="h-6 w-6 shrink-0" />
            <span className="max-w-0 whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-[14rem] group-hover:opacity-100">{label}</span>
          </motion.a>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

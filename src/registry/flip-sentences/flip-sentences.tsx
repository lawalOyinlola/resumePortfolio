"use client";

import type { Variants } from "motion/react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// Same motion as chanhdai.com's TextFlip: each sentence drops in from above
// with a slight blur and leaves downward.
const variants: Variants = {
  initial: { y: "-20%", opacity: 0, filter: "blur(1px)" },
  animate: { y: "0%", opacity: 1, filter: "blur(0px)" },
  exit: {
    y: "40%",
    opacity: 0,
    filter: "blur(1px)",
    transition: { ease: "easeOut" },
  },
};

export function FlipSentences({
  className,
  sentences,
  interval = 3,
}: {
  className?: string;
  sentences: string[];
  /** Seconds between flips. */
  interval?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [currentSentence, setCurrentSentence] = useState(0);

  // Pause while the tab is hidden, like upstream's usePageInView.
  useEffect(() => {
    const onChange = () =>
      setIsPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const play = isInView && isPageVisible;

  useEffect(() => {
    if (!play) return;

    const timer = setInterval(() => {
      setCurrentSentence((prev) => (prev + 1) % sentences.length);
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [play, interval, sentences.length]);

  return (
    <div ref={ref} className={className}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={currentSentence}
          // `shimmer-once` replays the glow each time a new sentence mounts.
          className={cn(
            "inline-block font-mono text-sm text-balance text-muted-foreground select-none",
            "shimmer shimmer-duration-1500 shimmer-once not-dark:shimmer-color-foreground"
          )}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          variants={variants}
        >
          {sentences[currentSentence]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

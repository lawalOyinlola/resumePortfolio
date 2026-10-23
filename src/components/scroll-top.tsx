"use client";

import { ArrowUpIcon } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useIsScrolled } from "@/hooks/use-is-scrolled";
import { cn } from "@/lib/utils";

export function ScrollTop({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { scrollY } = useScroll();

  const visible = useIsScrolled() === true;
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useMotionValueEvent(scrollY, "change", (latestValue) => {
    const prev = scrollY.getPrevious() ?? 0;
    const diff = latestValue - prev;
    setScrollDirection(diff > 0 ? "down" : "up");
  });

  return (
    <Button
      data-visible={visible}
      data-scroll-direction={scrollDirection}
      className={cn(
        // Stacked above the "Download Résumé" FAB (both bottom-right).
        "[--bottom:5rem] sm:[--bottom:5.5rem] lg:[--bottom:6rem]",
        "fixed right-4 bottom-[calc(var(--bottom)+env(safe-area-inset-bottom,0))] z-50 lg:right-8",
        // Hidden also means invisible, so a faded-out button can't be clicked.
        "transition-[background-color,opacity,visibility] duration-300",
        "data-[scroll-direction=down]:opacity-30 data-[scroll-direction=up]:opacity-100 data-[visible=false]:invisible data-[visible=false]:opacity-0",
        "data-[scroll-direction=down]:hover:opacity-100",
        // Flat secondary with a hairline inset edge (chanhdai.com style).
        "rounded-lg border-none shadow-[inset_0_0_1px] shadow-foreground/20 dark:inset-shadow-none",
        className
      )}
      variant="secondary"
      size="icon"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      {...props}
    >
      <ArrowUpIcon />
      <span className="sr-only">Scroll to top</span>
    </Button>
  );
}

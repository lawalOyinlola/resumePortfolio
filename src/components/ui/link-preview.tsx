"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { encode } from "qss";
import { Slot as SlotPrimitive } from "radix-ui";
import { type MouseEvent, useEffect, useState } from "react";

import { UTM_PARAMS } from "@/config/site";
import { cn } from "@/lib/utils";
import { addQueryParams } from "@/utils/url";

const Slot = SlotPrimitive.Slot;

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
  /**
   * When true, the hover trigger merges onto the single child element instead
   * of rendering a navigating <a>. Use this when the trigger should do
   * something else on click (e.g. toggle a collapsible) while still showing
   * the preview on hover — the preview image popup stays clickable.
   */
  asChild?: boolean;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  // quality = 50,
  // layout = "fixed",
  isStatic = false,
  imageSrc = "",
  asChild = false,
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const targetRect = (event.target as HTMLElement).getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          {/* Warm the cache so the popup is instant on hover. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" aria-hidden />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        {asChild ? (
          <HoverCardPrimitive.Trigger asChild onMouseMove={handleMouseMove}>
            <Slot className={className}>{children}</Slot>
          </HoverCardPrimitive.Trigger>
        ) : (
          <HoverCardPrimitive.Trigger
            onMouseMove={handleMouseMove}
            className={cn("text-current", className)}
            href={url}
            target="_blank"
            rel="noopener"
          >
            {children}
          </HoverCardPrimitive.Trigger>
        )}

        <HoverCardPrimitive.Content
          className="origin-(--radix-hover-card-content-transform-origin)"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="rounded-xl shadow-xl"
                style={{
                  x: translateX,
                }}
              >
                <a
                  href={addQueryParams(url, UTM_PARAMS)}
                  target="_blank"
                  rel="noopener"
                  className="block rounded-xl border-2 border-transparent bg-white p-1 shadow hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  {/* Natural aspect ratio, capped so landscape shots aren't
                      cropped and tall (mobile) shots stay a reasonable height. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt="preview image"
                    className="block max-h-[340px] max-w-[240px] rounded-lg"
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};

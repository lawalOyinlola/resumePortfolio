"use client";

import { CheckIcon, CircleXIcon, LinkIcon } from "lucide-react";
import { useOptimistic, useTransition } from "react";

import { cn } from "@/lib/utils";

/** Absolute URL to a section anchor (falls back to a bare hash during SSR). */
export function createHeadingUrl(id: string) {
  if (typeof window === "undefined") {
    return `#${id}`;
  }

  const url = new URL(window.location.href);
  url.hash = id;
  return url.toString();
}

/**
 * Hover-to-copy anchor link for a section title. Lives inside <PanelTitle>,
 * stays hidden until the title is hovered, and copies the section's permalink.
 */
export function PanelTitleCopy({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [state, setState] = useOptimistic<"idle" | "copied" | "failed">("idle");
  const [, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-label="Copy link to section"
      className={cn(
        "ml-1 inline-flex size-7 shrink-0 translate-y-px items-center justify-center rounded-md align-middle text-muted-foreground opacity-0 transition-opacity group-hover/panel-title:opacity-100 hover:bg-muted focus-visible:opacity-100",
        className
      )}
      onClick={() => {
        startTransition(async () => {
          try {
            await navigator.clipboard.writeText(createHeadingUrl(id));
            setState("copied");
          } catch {
            setState("failed");
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
        });
      }}
    >
      {state === "idle" ? (
        <LinkIcon className="size-4" />
      ) : state === "copied" ? (
        <CheckIcon className="size-4" />
      ) : (
        <CircleXIcon className="size-4" />
      )}
    </button>
  );
}

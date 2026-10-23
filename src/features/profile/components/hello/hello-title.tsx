"use client";

import { useSyncExternalStore } from "react";

import {
  DEFAULT_GREETING,
  getGreeting,
} from "@/features/profile/data/greetings";

import { PanelTitle } from "../panel";
import { PanelTitleCopy } from "../panel-title-copy";

const ID = "about";

const noopSubscribe = () => () => {};

export function HelloTitle() {
  // SSR + first paint render the neutral default so server/client match; the
  // viewer-local greeting resolves on mount (and on client-side navigation).
  // Resolved once on hydration; a viewer who leaves the tab open across an
  // hour boundary keeps the greeting from when they arrived. Acceptable
  // tradeoff for a cosmetic, time-of-day touch.
  const hour = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getHours(),
    () => null
  );
  const { greeting, caption } =
    hour === null ? DEFAULT_GREETING : getGreeting(hour);

  return (
    <>
      <PanelTitle>
        <a href={`#${ID}`} suppressHydrationWarning>
          {greeting}
        </a>
        <PanelTitleCopy id={ID} />
      </PanelTitle>

      <p
        className="mt-1 font-mono text-sm text-balance text-muted-foreground"
        suppressHydrationWarning
      >
        {caption}
      </p>
    </>
  );
}

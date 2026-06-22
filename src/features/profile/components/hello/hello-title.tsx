"use client";

import { useEffect, useState } from "react";

import {
  DEFAULT_GREETING,
  getGreeting,
  type Greeting,
} from "@/features/profile/data/greetings";

import { PanelTitle } from "../panel";
import { PanelTitleCopy } from "../panel-title-copy";

const ID = "about";

export function HelloTitle() {
  // SSR + first paint render the neutral default so server/client match; the
  // viewer-local greeting resolves on mount (and on client-side navigation).
  const [{ greeting, caption }, setGreeting] =
    useState<Greeting>(DEFAULT_GREETING);

  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

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

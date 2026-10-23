"use client";

import { useCallback } from "react";

import { useTheme } from "@/components/theme-provider";
import { META_THEME_COLORS } from "@/config/site";
import { useClickSound } from "@/hooks/soundcn/use-click-sound";
import { useMetaColor } from "@/hooks/use-meta-color";

import { Button } from "./ui/button";

export function ToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();

  const { setMetaColor } = useMetaColor();

  const [click] = useClickSound();

  const handleToggle = useCallback(() => {
    click();
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark
    );
  }, [click, resolvedTheme, setTheme, setMetaColor]);

  return (
    <Button
      className="relative touch-manipulation rounded-lg border-none"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={handleToggle}
    >
      <DarkSideIcon />
    </Button>
  );
}

// A circle whose dark half turns 180° on theme change (from chanhdai.com,
// adapted from toggles.dev "Dark Side").
function DarkSideIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden
    >
      <path
        d="M16 .5C7.4.5.5 7.4.5 16S7.4 31.5 16 31.5 31.5 24.6 31.5 16 24.6.5 16 .5zm0 28.1V3.4C23 3.4 28.6 9 28.6 16S23 28.6 16 28.6z"
        className="origin-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[ease] dark:rotate-180"
      />
    </svg>
  );
}

"use client";

import { useEffect } from "react";

import { useAvatarLights } from "@/hooks/use-avatar-lights";

export function AvatarLightsToggle(
  props: Omit<React.ComponentProps<"button">, "onClick">
) {
  const { toggleLights } = useAvatarLights();

  // Press "L" anywhere (outside inputs) to flip the avatar lights.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.key.toLowerCase() !== "l" || event.metaKey || event.ctrlKey) {
        return;
      }

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
      ) {
        return;
      }

      toggleLights();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleLights]);

  return (
    <button
      type="button"
      aria-label="Toggle avatar lights (press L)"
      onClick={toggleLights}
      {...props}
    />
  );
}

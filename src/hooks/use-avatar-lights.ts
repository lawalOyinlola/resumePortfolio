"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "avatar-lights";

type LightsState = "on" | "off";

function applyLights(state: LightsState) {
  // The `.light`/`.dark` theme class lives on <html>, so the avatar's
  // `in-[.dark[data-avatar-lights=on]]` variants resolve against it too.
  document.documentElement.dataset.avatarLights = state;
}

/**
 * Controls the header avatar's "lights" state. Persisted per-visitor and
 * mirrored onto <html data-avatar-lights> so CSS can pick the right variant.
 */
export function useAvatarLights() {
  const [lights, setLights] = useState<LightsState>("off");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const next: LightsState = stored === "on" ? "on" : "off";
    setLights(next);
    applyLights(next);
  }, []);

  const toggleLights = useCallback(() => {
    setLights((prev) => {
      const next: LightsState = prev === "on" ? "off" : "on";
      localStorage.setItem(STORAGE_KEY, next);
      applyLights(next);
      return next;
    });
  }, []);

  return { lights, toggleLights };
}

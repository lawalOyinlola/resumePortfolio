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
    setLights(stored === "on" ? "on" : "off");
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lights);
    applyLights(lights);
  }, [lights]);

  const toggleLights = useCallback(() => {
    setLights((prev) => (prev === "on" ? "off" : "on"));
  }, []);

  return { lights, toggleLights };
}

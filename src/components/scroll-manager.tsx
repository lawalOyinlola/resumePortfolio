"use client";

import { useEffect } from "react";

import { scrollToSection } from "@/lib/scroll";

const STORAGE_KEY = "scroll-position";
// A refresh within this time of the last scroll, click or key press returns
// to the same place. After a longer idle, the page opens at the top.
const RESTORE_WINDOW_MS = 30 * 60 * 1000;

type SavedPosition = { y: number; lastActiveAt: number };

function readSaved(): SavedPosition | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SavedPosition) : null;
  } catch {
    return null;
  }
}

function writeSaved(position: SavedPosition) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(position));
  } catch {
    // Storage blocked (private mode, site data off): skip restoration.
  }
}

function jumpTo(y: number) {
  // "instant" overrides the html element's smooth scrolling for this jump.
  window.scrollTo({ top: y, behavior: "instant" });
}

/**
 * Keeps section hashes out of the URL and restores the scroll position on
 * refresh.
 *
 * - In-page "#section" links scroll to the section and leave the URL alone.
 * - A shared link that arrives with a hash scrolls to that section once, and
 *   the hash is then removed.
 * - A refresh returns to the last position if the visitor was active within
 *   RESTORE_WINDOW_MS. Otherwise, or in a new tab, the page opens at the top.
 */
export function ScrollManager() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const { hash } = window.location;
    if (hash) {
      if (scrollToSection(hash)) {
        history.replaceState(
          history.state,
          "",
          window.location.pathname + window.location.search
        );
      }
    } else {
      const saved = readSaved();
      const isRecent =
        saved !== null && Date.now() - saved.lastActiveAt < RESTORE_WINDOW_MS;
      jumpTo(isRecent ? saved.y : 0);
    }

    let lastActiveAt = Date.now();
    const markActive = () => {
      lastActiveAt = Date.now();
    };
    // A reload shortcut is not activity: pressing it after a long idle should
    // still open the page at the top.
    const handleKeyDown = (event: KeyboardEvent) => {
      const isReload =
        event.key === "F5" ||
        ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "r");
      if (!isReload) markActive();
    };
    const save = () => writeSaved({ y: window.scrollY, lastActiveAt });

    let saveTimer: ReturnType<typeof setTimeout> | undefined;
    const handleScroll = () => {
      markActive();
      clearTimeout(saveTimer);
      saveTimer = setTimeout(save, 150);
    };

    const handleClick = (event: MouseEvent) => {
      markActive();
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.target === "_blank"
      ) {
        return;
      }

      const url = new URL(anchor.href);
      const isSamePage =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search;
      if (!isSamePage || !url.hash) return;

      if (scrollToSection(url.hash)) {
        event.preventDefault();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", markActive);
    window.addEventListener("pagehide", save);
    // Capture phase, so this runs before other click handlers on the link.
    document.addEventListener("click", handleClick, true);

    return () => {
      clearTimeout(saveTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", markActive);
      window.removeEventListener("pagehide", save);
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { META_THEME_COLORS } from "@/config/site";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const THEME_STORAGE_KEY = "theme";

function getSystemTheme(): ResolvedTheme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyResolvedTheme(resolved: ResolvedTheme) {
  const el = document.documentElement;
  // Manage BOTH classes: `[html.light_&]` / `[html.dark_&]` variants (toggle
  // icons, theme-specific tech icons) rely on the explicit "light" class too.
  el.classList.toggle("dark", resolved === "dark");
  el.classList.toggle("light", resolved === "light");
  el.style.colorScheme = resolved;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute(
      "content",
      resolved === "dark" ? META_THEME_COLORS.dark : META_THEME_COLORS.light
    );
  // Persist the resolved theme so the server can set the class on the next
  // request (no-flash for returning visitors, no client bootstrap script).
  document.cookie = `${THEME_STORAGE_KEY}=${resolved}; path=/; max-age=31536000; SameSite=Lax`;
}

/**
 * Minimal theme provider that replaces next-themes.
 *
 * Why: next-themes renders an inline <script> inside the React body tree to
 * avoid a flash of the wrong theme. React 19 renders that script on the server
 * but not on the client ("Encountered a script tag..."), which shifts the body
 * by one node and breaks hydration site-wide. We instead apply the no-flash
 * class via a <head> script (see app/layout.tsx) and keep only runtime state
 * here, so the body tree is identical on the server and client.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  // Read the stored preference after mount (keeps SSR and first client render identical).
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setThemeState(stored);
    }
  }, []);

  // Resolve + apply whenever the preference changes; track system changes when in "system".
  useEffect(() => {
    const resolve = () => {
      const next = theme === "system" ? getSystemTheme() : theme;
      setResolvedTheme(next);
      applyResolvedTheme(next);
    };

    resolve();

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", resolve);
      return () => mq.removeEventListener("change", resolve);
    }
  }, [theme]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY && event.newValue) {
        setThemeState(event.newValue as Theme);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within <ThemeProvider>");
  }
  return ctx;
}

"use client";

import { AppProgressProvider } from "@bprogress/next";
import { Provider as JotaiProvider } from "jotai";
import dynamic from "next/dynamic";

import { ThemeProvider } from "@/components/theme-provider";

const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ThemeProvider>
        <AppProgressProvider
          color="var(--foreground)"
          height="2px"
          delay={500}
          options={{ showSpinner: false }}
        >
          {children}
        </AppProgressProvider>

        <Toaster />
      </ThemeProvider>
    </JotaiProvider>
  );
}

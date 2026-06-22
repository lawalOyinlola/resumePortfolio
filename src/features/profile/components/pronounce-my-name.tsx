"use client";

import { Volume2Icon } from "lucide-react";

import soundManager from "@/lib/sound-manager";
import { cn } from "@/lib/utils";

export function PronounceMyName({
  className,
  namePronunciationUrl,
}: {
  className?: string;
  namePronunciationUrl: string;
}) {
  return (
    <button
      className={cn(
        "relative flex cursor-pointer touch-manipulation items-center justify-center text-muted-foreground transition-[color,scale] select-none hover:text-foreground active:scale-[0.9]",
        "after:absolute after:-inset-2",
        className
      )}
      onClick={() => soundManager.playAudio(namePronunciationUrl)}
      aria-label="Pronounce my name"
    >
      <Volume2Icon className="size-4.5" />
      <span className="sr-only">Pronounce my name</span>
    </button>
  );
}

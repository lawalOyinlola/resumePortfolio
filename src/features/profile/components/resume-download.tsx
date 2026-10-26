"use client";

import { DownloadIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RESUME_DOWNLOADS } from "@/config/site";
import { cn } from "@/lib/utils";

// Same-origin files download through a plain anchor, so no fetch or fallback
// window is needed.
function downloadResume(href: string, filename: string) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

export function ResumeDownload() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          aria-label="Download résumé"
          className={cn(
            "fixed right-4 z-50 h-9 gap-2 rounded-lg pr-3 pl-2.5 lg:right-8",
            "bottom-[calc(1.4rem+env(safe-area-inset-bottom,0))] lg:bottom-8",
            // Same flat secondary + hairline edge as the other buttons, with a
            // soft drop shadow and blur so it stays legible over content.
            "bg-secondary/90 ring-1 ring-foreground/10 backdrop-blur-sm dark:inset-shadow-none",
            "shadow-lg shadow-black/5 dark:shadow-black/40"
          )}
        >
          <DownloadIcon className="size-4" />
          Download Résumé
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="top"
        align="end"
        sideOffset={12}
        className="w-52"
      >
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Choose version
        </DropdownMenuLabel>
        {RESUME_DOWNLOADS.map((resume) => (
          <DropdownMenuItem
            key={resume.href}
            className="cursor-pointer"
            onSelect={() => downloadResume(resume.href, resume.filename)}
          >
            <FileTextIcon className="size-4" />
            {resume.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

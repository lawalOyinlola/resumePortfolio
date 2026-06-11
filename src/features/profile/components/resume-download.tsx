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

async function downloadResume(
  href: string,
  fallbackHref: string,
  filename: string
) {
  try {
    const res = await fetch(href);
    if (!res.ok) throw new Error(`Résumé not found: ${res.status}`);

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    // Fall back to the Google Drive copy if the local PDF can't be fetched.
    window.open(fallbackHref, "_blank", "noopener,noreferrer");
  }
}

export function ResumeDownload() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          aria-label="Download résumé"
          className={cn(
            "fixed right-4 z-50 gap-2 shadow-lg lg:right-8",
            "bottom-[calc(1.4rem+env(safe-area-inset-bottom,0))] lg:bottom-8"
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
            onSelect={() =>
              downloadResume(resume.href, resume.fallbackHref, resume.filename)
            }
          >
            <FileTextIcon className="size-4" />
            {resume.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

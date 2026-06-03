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
          <DropdownMenuItem key={resume.href} asChild>
            <a href={resume.href} download className="cursor-pointer">
              <FileTextIcon className="size-4" />
              {resume.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

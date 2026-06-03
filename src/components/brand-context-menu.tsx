"use client";

import { toast } from "sonner";

import { useTheme } from "@/components/theme-provider";
import { copyText } from "@/utils/copy";

import { getMarkSVG, OyinnMark } from "./oyinn-mark";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuItem
          onClick={() => {
            const svg = getMarkSVG(resolvedTheme === "light" ? "#000" : "#fff");
            copyText(svg);
            toast.success("Copied Mark as SVG");
          }}
        >
          <OyinnMark />
          Copy Mark as SVG
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

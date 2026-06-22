import { BrandContextMenu } from "@/components/brand-context-menu";
import { OyinnMark } from "@/components/oyinn-mark";
import { cn } from "@/lib/utils";

import { Panel, PanelHeader, PanelTitle } from "./panel";
import { PanelTitleCopy } from "./panel-title-copy";

export function Brand() {
  return (
    <Panel id="brand">
      <PanelHeader>
        <PanelTitle>
          <a href="#brand">Brand</a>
          <PanelTitleCopy id="brand" />
        </PanelTitle>
      </PanelHeader>

      <BrandContextMenu>
        <div
          className={cn(
            "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
            "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
            "bg-zinc-950/0.75 dark:bg-white/0.75"
          )}
        >
          <div className="grid grid-cols-[2.5rem_1fr]">
            <div className="flex h-28 items-center justify-center border-r border-edge bg-background">
              <span className="rotate-270 font-mono text-sm text-muted-foreground select-none">
                Mark
              </span>
            </div>

            <div className="screen-line-after flex items-center justify-center pr-8 after:z-1">
              <OyinnMark className="h-8 w-auto sm:h-12" />
            </div>
          </div>
        </div>
      </BrandContextMenu>
    </Panel>
  );
}

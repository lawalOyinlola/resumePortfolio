import { SimpleTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function TechStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <ul className="flex flex-wrap gap-3 select-none">
          {TECH_STACK.map((tech) => (
            <li key={tech.title} className="flex">
              <SimpleTooltip content={tech.title}>
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tech.title}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-lg transition-opacity hover:opacity-80"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tech.icon}
                    alt={`${tech.title} icon`}
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                    loading="lazy"
                  />
                  <span className="sr-only">{tech.title}</span>
                </a>
              </SimpleTooltip>
            </li>
          ))}
        </ul>
      </PanelContent>
    </Panel>
  );
}

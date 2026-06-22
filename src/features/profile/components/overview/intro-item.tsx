import type { LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

export function IntroItem({
  icon: Icon,
  content,
  href,
  className,
}: {
  icon: React.ComponentType<LucideProps>;
  content: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-sm", className)}>
      <div
        className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
        aria-hidden
      >
        <Icon className="pointer-events-none size-4 text-muted-foreground" />
      </div>

      <p className="text-balance">
        {href ? (
          <a
            className="underline-offset-4 hover:underline"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          content
        )}
      </p>
    </div>
  );
}

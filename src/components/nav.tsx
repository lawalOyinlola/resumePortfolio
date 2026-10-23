import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

export function Nav({
  items,
  activeId,
  className,
}: {
  items: NavItem[];
  activeId?: string | null;
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-4", className)}>
      {items.map(({ title, href }) => {
        const active =
          activeId === href || (href !== "/" && activeId?.startsWith(href));

        return (
          <NavItem key={href} href={href} active={active}>
            {title}
          </NavItem>
        );
      })}
    </nav>
  );
}

export function NavItem({
  active,
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link> & {
  active?: boolean;
}) {
  const className = cn(
    "inline-flex items-center gap-0.5 font-sans text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground",
    active && "text-foreground"
  );

  // Links to other sites open in a new tab and say so.
  if (typeof href === "string" && /^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener" className={className}>
        {children}
        <ArrowUpRightIcon className="size-3.5 opacity-60" aria-hidden />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}

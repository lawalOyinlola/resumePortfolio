import Link from "next/link";

import { BrandContextMenu } from "@/components/brand-context-menu";
import { CommandMenu } from "@/components/command-menu";
import { Nav } from "@/components/nav";
import { NavItemGitHub } from "@/components/nav-item-github";
import { Separator } from "@/components/ui/separator";
import { MAIN_NAV } from "@/config/site";
import { cn } from "@/lib/utils";

import { OyinnMark } from "./oyinn-mark";
import { SiteHeaderWrapper } from "./site-header-wrapper";
import { ToggleTheme } from "./toggle-theme";

// Header layout follows chanhdai.com: the mark is always visible, and the nav,
// search, GitHub and theme controls are borderless, split by thin separators.
export function SiteHeader() {
  return (
    <SiteHeaderWrapper
      className={cn(
        "sticky inset-0 top-0 z-50 max-w-screen overflow-x-hidden bg-background px-2 pt-2",
        "data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]/80",
        "not-dark:data-[affix=true]:**:data-header-container:after:bg-border",
        "transition-shadow duration-300"
      )}
    >
      <div
        className="screen-line-before screen-line-after mx-auto flex h-12 items-center gap-2 border-x border-edge pr-2 pl-4 after:z-1 after:transition-[background-color] sm:gap-4 md:max-w-3xl"
        data-header-container
      >
        <BrandContextMenu>
          <Link href="/" aria-label="Home">
            <OyinnMark className="h-6 shrink-0" />
          </Link>
        </BrandContextMenu>

        <div className="flex-1" />

        <Nav className="max-sm:hidden" items={MAIN_NAV} />

        <div className="flex items-center">
          <HeaderSeparator className="mr-2 max-sm:hidden" />
          <CommandMenu />
          <HeaderSeparator className="mx-2" />
          <NavItemGitHub />
          <HeaderSeparator className="mx-2" />
          <ToggleTheme />
        </div>
      </div>
    </SiteHeaderWrapper>
  );
}

function HeaderSeparator({ className }: { className?: string }) {
  return (
    <Separator
      orientation="vertical"
      className={cn("data-[orientation=vertical]:h-5", className)}
    />
  );
}

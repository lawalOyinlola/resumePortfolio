import { Icons } from "@/components/icons";
import { OyinnMark } from "@/components/oyinn-mark";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { UTM_PARAMS } from "@/config/site";
import { cn } from "@/lib/utils";
import { addQueryParams } from "@/utils/url";

import { SOCIAL_LINKS } from "../../data/social-links";
import { Panel, PanelContent } from "../panel";

/** Monochrome icon + brand color (applied on hover), resolved from the title. */
function getSocial(title: string): { icon: React.ReactNode; color: string } {
  if (/portfolio/i.test(title))
    return { icon: <OyinnMark />, color: "var(--color-foreground)" };
  if (/linkedin/i.test(title))
    return { icon: <Icons.linkedin />, color: "#0A66C2" };
  if (/github/i.test(title))
    return { icon: <Icons.github />, color: "var(--color-foreground)" };
  if (/(^x$|twitter)/i.test(title))
    return { icon: <Icons.x />, color: "var(--color-foreground)" };
  if (/whatsapp/i.test(title))
    return {
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
        </svg>
      ),
      color: "#25D366",
    };
  return { icon: <Icons.x />, color: "var(--color-foreground)" };
}

export function SocialLinks() {
  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>

      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((link) => {
            const { icon, color } = getSocial(link.title);

            return (
              <li key={link.title} className="flex">
                <SimpleTooltip content={link.title}>
                  <a
                    href={addQueryParams(link.href, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.title}
                    style={{ "--brand": color } as React.CSSProperties}
                    className={cn(
                      "flex size-8 items-center justify-center rounded-lg shadow-xs",
                      // Glassy gradient border (light edge, top-left highlight).
                      // Vars set directly — the from-*/via-*/to-* utilities don't
                      // generate reliably in this Tailwind build.
                      "gradient-border [--gradient-border-angle:to_top_left]",
                      "[--gradient-border-from:color-mix(in_oklab,var(--foreground)_15%,transparent)]",
                      "[--gradient-border-via:color-mix(in_oklab,var(--foreground)_3%,transparent)]",
                      "[--gradient-border-to:color-mix(in_oklab,var(--foreground)_22%,transparent)]",
                      "dark:[--gradient-border-from:color-mix(in_oklab,var(--foreground)_22%,transparent)]",
                      "dark:[--gradient-border-via:color-mix(in_oklab,var(--foreground)_6%,transparent)]",
                      "dark:[--gradient-border-to:color-mix(in_oklab,var(--foreground)_34%,transparent)]",
                      // Subtle glass fill
                      "bg-linear-to-t from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-800",
                      "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-foreground/80 [&_svg]:transition-colors",
                      "hover:[&_svg]:text-(--brand)"
                    )}
                  >
                    {icon}
                    <span className="sr-only">{link.title}</span>
                  </a>
                </SimpleTooltip>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}

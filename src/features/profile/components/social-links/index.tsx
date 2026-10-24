"use client";

// Client component on purpose: rendered on the server, an icon link can reach
// the tooltip's Radix Slot (`asChild`) as a lazy RSC reference, and Slot
// renders nothing for it (the GitHub link went missing that way).
import { LinkIcon, ShieldCheckIcon } from "lucide-react";

import { Icons } from "@/components/icons";
import { OyinnMark } from "@/components/oyinn-mark";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import { SOCIAL_LINKS } from "../../data/social-links";
import { HandwrittenArrow, HandwrittenNote } from "../handwritten-note";
import { Panel, PanelContent } from "../panel";

/** Monochrome icon for a social link, resolved from its title. */
function getSocialIcon(title: string): React.ReactNode {
  if (/portfolio/i.test(title)) return <OyinnMark />;
  if (/linkedin/i.test(title)) return <Icons.linkedin />;
  if (/github/i.test(title)) return <Icons.github />;
  if (/security/i.test(title)) return <ShieldCheckIcon />;
  if (/(^x$|twitter)/i.test(title)) return <Icons.x />;
  if (/whatsapp/i.test(title))
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
      </svg>
    );
  return <LinkIcon />;
}

export function SocialLinks() {
  return (
    <Panel className="relative">
      <h2 className="sr-only">Social Links</h2>

      <PanelContent>
        <ul className="flex flex-wrap gap-2">
          {SOCIAL_LINKS.map((link) => {
            const icon = getSocialIcon(link.title);

            return (
              <li key={link.title} className="flex">
                <SimpleTooltip content={link.title}>
                  <a
                    href={addQueryParams(link.href, UTM_PARAMS)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.title}
                    // Outline icon button, as on chanhdai.com.
                    className="flex size-8 items-center justify-center rounded-lg border border-input bg-background text-foreground/80 transition-colors hover:bg-accent hover:text-foreground [&_svg]:pointer-events-none [&_svg]:size-4.5 [&_svg]:shrink-0"
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

      {/* Sits in the left gutter, so it only shows when the gutter is wide
          enough to hold it. */}
      <HandwrittenNote className="-top-4 right-full mr-4 hidden w-20 flex-col items-end lg:flex">
        <span className="-rotate-6">follow me</span>
        <HandwrittenArrow className="size-7 translate-x-3 -scale-x-100 -rotate-6" />
      </HandwrittenNote>
    </Panel>
  );
}

"use client";

import { InfinityIcon } from "lucide-react";
import { useRef } from "react";

import {
  ChevronsUpDownIcon,
  type ChevronsUpDownIconHandle,
} from "@/components/animated-icons/chevrons-up-down-icon";
import { Markdown } from "@/components/markdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

import type { ExperiencePosition } from "../../types/experiences";
import { ExperienceIcon } from "./experience-position-icon";

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition;
}) {
  const { start, end } = position.employmentPeriod;
  const isOngoing = !end;
  const duration = formatDuration(start, end);

  const chevronRef = useRef<ChevronsUpDownIconHandle>(null);

  return (
    <Collapsible
      defaultOpen={position.isExpanded}
      onOpenChange={(open) => {
        if (open) {
          chevronRef.current?.startAnimation();
        } else {
          chevronRef.current?.stopAnimation();
        }
      }}
      disabled={!position.description}
      asChild
    >
      <div className="group/position relative">
        {/* Caps the connecting line with a small elbow at the bottom of the
            last (or only) position, instead of cutting it off early. */}
        <div
          className="pointer-events-none absolute bottom-0 left-3 hidden size-4 bg-background group-last/position:flex"
          aria-hidden
        >
          <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l" />
        </div>

        <CollapsibleTrigger
          className={cn(
            "group/experience block w-full text-left select-none",
            "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg hover:before:bg-accent/20",
            "data-disabled:before:content-none"
          )}
        >
          <div className="relative z-1 mb-1 flex items-start gap-3">
            <div
              className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background"
              aria-hidden
            >
              <ExperienceIcon className="size-4" icon={position.icon} />
            </div>

            <h4 className="flex-1 pt-px font-medium text-balance">
              {position.title}
            </h4>

            <div
              className="shrink-0 pt-px text-muted-foreground group-disabled/experience:hidden [&_svg]:size-4"
              aria-hidden
            >
              <ChevronsUpDownIcon ref={chevronRef} />
            </div>
          </div>

          <div className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
            {position.employmentType && (
              <>
                <dl>
                  <dt className="sr-only">Employment Type</dt>
                  <dd>{position.employmentType}</dd>
                </dl>

                <Separator
                  className="data-[orientation=vertical]:h-4"
                  orientation="vertical"
                />
              </>
            )}

            <dl>
              <dt className="sr-only">Employment Period</dt>
              <dd className="flex items-center gap-0.5 tabular-nums">
                <span>{start}</span>
                <span className="font-mono">—</span>
                {isOngoing ? (
                  <>
                    <InfinityIcon
                      className="size-4.5 translate-y-[0.5px]"
                      aria-hidden
                    />
                    <span className="sr-only">Present</span>
                  </>
                ) : (
                  <span>{end}</span>
                )}
              </dd>
            </dl>

            {duration && (
              <>
                <Separator
                  className="data-[orientation=vertical]:h-4"
                  orientation="vertical"
                />
                <dl>
                  <dt className="sr-only">Duration</dt>
                  <dd className="tabular-nums">{duration}</dd>
                </dl>
              </>
            )}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          {position.description && (
            <Prose className="pt-2 pl-9">
              <Markdown>{position.description}</Markdown>
            </Prose>
          )}
        </CollapsibleContent>

        {Array.isArray(position.skills) && position.skills.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 pt-2 pl-9">
            {position.skills.map((skill, index) => (
              <li key={index} className="flex">
                <Tag>{skill}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Collapsible>
  );
}

/** "MM.YYYY" or "YYYY" → "Xy Ym" / "Xy" / "Xm", inclusive of both end months. */
function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes(".");
  const endHasMonth = end ? end.includes(".") : true;

  // Both year-only: granularity is years, no month arithmetic needed.
  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10);
    return years > 0 ? `${years}y` : "";
  }

  const startDate = parsePeriodDate(start, "first");
  const endDate = end ? parsePeriodDate(end, "last") : new Date();

  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) +
    1;
  if (totalMonths <= 0) return "";

  if (totalMonths < 12) return `${totalMonths}m`;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return months === 0 ? `${years}y` : `${years}y ${months}m`;
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) {
    const [month, year] = str.split(".").map(Number);
    return new Date(year, month - 1, 1);
  }
  const month = fallbackMonth === "last" ? 11 : 0;
  return new Date(parseInt(str, 10), month, 1);
}

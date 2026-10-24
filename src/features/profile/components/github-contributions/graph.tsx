"use client";

import { format, parseISO } from "date-fns";

import type { Activity } from "@/components/contribution-graph";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";

const github = SOCIAL_LINKS.find((link) => link.title === "GitHub");

const formatDay = (date: string) => format(parseISO(date), "d MMM yyyy");

// Ported from chanhdai.com. A client component that receives plain data, so
// the tooltip triggers are built here rather than passed in from the server.
export function GitHubContributionGraph({ data }: { data: Activity[] }) {
  if (data.length === 0) {
    return null;
  }

  return (
    <figure>
      <ContributionGraph
        className="mx-auto gap-4 py-4"
        data={data}
        blockSize={12}
        blockMargin={2}
        blockRadius={0}
        aria-label="GitHub contributions graph"
      >
        <ContributionGraphCalendar
          className="px-4 **:data-[slot=month-labels]:text-muted-foreground"
          title="GitHub contributions"
          aria-hidden
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              </TooltipTrigger>
              <TooltipContent>
                {activity.count === 0
                  ? "No contributions"
                  : `${activity.count} contribution${activity.count > 1 ? "s" : ""}`}{" "}
                on {formatDay(activity.date)}
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-4 text-sm">
          <ContributionGraphTotalCount>
            {({ totalCount }) => (
              <figcaption className="text-pretty tabular-nums">
                {/* Same figure label style as FIG_001 on the mark. */}
                <span className="mr-2 font-mono text-xs text-muted-foreground/50">
                  FIG_002
                </span>
                {totalCount.toLocaleString("en")} contributions,{" "}
                {formatDay(data[0].date)} –{" "}
                {formatDay(data[data.length - 1].date)}. Source:{" "}
                <a
                  href={github?.href}
                  className="link-underline"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </a>
                .
              </figcaption>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend aria-hidden />
        </ContributionGraphFooter>
      </ContributionGraph>
    </figure>
  );
}

import dayjs from "dayjs";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type ContributionDay,
  getGitHubContributions,
} from "@/features/profile/data/github-contributions";
import { cn } from "@/lib/utils";

const LEVEL_CLASS: Record<number, string> = {
  0: "bg-muted",
  1: "bg-foreground/25",
  2: "bg-foreground/45",
  3: "bg-foreground/70",
  4: "bg-foreground",
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Group the flat day list into Sunday-aligned weeks (columns). */
function toWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  if (days.length === 0) return [];

  const weeks: (ContributionDay | null)[][] = [];
  let week: (ContributionDay | null)[] = Array(dayjs(days[0].date).day()).fill(
    null
  );

  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  return weeks;
}

export async function GitHubContributionGraph() {
  const contributions = await getGitHubContributions();

  if (!contributions || contributions.length === 0) {
    return null;
  }

  const weeks = toWeeks(contributions);
  const total = contributions.reduce((sum, day) => sum + day.count, 0);

  return (
    <figure className="screen-line-after flex flex-col gap-3 overflow-x-auto p-4">
      <div className="flex w-max flex-col gap-1">
        {/* Month labels */}
        <div className="flex gap-[3px] pl-0 text-xs text-muted-foreground">
          {weeks.map((week, i) => {
            const firstDay = week.find(Boolean);
            const month = firstDay ? dayjs(firstDay.date).date() <= 7 : false;
            return (
              <div key={i} className="w-2.5 shrink-0 text-center">
                {month && firstDay ? (
                  <span className="relative -left-px inline-block">
                    {MONTH_LABELS[dayjs(firstDay.date).month()]}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Weeks grid */}
        <div className="flex gap-[3px]">
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {week.map((day, j) =>
                day ? (
                  <Tooltip key={day.date}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${dayjs(day.date).format("DD.MM.YYYY")}`}
                        className={cn(
                          "size-2.5 rounded-[2px] border-0 p-0 ring-1 ring-foreground/5 ring-inset",
                          LEVEL_CLASS[day.level] ?? LEVEL_CLASS[0]
                        )}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="px-3 py-1.5 text-xs">
                      {day.count === 0
                        ? "No contributions"
                        : `${day.count} contribution${day.count === 1 ? "" : "s"}`}{" "}
                      on {dayjs(day.date).format("DD.MM.YYYY")}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <div key={j} className="size-2.5" />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <figcaption className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>{total.toLocaleString("en")} contributions in the last year</span>

        <span className="flex items-center gap-1">
          Less
          {[0, 1, 2, 3, 4].map((level) => (
            <span
              key={level}
              className={cn(
                "size-2.5 rounded-[2px] ring-1 ring-foreground/5 ring-inset",
                LEVEL_CLASS[level]
              )}
              aria-hidden
            />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}

import dayjs from "dayjs";
import {
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  CrownIcon,
  PaperclipIcon,
} from "lucide-react";
import Image from "next/image";

import { Markdown } from "@/components/markdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { Prose } from "@/components/ui/typography";

import type { Award } from "../../types/awards";

export function AwardItem({
  className,
  award,
}: {
  className?: string;
  award: Award;
}) {
  const hasHighlights =
    Array.isArray(award.highlights) && award.highlights.length > 0;
  const canExpand = !!award.description || hasHighlights;

  return (
    <Collapsible disabled={!canExpand} asChild>
      <div className={className}>
        <div className="group/award-row flex items-center transition-colors hover:bg-accent/50">
          <div
            className="mx-4 flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background"
            aria-hidden
          >
            {award.logoURL ? (
              <Image
                src={award.logoURL}
                alt=""
                width={24}
                height={24}
                quality={100}
                className="size-full object-contain grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/award-row:grayscale-0"
                unoptimized
              />
            ) : (
              <CrownIcon className="size-4" />
            )}
          </div>

          <div className="flex-1 border-l border-dashed border-edge">
            <CollapsibleTrigger className="group/award flex w-full items-center gap-4 p-4 pr-2 text-left select-none">
              <div className="flex-1">
                <h3 className="mb-1 leading-snug font-medium text-balance">
                  {award.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <dl>
                    <dt className="sr-only">Prize</dt>
                    <dd>{award.prize}</dd>
                  </dl>

                  <Separator
                    className="data-[orientation=vertical]:h-4"
                    orientation="vertical"
                  />

                  <dl>
                    <dt className="sr-only">Awarded in</dt>
                    <dd>
                      <time dateTime={dayjs(award.date).toISOString()}>
                        {dayjs(award.date).format("MM.YYYY")}
                      </time>
                    </dd>
                  </dl>

                  <Separator
                    className="data-[orientation=vertical]:h-4"
                    orientation="vertical"
                  />

                  <dl>
                    <dt className="sr-only">Received in Grade</dt>
                    <dd>{award.grade}</dd>
                  </dl>
                </div>
              </div>

              {award.referenceLink && (
                <SimpleTooltip content="Open Reference Attachment">
                  <a
                    className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                    href={award.referenceLink}
                    target="_blank"
                    rel="noopener"
                  >
                    <PaperclipIcon
                      className="pointer-events-none size-4"
                      aria-hidden
                    />
                    <span className="sr-only">Open Reference Attachment</span>
                  </a>
                </SimpleTooltip>
              )}

              {canExpand && (
                <div
                  className="shrink-0 text-muted-foreground [&_svg]:size-4"
                  aria-hidden
                >
                  <ChevronsDownUpIcon className="hidden group-data-[state=open]/award:block" />
                  <ChevronsUpDownIcon className="hidden group-data-[state=closed]/award:block" />
                </div>
              )}
            </CollapsibleTrigger>
          </div>
        </div>

        {canExpand && (
          <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <Prose className="space-y-2 border-t border-dashed border-edge p-4">
              {award.description && <Markdown>{award.description}</Markdown>}
              {hasHighlights && (
                <Markdown>
                  {award.highlights!.map((h) => `- ${h}`).join("\n")}
                </Markdown>
              )}
            </Prose>
          </CollapsibleContent>
        )}
      </div>
    </Collapsible>
  );
}

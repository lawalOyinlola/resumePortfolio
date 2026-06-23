"use client";

import { InfinityIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import {
  ChevronsUpDownIcon,
  type ChevronsUpDownIconHandle,
} from "@/components/animated-icons/chevrons-up-down-icon";
import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LinkPreview } from "@/components/ui/link-preview";
import { Tag } from "@/components/ui/tag";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { Prose } from "@/components/ui/typography";
import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import type { Project } from "../../types/projects";

export function ProjectItem({
  className,
  project,
}: {
  className?: string;
  project: Project;
}) {
  const { start, end } = project.period;
  const isOngoing = !end;
  const isSinglePeriod = end === start;

  const chevronRef = useRef<ChevronsUpDownIconHandle>(null);

  return (
    <Collapsible
      defaultOpen={project.isExpanded}
      onOpenChange={(open) => {
        if (open) {
          chevronRef.current?.startAnimation();
        } else {
          chevronRef.current?.stopAnimation();
        }
      }}
      asChild
    >
      <div className={className}>
        <div className="group/project flex items-center transition-colors hover:bg-accent/20">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={32}
              height={32}
              quality={100}
              className="mx-4 flex size-6 shrink-0 grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] select-none group-hover/project:grayscale-0"
              unoptimized
              aria-hidden="true"
            />
          ) : (
            <div
              className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none"
              aria-hidden="true"
            >
              <Icons.project className="size-4" />
            </div>
          )}

          <div className="flex flex-1 items-center gap-2 border-l border-dashed border-edge p-4 pr-2">
            {/* Title + period — hovering shows the link preview, clicking
                toggles the card (the popup image is what opens the link). */}
            <LinkPreview
              url={project.link}
              {...(project.image
                ? { imageSrc: project.image, isStatic: true }
                : { isStatic: false })}
              asChild
            >
              <CollapsibleTrigger className="min-w-0 flex-1 text-left select-none">
                <h3 className="mb-1 leading-snug font-medium text-balance">
                  {project.title}
                </h3>

                <dl className="text-sm text-muted-foreground">
                  <dt className="sr-only">Period</dt>
                  <dd className="flex items-center gap-0.5">
                    <span>{start}</span>
                    {!isSinglePeriod && (
                      <>
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
                      </>
                    )}
                  </dd>
                </dl>
              </CollapsibleTrigger>
            </LinkPreview>

            {/* External link with a tooltip */}
            <SimpleTooltip content="Open Project Link">
              <a
                href={addQueryParams(project.link, UTM_PARAMS)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Project Link"
                className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground transition-colors select-none after:absolute after:-inset-2 hover:text-foreground"
              >
                <LinkIcon className="pointer-events-none size-4" />
              </a>
            </SimpleTooltip>

            {/* Collapse toggle */}
            <CollapsibleTrigger
              className="group/project-toggle relative flex size-6 shrink-0 items-center justify-center text-muted-foreground transition-colors select-none after:absolute after:-inset-2 hover:text-foreground [&_svg]:size-4"
              aria-label="Toggle project details"
            >
              <ChevronsUpDownIcon ref={chevronRef} />
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="space-y-4 border-t border-dashed border-edge p-4">
            {project.description && (
              <Prose>
                <Markdown>{project.description}</Markdown>
              </Prose>
            )}

            {project.skills.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {project.skills.map((skill, index) => (
                  <li key={index} className="flex">
                    <Tag>{skill}</Tag>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

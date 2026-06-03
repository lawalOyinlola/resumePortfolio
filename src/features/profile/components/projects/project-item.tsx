import {
  ChevronsDownUpIcon,
  ChevronsUpDownIcon,
  InfinityIcon,
  LinkIcon,
} from "lucide-react";
import Image from "next/image";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { LinkPreview } from "@/components/ui/link-preview";
import { Tag } from "@/components/ui/tag";
import { Prose } from "@/components/ui/typography";

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

  return (
    <Collapsible defaultOpen={project.isExpanded} asChild>
      <div className={className}>
        <div className="flex items-center">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={32}
              height={32}
              quality={100}
              className="mx-4 flex size-6 shrink-0 select-none"
              unoptimized
              aria-hidden="true"
            />
          ) : (
            <div
              className="mx-4 flex size-6 shrink-0 items-center justify-center text-muted-foreground select-none"
              aria-hidden="true"
            >
              <Icons.project className="size-5" />
            </div>
          )}

          <div className="flex-1 border-l border-dashed border-edge">
            <CollapsibleTrigger className="group/project flex min-h-11 w-full items-center gap-4 p-4 pr-2 text-left select-none">
              <div className="flex-1">
                <h3 className="mb-1 leading-snug font-medium text-balance">
                  {project.title}
                </h3>

                <dl className="text-sm text-muted-foreground">
                  <dt className="sr-only">Period</dt>
                  <dd className="flex items-center gap-0.5">
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
              </div>

              <LinkPreview
                url={project.link}
                {...(project.image
                  ? { imageSrc: project.image, isStatic: true }
                  : { isStatic: false })}
                className="flex min-h-11 min-w-11 items-center justify-center"
              >
                <LinkIcon className="pointer-events-none size-5 text-muted-foreground" />
                <span className="sr-only">Open Project Link</span>
              </LinkPreview>

              <div
                className="shrink-0 text-muted-foreground [&_svg]:size-4"
                aria-hidden
              >
                <ChevronsDownUpIcon className="hidden group-data-[state=open]/project:block" />
                <ChevronsUpDownIcon className="hidden group-data-[state=closed]/project:block" />
              </div>
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

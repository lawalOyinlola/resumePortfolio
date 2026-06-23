import Image from "next/image";

import { LinkPreview } from "@/components/ui/link-preview";
import { UTM_PARAMS } from "@/config/site";
import { addQueryParams } from "@/utils/url";

import type { Experience } from "../../types/experiences";
import { ExperiencePositionItem } from "./experience-position-item";

export function ExperienceItem({
  experience,
  /** When true, the org name shows a hover link-preview (used by Volunteering);
   *  otherwise it's a plain clickable link. */
  previewWebsite = false,
}: {
  experience: Experience;
  previewWebsite?: boolean;
}) {
  return (
    <div className="group/experience-co screen-line-after space-y-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex size-6 shrink-0 items-center justify-center select-none">
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.companyName}
              width={24}
              height={24}
              quality={100}
              className="size-full rounded-full object-contain grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/experience-co:grayscale-0"
              aria-hidden
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-lg leading-snug font-medium">
          {experience.companyWebsite ? (
            previewWebsite ? (
              <LinkPreview
                url={experience.companyWebsite}
                {...(experience.companyWebsiteImage
                  ? { imageSrc: experience.companyWebsiteImage, isStatic: true }
                  : { isStatic: false })}
                className="hover:underline hover:underline-offset-4"
              >
                {experience.companyName}
              </LinkPreview>
            ) : (
              <a
                href={addQueryParams(experience.companyWebsite, UTM_PARAMS)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:underline-offset-4"
              >
                {experience.companyName}
              </a>
            )
          ) : (
            experience.companyName
          )}
        </h3>

        {experience.isCurrentEmployer && (
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-info opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-info" />
            <span className="sr-only">Current Employer</span>
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}

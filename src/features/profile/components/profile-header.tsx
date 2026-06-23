import Image from "next/image";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "@/features/profile/data/user";
import { FlipSentences } from "@/registry/flip-sentences";

import { AvatarLights } from "./avatar-lights";
import { AvatarLightsToggle } from "./avatar-lights-toggle";
import { OyinnMarkIsometric } from "./oyinn-mark-isometric";
import { PronounceMyName } from "./pronounce-my-name";
import { VerifiedIcon } from "./verified-icon";

export function ProfileHeader() {
  return (
    <div className="screen-line-after grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x border-edge">
      {/* Brand figure (FIG_001) — fills the hero */}
      <figure className="relative col-span-2 p-2 sm:col-span-1 sm:col-start-2 sm:p-4">
        <OyinnMarkIsometric id="js-cover-mark" />

        <figcaption className="pointer-events-none absolute right-2 bottom-2 font-mono text-xs leading-none text-muted-foreground/50 select-none sm:right-4">
          FIG_001
        </figcaption>
      </figure>

      {/* Avatar (with optional lights) + flag */}
      <div className="flex flex-col sm:row-span-2 sm:row-start-1">
        <div className="screen-line-before relative mt-auto shrink-0 border-r border-edge">
          {USER.avatarVariants ? (
            <AvatarLightsToggle className="group/avatar-lights-toggle mx-0.5 my-0.75 flex outline-none">
              <AvatarLights
                className="ring-border ring-offset-background group-focus-visible/avatar-lights-toggle:ring-1 group-focus-visible/avatar-lights-toggle:ring-offset-2"
                variants={USER.avatarVariants}
              />
              <span className="sr-only">
                Toggle {USER.displayName}&apos;s avatar lights
              </span>
            </AvatarLightsToggle>
          ) : (
            <div className="mx-0.5 my-0.75">
              <Image
                className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
                alt={`${USER.displayName}'s avatar`}
                src={USER.avatar}
                width={160}
                height={160}
                priority
              />
            </div>
          )}

          <SimpleTooltip content="Nigeria">
            {/* Flag of Nigeria */}
            <svg
              className="absolute top-1 left-1 h-7 rounded-xs ring-1 ring-black/10 sm:h-8"
              viewBox="0 0 30 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="10" height="20" x="0" y="0" fill="#008753" />
              <rect width="10" height="20" x="10" y="0" fill="#fff" />
              <rect width="10" height="20" x="20" y="0" fill="#008753" />
            </svg>
          </SimpleTooltip>
        </div>
      </div>

      {/* Name + roles */}
      <div className="flex flex-col">
        <div className="z-1 mt-auto border-t border-edge">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-3xl font-semibold tracking-tight">
              {USER.displayName}
            </h1>

            <SimpleTooltip content="Verified">
              <VerifiedIcon className="size-4.5 text-foreground select-none" />
            </SimpleTooltip>

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <div className="h-12.5 border-t border-edge py-1 pl-4 sm:h-9">
            <FlipSentences sentences={USER.flipSentences} />
          </div>
        </div>
      </div>
    </div>
  );
}

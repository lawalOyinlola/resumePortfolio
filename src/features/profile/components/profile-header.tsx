import Image from "next/image";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { USER } from "@/features/profile/data/user";
import { cn } from "@/lib/utils";
import { FlipSentences } from "@/registry/flip-sentences";

import { AvatarLights } from "./avatar-lights";
import { AvatarLightsToggle } from "./avatar-lights-toggle";
import { HandwrittenArrow, HandwrittenNote } from "./handwritten-note";
import { OyinnMarkIsometric } from "./oyinn-mark-isometric";
import { PronounceMyName } from "./pronounce-my-name";
import { VerifiedIcon } from "./verified-icon";

export function ProfileHeader() {
  return (
    <div className="screen-line-after grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x border-edge">
      {/* Brand figure (FIG_001) — fills the hero */}
      <figure className="relative col-span-2 p-2 sm:col-span-1 sm:col-start-2 sm:p-4">
        <OyinnMarkIsometric id="js-cover-mark" />

        {/* The note needs a wide right gutter, and the spotlight ignores
            coarse pointers, so there is nothing to annotate on touch. */}
        <HandwrittenNote className="bottom-20 left-full hidden w-36 flex-col items-start pointer-fine:xl:flex">
          <HandwrittenArrow className="-scale-y-100 -rotate-6" />
          <span className="ml-3 -rotate-6">
            follows your cursor
            <span className="block" />
            click for a sound
          </span>
        </HandwrittenNote>

        <figcaption className="pointer-events-none absolute right-2 bottom-2 font-mono text-xs leading-none text-muted-foreground/50 select-none sm:right-4">
          FIG_001
        </figcaption>
      </figure>

      {/* Avatar (with optional lights) */}
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
            <div className="relative mx-0.5 my-0.75 size-32 rounded-full sm:size-40">
              {/* Theme-adaptive: the sketch in light mode, the full-color
                  avatar in dark mode. Without a sketch, the avatar shows in
                  both themes. */}
              {USER.avatarSketch && (
                <Image
                  className="size-32 rounded-full select-none sm:size-40 dark:hidden"
                  alt={`${USER.displayName}'s avatar, sketch style`}
                  src={USER.avatarSketch}
                  width={160}
                  height={160}
                  preload
                />
              )}
              <Image
                className={cn(
                  "size-32 rounded-full select-none sm:size-40",
                  USER.avatarSketch && "hidden dark:block"
                )}
                alt={`${USER.displayName}'s avatar`}
                src={USER.avatar}
                width={160}
                height={160}
                preload
              />
              {/* Hairline edge (chanhdai.com style), so the line-art avatar
                  doesn't float without a boundary. */}
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] inset-ring-1 inset-ring-foreground/30 dark:inset-ring-foreground/10" />
            </div>
          )}
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

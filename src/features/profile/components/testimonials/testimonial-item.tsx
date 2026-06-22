import { QuoteIcon } from "lucide-react";

import { LinkPreview } from "@/components/ui/link-preview";
import { cn } from "@/lib/utils";

import type { Testimonial } from "../../types/testimonials";
import { VerifiedIcon } from "../verified-icon";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialItem({ testimonial }: { testimonial: Testimonial }) {
  const { authorName, authorTagline, authorAvatar, quote, url, isVerified } =
    testimonial;

  return (
    <figure className="flex h-full flex-col gap-4 p-4">
      <QuoteIcon
        className="size-5 shrink-0 text-muted-foreground"
        aria-hidden
      />

      <blockquote className="flex-1 text-sm text-balance">{quote}</blockquote>

      <figcaption className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted font-mono text-xs text-muted-foreground select-none",
            "ring-1 ring-border"
          )}
          aria-hidden
        >
          {authorAvatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={authorAvatar}
              alt=""
              className="size-full object-cover"
              loading="lazy"
            />
          ) : (
            initials(authorName)
          )}
        </span>

        <div className="min-w-0 leading-tight">
          <div className="flex items-center gap-1 font-medium">
            {url ? (
              <LinkPreview url={url} className="hover:underline">
                {authorName}
              </LinkPreview>
            ) : (
              <span>{authorName}</span>
            )}
            {isVerified && (
              <VerifiedIcon className="size-3.5 shrink-0 text-info" />
            )}
          </div>
          <div className="truncate text-sm text-muted-foreground">
            {authorTagline}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

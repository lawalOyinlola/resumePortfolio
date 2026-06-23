import Image from "next/image";

import type { AvatarLightsVariants } from "@/features/profile/types/user";
import { cn } from "@/lib/utils";

export function AvatarLights({
  className,
  variants,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  variants: AvatarLightsVariants;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none relative size-32 rounded-full select-none sm:size-40",
        className
      )}
      {...props}
    >
      {/* Base layer: light theme, lights off */}
      <div className="absolute inset-0">
        <AvatarImage
          src={variants.lightOff}
          alt="Avatar"
          fetchPriority="high"
        />
      </div>

      <AvatarLayer className="in-[.light[data-avatar-lights=on]]:opacity-100">
        <AvatarImage src={variants.lightOn} alt="" fetchPriority="high" />
      </AvatarLayer>

      <AvatarLayer className="in-[.dark[data-avatar-lights=off]]:opacity-100">
        <AvatarImage src={variants.darkOff} alt="" fetchPriority="high" />
      </AvatarLayer>

      <AvatarLayer className="in-[.dark[data-avatar-lights=on]]:opacity-100">
        <AvatarImage src={variants.darkOn} alt="" fetchPriority="high" />
      </AvatarLayer>

      <div
        className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background"
        aria-hidden
      />
    </div>
  );
}

function AvatarLayer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-700 ease-[cubic-bezier(0.42,0,0.58,1)]",
        className
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  alt,
  ...props
}: Omit<React.ComponentProps<typeof Image>, "fill">) {
  return (
    <Image
      fill
      sizes="(min-width: 640px) 160px, 128px"
      className={cn("rounded-full object-cover select-none", className)}
      alt={alt}
      {...props}
    />
  );
}

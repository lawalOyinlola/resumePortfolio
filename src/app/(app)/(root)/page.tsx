import { Awards } from "@/features/profile/components/awards";
import { Brand } from "@/features/profile/components/brand";
import { Certifications } from "@/features/profile/components/certifications";
import { Experiences } from "@/features/profile/components/experiences";
import { Hello } from "@/features/profile/components/hello";
import { Overview } from "@/features/profile/components/overview";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { Projects } from "@/features/profile/components/projects";
import { SocialLinks } from "@/features/profile/components/social-links";
import { TechStack } from "@/features/profile/components/tech-stack";
import { Testimonials } from "@/features/profile/components/testimonials";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <div className="mx-auto md:max-w-3xl">
      <ProfileHeader />
      <Separator />

      <Overview />
      <SocialLinks />
      <Separator />

      <Hello />
      <Separator />

      <TechStack />
      <Separator />

      <Experiences />
      <Separator />

      <Projects />
      <Separator />

      <Awards />
      <Separator />

      <Certifications />
      <Separator />

      <Testimonials />
      <Separator />

      <Brand />
      <Separator />
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}

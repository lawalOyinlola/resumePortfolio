import { ShieldCheckIcon } from "lucide-react";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { SOCIAL_LINKS } from "@/features/profile/data/social-links";
import { USER } from "@/features/profile/data/user";
import type { BuildInfo } from "@/lib/build-info";
import { getBuildInfo } from "@/lib/build-info";
import { cn } from "@/lib/utils";

// Imported here rather than through `@/config/site`, which client components
// pull in, to keep the manifest out of client bundles.
import packageJson from "../../package.json";
import { Icons } from "./icons";
import { OyinnMark } from "./oyinn-mark";
import { SiteFooterInteractiveLogotype } from "./site-footer-brand";

const BUILT_ON = [
  "chanhdai.com",
  "shadcn/ui",
  "Tailwind CSS",
  "Radix UI",
  "Motion",
  "cmdk",
  "Vercel",
  "Paper Mono",
];

const SITE_TITLE = new URL(SITE_INFO.url).host;
const SITE_SUBTITLE = packageJson.description;

const linkedin = SOCIAL_LINKS.find((link) => /linkedin/i.test(link.title));
const github = SOCIAL_LINKS.find((link) => link.title === "GitHub");
const security = SOCIAL_LINKS.find((link) => link.title === "Security");

/**
 * Footer laid out as the title block of a technical drawing, after
 * chanhdai.com's footer.
 */
export function SiteFooter() {
  const build = getBuildInfo();

  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="mx-auto border-x border-edge md:max-w-3xl">
        <div className="relative">
          <div className="screen-line-after flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 font-mono text-sm">
            <span className="font-medium">{SITE_TITLE}</span>
            <span className="font-sans text-muted-foreground">
              {SITE_SUBTITLE}
            </span>
          </div>

          <dl className="grid grid-cols-2 gap-px bg-edge font-mono md:grid-cols-4">
            <Field label="Crafted by">
              <a
                className="link-underline"
                href={USER.website}
                target="_blank"
                rel="noopener"
              >
                {USER.displayName}
              </a>
            </Field>

            <Field label="Build">
              <BuildValue build={build} />
            </Field>

            <Field label="Date">
              <time dateTime={build.date}>{build.date}</time>
            </Field>

            <Field label="Secures">
              <ul className="flex flex-col gap-0.5">
                {USER.secures.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Field>

            <Field label="Deployed on">
              <span className="font-sans" aria-hidden>
                ▲
              </span>
              <span className="sr-only">Vercel</span>
            </Field>

            <Field label="Source code">
              <a
                className="link-underline"
                href={SOURCE_CODE_GITHUB_URL}
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
            </Field>

            <Field label="License">
              <a
                className="link-underline"
                href={`${SOURCE_CODE_GITHUB_URL}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener"
              >
                MIT License
              </a>
            </Field>

            <Field label="Typeface">Geist</Field>

            {/* No dependency versions here on purpose: a public version list
                is a ready-made lookup table for known vulnerabilities. */}
            <Field className="col-span-2" label="Open to">
              <ul className="flex flex-col gap-0.5">
                {USER.openTo.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
                <li className="text-muted-foreground">
                  {USER.openTo.arrangements}
                </li>
              </ul>
            </Field>

            <Field label="Checks">
              <ul className="flex flex-col gap-0.5">
                <li>
                  <a
                    className="link-underline"
                    href={`${SOURCE_CODE_GITHUB_URL}/actions`}
                    target="_blank"
                    rel="noopener"
                  >
                    CI
                  </a>
                </li>
                <li>gitleaks</li>
                <li>CodeQL</li>
                <li>pnpm audit</li>
              </ul>
            </Field>

            <Field label="For agents">
              <ul className="flex flex-col gap-0.5">
                <li>
                  <a
                    className="link-underline"
                    href="/llms.txt"
                    target="_blank"
                    rel="noopener"
                  >
                    llms.txt
                  </a>
                </li>
                <li>
                  <a
                    className="link-underline"
                    href="/llms-full.txt"
                    target="_blank"
                    rel="noopener"
                  >
                    llms-full.txt
                  </a>
                </li>
              </ul>
            </Field>

            <Field className="col-span-2 md:col-span-4" label="Built on">
              {/*
                Cancelling the cell padding and repeating the parent's column
                count and gap lands these columns on the same grid lines as the
                cells above, rather than dividing the padded width.
              */}
              <ol className="-mx-4 grid grid-cols-2 gap-x-px gap-y-0.5 font-sans md:grid-cols-4">
                {BUILT_ON.map((name, index) => (
                  <li className="flex gap-2 px-4" key={name}>
                    {/* Hidden: the list element already conveys the position. */}
                    <span
                      className="font-mono text-muted-foreground/80"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {name}
                  </li>
                ))}
              </ol>
            </Field>
          </dl>
        </div>

        <div className="screen-line-before h-4" />

        <div className="screen-line-before screen-line-after flex items-center gap-3 px-4 py-3 text-muted-foreground">
          <Link
            href="/"
            className="mr-auto text-muted-foreground transition-[color] hover:text-foreground"
            aria-label="Home"
          >
            <OyinnMark className="h-4 w-auto" />
          </Link>

          {security && (
            <>
              <FooterLink href={security.href} label="Security work">
                <ShieldCheckIcon className="size-4" />
              </FooterLink>
              <FooterSeparator />
            </>
          )}

          {github && (
            <>
              <FooterLink href={github.href} label="GitHub profile">
                <Icons.github className="size-4" />
              </FooterLink>
              <FooterSeparator />
            </>
          )}

          {linkedin && (
            <FooterLink href={linkedin.href} label="LinkedIn profile">
              <Icons.linkedin className="size-4" />
            </FooterLink>
          )}
        </div>
      </div>

      <SiteFooterInteractiveLogotype />

      {/* Breathing room below the wordmark so the fixed FAB / scroll-to-top
          don't crowd the footer (matches chanhdai's fade-bottom spacing). */}
      <div className="h-24 md:h-8">
        <p className="px-4 py-2 text-center font-mono text-xs text-balance text-muted-foreground">
          Spelled backward, it&apos;s still Lawal.{" "}
          <span className="text-foreground/40">A palindrome.</span>
        </p>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]" />
    </footer>
  );
}

function BuildValue({ build }: { build: BuildInfo }) {
  if (!build.commitShortSha) {
    return <span className="text-muted-foreground">local</span>;
  }

  return (
    <>
      {build.commitUrl ? (
        <a
          className="link-underline"
          href={build.commitUrl}
          target="_blank"
          rel="noopener"
        >
          {build.commitShortSha}
        </a>
      ) : (
        build.commitShortSha
      )}

      {build.environment !== "production" && (
        <span className="text-muted-foreground">
          {" "}
          ({build.environment === "development" ? "local" : build.environment})
        </span>
      )}
    </>
  );
}

function FooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="flex items-center transition-[color] hover:text-foreground"
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function FooterSeparator() {
  return (
    <Separator
      orientation="vertical"
      className="data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
    />
  );
}

function Field({
  className,
  label,
  children,
}: {
  className?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-1 bg-background px-4 py-3",
        className
      )}
    >
      <dt className="text-[0.625rem]/4 font-medium tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
}

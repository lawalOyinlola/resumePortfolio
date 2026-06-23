import { SITE_INFO, SOURCE_CODE_GITHUB_URL } from "@/config/site";
import { USER } from "@/features/profile/data/user";

import { SiteFooterInteractiveLogotype } from "./site-footer-brand";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
        <p className="mb-1 px-4 text-center font-mono text-sm text-balance text-foreground/60">
          Built by{" "}
          <a
            className="link"
            href={USER.website}
            target="_blank"
            rel="noopener"
          >
            {USER.displayName}
          </a>
          . The source code is available on{" "}
          <a
            className="link"
            href={SOURCE_CODE_GITHUB_URL}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          .
        </p>

        <p className="mb-4 px-4 text-center font-mono text-sm text-balance text-foreground/60">
          Inspired by{" "}
          <a
            className="link"
            href="https://x.com/iamncdai"
            target="_blank"
            rel="noopener"
          >
            @ncdai
          </a>{" "}
          Minimalist Portfolio. Read this site as{" "}
          <a
            className="link"
            href={`${SITE_INFO.url}/llms.txt`}
            target="_blank"
            rel="noopener noreferrer"
          >
            llms.txt
          </a>
          .
        </p>
      </div>

      <SiteFooterInteractiveLogotype />

      {/* Breathing room below the wordmark so the fixed FAB / scroll-to-top
          don't crowd the footer (matches chanhdai's fade-bottom spacing). */}
      <div className="h-24 md:h-8">
        <p className="px-4 py-2 text-center font-mono text-xs text-balance text-muted-foreground">
          Spelled backward, it&apos;s still Lawal{" "}
          <span className="text-foreground/40">— a palindrome.</span>
        </p>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]" />
    </footer>
  );
}

import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

import { GitHubContributionGraph } from "./graph";

export function GitHubContributions() {
  return (
    <div>
      <h3 className="sr-only">GitHub Contributions</h3>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionGraph />
      </Suspense>
    </div>
  );
}

function GitHubContributionFallback() {
  return (
    <div className="screen-line-after flex h-32 w-full items-center justify-center">
      <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
}

import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";

import { getGitHubContributions } from "@/features/profile/data/github-contributions";

import { Panel } from "../panel";
import { GitHubContributionGraph } from "./graph";

export function GitHubContributions() {
  return (
    <Panel>
      <h2 className="sr-only">GitHub contributions</h2>

      <Suspense fallback={<GitHubContributionFallback />}>
        <GitHubContributionData />
      </Suspense>
    </Panel>
  );
}

async function GitHubContributionData() {
  const contributions = await getGitHubContributions();
  if (!contributions || contributions.length === 0) return null;
  return <GitHubContributionGraph data={contributions} />;
}

function GitHubContributionFallback() {
  return (
    <div className="flex h-45 w-full items-center justify-center">
      <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
    </div>
  );
}

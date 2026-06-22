import "server-only";

import { unstable_cache } from "next/cache";

import { GITHUB_USERNAME } from "@/config/site";

export type ContributionDay = {
  /** YYYY-MM-DD */
  date: string;
  count: number;
  /** 0–4 intensity bucket from the GitHub contributions API */
  level: number;
};

type ContributionsResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

/**
 * Last 365 days of public GitHub contributions, via the free, no-auth
 * github-contributions-api. Cached for a day; returns null on any failure so
 * the section can gracefully hide.
 */
export const getGitHubContributions = unstable_cache(
  async (): Promise<ContributionDay[] | null> => {
    try {
      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
      );

      if (!res.ok) {
        return null;
      }

      const data = (await res.json()) as ContributionsResponse;
      return data.contributions ?? null;
    } catch {
      return null;
    }
  },
  ["github-contributions"],
  { revalidate: 86400 } // 1 day
);

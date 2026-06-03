export type TechStack = {
  /** Display name shown in tooltip and screenreader. */
  title: string;
  /** Official website URL. */
  href: string;
  /** Icon — absolute URL (CDN / iconify) or path under /public. */
  icon: string;
  /** Optional category for grouping or filtering. */
  category?: string;
};

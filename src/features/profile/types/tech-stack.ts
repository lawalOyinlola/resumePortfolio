export type TechStack = {
  /** Display name shown in tooltip and screenreader. */
  title: string;
  /** Official website URL. */
  href: string;
  /**
   * SVG icon: a path under /public, or a CDN URL that sends CORS headers
   * (Simple Icons, Iconify). It is drawn as a CSS mask in the text color, so
   * every logo reads the same in light and dark mode.
   */
  icon: string;
  /** Optional category for grouping or filtering. */
  category?: string;
};

export type Award = {
  id: string;
  prize: string;
  title: string;
  /**
   * Award date used for sorting and display.
   * Format: "YYYY-MM" preferred (e.g., "2018-03"); "YYYY" is also accepted.
   */
  date: string;
  /**
   * School level or context label (e.g., "Grade 10", "University", "Personal Project").
   */
  grade: string;
  /** Optional issuer/org logo (absolute URL or path under /public) shown in
   *  place of the default crown icon. */
  logoURL?: string;
  /** Optional rich text summary; Markdown and line breaks supported. */
  description?: string;
  /** Optional bullet highlights (Markdown inline links/emphasis supported). */
  highlights?: string[];
  /** Optional URL to certificate, announcement, or reference material. */
  referenceLink?: string;
};

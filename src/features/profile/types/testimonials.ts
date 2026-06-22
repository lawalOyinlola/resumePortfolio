export type Testimonial = {
  /** Full display name of the person giving the testimonial */
  authorName: string;
  /** Short title/role/company of the person */
  authorTagline: string;
  /** Optional avatar URL; initials are shown when omitted */
  authorAvatar?: string;
  /** Optional link to the source (LinkedIn recommendation, tweet, etc.) */
  url?: string;
  /** The testimonial / recommendation text */
  quote: string;
  /** Whether to render a verified badge */
  isVerified?: boolean;
};

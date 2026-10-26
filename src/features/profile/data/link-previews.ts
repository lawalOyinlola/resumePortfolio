/**
 * Preview images for links the screenshot service can't render, such as
 * PDFs. Keyed by URL without its query string, since UTM parameters are
 * added at render time. Images live in public/images/previews/ at 600×375,
 * the 16:10 ratio of the preview card.
 */
export const LINK_PREVIEW_IMAGES: Record<string, string> = {
  "https://lawaloyinlola.com/files/apple-silicon-pentest-lab-report.pdf":
    "/images/previews/apple-silicon-pentest-lab-report.webp",
};

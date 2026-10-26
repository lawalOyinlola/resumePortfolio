/**
 * Scrolls to a section without writing its hash into the URL. Accepts "#id"
 * or "id". Returns false when no element has that id, so the caller can fall
 * back to the browser's default.
 */
export function scrollToSection(target: string): boolean {
  let id: string;
  try {
    id = decodeURIComponent(target.replace(/^#/, ""));
  } catch {
    // Malformed percent-encoding, such as "#%E0%A4%A": no such section.
    return false;
  }
  const element = id ? document.getElementById(id) : null;
  if (!element) return false;

  // `scroll-mt-*` on [id] keeps the section clear of the sticky header, and
  // the html element's `motion-safe:scroll-smooth` picks the behavior.
  element.scrollIntoView({ block: "start" });
  return true;
}

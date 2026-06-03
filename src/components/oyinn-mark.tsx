// "LO" monogram (Lawal Oyinlola).
// L: stem chopped at bottom-left (stops at y=192), detached foot to the right.
// O: hollow square with matching bottom-left cutout (bottom bar starts at x=320).
// viewBox is 2:1 (512×256). getMarkSVG returns the same mark at half scale (256×128).
const LO_PATH =
  "M0 0h64v192h-64Z M64 192h128v64h-128Z M256 0h256v64h-256Z M320 192h192v64h-192Z M256 64h64v128h-64Z M448 64h64v128h-64Z";

export function OyinnMark(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 512 256"
      {...props}
    >
      <path fill="currentColor" d={LO_PATH} />
    </svg>
  );
}

export function getMarkSVG(color: string) {
  // Half-scale: M0 0h32v96h-32Z (L stem) M32 96h64v32h-64Z (L foot)
  // M128 0h128v32h-128Z (O top) M160 96h96v32h-96Z (O bottom, cutout)
  // M128 32h32v64h-32Z (O left) M224 32h32v64h-32Z (O right)
  return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 128"><path fill="${color}" d="M0 0h32v96h-32Z M32 96h64v32h-64Z M128 0h128v32h-128Z M160 96h96v32h-96Z M128 32h32v64h-32Z M224 32h32v64h-32Z"/></svg>`;
}

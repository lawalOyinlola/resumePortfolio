"use client";

import { motion, useInView, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";

// "LAWAL" in the bold style of the ⅃AWA⅃ wordmark on lawaloyinlola.com, drawn
// from Geist at weight 900 (SIL Open Font License) as fixed outlines, so the
// shapes never depend on font loading. Units are Geist's: 1000 per em, cap
// height 710, y pointing down.
const CAP_HEIGHT = 710;
const LETTER_GAP = 36;

const GLYPHS = {
  L: { d: "M62 710V0H258V553H567V710Z", minX: 62, maxX: 567 },
  // The A and W are sliced by a vertical cut on one side, like the name on
  // lawaloyinlola.com: 48 units off the A's outer leg and off the W's top
  // corner. The cut sits on the right so it ends up on the left once the
  // letters flip into the mirrored ⅃AWA⅃.
  A: {
    d: "M18 710 274 0H497L705 577V710H553L513 593H257L217 710ZM309 441H462L386 216Z",
    minX: 18,
    maxX: 705,
  },
  W: {
    d: "M231 710 36 0H238L344 438L453 0H609L718 438L823 0H977V176L831 710H631L531 320L431 710Z",
    minX: 36,
    maxX: 977,
  },
} as const;

// Lay the letters out left to right, each shifted so its ink starts where the
// previous one ended plus the gap.
const LETTERS = (() => {
  let cursor = 0;
  return (["L", "A", "W", "A", "L"] as const).map((char) => {
    const glyph = GLYPHS[char];
    const x = cursor - glyph.minX;
    cursor += glyph.maxX - glyph.minX + LETTER_GAP;
    return { d: glyph.d, x };
  });
})();

const VIEWBOX_WIDTH =
  (["L", "A", "W", "A", "L"] as const).reduce(
    (sum, char) => sum + GLYPHS[char].maxX - GLYPHS[char].minX,
    0
  ) +
  LETTER_GAP * 4;

// Parent orchestrates the per-letter stagger: left-to-right when flipping
// backward (into view), right-to-left when reversing (out of view).
const container = {
  forward: { transition: { staggerChildren: 0.18, staggerDirection: -1 } },
  backward: { transition: { staggerChildren: 0.18, staggerDirection: 1 } },
};

const letterVariants = {
  forward: { scaleX: 1 },
  backward: { scaleX: -1 },
};

const SPOTLIGHT_SPRING = { stiffness: 150, damping: 25 };
// Where the spotlight rests when the cursor is away: below the letters, so
// they read as outlines.
const PARKED = { x: VIEWBOX_WIDTH / 2, y: CAP_HEIGHT * 2.2 };

/**
 * Footer logotype: "LAWAL" is a palindrome, so as it scrolls into view each
 * letter flips horizontally one after another, ending as the mirrored ⅃AWA⅃
 * brand form. It reverses when scrolled back out.
 *
 * At rest the letters are outlines. A radial fill follows the cursor, so the
 * part of each letter nearest the pointer fills in and the rest stays empty:
 * the mark's spotlight, applied to the fill instead of the stroke.
 */
export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion();

  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { amount: 0.4 });

  // Reduced motion: hold the forward-facing wordmark (no flipping).
  const animateState = shouldReduceMotion
    ? "forward"
    : isInView
      ? "backward"
      : "forward";

  const spotX = useSpring(PARKED.x, SPOTLIGHT_SPRING);
  const spotY = useSpring(PARKED.y, SPOTLIGHT_SPRING);

  // Track the pointer anywhere on the page while the wordmark is in view,
  // mapped into the SVG's own coordinates.
  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const scale = (VIEWBOX_WIDTH + 8) / rect.width;
      spotX.set((event.clientX - rect.left) * scale - 4);
      spotY.set((event.clientY - rect.top) * scale - 4);
    };
    const park = () => {
      spotX.set(PARKED.x);
      spotY.set(PARKED.y);
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("pointerleave", park);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", park);
      park();
    };
  }, [shouldReduceMotion, isInView, spotX, spotY]);

  return (
    <div className="screen-line-after relative after:z-1 after:bg-foreground/15">
      <div className="overflow-hidden">
        {/* A shallow cut: the footer's bottom edge trims the letters by 10%. */}
        <div className="flex w-full translate-y-[10%] items-center justify-center pt-4">
          <svg
            ref={svgRef}
            className="container h-auto w-full px-4"
            viewBox={`-4 -4 ${VIEWBOX_WIDTH + 8} ${CAP_HEIGHT + 8}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="LAWAL"
          >
            <motion.g
              variants={container}
              initial="forward"
              animate={animateState}
            >
              {LETTERS.map(({ d, x }, index) => {
                return (
                  <motion.g
                    key={index}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                    variants={letterVariants}
                    transition={{ duration: 1.1, ease: [0.42, 0, 0.58, 1] }}
                  >
                    <path
                      d={d}
                      transform={`translate(${x} 0)`}
                      fill="url(#footer-logotype-spotlight)"
                    />
                    <path
                      d={d}
                      transform={`translate(${x} 0)`}
                      className="stroke-foreground/25"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </motion.g>
                );
              })}
            </motion.g>

            <defs>
              <motion.radialGradient
                id="footer-logotype-spotlight"
                cx={spotX}
                cy={spotY}
                r={CAP_HEIGHT * 1.1}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="var(--foreground)" />
                <stop
                  offset="0.45"
                  stopColor="var(--foreground)"
                  stopOpacity="0.35"
                />
                <stop
                  offset="1"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
              </motion.radialGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[50%] max-w-full -translate-x-1/2 dark:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(228, 228, 231, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}

"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useRef } from "react";

// The wordmark is drawn in this user-space width; the gradient highlight is
// positioned in the same coordinates and tracks the cursor across it.
const VIEWBOX_WIDTH = 1410;
const VIEWBOX_HEIGHT = 300;
const DEFAULT_GRADIENT_X = VIEWBOX_WIDTH / 2;

const WORDMARK = "LAWAL";
const LETTERS = WORDMARK.split("");

const FONT_SIZE = 300;
// Approximate glyph advances (Pixelify Sans) for L, A, W, A, L, plus negative
// tracking, so the letters sit tight and centered rather than spread out.
const ADVANCES = [0.5, 0.6, 0.84, 0.6, 0.5];
const TRACKING = 0.01 * FONT_SIZE;
const LETTER_X = (() => {
  const widths = ADVANCES.map((a) => a * FONT_SIZE);
  const total =
    widths.reduce((sum, w) => sum + w, 0) + TRACKING * (widths.length - 1);
  let cursor = (VIEWBOX_WIDTH - total) / 2;
  return widths.map((w) => {
    const center = cursor + w / 2;
    cursor += w + TRACKING;
    return center;
  });
})();

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

/**
 * Oversized boxy "LAWAL" footer wordmark. "LAWAL" is a palindrome, so as it
 * scrolls into view each letter flips horizontally (scaleX) one after another —
 * ending mirrored, yet still reading "LAWAL". It reverses when scrolled back
 * out and replays on every re-entry. A gradient highlight follows the cursor,
 * over a faint always-visible wireframe outline.
 */
export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion();

  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { amount: 0.4 });

  // Reduced motion: hold the normal, forward-facing wordmark (no flipping).
  const animateState = shouldReduceMotion
    ? "forward"
    : isInView
      ? "backward"
      : "forward";

  const gradientX1Raw = useMotionValue(DEFAULT_GRADIENT_X);
  const gradientX1 = useSpring(gradientX1Raw, {
    stiffness: 200,
    damping: 30,
    mass: 0.5,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const normalizedX = (mouseX / rect.width) * VIEWBOX_WIDTH;
    gradientX1Raw.set(Math.max(0, Math.min(VIEWBOX_WIDTH, normalizedX)));
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    gradientX1Raw.set(DEFAULT_GRADIENT_X);
  };

  return (
    <div className="screen-line-before after:z-1 after:bg-foreground/15">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full translate-y-[20%] items-center justify-center">
          <svg
            ref={svgRef}
            className="container size-full"
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label={WORDMARK}
          >
            <motion.g
              variants={container}
              initial="forward"
              animate={animateState}
            >
              {LETTERS.map((char, index) => (
                <motion.text
                  key={index}
                  x={LETTER_X[index]}
                  y={252}
                  textAnchor="middle"
                  fontFamily="var(--font-pixel)"
                  fontSize={FONT_SIZE}
                  fontWeight={700}
                  fill="url(#footer-logotype-gradient)"
                  className="stroke-foreground/10"
                  strokeWidth={2}
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                  variants={letterVariants}
                  transition={{ duration: 1.1, ease: [0.42, 0, 0.58, 1] }}
                >
                  {char}
                </motion.text>
              ))}
            </motion.g>

            <defs>
              <motion.linearGradient
                id="footer-logotype-gradient"
                x1={gradientX1}
                y1="1"
                x2={DEFAULT_GRADIENT_X}
                y2={VIEWBOX_HEIGHT}
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
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

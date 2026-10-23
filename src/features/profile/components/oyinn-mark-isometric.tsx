"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import soundManager from "@/lib/sound-manager";
import { cn } from "@/lib/utils";

/**
 * True isometric 3D rendering of the "LO" monogram, at the same 30° angle as
 * chanhdai.com's mark. Each letter is one solid: its outline (the O with its
 * hole) is extruded and projected, so no seams cross a letter. Hatched top
 * faces, dashed construction lines along the letter axes, and a button-style
 * press that lowers the lids. Clickable easter-egg: plays a keyboard-press sound.
 *
 * A radial gradient follows the cursor across the viewport and is laid over
 * the outlines as a second stroke, so a spotlight traces the mark (ported from
 * the spotlight logo on chanhdai.com). Off for reduced motion, touch-only
 * devices, and while the mark is out of view.
 */

const PRESS_SOUND = "/audio/keyboard-press.mp3";

type Pt = [number, number]; // (u, v) on the ground plane
type Solid = { rings: Pt[][] }; // first ring is the outline, the rest are holes

// The LO mark in 512×256 space. The flat mark's bars are 64 wide; the 3D
// figure uses chunkier bars (T) so the blocks read at the scale of
// chanhdai.com's mark. Same layout, same bottom-left cutouts.
const T = 76;
const SOLIDS: Solid[] = [
  // O: closed top-right, with the bottom-left corner cut out.
  {
    rings: [
      [
        [256, 0],
        [512, 0],
        [512, 256],
        [256 + T, 256],
        [256 + T, 256 - T],
        [256, 256 - T],
      ],
      [
        [256 + T, T],
        [512 - T, T],
        [512 - T, 256 - T],
        [256 + T, 256 - T],
      ],
    ],
  },
  // L: the stem stops short of the foot, which is detached to its right.
  {
    rings: [
      [
        [0, 0],
        [T, 0],
        [T, 256 - T],
        [0, 256 - T],
      ],
    ],
  },
  {
    rings: [
      [
        [T, 256 - T],
        [192, 256 - T],
        [192, 256],
        [T, 256],
      ],
    ],
  },
];

const HEIGHT = 40; // extrusion depth at rest
const SPOTLIGHT_SPRING = { stiffness: 300, damping: 30, mass: 0.1 };
const PRESS = 12; // how far the lid sinks when pressed

// True isometric projection (30°), rising to the right: +u (reading
// direction) → up-right, +v (letter top→bottom) → down-right, +z → up.
const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);
const project = (u: number, v: number, z: number): [number, number] => [
  (u + v) * COS,
  (v - u) * SIN - z,
];

const toPoints = (pts: [number, number][]) =>
  pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

const toPath = (rings: [number, number][][]) =>
  rings.map((ring) => `M${toPoints(ring).replaceAll(" ", "L")}Z`).join(" ");

// Even-odd point-in-solid test over every ring.
function isInside([u, v]: Pt, solid: Solid) {
  let inside = false;
  for (const ring of solid.rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [ui, vi] = ring[i];
      const [uj, vj] = ring[j];
      if (vi > v !== vj > v && u < ((uj - ui) * (v - vi)) / (vj - vi) + ui) {
        inside = !inside;
      }
    }
  }
  return inside;
}

type Face =
  | { kind: "wall"; points: [number, number][]; outline: [number, number][] }
  | { kind: "lid"; rings: [number, number][][] };

const depthOf = ([u, v]: Pt) => u - v; // larger is farther from the viewer

function buildFaces(h: number): Face[] {
  // Paint back-to-front: farthest solid (largest u − v) first.
  const centroid = (solid: Solid): Pt => {
    const ring = solid.rings[0];
    const u = ring.reduce((sum, p) => sum + p[0], 0) / ring.length;
    const v = ring.reduce((sum, p) => sum + p[1], 0) / ring.length;
    return [u, v];
  };
  const solids = [...SOLIDS].sort(
    (a, b) => depthOf(centroid(b)) - depthOf(centroid(a))
  );

  const faces: Face[] = [];
  for (const solid of solids) {
    // A wall is visible when the outside of its edge faces the viewer: the
    // −u side (left) or the +v side (front). Holes get their inner walls too.
    const walls: { mid: Pt; face: Face }[] = [];
    for (const ring of solid.rings) {
      ring.forEach((a, i) => {
        const b = ring[(i + 1) % ring.length];
        const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const probe: Pt =
          a[0] === b[0] ? [mid[0] - 0.5, mid[1]] : [mid[0], mid[1] + 0.5];
        if (isInside(probe, solid)) return;

        const base0 = project(a[0], a[1], 0);
        const base1 = project(b[0], b[1], 0);
        const top1 = project(b[0], b[1], h);
        const top0 = project(a[0], a[1], h);
        walls.push({
          mid,
          face: {
            kind: "wall",
            points: [base0, base1, top1, top0],
            // Outline without the top edge, which belongs to the lid.
            outline: [top0, base0, base1, top1],
          },
        });
      });
    }

    walls
      .sort((a, b) => depthOf(b.mid) - depthOf(a.mid))
      .forEach((wall) => faces.push(wall.face));

    faces.push({
      kind: "lid",
      rings: solid.rings.map((ring) => ring.map(([u, v]) => project(u, v, h))),
    });
  }
  return faces;
}

export function OyinnMarkIsometric({
  className,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerCancel,
  ...props
}: React.ComponentProps<"button">) {
  const id = useId().replace(/:/g, "");
  const hatchId = `iso-hatch-${id}`;
  const spotlightId = `iso-spotlight-${id}`;

  // Smoothly tween the press depth (0 → PRESS) on press / release.
  const [depth, setDepth] = useState(0);
  const depthRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const step = () => {
      const target = targetRef.current;
      const next = depthRef.current + (target - depthRef.current) * 0.3;
      const done = Math.abs(target - next) < 0.4;
      depthRef.current = done ? target : next;
      setDepth(depthRef.current);
      rafRef.current = done ? null : requestAnimationFrame(step);
    };
    step();
  }, []);

  const setTarget = useCallback(
    (t: number) => {
      targetRef.current = t;
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [animate]
  );

  useEffect(() => {
    soundManager.preload(PRESS_SOUND);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // View box from the rest geometry so it never jumps as the block compresses.
  const restFaces = buildFaces(HEIGHT);
  const all = restFaces.flatMap((f) =>
    f.kind === "wall" ? f.points : f.rings.flat()
  );
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  const pad = 8;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const width = Math.max(...xs) - Math.min(...xs) + pad * 2;
  const height = Math.max(...ys) - Math.min(...ys) + pad * 2;

  const faces = buildFaces(HEIGHT - depth);

  // Spotlight: pointer position (0–1 of the viewport) mapped into view-box
  // coordinates, then sprung so the highlight trails the cursor slightly.
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(buttonRef, { margin: "80px" });
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const cx = useSpring(
    useTransform(mouseX, [0, 1], [minX, minX + width]),
    SPOTLIGHT_SPRING
  );
  const cy = useSpring(
    useTransform(mouseY, [0, 1], [minY, minY + height]),
    SPOTLIGHT_SPRING
  );

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, isInView, mouseX, mouseY]);

  // Dashed construction lines aligned to the letter geometry (ground plane),
  // extended past the figure: a base line (u-axis) under the LO, and a v-axis
  // line running along the L and along the O's cutout side.
  const x0 = minX - width;
  const x1 = minX + width * 2;
  const lineAt = ([px, py]: [number, number], slope: number) =>
    `M${x0.toFixed(1)} ${(py + slope * (x0 - px)).toFixed(1)} L${x1.toFixed(1)} ${(py + slope * (x1 - px)).toFixed(1)}`;
  const constructionLines = [
    lineAt(project(288, 256, 0), -SIN / COS), // base of the LO (u-axis)
    lineAt(project(0, 96, 0), SIN / COS), // along the L (v-axis)
    lineAt(project(256 + T, 256, 0), SIN / COS), // along the O's cutout side (v-axis)
  ];

  return (
    <button
      {...props}
      ref={buttonRef}
      type="button"
      aria-label="Lawal Oyinlola mark"
      onPointerDown={(e) => {
        onPointerDown?.(e);
        setTarget(PRESS);
      }}
      onPointerUp={(e) => {
        onPointerUp?.(e);
        soundManager.playKeyPress();
        setTarget(0);
      }}
      onPointerLeave={(e) => {
        onPointerLeave?.(e);
        setTarget(0);
      }}
      onPointerCancel={(e) => {
        onPointerCancel?.(e);
        setTarget(0);
      }}
      className={cn(
        "group/iso block w-full cursor-pointer touch-manipulation outline-none select-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
    >
      <svg
        viewBox={`${minX.toFixed(1)} ${minY.toFixed(1)} ${width.toFixed(1)} ${height.toFixed(1)}`}
        fill="none"
        aria-hidden
        className={cn(
          "h-auto w-full overflow-visible",
          "[--iso-stroke:color-mix(in_oklab,var(--foreground)_20%,var(--background))]",
          "[--iso-line:color-mix(in_oklab,var(--foreground)_12%,var(--background))]",
          "[--iso-pattern:color-mix(in_oklab,var(--foreground)_12%,var(--background))]"
        )}
      >
        <defs>
          <pattern
            id={hatchId}
            x="0"
            y="0"
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M-1 1l2 -2M0 9l9 -9M8 10l2 -2"
              stroke="var(--iso-pattern)"
              strokeWidth="1"
            />
          </pattern>

          <motion.radialGradient
            id={spotlightId}
            cx={cx}
            cy={cy}
            r={width * 0.36}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              className="dark:[stop-color:#fff]"
              stopColor="var(--color-zinc-700)"
            />
            <stop
              className="dark:[stop-color:var(--color-zinc-600)]"
              offset="1"
              stopColor="var(--color-zinc-400)"
              stopOpacity="0"
            />
          </motion.radialGradient>
        </defs>

        {/* Construction / guide lines (behind the mark). Static: the
            spotlight only follows the mark's own outlines. */}
        <g stroke="var(--iso-line)" strokeWidth="1" strokeDasharray="4 2">
          {constructionLines.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {faces.map((face, i) => {
          if (face.kind === "wall") {
            return (
              <g key={i}>
                <polygon
                  points={toPoints(face.points)}
                  fill="var(--background)"
                />
                <g
                  fill="none"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="butt"
                >
                  <polyline
                    points={toPoints(face.outline)}
                    stroke="var(--iso-stroke)"
                  />
                  <polyline
                    points={toPoints(face.outline)}
                    stroke={`url(#${spotlightId})`}
                  />
                </g>
              </g>
            );
          }

          const d = toPath(face.rings);
          return (
            <g key={i} fillRule="evenodd">
              <path
                d={d}
                fill="var(--background)"
                stroke="var(--iso-stroke)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d={d} fill={`url(#${hatchId})`} />
              <path
                d={d}
                fill="none"
                stroke={`url(#${spotlightId})`}
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </svg>
    </button>
  );
}

"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import soundManager from "@/lib/sound-manager";
import { cn } from "@/lib/utils";

/**
 * True isometric 3D rendering of the "LO" monogram. Each block of the flat mark
 * is extruded and projected with a 2:1 isometric projection that rises from
 * lower-left to upper-right (like chanhdai's mark): hatched top faces, dashed
 * construction lines along the letter axes, and a button-style press. Pressing
 * compresses each block (the lid descends, the base stays put), so nothing is
 * left behind at the edges. Clickable easter-egg — plays a keyboard-press sound.
 */

const PRESS_SOUND = "/audio/keyboard-press.mp3";

type Block = { u0: number; u1: number; v0: number; v1: number };

// The six rectangles that make up the flat LO mark (512×256 space), treated as
// footprints on the ground plane and extruded upward.
const BLOCKS: Block[] = [
  { u0: 0, u1: 64, v0: 0, v1: 192 }, // L — stem
  { u0: 64, u1: 192, v0: 192, v1: 256 }, // L — foot
  { u0: 256, u1: 512, v0: 0, v1: 64 }, // O — top bar
  { u0: 256, u1: 320, v0: 64, v1: 192 }, // O — left
  { u0: 448, u1: 512, v0: 64, v1: 192 }, // O — right
  { u0: 320, u1: 512, v0: 192, v1: 256 }, // O — bottom bar
];

const HEIGHT = 44; // extrusion depth at rest
const PRESS = 10; // how far the lid sinks when pressed

// 2:1 isometric projection rising to the right: +u (reading direction) →
// up-right, +v (letter top→bottom) → down-right, +z (extrusion) → up.
const project = (u: number, v: number, z: number): [number, number] => [
  u + v,
  (v - u) / 2 - z,
];

const toPoints = (pts: [number, number][]) =>
  pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

type Face =
  | { kind: "fill"; points: [number, number][] } // wall fill (no stroke)
  | { kind: "stroke"; points: [number, number][] } // wall outline minus its top
  | { kind: "lid"; points: [number, number][] }; // top face

function buildFaces(h: number): Face[] {
  // Paint back-to-front: farthest (largest u−v) first.
  const ordered = [...BLOCKS].sort(
    (a, b) => b.u0 + b.u1 - b.v0 - b.v1 - (a.u0 + a.u1 - a.v0 - a.v1)
  );

  const faces: Face[] = [];
  for (const b of ordered) {
    const leftBase0 = project(b.u0, b.v0, 0);
    const leftBase1 = project(b.u0, b.v1, 0);
    const leftTop1 = project(b.u0, b.v1, h);
    const leftTop0 = project(b.u0, b.v0, h);
    const frontBase0 = project(b.u0, b.v1, 0);
    const frontBase1 = project(b.u1, b.v1, 0);
    const frontTop1 = project(b.u1, b.v1, h);
    const frontTop0 = project(b.u0, b.v1, h);

    faces.push({
      kind: "fill",
      points: [leftBase0, leftBase1, leftTop1, leftTop0],
    });
    faces.push({
      kind: "fill",
      points: [frontBase0, frontBase1, frontTop1, frontTop0],
    });
    // Outline without the top edge (top0→base0→base1→top1).
    faces.push({
      kind: "stroke",
      points: [leftTop0, leftBase0, leftBase1, leftTop1],
    });
    faces.push({
      kind: "stroke",
      points: [frontTop0, frontBase0, frontBase1, frontTop1],
    });
    faces.push({
      kind: "lid",
      points: [
        project(b.u0, b.v0, h),
        project(b.u1, b.v0, h),
        project(b.u1, b.v1, h),
        project(b.u0, b.v1, h),
      ],
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
  const hatchId = `iso-hatch-${useId()}`.replace(/:/g, "");

  // Smoothly tween the press depth (0 → PRESS) on press / release.
  const [depth, setDepth] = useState(0);
  const depthRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const target = targetRef.current;
    const next = depthRef.current + (target - depthRef.current) * 0.3;
    const done = Math.abs(target - next) < 0.4;
    depthRef.current = done ? target : next;
    setDepth(depthRef.current);
    rafRef.current = done ? null : requestAnimationFrame(animate);
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
  const all = restFaces.flatMap((f) => f.points);
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  const pad = 40;
  const minX = Math.min(...xs) - pad;
  const minY = Math.min(...ys) - pad;
  const width = Math.max(...xs) - Math.min(...xs) + pad * 2;
  const height = Math.max(...ys) - Math.min(...ys) + pad * 2;

  const faces = buildFaces(HEIGHT - depth);

  // Dashed construction lines aligned to the letter geometry (ground plane),
  // extended past the figure: a base line (u-axis) under the LO, and a v-axis
  // line running along the L and along the O's cutout side.
  const x0 = minX - width;
  const x1 = minX + width * 2;
  const lineAt = ([px, py]: [number, number], slope: number) =>
    `M${x0.toFixed(1)} ${(py + slope * (x0 - px)).toFixed(1)} L${x1.toFixed(1)} ${(py + slope * (x1 - px)).toFixed(1)}`;
  const constructionLines = [
    lineAt(project(288, 256, 0), -0.5), // base of the LO (u-axis)
    lineAt(project(0, 96, 0), 0.5), // along the L (v-axis)
    lineAt(project(320, 256, 0), 0.5), // along the O's cutout side (v-axis)
  ];

  return (
    <button
      {...props}
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
        </defs>

        {/* Construction / guide lines (behind the mark) */}
        <g stroke="var(--iso-line)" strokeWidth="1" strokeDasharray="6 4">
          {constructionLines.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>

        {faces.map((face, i) => {
          if (face.kind === "fill") {
            return (
              <polygon
                key={i}
                points={toPoints(face.points)}
                fill="var(--background)"
              />
            );
          }

          if (face.kind === "stroke") {
            return (
              <polyline
                key={i}
                points={toPoints(face.points)}
                fill="none"
                stroke="var(--iso-stroke)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="butt"
              />
            );
          }

          return (
            <g key={i}>
              <polygon
                points={toPoints(face.points)}
                fill="var(--background)"
                stroke="var(--iso-stroke)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <polygon
                points={toPoints(face.points)}
                fill={`url(#${hatchId})`}
              />
            </g>
          );
        })}
      </svg>
    </button>
  );
}

/**
 * Decorative nature shapes. All are aria-hidden and pointer-events: none (see `.decor` in globals.css),
 * so they never get in the way of reading or tapping.
 */
import { cn } from "./cn";

type DecorProps = { className?: string; style?: React.CSSProperties };

export function Leaf({ className, style, tone = "lime" }: DecorProps & { tone?: "lime" | "forest" | "mint" }) {
  const fill = tone === "forest" ? "#08783E" : tone === "mint" ? "#CFE3A1" : "#9DBB2D";
  return (
    <svg viewBox="0 0 48 48" className={cn("decor", className)} style={style} aria-hidden="true" focusable="false">
      <path d="M8 40C8 20 20 8 42 6c0 22-12 34-34 34Z" fill={fill} />
      <path d="M10 38C18 28 26 20 38 10" stroke="#FFFEF7" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".75" />
    </svg>
  );
}

export function Sun({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 64 64" className={cn("decor", className)} style={style} aria-hidden="true" focusable="false">
      <g stroke="#F5D65B" strokeWidth="4" strokeLinecap="round">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={32 + Math.cos(a) * 21}
              y1={32 + Math.sin(a) * 21}
              x2={32 + Math.cos(a) * 28}
              y2={32 + Math.sin(a) * 28}
            />
          );
        })}
      </g>
      <circle cx="32" cy="32" r="15" fill="#F5D65B" />
    </svg>
  );
}

export function Cloud({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 96 48" className={cn("decor", className)} style={style} aria-hidden="true" focusable="false">
      <path
        d="M22 44h52a16 16 0 0 0 1-32 22 22 0 0 0-41-2 15 15 0 0 0-12 34Z"
        fill="#FFFFFF"
        stroke="#E3EDC8"
        strokeWidth="2"
      />
    </svg>
  );
}

/** Soft organic blob used behind photos and numbers. */
export function Blob({ className, style, fill = "#EDF5D8", variant = 0 }: DecorProps & { fill?: string; variant?: 0 | 1 | 2 }) {
  const paths = [
    "M57 6c19 4 37 19 39 39 2 21-12 41-32 48S20 96 9 79-2 38 12 22 38 2 57 6Z",
    "M50 3c22-1 45 14 47 37s-15 46-38 52S8 86 4 63 12 22 27 11 39 3 50 3Z",
    "M62 9c17 8 33 26 30 46S66 92 45 94 5 80 4 58 18 15 36 7s9-6 26 2Z",
  ];
  return (
    <svg viewBox="0 0 100 100" className={cn("decor", className)} style={style} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path d={paths[variant]} fill={fill} />
    </svg>
  );
}

/** Wavy divider between sections. */
export function Wave({ className, fill = "#EDF5D8", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={cn("decor block h-6 w-full md:h-10", flip && "rotate-180", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 48V22c120-16 240-24 360-14s240 30 360 24 240-30 360-30 240 14 360 22v24Z" fill={fill} />
    </svg>
  );
}

/* ——— Small food illustrations (decor only, not a menu) ——— */

export function Apple({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("decor", className)} style={style} aria-hidden="true" focusable="false">
      <path d="M24 14c-4-3-14-3-16 7-2 9 4 21 10 22 3 1 4-1 6-1s3 2 6 1c6-1 12-13 10-22-2-10-12-10-16-7Z" fill="#E86A4A" />
      <path d="M24 14c0-4 1-7 4-9" stroke="#6B4A2B" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M26 10c3-4 8-4 10-2-3 3-7 4-10 2Z" fill="#9DBB2D" />
      <ellipse cx="15" cy="22" rx="2.5" ry="4" fill="#FFFFFF" opacity=".45" />
    </svg>
  );
}

export function Pear({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("decor", className)} style={style} aria-hidden="true" focusable="false">
      <path d="M24 10c-4 0-5 5-6 9-1 5-8 8-8 15 0 6 6 10 14 10s14-4 14-10c0-7-7-10-8-15-1-4-2-9-6-9Z" fill="#C9D65A" />
      <path d="M24 10c0-3 1-5 3-6" stroke="#6B4A2B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M26 7c3-2 7-1 8 1-3 2-6 2-8-1Z" fill="#08783E" />
    </svg>
  );
}

export function Carrot({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 48 48" className={cn("decor", className)} style={style} aria-hidden="true" focusable="false">
      <path d="M30 14 8 40c-1 1 0 2 1 1l26-21c3-3 1-8-5-6Z" fill="#F29B38" />
      <path d="m16 30 3 2m2-8 3 2m2-8 3 2" stroke="#D9762A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M32 14c0-5 2-9 5-10-1 4 0 7 2 9 3-2 6-2 8-1-3 3-6 5-11 5" fill="#9DBB2D" />
    </svg>
  );
}

export function PlateSpoon({ className, style }: DecorProps) {
  return (
    <svg viewBox="0 0 120 96" className={cn("decor", className)} style={style} aria-hidden="true" focusable="false">
      <ellipse cx="54" cy="52" rx="42" ry="36" fill="#FFFFFF" stroke="#D7E7B4" strokeWidth="3" />
      <ellipse cx="54" cy="52" rx="28" ry="24" fill="#EDF5D8" />
      <path d="M44 50c0-6 5-10 10-10s10 4 10 10" stroke="#9DBB2D" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="54" cy="56" r="4" fill="#F5D65B" />
      <ellipse cx="108" cy="22" rx="6" ry="9" fill="#FFFFFF" stroke="#08783E" strokeWidth="2.6" />
      <path d="M108 31v52" stroke="#08783E" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/** Decorative stand-in shown while a real photo is missing — clearly an illustration, not a photo. */
export function PhotoPlaceholderArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 240" className={cn("decor h-full w-full", className)} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="320" height="240" fill="#EDF5D8" />
      <circle cx="252" cy="62" r="26" fill="#F5D65B" />
      <path d="M40 70h46a12 12 0 0 0 0-24 18 18 0 0 0-34-2 12 12 0 0 0-12 26Z" fill="#FFFFFF" />
      <path d="M0 180c60-36 120-40 180-18s100 10 140-12v90H0Z" fill="#CFE3A1" />
      <path d="M0 206c70-24 150-26 220-8 40 10 70 6 100-4v46H0Z" fill="#9DBB2D" />
      <rect x="146" y="120" width="12" height="54" rx="4" fill="#8A6A3E" />
      <circle cx="152" cy="104" r="34" fill="#08783E" />
      <circle cx="128" cy="118" r="20" fill="#2F9257" />
      <circle cx="176" cy="116" r="22" fill="#2F9257" />
    </svg>
  );
}

import type { CSSProperties, ReactNode } from "react";

/** A CSS colour token name from globals.css, e.g. "leaf-200" or "leaf-800". */
export type Tone = string;

/** Sets the fill colour of a pixel-* box. */
export const toneVar = (color: Tone) =>
  ({ "--tone": `var(--color-${color})` }) as CSSProperties;

export function Tile({
  tone = "leaf-400",
  index,
  label,
  className = "",
  compact = false,
  children,
}: {
  tone?: Tone;
  index: number;
  label: string;
  className?: string;
  /** Tighter padding for one-row tiles. */
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      aria-label={label}
      className={`tile pixel relative overflow-hidden ${compact ? "px-5 py-4 short:py-3" : "p-5 lg:p-6 short:py-4"} ${className}`}
      style={{ ...toneVar(tone), "--i": index } as CSSProperties}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-pixel text-[11px] uppercase tracking-wider text-ink/65 ${className}`}>
      {children}
    </p>
  );
}

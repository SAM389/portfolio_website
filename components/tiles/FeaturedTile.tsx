"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Tile } from "../Tile";

export type FeaturedTab = {
  id: string;
  label: string;
  panel: ReactNode;
};

/** The big home-page tile: one tab per featured project, the first one open. */
export function FeaturedTile({ className, tabs }: { className?: string; tabs: FeaturedTab[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Tile index={1} label="Featured projects" className={className}>
      <div className="flex h-full flex-col gap-4 short:gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div role="tablist" aria-label="Featured projects" className="flex gap-2" onKeyDown={onKeyDown}>
            {tabs.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`px-3 py-1.5 font-pixel text-[10px] uppercase ${
                    selected ? "pixel-well" : "pixel-sm pixel-press text-ink/70"
                  }`}
                >
                  <span className="font-term text-sm leading-none text-ink/50">{String(i + 1).padStart(2, "0")}</span>{" "}
                  {t.label}
                </button>
              );
            })}
          </div>
          <span className="font-pixel text-[10px] tracking-wider text-ink/60 uppercase">★ featured · live</span>
        </div>

        {tabs.map((t, i) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`${baseId}-panel-${t.id}`}
            aria-labelledby={`${baseId}-tab-${t.id}`}
            hidden={i !== active}
            className="min-h-0 flex-1"
          >
            {t.panel}
          </div>
        ))}
      </div>
    </Tile>
  );
}

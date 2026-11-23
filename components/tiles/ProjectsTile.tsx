"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { projects } from "@/lib/data";
import { ArrowRightIcon, ArrowUpRightIcon } from "../icons";
import { Eyebrow, Tile, toneVar } from "../Tile";

const FLICK_MS = 320;

// The spotlight project already has a tab in the featured tile.
const stack = projects.filter((p) => !p.spotlight);

/** A stack of project cards: the top one flicks away and slides to the back. */
export function ProjectsTile({ className }: { className?: string }) {
  const [top, setTop] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const count = stack.length;

  function next() {
    if (leaving || count < 2) return;
    setLeaving(true);
    setTimeout(() => {
      setTop((t) => (t + 1) % count);
      setLeaving(false);
    }, FLICK_MS);
  }

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(() => {
      setLeaving(true);
      setTimeout(() => {
        setTop((t) => (t + 1) % count);
        setLeaving(false);
      }, FLICK_MS);
    }, 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  return (
    <Tile index={4} label="More projects" className={className}>
      <div
        className="flex h-full min-h-[230px] flex-col lg:min-h-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="flex items-center justify-between gap-2">
          <Eyebrow>more builds</Eyebrow>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-ink/60">
              {top + 1}/{count}
            </span>
            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className="pixel-sm pixel-press grid size-8 place-items-center"
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        <ul className="relative mt-5 flex-1">
          {stack.map((p, i) => {
            const offset = (i - top + count) % count;
            const isTop = offset === 0;
            const flicking = isTop && leaving;
            const style: CSSProperties = {
              ...toneVar(isTop ? "leaf-400" : "leaf-200"),
              zIndex: count - offset,
              transform: flicking
                ? "translateX(115%) rotate(14deg)"
                : `translateY(${-9 * offset}px) scale(${1 - 0.06 * offset}) rotate(${offset ? (offset % 2 ? 2 : -2) : 0}deg)`,
              transition: `transform ${FLICK_MS}ms steps(4)`,
            };
            return (
              <li
                key={p.name}
                aria-hidden={!isTop}
                className="pixel absolute inset-0 flex flex-col p-3 lg:px-4"
                style={style}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-lg leading-tight font-bold @xs:text-xl">{p.name}</p>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={isTop ? 0 : -1}
                      aria-label={`Open ${p.name}`}
                      // -mb-2 keeps the title row its usual height, so short cards still fit.
                      className="pixel-sm pixel-press -mb-2 grid size-8 shrink-0 place-items-center"
                    >
                      <ArrowUpRightIcon />
                    </a>
                  )}
                </div>
                <p
                  className={`mt-1 line-clamp-2 shrink-0 text-[13px] leading-snug font-medium text-ink/80 ${p.href ? "pr-9" : ""}`}
                >
                  {p.blurb}
                </p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-1.5">
                  {p.tags.map((t) => (
                    <li key={t} className="bg-white/45 px-2 py-0.5 font-pixel text-[10px] uppercase">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </Tile>
  );
}

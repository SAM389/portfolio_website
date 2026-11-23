"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { afterBoot } from "@/lib/boot";

/**
 * The pixel bat that lives in the top-left corner, and a tiny catch-the-bat game.
 * Click it and it flees to a random tile. Catch it again before it gets bored and flies home.
 * Five catches turns it golden. The score is kept in localStorage.
 */

const GOAL = 5;
/** How long the bat waits on a tile before giving up and flying home. */
const ESCAPE_MS = 5000;
const TAUNTS = ["over here!", "too slow!", "up here!", "can't catch me!", "nyeh!"];

// ── Score store (localStorage, shared via useSyncExternalStore) ──
type Score = { caught: number; won: boolean };
const STORAGE_KEY = "bat-game";
const SERVER_SCORE: Score = { caught: 0, won: false };
let score: Score | null = null;
const listeners = new Set<() => void>();

function getScore(): Score {
  if (!score) {
    score = SERVER_SCORE;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved) score = { caught: Number(saved.caught) || 0, won: Boolean(saved.won) };
    } catch {}
  }
  return score;
}
function setScore(next: Score) {
  score = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

type Point = { x: number; y: number };
type Phase = "home" | "flying" | "perched";

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const transform = (p: Point, scale = 1, rotate = 0) =>
  `translate(${p.x}px, ${p.y}px) scale(${scale}) rotate(${rotate}deg)`;

export function PixelBat() {
  const { caught, won } = useSyncExternalStore(subscribe, getScore, () => SERVER_SCORE);
  const [phase, setPhase] = useState<Phase>("home");
  const [say, setSay] = useState<string | null>(null);
  const [bubbleLeft, setBubbleLeft] = useState(false);
  const [toast, setToast] = useState(false);

  const anchorRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const offset = useRef<Point>({ x: 0, y: 0 });
  const flight = useRef<Animation | null>(null);
  const escapeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // The idle bubble waits until the boot screen is gone and the tiles have popped in.
  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;
    const cancel = afterBoot(() => {
      id = setTimeout(() => setSay((s) => s ?? "catch me!"), 1400);
    });
    return () => {
      cancel();
      clearTimeout(id);
    };
  }, []);

  // Perches are measured from the layout, so a resize sends the bat straight home.
  useEffect(() => {
    function onResize() {
      if (offset.current.x === 0 && offset.current.y === 0) return;
      flight.current?.cancel();
      clearTimeout(escapeTimer.current);
      offset.current = { x: 0, y: 0 };
      if (flyerRef.current) flyerRef.current.style.transform = "";
      setPhase("home");
      setBubbleLeft(false);
      setSay("catch me!");
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(escapeTimer.current);
      flight.current?.cancel();
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(false), 6000);
    return () => clearTimeout(id);
  }, [toast]);

  /** Fly along an arc from the current spot to `to` (an offset from the home perch). */
  function flyTo(to: Point, onLand: () => void) {
    const el = flyerRef.current;
    const anchor = anchorRef.current;
    if (!el || !anchor) return;

    const from = offset.current;
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    // Swoop upward mid-flight, but never above the top of the viewport.
    const topRoom = anchor.getBoundingClientRect().top + Math.min(from.y, to.y);
    const lift = clamp(60 + dist * 0.3, 0, Math.max(0, topRoom - 8));
    const tilt = dx >= 0 ? 1 : -1;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    flight.current?.cancel();
    const anim = el.animate(
      [
        { transform: transform(from) },
        {
          transform: transform({ x: from.x + dx * 0.3, y: from.y + dy * 0.3 - lift }, 1.2, 8 * tilt),
          offset: 0.35,
        },
        {
          transform: transform({ x: from.x + dx * 0.75, y: from.y + dy * 0.75 - lift * 0.6 }, 1.15, -6 * tilt),
          offset: 0.7,
        },
        { transform: transform(to) },
      ],
      {
        duration: reduce ? 0 : 900 + Math.min(900, dist * 0.9),
        easing: "cubic-bezier(0.45, 0, 0.55, 1)",
        fill: "forwards",
      },
    );
    flight.current = anim;
    offset.current = to;
    setPhase("flying");
    anim.onfinish = () => {
      el.style.transform = to.x === 0 && to.y === 0 ? "" : transform(to);
      anim.cancel();
      onLand();
    };
  }

  /** A random spot on the top edge of a tile that's on screen, away from where the bat is now. */
  function pickPerch(): (Point & { flip: boolean }) | null {
    const anchor = anchorRef.current?.getBoundingClientRect();
    const bat = buttonRef.current?.getBoundingClientRect();
    if (!anchor || !bat) return null;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const tiles = Array.from(document.querySelectorAll<HTMLElement>(".tile"))
      .map((t) => t.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.bottom > 120 && r.top < vh - 120);
    if (tiles.length === 0) return null;

    let best: Point & { flip: boolean } = { x: 0, y: 0, flip: false };
    for (let tries = 0; tries < 8; tries++) {
      const r = tiles[Math.floor(Math.random() * tiles.length)];
      const x = clamp(r.left + r.width * (0.15 + Math.random() * 0.65) - bat.width / 2, 8, vw - bat.width - 8);
      const y = clamp(r.top - bat.height * 0.55, 8, vh - bat.height - 8);
      best = { x: x - anchor.left, y: y - anchor.top, flip: x > vw - 280 };
      const moved = Math.hypot(best.x - offset.current.x, best.y - offset.current.y);
      if (moved > 180) break;
    }
    return best;
  }

  function goHome(message: string, onArrival = "catch me!") {
    clearTimeout(escapeTimer.current);
    setSay(message);
    setBubbleLeft(false);
    flyTo({ x: 0, y: 0 }, () => {
      setPhase("home");
      setSay(onArrival);
    });
  }

  function onCatch() {
    if (phase === "flying") return;
    clearTimeout(escapeTimer.current);

    const next = caught + 1;
    const justWon = !won && next >= GOAL;
    setScore({ caught: next, won: won || justWon });

    if (justWon) {
      setToast(true);
      goHome("ok ok, you win!", "you win! ★");
      return;
    }

    setSay(won ? `${next} caught!` : `caught! ${next}/${GOAL}`);
    const perch = pickPerch();
    if (!perch) return;
    setBubbleLeft(perch.flip);
    flyTo(perch, () => {
      setPhase("perched");
      setSay(TAUNTS[Math.floor(Math.random() * TAUNTS.length)]);
      escapeTimer.current = setTimeout(() => goHome("bored now..."), ESCAPE_MS);
    });
  }

  const label = won
    ? `Golden pixel bat, caught ${caught} times. Click to catch it again.`
    : `Pixel bat, caught ${caught} of ${GOAL} times. Click to catch it.`;

  return (
    <>
      <div ref={anchorRef} className="pointer-events-none absolute left-6 top-5 z-40 lg:left-8 lg:top-7">
        <div ref={flyerRef}>
          <div className={`bat-bob ${phase === "flying" ? "bat-fast" : ""}`}>
            <button
              ref={buttonRef}
              type="button"
              onClick={onCatch}
              aria-label={label}
              className={`bat-outline pointer-events-auto block cursor-pointer p-1 focus-visible:outline-3 focus-visible:outline-cream ${
                won ? "bat-golden" : ""
              }`}
            >
              <span className="bat block" />
            </button>
          </div>
          {say && (
            <span
              key={say}
              className={`bubble-in pixel-sm absolute top-1 whitespace-nowrap px-2 py-1.5 font-pixel text-[10px] text-ink sm:top-4 sm:px-3 ${
                bubbleLeft ? "right-[72px] sm:right-[110px]" : "left-[72px] sm:left-[110px]"
              }`}
              style={won ? ({ "--tone": "var(--color-amber-300)" } as CSSProperties) : undefined}
            >
              {/* Two stepping-stone pixels lead from the bubble back to the bat. */}
              <span
                aria-hidden
                className={`absolute top-1/2 size-1.5 bg-[var(--tone)] shadow-[0_0_0_2px_var(--color-ink)] ${
                  bubbleLeft ? "-right-[11px]" : "-left-[11px]"
                }`}
              />
              <span
                aria-hidden
                className={`absolute top-[calc(50%+6px)] size-1 bg-[var(--tone)] shadow-[0_0_0_2px_var(--color-ink)] ${
                  bubbleLeft ? "-right-[19px]" : "-left-[19px]"
                }`}
              />
              {say}
            </span>
          )}
        </div>
      </div>

      <div role="status" className="pointer-events-none fixed inset-x-4 bottom-6 z-50 flex justify-center">
        {toast && (
          <button
            type="button"
            onClick={() => setToast(false)}
            className="bubble-in pixel pointer-events-auto flex max-w-sm cursor-pointer items-center gap-4 px-5 py-4 text-left"
            style={{ "--tone": "var(--color-amber-300)", "--drop": "var(--color-amber-600)" } as CSSProperties}
          >
            <span aria-hidden className="font-term text-5xl leading-none">
              ★
            </span>
            <span>
              <span className="block font-pixel text-[10px] tracking-wider text-ink/70 uppercase">
                achievement unlocked
              </span>
              <span className="block font-display text-xl font-bold">Bat wrangler</span>
              <span className="block text-sm font-medium text-ink/80">
                You caught the bat {GOAL} times. It&apos;s golden now.
              </span>
            </span>
          </button>
        )}
      </div>
    </>
  );
}

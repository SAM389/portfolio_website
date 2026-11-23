"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { finishBoot, isBooting, startBoot } from "@/lib/boot";

/*
  A short fake-BIOS boot before the bento pops in. Shown on every page load,
  never with prefers-reduced-motion. Any key or tap skips it.
  The server renders it hidden; the inline script in app/layout.tsx sets data-boot on <html>
  before the first paint, which is what makes it visible (see globals.css).
*/

const TICK_MS = 80;
const LINES = [
  { at: 0, text: "SAFWAN-OS BIOS v1.0  (C) 2026" },
  { at: 3, text: "MEMORY CHECK ........ 640K OK" },
  { at: 6, text: "LOADING PIXELS ...... OK" },
  { at: 9, text: "WAKING THE BAT ...... OK" },
  { at: 12, text: "> RUN PORTFOLIO.EXE" },
];
const BAR_START = 13;
const BAR_END = 23;
const END = 26;
const CELLS = 16;

export function BootScreen() {
  const [tick, setTick] = useState(0);
  const [skipped, setSkipped] = useState(false);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  const off = skipped || tick >= END;

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    finishBoot();
    setDone(true);
  }, []);

  // Layout effect: start before the browser paints the hydrated page.
  useLayoutEffect(() => {
    if (!isBooting()) return;
    startBoot();

    let t = 0;
    const id = setInterval(() => {
      t += 1;
      setTick(t);
      if (t >= END) clearInterval(id);
    }, TICK_MS);

    const skip = () => setSkipped(true);
    window.addEventListener("keydown", skip);
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  useEffect(() => {
    if (!off) return;
    // The tiles start popping in while the screen collapses (see globals.css).
    if (document.documentElement.hasAttribute("data-boot")) {
      document.documentElement.setAttribute("data-boot", "off");
    }
    // Backup in case animationend never fires (e.g. the tab is in the background).
    const id = setTimeout(finish, 900);
    return () => clearTimeout(id);
  }, [off, finish]);

  if (done) return null;

  const progress = Math.max(0, Math.min(1, (tick - BAR_START) / (BAR_END - BAR_START)));
  const filled = Math.round(progress * CELLS);
  const visible = LINES.filter((l) => tick >= l.at);

  return (
    <div
      aria-hidden
      className={`boot fixed inset-0 z-[100] items-center justify-center bg-black p-6 ${off ? "boot-off" : ""}`}
      onPointerDown={() => setSkipped(true)}
      onAnimationEnd={(e) => {
        if (e.animationName === "crt-off") finish();
      }}
    >
      <div className="boot-content w-full max-w-[560px] font-term text-2xl leading-snug text-leaf-200 sm:text-3xl">
        {visible.map((line) => (
          <p key={line.text} className={line.at === 0 ? "mb-3 text-leaf-50" : undefined}>
            {line.text}
          </p>
        ))}

        {tick >= BAR_START && (
          <div className="mt-4 flex items-center gap-4">
            <div className="flex flex-1 gap-1 p-1 shadow-[0_0_0_3px_var(--color-leaf-200)]">
              {Array.from({ length: CELLS }, (_, i) => (
                <span key={i} className={`h-4 flex-1 ${i < filled ? "bg-leaf-400" : "bg-leaf-800/50"}`} />
              ))}
            </div>
            <span className="w-14 text-right">{Math.round(progress * 100)}%</span>
          </div>
        )}

        {tick >= BAR_END && <p className="mt-4 text-amber-300">READY.</p>}

        <span className="mt-2 inline-block h-6 w-3 animate-[blink_0.8s_steps(1)_infinite] bg-leaf-200" />

        <p className="mt-10 animate-[blink_1.4s_steps(1)_infinite] font-pixel text-[10px] tracking-wider text-leaf-200/60 uppercase">
          press any key to skip
        </p>
      </div>
    </div>
  );
}

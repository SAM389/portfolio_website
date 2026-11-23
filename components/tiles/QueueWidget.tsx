"use client";

import { useEffect, useState } from "react";
import { toneVar } from "../Tile";

const TOKEN = 24;
const FIRST = 19;
// 0..5 walks the queue from 19 to 24, then one extra beat to celebrate.
const STEPS = TOKEN - FIRST + 2;

/** A tiny, looping re-creation of swastho's live token queue. */
export function QueueWidget() {
  const [step, setStep] = useState(2);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS), 1700);
    return () => clearInterval(id);
  }, []);

  const serving = Math.min(FIRST + step, TOKEN);
  const ahead = TOKEN - serving;
  const queue = Array.from({ length: TOKEN - FIRST + 1 }, (_, i) => FIRST + i);

  return (
    <div
      role="img"
      aria-label={`Illustration of swastho's live queue: the clinic is serving token ${serving} and yours is ${TOKEN}.`}
      className="pixel-well @container flex flex-1 flex-col justify-between gap-3 p-4"
    >
      <div className="flex items-center justify-between">
        <span className="font-pixel text-[10px] uppercase tracking-wider text-ink/60">Now serving</span>
        <span className="inline-flex items-center gap-1.5 bg-amber-300 px-2 py-0.5 font-pixel text-[10px] uppercase">
          <span className="size-2 animate-[blink_1s_steps(1)_infinite] bg-ink" />
          Live
        </span>
      </div>

      <div className="flex items-end justify-between gap-3">
        <span
          key={serving}
          className="inline-block animate-[bump_0.4s_steps(3)] font-term text-[clamp(3.5rem,42cqi,8rem)] leading-[0.8]"
        >
          {serving}
        </span>
        <div className="text-right">
          <p className="font-pixel text-[10px] uppercase tracking-wider text-ink/60">Your token</p>
          <p className="pixel-sm mt-1.5 inline-block px-3 font-term text-3xl leading-tight" style={toneVar("leaf-200")}>
            {TOKEN}
          </p>
        </div>
      </div>

      {/* Segmented progress bar: one block per token, each split into pixel cells. */}
      <div className="flex gap-1" aria-hidden>
        {queue.map((t) => (
          <span
            key={t}
            className={`h-3 flex-1 bg-[length:6px_100%] ${
              t <= serving
                ? t === TOKEN
                  ? "bg-leaf-800"
                  : "bg-leaf-600 bg-[linear-gradient(90deg,transparent_4px,rgb(0_0_0/0.18)_4px)]"
                : "bg-ink/10"
            }`}
          />
        ))}
      </div>

      <p className="text-sm font-bold">
        {ahead > 0 ? `${ahead} ahead of you — stay home a bit longer` : "It's your turn! Head in 🩺"}
      </p>
    </div>
  );
}

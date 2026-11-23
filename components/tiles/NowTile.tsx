"use client";

import { useSyncExternalStore } from "react";
import { profile } from "@/lib/data";
import { MoonIcon } from "../icons";
import { Tile } from "../Tile";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: profile.timeZone,
});

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

// Time only exists in the browser, so the server renders a placeholder.
const getTime = () => formatter.format(Date.now());
const getServerTime = () => "--:--";

export function NowTile({ className }: { className?: string }) {
  const time = useSyncExternalStore(subscribe, getTime, getServerTime);
  const [clock, period] = time.split(" ");
  const [hh, mm] = clock.split(":");

  return (
    <Tile index={5} label="Local time and current work" className={className} compact>
      <div className="flex h-full items-center gap-4">
        <MoonIcon width={48} height={48} className="bat-bob shrink-0" />
        <div className="min-w-0">
          <p className="font-pixel text-[10px] tracking-wider text-ink/60 uppercase">
            my time · {profile.location}
          </p>
          <p className="font-term text-4xl leading-[0.9]">
            <time>
              {hh}
              <span className="animate-[blink_1s_steps(1)_infinite]">:</span>
              {mm}
            </time>
            {period && <span className="ml-1 text-2xl text-ink/65">{period}</span>}
          </p>
          <p className="truncate text-xs font-medium text-ink/75">Now: {profile.now}</p>
        </div>
      </div>
    </Tile>
  );
}

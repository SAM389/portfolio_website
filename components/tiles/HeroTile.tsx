import Image from "next/image";
import type { CSSProperties } from "react";
import { profile, socials } from "@/lib/data";
import pfp from "@/public/pfp.jpg";
import { PinIcon, socialIcons } from "../icons";
import { Tile, toneVar } from "../Tile";

export function HeroTile({ className }: { className?: string }) {
  return (
    <Tile index={0} label="Introduction" className={className}>
      <div className="flex h-full min-h-[300px] flex-col lg:min-h-0">
        {/* The pixel bat perches in this tile's top-left corner, so this row only holds the badge. */}
        <div className="flex min-h-20 items-start justify-end gap-3 lg:min-h-16">
          {profile.openToWork && (
            <span
              className="pixel-sm inline-flex shrink-0 items-center gap-2 px-3 py-1.5 font-pixel text-[10px] uppercase"
              style={toneVar("amber-300")}
            >
              <span className="size-2 animate-[blink_1.2s_steps(1)_infinite] bg-ink" />
              Open to work
              <span className="sr-only">: {profile.availability}</span>
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h1 className="font-display text-[clamp(2.25rem,9cqi,4rem)] leading-[0.95] font-bold tracking-tight">
              {profile.name}
            </h1>
            <p className="mt-2 font-display text-base font-medium text-ink-soft sm:text-lg short:mt-1">{profile.role}</p>
            <p className="inline-flex items-center gap-1.5 font-display text-sm font-medium text-ink-soft/90 sm:text-base">
              <PinIcon />
              {profile.location}
            </p>
          </div>
          {/* p-1 leaves the 4px pixel bevel visible around the photo. */}
          <div
            className="pixel bat-bob size-[clamp(4.5rem,18cqi,6.5rem)] shrink-0 p-1"
            style={{ ...toneVar("leaf-200"), "--drop": "var(--color-ink)" } as CSSProperties}
          >
            <Image
              src={pfp}
              alt={`Photo of ${profile.name}`}
              placeholder="blur"
              sizes="104px"
              preload
              className="size-full object-cover object-[50%_30%]"
            />
          </div>
        </div>

        <p className="mt-3 max-w-[48ch] text-[15px] leading-snug font-medium text-ink/80 short:mt-2 short:text-sm">
          {profile.tagline}
        </p>

        <ul className="mt-4 flex flex-wrap gap-3 short:mt-2.5">
          {socials.map((s) => {
            const Icon = socialIcons[s.icon];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${s.label} (${s.handle})`}
                  className="pixel-sm pixel-press inline-flex items-center gap-2 px-3 py-2 text-sm font-bold sm:px-4 short:py-1.5"
                >
                  <Icon />
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </Tile>
  );
}

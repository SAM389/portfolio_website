"use client";

import { useState } from "react";
import { profile } from "@/lib/data";
import { CheckIcon, CopyIcon, MailIcon } from "../icons";
import { Tile, toneVar } from "../Tile";

export function ContactTile({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <Tile index={6} label="Contact" className={className} compact>
      <div className="flex h-full flex-wrap items-center justify-between gap-x-3 gap-y-3">
        <div className="min-w-0">
          <p className="font-display text-2xl leading-tight font-bold">Let&apos;s talk.</p>
          <p className="font-pixel text-[10px] tracking-wide text-ink/55 uppercase">
            bat by @meowish.dev
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={copyEmail}
            className="pixel-sm pixel-press inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold"
            style={toneVar("amber-300")}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span aria-live="polite">{copied ? "Copied!" : "Copy email"}</span>
          </button>
          <a
            href={`mailto:${profile.email}`}
            aria-label={`Email ${profile.email}`}
            className="pixel-sm pixel-press grid size-11 place-items-center"
          >
            <MailIcon />
          </a>
        </div>
      </div>
    </Tile>
  );
}

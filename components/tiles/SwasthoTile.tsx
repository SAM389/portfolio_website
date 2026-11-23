import type { CSSProperties } from "react";
import { featured } from "@/lib/data";
import { PixelModal } from "../PixelModal";
import { ArrowRightIcon, ArrowUpRightIcon } from "../icons";
import { Eyebrow, toneVar } from "../Tile";
import { QueueWidget } from "./QueueWidget";

/** swastho's tab in the featured tile: pitch on the left, the live queue on the right. */
export function SwasthoPanel() {
  return (
    <div className="flex h-full flex-col gap-5 @lg:flex-row @lg:items-stretch">
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div>
          <h2 className="font-display text-[clamp(2.25rem,8cqi,3.75rem)] leading-none font-bold tracking-tight">
            {featured.name}
          </h2>
          <p className="mt-2 font-medium text-ink/80">{featured.tagline}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5 short:mt-2">
            {featured.audiences.map((a) => (
              <li key={a} className="bg-white/40 px-2.5 py-0.5 font-pixel text-[10px] uppercase text-ink/80">
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ol className="flex flex-wrap items-center gap-2 text-sm font-bold">
            {featured.steps.map((step, i) => (
              <li key={step.title} className="flex items-center gap-2">
                <span className="pixel-sm inline-flex items-center gap-1.5 px-3 py-1">
                  <span className="font-pixel text-[10px] text-ink/55">{i + 1}</span>
                  {step.title}
                </span>
                {i < featured.steps.length - 1 && <ArrowRightIcon className="text-ink/45" />}
              </li>
            ))}
          </ol>

          <div className="mt-5 flex flex-wrap gap-3 short:mt-3">
            <a
              href={featured.href}
              target="_blank"
              rel="noreferrer"
              className="pixel-sm pixel-press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold"
              style={toneVar("amber-300")}
            >
              Visit live <ArrowUpRightIcon />
            </a>
            <PixelModal
              title={featured.name}
              triggerLabel="How it works"
              triggerClassName="pixel-sm pixel-press px-5 py-2.5 text-sm font-bold"
            >
              <SwasthoDetails />
            </PixelModal>
          </div>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col @lg:w-[clamp(220px,40cqi,300px)]">
        <QueueWidget />
      </div>
    </div>
  );
}

export function SwasthoDetails() {
  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed font-medium text-ink/85">{featured.summary}</p>

      <section>
        <Eyebrow>why I built it</Eyebrow>
        <p className="mt-2 text-[15px] leading-relaxed font-medium text-ink/85">{featured.why}</p>
      </section>

      <section className="pixel-well p-5">
        <Eyebrow>what it solves</Eyebrow>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed font-medium text-ink/85">
          {featured.solved.map((s) => (
            <li key={s} className="flex gap-2">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-leaf-600" />
              {s}
            </li>
          ))}
        </ul>
      </section>

      <div className="pixel-well p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-display text-xl font-bold">What I built · {featured.myRole}</p>
          <p className="font-pixel text-[10px] uppercase text-ink/60">{featured.period}</p>
        </div>
        <ul className="mt-3 space-y-2 text-sm leading-relaxed font-medium text-ink/85">
          {featured.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-leaf-600" />
              {h}
            </li>
          ))}
        </ul>
      </div>

      <ol className="grid gap-4 sm:grid-cols-3">
        {featured.steps.map((step, i) => (
          <li key={step.title} className="pixel-well p-4">
            <p className="font-pixel text-[10px] uppercase text-ink/55">Step {i + 1}</p>
            <p className="font-display text-xl font-bold">{step.title}</p>
            <p className="mt-1 text-sm font-medium text-ink/80">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="grid gap-5 sm:grid-cols-3">
        {featured.roles.map((role) => (
          <div
            key={role.title}
            className="pixel p-4"
            style={
              {
                ...toneVar("leaf-200"),
                "--drop": "var(--color-ink)",
              } as CSSProperties
            }
          >
            <p className="font-display text-lg font-bold">{role.title}</p>
            <ul className="mt-2 space-y-1.5 text-sm font-medium text-ink/85">
              {role.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 bg-ink/60" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-x-2.5 gap-y-3.5">
          {featured.stack.map((s) => (
            <li key={s} className="pixel-key px-3 py-1 text-sm font-bold">
              {s}
            </li>
          ))}
        </ul>
        <a
          href={featured.href}
          target="_blank"
          rel="noreferrer"
          className="pixel-sm pixel-press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold"
          style={toneVar("amber-300")}
        >
          Open swastho.in <ArrowUpRightIcon />
        </a>
      </div>
    </div>
  );
}

import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { ArrowRightIcon, ArrowUpRightIcon, GitHubIcon } from "@/components/icons";
import { PixelModal } from "@/components/PixelModal";
import { ProjectDetails } from "@/components/ProjectDetails";
import { Eyebrow, Tile, toneVar } from "@/components/Tile";
import { SwasthoDetails } from "@/components/tiles/SwasthoTile";
import { featured, profile, projects, socials } from "@/lib/data";

export const metadata: Metadata = {
  title: `Projects — ${profile.name}`,
  description: `Things ${profile.name} has built and shipped.`,
};

const github = socials.find((s) => s.icon === "github");

export default function ProjectsPage() {
  const total = projects.length + 1;
  const spotlight = projects.find((p) => p.spotlight);
  const others = projects.filter((p) => !p.spotlight);
  // Three cards per row on large screens: the GitHub tile fills whatever the last row leaves.
  const githubSpan = ["lg:col-span-12", "lg:col-span-8", "lg:col-span-4"][others.length % 3];

  return (
    <main className="relative z-10 mx-auto max-w-[1600px] p-4 sm:p-5 lg:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12">
        {/* Page header */}
        <Tile index={0} label="Projects" tone="leaf-200" className="md:col-span-6 lg:col-span-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>~/projects</Eyebrow>
              <h1 className="mt-2 font-display text-[clamp(2.25rem,7cqi,4rem)] leading-[0.95] font-bold tracking-tight">
                Things I&apos;ve built
              </h1>
              <p className="mt-2 max-w-[56ch] text-[15px] leading-snug font-medium text-ink/80">
                Production products, side builds and experiments. Each one shipped end to end.
              </p>
            </div>
            <div className="pixel-well px-4 py-2 text-right" style={toneVar("leaf-50")}>
              <p className="font-term text-5xl leading-none">{String(total).padStart(2, "0")}</p>
              <p className="font-pixel text-[10px] tracking-wider text-ink/60 uppercase">projects</p>
            </div>
          </div>
        </Tile>

        {/* Spotlight: the AI tool first, the live product second */}
        {spotlight && (
          <Tile index={1} label={spotlight.name} tone="leaf-400" className="md:col-span-6 lg:col-span-6">
            <div className="flex h-full flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="pixel-sm inline-flex items-center gap-2 px-3 py-1 font-pixel text-[10px] uppercase"
                  style={toneVar("amber-300")}
                >
                  <span className="size-2 animate-[blink_1.2s_steps(1)_infinite] bg-ink" />
                  Live · AI tool
                </span>
                <span className="font-pixel text-[10px] tracking-wider text-ink/65 uppercase">{spotlight.period}</span>
              </div>
              <h2 className="mt-4 font-display text-4xl leading-none font-bold sm:text-5xl">{spotlight.name}</h2>
              {spotlight.tagline && (
                <p className="mt-1 font-display text-lg font-medium text-ink-soft">{spotlight.tagline}</p>
              )}
              <p className="mt-3 max-w-[60ch] text-[15px] leading-snug font-medium text-ink/80">{spotlight.blurb}</p>

              {spotlight.metrics && (
                <div className="pixel-well mt-5 p-4" style={toneVar("leaf-100")}>
                  <Eyebrow>benchmark · live PyPI</Eyebrow>
                  <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
                    {spotlight.metrics.map((m) => (
                      <li key={m.label}>
                        <p className="font-term text-3xl leading-none">{m.value}</p>
                        <p className="mt-0.5 font-pixel text-[10px] leading-snug tracking-wider text-ink/65 uppercase">
                          {m.label}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {spotlight.tags.map((t) => (
                  <li key={t} className="bg-white/45 px-2 py-0.5 font-pixel text-[10px] uppercase">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
                {spotlight.live && (
                  <a
                    href={spotlight.live.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-sm pixel-press inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold"
                    style={toneVar("amber-300")}
                  >
                    {spotlight.live.label}
                    <ArrowUpRightIcon />
                  </a>
                )}
                {spotlight.href && (
                  <a
                    href={spotlight.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pixel-sm pixel-press inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold"
                  >
                    <GitHubIcon /> Code
                  </a>
                )}
                <PixelModal
                  title={spotlight.name}
                  triggerLabel="Why I built it"
                  triggerClassName="pixel-sm pixel-press px-4 py-2.5 text-sm font-bold"
                >
                  <ProjectDetails project={spotlight} />
                </PixelModal>
              </div>
            </div>
          </Tile>
        )}

        <Tile index={2} label={featured.name} tone="leaf-400" className="md:col-span-6 lg:col-span-6">
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="pixel-sm inline-flex items-center gap-2 px-3 py-1 font-pixel text-[10px] uppercase"
                style={toneVar("amber-300")}
              >
                <span className="size-2 animate-[blink_1.2s_steps(1)_infinite] bg-ink" />
                Live · product
              </span>
              <span className="font-pixel text-[10px] tracking-wider text-ink/65 uppercase">{featured.period}</span>
            </div>
            <h2 className="mt-4 font-display text-4xl leading-none font-bold sm:text-5xl">{featured.name}</h2>
            <p className="mt-1 font-display text-lg font-medium text-ink-soft">{featured.tagline}</p>
            <p className="mt-3 max-w-[60ch] text-[15px] leading-snug font-medium text-ink/80">{featured.summary}</p>

            <ol className="pixel-well mt-5 flex flex-col gap-3 p-4" style={toneVar("leaf-100")}>
              <li>
                <Eyebrow>what I built · {featured.myRole}</Eyebrow>
              </li>
              {featured.highlights.map((h, i) => (
                <li key={h} className="flex gap-3 text-sm leading-snug font-medium text-ink/85">
                  <span className="font-term text-2xl leading-none text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  {h}
                </li>
              ))}
            </ol>

            <ul className="mt-4 flex flex-wrap gap-1.5">
              {featured.stack.map((t) => (
                <li key={t} className="bg-white/45 px-2 py-0.5 font-pixel text-[10px] uppercase">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-auto lg:pt-6">
              <a
                href={featured.href}
                target="_blank"
                rel="noreferrer"
                className="pixel-sm pixel-press inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold"
                style={toneVar("amber-300")}
              >
                Visit {featured.name}
                <ArrowUpRightIcon />
              </a>
              <PixelModal
                title={featured.name}
                triggerLabel="Why I built it"
                triggerClassName="pixel-sm pixel-press px-4 py-2.5 text-sm font-bold"
              >
                <SwasthoDetails />
              </PixelModal>
            </div>
          </div>
        </Tile>

        {/* The rest */}
        {others.map((p, i) => (
          <Tile
            key={p.name}
            index={i + 3}
            label={p.name}
            tone={i % 2 ? "leaf-200" : "leaf-100"}
            className="md:col-span-3 lg:col-span-4"
          >
            <article className="flex h-full min-h-[200px] flex-col">
              <div className="flex items-start justify-between gap-3">
                <span className="font-term text-3xl leading-none text-ink-soft">{String(i + 3).padStart(2, "0")}</span>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.name} on GitHub`}
                    title="View the code on GitHub"
                    className="pixel-sm pixel-press grid size-9 shrink-0 place-items-center"
                    style={toneVar("leaf-50")}
                  >
                    <GitHubIcon />
                  </a>
                )}
              </div>
              <h2 className="mt-3 font-display text-2xl leading-tight font-bold">{p.name}</h2>
              <p className="mt-1 text-sm leading-snug font-medium text-ink/80">{p.blurb}</p>
              {p.metrics && (
                <ul className="mt-4 grid grid-cols-3 gap-2">
                  {p.metrics.slice(0, 3).map((m) => (
                    <li key={m.label} className="bg-white/40 px-2 py-1.5">
                      <p className="font-term text-2xl leading-none">{m.value}</p>
                      <p className="mt-0.5 font-pixel text-[10px] leading-tight tracking-wider text-ink/65 uppercase">
                        {m.label}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
                {p.tags.map((t) => (
                  <li key={t} className="bg-white/50 px-2 py-0.5 font-pixel text-[10px] uppercase">
                    {t}
                  </li>
                ))}
              </ul>
              {(p.why || p.live) && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {p.why && (
                    <PixelModal
                      title={p.name}
                      tone={i % 2 ? "leaf-200" : "leaf-100"}
                      triggerLabel={
                        <>
                          Details <ArrowRightIcon />
                        </>
                      }
                      triggerClassName="pixel-sm pixel-press inline-flex items-center gap-2 px-4 py-2 text-sm font-bold"
                    >
                      <ProjectDetails project={p} />
                    </PixelModal>
                  )}
                  {p.live && (
                    <a
                      href={p.live.href}
                      target="_blank"
                      rel="noreferrer"
                      className="pixel-sm pixel-press inline-flex items-center gap-2 px-4 py-2 text-sm font-bold"
                      style={toneVar("amber-300")}
                    >
                      Live <ArrowUpRightIcon />
                    </a>
                  )}
                </div>
              )}
            </article>
          </Tile>
        ))}

        {/* More on GitHub */}
        {github && (
          <Tile
            index={others.length + 3}
            label="More on GitHub"
            tone="leaf-800"
            className={`md:col-span-6 ${githubSpan}`}
          >
            <a
              href={github.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full min-h-[200px] flex-col justify-between text-leaf-50"
            >
              <span className="font-pixel text-[11px] tracking-wider text-leaf-200/80 uppercase">more builds</span>
              <span>
                <span className="block font-display text-2xl leading-tight font-bold">
                  Everything else lives on GitHub
                </span>
                <span
                  className="pixel-sm mt-4 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-ink transition-transform duration-150 group-hover:-translate-y-0.5"
                  style={{ ...toneVar("leaf-50"), "--lift": "3px" } as CSSProperties}
                >
                  <GitHubIcon />@{github.handle}
                  <ArrowUpRightIcon />
                </span>
              </span>
            </a>
          </Tile>
        )}
      </div>
    </main>
  );
}

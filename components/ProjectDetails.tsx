import type { Project } from "@/lib/data";
import { ArrowUpRightIcon, GitHubIcon } from "./icons";
import { Eyebrow, toneVar } from "./Tile";

/** The body of a project's "Details" pop-over. */
export function ProjectDetails({ project: p }: { project: Project }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="text-lg leading-snug font-medium text-ink/85">{p.blurb}</p>
        {p.period && <p className="font-pixel text-[10px] text-ink/60 uppercase">{p.period}</p>}
      </div>

      {p.metrics && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {p.metrics.map((m) => (
            <li key={m.label} className="pixel-well px-3 py-2.5" style={toneVar("leaf-50")}>
              <p className="font-term text-3xl leading-none">{m.value}</p>
              <p className="mt-1 font-pixel text-[10px] leading-snug tracking-wider text-ink/65 uppercase">{m.label}</p>
            </li>
          ))}
        </ul>
      )}

      {p.why && (
        <section>
          <Eyebrow>why I built it</Eyebrow>
          <p className="mt-2 text-[15px] leading-relaxed font-medium text-ink/85">{p.why}</p>
        </section>
      )}

      {p.solved && <BulletList title="what it solves" items={p.solved} bullet="bg-leaf-600" well />}
      {p.highlights && <BulletList title="how it's built" items={p.highlights} bullet="bg-ink/60" />}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-x-2.5 gap-y-3.5">
          {p.tags.map((t) => (
            <li key={t} className="pixel-key px-3 py-1 text-sm font-bold">
              {t}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          {p.live && (
            <a
              href={p.live.href}
              target="_blank"
              rel="noreferrer"
              className="pixel-sm pixel-press inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold"
              style={toneVar("leaf-50")}
            >
              {p.live.label} <ArrowUpRightIcon />
            </a>
          )}
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="pixel-sm pixel-press inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold"
              style={toneVar("amber-300")}
            >
              <GitHubIcon /> View the code <ArrowUpRightIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function BulletList({
  title,
  items,
  bullet,
  well = false,
}: {
  title: string;
  items: string[];
  bullet: string;
  well?: boolean;
}) {
  return (
    <section className={well ? "pixel-well p-5" : ""}>
      <Eyebrow>{title}</Eyebrow>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed font-medium text-ink/85">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className={`mt-1.5 size-1.5 shrink-0 ${bullet}`} />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

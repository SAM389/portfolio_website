import { projects } from "@/lib/data";
import { PixelModal } from "../PixelModal";
import { ProjectDetails } from "../ProjectDetails";
import { ArrowUpRightIcon, GitHubIcon } from "../icons";
import { toneVar } from "../Tile";

export const vericode = projects.find((p) => p.spotlight);

/** VeriCode's tab in the featured tile: pitch on the left, benchmark numbers on the right. */
export function VeriCodePanel() {
  if (!vericode) return null;

  return (
    <div className="flex h-full flex-col gap-5 @lg:flex-row @lg:items-stretch">
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
        <div>
          <h2 className="font-display text-[clamp(2.25rem,8cqi,3.75rem)] leading-none font-bold tracking-tight">
            {vericode.name}
          </h2>
          {vericode.tagline && <p className="mt-2 font-medium text-ink/80">{vericode.tagline}</p>}
          <p className="mt-2 text-sm leading-snug font-medium text-ink/70">
            Catches made-up packages and versions in AI-written code before anything is installed.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {vericode.live && (
            <a
              href={vericode.live.href}
              target="_blank"
              rel="noreferrer"
              className="pixel-sm pixel-press inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold"
              style={toneVar("amber-300")}
            >
              Try it live <ArrowUpRightIcon />
            </a>
          )}
          <PixelModal
            title={vericode.name}
            triggerLabel="How it works"
            triggerClassName="pixel-sm pixel-press px-5 py-2.5 text-sm font-bold"
          >
            <ProjectDetails project={vericode} />
          </PixelModal>
          {vericode.href && (
            <a
              href={vericode.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${vericode.name} on GitHub`}
              title="View the code on GitHub"
              className="pixel-sm pixel-press grid size-10 place-items-center"
            >
              <GitHubIcon />
            </a>
          )}
        </div>
      </div>

      {vericode.metrics && (
        <div className="pixel-well flex w-full shrink-0 flex-col justify-between gap-3 p-4 @lg:w-[clamp(220px,40cqi,300px)]">
          <div className="flex items-center justify-between gap-2">
            <span className="font-pixel text-[10px] tracking-wider text-ink/60 uppercase">Benchmark</span>
            <span className="bg-amber-300 px-2 py-0.5 font-pixel text-[10px] uppercase">live PyPI</span>
          </div>
          {/* Four numbers fit a 768px-tall laptop screen; all six are in "How it works". */}
          <ul className="grid flex-1 grid-cols-2 content-around gap-x-3 gap-y-2.5">
            {vericode.metrics.slice(0, 4).map((m) => (
              <li key={m.label}>
                <p className="font-term text-[clamp(1.75rem,5cqi,2.5rem)] leading-none">{m.value}</p>
                <p className="font-pixel text-[10px] leading-tight tracking-wider text-ink/65 uppercase">{m.label}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

import { profile } from "@/lib/data";
import { PixelModal } from "../PixelModal";
import { ArrowRightIcon } from "../icons";
import { Eyebrow, Tile } from "../Tile";

export function AboutTile({ className }: { className?: string }) {
  return (
    <Tile index={3} label="About me" className={className}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-2">
          <Eyebrow>about me</Eyebrow>
          <PixelModal
            title="About me"
            triggerLabel={
              <>
                More <ArrowRightIcon />
              </>
            }
            triggerClassName="pixel-sm pixel-press inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold"
          >
            <div className="space-y-4 text-lg leading-relaxed font-medium text-ink/85">
              {profile.bio.long.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </PixelModal>
        </div>

        <p className="mt-2 text-sm leading-snug font-medium text-ink/85 @xs:text-[15px] short:mt-1.5">
          {profile.bio.short}
        </p>

        <ul className="mt-auto flex gap-2.5 pt-3 short:pt-2">
          {profile.stats.map((s) => (
            <li key={s.label} className="pixel-well flex-1 px-2 py-1.5 text-center short:py-1">
              <p className="font-term text-3xl leading-none">{s.value}</p>
              <p className="mt-0.5 text-[11px] leading-tight font-medium text-ink/70">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </Tile>
  );
}

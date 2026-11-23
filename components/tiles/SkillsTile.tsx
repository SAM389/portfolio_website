import { skillGroups } from "@/lib/data";
import { Eyebrow, Tile } from "../Tile";

export function SkillsTile({ className }: { className?: string }) {
  return (
    <Tile index={2} label="Skills" className={className}>
      <div className="flex h-full flex-col">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-[clamp(1.6rem,6cqi,1.9rem)] font-bold">Toolbox</h2>
          <Eyebrow>hover the keys</Eyebrow>
        </div>

        <div className="mt-3 flex flex-1 flex-col justify-around gap-3">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 font-pixel text-[10px] tracking-wider text-ink/70 uppercase">
                {group.title}
              </p>
              <ul className="flex flex-wrap gap-x-2.5 gap-y-3 pb-1.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    // Clean sans, not the pixel face: in pixel type "MCP" reads like "MOP".
                    className="pixel-key px-2.5 py-0.5 font-sans text-xs font-semibold @lg:px-3 @lg:py-1 @lg:text-[13px]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Tile>
  );
}

import { AboutTile } from "./tiles/AboutTile";
import { ContactTile } from "./tiles/ContactTile";
import { HeroTile } from "./tiles/HeroTile";
import { NowTile } from "./tiles/NowTile";
import { ProjectsTile } from "./tiles/ProjectsTile";
import { SkillsTile } from "./tiles/SkillsTile";
import { FeaturedTile } from "./tiles/FeaturedTile";
import { SwasthoPanel } from "./tiles/SwasthoTile";
import { VeriCodePanel } from "./tiles/VeriCodeTile";

/*
  Desktop (lg, 12 x 6) — fills the screen below the nav bar:
  ┌──────── hero 5x3 ────────┬─── featured 7x3 (vericode | swastho) ───┐
  ├──────── skills 5x3 ──────┼── about 3x2 ──┬──── projects 4x2 ────┤
  │                          ├── now 3x1 ────┼──── contact 4x1 ─────┤
  Tablet (md) uses 6 columns; phones stack everything.
*/
export function BentoGrid() {
  return (
    <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-4 md:grid-cols-6 lg:h-[calc(100dvh-8.5rem)] lg:grid-cols-12 lg:grid-rows-[repeat(6,minmax(92px,1fr))]">
      <HeroTile className="md:col-span-6 lg:col-span-5 lg:row-span-3" />
      <FeaturedTile
        className="md:col-span-6 lg:col-span-7 lg:row-span-3"
        tabs={[
          { id: "vericode", label: "VeriCode", panel: <VeriCodePanel /> },
          { id: "swastho", label: "swastho.in", panel: <SwasthoPanel /> },
        ]}
      />
      <SkillsTile className="md:col-span-6 lg:col-span-5 lg:row-span-3" />
      <AboutTile className="md:col-span-3 lg:col-span-3 lg:row-span-2" />
      <ProjectsTile className="md:col-span-3 lg:col-span-4 lg:row-span-2" />
      <NowTile className="md:col-span-3 lg:col-span-3 lg:row-span-1" />
      <ContactTile className="md:col-span-3 lg:col-span-4 lg:row-span-1" />
    </div>
  );
}

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/*
  Every icon is pixel art: a grid of rows where "#" is a filled cell and "." is empty.
  Other characters pick a colour from the palette passed to `bitmap`.
  Small grids draw each cell 2px wide so the pixels stay chunky.
*/
type Run = { x: number; y: number; w: number; c: string };

function toRuns(rows: string[]): Run[] {
  const runs: Run[] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; ) {
      const c = row[x];
      let w = 1;
      while (row[x + w] === c) w++;
      if (c !== ".") runs.push({ x, y, w, c });
      x += w;
    }
  });
  return runs;
}

export function bitmap(rows: string[], palette: Record<string, string> = {}) {
  const runs = toRuns(rows);
  const cols = rows[0].length;
  const cell = Math.max(cols, rows.length) <= 11 ? 2 : 1.25;

  function PixelIcon(props: IconProps) {
    return (
      <svg
        width={cols * cell}
        height={rows.length * cell}
        viewBox={`0 0 ${cols} ${rows.length}`}
        shapeRendering="crispEdges"
        aria-hidden
        {...props}
      >
        {runs.map((r) => (
          <rect
            key={`${r.x}-${r.y}`}
            x={r.x}
            y={r.y}
            width={r.w}
            height={1}
            fill={palette[r.c] ?? "currentColor"}
          />
        ))}
      </svg>
    );
  }
  return PixelIcon;
}

export const GitHubIcon = bitmap([
  ".....#####.....",
  "...#########...",
  "..###########..",
  ".###.#####.###.",
  ".###..###..###.",
  "###.........###",
  "###.........###",
  "###.........###",
  "####.......####",
  ".####.....####.",
  ".##.##...#####.",
  "..##.....####..",
  "...###...###...",
  "....##...##....",
]);

export const LinkedInIcon = bitmap([
  ".############.",
  "##############",
  "##..##########",
  "##..##########",
  "##############",
  "##..#.....####",
  "##..#..##..###",
  "##..#..###.###",
  "##..#..###.###",
  "##..#..###.###",
  "##..#..###.###",
  "##..#..###.###",
  "##############",
  ".############.",
]);

export const XIcon = bitmap([
  "####.....##.",
  ".####...##..",
  "..####.##...",
  "...#####....",
  "....####....",
  "....#####...",
  "...##.####..",
  "..##...####.",
  ".##.....####",
  "##.......###",
]);

export const ArrowUpRightIcon = bitmap([
  "...######",
  ".......##",
  "......#.#",
  ".....#..#",
  "....#...#",
  "...#....#",
  "..#......",
  ".#.......",
  "#........",
]);

export const ArrowRightIcon = bitmap([
  "....#....",
  ".....#...",
  "......#..",
  ".......#.",
  "#########",
  ".......#.",
  "......#..",
  ".....#...",
  "....#....",
]);

export const MailIcon = bitmap([
  "###########",
  "##.......##",
  "#.#.....#.#",
  "#..#...#..#",
  "#...#.#...#",
  "#....#....#",
  "#.........#",
  "###########",
]);

export const CopyIcon = bitmap([
  "######....",
  "#....#....",
  "#....#....",
  "#..#######",
  "#..#.....#",
  "####.....#",
  "...#.....#",
  "...#.....#",
  "...#.....#",
  "...#######",
]);

export const CheckIcon = bitmap([
  ".........#",
  "........##",
  ".......##.",
  "#.....##..",
  "##...##...",
  ".##.##....",
  "..###.....",
  "...#......",
]);

export const PinIcon = bitmap([
  "..#####..",
  ".##...##.",
  "##.....##",
  "#...#...#",
  "#..###..#",
  "#...#...#",
  "##.....##",
  ".##...##.",
  "..##.##..",
  "...###...",
  "....#....",
]);

export const CloseIcon = bitmap([
  "##....##",
  "###..###",
  ".######.",
  "..####..",
  "..####..",
  ".######.",
  "###..###",
  "##....##",
]);

/** A 5-cell plus: the pixel version of a sparkle. */
export const SparkleIcon = bitmap(["..#..", "..#..", "#####", "..#..", "..#.."]);

/** A full moon with an ink outline and a few craters. */
export const MoonIcon = bitmap(
  [
    "....kkkk....",
    "..kkoooookk.",
    ".kooooooook.",
    ".koccoooook.",
    "kooccooooook",
    "koooooooccok",
    "koooooooccok",
    "kooocooooook",
    ".kooooooook.",
    ".koooooccok.",
    "..kkoooookk.",
    "....kkkk....",
  ],
  { k: "var(--color-ink)", o: "var(--color-leaf-100)", c: "var(--color-leaf-200)" },
);

export const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
};

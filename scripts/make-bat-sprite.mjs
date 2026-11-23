// Turns pixel_bat.mp4 (a screen recording) into a clean, transparent sprite sheet.
//
//   node scripts/make-bat-sprite.mjs [input.mp4] [output.png]
//
// Needs ffmpeg on PATH. Steps:
//   1. Crop the white preview box out of the recording and read it as grayscale.
//   2. Threshold each frame and group frames that show the same wing pose.
//   3. Majority-vote each group into one denoised pose (removes compression noise).
//   4. Write the poses side by side as black pixels on a transparent background.
// The page uses the sprite as a CSS mask, so only the alpha channel matters.

import { execFileSync } from "node:child_process";

const input = process.argv[2] ?? "pixel_bat.mp4";
const output = process.argv[3] ?? "public/bat-sprite.png";

// Region of the recording that holds the white preview box (388x586 video).
const BOX = { w: 388, h: 220, x: 0, y: 150 };
// Area inside that box where the bat flaps, away from the watermark.
const AREA = { x0: 130, x1: 270, y0: 45, y1: 172 };
const SAME_POSE = 400; // max differing pixels for two frames to count as one pose

const raw = execFileSync(
  "ffmpeg",
  ["-v", "error", "-i", input, "-vf", `crop=${BOX.w}:${BOX.h}:${BOX.x}:${BOX.y},format=gray`, "-f", "rawvideo", "-"],
  { maxBuffer: 1 << 28 },
);

const frameSize = BOX.w * BOX.h;
const frameCount = raw.length / frameSize;
const CW = AREA.x1 - AREA.x0 + 1;
const CH = AREA.y1 - AREA.y0 + 1;

const masks = [];
for (let n = 0; n < frameCount; n++) {
  const m = new Uint8Array(CW * CH);
  for (let y = 0; y < CH; y++)
    for (let x = 0; x < CW; x++)
      m[y * CW + x] = raw[n * frameSize + (y + AREA.y0) * BOX.w + x + AREA.x0] < 128 ? 1 : 0;
  masks.push(m);
}

const diff = (a, b) => {
  let c = 0;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) c++;
  return c;
};

// Group frames by pose, in order of first appearance (that is the flap order).
const groups = [];
for (let n = 0; n < frameCount; n++) {
  let best = -1;
  let bestDiff = Infinity;
  groups.forEach((g, i) => {
    const d = diff(masks[n], masks[g.rep]);
    if (d < bestDiff) [best, bestDiff] = [i, d];
  });
  if (bestDiff < SAME_POSE) groups[best].members.push(n);
  else groups.push({ rep: n, members: [n] });
}

const poses = groups.map((g) => {
  const votes = new Uint16Array(CW * CH);
  for (const n of g.members) masks[n].forEach((v, i) => (votes[i] += v));
  return Uint8Array.from(votes, (v) => (v * 2 > g.members.length ? 1 : 0));
});

// Shared bounding box so every frame lines up.
let [x0, y0, x1, y1] = [Infinity, Infinity, -1, -1];
for (const p of poses)
  for (let y = 0; y < CH; y++)
    for (let x = 0; x < CW; x++)
      if (p[y * CW + x]) [x0, y0, x1, y1] = [Math.min(x0, x), Math.min(y0, y), Math.max(x1, x), Math.max(y1, y)];
const PAD = 2;
x0 -= PAD; y0 -= PAD; x1 += PAD; y1 += PAD;
const FW = x1 - x0 + 1;
const FH = y1 - y0 + 1;
const SW = FW * poses.length;

const rgba = Buffer.alloc(SW * FH * 4);
poses.forEach((p, k) => {
  for (let y = 0; y < FH; y++)
    for (let x = 0; x < FW; x++) {
      const on = p[(y + y0) * CW + x + x0];
      const o = (y * SW + k * FW + x) * 4;
      rgba[o] = rgba[o + 1] = rgba[o + 2] = 20;
      rgba[o + 3] = on ? 255 : 0;
    }
});

execFileSync(
  "ffmpeg",
  ["-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", `${SW}x${FH}`, "-i", "-", "-frames:v", "1", output],
  { input: rgba },
);

console.log(`${output}: ${poses.length} frames of ${FW}x${FH}px (sheet ${SW}x${FH})`);

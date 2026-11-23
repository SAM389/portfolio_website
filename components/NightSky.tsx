import { SparkleIcon } from "./icons";

// Twinkling pixel stars behind the grid. Positions come from a seeded generator,
// so the server and the browser render exactly the same sky.

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const rand = seeded(42);
const stars = Array.from({ length: 56 }, () => ({
  left: rand() * 100,
  top: rand() * 100,
  // Whole pixels only: 2, 3 or 4.
  size: 2 + Math.floor(rand() * 3),
  delay: rand() * 4,
  duration: 2.5 + rand() * 3,
}));

const sparkles = [
  { left: 49.4, top: 3, scale: 3, delay: 0.4 },
  { left: 97.8, top: 46, scale: 2, delay: 1.6 },
  { left: 41.6, top: 97, scale: 3, delay: 2.4 },
  { left: 1.2, top: 62, scale: 2, delay: 3.1 },
];

export function NightSky() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {stars.map((star, i) => (
        <span
          key={i}
          className="absolute bg-leaf-50/60"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration}s steps(3) ${star.delay}s infinite`,
          }}
        />
      ))}
      {sparkles.map((s, i) => (
        <SparkleIcon
          key={`s${i}`}
          className="absolute text-leaf-200/80"
          width={5 * s.scale}
          height={5 * s.scale}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            animation: `twinkle 3.2s steps(3) ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

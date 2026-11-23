import { BentoGrid } from "@/components/BentoGrid";
import { PixelBat } from "@/components/PixelBat";

export default function Home() {
  return (
    <main className="relative overflow-x-clip p-4 sm:p-5 lg:p-6">
      <PixelBat />
      <BentoGrid />
    </main>
  );
}

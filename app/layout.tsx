import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Pixelify_Sans, VT323 } from "next/font/google";
import { BootScreen } from "@/components/BootScreen";
import { Navbar } from "@/components/Navbar";
import { NightSky } from "@/components/NightSky";
import { bootScript } from "@/lib/boot";
import { profile } from "@/lib/data";
import "./globals.css";

// Pixel personality for short, large text: headings, buttons and skill keys.
const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
});

// Body text: anything people actually have to read.
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Small labels and eyebrows: terminal feel, but legible at 10px.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Terminal-style digits: the clock, the queue number and the stats.
const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the boot script below may add data-boot before React hydrates.
    <html
      lang="en"
      className={`${pixelify.variable} ${plexSans.variable} ${plexMono.variable} ${vt323.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="font-sans">
        {/* Lives in the layout so it plays on a direct load of any page, but not on in-app navigation. */}
        <BootScreen />
        <NightSky />
        <Navbar />
        {children}
      </body>
    </html>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { profile } from "@/lib/data";
import pfp from "@/public/pfp.jpg";
import { CloseIcon, MailIcon, bitmap } from "./icons";
import { toneVar } from "./Tile";

const HomeIcon = bitmap([
  "....#....",
  "...###...",
  "..#####..",
  ".#######.",
  "#########",
  ".##...##.",
  ".##.#.##.",
  ".##.#.##.",
  ".#######.",
]);

const GridIcon = bitmap([
  "####.####",
  "####.####",
  "####.####",
  "####.####",
  ".........",
  "####.####",
  "####.####",
  "####.####",
  "####.####",
]);

const MenuIcon = bitmap(["##########", "##########", "..........", "..........", "##########", "##########", "..........", "..........", "##########", "##########"]);

const links = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/projects", label: "Projects", Icon: GridIcon },
] as const;

/** Sticky pixel nav bar. Collapses into a drop-down panel below the sm breakpoint. */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`nav-shell sticky top-0 z-30 px-4 pt-4 pb-1 sm:px-5 sm:pt-5 lg:px-6 lg:pt-6 ${scrolled ? "nav-scrolled" : ""}`}
    >
      <nav
        aria-label="Main"
        className="nav-bar pixel relative mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-3 px-3 sm:px-4"
        style={{ ...toneVar("leaf-400"), "--drop": "var(--color-leaf-800)" } as CSSProperties}
      >
        {/* Brand */}
        <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label={`${profile.name}, home`}>
          {/* p-[3px] leaves the pixel-sm bevel visible; the link's aria-label already names it. */}
          <span
            className="pixel-sm size-9 shrink-0 p-[3px] transition-transform duration-150 group-hover:-rotate-6"
            style={toneVar("leaf-50")}
          >
            <Image
              src={pfp}
              alt=""
              placeholder="blur"
              sizes="36px"
              className="size-full object-cover object-[50%_30%]"
            />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block truncate font-display text-lg font-bold">{profile.name}</span>
            <span className="hidden truncate font-pixel text-[10px] tracking-wider text-ink/65 uppercase min-[400px]:block">
              {profile.role}
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-3 sm:flex">
          <ul className="pixel-well flex items-center gap-1 p-1.5" style={toneVar("leaf-200")}>
            {links.map(({ href, label, Icon }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`nav-link inline-flex items-center gap-2 px-3 py-1.5 text-sm font-bold ${
                      active ? "nav-link-active pixel-sm" : "text-ink/75 hover:bg-white/35 hover:text-ink"
                    }`}
                    style={active ? ({ ...toneVar("leaf-50"), "--lift": "0px", "--px": "2px" } as CSSProperties) : undefined}
                  >
                    <Icon />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className="pixel-sm pixel-press inline-flex items-center gap-2 px-4 py-2 text-sm font-bold"
            style={toneVar("amber-300")}
          >
            <MailIcon />
            Contact
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="pixel-sm pixel-press grid size-10 shrink-0 place-items-center sm:hidden"
          style={toneVar(open ? "amber-300" : "leaf-50")}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        {/* Mobile panel */}
        {open && (
          <div
            id="mobile-menu"
            className="nav-drop pixel absolute inset-x-0 top-[calc(100%+14px)] p-3 sm:hidden"
            style={{ ...toneVar("leaf-200"), "--drop": "var(--color-ink)" } as CSSProperties}
          >
            <ul className="flex flex-col gap-3">
              {links.map(({ href, label, Icon }, i) => {
                const active = isActive(href);
                return (
                  <li key={href} className="nav-drop-item" style={{ "--i": i } as CSSProperties}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="pixel-sm pixel-press flex items-center justify-between px-4 py-3 font-display text-lg font-bold"
                      style={toneVar(active ? "leaf-50" : "leaf-100")}
                    >
                      <span className="flex items-center gap-3">
                        <Icon />
                        {label}
                      </span>
                      {active && <span className="font-pixel text-[10px] tracking-wider text-ink/60 uppercase">you are here</span>}
                    </Link>
                  </li>
                );
              })}
              <li className="nav-drop-item" style={{ "--i": links.length } as CSSProperties}>
                <a
                  href={`mailto:${profile.email}`}
                  className="pixel-sm pixel-press flex items-center gap-3 px-4 py-3 font-display text-lg font-bold"
                  style={toneVar("amber-300")}
                >
                  <MailIcon />
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

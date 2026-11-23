// ─────────────────────────────────────────────────────────────
//  Boot screen state, shared by the inline script in app/layout.tsx,
//  components/BootScreen.tsx and anything that waits for the boot to finish.
//
//  The boot plays on every page load, so its state only has to live for this load.
//  It's kept on `window.__boot` rather than in storage: browsers that block site data
//  throw on any sessionStorage access, which would silently skip the boot.
//    "run"  – the inline script decided to boot; the overlay is showing, React hasn't started it yet
//    "play" – BootScreen is playing the sequence
//    "done" – finished or skipped
// ─────────────────────────────────────────────────────────────

type BootState = "run" | "play" | "done";

declare global {
  interface Window {
    __boot?: BootState;
  }
}

export const BOOT_EVENT = "boot:done";

/**
 * If React still hasn't started the boot this long after the window's load event, give up on it.
 * Counted from `load`, not from parsing, so a slow-but-working load (dev mode, slow network)
 * still gets its boot, while JS that never runs can't leave the overlay up.
 */
const FAILSAFE_MS = 3000;

/**
 * Runs during HTML parsing, before the first paint, on every page load (visit or reload).
 * Sets data-boot on <html>, which shows the overlay and pauses the tile pop-in.
 */
export const bootScript = `(function(){
var w=window,d=document.documentElement;
try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return}catch(e){}
w.__boot="run";d.setAttribute("data-boot","");
w.addEventListener("load",function(){setTimeout(function(){if(w.__boot==="run"){w.__boot="done";d.removeAttribute("data-boot");dispatchEvent(new Event("${BOOT_EVENT}"))}},${FAILSAFE_MS})});
})()`;

/** True while the boot screen should be on screen. */
export function isBooting() {
  return window.__boot === "run" || window.__boot === "play";
}

export function startBoot() {
  window.__boot = "play";
  // React's dev remount can clear attributes on <html>, so set it again here.
  document.documentElement.setAttribute("data-boot", "");
}

export function finishBoot() {
  window.__boot = "done";
  document.documentElement.removeAttribute("data-boot");
  window.dispatchEvent(new Event(BOOT_EVENT));
}

/** Calls `cb` once the boot screen has gone (right away if there isn't one). Returns a cleanup. */
export function afterBoot(cb: () => void) {
  if (!isBooting()) {
    cb();
    return () => {};
  }
  window.addEventListener(BOOT_EVENT, cb, { once: true });
  return () => window.removeEventListener(BOOT_EVENT, cb);
}

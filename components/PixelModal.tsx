"use client";

import { useId, useRef, type ReactNode } from "react";
import { CloseIcon } from "./icons";
import { toneVar, type Tone } from "./Tile";

/** A button that opens a pixel-framed pop-over built on the native <dialog>. */
export function PixelModal({
  triggerLabel,
  triggerClassName,
  title,
  tone = "leaf-400",
  children,
}: {
  triggerLabel: ReactNode;
  triggerClassName?: string;
  title: string;
  tone?: Tone;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  return (
    <>
      <button type="button" className={triggerClassName} onClick={() => ref.current?.showModal()}>
        {triggerLabel}
      </button>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        className="pixel-modal pixel m-auto max-h-[86dvh] w-[min(90vw,760px)] overflow-visible border-0 p-0 text-ink"
        style={toneVar(tone)}
        onClick={(e) => {
          // A click on the dialog itself (not its content) is a click on the backdrop.
          if (e.target === e.currentTarget) ref.current?.close();
        }}
      >
        <div className="max-h-[86dvh] overflow-y-auto p-6 [scrollbar-color:var(--color-leaf-800)_var(--color-leaf-200)] sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <h2 id={titleId} className="font-display text-3xl font-bold sm:text-4xl">
              {title}
            </h2>
            <button
              type="button"
              aria-label="Close"
              onClick={() => ref.current?.close()}
              className="pixel-sm pixel-press grid size-10 shrink-0 place-items-center"
            >
              <CloseIcon />
            </button>
          </div>
          {children}
        </div>
      </dialog>
    </>
  );
}

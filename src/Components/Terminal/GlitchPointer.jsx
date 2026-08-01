import { useEffect, useRef } from "react";

/* The mouse pointer, in CLI mode: a phosphor block that follows the hand and
   tears like a bad signal.

   Position is driven from JS every frame; the tearing itself is left to CSS
   keyframes on the three stacked copies, so the per-frame work stays a single
   transform write no matter how elaborate the glitch gets. */

const EASE = 0.34; // fraction of the gap closed per frame — snappy, not floaty

export default function GlitchPointer() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // No pointer to follow on touch, and a jittering high-contrast block is
    // exactly what reduced-motion is asking us not to draw. In both cases we
    // leave the real cursor alone — never hide one you haven't replaced.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    document.documentElement.dataset.cliCursor = "1";

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;
    let placed = false;
    let stillTimer = 0;

    const tick = () => {
      x += (tx - x) * EASE;
      y += (ty - y) * EASE;
      root.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Close enough to be pixel-identical: stop the loop and let the next
      // move restart it. The CSS glitch keeps running on its own either way.
      const done = Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1;
      frame = done ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      tx = e.clientX;
      ty = e.clientY;

      // The glitch is tied to the hand, not to a clock: the class carries the
      // animations, and a short idle gap takes them off again. 110ms is long
      // enough to bridge the gaps between move events during a slow drag
      // without leaving the tear running after the hand has stopped.
      root.classList.add("is-moving");
      clearTimeout(stillTimer);
      stillTimer = setTimeout(() => root.classList.remove("is-moving"), 110);

      if (!placed) {
        // Drop it straight onto the pointer the first time; easing in from
        // 0,0 would send it flying across the screen.
        placed = true;
        x = tx;
        y = ty;
        root.classList.add("is-on");
      }
      start();
    };

    const onLeave = () => root.classList.remove("is-on");
    const onEnter = () => placed && root.classList.add("is-on");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(stillTimer);
      delete document.documentElement.dataset.cliCursor;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return (
    <div ref={rootRef} className="cli-pointer" aria-hidden="true">
      {/* Three copies of one arrow: the offset pair are the chromatic split
          that separates and snaps back, the base is what you actually track. */}
      <span className="cli-pointer-ghost cli-pointer-r" />
      <span className="cli-pointer-ghost cli-pointer-c" />
      <span className="cli-pointer-core" />
    </div>
  );
}

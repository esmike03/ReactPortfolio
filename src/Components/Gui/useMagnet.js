import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/* A faint magnetic pull: the hovered element drifts a few px toward the cursor
   and eases back on exit. Returns handlers to spread onto the element — the
   offsets ride on CSS vars (--mx/--my/--mr) so whatever transform the element
   already carries still composes.

   One hovered element at a time, so a single instance serves a whole rail. */
export default function useMagnet({ x = 14, y = 9, tilt = 1.1 } = {}) {
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const clear = (el) => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    // Dropping the vars lets the element fall back to its resting transform,
    // carried by the longer non-hover transition.
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    el.style.removeProperty("--mr");
  };

  const onMouseMove = (e) => {
    if (prefersReducedMotion()) return;
    // currentTarget is nulled once the handler returns, so read it now.
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    // mousemove outruns the display; one update per frame is plenty.
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const r = el.getBoundingClientRect();
      const dx = (clientX - r.left) / r.width - 0.5; // -0.5 … 0.5
      const dy = (clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--mx", `${(dx * x).toFixed(2)}px`);
      el.style.setProperty("--my", `${(dy * y).toFixed(2)}px`);
      el.style.setProperty("--mr", `${(dx * tilt).toFixed(2)}deg`);
    });
  };

  const onMouseLeave = (e) => clear(e.currentTarget);

  return { onMouseMove, onMouseLeave, clear };
}

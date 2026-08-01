import { useEffect, useRef } from "react";

/* Jelly cursor.

   A dot on a spring rather than a dot pinned to the pointer. The spring is the
   whole trick: it lags on the way out and overshoots on the way in, so the dot
   arrives late and settles with a wobble instead of stopping dead. Speed then
   stretches it along its own direction of travel and squashes it across —
   classic squash-and-stretch, which is what sells it as jelly rather than as a
   circle sliding around. */

const STIFF = 0.16; // pull toward the pointer, per frame
const DAMP = 0.74; // velocity kept per frame — the wobble lives in this number
const SQUISH = 0.045; // px/frame of speed → deformation
const MAX_SQUISH = 0.55; // past this it stops reading as a dot
const GROW = 1.15; // extra radius over something clickable

export default function JellyCursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Nothing to follow on touch; and a lagging, wobbling cursor is exactly
    // what "reduce motion" is asking us not to do. Both cases keep the real
    // system cursor, so the `cursor: none` flag below is never set.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    document.documentElement.dataset.cursorHidden = "1";

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let tx = 0;
    let ty = 0;
    let hot = 0; // eased 0 → 1 while over something clickable
    let hotTo = 0;
    let press = 0;
    let pressTo = 0;
    let frame = 0;
    let placed = false;

    const tick = () => {
      // Spring toward the pointer, then bleed off speed. Adding the pull to
      // velocity *before* damping is what lets it overshoot and come back.
      vx = (vx + (tx - x) * STIFF) * DAMP;
      vy = (vy + (ty - y) * STIFF) * DAMP;
      x += vx;
      y += vy;

      hot += (hotTo - hot) * 0.18;
      press += (pressTo - press) * 0.3;

      const speed = Math.hypot(vx, vy);
      const s = Math.min(speed * SQUISH, MAX_SQUISH);
      // Below a pixel a frame the angle is just noise, but `s` is ~0 there too,
      // so the rotation it feeds has nothing left to turn.
      const angle = Math.atan2(vy, vx);
      const size = 1 + hot * GROW - press * 0.35;

      dot.style.transform =
        `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad) ` +
        // Volume roughly holds: what it gains along the travel it gives up
        // across it, so a fast flick reads as a stretched blob, not a big one.
        `scale(${(1 + s) * size}, ${(1 - s * 0.72) * size})`;

      const settled =
        speed < 0.02 &&
        Math.abs(hotTo - hot) < 0.005 &&
        Math.abs(pressTo - press) < 0.005;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      tx = e.clientX;
      ty = e.clientY;
      // First sighting: drop the dot straight onto the pointer. Springing in
      // from 0,0 would fling it across the page.
      if (!placed) {
        placed = true;
        x = tx;
        y = ty;
        dot.classList.add("is-on");
      }
      start();
    };

    const onOver = (e) => {
      const t = e.target instanceof Element ? e.target : null;
      hotTo = t?.closest("a, button, .ui-card, [role='button']") ? 1 : 0;
      start();
    };

    const setPress = (v) => {
      pressTo = v;
      start();
    };
    const onDown = () => setPress(1);
    const onUp = () => setPress(0);

    const onLeave = () => dot.classList.remove("is-on");
    const onEnter = () => placed && dot.classList.add("is-on");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.cursorHidden;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, []);

  return <div ref={dotRef} className="ui-jelly-cursor" aria-hidden="true" />;
}

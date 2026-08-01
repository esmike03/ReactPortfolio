import { useEffect, useRef } from "react";

/* Halftone cursor trail, with a splash on click.

   Same idea as the contributions field: a fixed grid of dots in one ink, where
   size carries the value. Here the value is "how recently did something happen
   near this dot" — the pointer passing by, or a click sending a ring outward.
   The grid is anchored to absolute viewport coordinates, not to the pointer:
   dots must sit still and only change size, or the field shimmers like static
   instead of reading as printed halftone. */

const SPACING = 13; // grid pitch, px
const REACH = 104; // how far from a sample a dot still lifts
const LIFE = 620; // ms a sample keeps any weight
const MAX_SAMPLES = 22;
// Absolute, not a fraction of SPACING: the pitch sets how tight the gaps are
// and the radius sets how fine the dots are — tuning one shouldn't drag the
// other along. This is also the "how heavy does it look" knob, since the dots
// invert at full strength and can't be toned down with opacity.
const MAX_R = 2.5;

const SPLASH_LIFE = 1300; // ms for a click ring to travel and die
const SPLASH_R = 190; // px the ring reaches by the end
const BAND = 36; // thickness of the ring's leading edge
const SPLASH_DOT = 2.9; // wave dots run a shade heavier than trail dots
const MAX_SPLASH = 4; // impatient clicking shouldn't stack up work
// A single ring. The echo that used to chase it read as a bigger event than a
// click deserves. `lag` is how far into the splash's life a ring sets off.
const RINGS = [{ lag: 0, amp: 0.85 }];

const TAU = Math.PI * 2;

export default function HalftoneTrail() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // A trail is decoration that follows the hand — pointless without a hand
    // to follow, and unwelcome when motion has been turned down.
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Only now, with the field confirmed running, is it safe to take the system
    // cursor away — the dots at the pointer are what stand in for it. On touch
    // or reduced motion we returned above and the real cursor stays.
    document.documentElement.dataset.cursorHidden = "1";

    const trail = []; // { x, y, t, w } in viewport px
    const splash = []; // { x, y, t, r, f }
    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      frame = 0;
      const now = performance.now();

      while (trail.length && now - trail[0].t > LIFE) trail.shift();
      while (splash.length && now - splash[0].t > SPLASH_LIFE) splash.shift();

      ctx.clearRect(0, 0, width, height);
      if (!trail.length && !splash.length) return; // loop stops until next input

      // Age everything once per frame instead of once per dot, and grow the
      // box as we go so we only visit cells something can actually reach.
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      const stretch = (x, y, r) => {
        if (x - r < minX) minX = x - r;
        if (x + r > maxX) maxX = x + r;
        if (y - r < minY) minY = y - r;
        if (y + r > maxY) maxY = y + r;
      };

      // The trail keeps its own box: a click's ring can cover most of the
      // screen, and running the trail's samples over all of those cells would
      // be almost entirely wasted work.
      let tMinX = Infinity;
      let tMinY = Infinity;
      let tMaxX = -Infinity;
      let tMaxY = -Infinity;

      for (const s of trail) {
        const life = 1 - (now - s.t) / LIFE;
        s.w = life * life; // ease-out, so the tail thins rather than blinks off
        stretch(s.x, s.y, REACH);
        if (s.x - REACH < tMinX) tMinX = s.x - REACH;
        if (s.x + REACH > tMaxX) tMaxX = s.x + REACH;
        if (s.y - REACH < tMinY) tMinY = s.y - REACH;
        if (s.y + REACH > tMaxY) tMaxY = s.y + REACH;
      }

      for (const b of splash) {
        const age = (now - b.t) / SPLASH_LIFE;
        b.rings = [];
        for (const ring of RINGS) {
          const a = (age - ring.lag) / (1 - ring.lag);
          if (a < 0 || a > 1) continue; // not set off yet, or already spent
          const back = 1 - a;
          // Quadratic ease-out. Cubic shot away too fast to watch; this leaves
          // at a readable speed and still slows into its final radius.
          const r = SPLASH_R * (1 - back * back);
          // A short hold, then fall away — enough that the ring is legible in
          // flight without the whole thing sitting at full weight.
          const f = Math.min(1, back * 1.4) * ring.amp;
          const inner = Math.max(0, r - BAND);
          b.rings.push({ r, f, i2: inner * inner, o2: (r + BAND) * (r + BAND) });
          stretch(b.x, b.y, r + BAND);
        }
      }

      // Clamp to the viewport, then snap to the fixed grid.
      const x0 = Math.floor(Math.max(minX, 0) / SPACING) * SPACING;
      const y0 = Math.floor(Math.max(minY, 0) / SPACING) * SPACING;
      const x1 = Math.min(maxX, width);
      const y1 = Math.min(maxY, height);
      const reach2 = REACH * REACH;

      // Pure white under `difference` (see Gui.css) inverts the backdrop
      // exactly; anything dimmer only inverts part of the way.
      ctx.fillStyle = "#fff";

      for (let y = y0; y <= y1; y += SPACING) {
        const inTrailY = y >= tMinY && y <= tMaxY;

        for (let x = x0; x <= x1; x += SPACING) {
          let ft = 0; // from the pointer trail
          let fs = 0; // from click waves

          if (inTrailY && x >= tMinX && x <= tMaxX) {
            for (const s of trail) {
              const dx = x - s.x;
              const dy = y - s.y;
              const d2 = dx * dx + dy * dy;
              if (d2 >= reach2) continue;
              // Squared falloff: a soft bell, so dots grow in rather than
              // stepping up at the edge of the reach.
              const g = 1 - d2 / reach2;
              const v = g * g * s.w;
              if (v > ft) ft = v;
            }
          }

          for (const b of splash) {
            const dx = x - b.x;
            const dy = y - b.y;
            const d2 = dx * dx + dy * dy;
            for (const ring of b.rings) {
              // Reject against the band's squared radii first — that keeps the
              // square root for the handful of cells actually inside the wave.
              if (d2 > ring.o2 || d2 < ring.i2) continue;
              // Distance from the ring itself, not from its centre, is what
              // leaves calm paper behind the wave instead of a filled disc.
              const e = 1 - Math.abs(Math.sqrt(d2) - ring.r) / BAND;
              if (e <= 0) continue;
              const v = e * e * ring.f;
              if (v > fs) fs = v;
            }
          }

          const f = ft > fs ? ft : fs;
          if (f <= 0.02) continue;

          // Alpha under `difference` IS the inversion strength — at 1 a dot is
          // a true negative, at 0.5 it only reaches grey and text stops
          // flipping. So weight is controlled by dot *area* instead (MAX_R
          // below), never by dimming: small dots at full strength read light
          // over paper while still flipping any text they land on.
          ctx.globalAlpha = 0.06 + f * 0.9;
          ctx.beginPath();
          // Radius is taken per source, not from the blended value: the wave
          // carries fatter dots than the trail so a click is unmistakable.
          ctx.arc(x, y, Math.max(MAX_R * ft, SPLASH_DOT * fs), 0, TAU);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      const last = trail[trail.length - 1];
      // Big jumps (a tab return, a warp) shouldn't be drawn as a stroke.
      if (last && Math.hypot(e.clientX - last.x, e.clientY - last.y) > 240) {
        trail.length = 0;
      }
      trail.push({ x: e.clientX, y: e.clientY, t: performance.now(), w: 1 });
      if (trail.length > MAX_SAMPLES) trail.shift();
      start();
    };

    const onDown = (e) => {
      if (e.pointerType === "touch") return;
      splash.push({ x: e.clientX, y: e.clientY, t: performance.now(), r: 0, f: 1 });
      if (splash.length > MAX_SPLASH) splash.shift();
      start();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.cursorHidden;
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="ui-halftone-trail" aria-hidden="true" />
  );
}

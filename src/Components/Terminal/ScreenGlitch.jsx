import { useEffect, useRef, useState } from "react";

/* A short full-screen signal fault on every click, in CLI mode.

   Same displacement-band trick the mode-switch warp uses: the bands sample the
   live page through backdrop-filter, so the real terminal tears — nothing is
   cloned into a second copy of the DOM. */

const BANDS = 5;
const LIFE = 300; // ms; must outlast the longest animation in .cli-crash

const rand = (min, max) => min + Math.random() * (max - min);

/* Fresh bands per click. Fixed positions would make every click identical, and
   a glitch that repeats exactly stops reading as a fault. */
function makeBands() {
  return Array.from({ length: BANDS }, (_, i) => ({
    id: i,
    "--t": `${rand(4, 88).toFixed(1)}%`,
    "--h": `${rand(2, 8).toFixed(1)}%`,
    "--x": `${(Math.random() < 0.5 ? -1 : 1) * rand(2.5, 6.5)}%`,
    "--d": `${Math.round(rand(0, 70))}ms`,
  }));
}

export default function ScreenGlitch() {
  const [burst, setBurst] = useState(null);
  const seq = useRef(0);
  const timer = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onDown = (e) => {
      if (e.pointerType === "touch") return;
      seq.current += 1;
      setBurst({ key: seq.current, bands: makeBands() });
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setBurst(null), LIFE);
    };

    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      clearTimeout(timer.current);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  /* The bands above only displace what they *sample* — a backdrop-filter
     re-reads the page at the band's new position, so the strip moves but the
     glyphs never do. Tearing the text means transforming the terminal itself,
     which is what this flag drives (see .terminal-shell in App.css). */
  useEffect(() => {
    if (!burst) return;
    const el = document.documentElement;

    delete el.dataset.cliCrash;
    // Force a reflow between the removal and the re-add. Without it, a second
    // click inside the same burst applies both in one frame, the browser never
    // sees the attribute leave, and the animation carries on instead of
    // restarting.
    void el.offsetWidth;
    el.dataset.cliCrash = "1";

    return () => {
      delete el.dataset.cliCrash;
    };
  }, [burst]);

  if (!burst) return null;

  return (
    // The key remounts the whole overlay per click, which is what restarts the
    // CSS animations — re-rendering in place would leave them mid-flight.
    <div className="cli-crash" key={burst.key} aria-hidden="true">
      {burst.bands.map((b) => {
        const { id, ...vars } = b;
        return <span key={id} className="cli-crash-band" style={vars} />;
      })}
      <span className="cli-crash-rgb cli-crash-rgb-a" />
      <span className="cli-crash-rgb cli-crash-rgb-b" />
    </div>
  );
}

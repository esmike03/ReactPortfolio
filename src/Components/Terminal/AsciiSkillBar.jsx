import { useEffect, useRef } from "react";
import { animate, remove } from "animejs";
import { prefersReducedMotion } from "../../lib/anime-utils";

const FILLED = "█";
const EMPTY = "░";
const DEFAULT_WIDTH = 18;

/**
 * StrictMode-safe: hasRunRef is set in onComplete (not at start), and
 * the cleanup pauses + removes the tween so the StrictMode remount
 * can build a fresh one.
 */
export default function AsciiSkillBar({
  label,
  percent,
  width = DEFAULT_WIDTH,
  start = true,
}) {
  const barRef = useRef(null);
  const numRef = useRef(null);
  const hasRunRef = useRef(false);
  const animRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    if (hasRunRef.current) return;

    const bar = barRef.current;
    const num = numRef.current;
    if (!bar || !num) return;

    const render = (p) => {
      const filled = Math.round((p / 100) * width);
      bar.textContent = FILLED.repeat(filled) + EMPTY.repeat(width - filled);
      num.textContent = `${Math.round(p)}%`;
    };

    if (prefersReducedMotion()) {
      render(percent);
      hasRunRef.current = true;
      return;
    }

    const tracker = { v: 0 };
    animRef.current = animate(tracker, {
      v: percent,
      duration: 900,
      ease: "outExpo",
      onUpdate: () => render(tracker.v),
      onComplete: () => {
        hasRunRef.current = true;
      },
    });

    return () => {
      try {
        animRef.current?.pause?.();
      } catch {
        /* noop */
      }
      remove(tracker);
    };
  }, [start, percent, width]);

  return (
    <div className="font-mono text-xs sm:text-sm flex items-center gap-2 whitespace-pre">
      <span
        className="inline-block min-w-[10ch] sm:min-w-[18ch]"
        style={{ color: "#c9d1d9" }}
      >
        {label}
      </span>
      <span style={{ color: "#8b949e" }}>[</span>
      <span ref={barRef} style={{ color: "#00ff41", letterSpacing: "0.05em" }}>
        {EMPTY.repeat(width)}
      </span>
      <span style={{ color: "#8b949e" }}>]</span>
      <span ref={numRef} style={{ color: "#00ff41", minWidth: "3ch" }}>
        0%
      </span>
    </div>
  );
}

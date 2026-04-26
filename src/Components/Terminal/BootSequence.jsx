import { useEffect, useRef } from "react";
import { createTimeline, stagger, remove } from "animejs";
import { prefersReducedMotion } from "../../lib/anime-utils";
import { useTerminal } from "./TerminalContext";

const BOOT_LINES = [
  { type: "info", text: "Initializing Mike's Portfolio v1.0..." },
  { type: "ok", text: "Loading kernel modules        " },
  { type: "ok", text: "Mounting React 19 runtime     " },
  { type: "ok", text: "Starting TailwindCSS engine   " },
  { type: "ok", text: "anime.js v4 — tree-shaken     " },
  { type: "ok", text: "Loading projects              " },
  { type: "ok", text: "Mounting skills               " },
  { type: "ok", text: "All services started.         " },
  { type: "info", text: "Welcome, visitor — type `ls` to look around." },
];

const BADGE_COLORS = {
  ok: "#00ff41",
  info: "#58a6ff",
  warn: "#f0ad4e",
  err: "#ff5555",
};

const BADGE_TEXT = {
  ok: "  OK  ",
  info: " INFO ",
  warn: " WARN ",
  err: " FAIL ",
};

/**
 * One-time boot animation.
 *
 * BUG FIX NOTES — why this only runs once:
 *  1. useEffect has an EMPTY dependency array [].
 *  2. A useRef flag (hasBootedRef) guards against React 18+ StrictMode's
 *     intentional double-invocation in development. Without this guard
 *     the timeline would play twice in dev.
 *  3. anime.js progress is written via DOM refs/inline style — we never
 *     call setState inside onUpdate, so the running tween can't trigger
 *     React re-renders that re-run effects.
 *  4. Cleanup pauses the timeline AND calls anime's `remove()` on the
 *     animated targets, ensuring the tween is fully detached if React
 *     unmounts the component (e.g., dev-mode strict remount).
 *  5. Boot completion state lives in TerminalContext (lifted to a parent
 *     provider), so even if this component re-mounts the boot won't
 *     replay — the hasBootedRef stays scoped to the lifetime of the
 *     mounted instance, and the parent context already shows bootDone.
 */
export default function BootSequence() {
  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const hasBootedRef = useRef(false);
  const { bootDone, finishBoot } = useTerminal();

  useEffect(() => {
    // If the parent context already says boot is done (e.g., this component
    // re-mounted after some HMR or remount), do nothing.
    if (bootDone) return;

    // Guard against re-runs AFTER a successful boot (e.g., later HMR).
    // We DO NOT flip this flag here, because StrictMode runs the effect
    // twice on initial mount (effect → cleanup → effect). If we flipped
    // it now, the cleanup would pause the timeline before onComplete and
    // the second invocation would bail with the timeline never running.
    // Instead the flag is flipped inside onComplete, where it correctly
    // signals "boot has actually finished".
    if (hasBootedRef.current) return;

    const root = rootRef.current;
    if (!root) return;

    const lines = Array.from(root.querySelectorAll(".boot-line"));
    if (lines.length === 0) return;

    if (prefersReducedMotion()) {
      lines.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      hasBootedRef.current = true;
      finishBoot();
      return;
    }

    lines.forEach((el) => {
      el.style.willChange = "opacity, transform";
    });

    const tl = createTimeline({
      defaults: { duration: 240, ease: "outQuad" },
      onComplete: () => {
        hasBootedRef.current = true; // ← only flip on actual completion
        lines.forEach((el) => {
          el.style.willChange = "auto";
        });
        finishBoot();
      },
    });

    tl.add(lines, {
      opacity: [0, 1],
      translateX: [-10, 0],
      delay: stagger(140),
    });

    timelineRef.current = tl;

    return () => {
      try {
        timelineRef.current?.pause?.();
      } catch {
        /* noop */
      }
      // Detach anime from these targets so a subsequent remount can't
      // resume mid-flight.
      remove(lines);
    };
  }, []); // ← EMPTY DEPS: this effect runs ONCE per mount

  return (
    <div
      ref={rootRef}
      className="boot-sequence text-xs sm:text-sm leading-relaxed mb-4"
    >
      {BOOT_LINES.map((line, i) => (
        <div
          key={i}
          className="boot-line"
          style={{ opacity: 0, transform: "translateX(-10px)" }}
        >
          <span style={{ color: "#8b949e" }}>[</span>
          <span style={{ color: BADGE_COLORS[line.type], fontWeight: 600 }}>
            {BADGE_TEXT[line.type]}
          </span>
          <span style={{ color: "#8b949e" }}>]</span>{" "}
          <span style={{ color: "#c9d1d9" }}>{line.text}</span>
        </div>
      ))}
    </div>
  );
}

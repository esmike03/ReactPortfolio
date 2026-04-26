import { useEffect, useRef } from "react";
import { createTimeline, stagger, remove } from "animejs";
import { prefersReducedMotion } from "../../lib/anime-utils";
import { useTerminal } from "./TerminalContext";

// ── Phase 1: BIOS / POST ──────────────────────────────────
const BIOS_LINES = [
  "SYNTAX BIOS 4.7.0 — (c) 2026 mike@portfolio",
  "> mem.check ............. PASS",
  "> gpu.detect ............ anime.js v4",
  "> kernel.load ........... react 19",
];

// ── Phase 2: ANSI Shadow logo (MIKE) ──────────────────────
const LOGO = [
  "███╗   ███╗██╗██╗  ██╗███████╗",
  "████╗ ████║██║██║ ██╔╝██╔════╝",
  "██╔████╔██║██║█████╔╝ █████╗  ",
  "██║╚██╔╝██║██║██╔═██╗ ██╔══╝  ",
  "██║ ╚═╝ ██║██║██║  ██╗███████╗",
  "╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝",
];

// ── Phase 3: module init with progress bars ───────────────
const MODULES = [
  { id: "kernel", label: "kernel core" },
  { id: "react", label: "react runtime" },
  { id: "tailwind", label: "tailwind engine" },
  { id: "animejs", label: "anime.js v4" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "core skills" },
];

// ── Phase 4: ready ────────────────────────────────────────
const READY = [
  { type: "ok", text: "All services started." },
  { type: "info", text: "Welcome — type `help` to look around." },
];

const BAR_WIDTH = 14;
const FILLED = "█";

/**
 * Multi-phase boot animation. One anime.js timeline drives:
 *   1. BIOS / POST  (rapid fade-in, ~500ms)
 *   2. ASCII logo   (rows slide+fade, subtitle pop, ~700ms)
 *   3. Module loader with horizontal progress bars (~900ms)
 *   4. Ready / welcome lines (~600ms)
 *
 * StrictMode-safe: hasBootedRef is flipped only inside onComplete so
 * the dev mount→cleanup→mount cycle re-creates a fresh timeline cleanly.
 */
export default function BootSequence() {
  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const hasBootedRef = useRef(false);
  const { bootDone, finishBoot } = useTerminal();

  useEffect(() => {
    if (bootDone || hasBootedRef.current) return;

    const root = rootRef.current;
    if (!root) return;

    const biosLines = Array.from(root.querySelectorAll(".bios-line"));
    const logoRows = Array.from(root.querySelectorAll(".logo-row"));
    const logoSub = root.querySelector(".logo-sub");
    const moduleRows = Array.from(root.querySelectorAll(".module-row"));
    const moduleBars = Array.from(root.querySelectorAll(".module-bar-fill"));
    const readyLines = Array.from(root.querySelectorAll(".ready-line"));

    const allEls = [
      ...biosLines,
      ...logoRows,
      ...moduleRows,
      ...readyLines,
      ...moduleBars,
      ...(logoSub ? [logoSub] : []),
    ];

    if (prefersReducedMotion()) {
      [...biosLines, ...logoRows, ...moduleRows, ...readyLines].forEach(
        (el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        },
      );
      moduleBars.forEach((b) => {
        b.style.transform = "scaleX(1)";
      });
      if (logoSub) {
        logoSub.style.opacity = "1";
        logoSub.style.transform = "none";
      }
      hasBootedRef.current = true;
      finishBoot();
      return;
    }

    allEls.forEach((el) => {
      el.style.willChange = "opacity, transform";
    });

    const tl = createTimeline({
      defaults: { ease: "outQuad" },
      onComplete: () => {
        hasBootedRef.current = true;
        allEls.forEach((el) => {
          el.style.willChange = "auto";
        });
        finishBoot();
      },
    });

    // Phase 1 — BIOS quick scan
    tl.add(
      biosLines,
      {
        opacity: [0, 1],
        translateX: [-4, 0],
        duration: 200,
        delay: stagger(80),
      },
      0,
    );

    // Phase 2 — Logo rows (cascading reveal)
    tl.add(
      logoRows,
      {
        opacity: [0, 1],
        translateY: [6, 0],
        duration: 280,
        delay: stagger(60),
      },
      520,
    );

    // Phase 2b — Subtitle pop
    if (logoSub) {
      tl.add(
        logoSub,
        {
          opacity: [0, 1],
          scale: [0.92, 1],
          duration: 380,
        },
        940,
      );
    }

    // Phase 3a — Module rows fade in
    tl.add(
      moduleRows,
      {
        opacity: [0, 1],
        translateX: [-8, 0],
        duration: 220,
        delay: stagger(110),
      },
      1300,
    );

    // Phase 3b — Bars sweep-fill (scaleX 0→1 from left edge)
    tl.add(
      moduleBars,
      {
        scaleX: [0, 1],
        duration: 280,
        ease: "outExpo",
        delay: stagger(110),
      },
      1300,
    );

    // Phase 4 — Ready / welcome
    tl.add(
      readyLines,
      {
        opacity: [0, 1],
        translateX: [-6, 0],
        duration: 320,
        delay: stagger(180),
      },
      2200,
    );

    timelineRef.current = tl;

    return () => {
      try {
        timelineRef.current?.pause?.();
      } catch {
        /* noop */
      }
      remove(allEls);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={rootRef}
      className="boot-sequence font-mono leading-relaxed mb-4"
    >
      {/* ───── Phase 1: BIOS ───── */}
      <div className="text-[11px] sm:text-xs mb-2">
        {BIOS_LINES.map((text, i) => (
          <div
            key={i}
            className="bios-line"
            style={{
              opacity: 0,
              transform: "translateX(-4px)",
              color: "#6a737d",
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* ───── Phase 2: ASCII Logo ───── */}
      <div className="my-3">
        <pre
          className="boot-logo m-0 leading-none whitespace-pre"
          style={{
            color: "#00ff41",
            fontSize: "clamp(7px, 2.4vw, 13px)",
            textShadow: "0 0 8px rgba(0,255,65,0.45)",
          }}
        >
          {LOGO.map((row, i) => (
            <span
              key={i}
              className="logo-row block"
              style={{ opacity: 0, transform: "translateY(6px)" }}
            >
              {row}
            </span>
          ))}
        </pre>
        <div
          className="logo-sub text-[10px] sm:text-xs tracking-[0.4em] mt-1"
          style={{
            opacity: 0,
            transform: "scale(0.92)",
            color: "#00ff41",
            textShadow: "0 0 6px rgba(0,255,65,0.35)",
          }}
        >
          [ port-folio.os v1.0 ]
        </div>
      </div>

      {/* ───── Phase 3: Module loader ───── */}
      <div className="my-2 space-y-0.5 text-[11px] sm:text-xs">
        {MODULES.map((m) => (
          <div
            key={m.id}
            className="module-row flex items-center gap-2"
            style={{ opacity: 0, transform: "translateX(-8px)" }}
          >
            <span style={{ color: "#8b949e" }}>[</span>

            <span
              className="module-bar"
              style={{
                position: "relative",
                display: "inline-block",
                width: `${BAR_WIDTH}ch`,
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              {/* Track */}
              <span
                aria-hidden="true"
                style={{
                  color: "#21262d",
                  whiteSpace: "pre",
                  display: "inline-block",
                }}
              >
                {FILLED.repeat(BAR_WIDTH)}
              </span>
              {/* Fill — animated via scaleX from anime.js */}
              <span
                className="module-bar-fill"
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  color: "#00ff41",
                  whiteSpace: "pre",
                  transformOrigin: "0% 50%",
                  transform: "scaleX(0)",
                  textShadow: "0 0 4px rgba(0,255,65,0.4)",
                }}
              >
                {FILLED.repeat(BAR_WIDTH)}
              </span>
            </span>

            <span style={{ color: "#8b949e" }}>]</span>
            <span style={{ color: "#c9d1d9" }} className="truncate">
              {m.label}
            </span>
            <span
              style={{ color: "#00ff41", fontWeight: 600, marginLeft: "auto" }}
            >
              OK
            </span>
          </div>
        ))}
      </div>

      {/* ───── Phase 4: Ready ───── */}
      <div className="mt-3 text-[11px] sm:text-xs">
        {READY.map((line, i) => (
          <div
            key={i}
            className="ready-line"
            style={{ opacity: 0, transform: "translateX(-6px)" }}
          >
            <span style={{ color: "#8b949e" }}>[</span>
            <span
              style={{
                color: line.type === "ok" ? "#00ff41" : "#58a6ff",
                fontWeight: 600,
              }}
            >
              {line.type === "ok" ? "  OK  " : " INFO "}
            </span>
            <span style={{ color: "#8b949e" }}>]</span>{" "}
            <span style={{ color: "#c9d1d9" }}>{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

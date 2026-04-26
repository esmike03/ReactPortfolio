import { useEffect, useRef, useState } from "react";
import { createTimeline, svg } from "animejs";
import { prefersReducedMotion } from "../lib/anime-utils";

export default function IntroScreen({ onComplete }) {
  const rootRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const finish = () => {
      setHidden(true);
      onComplete?.();
    };

    if (prefersReducedMotion()) {
      const t = setTimeout(finish, 200);
      return () => clearTimeout(t);
    }

    const root = rootRef.current;
    if (!root) {
      finish();
      return;
    }

    const q = (sel) => root.querySelector(sel);
    const qa = (sel) => Array.from(root.querySelectorAll(sel));

    let drawTargets = [];
    try {
      drawTargets = svg.createDrawable(qa(".intro-draw"));
    } catch {
      // graceful fallback if no draw targets
      drawTargets = qa(".intro-draw");
    }

    const tl = createTimeline({
      defaults: { ease: "outExpo" },
      onComplete: finish,
    });

    tl.add(
      drawTargets,
      {
        draw: ["0 0", "0 1"],
        duration: 900,
        ease: "inOutQuad",
      },
      0,
    )
      .add(
        q(".intro-bracket-l"),
        { opacity: [0, 1], translateX: [-24, 0], duration: 500 },
        300,
      )
      .add(
        q(".intro-name"),
        { opacity: [0, 1], translateY: [16, 0], scale: [0.92, 1], duration: 600 },
        450,
      )
      .add(
        q(".intro-bracket-r"),
        { opacity: [0, 1], translateX: [24, 0], duration: 500 },
        500,
      )
      .add(
        q(".intro-tagline"),
        { opacity: [0, 0.9], translateY: [8, 0], duration: 500 },
        750,
      )
      .add(
        q(".intro-progress-fill"),
        { scaleX: [0, 1], duration: 800, ease: "inOutQuad" },
        300,
      )
      .add(
        root,
        { opacity: [1, 0], duration: 550, ease: "inQuad" },
        "+=350",
      );

    return () => {
      try {
        tl.pause?.();
        tl.cancel?.();
      } catch {
        // noop
      }
    };
  }, [onComplete]);

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="intro-screen fixed inset-0 z-[10000] flex items-center justify-center"
      style={{
        background: "var(--bg-primary)",
        fontFamily: "var(--font-mono)",
        willChange: "opacity",
      }}
      aria-hidden="true"
    >
      {/* Decorative drawn SVG frame */}
      <svg
        viewBox="0 0 400 200"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="absolute pointer-events-none"
        style={{ maxWidth: 320, opacity: 0.55 }}
      >
        <path
          className="intro-draw"
          d="M 20 40 L 60 40"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="intro-draw"
          d="M 340 160 L 380 160"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="intro-draw"
          d="M 20 40 L 20 80"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          className="intro-draw"
          d="M 380 160 L 380 120"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <div
        className="flex items-center gap-2 relative"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span
          className="intro-bracket-l text-4xl md:text-6xl font-bold"
          style={{ color: "var(--accent)", opacity: 0 }}
        >
          &lt;
        </span>
        <span
          className="intro-name text-4xl md:text-6xl font-extrabold tracking-widest"
          style={{ color: "var(--text-primary)", opacity: 0 }}
        >
          em
        </span>
        <span
          className="intro-bracket-r text-4xl md:text-6xl font-bold"
          style={{ color: "var(--accent)", opacity: 0 }}
        >
          /&gt;
        </span>
      </div>

      <p
        className="intro-tagline absolute text-[10px] md:text-xs tracking-[0.3em] uppercase"
        style={{
          bottom: "30%",
          color: "var(--accent)",
          opacity: 0,
        }}
      >
        booting portfolio_
      </p>

      <div
        className="absolute"
        style={{
          bottom: "22%",
          width: "min(220px, 60vw)",
          height: 2,
          background: "rgba(0,229,255,0.12)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          className="intro-progress-fill"
          style={{
            width: "100%",
            height: "100%",
            background: "var(--accent)",
            transformOrigin: "0% 50%",
            transform: "scaleX(0)",
            boxShadow: "0 0 8px var(--accent-glow)",
          }}
        />
      </div>
    </div>
  );
}

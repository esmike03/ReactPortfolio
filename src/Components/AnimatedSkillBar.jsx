import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "../lib/anime-utils";

export default function AnimatedSkillBar({ label, percent, icon = null }) {
  const fillRef = useRef(null);
  const numRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const fill = fillRef.current;
    const num = numRef.current;
    const root = rootRef.current;
    if (!fill || !num || !root) return;

    if (prefersReducedMotion()) {
      fill.style.transform = "scaleX(1)";
      num.textContent = `${percent}%`;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;

        fill.style.willChange = "transform";
        animate(fill, {
          scaleX: [0, percent / 100],
          duration: 1100,
          ease: "outExpo",
          onComplete: () => {
            fill.style.willChange = "auto";
          },
        });

        const obj = { v: 0 };
        animate(obj, {
          v: percent,
          duration: 1100,
          ease: "outExpo",
          onUpdate: () => {
            num.textContent = `${Math.round(obj.v)}%`;
          },
        });

        obs.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [percent]);

  return (
    <div ref={rootRef} className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between text-xs">
        <span
          className="inline-flex items-center gap-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {icon}
          {label}
        </span>
        <span ref={numRef} style={{ color: "var(--accent)" }}>
          0%
        </span>
      </div>
      <div
        className="w-full h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(0,229,255,0.08)" }}
      >
        <div
          ref={fillRef}
          className="h-full rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--accent), var(--accent-secondary))",
            transformOrigin: "0% 50%",
            transform: "scaleX(0)",
            boxShadow: "0 0 8px var(--accent-glow)",
          }}
        />
      </div>
    </div>
  );
}

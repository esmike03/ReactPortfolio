import { useEffect, useRef } from "react";
import { animate, remove } from "animejs";
import { prefersReducedMotion } from "../../lib/anime-utils";

/**
 * Animates `text` character-by-character into a span.
 * Writes via ref.textContent — does NOT call setState during onUpdate,
 * so the anime tween can never trigger a React re-render loop.
 */
export default function TypedText({
  text,
  speed = 28,
  start = true,
  onComplete,
  className = "",
  style = {},
}) {
  const elRef = useRef(null);
  const animRef = useRef(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!start) return;
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const el = elRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = text;
      onComplete?.();
      return;
    }

    const tracker = { i: 0 };
    animRef.current = animate(tracker, {
      i: text.length,
      duration: Math.max(120, text.length * speed),
      ease: "linear",
      onUpdate: () => {
        if (el) el.textContent = text.slice(0, Math.round(tracker.i));
      },
      onComplete: () => {
        if (el) el.textContent = text;
        onComplete?.();
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
  }, [start, text, speed, onComplete]);

  return <span ref={elRef} className={className} style={style} />;
}

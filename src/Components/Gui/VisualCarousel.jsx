import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY } from "../Terminal/data";

const AUTOPLAY_MS = 5200;
const SWIPE_PX = 55;

/* Shortest circular distance from the active slide, so the deck wraps. */
function circularOffset(i, active, count) {
  let d = i - active;
  const half = count / 2;
  if (d > half) d -= count;
  if (d < -half) d += count;
  return d;
}

export default function VisualCarousel() {
  const count = GALLERY.length;
  // With few slides, only the immediate neighbours may peek — otherwise the
  // same image would show on both sides of the deck.
  const peek = Math.max(1, Math.floor((count - 1) / 2));

  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const [paused, setPaused] = useState(false);
  const [rising, setRising] = useState(null);
  const startX = useRef(null);
  const moved = useRef(false);
  const pressed = useRef(null);
  const pointerHandled = useRef(false);
  const riseTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(riseTimer.current), []);

  const go = useCallback(
    (dir) => setActive((i) => (i + dir + count) % count),
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, go]);

  const activate = useCallback(
    (i, isActive) => {
      if (isActive) {
        go(1);
        return;
      }
      // Promote the pressed neighbour, letting it lift as it swings in.
      setActive(i);
      setRising(i);
      window.clearTimeout(riseTimer.current);
      riseTimer.current = window.setTimeout(() => setRising(null), 340);
    },
    [go],
  );

  // Which slide the press started on. Resolving it at pointerdown avoids
  // relying on the click landing on the same element — the deck shifts and
  // re-renders between press and release. No setPointerCapture either:
  // capturing retargets the click away from the slides entirely.
  const onPointerDown = (e) => {
    startX.current = e.clientX;
    moved.current = false;
    pointerHandled.current = false;
    const slide = e.target.closest?.("[data-idx]");
    pressed.current = slide ? Number(slide.dataset.idx) : null;
    setPaused(true);
  };

  const onPointerMove = (e) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDrag(dx);
  };

  const onPointerUp = () => {
    if (startX.current === null) return;
    if (Math.abs(drag) > SWIPE_PX) {
      go(drag < 0 ? 1 : -1);
    } else if (!moved.current && pressed.current !== null) {
      activate(pressed.current, pressed.current === active);
      pointerHandled.current = true;
    }
    startX.current = null;
    pressed.current = null;
    setDrag(0);
    setPaused(false);
  };

  // Keyboard activation only — pointer presses are handled above.
  const onSlideClick = (i, isActive) => {
    if (pointerHandled.current || moved.current) return;
    activate(i, isActive);
  };

  const onKeyDown = (e) => {
    pointerHandled.current = false; // keyboard path must not be swallowed
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  return (
    <div
      className="ui-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`ui-stage ${drag ? "is-dragging" : ""}`}
        role="group"
        aria-roledescription="carousel"
        aria-label="Visual work"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ "--drag": `${drag * 0.28}px` }}
      >
        {GALLERY.map((g, i) => {
          const d = circularOffset(i, active, count);
          const away = Math.abs(d);
          const hidden = away > peek;
          const isActive = d === 0;

          return (
            <figure
              key={g.src}
              data-idx={i}
              className={`ui-slide ${isActive ? "is-active" : ""} ${
                rising === i ? "is-rising" : ""
              }`}
              aria-hidden={hidden || undefined}
              style={{
                // Neighbours fan away from the centre — the left one tips left,
                // the right one tips right — like photos laid out askew.
                // --lift is set in CSS (hover / .is-rising) so it can animate
                // through the same transform transition.
                transform: `translateX(-50%) translateX(${
                  d * 64
                }%) translateY(var(--lift, 0px)) translateZ(${
                  isActive ? 0 : -190
                }px) rotateY(${d * -18}deg) rotate(${d * 12}deg) scale(${
                  isActive ? 1 : 0.88
                })`,
                opacity: hidden ? 0 : isActive ? 1 : 0.45,
                zIndex: 10 - away,
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              {/* The picture itself is the control: the centre one advances,
                  a neighbour brings itself forward. */}
              <button
                type="button"
                onClick={() => onSlideClick(i, isActive)}
                aria-label={
                  isActive
                    ? "Next image"
                    : `Show ${g.caption ?? g.alt}`
                }
              >
                <img
                  src={g.src}
                  alt={isActive ? g.alt : ""}
                  draggable="false"
                />
              </button>
            </figure>
          );
        })}
      </div>

      <div className="ui-carousel-bar">
        <p className="ui-carousel-caption" key={active}>
          <span>{GALLERY[active].caption ?? GALLERY[active].alt}</span>
          <span className="ui-carousel-count">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
        </p>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GALLERY } from "../Terminal/data";
import useMagnet from "./useMagnet";

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
  // Set when a drag crosses the swipe threshold, so the click that follows it
  // is ignored rather than activating whichever slide it landed on.
  const swiped = useRef(false);
  const riseTimer = useRef(null);
  const magnet = useMagnet();

  const current = GALLERY[active];

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
      // Rotate the deck so the pressed picture comes to the front — the same
      // move the next button makes, just aimed at a specific slide.
      setActive(i);
      setRising(i);
      window.clearTimeout(riseTimer.current);
      riseTimer.current = window.setTimeout(() => setRising(null), 340);
    },
    [go],
  );

  // The pointer handlers own dragging only. Taps are left to the browser's
  // own click event on each slide's <button> — it already knows that a click
  // means press and release on the same element, and it resolves that against
  // the deck's 3D layout for us. Reimplementing it here on pointerup is what
  // kept swallowing clicks on the angled, half-occluded peeking slides.
  const onPointerDown = (e) => {
    startX.current = e.clientX;
    swiped.current = false;
    // Dragging takes over the pointer, so drop any magnet offset first.
    const slide = e.target.closest?.("[data-idx]");
    if (slide) magnet.clear(slide);
    setPaused(true);
  };

  const onPointerMove = (e) => {
    if (startX.current === null) return;
    setDrag(e.clientX - startX.current);
  };

  const onPointerUp = (e) => {
    if (startX.current === null) return;
    // Measured off the event, not the `drag` state, which trails a render
    // behind — a quick gesture could otherwise be judged on a stale distance.
    const dx = (e?.clientX ?? startX.current) - startX.current;

    if (Math.abs(dx) > SWIPE_PX) {
      go(dx < 0 ? 1 : -1);
      // A drag still ends in a click if it finishes over a slide; mark it so
      // that click doesn't also activate whatever it happened to land on.
      swiped.current = true;
    }

    startX.current = null;
    setDrag(0);
    setPaused(false);
  };

  // The single activation path — mouse, touch, pen and keyboard alike.
  const onSlideClick = (i, isActive) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    activate(i, isActive);
  };

  const onKeyDown = (e) => {
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
              onMouseMove={(e) => {
                // A drag in progress owns the pointer — don't fight it.
                if (startX.current !== null) return;
                magnet.onMouseMove(e);
              }}
              onMouseLeave={magnet.onMouseLeave}
              style={{
                // Neighbours fan away from the centre — the left one tips left,
                // the right one tips right — like photos laid out askew.
                // --lift is set in CSS (hover / .is-rising) so it can animate
                // through the same transform transition.
                // --zoom is the hover cue, applied to the whole frame so the
                // artwork can't be clipped by the frame's own overflow.
                transform: `translateX(-50%) translateX(${
                  d * 64
                }%) translateY(var(--lift, 0px)) translateZ(${
                  isActive ? 0 : -190
                }px) rotateY(${d * -18}deg) rotate(${
                  d * 12
                }deg) scale(calc(${isActive ? 1 : 0.88} * var(--zoom, 1)))`,
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
        {/* Re-keyed on the picture so the caption replays its fade on change. */}
        <p className="ui-carousel-caption" key={current.src}>
          <span>{current.caption ?? current.alt}</span>
          <span className="ui-carousel-count">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </span>
        </p>

        {/* Outside .ui-stage, so these never trip its drag handlers. */}
        <div className="ui-carousel-nav">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            <FiArrowLeft aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next image">
            <FiArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

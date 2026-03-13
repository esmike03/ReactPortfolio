import { useEffect, useState, useRef } from "react";

export default function Cursor({ isDarkMode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [locked, setLocked] = useState(false);
  const [lockPosition, setLockPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);
  const rawPos = useRef({ x: 0, y: 0 });

  const accent = "var(--accent)";
  const accentGlow = "var(--accent-glow)";
  const dotSize = 4;
  const lineLen = 12;
  const lineThick = 1;
  const gap = 22;

  // Smooth follow via rAF lerp
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      setSmoothPos((prev) => ({
        x: lerp(prev.x, rawPos.current.x, 0.12),
        y: lerp(prev.y, rawPos.current.y, 0.12),
      }));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      rawPos.current = { x: e.clientX, y: e.clientY };
      if (!locked) setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [locked]);

  useEffect(() => {
    const onOver = (e) => {
      const target = e.target.closest(".cursor-target");
      if (target) {
        const rect = target.getBoundingClientRect();
        setLocked(true);
        setLockPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };
    const onOut = (e) => {
      if (e.target.closest(".cursor-target")) setLocked(false);
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  const cx = locked ? lockPosition.x : smoothPos.x;
  const cy = locked ? lockPosition.y : smoothPos.y;

  if (!visible) return null;

  const corners = [
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ];

  return (
    <>
      {/* ── Crosshair (unlocked) ── */}
      {!locked && (
        <>
          <div
            className="fixed pointer-events-none z-[9999]"
            style={{
              top: cy,
              left: 0,
              width: cx - gap,
              height: lineThick,
              background: `linear-gradient(to right, transparent, ${accent})`,
              opacity: 0.6,
            }}
          />
          <div
            className="fixed pointer-events-none z-[9999]"
            style={{
              top: cy,
              left: cx + gap,
              right: 0,
              height: lineThick,
              background: `linear-gradient(to left, transparent, ${accent})`,
              opacity: 0.6,
            }}
          />
          <div
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: cx,
              top: 0,
              width: lineThick,
              height: cy - gap,
              background: `linear-gradient(to bottom, transparent, ${accent})`,
              opacity: 0.6,
            }}
          />
          <div
            className="fixed pointer-events-none z-[9999]"
            style={{
              left: cx,
              top: cy + gap,
              bottom: 0,
              width: lineThick,
              background: `linear-gradient(to top, transparent, ${accent})`,
              opacity: 0.6,
            }}
          />
        </>
      )}

      {/* ── Locked: spinning corner brackets + pulse ring ── */}
      {locked && (
        <div
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: cx,
            top: cy,
            width: 0,
            height: 0,
            animation: "cur-spin 4s linear infinite",
          }}
        >
          {/* Pulse ring */}
          <div
            style={{
              position: "absolute",
              width: (gap + lineLen) * 2,
              height: (gap + lineLen) * 2,
              left: -(gap + lineLen),
              top: -(gap + lineLen),
              borderRadius: "50%",
              border: `1px solid ${accent}`,
              opacity: 0.15,
              animation: "cur-ping 1.5s ease-out infinite",
            }}
          />

          {corners.map((corner, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: corner.x * (gap + lineLen),
                top: corner.y * (gap + lineLen),
              }}
            >
              <div
                style={{
                  width: lineLen,
                  height: lineThick + 0.5,
                  backgroundColor: accent,
                  transform: `translateX(${corner.x === -1 ? 0 : -lineLen}px)`,
                  boxShadow: `0 0 6px ${accentGlow}`,
                }}
              />
              <div
                style={{
                  width: lineThick + 0.5,
                  height: lineLen,
                  backgroundColor: accent,
                  transform: `translateY(${corner.y === -1 ? 0 : -lineLen}px)`,
                  boxShadow: `0 0 6px ${accentGlow}`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Center dot ── */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full"
        style={{
          width: dotSize,
          height: dotSize,
          backgroundColor: accent,
          left: cx - dotSize / 2,
          top: cy - dotSize / 2,
          transition: locked ? "all 0.15s ease-out" : "none",
          boxShadow: `0 0 8px ${accent}`,
        }}
      />

      <style>{`
        * { cursor: none !important; }

        @keyframes cur-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes cur-ping {
          0%   { transform: scale(0.8); opacity: 0.3; }
          70%  { transform: scale(1.2); opacity: 0;   }
          100% { transform: scale(1.2); opacity: 0;   }
        }
      `}</style>
    </>
  );
}

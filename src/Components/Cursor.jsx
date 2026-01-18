import { useEffect, useState } from "react";

export default function Cursor({ isDarkMode }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [locked, setLocked] = useState(false);
  const [lockPosition, setLockPosition] = useState({ x: 0, y: 0 });

  const color = isDarkMode ? "white" : "black"; // dynamic color
  const dotSize = 5;
  const lineLength = 10; 
  const lineThickness = 2;
  const gap = 20;

  useEffect(() => {
    const moveCursor = (e) => {
      if (!locked) setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [locked]);

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest(".cursor-target")) {
        const rect = e.target.getBoundingClientRect();
        setLocked(true);
        setLockPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest(".cursor-target")) setLocked(false);
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  const cursorX = locked ? lockPosition.x : position.x;
  const cursorY = locked ? lockPosition.y : position.y;

  const corners = [
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: 1 },
  ];

  return (
    <>
      {!locked ? (
        <>
          {/* Crosshair lines */}
          <div
            className="fixed pointer-events-none z-50"
            style={{ top: cursorY, left: 0, width: `${cursorX - gap}px`, height: "1px", backgroundColor: color }}
          />
          <div
            className="fixed pointer-events-none z-50"
            style={{ top: cursorY, left: `${cursorX + gap}px`, right: 0, height: "1px", backgroundColor: color }}
          />
          <div
            className="fixed pointer-events-none z-50"
            style={{ left: cursorX, top: 0, width: "1px", height: `${cursorY - gap}px`, backgroundColor: color }}
          />
          <div
            className="fixed pointer-events-none z-50"
            style={{ left: cursorX, top: `${cursorY + gap}px`, bottom: 0, width: "1px", backgroundColor: color }}
          />
        </>
      ) : (
        // Rotating cut square
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: cursorX,
            top: cursorY,
            width: 0,
            height: 0,
            transformOrigin: "center",
            animation: "spin 5s linear infinite",
          }}
        >
          {corners.map((corner, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${corner.x * (gap + lineLength)}px`,
                top: `${corner.y * (gap + lineLength)}px`,
                transition: "all 0.2s ease-out",
              }}
            >
              {/* Horizontal line */}
              <div
                style={{
                  width: `${lineLength}px`,
                  height: `${lineThickness}px`,
                  backgroundColor: color,
                  transform: `translateX(${corner.x === -1 ? 0 : -lineLength}px)`,
                  transition: "all 0.2s ease-out",
                }}
              />
              {/* Vertical line */}
              <div
                style={{
                  width: `${lineThickness}px`,
                  height: `${lineLength}px`,
                  backgroundColor: color,
                  transform: `translateY(${corner.y === -1 ? 0 : -lineLength}px)`,
                  transition: "all 0.2s ease-out",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Center dot */}
      <div
        className="fixed rounded-full pointer-events-none z-50"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: color,
          left: `${cursorX - dotSize / 2}px`,
          top: `${cursorY - dotSize / 2}px`,
          transition: "all 0.1s ease-out",
        }}
      />

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
}

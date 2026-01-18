import React from "react";

export default function CutSquareHover({ children, isDarkMode }) {
  const color = isDarkMode ? "white" : "black"; // dynamic color

  return (
    <div className="relative inline-block group cursor-pointer hover:scale-105">
      {children}

      {/* Top-left corner */}
      <span
        className={`absolute top-0 left-0 w-4 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-slide-corner`}
        style={{ backgroundColor: color }}
      />
      <span
        className={`absolute top-0 left-0 w-0.5 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-slide-corner`}
        style={{ backgroundColor: color }}
      />

      {/* Top-right corner */}
      <span
        className={`absolute top-0 right-0 w-4 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-slide-corner`}
        style={{ backgroundColor: color }}
      />
      <span
        className={`absolute top-0 right-0 w-0.5 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-slide-corner`}
        style={{ backgroundColor: color }}
      />

      {/* Bottom-left corner */}
      <span
        className={`absolute bottom-0 left-0 w-4 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-slide-corner`}
        style={{ backgroundColor: color }}
      />
      <span
        className={`absolute bottom-0 left-0 w-0.5 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-slide-corner`}
        style={{ backgroundColor: color }}
      />

      {/* Bottom-right corner */}
      <span
        className={`absolute bottom-0 right-0 w-4 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-slide-corner`}
        style={{ backgroundColor: color }}
      />
      <span
        className={`absolute bottom-0 right-0 w-0.5 h-4 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-slide-corner`}
        style={{ backgroundColor: color }}
      />

      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }

          @keyframes slide-corner {
            0% { transform: scale(0.5); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }

          .animate-slide-corner {
            transform-origin: center;
            animation: none;
          }

          .group:hover .animate-slide-corner {
            animation: slide-corner 0.5s forwards, pulse-slow 2s infinite;
          }
        `}
      </style>
    </div>
  );
}

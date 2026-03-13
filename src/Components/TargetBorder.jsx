import React from "react";

const CORNERS = [
  { cls: "top-0 left-0", origin: "0% 0%" },
  { cls: "top-0 right-0", origin: "100% 0%" },
  { cls: "bottom-0 left-0", origin: "0% 100%" },
  { cls: "bottom-0 right-0", origin: "100% 100%" },
];

export default function TargetBorder({ children }) {
  return (
    <div className="tb-root relative inline-block cursor-pointer">
      {children}

      {CORNERS.map(({ cls, origin }) => (
        <React.Fragment key={cls}>
          {/* horizontal bar */}
          <span
            className={`tb-bar absolute ${cls} h-px w-4`}
            style={{ transformOrigin: origin }}
          />
          {/* vertical bar */}
          <span
            className={`tb-bar absolute ${cls} w-px h-4`}
            style={{ transformOrigin: origin }}
          />
        </React.Fragment>
      ))}

      <style>{`
        .tb-bar {
          background-color: var(--accent);
          opacity: 0;
          transform: scale(0.3);
          transition: none;
        }

        .tb-root:hover .tb-bar {
          animation: tb-in 0.35s cubic-bezier(.22,.68,0,1.2) forwards,
                     tb-pulse 2.5s ease-in-out 0.35s infinite;
        }

        @keyframes tb-in {
          0%   { opacity: 0; transform: scale(0.3); }
          65%  { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1);   }
        }

        @keyframes tb-pulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

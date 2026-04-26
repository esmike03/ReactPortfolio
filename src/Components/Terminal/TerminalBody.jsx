export default function TerminalBody({ children }) {
  return (
    <div
      className="terminal-body relative flex-1 px-3 sm:px-5 py-4 sm:py-5 text-xs sm:text-sm leading-relaxed"
      style={{
        background: "#0d1117",
        color: "#c9d1d9",
        fontFamily: "var(--font-mono)",
        minHeight: "70vh",
      }}
    >
      {children}
    </div>
  );
}

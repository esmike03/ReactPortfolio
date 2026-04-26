export default function TerminalBody({ children }) {
  return (
    <div
      className="terminal-body relative flex-1 px-3 sm:px-5 py-4 sm:py-5 text-xs sm:text-sm leading-relaxed"
      style={{
        background:
          "radial-gradient(900px 500px at 80% -10%, rgba(91, 192, 235, 0.06), transparent 60%), #11131c",
        color: "#c9d1d9",
        fontFamily: "var(--font-mono)",
        minHeight: "70vh",
      }}
    >
      {children}
    </div>
  );
}

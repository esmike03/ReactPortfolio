export default function TerminalHeader({ title = "mike@portfolio: ~" }) {
  return (
    <div
      className="terminal-header flex items-center gap-3 px-3 sm:px-4 py-2 select-none"
      style={{
        background: "#161b22",
        borderBottom: "1px solid #21262d",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden="true"
          className="block w-3 h-3 rounded-full"
          style={{ background: "#ff5f56", boxShadow: "0 0 0 0.5px #e0443e inset" }}
        />
        <span
          aria-hidden="true"
          className="block w-3 h-3 rounded-full"
          style={{ background: "#ffbd2e", boxShadow: "0 0 0 0.5px #dea123 inset" }}
        />
        <span
          aria-hidden="true"
          className="block w-3 h-3 rounded-full"
          style={{ background: "#27c93f", boxShadow: "0 0 0 0.5px #1aab29 inset" }}
        />
      </div>
      <div
        className="flex-1 text-center text-[11px] sm:text-xs tracking-wide"
        style={{ color: "#8b949e", fontFamily: "var(--font-mono)" }}
      >
        {title}
      </div>
      <div className="w-12 sm:w-14" aria-hidden="true" />
    </div>
  );
}

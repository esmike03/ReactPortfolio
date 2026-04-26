import { TerminalProvider } from "./TerminalContext";

export default function Terminal({ children }) {
  return (
    <div
      className="terminal-shell-wrap min-h-screen w-full flex justify-center sm:py-8 sm:px-4"
      style={{ background: "#06070d" }}
    >
      <div
        className="terminal-shell relative w-full sm:max-w-3xl lg:max-w-4xl flex flex-col rounded-none sm:rounded-xl overflow-hidden"
        style={{
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px #2a2e44, 0 0 60px rgba(91,192,235,0.06)",
          background: "#11131c",
        }}
      >
        <TerminalProvider>{children}</TerminalProvider>
      </div>
    </div>
  );
}

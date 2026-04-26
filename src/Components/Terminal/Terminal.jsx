import { TerminalProvider } from "./TerminalContext";

export default function Terminal({ children }) {
  return (
    <div
      className="terminal-shell-wrap min-h-screen w-full flex justify-center sm:py-8 sm:px-4"
      style={{ background: "#010409" }}
    >
      <div
        className="terminal-shell relative w-full sm:max-w-3xl lg:max-w-4xl flex flex-col rounded-none sm:rounded-xl overflow-hidden"
        style={{
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px #21262d, 0 0 60px rgba(0,255,65,0.05)",
          background: "#0d1117",
        }}
      >
        <TerminalProvider>{children}</TerminalProvider>
      </div>
    </div>
  );
}

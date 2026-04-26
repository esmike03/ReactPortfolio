import { createContext, useContext } from "react";

export const TerminalCtx = createContext(null);

export function useTerminal() {
  const ctx = useContext(TerminalCtx);
  if (!ctx) {
    throw new Error("useTerminal must be used inside <TerminalProvider>");
  }
  return ctx;
}

// Convenience re-export so callers can do either of:
//   import { TerminalProvider } from "./TerminalContext";
//   import TerminalProvider from "./TerminalProvider";
export { default as TerminalProvider } from "./TerminalProvider";

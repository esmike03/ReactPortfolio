import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TerminalCtx } from "./TerminalContext";
import { runRegistryCommand } from "./commands";
import { WelcomeMessage } from "./outputs";

let entryId = 0;
const nextId = () => ++entryId;

export default function TerminalProvider({ children }) {
  const [bootDone, setBootDone] = useState(false);
  const [history, setHistory] = useState([]); // [{id, type, command?, node?}]
  const [cmdInputHistory, setCmdInputHistory] = useState([]); // raw input strings
  const welcomeShownRef = useRef(false);

  const finishBoot = useCallback(() => {
    setBootDone((prev) => (prev ? prev : true));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const pushEntry = useCallback((entry) => {
    setHistory((prev) => [...prev, { id: nextId(), ...entry }]);
  }, []);

  // Live ref so handlers (like `history`) can read current values without
  // re-creating the runCommand callback identity each render.
  const ctxRef = useRef({ cmdInputHistory, clearHistory });
  ctxRef.current.cmdInputHistory = cmdInputHistory;
  ctxRef.current.clearHistory = clearHistory;

  const runCommand = useCallback((input) => {
    const trimmed = String(input ?? "").trim();

    // Always echo the command line to history (even if empty)
    setHistory((prev) => [
      ...prev,
      { id: nextId(), type: "command", command: trimmed },
    ]);

    if (!trimmed) return;

    // Track for ↑/↓ navigation (skip consecutive duplicates)
    setCmdInputHistory((prev) => {
      if (prev.length && prev[prev.length - 1] === trimmed) return prev;
      return [...prev, trimmed];
    });

    let result;
    try {
      result = runRegistryCommand(trimmed, ctxRef.current);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("command handler crashed:", err);
      const base = trimmed.split(/\s+/)[0] || "command";
      setHistory((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "output",
          node: (
            <span style={{ color: "#ff5555" }}>
              {base}: handler crashed —{" "}
              {String(err?.message || err)}
            </span>
          ),
        },
      ]);
      return;
    }

    if (result === "__CLEAR__") {
      setHistory([]);
      return;
    }

    if (typeof result === "string" && result.startsWith("__OPEN__:")) {
      const url = result.slice("__OPEN__:".length);
      if (typeof window !== "undefined") {
        window.open(url, "_blank", "noopener,noreferrer");
      }
      setHistory((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "output",
          node: (
            <span style={{ color: "#8b949e" }}>
              # opened {url} in a new tab
            </span>
          ),
        },
      ]);
      return;
    }

    if (result != null) {
      setHistory((prev) => [
        ...prev,
        { id: nextId(), type: "output", node: result },
      ]);
    }
  }, []);

  // Safety fallback: if boot hasn't completed within 4s for any reason
  // (animation didn't fire, anime errored, etc.), force-finish so the
  // CLI is always reachable. This is defense-in-depth — under normal
  // conditions BootSequence calls finishBoot() on its own much sooner.
  useEffect(() => {
    if (bootDone) return;
    const t = setTimeout(() => {
      // eslint-disable-next-line no-console
      console.warn(
        "[terminal] boot timeout — forcing finishBoot() so CLI is reachable.",
      );
      setBootDone(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [bootDone]);

  // Welcome message — exactly once, after boot.
  useEffect(() => {
    if (!bootDone || welcomeShownRef.current) return;
    welcomeShownRef.current = true;
    pushEntry({ type: "output", node: <WelcomeMessage /> });
  }, [bootDone, pushEntry]);

  const value = useMemo(
    () => ({
      bootDone,
      finishBoot,
      history,
      pushEntry,
      runCommand,
      cmdInputHistory,
      clearHistory,
    }),
    [
      bootDone,
      finishBoot,
      history,
      pushEntry,
      runCommand,
      cmdInputHistory,
      clearHistory,
    ],
  );

  return <TerminalCtx.Provider value={value}>{children}</TerminalCtx.Provider>;
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TerminalCtx } from "./TerminalContext";
import { runRegistryCommand } from "./commands";
import {
  WelcomeMessage,
  SudoGrantedOutput,
  SudoFailedOutput,
  ErrorOutput,
} from "./outputs";

let entryId = 0;
const nextId = () => ++entryId;

const VALID_PASSWORDS = [
  "letmein",
  "please",
  "mike",
  "portfolio",
  "root",
  "open sesame",
  "abracadabra",
  "1234",
  "password",
  "swordfish",
];

export default function TerminalProvider({ children }) {
  const [bootDone, setBootDone] = useState(false);
  const [history, setHistory] = useState([]);
  const [cmdInputHistory, setCmdInputHistory] = useState([]);
  const [isRoot, setIsRoot] = useState(false);
  const [pwMode, setPwMode] = useState(false); // currently in [sudo] password prompt
  const welcomeShownRef = useRef(false);

  // Refs mirror state so the runCommand callback can stay identity-stable.
  const isRootRef = useRef(false);
  const pwModeRef = useRef(false);
  const pwAttemptsRef = useRef(0);
  const sudoAttemptsRef = useRef(0);
  const cmdInputHistoryRef = useRef([]);

  useEffect(() => {
    isRootRef.current = isRoot;
  }, [isRoot]);
  useEffect(() => {
    pwModeRef.current = pwMode;
  }, [pwMode]);
  useEffect(() => {
    cmdInputHistoryRef.current = cmdInputHistory;
  }, [cmdInputHistory]);

  const finishBoot = useCallback(() => {
    setBootDone((prev) => (prev ? prev : true));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const pushEntry = useCallback((entry) => {
    setHistory((prev) => [...prev, { id: nextId(), ...entry }]);
  }, []);

  const beginPasswordPrompt = useCallback(() => {
    pwAttemptsRef.current = 0;
    pwModeRef.current = true;
    setPwMode(true);
  }, []);

  const cancelPasswordPrompt = useCallback(() => {
    pwAttemptsRef.current = 0;
    pwModeRef.current = false;
    setPwMode(false);
  }, []);

  const bumpSudoAttempt = useCallback(() => {
    sudoAttemptsRef.current += 1;
    return sudoAttemptsRef.current;
  }, []);

  const resetSudoAttempts = useCallback(() => {
    sudoAttemptsRef.current = 0;
  }, []);

  const setIsRootStable = useCallback((v) => {
    isRootRef.current = !!v;
    setIsRoot(!!v);
  }, []);

  // Live ctx for command handlers.
  const ctxRef = useRef({});
  ctxRef.current = {
    isRoot,
    cmdInputHistory,
    clearHistory,
    beginPasswordPrompt,
    bumpSudoAttempt,
    resetSudoAttempts,
    setIsRoot: setIsRootStable,
  };

  const runCommand = useCallback((input) => {
    const trimmed = String(input ?? "").trim();

    // ── Password mode: treat input as a password attempt ──
    if (pwModeRef.current) {
      const masked = "•".repeat(trimmed.length);
      setHistory((prev) => [
        ...prev,
        { id: nextId(), type: "password-echo", masked },
      ]);

      const ok = VALID_PASSWORDS.includes(trimmed.toLowerCase());
      if (ok) {
        pwModeRef.current = false;
        setPwMode(false);
        pwAttemptsRef.current = 0;
        sudoAttemptsRef.current = 0;
        isRootRef.current = true;
        setIsRoot(true);
        setHistory((prev) => [
          ...prev,
          { id: nextId(), type: "output", node: <SudoGrantedOutput /> },
        ]);
        return;
      }

      pwAttemptsRef.current += 1;
      if (pwAttemptsRef.current >= 3) {
        pwModeRef.current = false;
        setPwMode(false);
        pwAttemptsRef.current = 0;
        setHistory((prev) => [
          ...prev,
          { id: nextId(), type: "output", node: <SudoFailedOutput /> },
        ]);
        return;
      }
      setHistory((prev) => [
        ...prev,
        {
          id: nextId(),
          type: "output",
          node: <ErrorOutput cmd="sudo" msg="Sorry, try again." />,
        },
      ]);
      return;
    }

    // ── Normal mode: echo the prompt+command ──
    setHistory((prev) => [
      ...prev,
      {
        id: nextId(),
        type: "command",
        command: trimmed,
        isRoot: isRootRef.current,
      },
    ]);

    if (!trimmed) return;

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
              {base}: handler crashed — {String(err?.message || err)}
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
            <span style={{ color: "#8b949e" }}># opened {url} in a new tab</span>
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

  // Safety fallback so the CLI is always reachable.
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
      isRoot,
      pwMode,
      cancelPasswordPrompt,
    }),
    [
      bootDone,
      finishBoot,
      history,
      pushEntry,
      runCommand,
      cmdInputHistory,
      clearHistory,
      isRoot,
      pwMode,
      cancelPasswordPrompt,
    ],
  );

  return <TerminalCtx.Provider value={value}>{children}</TerminalCtx.Provider>;
}

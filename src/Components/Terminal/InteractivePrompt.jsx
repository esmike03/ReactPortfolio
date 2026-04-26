import { useEffect, useRef, useState } from "react";
import { PromptTop, PromptBottom } from "./Prompt";
import { useTerminal } from "./TerminalContext";
import { getCommandNames } from "./commands";

export default function InteractivePrompt() {
  const [input, setInput] = useState("");
  const [historyIdx, setHistoryIdx] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const {
    runCommand,
    cmdInputHistory,
    bootDone,
    history,
    pwMode,
    isRoot,
    cancelPasswordPrompt,
  } = useTerminal();

  // Focus input when boot finishes.
  useEffect(() => {
    if (!bootDone) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [bootDone]);

  // Re-focus when entering / leaving password mode.
  useEffect(() => {
    inputRef.current?.focus();
    setInput("");
    setHistoryIdx(-1);
  }, [pwMode]);

  // Click anywhere in the terminal area → focus input.
  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest("a, button, input, textarea")) return;
      if (window.getSelection()?.toString()) return;
      inputRef.current?.focus();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Auto-scroll the page so the prompt stays at the bottom.
  useEffect(() => {
    if (!bootDone) return;
    wrapperRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [history.length, bootDone, pwMode]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      setInput("");
      setHistoryIdx(-1);
      return;
    }

    // Allow cancelling the password prompt with Ctrl+C / Esc
    if (
      pwMode &&
      (e.key === "Escape" || (e.key === "c" && e.ctrlKey))
    ) {
      e.preventDefault();
      cancelPasswordPrompt();
      setInput("");
      return;
    }

    // History nav + Tab completion are disabled in password mode.
    if (pwMode) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdInputHistory.length === 0) return;
      const newIdx = Math.min(historyIdx + 1, cmdInputHistory.length - 1);
      setHistoryIdx(newIdx);
      setInput(cmdInputHistory[cmdInputHistory.length - 1 - newIdx]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        const newIdx = historyIdx - 1;
        setHistoryIdx(newIdx);
        setInput(cmdInputHistory[cmdInputHistory.length - 1 - newIdx]);
      }
      return;
    }

    if ((e.key === "l" || e.key === "L") && e.ctrlKey) {
      e.preventDefault();
      runCommand("clear");
      setInput("");
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const all = getCommandNames({ isRoot });
      const matches = all.filter((n) => n.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        const common = matches.reduce((p, c) => {
          let i = 0;
          while (i < p.length && i < c.length && p[i] === c[i]) i++;
          return p.slice(0, i);
        });
        if (common.length > partial.length) setInput(common);
      }
      return;
    }
  };

  if (!bootDone) return null;

  const inputEl = (
    <input
      ref={inputRef}
      type={pwMode ? "password" : "text"}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      inputMode="text"
      aria-label={pwMode ? "Sudo password input" : "Terminal command input"}
      className="terminal-input flex-1 min-w-[40px] bg-transparent outline-none border-0"
      style={{
        color: "#e6edf3",
        caretColor: isRoot ? "#ff5555" : "#5bc0eb",
        fontFamily: "inherit",
      }}
    />
  );

  if (pwMode) {
    return (
      <div
        ref={wrapperRef}
        className="terminal-input-line flex flex-wrap items-baseline mt-1"
      >
        <span className="select-none" style={{ color: "#c9d1d9" }}>
          [sudo] password for{" "}
          <span style={{ color: "#5fd7d7", fontWeight: 700 }}>visitor</span>
          :&nbsp;
        </span>
        {inputEl}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="mt-1">
      <PromptTop user="mike" host="portfolio" isRoot={isRoot} />
      <div className="terminal-input-line flex flex-wrap items-baseline">
        <PromptBottom isRoot={isRoot} />
        {inputEl}
      </div>
    </div>
  );
}

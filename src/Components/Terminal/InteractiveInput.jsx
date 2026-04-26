import { useEffect, useRef, useState } from "react";
import Prompt from "./Prompt";
import CursorBlink from "./CursorBlink";

// Commands the user can type
const COMMANDS = {
  help: () => (
    <div
      style={{ color: "#c9d1d9" }}
      className="space-y-0.5 text-xs sm:text-sm"
    >
      <div>
        <span style={{ color: "#00ff41" }}>whoami</span> — who am I
      </div>
      <div>
        <span style={{ color: "#00ff41" }}>about</span> — about me
      </div>
      <div>
        <span style={{ color: "#00ff41" }}>ls ./timeline/</span> — work history
      </div>
      <div>
        <span style={{ color: "#00ff41" }}>ls ./projects</span> — project list
      </div>
      <div>
        <span style={{ color: "#00ff41" }}>cat skills.txt</span> — skills
      </div>
      <div>
        <span style={{ color: "#00ff41" }}>cat contact.json</span>— contact info
      </div>
      <div>
        <span style={{ color: "#00ff41" }}>clear</span> — clear history
      </div>
      <div>
        <span style={{ color: "#00ff41" }}>help</span> — show this menu
      </div>
    </div>
  ),
  whoami: () => (
    <div style={{ color: "#c9d1d9" }}>
      <span style={{ color: "#00ff41", fontWeight: 600 }}>
        Earl Mike H. Sarabia
      </span>
      <span style={{ color: "#8b949e" }}>
        {" "}
        — Full-Stack Developer, Philippines
      </span>
    </div>
  ),
  about: () => (
    <div
      style={{ color: "#c9d1d9" }}
      className="leading-relaxed text-xs sm:text-sm"
    >
      Discovered coding in Grade 9 via DroidScript. Now builds full-stack web
      apps with <span style={{ color: "#00ff41" }}>Laravel</span> and{" "}
      <span style={{ color: "#00ff41" }}>React</span>, and designs in Photoshop
      & Premiere Pro.
    </div>
  ),
  "ls ./projects": () => (
    <div
      style={{ color: "#79c0ff" }}
      className="flex flex-wrap gap-x-4 text-xs sm:text-sm"
    >
      {[
        "registrar-bisu/",
        "konstrukalakal/",
        "travel-companion/",
        "xentro-estates/",
        "westpoint-pharma/",
        "helmet-shop/",
      ].map((p) => (
        <span key={p}>{p}</span>
      ))}
    </div>
  ),
  "ls ./timeline/": () => (
    <div className="text-xs sm:text-sm space-y-0.5">
      {[
        [
          "Mar 2026 – Present",
          "Jr. Programmer",
          "Newton Scanning System Inc.",
          true,
        ],
        [
          "Jul 2025 – Feb 2026",
          "IT System Operator / Tech Support",
          "Bohol Quality Corporation",
        ],
        [
          "Jan 2025 – May 2025",
          "Full-Stack Web Developer (Intern)",
          "Xentro Holdings Corporation",
        ],
        ["2021 – 2025", "BS Information Technology", "BISU — Balilihan"],
      ].map(([date, title, org, current], i) => (
        <div key={i} className="flex flex-wrap gap-x-3">
          <span style={{ color: "#79c0ff" }} className="min-w-[14ch]">
            {date}
          </span>
          <span style={{ color: current ? "#00ff41" : "#c9d1d9" }}>
            {title}
          </span>
          <span style={{ color: "#8b949e" }}>— {org}</span>
          {current && (
            <span
              style={{
                color: "#00ff41",
                border: "1px solid #00ff41",
                fontSize: 10,
                padding: "0 4px",
                borderRadius: 3,
              }}
            >
              current
            </span>
          )}
        </div>
      ))}
    </div>
  ),
  "cat skills.txt": () => (
    <div style={{ color: "#c9d1d9" }} className="text-xs sm:text-sm">
      Laravel | PHP | React | JavaScript | TailwindCSS | MySQL | Firebase |
      Android (Java) | WordPress | Figma | Photoshop
    </div>
  ),
  "cat contact.json": () => (
    <pre
      className="text-xs sm:text-sm whitespace-pre-wrap"
      style={{ color: "#c9d1d9", margin: 0 }}
    >
      {`{
  `}
      <span style={{ color: "#79c0ff" }}>"email"</span>
      {`: `}
      <a href="mailto:sarabiaearlmike14@gmail.com" style={{ color: "#58a6ff" }}>
        "sarabiaearlmike14@gmail.com"
      </a>
      {`,
  `}
      <span style={{ color: "#79c0ff" }}>"github"</span>
      {`: `}
      <a
        href="https://github.com/esmike03"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#58a6ff" }}
      >
        "esmike03"
      </a>
      {`,
  `}
      <span style={{ color: "#79c0ff" }}>"linkedin"</span>
      {`: `}
      <a
        href="https://www.linkedin.com/in/earl-mike-sarabia-4a6532346/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#58a6ff" }}
      >
        "earl-mike-sarabia"
      </a>
      {`
}`}
    </pre>
  ),
};

const NOT_FOUND = (cmd) => (
  <div style={{ color: "#ff5555" }} className="text-xs sm:text-sm">
    bash: <span style={{ color: "#e6edf3" }}>{cmd}</span>: command not found.
    Type <span style={{ color: "#00ff41" }}>help</span> for available commands.
  </div>
);

export default function InteractiveInput({
  user = "mike",
  host = "portfolio",
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]); // [{cmd, output}]
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState([]); // for arrow key nav
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  // Auto-focus input on mount and on click anywhere in the terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      if (!cmd) return;

      if (cmd === "clear") {
        setHistory([]);
        setCmdHistory((h) => [cmd, ...h]);
        setInput("");
        setHistoryIdx(-1);
        return;
      }

      const outputFn = COMMANDS[cmd];
      const output = outputFn ? outputFn() : NOT_FOUND(cmd);
      setHistory((h) => [...h, { cmd, output }]);
      setCmdHistory((h) => [cmd, ...h]);
      setInput("");
      setHistoryIdx(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const nextIdx = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(nextIdx);
      setInput(nextIdx === -1 ? "" : (cmdHistory[nextIdx] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Tab completion
      const matches = Object.keys(COMMANDS).filter((k) => k.startsWith(input));
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  return (
    <div className="mt-2" onClick={() => inputRef.current?.focus()}>
      {/* Rendered history of past interactive commands */}
      {history.map((entry, i) => (
        <div key={i} className="mb-3">
          <div className="flex items-center flex-wrap">
            <Prompt user={user} host={host} />
            <span style={{ color: "#e6edf3" }} className="text-xs sm:text-sm">
              {entry.cmd}
            </span>
          </div>
          <div className="mt-1">{entry.output}</div>
        </div>
      ))}

      {/* Active input line */}
      <div className="flex items-center flex-wrap relative">
        <Prompt user={user} host={host} />
        <span
          className="relative inline-flex items-center text-xs sm:text-sm"
          style={{ color: "#e6edf3" }}
        >
          {/* Invisible real input — sits on top */}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 w-full opacity-0 cursor-text bg-transparent border-none outline-none"
            style={{ caretColor: "transparent", minWidth: "1ch" }}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="terminal input"
          />
          {/* Visual text + cursor */}
          <span style={{ whiteSpace: "pre" }}>{input || ""}</span>
          <CursorBlink color="#00ff41" />
        </span>
      </div>

      <div ref={bottomRef} />
    </div>
  );
}

// Kali-style two-line prompt, e.g.:
//   ┌──(mike㉿portfolio)-[~]
//   └─$
//
// `Prompt` (default export) renders BOTH lines and is kept for backward
// compatibility. For inline use where the input/command needs to sit on
// the second line, prefer the named `PromptTop` + `PromptBottom` exports.

const C = {
  line: "#5bc0eb",      // bracket/line color (Kali cyan-blue)
  user: "#5fd7d7",      // bright cyan
  host: "#5fd7d7",
  separator: "#ff3860", // ㉿ — Kali dragon red
  path: "#ffffff",      // bold white
  prompt: "#5bc0eb",    // $ symbol
  rootRed: "#ff5555",
};

export function PromptTop({
  user = "mike",
  host = "portfolio",
  path = "~",
  isRoot = false,
}) {
  return (
    <div
      className="terminal-prompt-top select-none"
      style={{ lineHeight: 1.25, fontWeight: 500 }}
    >
      <span style={{ color: C.line }}>┌──(</span>
      <span style={{ color: isRoot ? C.rootRed : C.user, fontWeight: 700 }}>
        {isRoot ? "root" : user}
      </span>
      <span style={{ color: C.separator, fontWeight: 700 }}>㉿</span>
      <span style={{ color: C.host, fontWeight: 700 }}>{host}</span>
      <span style={{ color: C.line }}>)-[</span>
      <span style={{ color: C.path, fontWeight: 600 }}>{path}</span>
      <span style={{ color: C.line }}>]</span>
    </div>
  );
}

export function PromptBottom({ isRoot = false }) {
  return (
    <span
      className="terminal-prompt-bottom select-none"
      style={{ lineHeight: 1.25 }}
    >
      <span style={{ color: C.line }}>└─</span>
      <span
        style={{
          color: isRoot ? C.rootRed : C.prompt,
          fontWeight: 700,
        }}
      >
        {isRoot ? "#" : "$"}
      </span>{" "}
    </span>
  );
}

export default function Prompt(props) {
  return (
    <>
      <PromptTop {...props} />
      <PromptBottom {...props} />
    </>
  );
}

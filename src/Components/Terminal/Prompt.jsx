export default function Prompt({ user = "mike", host = "portfolio", path = "~" }) {
  return (
    <span className="terminal-prompt select-none">
      <span style={{ color: "#58a6ff" }}>{user}</span>
      <span style={{ color: "#8b949e" }}>@</span>
      <span style={{ color: "#79c0ff" }}>{host}</span>
      <span style={{ color: "#8b949e" }}>:</span>
      <span style={{ color: "#d2a8ff" }}>{path}</span>
      <span style={{ color: "#00ff41" }}>$</span>{" "}
    </span>
  );
}

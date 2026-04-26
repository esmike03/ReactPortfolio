export default function Prompt({
  user = "mike",
  host = "portfolio",
  path = "~",
  isRoot = false,
}) {
  return (
    <span className="terminal-prompt select-none">
      <span style={{ color: isRoot ? "#ff5555" : "#58a6ff" }}>
        {isRoot ? "root" : user}
      </span>
      <span style={{ color: "#8b949e" }}>@</span>
      <span style={{ color: "#79c0ff" }}>{host}</span>
      <span style={{ color: "#8b949e" }}>:</span>
      <span style={{ color: "#d2a8ff" }}>{path}</span>
      <span style={{ color: isRoot ? "#ff5555" : "#00ff41" }}>
        {isRoot ? "#" : "$"}
      </span>{" "}
    </span>
  );
}

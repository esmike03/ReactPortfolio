export default function CursorBlink({ color = "#00ff41" }) {
  return (
    <span
      className="terminal-cursor-blink"
      aria-hidden="true"
      style={{ color }}
    >
      █
    </span>
  );
}

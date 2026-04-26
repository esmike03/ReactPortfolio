import { FiTerminal, FiLayout } from "react-icons/fi";

export default function ModeToggle({ mode, onChange }) {
  const isCli = mode === "cli";
  return (
    <div
      className="gui-mode-toggle"
      role="group"
      aria-label="Switch interface mode"
    >
      <button
        type="button"
        onClick={() => onChange("gui")}
        className={`gui-mode-btn ${!isCli ? "is-active" : ""}`}
        aria-pressed={!isCli}
        title="Friendly UI mode"
      >
        <FiLayout aria-hidden="true" />
        <span>UI</span>
      </button>
      <button
        type="button"
        onClick={() => onChange("cli")}
        className={`gui-mode-btn ${isCli ? "is-active" : ""}`}
        aria-pressed={isCli}
        title="Terminal / CLI mode"
      >
        <FiTerminal aria-hidden="true" />
        <span>CLI</span>
      </button>
    </div>
  );
}

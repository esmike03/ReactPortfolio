import { FiPower } from "react-icons/fi";

/**
 * Small power button shown while the terminal is on screen.
 * Deliberately sits outside the terminal shell so the CLI design is untouched.
 */
export default function ExitCli({ onExit }) {
  return (
    <button
      type="button"
      className="cli-exit"
      onClick={onExit}
      title="Turn off"
      aria-label="Turn off the terminal and return to the site"
    >
      <FiPower aria-hidden="true" />
    </button>
  );
}

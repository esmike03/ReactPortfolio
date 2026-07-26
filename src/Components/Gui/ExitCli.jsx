import { FiArrowLeft } from "react-icons/fi";

/**
 * Small floating escape hatch shown while the terminal is on screen.
 * Deliberately sits outside the terminal shell so the CLI design is untouched.
 */
export default function ExitCli({ onExit }) {
  return (
    <button type="button" className="cli-exit" onClick={onExit}>
      <FiArrowLeft aria-hidden="true" />
      <span>Back to site</span>
    </button>
  );
}

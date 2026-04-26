import { useEffect, useRef, useState } from "react";
import Prompt from "./Prompt";
import TypedText from "./TypedText";
import CursorBlink from "./CursorBlink";
import { useTerminal } from "./TerminalContext";

/**
 * A single CLI step: prompt + typed command + output.
 * Waits for its turn (currentStep === step) then types its command,
 * reveals its output, and advances the queue.
 */
export default function CommandLine({
  step,
  command,
  user,
  host,
  path = "~",
  children,
  outputDelay = 180,
  showInputCursor = true,
}) {
  const { bootDone, currentStep, advance } = useTerminal();
  const [phase, setPhase] = useState("idle"); // idle | typing | output | done
  const startedRef = useRef(false);
  const advancedRef = useRef(false);

  // Begin typing when boot is finished and it's our turn.
  useEffect(() => {
    if (!bootDone) return;
    if (currentStep !== step) return;
    if (startedRef.current) return;
    startedRef.current = true;
    setPhase("typing");
  }, [bootDone, currentStep, step]);

  const handleTypeComplete = () => {
    const t = setTimeout(() => {
      setPhase("output");
      const t2 = setTimeout(() => {
        if (advancedRef.current) return;
        advancedRef.current = true;
        setPhase("done");
        advance();
      }, outputDelay + 120);
      return () => clearTimeout(t2);
    }, outputDelay);
    return () => clearTimeout(t);
  };

  const isMyTurn = bootDone && currentStep === step;
  const isAfterMe = bootDone && currentStep > step;
  const shouldType =
    phase === "typing" || phase === "output" || phase === "done";
  const showOutput = phase === "output" || phase === "done" || isAfterMe;

  return (
    <div className="terminal-cmd mb-3">
      <div className="flex flex-wrap items-center">
        <Prompt user={user} host={host} path={path} />
        <span className="terminal-cmd-text" style={{ color: "#e6edf3" }}>
          <TypedText
            text={command}
            start={shouldType || isAfterMe}
            onComplete={isAfterMe ? undefined : handleTypeComplete}
          />
        </span>
        {showInputCursor && isMyTurn && phase === "typing" && (
          <CursorBlink color="#e6edf3" />
        )}
      </div>
      {showOutput && (
        <div className="terminal-cmd-output mt-1 ml-0">{children}</div>
      )}
    </div>
  );
}

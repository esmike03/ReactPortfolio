import "./App.css";
import ErrorBoundary from "./Components/ErrorBoundary";
import {
  Terminal,
  TerminalHeader,
  TerminalBody,
  BootSequence,
  HistoryRenderer,
  InteractivePrompt,
} from "./Components/Terminal";

// NOTE: GUI mode is a work-in-progress and intentionally not wired up yet.
// The Gui + ModeToggle components live in ./Components/Gui and can be
// re-enabled later by reintroducing the mode state and toggle here.
// import { Gui, ModeToggle } from "./Components/Gui";

export default function App() {
  return (
    <ErrorBoundary>
      <Terminal>
        <TerminalHeader title="mike㉿portfolio: ~" />
        <TerminalBody>
          <BootSequence />
          <HistoryRenderer />
          <InteractivePrompt />
        </TerminalBody>
      </Terminal>
    </ErrorBoundary>
  );
}

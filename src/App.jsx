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

export default function App() {
  return (
    <ErrorBoundary>
      <Terminal>
        <TerminalHeader title="mike@portfolio: ~" />
        <TerminalBody>
          <BootSequence />
          <HistoryRenderer />
          <InteractivePrompt />
        </TerminalBody>
      </Terminal>
    </ErrorBoundary>
  );
}

import { Component } from "react";
import Prompt from "./Prompt";
import { useTerminal } from "./TerminalContext";

/**
 * Per-entry boundary. If one history entry's stored React element fails
 * to render (commonly after Vite HMR hot-replaces an output module),
 * we render an inline error placeholder instead of taking down the
 * whole session.
 */
class EntryBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error("history entry render failed:", error);
  }
  render() {
    if (this.state.error) {
      return (
        <span style={{ color: "#ff5555" }}>
          # &lt;render error: {String(this.state.error?.message || this.state.error)}&gt;
        </span>
      );
    }
    return this.props.children;
  }
}

export default function HistoryRenderer() {
  const { history } = useTerminal();

  return (
    <>
      {history.map((entry) => {
        if (entry.type === "command") {
          return (
            <div
              key={entry.id}
              className="terminal-cmd-echo flex flex-wrap items-baseline mt-1"
            >
              <Prompt user="mike" host="portfolio" />
              <span style={{ color: "#e6edf3" }}>{entry.command}</span>
            </div>
          );
        }
        return (
          <div key={entry.id} className="terminal-cmd-output mb-3">
            <EntryBoundary>{entry.node}</EntryBoundary>
          </div>
        );
      })}
    </>
  );
}

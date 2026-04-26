import { Component } from "react";

/**
 * Catches runtime errors in the React tree below this boundary so a single
 * crash (e.g., a stored React element pointing at a hot-replaced module)
 * doesn't blank the whole page. Provides retry + reload buttons.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Log to console so devs can still see the trace during development.
    // eslint-disable-next-line no-console
    console.error("Terminal session crashed:", error, info);
    this.setState({ info });
  }

  reset = () => this.setState({ error: null, info: null });

  reload = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  render() {
    const { error, info } = this.state;
    if (!error) return this.props.children;

    const message = error?.message || String(error);
    const stack = info?.componentStack || error?.stack || "";

    return (
      <div
        role="alert"
        style={{
          minHeight: "100vh",
          background: "#0d1117",
          color: "#c9d1d9",
          fontFamily:
            "'Fira Code', 'JetBrains Mono', ui-monospace, monospace",
          padding: "1.25rem 1.5rem",
          fontSize: 13,
          lineHeight: 1.6,
        }}
      >
        <div style={{ color: "#ff5555", fontWeight: 600, marginBottom: 6 }}>
          [ FAIL ] terminal session crashed
        </div>
        <div style={{ color: "#8b949e", marginBottom: 12, fontSize: 11 }}>
          # likely cause: a hot-reload replaced a module while a stored
          React element still referenced the old version. State has been
          preserved as much as possible.
        </div>
        <pre
          style={{
            color: "#ff5555",
            background: "#161b22",
            border: "1px solid #21262d",
            padding: "0.75rem",
            borderRadius: 6,
            overflow: "auto",
            margin: 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {message}
        </pre>
        {stack && (
          <details style={{ marginTop: 12, color: "#8b949e" }}>
            <summary style={{ cursor: "pointer", color: "#79c0ff" }}>
              show component stack
            </summary>
            <pre
              style={{
                marginTop: 8,
                background: "#161b22",
                border: "1px solid #21262d",
                padding: "0.75rem",
                borderRadius: 6,
                overflow: "auto",
                fontSize: 11,
                whiteSpace: "pre-wrap",
              }}
            >
              {stack}
            </pre>
          </details>
        )}
        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={this.reset}
            style={btnStyle("#00ff41")}
          >
            ↻ retry render
          </button>
          <button
            type="button"
            onClick={this.reload}
            style={btnStyle("#58a6ff")}
          >
            ↺ reload page
          </button>
        </div>
      </div>
    );
  }
}

function btnStyle(color) {
  return {
    padding: "0.5rem 0.9rem",
    background: "transparent",
    border: `1px solid ${color}`,
    color,
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 12,
    borderRadius: 4,
  };
}

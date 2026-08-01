import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import ErrorBoundary from "./Components/ErrorBoundary";
import {
  Terminal,
  TerminalHeader,
  TerminalBody,
  BootSequence,
  HistoryRenderer,
  InteractivePrompt,
  GlitchPointer,
  ScreenGlitch,
} from "./Components/Terminal";
import { Gui, ExitCli } from "./Components/Gui";

const MODE_KEY = "portfolio-mode";

function initialMode() {
  if (typeof window === "undefined") return "ui";
  if (window.location.hash === "#cli") return "cli";
  try {
    const saved = window.localStorage.getItem(MODE_KEY);
    if (saved === "cli" || saved === "ui") return saved;
  } catch {
    /* storage blocked — fall through to default */
  }
  return "ui";
}

export default function App() {
  const [mode, setMode] = useState(initialMode);
  const [warp, setWarp] = useState(null); // null | "out" | "in"
  const timers = useRef([]);

  // Expose the mode on <html> so each stylesheet can theme the page shell.
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    try {
      window.localStorage.setItem(MODE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  // Keep #cli in the URL shareable without hijacking the GUI's own anchors.
  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash === "#cli") setMode("cli");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Fold the current view away, swap behind the veil, unfold the new one.
  // Timings mirror the .warp keyframes in App.css.
  const switchMode = useCallback((next, url) => {
    const apply = () => {
      setMode(next);
      window.history.replaceState(null, "", url);
      window.scrollTo({ top: 0 });
    };

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      apply();
      return;
    }

    timers.current.forEach(window.clearTimeout);
    setWarp("out");
    timers.current = [
      window.setTimeout(() => {
        apply();
        setWarp("in");
      }, 520),
      window.setTimeout(() => setWarp(null), 1420),
    ];
  }, []);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(window.clearTimeout);
  }, []);

  const openCli = useCallback(() => switchMode("cli", "#cli"), [switchMode]);

  const exitCli = useCallback(
    () =>
      switchMode("ui", window.location.pathname + window.location.search),
    [switchMode],
  );

  // The terminal's own `exit` command asks to come back here.
  useEffect(() => {
    window.addEventListener("portfolio:exit-cli", exitCli);
    return () => window.removeEventListener("portfolio:exit-cli", exitCli);
  }, [exitCli]);

  const warpClass = warp ? ` is-warp-${warp}` : "";

  return (
    <ErrorBoundary>
      {mode === "cli" ? (
        <>
          <div key="cli" className={`mode-fade${warpClass}`}>
            <Terminal>
              <TerminalHeader title="mike㉿portfolio: ~" />
              <TerminalBody>
                <BootSequence />
                <HistoryRenderer />
                <InteractivePrompt />
              </TerminalBody>
            </Terminal>
          </div>
          {/* Kept outside .mode-fade: an animated ancestor would become the
              containing block for position:fixed and the pill would scroll away.
              The pointer is fixed too, so it belongs out here for the same
              reason — inside, it would drift off during the warp. */}
          <ExitCli onExit={exitCli} />
          <GlitchPointer />
          <ScreenGlitch />
        </>
      ) : (
        <div key="ui" className={`mode-fade${warpClass}`}>
          <Gui onOpenCli={openCli} />
        </div>
      )}

      {warp && (
        <div className="warp" aria-hidden="true">
          {/* Displacement bands sample the live page via backdrop-filter,
              so the real content tears — nothing is cloned. */}
          <span className="glitch-band" style={{ "--t": "8%", "--h": "6%", "--x": "-3.5%", "--d": "0ms" }} />
          <span className="glitch-band" style={{ "--t": "27%", "--h": "4%", "--x": "4.5%", "--d": "70ms" }} />
          <span className="glitch-band" style={{ "--t": "44%", "--h": "9%", "--x": "-2.5%", "--d": "30ms" }} />
          <span className="glitch-band" style={{ "--t": "63%", "--h": "3.5%", "--x": "5.5%", "--d": "110ms" }} />
          <span className="glitch-band" style={{ "--t": "78%", "--h": "7%", "--x": "-4%", "--d": "50ms" }} />
          <span className="glitch-rgb glitch-rgb-a" />
          <span className="glitch-rgb glitch-rgb-b" />
          <span className="warp-veil" />
          <span className="warp-flash" />
        </div>
      )}
    </ErrorBoundary>
  );
}

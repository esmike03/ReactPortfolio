import { useEffect, useMemo, useState } from "react";
import { CONTACT } from "../Terminal/data";

function githubUser() {
  const m = (CONTACT.github || "").match(/github\.com\/([^/]+)/i);
  return m ? m[1] : "esmike03";
}

/* A year of daily contribution counts — the same feed the CLI's contributions
   output reads, so both modes agree on the numbers. */
function useContributions(user) {
  const [state, setState] = useState({
    status: "loading",
    days: [],
    total: 0,
  });

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();

    (async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
          { signal: ctrl.signal },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const days = data.contributions || [];
        if (!days.length) throw new Error("no data");

        const total =
          data.total?.lastYear ?? days.reduce((s, d) => s + (d.count || 0), 0);

        if (!cancelled) setState({ status: "ok", days, total });
      } catch (e) {
        if (!cancelled && e.name !== "AbortError") {
          setState({ status: "err", days: [], total: 0 });
        }
      }
    })();

    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [user]);

  return state;
}

export default function GithubHalftone() {
  const user = useMemo(() => githubUser(), []);
  const { status, days, total } = useContributions(user);

  const { cells, active, columns } = useMemo(() => {
    if (!days.length) return { cells: [], active: 0, columns: 53 };

    // Pad the front so every column is a calendar week, Sunday at the top.
    const startDow = new Date(days[0].date).getUTCDay();
    const padded = [
      ...Array.from({ length: startDow }, (_, i) => ({
        key: `pad-${i}`,
        pad: true,
      })),
      ...days.map((d) => ({ key: d.date, count: d.count || 0 })),
    ];

    const max = days.reduce((m, d) => Math.max(m, d.count || 0), 0) || 1;

    const cells = padded.map((c) =>
      c.pad
        ? c
        : {
            ...c,
            // sqrt, not linear: one outlier day of 30 commits would otherwise
            // flatten a whole year of ones and twos into the same tiny dot.
            // Empty days keep a floor value — a halftone is a field that
            // varies, not marks scattered on blank paper.
            scale: c.count ? 0.42 + 0.58 * Math.sqrt(c.count / max) : 0.16,
          },
    );

    return {
      cells,
      active: days.filter((d) => (d.count || 0) > 0).length,
      columns: Math.ceil(padded.length / 7),
    };
  }, [days]);

  // A portfolio shouldn't show visitors a fetch error — this is a third-party
  // feed and a failure here is routine, so the section simply steps aside.
  if (status === "err") return null;

  return (
    <div className={`ui-commits ${status === "loading" ? "is-loading" : ""}`}>
      <div
        className="ui-commit-field"
        style={{ "--cols": columns }}
        aria-hidden="true"
      >
        {cells.map((c) =>
          c.pad ? (
            <span key={c.key} />
          ) : (
            <span
              key={c.key}
              className="ui-commit-dot"
              style={{ "--s": c.scale }}
            />
          ),
        )}
      </div>

      <p className="ui-commit-meta">
        {status === "loading" ? (
          <span>Reading contributions…</span>
        ) : (
          <span>
            <strong>{total}</strong> contributions across{" "}
            <strong>{active}</strong> days, past year
          </span>
        )}
        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
          github.com/{user}
        </a>
      </p>
    </div>
  );
}

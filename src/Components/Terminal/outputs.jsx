import { useEffect, useState } from "react";
import AsciiSkillBar from "./AsciiSkillBar";
import {
  TIMELINE,
  PROJECTS,
  SKILLS_TEXT,
  SKILL_BARS,
  GALLERY,
  CONTACT,
  getAge,
} from "./data";

const C = {
  green: "#00ff41",
  greenDim: "#00cc34",
  fg: "#c9d1d9",
  dim: "#8b949e",
  comment: "#6a737d",
  blue: "#58a6ff",
  blueLight: "#79c0ff",
  purple: "#d2a8ff",
  red: "#ff5555",
  yellow: "#f0ad4e",
};

// ── identity ───────────────────────────────────────────────
export function WhoamiOutput() {
  const age = getAge();
  return (
    <div className="space-y-0.5">
      <div>
        <span style={{ color: C.green, fontWeight: 600 }}>{CONTACT.name}</span>
        <span style={{ color: C.dim }}> — Full-Stack Developer</span>
      </div>
      <div style={{ color: C.fg }}>
        <span style={{ color: C.dim }}>location:</span> {CONTACT.location}{" "}
        <span style={{ color: C.dim }}>age:</span> {age}{" "}
        <span style={{ color: C.dim }}>status:</span>{" "}
        <span style={{ color: C.green }}>available</span>
      </div>
    </div>
  );
}

// ── about.md ───────────────────────────────────────────────
export function AboutOutput() {
  return (
    <div style={{ color: C.fg }} className="leading-relaxed">
      <div style={{ color: C.comment }}># about.md</div>
      <p className="mt-1">
        I started exploring technology later on, which gradually grew into a
        passion for building and designing digital solutions.
      </p>
      <p className="mt-2">
        Today, I focus on developing responsive and efficient web applications,
        along with creating clean and user-friendly designs. I work mainly in{" "}
        <span style={{ color: C.green }}>full-stack web development</span>, with
        additional experience in creative tools for visual and media projects.
      </p>
    </div>
  );
}

// ── timeline ───────────────────────────────────────────────
export function TimelineOutput() {
  return (
    <div>
      <div style={{ color: C.dim }} className="mb-1">
        total {TIMELINE.length}
      </div>
      {TIMELINE.map((item, i) => (
        <div
          key={i}
          className="grid grid-cols-[auto,1fr] sm:grid-cols-[auto,minmax(0,180px),1fr] gap-x-3 gap-y-0.5 py-0.5"
        >
          <span style={{ color: C.dim }}>drwxr-xr-x</span>
          <span
            style={{ color: C.blueLight }}
            className="hidden sm:inline truncate"
          >
            {item.date}
          </span>
          <span className="min-w-0">
            <span
              style={{
                color: item.tag === "current" ? C.green : C.fg,
                fontWeight: item.tag === "current" ? 600 : 400,
              }}
            >
              {item.title}
            </span>{" "}
            <span style={{ color: C.dim }}>— {item.org}</span>
            <span
              className="block sm:hidden text-[11px]"
              style={{ color: C.blueLight }}
            >
              {item.date}
            </span>
            {item.tag === "current" && (
              <span
                className="ml-2 px-1.5 text-[10px] rounded"
                style={{ border: `1px solid ${C.green}`, color: C.green }}
              >
                current
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── projects (ls and cat) ─────────────────────────────────
export function ProjectsListOutput() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {PROJECTS.map((p) => (
        <span key={p.id} style={{ color: C.blueLight }}>
          {p.id}/
        </span>
      ))}
    </div>
  );
}

export function ProjectsCatOutput() {
  return (
    <div className="space-y-3">
      {PROJECTS.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}

export function ProjectDetailOutput({ name }) {
  const cleanName = (name || "").replace(/\/$/, "").toLowerCase();
  const project = PROJECTS.find((p) => p.id === cleanName);
  if (!project) {
    return (
      <ErrorOutput
        cmd="cat"
        msg={`projects/${name}: No such file or directory. Try: ls projects`}
      />
    );
  }
  return <ProjectCard project={project} />;
}

function ProjectCard({ project: p }) {
  return (
    <div className="border-l-2 pl-3 py-1" style={{ borderColor: "#21262d" }}>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span style={{ color: C.green, fontWeight: 600 }}>{p.title}</span>
        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px]"
        >
          ↗ {p.href.replace(/^https?:\/\//, "")}
        </a>
      </div>
      <div style={{ color: C.fg }} className="mt-0.5">
        {p.desc}
      </div>
      <div className="mt-1 text-[11px]" style={{ color: C.dim }}>
        <span style={{ color: C.comment }}>$ stack:</span>{" "}
        {p.stack.map((s, i) => (
          <span key={s}>
            <span style={{ color: C.purple }}>{s}</span>
            {i < p.stack.length - 1 && (
              <span style={{ color: C.comment }}> | </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── skills ─────────────────────────────────────────────────
export function SkillsTextOutput() {
  return (
    <div style={{ color: C.fg }} className="break-words">
      {SKILLS_TEXT}
    </div>
  );
}

export function SkillBarsOutput() {
  return (
    <div className="space-y-1.5 mt-1">
      {SKILL_BARS.map((s) => (
        <AsciiSkillBar key={s.label} label={s.label} percent={s.percent} />
      ))}
    </div>
  );
}

// ── gallery ────────────────────────────────────────────────
export function GalleryOutput() {
  return (
    <div>
      <div style={{ color: C.dim }} className="mb-2 text-[11px]">
        # rendering thumbnails inline...
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {GALLERY.map((g, i) => (
          <a
            key={i}
            href={g.src}
            target="_blank"
            rel="noopener noreferrer"
            className="ascii-thumb block rounded overflow-hidden"
            aria-label={g.alt}
          >
            <img
              src={g.src}
              alt={g.alt}
              className="w-full h-20 sm:h-24 object-cover"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </div>
  );
}

// ── contact.json ───────────────────────────────────────────
export function ContactOutput() {
  return (
    <pre
      className="whitespace-pre-wrap break-words text-xs sm:text-sm"
      style={{ color: C.fg, margin: 0 }}
    >
      {`{
  `}
      <span style={{ color: C.blueLight }}>"name"</span>:{" "}
      <span style={{ color: "#a5d6ff" }}>"{CONTACT.name}"</span>,
      {`
  `}
      <span style={{ color: C.blueLight }}>"email"</span>:{" "}
      <a href={`mailto:${CONTACT.email}`}>"{CONTACT.email}"</a>,
      {`
  `}
      <span style={{ color: C.blueLight }}>"github"</span>:{" "}
      <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
        "esmike03"
      </a>
      ,
      {`
  `}
      <span style={{ color: C.blueLight }}>"linkedin"</span>:{" "}
      <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
        "earl-mike-sarabia"
      </a>
      ,
      {`
  `}
      <span style={{ color: C.blueLight }}>"phone"</span>:{" "}
      <span style={{ color: "#a5d6ff" }}>"{CONTACT.phone}"</span>,
      {`
  `}
      <span style={{ color: C.blueLight }}>"resume"</span>:{" "}
      <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer">
        "{CONTACT.resume}"
      </a>
      {`
}`}
    </pre>
  );
}

// ── github commits ─────────────────────────────────────────
function getGithubUser() {
  const m = (CONTACT.github || "").match(/github\.com\/([^/]+)/i);
  return m ? m[1] : "esmike03";
}

function timeAgo(iso) {
  const then = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - then);
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

export function GithubCommitsOutput({ limit = 10 }) {
  const user = getGithubUser();
  const [state, setState] = useState({ status: "loading", items: [], err: "" });

  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${user}/events/public?per_page=100`,
          { headers: { Accept: "application/vnd.github+json" }, signal: ctrl.signal },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const events = await res.json();
        const items = [];
        for (const ev of events) {
          if (ev.type !== "PushEvent" || !ev.payload?.commits) continue;
          const repo = ev.repo?.name || "";
          for (const c of ev.payload.commits) {
            items.push({
              sha: c.sha,
              repo,
              message: (c.message || "").split("\n")[0],
              date: ev.created_at,
              url: `https://github.com/${repo}/commit/${c.sha}`,
            });
            if (items.length >= limit) break;
          }
          if (items.length >= limit) break;
        }
        if (!cancelled) setState({ status: "ok", items, err: "" });
      } catch (e) {
        if (!cancelled && e.name !== "AbortError") {
          setState({ status: "err", items: [], err: e.message || "fetch failed" });
        }
      }
    })();
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [user, limit]);

  if (state.status === "loading") {
    return (
      <span style={{ color: C.dim }}>
        # fetching commits from github.com/{user}
        <BlinkingDots />
      </span>
    );
  }
  if (state.status === "err") {
    return (
      <div>
        <span style={{ color: C.red }}>
          git: failed to fetch commits ({state.err})
        </span>
        <div style={{ color: C.dim }} className="mt-1 text-[11px]">
          # GitHub API may be rate-limited. Try again later, or visit{" "}
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            github.com/{user}
          </a>
        </div>
      </div>
    );
  }
  if (!state.items.length) {
    return (
      <span style={{ color: C.dim }}>
        # no recent public commits found for {user}.
      </span>
    );
  }

  return (
    <div>
      <div style={{ color: C.dim }} className="mb-1 text-[11px]">
        # git log --author={user} --max-count={state.items.length}{" "}
        <span style={{ color: C.comment }}>
          (source:{" "}
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/{user}
          </a>
          )
        </span>
      </div>
      <div className="space-y-1">
        {state.items.map((c) => (
          <div
            key={c.sha}
            className="grid grid-cols-[auto,1fr] gap-x-3 items-baseline"
          >
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px]"
              style={{ color: C.yellow }}
            >
              {c.sha.slice(0, 7)}
            </a>
            <div className="min-w-0">
              <span style={{ color: C.fg }}>{c.message}</span>
              <div className="text-[11px]" style={{ color: C.dim }}>
                <span style={{ color: C.purple }}>{c.repo}</span>
                <span style={{ color: C.comment }}> · </span>
                <span>{timeAgo(c.date)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── github contributions (green-square heatmap) ───────────
const CONTRIB_COLORS = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function GithubContributionsOutput() {
  const user = getGithubUser();
  const [state, setState] = useState({
    status: "loading",
    weeks: [],
    total: 0,
    monthLabels: [],
    err: "",
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

        // Pad to start on Sunday
        const startDow = new Date(days[0].date).getUTCDay();
        const cells = [...Array(startDow).fill(null), ...days];
        const weeks = [];
        for (let i = 0; i < cells.length; i += 7) {
          weeks.push(cells.slice(i, i + 7));
        }

        // Month labels: one per column where the month changes
        const monthLabels = weeks.map((w, i) => {
          const firstDay = w.find(Boolean);
          if (!firstDay) return "";
          const m = new Date(firstDay.date).getUTCMonth();
          if (i === 0) return MONTH_NAMES[m];
          const prev = weeks[i - 1].find(Boolean);
          const pm = prev ? new Date(prev.date).getUTCMonth() : -1;
          return m !== pm ? MONTH_NAMES[m] : "";
        });

        const total =
          data.total?.lastYear ??
          days.reduce((s, d) => s + (d.count || 0), 0);

        if (!cancelled) {
          setState({ status: "ok", weeks, total, monthLabels, err: "" });
        }
      } catch (e) {
        if (!cancelled && e.name !== "AbortError") {
          setState({
            status: "err",
            weeks: [],
            total: 0,
            monthLabels: [],
            err: e.message || "fetch failed",
          });
        }
      }
    })();
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [user]);

  if (state.status === "loading") {
    return (
      <span style={{ color: C.dim }}>
        # fetching contributions for {user}
        <BlinkingDots />
      </span>
    );
  }
  if (state.status === "err") {
    return (
      <div>
        <span style={{ color: C.red }}>
          contributions: failed to load ({state.err})
        </span>
        <div style={{ color: C.dim }} className="mt-1 text-[11px]">
          # try again later, or visit{" "}
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            github.com/{user}
          </a>
        </div>
      </div>
    );
  }

  const cell = 11; // px
  const gap = 2;

  return (
    <div>
      <div style={{ color: C.dim }} className="mb-1 text-[11px]">
        <span style={{ color: C.green, fontWeight: 600 }}>{state.total}</span>
        <span style={{ color: C.fg }}> contributions in the last year</span>
        <span style={{ color: C.comment }}>
          {" "}
          (source:{" "}
          <a
            href={`https://github.com/${user}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/{user}
          </a>
          )
        </span>
      </div>

      <div className="overflow-x-auto">
        <div style={{ display: "inline-block", minWidth: "fit-content" }}>
          {/* Month labels */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${state.weeks.length}, ${cell}px)`,
              columnGap: gap,
              marginLeft: 22,
              marginBottom: 4,
              fontSize: 10,
              color: C.dim,
              height: 12,
            }}
          >
            {state.monthLabels.map((label, i) => (
              <div
                key={i}
                style={{
                  whiteSpace: "nowrap",
                  position: "relative",
                  width: cell,
                }}
              >
                {label}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 4 }}>
            {/* Day-of-week labels */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: `repeat(7, ${cell}px)`,
                rowGap: gap,
                fontSize: 10,
                color: C.dim,
                width: 18,
              }}
            >
              <div></div>
              <div>Mon</div>
              <div></div>
              <div>Wed</div>
              <div></div>
              <div>Fri</div>
              <div></div>
            </div>

            {/* Heatmap grid */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: `repeat(7, ${cell}px)`,
                gridAutoFlow: "column",
                gridAutoColumns: `${cell}px`,
                rowGap: gap,
                columnGap: gap,
              }}
            >
              {state.weeks.flatMap((w, wi) =>
                w.map((d, di) =>
                  d ? (
                    <div
                      key={`${wi}-${di}`}
                      title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                      style={{
                        width: cell,
                        height: cell,
                        background: CONTRIB_COLORS[d.level || 0],
                        borderRadius: 2,
                      }}
                    />
                  ) : (
                    <div
                      key={`${wi}-${di}-empty`}
                      style={{ width: cell, height: cell }}
                    />
                  ),
                ),
              )}
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginTop: 6,
              fontSize: 10,
              color: C.dim,
            }}
          >
            <span>Less</span>
            {CONTRIB_COLORS.map((c, i) => (
              <div
                key={i}
                style={{
                  width: cell,
                  height: cell,
                  background: c,
                  borderRadius: 2,
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── neofetch ───────────────────────────────────────────────
// ANSI-Shadow "MIKE" — same logo used in the boot screen so the
// terminal has a single visual language. Edit the rows below to
// change the logo. Keep all rows the same width.
const NEOFETCH_LOGO = [
  "███╗   ███╗██╗██╗  ██╗███████╗",
  "████╗ ████║██║██║ ██╔╝██╔════╝",
  "██╔████╔██║██║█████╔╝ █████╗  ",
  "██║╚██╔╝██║██║██╔═██╗ ██╔══╝  ",
  "██║ ╚═╝ ██║██║██║  ██╗███████╗",
  "╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝",
];

export function NeofetchOutput() {
  const age = getAge();
  const stats = [
    ["user", `${CONTACT.name.split(" ")[0].toLowerCase()}@portfolio`],
    ["os", "Portfolio Linux 24.04 (React 19)"],
    ["host", "mike-laptop"],
    ["uptime", `${age} years`],
    ["shell", "esh 4.6 (anime.js v4 powered)"],
    [
      "resolution",
      `${typeof window !== "undefined" ? window.innerWidth : 0}×${typeof window !== "undefined" ? window.innerHeight : 0}`,
    ],
    ["theme", "phosphor-green"],
    [
      "packages",
      `${PROJECTS.length} projects, ${SKILL_BARS.length} core skills`,
    ],
    ["cpu", "Curiosity @ 100%"],
    ["memory", "Coffee × ∞"],
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-x-6 gap-y-2 text-xs sm:text-sm whitespace-pre items-center">
      <pre
        className="m-0 leading-none whitespace-pre"
        style={{
          color: C.green,
          fontSize: "clamp(7px, 1.4vw, 11px)",
          textShadow: "0 0 8px rgba(0,255,65,0.45)",
        }}
      >
        {NEOFETCH_LOGO.join("\n")}
      </pre>
      <div className="flex flex-col">
        <div style={{ color: C.green, fontWeight: 600 }}>
          {CONTACT.name.split(" ")[0].toLowerCase()}
          <span style={{ color: C.dim }}>@</span>
          portfolio
        </div>
        <div style={{ color: C.dim }}>──────────────────────────────</div>
        {stats.map(([k, v]) => (
          <div key={k}>
            <span style={{ color: C.green, fontWeight: 600 }}>{k}</span>
            <span style={{ color: C.dim }}>: </span>
            <span style={{ color: C.fg }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── date ───────────────────────────────────────────────────
export function DateOutput() {
  const now = new Date();
  return (
    <span style={{ color: C.fg }}>
      {now
        .toString()
        .replace(/\(.*\)$/, "")
        .trim()}
    </span>
  );
}

// ── echo ───────────────────────────────────────────────────
export function EchoOutput({ text }) {
  return <span style={{ color: C.fg }}>{text}</span>;
}

// ── error ──────────────────────────────────────────────────
export function ErrorOutput({ cmd = "bash", msg }) {
  return (
    <span style={{ color: C.red }}>
      {cmd}: {msg}
    </span>
  );
}

// ── history ────────────────────────────────────────────────
export function HistoryOutput({ entries }) {
  if (!entries || !entries.length) {
    return <span style={{ color: C.dim }}># no commands yet</span>;
  }
  return (
    <div>
      {entries.map((e, i) => (
        <div key={i}>
          <span style={{ color: C.dim }}>
            {String(i + 1).padStart(3, " ")}{" "}
          </span>
          <span style={{ color: C.fg }}>{e}</span>
        </div>
      ))}
    </div>
  );
}

// ── man <cmd> ──────────────────────────────────────────────
export function ManOutput({ cmd, command }) {
  if (!cmd) {
    return (
      <ErrorOutput
        cmd="man"
        msg="What manual page do you want? (try: man help)"
      />
    );
  }
  if (!command) {
    return (
      <ErrorOutput
        cmd="man"
        msg={`No manual entry for ${cmd}. Try 'help' for available commands.`}
      />
    );
  }
  return (
    <div className="space-y-1">
      <div>
        <span style={{ color: C.green, fontWeight: 600 }}>NAME</span>
      </div>
      <div className="pl-4">
        <span style={{ color: C.fg }}>
          {command.name} — {command.summary}
        </span>
      </div>
      <div className="mt-2">
        <span style={{ color: C.green, fontWeight: 600 }}>SYNOPSIS</span>
      </div>
      <div className="pl-4" style={{ color: C.fg }}>
        {command.usage || command.name}
      </div>
      {command.aliases && command.aliases.length > 0 && (
        <>
          <div className="mt-2">
            <span style={{ color: C.green, fontWeight: 600 }}>ALIASES</span>
          </div>
          <div className="pl-4" style={{ color: C.fg }}>
            {command.aliases.join(", ")}
          </div>
        </>
      )}
    </div>
  );
}

// ── welcome (post-boot) ────────────────────────────────────
export function WelcomeMessage() {
  return (
    <div className="space-y-1 mb-1">
      <div style={{ color: C.green, fontWeight: 600 }}>
        Welcome to mike@portfolio:~
      </div>
      <div style={{ color: C.fg }}>
        Type <span style={{ color: C.green, fontWeight: 600 }}>help</span> to
        see available commands. Try{" "}
        <span style={{ color: C.green }}>whoami</span>,{" "}
        <span style={{ color: C.green }}>ls projects</span>,{" "}
        <span style={{ color: C.green }}>./skills.sh</span>, or{" "}
        <span style={{ color: C.green }}>neofetch</span>.
      </div>
    </div>
  );
}

// ── sudo: granted (after correct password) ─────────────────
export function SudoGrantedOutput() {
  return (
    <div>
      <div style={{ color: C.green, fontWeight: 600 }}>
        # password accepted.
      </div>
      <div style={{ color: C.fg }}>
        you are now <span style={{ color: C.red, fontWeight: 600 }}>root</span>.
        type <span style={{ color: C.green }}>sudo whoami</span> to verify, or{" "}
        <span style={{ color: C.green }}>secret</span> for something only root
        can see.
      </div>
    </div>
  );
}

// ── sudo: failed all password attempts ─────────────────────
export function SudoFailedOutput() {
  return (
    <span style={{ color: C.red }}>sudo: 3 incorrect password attempts</span>
  );
}

// ── sudo: 3-strikes auto-promote ───────────────────────────
export function ThreeStrikesOutput() {
  return (
    <div>
      <div style={{ color: C.yellow }}># fine. I see you're not giving up.</div>
      <div style={{ color: C.dim }}>
        # logging incident: from 127.0.0.1 to /dev/null
      </div>
      <div style={{ color: C.green, fontWeight: 600 }}>
        # you wore me down. you are now root.
      </div>
      <div style={{ color: C.dim }}># don't make me regret this.</div>
    </div>
  );
}

// ── sudo: --help ───────────────────────────────────────────
export function SudoHelpOutput() {
  return (
    <div className="space-y-1">
      <div style={{ color: C.fg }}>
        sudo — execute a command as another user
      </div>
      <div style={{ color: C.dim }}>usage: sudo [-h] [command]</div>
      <div className="mt-2" style={{ color: C.green, fontWeight: 600 }}>
        # commands you might enjoy:
      </div>
      <div className="pl-2 space-y-0.5" style={{ color: C.fg }}>
        <div>
          <span style={{ color: C.green }}>sudo</span>
          <span style={{ color: C.dim }}> — open a password challenge</span>
        </div>
        <div>
          <span style={{ color: C.green }}>sudo rm -rf /</span>
          <span style={{ color: C.dim }}> — destroy everything (fake)</span>
        </div>
        <div>
          <span style={{ color: C.green }}>sudo make-coffee</span>
          <span style={{ color: C.dim }}> — ascii coffee</span>
        </div>
        <div>
          <span style={{ color: C.green }}>sudo shutdown</span>
          <span style={{ color: C.dim }}> — countdown</span>
        </div>
        <div>
          <span style={{ color: C.green }}>sudo nuke</span>
          <span style={{ color: C.dim }}> — launch sequence</span>
        </div>
        <div>
          <span style={{ color: C.green }}>sudo whoami</span>
          <span style={{ color: C.dim }}> — identity check</span>
        </div>
      </div>
      <div className="mt-2" style={{ color: C.dim }}>
        # password hint: try the magic words. or any password from a 90s movie.
        or just keep typing `sudo` until it gives up.
      </div>
    </div>
  );
}

// ── sudo: rm -rf / (fake destruction) ──────────────────────
const RM_LINES = [
  "removing /home/mike/projects/registrar-bisu/...",
  "removing /home/mike/projects/konstrukalakal/...",
  "removing /home/mike/projects/...",
  "removing /home/mike/skills.txt...",
  "removing /home/mike/contact.json...",
  "removing /home/mike/...",
  "removing /etc/...",
  "removing /var/log/...",
  "removing /...",
  "removing /universe/existential/dread/...",
];

export function FakeRmOutput() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= RM_LINES.length) return;
    const t = setTimeout(() => setStep(step + 1), 110);
    return () => clearTimeout(t);
  }, [step]);
  return (
    <div className="font-mono">
      {RM_LINES.slice(0, step).map((l, i) => (
        <div key={i} style={{ color: C.red }}>
          {l}
        </div>
      ))}
      {step >= RM_LINES.length && (
        <div style={{ color: C.green, marginTop: 6 }}>
          # ...just kidding. your filesystem is intact. type `clear` to tidy up.
        </div>
      )}
    </div>
  );
}

// ── sudo: make-coffee ──────────────────────────────────────
const COFFEE_ART = [
  "      ( (",
  "       ) )",
  "    ........",
  "    |      |]",
  "    \\      /",
  "     `----'",
];

export function MakeCoffeeOutput() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div>
      <div style={{ color: C.dim }}>
        {done ? "# brewed." : "# brewing"}
        {!done && <BlinkingDots />}
      </div>
      <pre
        className="m-0 leading-tight"
        style={{ color: done ? C.yellow : C.dim }}
      >
        {COFFEE_ART.join("\n")}
      </pre>
      {done && (
        <div style={{ color: C.green, marginTop: 6 }}>
          ☕ enjoy. side effects: 47 lines of code in 30 minutes.
        </div>
      )}
    </div>
  );
}

function BlinkingDots() {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setN((x) => (x + 1) % 4), 250);
    return () => clearInterval(t);
  }, []);
  return <span>{".".repeat(n)}</span>;
}

// ── sudo: shutdown ─────────────────────────────────────────
export function ShutdownOutput() {
  const [n, setN] = useState(5);
  useEffect(() => {
    if (n <= 0) return;
    const t = setTimeout(() => setN(n - 1), 700);
    return () => clearTimeout(t);
  }, [n]);
  return (
    <div>
      <div style={{ color: C.yellow }}>
        broadcast: system shutdown in {n}...
      </div>
      {n <= 0 && (
        <div style={{ color: C.green, marginTop: 6 }}>
          # psych. nothing was shut down. portfolio still alive.
        </div>
      )}
    </div>
  );
}

// ── sudo: nuke ─────────────────────────────────────────────
const NUKE_STEPS = [
  { label: "launching nuclear sequence", color: "#ff5555" },
  { label: "authorization", value: "GRANTED", color: "#00ff41" },
  { label: "target", value: "bugs in production", color: "#79c0ff" },
  { label: "status", value: "ARMED", color: "#f0ad4e" },
  { label: "T-3...", color: "#ff5555" },
  { label: "T-2...", color: "#ff5555" },
  { label: "T-1...", color: "#ff5555" },
];

export function NukeOutput() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step >= NUKE_STEPS.length) return;
    const t = setTimeout(() => setStep(step + 1), 250);
    return () => clearTimeout(t);
  }, [step]);
  return (
    <div>
      {NUKE_STEPS.slice(0, step).map((s, i) => (
        <div key={i} style={{ color: s.color }}>
          {s.label}
          {s.value && <span style={{ color: C.dim }}>: </span>}
          {s.value && <span style={{ color: s.color }}>{s.value}</span>}
        </div>
      ))}
      {step >= NUKE_STEPS.length && (
        <div style={{ color: C.green, marginTop: 6 }}>
          🚀 ...nope, that was a fake button. coffee instead?
        </div>
      )}
    </div>
  );
}

// ── secret (admin-only) ────────────────────────────────────
const SECRET_FACTS = [
  "tabs over spaces — but only because everyone else does",
  "my IDE font is Fira Code with ligatures on",
  "I write tests, but only after the bug bites me twice",
  "my caffeine:code ratio is approximately 1:200",
  "I have 47 unread emails. I will read 0 of them.",
  "the mug on my desk says: git push --force",
  "I refactor at 3am. it always seems like a good idea then.",
];

export function SecretOutput() {
  return (
    <div className="space-y-1">
      <div style={{ color: C.red, fontWeight: 600 }}>== /root/.secrets ==</div>
      <div style={{ color: C.dim }}># things only root sees:</div>
      <div className="pl-2 mt-1">
        {SECRET_FACTS.map((f, i) => (
          <div key={i} style={{ color: C.fg }}>
            <span style={{ color: C.green }}>•</span> {f}
          </div>
        ))}
      </div>
      <div style={{ color: C.dim }} className="mt-2">
        # stay paranoid out there.
      </div>
    </div>
  );
}

// ── sudo whoami helper (used as alias inside sudo) ─────────
export function SudoWhoamiOutput({ isRoot }) {
  if (isRoot) {
    return (
      <div>
        <span style={{ color: C.red, fontWeight: 600 }}>root</span>
        <span style={{ color: C.dim }}>
          {" "}
          # uid=0(root) gid=0(root) groups=0(root)
        </span>
      </div>
    );
  }
  return <span style={{ color: C.dim }}>you wish.</span>;
}

// ── 'exit' handler ─────────────────────────────────────────
export function ExitOutput() {
  return (
    <span style={{ color: C.dim }}>
      # closing shell — returning to the site_
    </span>
  );
}

// ── ls (no args) ───────────────────────────────────────────
export function LsRootOutput() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      <span style={{ color: C.fg }}>about.md</span>
      <span style={{ color: C.fg }}>contact.json</span>
      <span style={{ color: C.blueLight }}>gallery/</span>
      <span style={{ color: C.blueLight }}>projects/</span>
      <span style={{ color: C.green }}>resume.pdf</span>
      <span style={{ color: C.fg }}>skills.txt</span>
      <span style={{ color: C.blueLight }}>timeline/</span>
    </div>
  );
}

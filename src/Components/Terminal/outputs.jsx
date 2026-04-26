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
        <span style={{ color: C.green, fontWeight: 600 }}>
          {CONTACT.name}
        </span>
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
        I discovered coding in Grade 9 via DroidScript and started laying out
        designs in PixelLab on my phone. That curiosity turned into a craft:
        I now build responsive, performant web apps and clean visual
        designs.
      </p>
      <p className="mt-2">
        Today I focus on full-stack web development — primarily{" "}
        <span style={{ color: C.green }}>Laravel</span> and{" "}
        <span style={{ color: C.green }}>React</span> — and creative work in
        Photoshop and Premiere Pro.
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
    <div
      className="border-l-2 pl-3 py-1"
      style={{ borderColor: "#21262d" }}
    >
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
  `}<span style={{ color: C.blueLight }}>"name"</span>:{" "}
      <span style={{ color: "#a5d6ff" }}>"{CONTACT.name}"</span>,{`
  `}<span style={{ color: C.blueLight }}>"email"</span>:{" "}
      <a href={`mailto:${CONTACT.email}`}>"{CONTACT.email}"</a>,{`
  `}<span style={{ color: C.blueLight }}>"github"</span>:{" "}
      <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
        "esmike03"
      </a>
      ,{`
  `}<span style={{ color: C.blueLight }}>"linkedin"</span>:{" "}
      <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
        "earl-mike-sarabia"
      </a>
      ,{`
  `}<span style={{ color: C.blueLight }}>"phone"</span>:{" "}
      <span style={{ color: "#a5d6ff" }}>"{CONTACT.phone}"</span>,{`
  `}<span style={{ color: C.blueLight }}>"resume"</span>:{" "}
      <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer">
        "{CONTACT.resume}"
      </a>{`
}`}
    </pre>
  );
}

// ── neofetch ───────────────────────────────────────────────
export function NeofetchOutput() {
  const age = getAge();
  const ART = [
    "       ╔═══════════╗",
    "       ║   <em/>   ║",
    "       ║  ┌─────┐  ║",
    "       ║  │ /\\  │  ║",
    "       ║  │/  \\ │  ║",
    "       ║  └─────┘  ║",
    "       ╚═══════════╝",
  ];
  const stats = [
    ["user", `${CONTACT.name.split(" ")[0].toLowerCase()}@portfolio`],
    ["os", "Portfolio Linux 24.04 (React 19)"],
    ["host", "mike-laptop"],
    ["uptime", `${age} years`],
    ["shell", "esh 4.6 (anime.js v4 powered)"],
    ["resolution", `${typeof window !== "undefined" ? window.innerWidth : 0}×${typeof window !== "undefined" ? window.innerHeight : 0}`],
    ["theme", "phosphor-green"],
    ["packages", `${PROJECTS.length} projects, ${SKILL_BARS.length} core skills`],
    ["cpu", "Curiosity @ 100%"],
    ["memory", "Coffee × ∞"],
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto,1fr] gap-x-6 gap-y-1 text-xs sm:text-sm whitespace-pre">
      <pre style={{ color: C.green, margin: 0 }}>{ART.join("\n")}</pre>
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
      {now.toString().replace(/\(.*\)$/, "").trim()}
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
      <ErrorOutput cmd="man" msg="What manual page do you want? (try: man help)" />
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
        Type{" "}
        <span style={{ color: C.green, fontWeight: 600 }}>help</span>{" "}
        to see available commands. Try{" "}
        <span style={{ color: C.green }}>whoami</span>,{" "}
        <span style={{ color: C.green }}>ls projects</span>,{" "}
        <span style={{ color: C.green }}>./skills.sh</span>, or{" "}
        <span style={{ color: C.green }}>neofetch</span>.
      </div>
    </div>
  );
}

// ── 'exit' handler ─────────────────────────────────────────
export function ExitOutput() {
  return (
    <span style={{ color: C.dim }}>
      # this is your shell — refresh the page to start over.
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

import {
  WhoamiOutput,
  AboutOutput,
  TimelineOutput,
  ProjectsListOutput,
  ProjectsCatOutput,
  ProjectDetailOutput,
  SkillsTextOutput,
  SkillBarsOutput,
  GalleryOutput,
  ContactOutput,
  NeofetchOutput,
  DateOutput,
  EchoOutput,
  ErrorOutput,
  HistoryOutput,
  ManOutput,
  ExitOutput,
  LsRootOutput,
} from "./outputs";
import { CONTACT } from "./data";

const C = {
  green: "#00ff41",
  fg: "#c9d1d9",
  dim: "#8b949e",
  comment: "#6a737d",
  blue: "#58a6ff",
  blueLight: "#79c0ff",
  red: "#ff5555",
};

// ─────────────────────────────────────────────────────────
// HELP — generated from COMMANDS at render time
// ─────────────────────────────────────────────────────────
function HelpOutput() {
  const groups = COMMANDS.reduce((acc, c) => {
    const k = c.category || "misc";
    (acc[k] ||= []).push(c);
    return acc;
  }, {});
  const order = ["identity", "portfolio", "files", "utility", "fun"];
  const sortedGroups = order
    .filter((k) => groups[k])
    .map((k) => [k, groups[k]]);

  return (
    <div className="space-y-2">
      <div style={{ color: C.dim }}>
        # {COMMANDS.length} commands available
      </div>
      {sortedGroups.map(([cat, cmds]) => (
        <div key={cat}>
          <div
            className="text-[11px] tracking-widest uppercase"
            style={{ color: C.green }}
          >
            [{cat}]
          </div>
          <div className="space-y-0.5 mt-0.5">
            {cmds.map((c) => (
              <div key={c.name} className="flex flex-wrap gap-x-3">
                <span
                  className="min-w-[12ch] sm:min-w-[14ch]"
                  style={{ color: C.green, fontWeight: 600 }}
                >
                  {c.name}
                </span>
                <span style={{ color: C.dim }}>—</span>
                <span style={{ color: C.fg }}>{c.summary}</span>
                {c.aliases && c.aliases.length > 0 && (
                  <span
                    className="text-[11px]"
                    style={{ color: C.comment }}
                  >
                    (aliases: {c.aliases.join(", ")})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ color: C.dim }} className="mt-2 text-[11px]">
        # Tip: ↑/↓ for history · Tab to autocomplete · Ctrl+L to clear
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// COMMAND REGISTRY
// ─────────────────────────────────────────────────────────
//
// Each handler receives args: string[] and returns either:
//   - a ReactNode (rendered as output)
//   - the literal string "__CLEAR__"  → clears the screen
//   - the literal string "__OPEN__:<url>" → opens a URL in a new tab
//   - null  → no output (just the echoed prompt)
//
export const COMMANDS = [
  {
    name: "help",
    aliases: ["?", "h"],
    category: "utility",
    summary: "Show this help message",
    usage: "help",
    handler: () => <HelpOutput />,
  },
  {
    name: "whoami",
    category: "identity",
    summary: "Display current user identity",
    usage: "whoami",
    handler: () => <WhoamiOutput />,
  },
  {
    name: "neofetch",
    category: "identity",
    summary: "Display system info ASCII art",
    usage: "neofetch",
    handler: () => <NeofetchOutput />,
  },
  {
    name: "ls",
    category: "files",
    summary: "List files. Try: ls projects · ls timeline · ls gallery",
    usage: "ls [directory]",
    handler: (args) => {
      const arg = (args[0] || "")
        .toLowerCase()
        .replace(/^\.?\/?/, "")
        .replace(/\/$/, "");
      switch (arg) {
        case "":
          return <LsRootOutput />;
        case "projects":
          return <ProjectsListOutput />;
        case "timeline":
          return <TimelineOutput />;
        case "gallery":
          return <GalleryOutput />;
        default:
          return (
            <ErrorOutput
              cmd="ls"
              msg={`cannot access '${args[0]}': No such file or directory`}
            />
          );
      }
    },
  },
  {
    name: "cat",
    category: "files",
    summary:
      "Print file contents. Try: cat about.md · cat skills.txt · cat contact.json",
    usage: "cat <file>",
    handler: (args) => {
      if (!args.length) {
        return <ErrorOutput cmd="cat" msg="missing operand" />;
      }
      const arg = args[0].toLowerCase().replace(/^\.\//, "");
      switch (arg) {
        case "about.md":
          return <AboutOutput />;
        case "skills.txt":
          return <SkillsTextOutput />;
        case "contact.json":
          return <ContactOutput />;
        case "resume.pdf":
          return `__OPEN__:${CONTACT.resume}`;
        case "projects":
        case "projects/":
          return <ProjectsCatOutput />;
        default:
          if (arg.startsWith("projects/")) {
            const name = arg.replace(/^projects\//, "");
            return <ProjectDetailOutput name={name} />;
          }
          return (
            <ErrorOutput
              cmd="cat"
              msg={`${args[0]}: No such file or directory`}
            />
          );
      }
    },
  },
  {
    name: "pwd",
    category: "files",
    summary: "Print working directory",
    usage: "pwd",
    handler: () => <span style={{ color: C.fg }}>/home/mike</span>,
  },
  {
    name: "projects",
    category: "portfolio",
    summary: "Show project details (verbose)",
    usage: "projects",
    handler: () => <ProjectsCatOutput />,
  },
  {
    name: "skills",
    aliases: ["./skills.sh"],
    category: "portfolio",
    summary: "Show animated skill bars",
    usage: "skills",
    handler: () => <SkillBarsOutput />,
  },
  {
    name: "timeline",
    category: "portfolio",
    summary: "Show work + education timeline",
    usage: "timeline",
    handler: () => <TimelineOutput />,
  },
  {
    name: "gallery",
    category: "portfolio",
    summary: "Show design portfolio thumbnails",
    usage: "gallery",
    handler: () => <GalleryOutput />,
  },
  {
    name: "contact",
    category: "portfolio",
    summary: "Show contact information",
    usage: "contact",
    handler: () => <ContactOutput />,
  },
  {
    name: "resume",
    category: "portfolio",
    summary: "Open resume PDF",
    usage: "resume",
    handler: () => `__OPEN__:${CONTACT.resume}`,
  },
  {
    name: "clear",
    aliases: ["cls"],
    category: "utility",
    summary: "Clear the terminal screen",
    usage: "clear",
    handler: () => "__CLEAR__",
  },
  {
    name: "date",
    category: "utility",
    summary: "Show current date and time",
    usage: "date",
    handler: () => <DateOutput />,
  },
  {
    name: "echo",
    category: "utility",
    summary: "Echo text back to the terminal",
    usage: "echo <text>",
    handler: (args) => <EchoOutput text={args.join(" ")} />,
  },
  {
    name: "history",
    category: "utility",
    summary: "Show recently typed commands",
    usage: "history",
    handler: (_args, ctx) => <HistoryOutput entries={ctx?.cmdInputHistory} />,
  },
  {
    name: "hostname",
    category: "utility",
    summary: "Show hostname",
    usage: "hostname",
    handler: () => <span style={{ color: C.fg }}>portfolio</span>,
  },
  {
    name: "uname",
    category: "utility",
    summary: "Show system info (try: uname -a)",
    usage: "uname [-a]",
    handler: (args) => (
      <span style={{ color: C.fg }}>
        {args[0] === "-a"
          ? "Portfolio 24.04 mike-laptop x86_64 React/19 GNU/Linux"
          : "Portfolio"}
      </span>
    ),
  },
  {
    name: "man",
    category: "utility",
    summary: "Show manual page (try: man cat)",
    usage: "man <command>",
    handler: (args) => {
      if (!args[0]) return <ManOutput />;
      const target = findCommand(args[0]);
      return <ManOutput cmd={args[0]} command={target} />;
    },
  },
  {
    name: "sudo",
    category: "fun",
    summary: "Try elevated permissions",
    usage: "sudo <anything>",
    handler: () => (
      <ErrorOutput
        cmd="sudo"
        msg="user 'visitor' is not in the sudoers file. This incident will be reported."
      />
    ),
  },
  {
    name: "exit",
    aliases: ["logout", "quit"],
    category: "fun",
    summary: "Close the terminal",
    usage: "exit",
    handler: () => <ExitOutput />,
  },
];

// ─────────────────────────────────────────────────────────
// LOOKUP + DISPATCH
// ─────────────────────────────────────────────────────────
export function findCommand(name) {
  if (!name) return null;
  const lower = String(name).toLowerCase();
  return (
    COMMANDS.find(
      (c) => c.name === lower || (c.aliases || []).includes(lower),
    ) || null
  );
}

export function runRegistryCommand(input, ctx = {}) {
  const trimmed = String(input ?? "").trim();
  if (!trimmed) return null;

  // First try whole-string alias match (e.g. "./skills.sh")
  const lower = trimmed.toLowerCase();
  const exact = COMMANDS.find(
    (c) => c.name === lower || (c.aliases || []).includes(lower),
  );
  if (exact) return exact.handler([], ctx);

  // Then split into base + args
  const tokens = trimmed.split(/\s+/);
  const [base, ...args] = tokens;
  const cmd = findCommand(base);
  if (!cmd) {
    return (
      <ErrorOutput
        cmd="bash"
        msg={`${base}: command not found. Type 'help' for available commands.`}
      />
    );
  }
  return cmd.handler(args, ctx);
}

export function getCommandNames() {
  const names = COMMANDS.map((c) => c.name);
  const aliases = COMMANDS.flatMap((c) => c.aliases || []);
  return [...names, ...aliases];
}

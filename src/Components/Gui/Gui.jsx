import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiImage,
  FiLinkedin,
  FiTerminal,
} from "react-icons/fi";
import "./Gui.css";
import VisualCarousel from "./VisualCarousel";
import GithubHalftone from "./GithubHalftone";
import HalftoneTrail from "./HalftoneTrail";
import useMagnet from "./useMagnet";
import {
  TIMELINE,
  PROJECTS,
  AWARDS,
  SERVICES,
  MARQUEE,
  CONTACT,
} from "../Terminal/data";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const FIRST_NAME = CONTACT.name.split(" ")[0];
// "Earl Mike H. Sarabia" → "Earl Mike Sarabia"
const FULL_NAME = CONTACT.name.replace(/\s+[A-Z]\.\s*/, " ");

/* Reveals anything marked [data-reveal] once it scrolls into view. */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Nav({ onOpenCli }) {
  return (
    <header className="ui-nav">
      <div className="ui-nav-inner">
        <button type="button" className="ui-cli-btn" onClick={onOpenCli}>
          <FiTerminal aria-hidden="true" />
          {/* data-text feeds the two offset copies the hover glitch draws
              through ::before/::after — see .ui-cli-btn-text in Gui.css. */}
          <span className="ui-cli-btn-text" data-text="Terminal">
            Terminal
          </span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="ui-hero">
      <p className="ui-hero-name ui-rise" style={{ "--d": "0ms" }}>
        {FULL_NAME}
      </p>

      <h1 className="ui-hero-title">
        <span className="ui-line ui-rise" style={{ "--d": "90ms" }}>
          I build websites
        </span>
        <span className="ui-line ui-rise" style={{ "--d": "170ms" }}>
          that feel <em>simple</em> to use.
        </span>
      </h1>

      <p className="ui-hero-sub ui-rise" style={{ "--d": "270ms" }}>
        Hi, I&apos;m {FIRST_NAME} — a web developer from {CONTACT.location}. I turn
        ideas into websites and apps people can figure out without a manual.
      </p>

    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="ui-marquee" aria-hidden="true">
      <div className="ui-marquee-track">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="ui-marquee-item">
            {item}
            <span className="ui-marquee-sep">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ label, title, note }) {
  return (
    <div className="ui-head" data-reveal>
      <span className="ui-label">{label}</span>
      <div className="ui-head-main">
        <h2 className="ui-title">{title}</h2>
        {note && <p className="ui-note">{note}</p>}
      </div>
    </div>
  );
}

function Work() {
  const railRef = useRef(null);
  // One hovered card at a time, so a single set of handlers serves the rail.
  const magnet = useMagnet();
  // Fades appear only on the side that still has cards to scroll to.
  const [edges, setEdges] = useState({ left: false, right: true });

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setEdges({ left: el.scrollLeft > 4, right: el.scrollLeft < max - 4 });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="work" className="ui-section">
      <SectionHead
        label="Work"
        title="Things I've made"
        note="Live projects, in use today. Scroll sideways for more."
      />

      {/* data-reveal lives on its own wrapper: useReveal adds `is-in` via
          classList, and React would wipe it whenever the edge classes below
          change — taking the whole rail's opacity with it. */}
      <div data-reveal>
        <div
          className={`ui-rail-wrap ${edges.left ? "has-left" : ""} ${
            edges.right ? "has-right" : ""
          }`}
        >
          <div className="ui-rail" ref={railRef}>
          {PROJECTS.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ui-card"
              {...magnet}
            >
              <span className="ui-card-go">
                <FiArrowUpRight aria-hidden="true" />
              </span>

              {/* Drop an `image` onto the project in data.js and it replaces
                  this placeholder automatically. */}
              <div className="ui-thumb">
                {p.image ? (
                  <img src={p.image} alt="" loading="lazy" />
                ) : (
                  <span className="ui-thumb-ph">
                    <FiImage aria-hidden="true" />
                    <span>Preview soon</span>
                  </span>
                )}
              </div>

              <div className="ui-card-overlay">
                <h3 className="ui-card-title">{p.name}</h3>
                <p className="ui-card-plain">{p.plain}</p>
              </div>
            </a>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="ui-section">
      <SectionHead label="About" title="A little about me" />

      <div className="ui-about">
        <div className="ui-about-text" data-reveal>
          <p>
            I started making things on a phone back in Grade 9 — no laptop, just
            curiosity. That habit never really left.
          </p>
          <p>
            Today I build websites and apps for schools, shops, and small
            companies. The goal is always the same: clear, quick, and pleasant
            to use.
          </p>
          <p>
            When I&apos;m not building, I&apos;m designing layouts and editing
            photos — the visual side keeps the work honest.
          </p>
        </div>

        <div className="ui-services" data-reveal style={{ "--d": "120ms" }}>
          {SERVICES.map((s) => (
            <div key={s.title} className="ui-service">
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const listRef = useRef(null);
  // 0 → 1 as the list passes the read line, driving the rail's fill.
  // Starts filled when motion is reduced, so the rail is simply drawn.
  const [fill, setFill] = useState(() => prefersReducedMotion() ? 1 : 0);

  useEffect(() => {
    const el = listRef.current;
    if (!el || prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const line = window.innerHeight * 0.72;
      const p = (line - r.top) / (r.height || 1);
      setFill(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="journey" className="ui-section ui-journey">
      <SectionHead
        label="Journey"
        title="Where I've been"
        note="Work and study, most recent first."
      />

      <ol className="ui-timeline" ref={listRef} style={{ "--fill": fill }}>
        {TIMELINE.map((item, i) => (
          <li key={i} className="ui-tl-item" data-reveal style={{ "--d": `${i * 50}ms` }}>
            <span className="ui-tl-year">{item.date.match(/\d{4}/)?.[0]}</span>
            <span className="ui-tl-main">
              <span className="ui-tl-role">
                {item.title}
                {item.tag === "current" && <span className="ui-now">Now</span>}
              </span>
              <span className="ui-tl-org">{item.org}</span>
              <span className="ui-tl-date">{item.date}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Commits() {
  return (
    <section id="commits" className="ui-section">
      <SectionHead
        label="Activity"
        title="What I've been building"
        note="A year of contributions on GitHub."
      />

      <div data-reveal>
        <GithubHalftone />
      </div>
    </section>
  );
}

function Awards() {
  // Nothing to show is better than an empty heading.
  if (!AWARDS.length) return null;

  return (
    <section id="awards" className="ui-section">
      <SectionHead
        label="Awards"
        title="Recognition"
        note="Wins picked up along the way."
      />

      <ul className="ui-awards">
        {AWARDS.map((a, i) => (
          <li
            key={a.id}
            className="ui-award"
            data-reveal
            style={{ "--d": `${i * 60}ms` }}
          >
            <span className="ui-award-mark" aria-hidden="true" />

            {/* Only the title is on every award — the résumé dates and
                attributes them inconsistently, so the rest are optional. */}
            <div className="ui-award-body">
              <h3 className="ui-award-title">{a.title}</h3>
              {a.org && <p className="ui-award-org">{a.org}</p>}
              {a.note && <p className="ui-award-note">{a.note}</p>}
              {a.year && <p className="ui-award-year">{a.year}</p>}
            </div>

            <span
              className="ui-award-mark ui-award-mark-right"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="ui-section">
      <SectionHead
        label="Design"
        title="Visual work"
        note="Layouts and graphics made along the way. Swipe, drag, or use the arrows."
      />

      <div data-reveal>
        <VisualCarousel />
      </div>
    </section>
  );
}

function Contact({ onOpenCli }) {
  return (
    <section id="contact" className="ui-section ui-contact-section">
      <div className="ui-cta" data-reveal>
        <span className="ui-label">Contact</span>
        <h2 className="ui-cta-title">
          Have something in mind? Let&apos;s build it.
        </h2>
        <p className="ui-note">
          Tell me the idea in a sentence or two. I&apos;ll take it from there.
        </p>
        <a href={`mailto:${CONTACT.email}`} className="ui-mail">
          {CONTACT.email}
        </a>
        <a
          href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
          className="ui-mail ui-mail-quiet"
        >
          {CONTACT.phone}
        </a>

        <div className="ui-links">
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            <span>GitHub</span>@esmike03
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            <span>LinkedIn</span>Earl Mike Sarabia
          </a>
          <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer">
            <span>Résumé</span>Download PDF
          </a>
          <p>
            <span>Based in</span>
            {CONTACT.location}
          </p>
        </div>
      </div>

      <div className="ui-endbar" data-reveal style={{ "--d": "120ms" }}>
        <span className="ui-endbar-meta">
          © {new Date().getFullYear()} {CONTACT.name} · {CONTACT.location}
        </span>

        <div className="ui-endbar-links">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            <FiLinkedin aria-hidden="true" />
            LinkedIn
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            <FiGithub aria-hidden="true" />
            GitHub
          </a>
          <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
          <button type="button" onClick={onOpenCli}>
            Terminal version
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Gui({ onOpenCli }) {
  useReveal();

  return (
    <div className="ui-root">
      <HalftoneTrail />
      <Nav onOpenCli={onOpenCli} />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Commits />
        <About />
        <Journey />
        <Awards />
        <Gallery />
        <Contact onOpenCli={onOpenCli} />
      </main>
    </div>
  );
}

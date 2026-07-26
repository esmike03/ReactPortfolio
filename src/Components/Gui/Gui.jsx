import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiImage, FiTerminal } from "react-icons/fi";
import "./Gui.css";
import VisualCarousel from "./VisualCarousel";
import {
  TIMELINE,
  PROJECTS,
  SERVICES,
  MARQUEE,
  CONTACT,
} from "../Terminal/data";

const FIRST_NAME = CONTACT.name.split(" ")[0];
// "Earl Mike H. Sarabia" → "Earl Mike Sarabia"
const FULL_NAME = CONTACT.name.replace(/\s+[A-Z]\.\s*/, " ");

/* Reveals anything marked [data-reveal] once it scrolls into view. */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
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
          <span>Terminal</span>
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
  return (
    <section id="journey" className="ui-section">
      <SectionHead
        label="Journey"
        title="Where I've been"
        note="Work and study, most recent first."
      />

      <ol className="ui-timeline">
        {TIMELINE.map((item, i) => (
          <li key={i} className="ui-tl-item" data-reveal style={{ "--d": `${i * 50}ms` }}>
            <span className="ui-tl-date">{item.date}</span>
            <span className="ui-tl-main">
              <span className="ui-tl-title">
                {item.title}
                {item.tag === "current" && <span className="ui-now">Now</span>}
              </span>
              <span className="ui-tl-org">{item.org}</span>
            </span>
          </li>
        ))}
      </ol>
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

function Contact() {
  const items = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    {
      label: "Phone",
      value: CONTACT.phone,
      href: `tel:${CONTACT.phone.replace(/\s+/g, "")}`,
    },
    { label: "GitHub", value: "@esmike03", href: CONTACT.github },
    { label: "LinkedIn", value: "Earl Mike Sarabia", href: CONTACT.linkedin },
    { label: "Based in", value: CONTACT.location },
  ];

  return (
    <section id="contact" className="ui-section ui-contact-section">
      <div className="ui-cta" data-reveal>
        <span className="ui-label">Contact</span>
        <h2 className="ui-cta-title">
          Have something in mind?
          <br />
          Let&apos;s build it.
        </h2>
        <p className="ui-note">
          Tell me the idea in a sentence or two. I&apos;ll take it from there.
        </p>
        <a href={`mailto:${CONTACT.email}`} className="ui-btn ui-btn-solid ui-btn-lg">
          {CONTACT.email}
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>

      <dl className="ui-details" data-reveal style={{ "--d": "120ms" }}>
        {items.map(({ label, value, href }) => (
          <div key={label} className="ui-detail">
            <dt>{label}</dt>
            <dd>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Footer({ onOpenCli }) {
  return (
    <footer className="ui-footer">
      <span>
        © {new Date().getFullYear()} {CONTACT.name}
      </span>
      <div className="ui-footer-right">
        <a href={CONTACT.resume} target="_blank" rel="noopener noreferrer">
          Résumé
        </a>
        <button type="button" onClick={onOpenCli} className="ui-footer-cli">
          Terminal version
        </button>
      </div>
    </footer>
  );
}

export default function Gui({ onOpenCli }) {
  useReveal();

  return (
    <div className="ui-root">
      <Nav onOpenCli={onOpenCli} />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <About />
        <Journey />
        <Gallery />
        <Contact />
      </main>
      <Footer onOpenCli={onOpenCli} />
    </div>
  );
}

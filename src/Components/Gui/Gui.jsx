import { useEffect, useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiDownload,
  FiArrowRight,
} from "react-icons/fi";
import {
  TIMELINE,
  PROJECTS,
  SKILL_BARS,
  GALLERY,
  CONTACT,
  getAge,
} from "../Terminal/data";

function Navbar({ modeToggle }) {
  const links = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "timeline", label: "Journey" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="gui-nav">
      <div className="gui-nav-inner">
        <a href="#top" className="gui-nav-brand">
          <span className="gui-nav-brand-mark">M</span>
          <span className="gui-nav-brand-name">
            {CONTACT.name.split(" ")[0]} {CONTACT.name.split(" ").slice(-1)}
          </span>
        </a>
        <nav className="gui-nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="gui-nav-right">{modeToggle}</div>
      </div>
    </header>
  );
}

function Hero() {
  const age = getAge();
  return (
    <section id="top" className="gui-section gui-hero">
      <div className="gui-hero-inner">
        <span className="gui-hero-eyebrow">
          <span className="gui-hero-dot" /> Available for work
        </span>
        <h1 className="gui-hero-title">
          Hi, I'm <span className="gui-accent">{CONTACT.name.split(" ")[0]}</span>.
          <br />
          I build clean, modern web apps.
        </h1>
        <p className="gui-hero-sub">
          Full-stack developer based in {CONTACT.location}. {age} years old.
          I focus on Laravel, React, and friendly user experiences.
        </p>
        <div className="gui-hero-cta">
          <a href="#projects" className="gui-btn gui-btn-primary">
            See my work <FiArrowRight aria-hidden="true" />
          </a>
          <a
            href={CONTACT.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="gui-btn gui-btn-ghost"
          >
            <FiDownload aria-hidden="true" /> Resume
          </a>
        </div>
        <div className="gui-hero-meta">
          <a href={`mailto:${CONTACT.email}`} aria-label="Email">
            <FiMail aria-hidden="true" />
            <span>{CONTACT.email}</span>
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="gui-section">
      <div className="gui-section-head">
        <h2>About me</h2>
        <p>The short version.</p>
      </div>
      <div className="gui-prose">
        <p>
          I discovered coding in Grade 9 through DroidScript, laying out
          designs on my phone with PixelLab. That curiosity grew into a craft —
          today I build responsive, performant web apps and clean visual designs.
        </p>
        <p>
          My focus is full-stack web development with{" "}
          <strong>Laravel</strong> and <strong>React</strong>, with creative
          work in Photoshop and Premiere Pro on the side.
        </p>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="gui-section">
      <div className="gui-section-head">
        <h2>Skills</h2>
        <p>What I work with day to day.</p>
      </div>
      <div className="gui-skills">
        {SKILL_BARS.map((s) => (
          <div key={s.label} className="gui-skill">
            <div className="gui-skill-row">
              <span className="gui-skill-label">{s.label}</span>
              <span className="gui-skill-percent">{s.percent}%</span>
            </div>
            <div className="gui-skill-track">
              <div
                className="gui-skill-fill"
                style={{ width: `${s.percent}%` }}
                role="progressbar"
                aria-valuenow={s.percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={s.label}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="gui-section">
      <div className="gui-section-head">
        <h2>Projects</h2>
        <p>A selection of recent work.</p>
      </div>
      <div className="gui-projects">
        {PROJECTS.map((p) => (
          <a
            key={p.id}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="gui-project"
          >
            <div className="gui-project-top">
              <h3>{p.title}</h3>
              <FiExternalLink aria-hidden="true" />
            </div>
            <p className="gui-project-desc">{p.desc}</p>
            <div className="gui-project-stack">
              {p.stack.map((s) => (
                <span key={s} className="gui-tag">
                  {s}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" className="gui-section">
      <div className="gui-section-head">
        <h2>Journey</h2>
        <p>Where I've worked and studied.</p>
      </div>
      <ol className="gui-timeline">
        {TIMELINE.map((item, i) => (
          <li key={i} className="gui-timeline-item">
            <div className="gui-timeline-dot" />
            <div className="gui-timeline-card">
              <div className="gui-timeline-meta">
                <span className="gui-timeline-date">{item.date}</span>
                {item.tag === "current" && (
                  <span className="gui-badge">Current</span>
                )}
              </div>
              <div className="gui-timeline-title">{item.title}</div>
              <div className="gui-timeline-org">{item.org}</div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="gui-section">
      <div className="gui-section-head">
        <h2>Gallery</h2>
        <p>Visual / design work.</p>
      </div>
      <div className="gui-gallery">
        {GALLERY.map((g, i) => (
          <a
            key={i}
            href={g.src}
            target="_blank"
            rel="noopener noreferrer"
            className="gui-gallery-item"
            aria-label={g.alt}
          >
            <img src={g.src} alt={g.alt} loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="gui-section">
      <div className="gui-section-head">
        <h2>Get in touch</h2>
        <p>Open to opportunities and collaborations.</p>
      </div>
      <div className="gui-contact">
        <a href={`mailto:${CONTACT.email}`} className="gui-contact-card">
          <FiMail aria-hidden="true" />
          <div>
            <div className="gui-contact-label">Email</div>
            <div className="gui-contact-value">{CONTACT.email}</div>
          </div>
        </a>
        <a href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`} className="gui-contact-card">
          <FiPhone aria-hidden="true" />
          <div>
            <div className="gui-contact-label">Phone</div>
            <div className="gui-contact-value">{CONTACT.phone}</div>
          </div>
        </a>
        <div className="gui-contact-card">
          <FiMapPin aria-hidden="true" />
          <div>
            <div className="gui-contact-label">Location</div>
            <div className="gui-contact-value">{CONTACT.location}</div>
          </div>
        </div>
        <a
          href={CONTACT.github}
          target="_blank"
          rel="noopener noreferrer"
          className="gui-contact-card"
        >
          <FiGithub aria-hidden="true" />
          <div>
            <div className="gui-contact-label">GitHub</div>
            <div className="gui-contact-value">@esmike03</div>
          </div>
        </a>
        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="gui-contact-card"
        >
          <FiLinkedin aria-hidden="true" />
          <div>
            <div className="gui-contact-label">LinkedIn</div>
            <div className="gui-contact-value">earl-mike-sarabia</div>
          </div>
        </a>
        <a
          href={CONTACT.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="gui-contact-card"
        >
          <FiDownload aria-hidden="true" />
          <div>
            <div className="gui-contact-label">Resume</div>
            <div className="gui-contact-value">Download PDF</div>
          </div>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="gui-footer">
      <span>
        © {new Date().getFullYear()} {CONTACT.name}
      </span>
      <span>Built with React.</span>
    </footer>
  );
}

export default function Gui({ modeToggle }) {
  // Track scroll-spy active section for the navbar (lightweight).
  const [active, setActive] = useState("top");
  useEffect(() => {
    const ids = ["top", "about", "skills", "projects", "timeline", "gallery", "contact"];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Reflect active section as data attr for nav highlight (CSS hook).
  useEffect(() => {
    document.documentElement.dataset.guiActive = active;
  }, [active]);

  return (
    <div className="gui-root">
      <Navbar modeToggle={modeToggle} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

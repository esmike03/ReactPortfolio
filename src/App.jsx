import {
  MdEmail,
  MdDarkMode,
  MdWbSunny,
  MdFileDownload,
  MdAndroid,
} from "react-icons/md";
import {
  FaGithub,
  FaBriefcase,
  FaMoon,
  FaSun,
  FaLinkedin,
  FaFileDownload,
  FaArrowUp,
} from "react-icons/fa";
// Font Awesome
import {
  FaReact,
  FaWordpress,
  FaFigma,
  FaPhp,
  FaJava,
  FaBootstrap,
} from "react-icons/fa";

// Simple Icons (Si)
import {
  SiLaravel,
  SiInertia,
  SiTailwindcss,
  SiMysql,
  SiFirebase,
  SiAndroidstudio,
  SiAdobephotoshop,
  SiAdobeillustrator,
  SiAdobepremierepro,
  SiCanva,
  SiHtml5,
  SiCss3,
  SiReact,
} from "react-icons/si";

import { useState, useEffect, useRef } from "react";
import "./App.css";
import Cursor from "./Components/Cursor";
import TargetBorder from "./Components/TargetBorder";
import RandomParticles from "./Components/RandomParticle";
function AutoPlayVideo({ src, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }, // play when 60% visible
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      playsInline
      controls
      className="w-full h-full object-cover"
    />
  );
}
function getAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age--;
  }

  return age;
}

function App() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };
  const today = new Date();
  const age = getAge(new Date(2003, 4, 15));
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default: dark
  });

  // Apply theme to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }

    // Save preference in localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const categories = [
    {
      name: "Programming & Web Development",
      icons: [
        { icon: <FaPhp size={40} />, name: "PHP" },
        { icon: <FaJava size={40} />, name: "Java" },
        { icon: <SiMysql size={40} />, name: "MySQL" },
        // { icon: <SiCss3 size={40} />, name: "HTML 5" },
        // { icon: <SiHtml5 size={40} />, name: "CSS 3" },
      ],
    },
    {
      name: "Frameworks & Libraries",
      icons: [
        { icon: <SiLaravel size={40} />, name: "Laravel" },
        { icon: <SiInertia size={40} />, name: "Inertia" },
        { icon: <FaReact size={40} />, name: "React" },
        // { icon: <FaReact size={40} />, name: "React Native" },
        { icon: <SiTailwindcss size={40} />, name: "TailwindCSS" },
        // { icon: <FaBootstrap size={40} />, name: "Bootstrap" },
        { icon: <SiFirebase size={40} />, name: "Firebase" },
      ],
    },
    {
      name: "Design & Creativity",
      icons: [
        { icon: <SiAdobephotoshop size={40} />, name: "Photoshop" },
        // { icon: <SiAdobeillustrator size={40} />, name: "Illustrator" },
        { icon: <SiAdobepremierepro size={40} />, name: "Premiere Pro" },
        { icon: <FaFigma size={40} />, name: "Figma" },
        // { icon: <SiCanva size={40} />, name: "Canva" },
      ],
    },
    {
      name: "Tools & Platforms",
      icons: [
        { icon: <FaGithub size={40} />, name: "GitHub" },
        { icon: <SiAndroidstudio size={40} />, name: "Android Studio" },
        { icon: <FaWordpress size={40} />, name: "WordPress" },
        { icon: <MdAndroid size={40} />, name: "DroidScript+" },
      ],
    },
  ];

  const images = [
    {
      src: "/images/des.png",
      alt: "Image 1",
      title: "Project 1",
    },
    {
      src: "/images/legion.png",
      alt: "Image 2",
      title: "Project 2",
    },
    {
      src: "/images/mock1.png",
      alt: "Image 3",
      title: "Project 3",
    },
    {
      src: "/images/ticket.png",
      alt: "Image 4",
      title: "Project 4",
    },
  ];

  const videos = [
    {
      src: "/videos/14StandbyLoopFinale.mp4",
      title: "Big Buck Bunny",
      poster: "/images/Screenshot 2026-01-19 014152.png",
    },
    {
      src: "/videos/2024-10-15 12-23-37.mkv",
      title: "Video 3",
      poster: "/images/Screenshot 2026-01-19 014321.png",
    },
    {
      src: "/videos/IntramsTeaser.mp4",
      title: "Video 4",
      poster: "/images/Screenshot 2026-01-19 014251.png",
    },
    {
      src: "/videos/SyntaxError_VideoPitch-PSC9.mp4",
      title: "Video 4",
    },
    {
      src: "/videos/Teaser.mp4",
      title: "Video 4",
    },
    {
      src: "/videos/TheAccessIntro.mp4",
      title: "Video 4",
      poster: "/images/Screenshot 2026-01-19 014226.png",
    },
    {
      src: "/videos/0611.mp4",
      title: "Sample Video",
    },
  ];
  const [showAll, setShowAll] = useState(false);
  const initialCount = 2;

  const roles = [
    "Web Developer",
    "UI/UX Designer",
    "Graphics Designer",
    "Video Editor",
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2000); // change every 2s

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed cursor-target bottom-6 right-6 z-50 p-3 rounded-full  hover:scale-110 transition-all duration-300"
        >
          <FaArrowUp size={20} />
        </button>
      )}
      <Cursor isDarkMode={isDarkMode} />
      <div className="w-screen cursor-none">
        <div className=" max-w-2xl mx-auto mt-4 p-6">
          <nav
            className="sticky top-2 z-40 px-4 sm:px-6 py-3 backdrop-blur-md rounded-2xl"
            style={{
              borderBottom: "1px solid var(--bg-border)",
              backgroundColor: isDarkMode
                ? "rgba(8,12,20,0.75)"
                : "rgba(240,244,248,0.8)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="relative inline-block cursor-target group">
                <p
                  className="font-bold text-base tracking-widest transition-transform duration-300 group-hover:scale-110"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span style={{ color: "var(--accent)", opacity: 0.7 }}>
                    &lt;
                  </span>
                  <span
                    className="mx-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    em
                  </span>
                  <span style={{ color: "var(--accent)", opacity: 0.7 }}>
                    /&gt;
                  </span>
                </p>
              </div>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <p
                  className="px-3 py-2 nav-link"
                  onClick={() =>
                    document
                      .getElementById("timeline")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  timeline
                </p>

                <p
                  className="px-3 py-2 nav-link"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  projects
                </p>

                <p
                  className="px-3 py-2 nav-link"
                  onClick={() =>
                    document
                      .getElementById("portfolio")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  portfolio
                </p>

                <p
                  className="px-3 py-2 nav-link"
                  onClick={() =>
                    document
                      .getElementById("techstack")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  $_
                </p>

                <span
                  className="w-px h-4 mx-2"
                  style={{ background: "var(--accent)", opacity: 0.2 }}
                />

                {/* Theme toggle */}
                <div
                  onClick={toggleTheme}
                  className="cursor-pointer p-2 rounded-md theme-toggle"
                  style={{ color: "var(--text-muted)" }}
                >
                  {isDarkMode ? (
                    <MdWbSunny size={20} />
                  ) : (
                    <MdDarkMode size={20} />
                  )}
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div
                className="md:hidden cursor-pointer p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ☰
              </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="flex flex-col mt-4 gap-2 md:hidden text-sm">
                <p
                  className="px-3 py-2 nav-link"
                  onClick={() =>
                    document
                      .getElementById("timeline")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  timeline
                </p>

                <p
                  className="px-3 py-2 nav-link"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  projects
                </p>

                <p
                  className="px-3 py-2 nav-link"
                  onClick={() =>
                    document
                      .getElementById("portfolio")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  portfolio
                </p>

                <p
                  className="px-3 py-2 nav-link"
                  onClick={() =>
                    document
                      .getElementById("techstack")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  $_
                </p>

                <div
                  onClick={toggleTheme}
                  className="cursor-pointer px-3 py-2 theme-toggle"
                >
                  Toggle Theme
                </div>
              </div>
            )}

            <style>{`
    .nav-link {
      color: var(--text-secondary);
      cursor: pointer;
      position: relative;
    }

    .nav-link:hover {
      color: var(--accent);
    }

    .theme-toggle:hover {
      color: var(--accent) !important;
      background: var(--accent-glow) !important;
    }
  `}</style>
          </nav>
          <div className="mt-10">
            <section
              className="relative flex flex-col gap-5 py-20 sm:py-10"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <div className="sm:text-left flex flex-col gap-4">
                {/* Greeting */}
                <p
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{ color: "var(--accent)", opacity: 0.75 }}
                >
                  // hello world
                </p>

                {/* Name */}
                <div className="group w-fit">
                  <TargetBorder isDarkMode={isDarkMode}>
                    <h1
                      className="font-extrabold leading-tight text-3xl lg:text-5xl py-1"
                      data-text="Earl Mike H. Sarabia"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--text-primary)",
                      }}
                    >
                      Earl Mike H. Sarabia
                    </h1>
                  </TargetBorder>
                </div>

                {/* Age + Role */}
                <p className="flex items-center gap-3 text-sm mt-1">
                  <span style={{ color: "var(--text-secondary)" }}>{age}</span>

                  <span style={{ color: "var(--accent)", opacity: 0.3 }}>
                    |
                  </span>

                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md"
                    style={{
                      border: "1px solid rgba(0,229,255,0.2)",
                      background: "rgba(0,229,255,0.05)",
                      color: "var(--accent)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {roles[index]}

                    <span
                      style={{
                        display: "inline-block",
                        width: "2px",
                        height: "0.85em",
                        background: "var(--accent)",
                        verticalAlign: "middle",
                        animation: "blink 1s step-end infinite",
                      }}
                    />
                  </span>
                </p>

                {/* Bio */}
                <p
                  className="text-sm max-w-lg leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  I build responsive web experiences and clean layouts with a
                  focus on usability, performance, and modern design.
                </p>
              </div>

              {/* Social links + Resume */}
              <div className="flex items-center gap-2 mt-2 mb-20">
                {/* Email */}
                <a
                  href="mailto:sarabiaearlmike14@gmail.com"
                  aria-label="Email"
                  className="cursor-target social-icon flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                  style={{
                    border: "1px solid var(--bg-border)",
                    background: "var(--bg-surface)",
                    color: "var(--text-muted)",
                  }}
                >
                  <MdEmail size={16} />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/esmike03"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="cursor-target social-icon flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                  style={{
                    border: "1px solid var(--bg-border)",
                    background: "var(--bg-surface)",
                    color: "var(--text-muted)",
                  }}
                >
                  <FaGithub size={16} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/earl-mike-sarabia-4a6532346/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="cursor-target social-icon flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200"
                  style={{
                    border: "1px solid var(--bg-border)",
                    background: "var(--bg-surface)",
                    color: "var(--text-muted)",
                  }}
                >
                  <FaLinkedin size={16} />
                </a>

                {/* Divider */}
                <span
                  className="w-px h-5 mx-1"
                  style={{ background: "var(--bg-border)" }}
                />

                {/* Resume */}
                <a
                  href="/Sarabia_EarlMike-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target resume-btn inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
                  style={{
                    fontFamily: "var(--font-mono)",
                    border: "1px solid rgba(0,229,255,0.25)",
                    background: "rgba(0,229,255,0.05)",
                    color: "var(--accent)",
                  }}
                >
                  <span style={{ opacity: 0.45 }}>$</span>
                  <span>./resume.pdf</span>
                  <FaFileDownload size={11} className="resume-dl-icon" />
                </a>
              </div>

              <style>{`
    @keyframes blink {
      0%,100%{opacity:1;}
      50%{opacity:0;}
    }

    .social-icon:hover {
      border-color: var(--accent) !important;
      color: var(--accent) !important;
      background: var(--accent-glow) !important;
    }

    .resume-btn:hover {
      background: rgba(0,229,255,0.12) !important;
      border-color: var(--accent) !important;
    }

    .resume-btn:hover .resume-dl-icon {
      animation: dl-bounce 0.6s ease-in-out infinite;
    }

    @keyframes dl-bounce {
      0%,100%{transform:translateY(0);}
      50%{transform:translateY(3px);}
    }
  `}</style>
            </section>

            <section id="timeline" style={{ fontFamily: "var(--font-mono)" }}>
              {/* ── About Me heading ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <p
                  className="py-2 px-2 transition-all duration-300 ease-in-out text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  $ about me_
                </p>
              </TargetBorder>

              {/* ── Bio ── */}
              <p
                className="mt-4 mb-10 text-sm leading-relaxed text-left lg:text-justify"
                style={{ color: "var(--text-secondary)" }}
              >
                Hi, I'm Earl Mike Sarabia. I discovered coding back in Grade 9
                when a friend introduced me to DroidScript. Around the same
                time, I also started creating layouts using PixelLab on my
                phone. From that moment, I became curious about how applications
                are built and was amazed by the complexity behind them. That
                curiosity gradually turned into a passion.
                <br />
                <br />
                Today, I am focused on web development and design, where I enjoy
                building functional, user-friendly websites and creating visual
                designs using Photoshop and Canva.
              </p>

              {/* ── Timeline heading ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <p
                  className="py-2 px-2 transition-all duration-300 ease-in-out text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  $ timeline_
                </p>
              </TargetBorder>

              {/* ── Timeline list ── */}
              <ol
                className="relative text-sm px-2 mt-5 border-s"
                style={{ borderColor: "var(--bg-border)" }}
              >
                <li className="mb-10 ms-6">
                  <span
                    className="absolute cursor-target flex items-center justify-center w-6 h-6 rounded-full -start-3"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--accent)",
                      boxShadow: "0 0 8px var(--accent-glow)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      style={{ color: "var(--accent)" }}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>
                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-3 py-3 transition-all duration-300 ease-in-out">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <time
                          className="text-xs font-medium px-2 py-0.5 rounded-md"
                          style={{
                            background: "var(--bg-surface)",
                            border: "1px solid var(--bg-border)",
                            color: "var(--text-muted)",
                          }}
                        >
                          March 2026 – Present
                        </time>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-md"
                          style={{
                            background: "rgba(0,229,255,0.08)",
                            border: "1px solid rgba(0,229,255,0.2)",
                            color: "var(--accent)",
                          }}
                        >
                          Latest
                        </span>
                      </div>
                      <h3
                        className="text-base font-semibold mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Jr. Programmer
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Newton Scanning System Inc.
                      </p>
                    </div>
                  </TargetBorder>
                </li>
                {/* Item 1 */}
                <li className="mb-10 ms-6">
                  <span
                    className="absolute cursor-target flex items-center justify-center w-6 h-6 rounded-full -start-3"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--bg-border)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      style={{ color: "var(--text-muted)" }}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>
                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-3 py-3 transition-all duration-300 ease-in-out">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <time
                          className="text-xs font-medium px-2 py-0.5 rounded-md"
                          style={{
                            background: "var(--bg-surface)",
                            border: "1px solid var(--bg-border)",
                            color: "var(--text-muted)",
                          }}
                        >
                          July 2025 – February 2026
                        </time>
                      </div>
                      <h3
                        className="text-base font-semibold mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        IT System Operator/ Tech Support
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        My first role post-graduation — gained hands-on
                        experience across hardware troubleshooting and PC
                        repair, POS systems, IBM server maintenance, and JDA
                        system operations. Handled IP address management,
                        software installations, and day-to-day technical
                        support.
                      </p>
                    </div>
                  </TargetBorder>
                </li>

                {/* Item 2 */}
                <li className="mb-10 ms-6">
                  <span
                    className="absolute cursor-target flex items-center justify-center w-6 h-6 rounded-full -start-3"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--bg-border)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      style={{ color: "var(--text-muted)" }}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>
                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-3 py-3 transition-all duration-300 ease-in-out">
                      <time
                        className="text-xs font-medium px-2 py-0.5 rounded-md"
                        style={{
                          background: "var(--bg-surface)",
                          border: "1px solid var(--bg-border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        January 2025 – May 2025
                      </time>
                      <h3
                        className="text-base font-semibold my-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Web Development Intern
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Interned at Xentro Holdings Corp. in Cebu — built and
                        deployed fully functional website systems across all
                        four company divisions: Westpoint, Xentra Medica,
                        Popstar Drug Store, and Xentro Estates. Redesigned
                        existing interfaces and added new features to improve
                        usability. Also contributed to branding by designing
                        company uniforms and pharmacy store visuals. Stack:
                        Laravel & MySQL.
                      </p>
                    </div>
                  </TargetBorder>
                </li>

                {/* Item 3 */}
                <li className="mb-10 ms-6">
                  <span
                    className="absolute cursor-target flex items-center justify-center w-6 h-6 rounded-full -start-3"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--bg-border)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      style={{ color: "var(--text-muted)" }}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>
                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-3 py-3 transition-all duration-300 ease-in-out">
                      <time
                        className="text-xs font-medium px-2 py-0.5 rounded-md"
                        style={{
                          background: "var(--bg-surface)",
                          border: "1px solid var(--bg-border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        2023 – 2025
                      </time>
                      <h3
                        className="text-base font-semibold my-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Layout Designer – Legion Organization
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Served as a layout designer for the Legion Organization,
                        creating visual layouts and design assets for various
                        projects and initiatives.
                      </p>
                    </div>
                  </TargetBorder>
                </li>

                {/* Item 4 */}
                <li className="mb-10 ms-6">
                  <span
                    className="absolute cursor-target flex items-center justify-center w-6 h-6 rounded-full -start-3"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--bg-border)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      style={{ color: "var(--text-muted)" }}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>
                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-3 py-3 transition-all duration-300 ease-in-out">
                      <time
                        className="text-xs font-medium px-2 py-0.5 rounded-md"
                        style={{
                          background: "var(--bg-surface)",
                          border: "1px solid var(--bg-border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        2022 – 2025
                      </time>
                      <h3
                        className="text-base font-semibold my-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Graphic Design Head – Campus Access Organization
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Led graphic and layout design efforts for the Campus
                        Access Organization, while also contributing as a video
                        editor for promotional and creative projects.
                      </p>
                    </div>
                  </TargetBorder>
                </li>

                {/* Item 5 */}
                <li className="ms-6">
                  <span
                    className="absolute cursor-target flex items-center justify-center w-6 h-6 rounded-full -start-3"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--bg-border)",
                    }}
                  >
                    <svg
                      className="w-3 h-3"
                      style={{ color: "var(--text-muted)" }}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>
                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-3 py-3 transition-all duration-300 ease-in-out">
                      <time
                        className="text-xs font-medium px-2 py-0.5 rounded-md"
                        style={{
                          background: "var(--bg-surface)",
                          border: "1px solid var(--bg-border)",
                          color: "var(--text-muted)",
                        }}
                      >
                        2021 – 2025
                      </time>
                      <h3
                        className="text-base font-semibold my-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        BS in Information Technology
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        Getting accepted into this school has been one of my
                        dreams, and pursuing a degree in Information Technology
                        is something I've always aspired to. During my studies,
                        I also developed my thesis project, the{" "}
                        <strong style={{ color: "var(--text-primary)" }}>
                          BISU Registrar Appointment System
                        </strong>
                        , which allowed students to efficiently schedule
                        appointments with the registrar, giving me hands-on
                        experience in building real-world web applications.
                      </p>
                    </div>
                  </TargetBorder>
                </li>
              </ol>
            </section>
            <section
              id="projects"
              className="mt-10"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {/* ── Heading ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <p
                  className="py-2 px-2 transition-all duration-300 ease-in-out text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  $ projects_
                </p>
              </TargetBorder>

              {/* ── Project 1 ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <div className="py-4 px-3 transition-all duration-300 ease-in-out rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <h3
                      className="font-bold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      BISU Registrar Appointment System
                    </h3>
                  </div>

                  <a
                    href="https://registrar-bisu.nxprimordial.space/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link text-xs mb-3 inline-flex items-center gap-1"
                    style={{ color: "var(--accent)" }}
                  >
                    ↗ Visit Website
                  </a>

                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Developed a web-based appointment system for the BISU
                    Registrar to streamline the document request process using
                    Laravel, ensuring efficient scheduling and management of
                    student appointments.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="tech-tag">
                      <SiLaravel /> Laravel
                    </span>
                    <span className="tech-tag">
                      <SiTailwindcss /> TailwindCSS
                    </span>
                    <span className="tech-tag">
                      <SiMysql /> MySQL
                    </span>
                    <span className="tech-tag">JavaScript</span>
                  </div>
                </div>
              </TargetBorder>

              <TargetBorder isDarkMode={isDarkMode}>
                <div className="py-4 px-3 transition-all duration-300 ease-in-out rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <h3
                      className="font-bold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Konstrukalakal
                    </h3>
                  </div>

                  <a
                    href="https://konstrukalakal.nxprimordial.space/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link text-xs mb-3 inline-flex items-center gap-1"
                    style={{ color: "var(--accent)" }}
                  >
                    ↗ Visit Website
                  </a>

                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Konstrukalakal is a digital marketplace for buying, selling,
                    trading, and donating construction materials. The platform
                    connects suppliers, contractors, and individuals to
                    efficiently exchange building resources while promoting
                    accessibility and reducing material waste.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="tech-tag">Commission Project</span>
                    <span className="tech-tag">
                      <SiLaravel /> Laravel
                    </span>
                    <span className="tech-tag">
                      <SiTailwindcss /> TailwindCSS
                    </span>
                    <span className="tech-tag">
                      <SiReact /> React
                    </span>
                    <span className="tech-tag">
                      <SiMysql /> MySQL
                    </span>
                    <span className="tech-tag">JavaScript</span>
                  </div>
                </div>
              </TargetBorder>
              {/* ── Project 2 ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <div className="py-4 px-3 transition-all duration-300 ease-in-out rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <h3
                      className="font-bold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Travel Companion
                    </h3>
                  </div>

                  <a
                    href="https://github.com/esmike03/TravelCompanion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link text-xs mb-3 inline-flex items-center gap-1"
                    style={{ color: "var(--accent)" }}
                  >
                    ↗ View on GitHub
                  </a>

                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Designed and developed an Android app that guides users to
                    popular tourist attractions in Bohol. Leveraged Google Maps
                    and OpenStreetView for an immersive and seamless navigation
                    experience. Implemented Google account authentication to
                    enable quick and secure user login.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="tech-tag">
                      <SiAndroidstudio /> Android Studio
                    </span>
                    <span className="tech-tag">
                      <SiFirebase /> Firebase
                    </span>
                    <span className="tech-tag">Google Maps</span>
                    <span className="tech-tag">OpenStreetView</span>
                  </div>
                </div>
              </TargetBorder>

              {/* ── Project 3 ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <div className="py-4 px-3 transition-all duration-300 ease-in-out rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <h3
                      className="font-bold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Xentro Estates — Website Redesign & Feature Enhancement
                    </h3>
                  </div>

                  <a
                    href="https://xentroestates.xentroholdings.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link text-xs mb-3 inline-flex items-center gap-1"
                    style={{ color: "var(--accent)" }}
                  >
                    ↗ View Website
                  </a>

                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Led the redesign of the Xentro Estates website and
                    implemented additional features using Laravel and Photoshop,
                    improving both user experience and overall functionality.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="tech-tag">
                      <SiLaravel /> Laravel
                    </span>
                    <span className="tech-tag">
                      <SiAdobephotoshop /> Photoshop
                    </span>
                    <span className="tech-tag">
                      <SiTailwindcss /> TailwindCSS
                    </span>
                    <span className="tech-tag">
                      <SiMysql /> MySQL
                    </span>
                  </div>
                </div>
              </TargetBorder>

              {/* ── Project 4 ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <div className="py-4 px-3 transition-all duration-300 ease-in-out rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <h3
                      className="font-bold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Westpoint Pharma — Website Development
                    </h3>
                  </div>

                  <a
                    href="https://westpointpharma.xentroholdings.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link text-xs mb-3 inline-flex items-center gap-1"
                    style={{ color: "var(--accent)" }}
                  >
                    ↗ View Website
                  </a>

                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Designed and developed a fully functional website for
                    Westpoint Pharma, leveraging Laravel and TailwindCSS to
                    create a modern, responsive, and user-friendly experience.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="tech-tag">
                      <SiLaravel /> Laravel
                    </span>
                    <span className="tech-tag">
                      <SiAdobephotoshop /> Photoshop
                    </span>
                    <span className="tech-tag">
                      <SiTailwindcss /> TailwindCSS
                    </span>
                    <span className="tech-tag">
                      <SiMysql /> MySQL
                    </span>
                  </div>
                </div>
              </TargetBorder>

              {/* ── Project 5 ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <div className="py-4 px-3 transition-all duration-300 ease-in-out rounded-md">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-0.5 h-5 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <h3
                      className="font-bold text-base"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Helmet Shop
                    </h3>
                  </div>

                  <a
                    href="https://github.com/esmike03/Helmet-Shop-Wordpress"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link text-xs mb-3 inline-flex items-center gap-1"
                    style={{ color: "var(--accent)" }}
                  >
                    ↗ View on GitHub
                  </a>

                  <p
                    className="text-sm leading-relaxed mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Developed a visually engaging helmet shop website using
                    WordPress and Photoshop, which earned recognition as Best
                    Website Design. The project combined creative design with
                    practical functionality to deliver an intuitive user
                    experience.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="tech-tag">
                      <FaWordpress /> WordPress
                    </span>
                    <span className="tech-tag">
                      <SiAdobephotoshop /> Photoshop
                    </span>
                    <span className="tech-tag">Elementor</span>
                  </div>
                </div>
              </TargetBorder>

              <style>{`
    .tech-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid var(--bg-border);
      background: var(--bg-surface);
      color: var(--text-secondary);
    }

    .project-link:hover {
      text-decoration: underline;
      opacity: 0.85;
    }
  `}</style>
            </section>
            <section id="portfolio" className="mt-10">
              <TargetBorder isDarkMode={isDarkMode}>
                <p
                  className="py-2 px-2 transition-all duration-300 ease-in-out text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  $ portfolio_
                </p>
              </TargetBorder>
              <p className="hover:px-2 text-center  py-2 transition-all duration-300 ease-in-out">
                Layout & Graphics
              </p>
              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {images.map((img, index) => (
                    <TargetBorder isDarkMode={isDarkMode}>
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TargetBorder>
                  ))}
                </div>
                <div className="bg-white mt-4 dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                  <img
                    src="/images/lace.png"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="hover:px-2 mt-6 text-center  py-2 transition-all duration-300 ease-in-out">
                Video Edit
              </p>
              <div className="w-full px-4 justify-center flex rounded-lg">
                {" "}
                <iframe
                  width="590"
                  className="rounded-xl my-4"
                  height="315"
                  src="https://www.youtube.com/embed/uDFHxjESkBM?si=AyITJ-u8OO8CLlta"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {(showAll ? videos : videos.slice(0, initialCount)).map(
                    (video, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
                      >
                        <AutoPlayVideo src={video.src} poster={video.poster} />
                      </div>
                    ),
                  )}
                </div>

                {/* Toggle Button */}
                {videos.length > initialCount && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => setShowAll(!showAll)}
                      className="px-4 py-2  rounded hover:scale-110 cursor-target transition"
                    >
                      {showAll ? "Show Less" : "Show More"}
                    </button>
                  </div>
                )}
              </div>
            </section>

            <section
              id="techstack"
              className="mt-10"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {/* ── Heading ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <p
                  className="py-2 px-2 transition-all duration-300 ease-in-out text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  $ techstack_
                </p>
              </TargetBorder>

              <div className="py-6 space-y-10">
                {categories.map((category, index) => (
                  <div key={index}>
                    {/* Category label */}
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className="text-xs tracking-widest uppercase"
                        style={{ color: "var(--accent)", opacity: 0.6 }}
                      >
                        //
                      </span>
                      <span
                        className="text-xs tracking-widest uppercase"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {category.name}
                      </span>
                      <span
                        className="flex-1 h-px"
                        style={{ background: "var(--bg-border)" }}
                      />
                    </div>

                    {/* Icons grid */}
                    <div className="flex flex-wrap gap-4 justify-start items-start">
                      {category.icons.map((item, idx) => (
                        <div
                          key={idx}
                          className="cursor-target stack-item flex flex-col items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200"
                          style={{
                            border: "1px solid var(--bg-border)",
                            background: "var(--bg-surface)",
                            minWidth: "72px",
                          }}
                        >
                          <span
                            className="stack-icon text-xl"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {item.icon}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <style>{`
    .stack-item:hover {
      border-color: var(--accent) !important;
      background: var(--accent-glow) !important;
    }
    .stack-item:hover .stack-icon {
      color: var(--accent) !important;
    }
    .stack-item:hover span {
      color: var(--accent) !important;
    }
  `}</style>
            </section>

            <section
              className="mt-10 flex flex-col items-center gap-4 text-center mx-auto"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {/* ── Heading ── */}
              <TargetBorder isDarkMode={isDarkMode}>
                <p
                  className="py-2 px-2 transition-all duration-300 ease-in-out text-sm"
                  style={{ color: "var(--accent)" }}
                >
                  $ contact_
                </p>
              </TargetBorder>

              {/* ── Subtext ── */}
              <p
                className="text-sm leading-relaxed max-w-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                Feel free to reach out — I'm always excited about new
                opportunities and cool projects.
              </p>

              {/* ── Contact links ── */}
              <div className="flex items-center gap-3 mt-2 mb-2">
                {/* Email */}
                <a
                  href="mailto:sarabiaearlmike14@gmail.com"
                  aria-label="Email"
                  className="cursor-target contact-icon flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                  style={{
                    border: "1px solid var(--bg-border)",
                    background: "var(--bg-surface)",
                    color: "var(--text-muted)",
                  }}
                >
                  <MdEmail size={18} />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/earl-mike-sarabia-4a6532346/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="cursor-target contact-icon flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200"
                  style={{
                    border: "1px solid var(--bg-border)",
                    background: "var(--bg-surface)",
                    color: "var(--text-muted)",
                  }}
                >
                  <FaLinkedin size={18} />
                </a>

                {/* Divider */}
                <span
                  className="w-px h-5 mx-1"
                  style={{ background: "var(--bg-border)" }}
                />

                {/* Phone */}
                <TargetBorder isDarkMode={isDarkMode}>
                  <p
                    className="px-3 py-2 text-sm transition-all duration-200"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    (+63) 992-531-8606
                  </p>
                </TargetBorder>
              </div>

              {/* ── Divider ── */}
              <div
                className="w-full mt-8"
                style={{ borderTop: "1px solid var(--bg-border)" }}
              />

              {/* ── Footer ── */}
              <div className="flex items-center gap-2 mt-4 pb-8">
                <span
                  className="text-xs"
                  style={{ color: "var(--accent)", opacity: 0.4 }}
                >
                  &lt;/&gt;
                </span>

                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Earl Mike H. Sarabia • {today.getFullYear()}
                </p>

                <span
                  className="text-xs"
                  style={{ color: "var(--accent)", opacity: 0.4 }}
                >
                  &lt;/&gt;
                </span>
              </div>

              <style>{`
    .contact-icon:hover {
      border-color: var(--accent) !important;
      color: var(--accent) !important;
      background: var(--accent-glow) !important;
    }
  `}</style>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

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
        { icon: <SiCss3 size={40} />, name: "HTML 5" },
        { icon: <SiHtml5 size={40} />, name: "CSS 3" },
      ],
    },
    {
      name: "Frameworks & Libraries",
      icons: [
        { icon: <SiLaravel size={40} />, name: "Laravel" },
        { icon: <SiInertia size={40} />, name: "Inertia" },
        { icon: <FaReact size={40} />, name: "React" },
        { icon: <SiTailwindcss size={40} />, name: "TailwindCSS" },
        { icon: <FaBootstrap size={40} />, name: "Bootstrap" },
        { icon: <SiFirebase size={40} />, name: "Firebase" },
      ],
    },
    {
      name: "Design & Creativity",
      icons: [
        { icon: <SiAdobephotoshop size={40} />, name: "Photoshop" },
        { icon: <SiAdobeillustrator size={40} />, name: "Illustrator" },
        { icon: <SiAdobepremierepro size={40} />, name: "Premiere Pro" },
        { icon: <FaFigma size={40} />, name: "Figma" },
        { icon: <SiCanva size={40} />, name: "Canva" },
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
      src: "/public/images/des.png",
      alt: "Image 1",
      title: "Project 1",
    },
    {
      src: "/public/images/legion.png",
      alt: "Image 2",
      title: "Project 2",
    },
    {
      src: "/public/images/mock.png",
      alt: "Image 3",
      title: "Project 3",
    },
    {
      src: "/public/images/ticket.png",
      alt: "Image 4",
      title: "Project 4",
    },
  ];

  const videos = [
    {
      src: "/public/videos/14StandbyLoopFinale.mp4",
      title: "Big Buck Bunny",
      poster: "/public/images/Screenshot 2026-01-19 014152.png",
    },
    {
      src: "/public/videos/2024-10-15 12-23-37.mkv",
      title: "Video 3",
      poster: "/public/images/Screenshot 2026-01-19 014321.png",
    },
    {
      src: "/public/videos/IntramsTeaser.mp4",
      title: "Video 4",
      poster: "/public/images/Screenshot 2026-01-19 014251.png",
    },
    {
      src: "/public/videos/SyntaxError_VideoPitch-PSC9.mp4",
      title: "Video 4",
    },
    {
      src: "/public/videos/Teaser.mp4",
      title: "Video 4",
    },
    {
      src: "/public/videos/TheAccessIntro.mp4",
      title: "Video 4",
      poster: "/public/images/Screenshot 2026-01-19 014226.png",
    },
    {
      src: "/public/videos/0611(1).mp4",
      title: "Big Buck Bunny",
    },
    {
      src: "/public/videos/0611.mp4",
      title: "Sample Video",
    },
  ];
  const [showAll, setShowAll] = useState(false);
  const initialCount = 2;
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
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 lg:gap-6 ">
            <div className="relative inline-block cursor-target group">
              <p
                className="
                font-bold font-['Outfit'] text-lg
                transition-transform duration-300
                group-hover:scale-110
                glitch
              "
                data-text="< EM />"
              >
                {"<"} <span className="text-lg">EM</span> {"/>"}
              </p>
            </div>

            <div className="flex sm:gap-2 lg:gap-6 text-sm">
              <TargetBorder isDarkMode={isDarkMode}>
                <p
                  className=" px-2 py-2   hover:scale-110 transition-all duration-300 ease-in-out"
                  onClick={() =>
                    document
                      .getElementById("timeline")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  timeline
                </p>
              </TargetBorder>
              <TargetBorder isDarkMode={isDarkMode}>
                <p
                  className=" px-2 py-2   hover:scale-110 transition-all duration-300 ease-in-out"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  projects
                </p>
              </TargetBorder>
              <TargetBorder isDarkMode={isDarkMode}>
                <p
                  className=" px-2 py-2   hover:scale-110 transition-all duration-300 ease-in-out"
                  onClick={() =>
                    document
                      .getElementById("portfolio")
                      .scrollIntoView({ behavior: "smooth" })
                  }
                >
                  portfolio
                </p>
              </TargetBorder>
              <TargetBorder isDarkMode={isDarkMode}>
                <p className="hover:scale-110 py-2 px-3 rounded-md transition-all duration-300 ease-in-out">
                  cli
                </p>
              </TargetBorder>
              <TargetBorder isDarkMode={isDarkMode}></TargetBorder>
              <div onClick={toggleTheme} className="cursor-target p-2">
                {isDarkMode ? (
                  <MdWbSunny
                    size={24}
                    className="transform transition-transform duration-500 hover:rotate-90"
                  />
                ) : (
                  <MdDarkMode
                    size={24}
                    className="transform transition-transform duration-500 hover:rotate-240"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-20">
            <section>
              <div className=" sm:text-left">
                <p className="sm:text-sm mb-1">Hi, I'm</p>

                <TargetBorder isDarkMode={isDarkMode}>
                  <h1 className="font-extrabold  transition-all duration-300 ease-in-out hover:px-2 py-1 lg:text-4xl text-2xl mt-2">
                    Earl Mike H. Sarabia
                  </h1>
                </TargetBorder>

                <p className="sm:text-sm  mt-1">
                  {age}, Web Developer • UI/UX Designer
                </p>

                <p className="lg:text-sm text-sm mt-2 max-w-xl">
                  Placeholder Lorem ipsum dolor sit amet consectetur adipisicing
                  elit.
                </p>
              </div>

              <div className="flex mb-20 mt-6 justify-center gap-6 w-fit">
                <a
                  href="mailto:sarabiaearlmike14@gmail.com"
                  className="hover:scale-110 transition-all duration-300 ease-in-out cursor-target"
                  style={{ color: isDarkMode ? "white" : "black" }}
                >
                  <MdEmail size={22} />
                </a>

                <a
                  href="https://github.com/esmike03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-all duration-300 ease-in-out cursor-target"
                  style={{ color: isDarkMode ? "white" : "black" }}
                >
                  <FaGithub size={22} />
                </a>

                <a
                  href="https://www.linkedin.com/in/earl-mike-sarabia-4a6532346/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-all duration-300 ease-in-out cursor-target"
                  style={{ color: isDarkMode ? "white" : "black" }}
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href="/public/Sarabia_EarlMike-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-block cursor-target"
                >
                  <FaFileDownload
                    size={22}
                    className={`transition-transform duration-300 ease-in-out hover:animate-download ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  />

                  <style>
                    {`
                    @keyframes download {
                      0% { transform: translateY(0px); }
                      50% { transform: translateY(6px); }
                      100% { transform: translateY(0px); }
                    }

                    .hover\\:animate-download:hover {
                      animation: download 0.6s ease-in-out infinite;
                    }
                  `}
                  </style>
                </a>
              </div>
            </section>

            <section id="timeline">
              <TargetBorder isDarkMode={isDarkMode}>
                <p className="hover:px-2  py-2 transition-all duration-300 ease-in-out">
                  $ about me_
                </p>
              </TargetBorder>

              <p className="mt-4 mb-10 text-left lg:text-justify">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni,
                quia. Suscipit, error sint hic distinctio voluptate
                reprehenderit delectus deleniti obcaecati velit esse accusamus
                neque atque, corporis aliquid iusto ad sit?
              </p>
              <TargetBorder isDarkMode={isDarkMode}>
                <p className="hover:px-2  py-2 transition-all duration-300 ease-in-out">
                  $ timeline_
                </p>
              </TargetBorder>

              <ol class="relative text-sm px-2 border-s mt-5 border-default">
                <li class="mb-10 ms-6">
                  <span class="absolute cursor-target flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
                    <svg
                      class="w-3 h-3 text-fg-brand-strong"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>
                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-2 py-2 transition-all duration-300 ease-in-out">
                      <time class="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">
                        July 2025 - February 2026
                      </time>
                      <h3 class="flex items-center mb-1 text-lg font-semibold text-heading my-2">
                        IT System Operator
                        <span class="ms-2 bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-1.5 py-0.5 rounded">
                          Latest
                        </span>
                      </h3>
                      <p class="mb-4 text-body">
                        This was my first job after graduation, where I gained
                        hands-on experience in various IT tasks. I learned
                        troubleshooting and repairing PCs, working with POS
                        systems, and maintaining IBM servers and the JDA system
                        to ensure smooth daily operations while providing
                        technical support. I also gained experience assigning IP
                        addresses to prevent conflicts, installing software and
                        applications, and performing other essential IT
                        operations.
                      </p>
                    </div>
                  </TargetBorder>
                </li>
                <li class="mb-10 ms-6">
                  <span class="absolute cursor-target flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
                    <svg
                      class="w-3 h-3 text-fg-brand-strong"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>
                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-2 py-2 transition-all duration-300 ease-in-out">
                      <time class="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">
                        January 2025 - May 2025
                      </time>
                      <h3 class="my-2 text-lg font-semibold text-heading">
                        Web Development Intern
                      </h3>
                      <p class="text-body">
                        My first internship was in Cebu at Xentro Holdings Corp.
                        During this internship, I developed fully functional
                        website systems and implemented them across all four of
                        the company’s divisions: Westpoint, Xentra Medica,
                        Popstar Drug Store, and Xentro Estates, where I also
                        redesigned parts of the website and added new
                        functionalities. I used Laravel and MySQL to ensure
                        faster and efficient development for all the websites.
                      </p>
                    </div>
                  </TargetBorder>
                </li>
                <li class="mb-10 ms-6">
                  <span class="absolute cursor-target flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
                    <svg
                      class="w-3 h-3 text-fg-brand-strong"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>

                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-2 py-2 transition-all duration-300 ease-in-out">
                      <time class="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">
                        2023 - 2025
                      </time>
                      <h3 className="my-2 text-lg font-semibold text-heading">
                        Layout Designer – Legion Organization
                      </h3>
                      <p className="text-body">
                        Served as a layout designer for the Legion Organization,
                        creating visual layouts and design assets for various
                        projects and initiatives.
                      </p>
                    </div>
                  </TargetBorder>
                </li>
                <li class="mb-10 ms-6">
                  <span class="absolute cursor-target flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
                    <svg
                      class="w-3 h-3 text-fg-brand-strong"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>

                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-2 py-2 transition-all duration-300 ease-in-out">
                      <time class="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">
                        2022 - 2025
                      </time>
                      <h3 className="my-2 text-lg font-semibold text-heading">
                        Graphic Design Head – Campus Access Organization
                      </h3>
                      <p className="text-body">
                        Led graphic and layout design efforts for the Campus
                        Access Organization, while also contributing as a video
                        editor for promotional and creative projects.
                      </p>
                    </div>
                  </TargetBorder>
                </li>
                <li class="ms-6">
                  <span class="absolute cursor-target flex items-center justify-center w-6 h-6 bg-brand-softer rounded-full -start-3 ring-8 ring-buffer">
                    <svg
                      class="w-3 h-3 text-fg-brand-strong"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                      />
                    </svg>
                  </span>
                  <TargetBorder isDarkMode={isDarkMode}>
                    <div className="px-2 py-2 transition-all duration-300 ease-in-out">
                      <time class="bg-neutral-secondary-medium border border-default-medium text-heading text-xs font-medium px-1.5 py-0.5 rounded">
                        2021 - 2025
                      </time>
                      <h3 class="my-2 text-lg font-semibold text-heading">
                        BS in Information Technology
                      </h3>
                      <p class="text-body">
                        Getting accepted into this school has been one of my
                        dreams, and pursuing a degree in Information Technology
                        is something I’ve always aspired to. I first learned
                        about coding in grade 9, when I was introduced to
                        programming through DroidScript. Using only my Android
                        phone, I created my very first app, and ever since then,
                        I’ve been fascinated by how apps are built and amazed by
                        the endless possibilities of technology. During my
                        studies, I also developed my thesis project, the{" "}
                        <strong>BISU Registrar Appointment System</strong>,
                        which allowed students to efficiently schedule
                        appointments with the registrar, giving me hands-on
                        experience in building real-world web applications.
                      </p>
                    </div>
                  </TargetBorder>
                </li>
              </ol>
            </section>
            <section id="projects" className="mt-10">
              <TargetBorder isDarkMode={isDarkMode}>
                <p className="hover:px-4   py-2 transition-all duration-300 ease-in-out">
                  $ projects_
                </p>
              </TargetBorder>

              <TargetBorder isDarkMode={isDarkMode}>
                <div className="hover:px-4 py-4 transition-all duration-300 ease-in-out rounded-md">
                  <div className="flex items-center mb-2">
                    {/* Left vertical line */}
                    <div className="w-1 h-6 bg-blue-500 mr-3 rounded"></div>
                    <h3 className="font-bold text-lg">
                      BISU Registrar Appointment System
                    </h3>
                  </div>

                  <a
                    href="https://github.com/esmike03/bisuappregistrar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm mb-2 inline-block"
                  >
                    View on GitHub
                  </a>

                  <p className=" mb-3 text-sm">
                    Developed a web-based appointment system for the BISU
                    Registrar to streamline the document request process using
                    Laravel, ensuring efficient scheduling and management of
                    student appointments.
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      <SiLaravel /> Laravel
                    </span>
                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      <SiTailwindcss /> TailwindCSS
                    </span>
                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      <SiMysql /> MySQL
                    </span>
                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      JavaScript
                    </span>
                  </div>
                </div>
              </TargetBorder>

              <TargetBorder isDarkMode={isDarkMode}>
                <div className="hover:px-4 py-4 transition-all duration-300 ease-in-out rounded-md">
                  <div className="flex items-center mb-2">
                    {/* Left vertical line */}
                    <div className="w-1 h-6 bg-blue-500 mr-3 rounded"></div>
                    <h3 className="font-bold text-lg">Travel Companion</h3>
                  </div>

                  <a
                    href="https://github.com/esmike03/TravelCompanion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm mb-2 inline-block"
                  >
                    View on GitHub
                  </a>

                  <p className=" mb-3 text-sm">
                    Designed and developed an Android app that guides users to
                    popular tourist attractions in Bohol. Leveraged Google Maps
                    and OpenStreetView for an immersive and seamless navigation
                    experience. Implemented Google account authentication to
                    enable quick and secure user login.
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      <SiAndroidstudio /> Android Studio
                    </span>

                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      <SiFirebase /> Firebase
                    </span>

                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      Google Maps
                    </span>

                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      OpenStreetView
                    </span>
                  </div>
                </div>
              </TargetBorder>
              <TargetBorder isDarkMode={isDarkMode}>
                <div className="hover:px-4 py-4 transition-all duration-300 ease-in-out rounded-md">
                  <div className="flex items-center mb-2">
                    {/* Left vertical line */}
                    <div className="w-1 h-6 bg-blue-500 mr-3 rounded"></div>
                    <h3 className="font-bold text-lg">Helmet Shop</h3>
                  </div>

                  <a
                    href="https://github.com/your-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm mb-2 inline-block"
                  ></a>

                  <p className="mb-3 text-sm">
                    Developed a visually engaging helmet shop website using
                    WordPress and Photoshop, which earned recognition as Best
                    Website Design. The project combined creative design with
                    practical functionality to deliver an intuitive user
                    experience.
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      <FaWordpress /> Wordpress
                    </span>

                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      <SiAdobephotoshop /> Photoshop
                    </span>

                    <span
                      className="px-2 py-1 flex items-center gap-2 w-fit rounded-md
                   bg-gray-200 text-gray-800
                   dark:bg-gray-800 dark:text-gray-100"
                    >
                      Elementor
                    </span>
                  </div>
                </div>
              </TargetBorder>
            </section>
            <section id="portfolio" className="mt-10">
              <TargetBorder isDarkMode={isDarkMode}>
                <p className="hover:px-2  py-2 transition-all duration-300 ease-in-out">
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
              </div>
              <p className="hover:px-2 mt-6 text-center  py-2 transition-all duration-300 ease-in-out">
                Video Edit
              </p>
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

            <section className="mt-10">
              <TargetBorder isDarkMode={isDarkMode}>
                <p className="hover:px-2   py-2 transition-all duration-300 ease-in-out">
                  $ techstack_
                </p>
              </TargetBorder>

              <div className="p-6 space-y-10">
                {categories.map((category, index) => (
                  <div key={index}>
                    <h2 className="text-lg text-center font-semibold mb-4">
                      {category.name}
                    </h2>
                    <div className="flex flex-wrap gap-6 justify-center items-center">
                      {category.icons.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col cursor-target items-center text-center cursor-pointer hover:scale-110 transition-transform duration-300"
                        >
                          {item.icon}
                          <span className="mt-2 text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 flex flex-col items-center gap-2 text-center  mx-auto">
              <TargetBorder isDarkMode={isDarkMode}>
                <p className="hover:px-2  py-2 transition-all duration-300 ease-in-out">
                  | contact |
                </p>
              </TargetBorder>

              <p className=" text-sm py-2 transition-all duration-300 ease-in-out">
                Feel free to reach out — I’m always excited about new
                opportunities and cool projects. You can contact me here:
              </p>
              <div className="flex mb-5 mt-6 justify-center gap-8">
                <a
                  href="mailto:sarabiaearlmike14@gmail.com"
                  className="hover:scale-110 transition-all duration-300 ease-in-out cursor-target"
                  style={{ color: isDarkMode ? "white" : "black" }}
                >
                  <MdEmail size={25} />
                </a>
                <p className="">•</p>
                <a
                  href="https://www.linkedin.com/in/earl-mike-sarabia-4a6532346/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-all duration-300 ease-in-out cursor-target"
                  style={{ color: isDarkMode ? "white" : "black" }}
                >
                  <FaLinkedin size={25} />
                </a>
              </div>
              <TargetBorder isDarkMode={isDarkMode}>
                <p className="px-2 py-2">(+63) 992-531-8606</p>
              </TargetBorder>

              <hr className="border-t mt-8 w-full border-gray-700 " />
              <p className="mt-4 text-gray-400 font-['Outfit']">
                Earl Mike H. Sarabia • {today.getFullYear()}
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

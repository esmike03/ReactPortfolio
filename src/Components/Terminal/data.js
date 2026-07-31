// Pure portfolio data — imported by outputs.

export const TIMELINE = [
  {
    date: "Mar 2026 – Present",
    title: "Jr. Programmer",
    org: "Newton Scanning System Inc.",
    tag: "current",
  },
  {
    date: "Jul 2025 – Feb 2026",
    title: "IT System Operator / Tech Support",
    org: "Bohol Quality Corporation",
  },
  {
    date: "Jan 2025 – May 2025",
    title: "Full-Stack Web Developer (Intern)",
    org: "Xentro Holdings Corporation",
  },
  {
    date: "2023 – 2025",
    title: "Layout Designer",
    org: "Legion Organization",
  },
  {
    date: "2022 – 2025",
    title: "Multimedia Head",
    org: "Campus Access Organization",
  },
  {
    date: "2021 – 2025",
    title: "BS Information Technology",
    org: "Bohol Island State University — Balilihan",
  },
  {
    date: "2017 – 2018",
    title: "DroidScript / Android tinkering",
    org: "// Hello, World_",
  },
];

// NOTE: `desc` + `stack` feed the CLI. `name`, `plain`, `kind` and `year`
// feed the friendly UI mode — plain words, no jargon.
// `image` is a stand-in gradient for now — swap in a real screenshot per
// project as they're captured (1000×563 webp keeps the rail light).
export const PROJECTS = [
  {
    id: "registrar-bisu",
    title: "BISU Registrar Appointment System",
    name: "Registrar Appointments",
    desc: "Web-based appointment system for the BISU Registrar — streamlines student document requests, scheduling, and management.",
    plain:
      "Students book a school visit online instead of falling in line for hours.",
    kind: "Website",
    year: "2025",
    href: "https://registrar-bisu.nxprimordial.space/",
    image: "/images/ph-violet.webp",
    stack: ["Laravel", "TailwindCSS", "MySQL", "JavaScript"],
  },
  {
    id: "konstrukalakal",
    title: "Konstrukalakal — Construction Marketplace",
    name: "Konstrukalakal",
    desc: "Digital marketplace to buy, sell, trade, and donate construction materials. Connects suppliers, contractors, and individuals.",
    plain:
      "A marketplace where people buy, sell, or give away leftover building materials.",
    kind: "Marketplace",
    year: "2025",
    href: "https://konstrukalakal.nxprimordial.space/",
    image: "/images/ph-crimson.webp",
    stack: ["Laravel", "React", "TailwindCSS", "MySQL"],
  },
  {
    id: "travel-companion",
    title: "Travel Companion (Android)",
    name: "Travel Companion",
    desc: "Tour-guide app for Bohol with Google Maps + OpenStreetView, Google account auth, and curated attraction routes.",
    plain:
      "A phone app that walks visitors around Bohol with maps and suggested stops.",
    kind: "Phone app",
    year: "2024",
    href: "https://github.com/esmike03/TravelCompanion",
    image: "/images/ph-spectrum.webp",
    stack: ["Android Studio", "Firebase", "Google Maps"],
  },
  {
    id: "xentro-estates",
    title: "Xentro Estates — Website Redesign",
    name: "Xentro Estates",
    desc: "Led the redesign and implemented new features for the Xentro Estates property platform.",
    plain:
      "A property listing site, rebuilt so homes are easier to browse and find.",
    kind: "Redesign",
    year: "2025",
    href: "https://xentroestates.xentroholdings.com/",
    image: "/images/ph-neon.webp",
    stack: ["Laravel", "TailwindCSS", "Photoshop", "MySQL"],
  },
  {
    id: "westpoint-pharma",
    title: "Westpoint Pharma — Website",
    name: "Westpoint Pharma",
    desc: "Modern, responsive corporate site built end-to-end with Laravel + TailwindCSS.",
    plain:
      "A calm, modern company site that reads just as well on a phone.",
    kind: "Website",
    year: "2025",
    href: "https://westpointpharma.xentroholdings.com/",
    image: "/images/ph-violet.webp",
    stack: ["Laravel", "TailwindCSS", "Photoshop", "MySQL"],
  },
  {
    id: "helmet-shop",
    title: "Helmet Shop (WordPress)",
    name: "Helmet Shop",
    desc: "Visually engaging helmet shop site — won Best Website Design at our showcase.",
    plain:
      "An online helmet store. It won Best Website Design at our school showcase.",
    kind: "Online store",
    year: "2024",
    href: "https://github.com/esmike03/Helmet-Shop-Wordpress",
    image: "/images/ph-spectrum.webp",
    stack: ["WordPress", "Photoshop", "Elementor"],
  },
];

// Awards & recognition, in résumé order. `org`, `year` and `note` are all
// optional — the résumé dates none of these, so only fill a year in when
// there's a real one to give.
export const AWARDS = [
  {
    id: "tech-proficient-design",
    title: "Technology Proficient in Lay-out and Graphic Design",
  },
  {
    id: "service-awardee",
    title: "Service Awardee — Layout and Design Head",
    org: "Campus Access Organization",
  },
  {
    id: "best-video-pitch",
    title: "Exemplary Performance Awardee — Best Video Pitch",
    org: "Provincial Pitching — Sakayan",
  },
];

// Friendly-mode only: what I can help with, in everyday words.
export const SERVICES = [
  {
    title: "Websites",
    body: "Company pages, shops, and landing pages that look right on any screen.",
  },
  {
    title: "Systems that do work",
    body: "Booking, records, and reports — the everyday tasks, made faster.",
  },
  {
    title: "Design",
    body: "Layouts, posters, and visuals that match how you want to be seen.",
  },
];

// Short, plain phrases for the scrolling strip in friendly mode.
export const MARQUEE = [
  "Websites",
  "Online stores",
  "Booking systems",
  "Phone apps",
  "Layout design",
  "Photo editing",
  "Company pages",
  "Redesigns",
];

export const SKILLS_TEXT =
  "Laravel | PHP | React | JavaScript | TailwindCSS | MySQL | Firebase | Android (Java) | WordPress | Figma | Photoshop";

export const SKILL_BARS = [
  { label: "Laravel / PHP", percent: 88 },
  { label: "React / JS", percent: 82 },
  { label: "TailwindCSS / UI", percent: 90 },
  { label: "MySQL / Backend", percent: 78 },
  { label: "Layout/ Design", percent: 60 },
];

// `alt` stays as-is for the CLI; `caption` is the friendly-mode label.
export const GALLERY = [
  { src: "/images/des.png", alt: "Design 1", caption: "Poster design" },
  {
    src: "/images/legion.png",
    alt: "Legion layout",
    caption: "Legion — page layout",
  },
  { src: "/images/mock1.png", alt: "Mockup 1", caption: "Website mockup" },
  { src: "/images/ticket.png", alt: "Ticket design", caption: "Event ticket" },
];

export const CONTACT = {
  name: "Earl Mike H. Sarabia",
  email: "sarabiaearlmike14@gmail.com",
  github: "https://github.com/esmike03",
  linkedin: "https://www.linkedin.com/in/earl-mike-sarabia-4a6532346/",
  phone: "+63 992 531 8606",
  resume: "/Sarabia_EarlMike-Resume.pdf",
  location: "Philippines",
};

export function getAge(birthDate = new Date(2003, 3, 15)) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const had =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());
  if (!had) age--;
  return age;
}

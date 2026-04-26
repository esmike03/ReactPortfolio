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

export const PROJECTS = [
  {
    id: "registrar-bisu",
    title: "BISU Registrar Appointment System",
    desc: "Web-based appointment system for the BISU Registrar — streamlines student document requests, scheduling, and management.",
    href: "https://registrar-bisu.nxprimordial.space/",
    stack: ["Laravel", "TailwindCSS", "MySQL", "JavaScript"],
  },
  {
    id: "konstrukalakal",
    title: "Konstrukalakal — Construction Marketplace",
    desc: "Digital marketplace to buy, sell, trade, and donate construction materials. Connects suppliers, contractors, and individuals.",
    href: "https://konstrukalakal.nxprimordial.space/",
    stack: ["Laravel", "React", "TailwindCSS", "MySQL"],
  },
  {
    id: "travel-companion",
    title: "Travel Companion (Android)",
    desc: "Tour-guide app for Bohol with Google Maps + OpenStreetView, Google account auth, and curated attraction routes.",
    href: "https://github.com/esmike03/TravelCompanion",
    stack: ["Android Studio", "Firebase", "Google Maps"],
  },
  {
    id: "xentro-estates",
    title: "Xentro Estates — Website Redesign",
    desc: "Led the redesign and implemented new features for the Xentro Estates property platform.",
    href: "https://xentroestates.xentroholdings.com/",
    stack: ["Laravel", "TailwindCSS", "Photoshop", "MySQL"],
  },
  {
    id: "westpoint-pharma",
    title: "Westpoint Pharma — Website",
    desc: "Modern, responsive corporate site built end-to-end with Laravel + TailwindCSS.",
    href: "https://westpointpharma.xentroholdings.com/",
    stack: ["Laravel", "TailwindCSS", "Photoshop", "MySQL"],
  },
  {
    id: "helmet-shop",
    title: "Helmet Shop (WordPress)",
    desc: "Visually engaging helmet shop site — won Best Website Design at our showcase.",
    href: "https://github.com/esmike03/Helmet-Shop-Wordpress",
    stack: ["WordPress", "Photoshop", "Elementor"],
  },
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

export const GALLERY = [
  { src: "/images/des.png", alt: "Design 1" },
  { src: "/images/legion.png", alt: "Legion layout" },
  { src: "/images/mock1.png", alt: "Mockup 1" },
  { src: "/images/ticket.png", alt: "Ticket design" },
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

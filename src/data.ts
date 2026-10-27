export const links = {
  email: "arthurslin.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/arthur-s-lin",
  github: "https://github.com/arthurslin",
  meowTest: "/meowballrush/",
  meowPlay:
    "https://play.google.com/store/apps/details?id=io.github.arthurslin.meowballrush",
  meowPrivacy: "https://arthurslin.github.io/meow-ball-rush-privacy/",
};

// Wording below follows the LinkedIn profile.

export interface Job {
  company: string;
  role: string;
  start: string;
  end?: string;
  location: string;
  highlights: string[];
}

export const jobs: Job[] = [
  {
    company: "Onto Innovation",
    role: "CPQ Analyst",
    start: "May 2024",
    location: "Milpitas, CA · On-site",
    highlights: [
      "Manage product configuration for 90+ models in Oracle CPQ, so sales quotes match customer specifications.",
      "Built an AI-powered Power Automate agent that automates executive sales-demand reporting.",
      "Consolidated data across multiple ERP systems with Python and Pandas, making sales and operations reports more reliable.",
      "Train the sales teams on the platform, and built the product team's JIRA setup from scratch.",
      "Liaison between business stakeholders and offshore developers, keeping communication clear and projects on schedule.",
    ],
  },
  {
    company: "Bridging Tech",
    role: "Software Engineer Intern",
    start: "Dec 2023",
    end: "May 2024",
    location: "Remote",
    highlights: [
      "Front-end development in React.js and TypeScript, working with the UI/UX team on interactive elements that improved user engagement.",
    ],
  },
];

export interface School {
  school: string;
  degree: string;
  when: string;
  note?: string;
}

export const schools: School[] = [
  {
    school: "Santa Clara University",
    degree: "MBA",
    when: "in progress",
    note: "Leavey School of Business.",
  },
  {
    school: "UC Santa Cruz",
    degree: "B.S. with Honors, Computer Science: Game Design",
    when: "Jan 2022 – Jun 2024",
    note: "3.48 GPA · Dean's Honors List, 2023 and 2024.",
  },
  {
    school: "Foothill College",
    degree: "A.S. with Honors, Computer Science",
    when: "Sep 2019 – Dec 2021",
  },
];

export interface Project {
  slug: string;
  name: string;
  label: string;
  blurb: string;
  detail?: string;
  image: string;
  imageAlt: string;
  links: { label: string; href: string; primary?: boolean }[];
}

// Every project, newest first. The home page features Meow Ball Rush and
// lists the rest; /projects/ shows them all.
export const projects: Project[] = [
  {
    slug: "meow-ball-rush",
    name: "meow ball rush",
    label: "android game · solo · 2026",
    blurb:
      "An endless runner where you start as one tiny cat and roll up a mountain of them. Pick the right gates, bonk dogs, launch off ramps, and beat 14 bosses across 11 worlds.",
    detail:
      "HTML5 Canvas + JavaScript, wrapped for Android with Capacitor. All sound is synthesized in code. In closed testing on Google Play.",
    image: "/meowballrush/feature.webp",
    imageAlt: "Meow Ball Rush feature art: a giant ball of cats rolling down a road",
    links: [
      { label: "become a tester →", href: links.meowTest, primary: true },
      { label: "play store", href: links.meowPlay },
    ],
  },
  {
    slug: "jelly-blocks",
    name: "jelly blocks",
    label: "browser game · solo · 2026",
    blurb:
      "A squishy falling-block puzzle game with a twist: stack it right or it topples. Pieces that hang too far past their support roll or slide off the edge, and anything left unsupported drops.",
    detail:
      "One self-contained HTML file with no build step. Sound is generated in the browser, and it plays with a keyboard or touch controls on phones.",
    image: "/projects/jelly-blocks.webp",
    imageAlt: "Jelly Blocks title screen with a purple jelly piece and score panels",
    links: [
      { label: "play →", href: "https://arthurslin.github.io/jelly-blocks/", primary: true },
      { label: "source", href: "https://github.com/arthurslin/jelly-blocks" },
    ],
  },
  {
    slug: "knowledge-engine",
    name: "knowledge engine",
    label: "newsletter · automation · 2026",
    blurb:
      "A daily newsletter: one unfamiliar idea, with the evidence behind it stated honestly. Each post ends with a short quiz and questions to reflect on.",
    detail:
      "A scheduled agent writes each post in Markdown and pushes it. A Python site builder and GitHub Actions publish it to GitHub Pages, with read counts from GoatCounter.",
    image: "/projects/knowledge-engine.webp",
    imageAlt: "Knowledge Engine front page listing the latest posts",
    links: [
      { label: "read →", href: "https://arthurslin.github.io/knowledge-engine/", primary: true },
      { label: "source", href: "https://github.com/arthurslin/knowledge-engine" },
    ],
  },
  {
    slug: "golf-bash-online",
    name: "golf bash online",
    label: "team project · multiplayer",
    blurb:
      "A silly online golf party game. Grab your clubs and battle your friends through a round of golf.",
    image: "/gboheader.jpg",
    imageAlt: "Golf Bash Online header art",
    links: [{ label: "visit site →", href: "https://aguizaro.github.io/GolfSite/", primary: true }],
  },
];

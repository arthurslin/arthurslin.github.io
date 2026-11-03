export const links = {
  email: "arthurslin.work@gmail.com",
  linkedin: "https://www.linkedin.com/in/arthur-s-lin",
  github: "https://github.com/arthurslin",
  meowTest: "/meowballrush/",
  meowPlay:
    "https://play.google.com/store/apps/details?id=io.github.arthurslin.meowballrush",
  meowPrivacy: "https://arthurslin.github.io/meow-ball-rush-privacy/",
};

// Wording below follows the résumé (Business Systems Analyst, Nov 2026).

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
      "Own product configuration for 99% of the catalog (90+ models): gather requirements, prioritize changes, and work with engineering to ship updates so sales can quote to exact customer specs.",
      "Built a Power Automate and AI Builder workflow that takes in CPQ issues, suggests the fix and routes approvals. In pilot, it saves about 2 hours a day of manual handoffs.",
      "Consolidated data across multiple ERP systems with Python and Pandas, cutting duplicate work and making sales and operations reports more reliable.",
      "The bridge between business stakeholders and offshore developers: I write the specs and keep model delivery on track.",
      "Placed 2nd of 11 in a company-wide automation awards.",
    ],
  },
  {
    company: "Bridging Tech",
    role: "Software Engineering Intern",
    start: "Dec 2022",
    end: "May 2023",
    location: "Remote · nonprofit",
    highlights: [
      "Built React and TypeScript components with the UI/UX team for a nonprofit closing the digital divide for students in underserved communities.",
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
    label: "team lead · multiplayer · steam",
    blurb:
      "An online multiplayer golf party game. I led scope and team coordination, grew the team, built core features in Unity and C#, and we shipped a playable build to Steam.",
    image: "/gboheader.jpg",
    imageAlt: "Golf Bash Online header art",
    links: [
      { label: "on steam →", href: "https://store.steampowered.com/app/2976320/Golf_Bash_Online", primary: true },
      { label: "site", href: "https://aguizaro.github.io/GolfSite/" },
    ],
  },
];

// Class work from the Santa Clara MBA, newest first; shown on /mba/.
export const mbaProjects: Project[] = [
  {
    slug: "stylemod",
    name: "stylemod outfit builder",
    label: "mba · marketing case study · 2026",
    blurb:
      "An outfit builder for a case study on responsible AI personalization. Answer a few quick questions and get outfit ideas in your style.",
    detail: "A concept mockup built for a class presentation.",
    image: "/projects/stylemod.webp",
    imageAlt: "StyleMod home screen listing the five quiz questions",
    links: [
      { label: "try it →", href: "https://arthurslin.github.io/StyleMod-demo/", primary: true },
      { label: "source", href: "https://github.com/arthurslin/StyleMod-demo" },
    ],
  },
  {
    slug: "stats-quiz",
    name: "stats final practice quiz",
    label: "mba · statistics · 2026",
    blurb:
      "A practice final for my business statistics class, set up like the real exam.",
    detail: "Take a full mock exam or practice one topic at a time.",
    image: "/projects/stats-quiz.webp",
    imageAlt: "Stats Final Practice Quiz start screen with mock exam and practice options",
    links: [{ label: "take the quiz →", href: "/stats-quiz/", primary: true }],
  },
  {
    slug: "buena-vida",
    name: "buena vida redesign",
    label: "mba · website concept · 2026",
    blurb:
      "A concept redesign of the online store for Buena Vida Specialty Coffee, with a quiz to help shoppers find their coffee.",
    detail: "A private preview, not the official store. The site asks for a password.",
    image: "/projects/buenavida.webp",
    imageAlt: "Buena Vida concept preview's password screen",
    links: [
      { label: "view concept →", href: "https://arthurslin.github.io/buenavida-concept/", primary: true },
      { label: "source", href: "https://github.com/arthurslin/buenavida-concept" },
    ],
  },
];
